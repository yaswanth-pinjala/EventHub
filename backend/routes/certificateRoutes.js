const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const { createCertificateRecord, getCertificatesForStudent } = require("../controllers/certificateController");
// Called by event admin / backend when certificate generated
router.post("/create", auth, createCertificateRecord);
// Student views their certificates
router.get("/my", auth, getCertificatesForStudent);
module.exports = router;