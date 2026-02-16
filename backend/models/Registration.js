const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
  timestamp: { type: Date, default: Date.now },
  attendanceStatus: { type: String, default: "absent" }
});

module.exports = mongoose.model("Registration", registrationSchema);
