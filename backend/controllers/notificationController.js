const Notification = require("../models/Notification");
const Student = require("../models/Student");
const transporter = require("../config/email");
/**
 * Save notification + (optionally) send emails.
 */
exports.createNotification = async (req, res) => {
 try {
 const { title, message, targetRole, sendEmail } = req.body;
 const notification = new Notification({ title, message, targetRole });
 await notification.save();
 if (sendEmail) {
 let recipients = [];
 if (targetRole === "student" || targetRole === "all") {
 const students = await Student.find().select("email");
 recipients = students.map(s => s.email);
 }
 if (recipients.length > 0) {
 await transporter.sendMail({
 from: process.env.EMAIL,
 to: recipients,
 subject: title,
 html: `<h3>${title}</h3><p>${message}</p><hr/><p>EventHub</p>`
 });
 }
 }
 res.status(201).json({ message: "Notification created", notification });
 } catch (err) {
 res.status(500).json({ message: "Error creating notification" });
 }
};
exports.getNotificationsForStudent = async (req, res) => {
 const notes = await Notification.find({
 $or: [{ targetRole: "student" }, { targetRole: "all" }]
 }).sort({ createdAt: -1 });
 res.json(notes);
};

