const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  staffId: String,
  idCardUpload: String,
  department: String
});

module.exports = mongoose.model("Staff", staffSchema);
