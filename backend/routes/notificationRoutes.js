const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");
const { getNotificationsForStudent } = require("../controllers/notificationController");
// Admin creates notification
router.get("/notifications", auth, async (req, res) => {

  const notifications = await Notification.find({
    userId: req.user.id
  }).sort({ createdAt: -1 });

  res.json(notifications);
});
// Student fetches notifications
router.get(
 "/student",
 auth,
 getNotificationsForStudent
);
module.exports = router;