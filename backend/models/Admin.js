const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  regNo: String,
  idCardUpload: String,
  role: { type: String, enum: ["event", "project"] },
  department: String
});

module.exports = mongoose.model("Admin", adminSchema);
