const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const {
  registerForEvent,
  getMyRegistrations
} = require("../controllers/registrationController");

// Student registers for event
router.post("/register", auth, registerForEvent);

// Student gets his registered events
router.get("/my", auth, getMyRegistrations);

module.exports = router;
