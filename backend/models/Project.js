const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  title: String,
  abstract: String,
  department: String,
  year: String,
  filePath: String,
  githubUrl: String,
  tags: [String],
  teamMembers: [String],
  guideName: String,
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" }
});

module.exports = mongoose.model("Project", projectSchema);
