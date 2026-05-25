const bcrypt = require("bcryptjs");
const Staff = require("../models/Staff");

exports.changeStaffPassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({
        message: "All fields required"
      });
    }

    const staff = await Staff.findById(req.user.id);

    if (!staff) {
      return res.status(404).json({
        message: "Staff not found"
      });
    }

    const isMatch = await bcrypt.compare(
      oldPassword,
      staff.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Current password incorrect"
      });
    }

    const hash = await bcrypt.hash(newPassword, 10);

    staff.password = hash;
    await staff.save();

    res.json({
      message: "Password updated successfully"
    });

  } catch (err) {
    console.error("CHANGE STAFF PASSWORD ERROR:", err);
    res.status(500).json({
      message: "Server error"
    });
  }
};