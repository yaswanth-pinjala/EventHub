const Event = require("../models/Event");
const Registration = require("../models/Registration");
const json2csv = require("json2csv").Parser;
const Student = require("../models/Student");
const Notification = require("../models/Notification");
const Admin = require("../models/Admin");
const { sendEmail } = require("../services/emailService");
const transporter = require("../config/email");
/**
 * Only event admins should access these using roleMiddleware("admin", "event")
 */
exports.createEvent = async (req, res) => {
  try {

    // 1️⃣ Create Event
    const event = new Event({
      ...req.body,
      date: new Date(req.body.date),
      createdBy: req.user.id,
      posterImage: req.file ? req.file.path : null
    });

    await event.save();

    // 2️⃣ Get Admin Info
    const admin = await Admin.findById(req.user.id);

    const adminName = admin.name;
    const adminEmail = admin.email;

    // 3️⃣ Find Eligible Students
    const departments = req.body.eligibility.split(",");

    const students = await Student.find({
      department: { $in: departments }
    });

    // 4️⃣ Send Emails + Save Notifications
    // Send success response immediately
res.status(201).json({
  message: "Event created successfully"
});

// Send notifications + emails in background
setImmediate(async () => {

  try {

    await Promise.allSettled(

      students.map(async (student) => {

        const message =
          `New event "${event.title}" has been created`;

        // Save notification
        await Notification.create({
          userId: student._id,
          message
        });

        // Send email
        await sendEmail(
          student.email,
          `New Event: ${event.title}`,
          `
          <h2>New Event Created</h2>

          <p><b>${event.title}</b></p>

          <p>${event.description}</p>

          <p><b>Date:</b> ${event.date.toDateString()}</p>
          <p><b>Venue:</b> ${event.venue}</p>
          <p><b>Time:</b> ${event.time}</p>

          <hr>

          <p>Created by:</p>

          <p><b>${adminName}</b></p>

          <p>${adminEmail}</p>

          <p>Please login to EventHub portal to register.</p>
          `
        );

      })

    );

    console.log("Emails sent successfully");

  } catch (mailErr) {

    console.error(
      "BACKGROUND EMAIL ERROR:",
      mailErr
    );

  }

});

  } catch (err) {
    console.error("CREATE EVENT ERROR:", err);
    res.status(500).json({
      message: "Error creating event"
    });
  }
};
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json(event);
  } catch (err) {
    console.error("GET EVENT ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};
exports.getAllEvents = async (req, res) => {
 const events = await Event.find().sort({ date: 1 });
 res.json(events);
};
exports.getEventRegistrations = async (req, res) => {
 const { eventId } = req.params;
 const regs = await Registration.find({ eventId }).populate("studentId");
 res.json(regs);
};

exports.updateEvent = async (req, res) => {
  try {
    const eventId = req.params.id;

    const updatedEvent = await Event.findByIdAndUpdate(
      eventId,
      {
        ...req.body,
        date: new Date(req.body.date)
      },
      { new: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    /* FIND REGISTERED STUDENTS */
    const registrations = await Registration.find({ eventId }).populate("studentId");

    const students = registrations.map(r => r.studentId);

    const message = `Event "${updatedEvent.title}" has been updated`;

    /* SAVE NOTIFICATIONS */
    const notificationPromises = students.map(student =>
      new Notification({
        userId: student._id,
        message
      }).save()
    );

    /* SEND EMAILS */
    const emailPromises = students.map(student =>
      transporter.sendMail({
        from: process.env.EMAIL,
        to: student.email,
        subject: "Event Updated",
        html: `
          <h3>Event Updated</h3>
          <p>The event <b>${updatedEvent.title}</b> has been updated.</p>
          <p>Date: ${updatedEvent.date.toDateString()}</p>
          <p>Venue: ${updatedEvent.venue}</p>
          <p>Time: ${updatedEvent.time}</p>
        `
      })
    );

    await Promise.all([...notificationPromises, ...emailPromises]);

    res.json({
      message: "Event updated successfully and notifications sent",
      event: updatedEvent
    });

  } catch (err) {
    console.error("UPDATE EVENT ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const eventId = req.params.id;

    const event = await Event.findByIdAndDelete(eventId);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json({ message: "Event deleted successfully" });

  } catch (err) {
    console.error("DELETE EVENT ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};


exports.downloadEventReport = async (req, res) => {
  try {
    const { eventId } = req.params;

    const registrations = await Registration.find({ eventId })
      .populate("studentId", "name email regNo department year");

    const data = registrations.map((r) => ({
      Name: r.studentId.name,
      Email: r.studentId.email,
      RegNo: r.studentId.regNo,
      Department: r.studentId.department,
      Year: r.studentId.year,
      RegisteredAt: r.timestamp
    }));

    const fields = [
      "Name",
      "Email",
      "RegNo",
      "Department",
      "Year",
      "RegisteredAt"
    ];

    const parser = new json2csv({ fields });

    const csv = parser.parse(data);

    res.header("Content-Type", "text/csv");
    res.attachment("event-report.csv");
    return res.send(csv);

  } catch (err) {
    console.error("REPORT ERROR:", err);
    res.status(500).json({ message: "Error generating report" });
  }
};