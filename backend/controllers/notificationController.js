const Notification = require("../models/Notification");
const Student = require("../models/Student");
const transporter = require("../config/email");
/**
 * Save notification + (optionally) send emails.
 */
exports.getNotificationsForStudent = async (req, res) => {
  try {

    const notes = await Notification.find({
      userId: req.user.id
    }).sort({ createdAt: -1 });

    res.json(notes);

  } catch (err) {
    console.error("FETCH NOTIFICATIONS ERROR:", err);
    res.status(500).json({ message: "Error fetching notifications" });
  }
};

