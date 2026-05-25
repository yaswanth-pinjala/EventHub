const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");
const upload = require("../middleware/upload");
const Event = require("../models/Event");
const Registration = require("../models/Registration");
const { createEvent, getAllEvents, getEventRegistrations,getEventById, updateEvent, deleteEvent,downloadEventReport } = require("../controllers/eventController");
// Public / student view
router.get("/", getAllEvents);
router.get("/my-events", auth, async (req, res) => {
  try {

    const search = req.query.search || "";

    const events = await Event.find({
      createdBy: req.user.id,
      title: { $regex: search, $options: "i" },
    }).sort({ date: -1 });

    res.json(events);
  } catch (err) {
    console.error("MY EVENTS ERROR:", err);
    res.status(500).json({ message: "Error fetching events" });
  }
});
// Event admin only
router.post(
  "/create",
  auth,
  role("admin", "event"), // 👈 only event admin
  upload.single("posterImage"),
  createEvent
);
router.get(
 "/:eventId/registrations",
 auth,
 role("admin", "event"),
 getEventRegistrations
);
// Update event
router.put(
  "/:id",
  auth,
  role("admin", "event"),
  upload.single("posterImage"),
  updateEvent
);

// Delete event
router.delete(
  "/:id",
  auth,
  role("admin", "event"),
  deleteEvent
);


router.get(
  "/report/:eventId",
  auth,
  role("admin","event"),
  downloadEventReport
);

router.get(
  "/report-data/:eventId",
  auth,
  role("admin","event"),
  async (req, res) => {
    try {
      const registrations = await Registration.find({
        eventId: req.params.eventId
      }).populate("studentId", "name email regNo department year");

      const students = registrations.map((r) => ({
        name: r.studentId.name,
        email: r.studentId.email,
        regNo: r.studentId.regNo,
        department: r.studentId.department,
        year: r.studentId.year,
        registeredAt: r.timestamp
      }));

      res.json(students);

    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error fetching report data" });
    }
  }
);

router.get("/:id", getEventById);
module.exports = router;