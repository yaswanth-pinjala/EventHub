const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String,

    staffId: {
      type: String,
      default: null
    },

    department: String,
    designation: String,

    phone: String,
    gender: String,

    idCardUpload: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("Staff", staffSchema);