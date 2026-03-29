const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const {
  registerForEvent,
  getMyRegistrations,
  getAllRegistrations,
  getRegistrationsByEvent
} = require("../controllers/registrationController");

// Student registers for event
router.post("/register", auth, registerForEvent);

// Student gets his registered events
router.get("/my", auth, getMyRegistrations);

// Staff gets all registrations
router.get("/", getAllRegistrations);

// Staff gets registrations for a specific event
router.get("/event/:eventId", getRegistrationsByEvent);

module.exports = router;
