const Student = require("../models/Student");
const bcrypt = require("bcryptjs");

exports.getMyProfile = async (req, res) => {
  try {
    const student = await Student.findById(req.user.id).select("-password");
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch profile" });
  }
};

exports.changeStudentPassword = async (req, res) => {
  try {
    const student = await Student.findById(req.user.id);

    const isMatch = await bcrypt.compare(
      req.body.oldPassword,
      student.password
    );

    if (!isMatch) {
      return res.status(400).json({ message: "Current password wrong" });
    }

    const hash = await bcrypt.hash(req.body.newPassword, 10);
    student.password = hash;
    await student.save();

    res.json({ message: "Password updated successfully" });

  } catch (err) {
    res.status(500).json({ message: "Password change failed" });
  }
};

exports.updateMyProfile = async (req, res) => {
  try {
    const updates = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      year: req.body.year,
    };

    if (req.file) {
      updates.photo = req.file.path;
    }

    const student = await Student.findByIdAndUpdate(
      req.user.id,
      updates,
      { new: true }
    ).select("-password");

    res.json(student);
  } catch (err) {
    res.status(500).json({ message: "Failed to update profile" });
  }
};
