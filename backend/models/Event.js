const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,

    // 🔥 IMPORTANT: Date must be Date type
    date: {
      type: Date,
      required: true,
    },

    time: String,
    venue: String,
    posterImage: String,

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
    },

    eligibility: String,
    department: String,
    year: String,
    type: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);