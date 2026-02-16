const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  regNo: String,
  idCardUpload: String,
  department: String,
  academicYear: String
});

module.exports = mongoose.model("Student", studentSchema);
