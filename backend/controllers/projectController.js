const Project = require("../models/Project");
/**
 * Project admins upload and manage projects department-wise.
 */
exports.uploadProject = async (req, res) => {
 try {
 const { title, abstract, year, githubUrl, tags, teamMembers } = req.body;
 const project = new Project({
 title,
 abstract,
 department: req.user.department, // from token for project admin
 year,
 filePath: req.file.path,
 githubUrl,
 tags: tags ? tags.split(",").map(t => t.trim()) : [],
 teamMembers: teamMembers ? teamMembers.split(",").map(t => t.trim()) : [],
 uploadedBy: req.user.id
 });
 await project.save();
 res.status(201).json({ message: "Project uploaded", project });
 } catch (err) {
 res.status(500).json({ message: "Error uploading project" });
 }
};
exports.getProjectsForDept = async (req, res) => {
 const dept = req.user.userType === "admin" ? req.user.department : req.query.department;
 const filter = dept ? { department: dept } : {};
 const projects = await Project.find(filter).sort({ createdAt: -1 });
 res.json(projects);
};

