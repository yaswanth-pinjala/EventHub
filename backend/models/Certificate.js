const mongoose = require("mongoose");

const certificateSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
  certificateURL: String,
  generatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Certificate", certificateSchema);
