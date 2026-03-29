const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  regNo: String,
  idCardUpload: String,
  department: String,
  academicYear: String,

  phone: Number,        // ⭐ new
  gender: String,       // ⭐ new

  year: Number,         // ⭐ auto calculated

  otp: String,
  otpExpiry: Date
});

module.exports = mongoose.model("Student", studentSchema);