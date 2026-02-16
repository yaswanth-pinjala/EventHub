const Student = require("../models/Student");

exports.getMyProfile = async (req, res) => {
  try {
    const student = await Student.findById(req.user.id).select("-password");
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch profile" });
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
