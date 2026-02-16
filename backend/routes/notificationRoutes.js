const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");
const { createNotification, getNotificationsForStudent } = require("../controllers/notificationController");
// Admin creates notification
router.post(
 "/create",
 auth,
 role("admin"),
 createNotification
);
// Student fetches notifications
router.get(
 "/student",
 auth,
 getNotificationsForStudent
);
module.exports = router;