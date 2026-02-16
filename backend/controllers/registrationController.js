const Registration = require("../models/Registration");
exports.registerForEvent = async (req, res) => {
 try {
 const { eventId } = req.body;
 const studentId = req.user.id; // token from student
 const existing = await Registration.findOne({ studentId, eventId });
 if (existing) return res.status(400).json({ message: "Already registered" });
 const reg = new Registration({ studentId, eventId });
 await reg.save();
 res.status(201).json({ message: "Registered for event", reg });
 } catch (err) {
 res.status(500).json({ message: "Error registering for event" });
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
