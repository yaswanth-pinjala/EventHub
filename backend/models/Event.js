const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: String,
  time: String,
  venue: String,
  posterImage: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
  eligibility: String
});

module.exports = mongoose.model("Event", eventSchema);
