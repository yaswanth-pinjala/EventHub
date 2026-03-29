const Project = require("../models/Project");
/**
 * Project admins upload and manage projects department-wise.
 */
exports.uploadProject = async (req, res) => {
 try {
 const { title, abstract, year, githubUrl, tags, teamMembers,guideName } = req.body;
 const project = new Project({
 title,
 abstract,
 department: req.user.department, // from token for project admin
 year,
 filePath: req.file.path,
 githubUrl,
 tags: tags ? tags.split(",").map(t => t.trim()) : [],
 teamMembers: teamMembers ? teamMembers.split(",").map(t => t.trim()) : [],
    guideName,
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

exports.getProjectDashboard = async (req, res) => {
  try {

    const adminId = req.user.id;

    // total projects in system
    const totalProjects = await Project.countDocuments();

    // projects uploaded by this admin
    const managedProjects = await Project.countDocuments({
      uploadedBy: adminId
    });

    // total downloads
    const allProjects = await Project.find();

    const totalDownloads = allProjects.reduce(
      (sum, p) => sum + (p.downloadCount || 0),
      0
    );

    // recent uploaded projects by admin
    const recentProjects = await Project.find({
      uploadedBy: adminId
    })
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      totalProjects,
      managedProjects,
      totalDownloads,
      recentProjects
    });

  } catch (err) {
    console.error("Dashboard error", err);
    res.status(500).json({ message: "Dashboard error" });
  }
};

