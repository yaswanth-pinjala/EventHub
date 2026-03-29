const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const multer = require("multer");
const upload = require("../middleware/uploadCertificates");
const uploadZip = require("../middleware/uploadZip");
const {
  uploadZipCertificates,
  getCertificatesForStudent,
  downloadCertificate
} = require("../controllers/certificateController");
const role = require("../middleware/roleMiddleware");

/* Admin uploads certificate */

router.post(
  "/upload-zip/:eventId",
  auth,
  role("admin","event"),
  uploadZip.single("zip"),
  uploadZipCertificates
);

/* Student views certificates */
router.get("/my", auth, getCertificatesForStudent);
/* Download certificate */
router.get("/download/:id", auth, downloadCertificate);

module.exports = router;
