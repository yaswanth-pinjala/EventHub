const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const { login, registerStudent } = require("../controllers/authController");
// Student registration (if needed)
router.post(
  "/register-student",
  upload.single("idCardUpload"),
  registerStudent
);

// Common login (student / staff / admin)
router.post("/login", login);
module.exports = router;