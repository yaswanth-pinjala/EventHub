const Certificate = require("../models/Certificate");

exports.createCertificateRecord = async (req, res) => {
 try {
 const { userId, eventId, certificateURL } = req.body;
 const cert = new Certificate({ userId, eventId, certificateURL });
 await cert.save();
 res.status(201).json({ message: "Certificate record saved", cert });
 } catch (err) {
 res.status(500).json({ message: "Error saving certificate" });
 }
};
exports.getCertificatesForStudent = async (req, res) => {
 const studentId = req.user.id;
 const certs = await Certificate.find({ userId: studentId }).populate("eventId");
 res.json(certs);
};
