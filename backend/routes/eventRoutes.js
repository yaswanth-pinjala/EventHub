const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");
const upload = require("../middleware/upload");
const { createEvent, getAllEvents, getEventRegistrations,getEventById } = require("../controllers/eventController");
// Public / student view
router.get("/", getAllEvents);
router.get("/:id", getEventById);
// Event admin only
router.post(
 "/create",
 auth,
 role("admin", "event"),
 upload.single("posterImage"),
 createEvent
);
router.get(
 "/:eventId/registrations",
 auth,
 role("admin", "event"),
 getEventRegistrations
);
module.exports = router;