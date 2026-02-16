const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");
const upload = require("../middleware/upload");
const { uploadProject, getProjectsForDept } = require("../controllers/projectController");
// For project admin upload
router.post(
 "/upload",
 auth,
 role("admin", "project"),
 upload.single("file"),
 uploadProject
);
// For students/staff to view (department filter via query or token)
router.get("/", auth, getProjectsForDept);
module.exports = router;