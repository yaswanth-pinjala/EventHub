const Registration = require("../models/Registration");

exports.registerForEvent = async (req, res) => {
  try {
    const studentId = req.user.id;   // from JWT
    const { eventId } = req.body;

    // check if already registered
    const existing = await Registration.findOne({ studentId, eventId });

    if (existing) {
      return res.status(400).json({ message: "Already registered for this event" });
    }

    const registration = new Registration({
      studentId,
      eventId,
      attendanceStatus: "absent",
      timestamp: new Date()
    });

    await registration.save();

    res.status(201).json({ message: "Registered successfully", registration });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Registration failed" });
  }
};

exports.getMyRegistrations = async (req, res) => {
  try {
    const studentId = req.user.id;

    const registrations = await Registration.find({ studentId })
      .populate("eventId");

    res.json({
      count: registrations.length,
      registrations
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch registrations" });
  }
};

exports.getAllRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.find();
    res.json(registrations);
  } catch (error) {
    console.error("Fetch registrations error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getRegistrationsByEvent = async (req, res) => {
  try {
    const registrations = await Registration.find({
      eventId: req.params.eventId,
    }).populate("studentId"); // important

    res.json(registrations);
  } catch (err) {
    res.status(500).json({ message: "Error fetching registrations" });
  }
};
