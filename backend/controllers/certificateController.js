const Certificate = require("../models/Certificate");
const Student = require("../models/Student");
const path = require("path");
const Notification = require("../models/Notification");
const fs = require("fs");
const AdmZip = require("adm-zip");

exports.uploadZipCertificates = async (req, res) => {

  try {

    const { eventId } = req.params;

    if (!req.file) {
      return res.status(400).json({ message: "No zip uploaded" });
    }

    const zipPath = req.file.path;

    const zip = new AdmZip(zipPath);

    const extractPath = "uploads/certificates";

    zip.extractAllTo(extractPath, true);

    const files = fs.readdirSync(extractPath);

    let uploaded = 0;

    for (const file of files) {

      const regNo = file.split(".")[0];

      const student = await Student.findOne({ regNo });

      if (!student) continue;

      const cert = new Certificate({
        userId: student._id,
        eventId,
        certificateURL: `uploads/certificates/${file}`
      });

      await cert.save();

       /* Send notification */
      await Notification.create({
        userId: student._id,
        message: "Your event certificate has been uploaded"
      });

      uploaded++;

    }

    res.json({
      message: "Certificates processed",
      uploaded
    });

  } catch (error) {

    console.error("ZIP CERTIFICATE ERROR:", error);

    res.status(500).json({
      message: "Error processing certificates"
    });

  }

};


exports.getCertificatesForStudent = async (req, res) => {
  const studentId = req.user.id;
  const certs = await Certificate.find({ userId: studentId }).populate("eventId");
  res.json(certs);
};

exports.downloadCertificate = async (req, res) => {
  try {
    const certificate = await Certificate.findById(req.params.id);

    if (!certificate) {
      return res.status(404).json({ message: "Certificate not found" });
    }

    const filePath = path.join(__dirname, "..", certificate.certificateURL);

    res.download(filePath);

  } catch (error) {
    console.error("Download error:", error);
    res.status(500).json({ message: "Download failed" });
  }
};
