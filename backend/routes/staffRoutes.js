const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const Staff = require("../models/Staff");
const { changeStaffPassword } = require("../controllers/staffController");
const role = require("../middleware/roleMiddleware");



router.get("/me", authMiddleware, async (req, res) => {
  try {
    const staff = await Staff.findById(req.user.id).select("-password");
    res.json(staff);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.put(
  "/change-password",
  authMiddleware,
  role("staff"),
  changeStaffPassword
);

module.exports = router;