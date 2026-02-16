const Event = require("../models/Event");
const Registration = require("../models/Registration");
/**
 * Only event admins should access these using roleMiddleware("admin", "event")
 */
exports.createEvent = async (req, res) => {
 try {
 const event = new Event({
 ...req.body,
 createdBy: req.user.id,
 posterImage: req.file ? req.file.path : req.body.posterImage
 });
 await event.save();
 res.status(201).json({ message: "Event created", event });
 } catch (err) {
 res.status(500).json({ message: "Error creating event" });
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
