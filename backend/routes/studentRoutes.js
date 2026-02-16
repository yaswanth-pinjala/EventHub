const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");
const Student = require("../models/Student");

// GET MY PROFILE
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const student = await Student.findById(req.user.id).select("-password");
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json(student);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to load profile" });
  }
});

// UPDATE MY PROFILE
router.put(
  "/me",
  authMiddleware,
  upload.single("photo"),
  async (req, res) => {
    try {
      const updates = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        year: req.body.year,
      };

      if (req.file) {
        updates.photo = req.file.path;
      }

      const student = await Student.findByIdAndUpdate(
        req.user.id,
        updates,
        { new: true }
      ).select("-password");

      res.json(student);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to update profile" });
    }
  }
);

module.exports = router;
