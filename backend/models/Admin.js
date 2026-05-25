const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  regNo: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["event", "project"], // ✅ matches your DB
    required: true,
  },
  department: String,
  idCardUpload: String,
});

module.exports = mongoose.model("Admin", adminSchema);