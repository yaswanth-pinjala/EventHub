const express = require("express");
const router = express.Router();
const path = require("path");

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");
const upload = require("../middleware/upload");

const Project = require("../models/Project");
const {
  uploadProject,
  getProjectsForDept,
  getProjectDashboard,

} = require("../controllers/projectController");


router.get(
  "/dashboard",
  auth,
  role("admin", "project"),
  getProjectDashboard
);

/* =============================
   Upload Project (Admin)
============================= */
router.post(
  "/upload",
  auth,
  role("admin", "project"),
  upload.single("file"),
  uploadProject
);

/* =============================
   Get Projects (Student View)
============================= */
router.get("/", auth, getProjectsForDept);

/* =============================
   Secure Download By Project ID
============================= */
router.get("/download/:id", auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    project.downloadCount = (project.downloadCount || 0) + 1;
    await project.save();

    const filePath = path.join(__dirname, "..", project.filePath);

    const fileName = project.filePath.split("\\").pop().split("/").pop();

    res.download(filePath, fileName);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Download failed" });
  }
});

router.get("/my-projects", auth, async (req, res) => {
  try {


    // ⭐ get correct admin id safely
    const adminId =
      req.user.id ||
      req.user._id ||
      req.user.userId ||
      req.user.adminId;

    if (!adminId) {
      return res.status(400).json({ message: "Admin id missing in token" });
    }

    const projects = await Project.find({
      uploadedBy: adminId
    }).sort({ createdAt: -1 });

    res.json(projects);

  } catch (err) {
    console.error("MY PROJECT ERROR =", err);
    res.status(500).json({ message: "Error fetching projects" });
  }
});


/* =============================
   Get Single Project
============================= */
router.get(
  "/:id",
  auth,
  role("admin", "project"),
  async (req, res) => {
    try {
      const project = await Project.findById(req.params.id);

      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }

      res.json(project);

    } catch (err) {
      res.status(500).json({ message: "Error fetching project" });
    }
  }
);

/* =============================
   Update Project
============================= */
router.put(
  "/:id",
  auth,
  role("admin", "project"),
  upload.single("file"),
  async (req, res) => {
    try {
      const updateData = {
        title: req.body.title,
        abstract: req.body.abstract,
        year: req.body.year,
        tags: req.body.tags,
        githubUrl: req.body.githubUrl,
        guideName: req.body.guideName,
      };

      if (req.file) {
        updateData.filePath = req.file.path;
      }

      const project = await Project.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true }
      );

      res.json({ message: "Project updated", project });

    } catch (err) {
      res.status(500).json({ message: "Update failed" });
    }
  }
);

/* =============================
   Delete Project
============================= */
router.delete(
  "/:id",
  auth,
  role("admin", "project"),
  async (req, res) => {
    try {
      await Project.findByIdAndDelete(req.params.id);
      res.json({ message: "Project deleted" });
    } catch (err) {
      res.status(500).json({ message: "Delete failed" });
    }
  }
);



module.exports = router;