const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const { login, registerStudent,registerStaff,forgotPassword,resetPassword } = require("../controllers/authController");
// Student registration (if needed)
router.post(
  "/register-student",
  upload.single("idCardUpload"),
  registerStudent
);
// Staff registration (if needed)
router.post(
  "/register-staff",
  upload.single("idCardUpload"),
  registerStaff
);

// Common login (student / staff / admin)
router.post("/login", login);

router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

module.exports = router;