const express = require("express");
const router = express.Router();
const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");
const { getEventAdminStats,changeAdminPassword,getProjectAdminStats } = require("../controllers/adminController");

router.get(
  "/event-stats",
  auth,
  role("admin", "event"),
  getEventAdminStats
);

router.get(
  "/project-stats",
  auth,
  role("admin", "project"),
  getProjectAdminStats
);
// GET logged-in admin
router.get("/me", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.userType !== "admin") {
      return res.status(403).json({ message: "Not admin" });
    }

    const admin = await Admin.findById(decoded.id).select("-password");

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.json(admin);

  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
});

router.put(
  "/change-password",
  auth,
  role("admin"),   // any admin type allowed
  changeAdminPassword
);

module.exports = router;