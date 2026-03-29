const Event = require("../models/Event");
const Registration = require("../models/Registration");
const Certificate = require("../models/Certificate");
const bcrypt = require("bcryptjs");
const Admin = require("../models/Admin");
const Project = require("../models/Project");

exports.getProjectAdminStats = async (req, res) => {
  try {
    const adminId = req.user.id;

    // total projects uploaded
    const totalProjects = await Project.countDocuments({
      uploadedBy: adminId,
    });

    // total downloads count
    const projects = await Project.find({ uploadedBy: adminId });

    let totalDownloads = 0;

    projects.forEach(p => {
      totalDownloads += p.downloadCount || 0;
    });


    res.json({
      totalProjects,
      totalDownloads
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Project stats error" });
  }
};

exports.changeAdminPassword = async (req, res) => {
  try {
    const adminId = req.user.id;
    const { oldPassword, newPassword } = req.body;

    const admin = await Admin.findById(adminId);

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // check old password
    const isMatch = await bcrypt.compare(oldPassword, admin.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Old password incorrect" });
    }

    // hash new password
    const salt = await bcrypt.genSalt(10);
    admin.password = await bcrypt.hash(newPassword, salt);

    await admin.save();

    res.json({ message: "Password updated successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Password change failed" });
  }
};

exports.getEventAdminStats = async (req, res) => {
  try {
    const adminId = req.user.id;

    // total events created by this admin
    const totalEvents = await Event.countDocuments({
      createdBy: adminId,
    });

    // get all event ids
    const events = await Event.find({ createdBy: adminId }).select("_id");

    const eventIds = events.map(e => e._id);

    // total registrations for admin events
    const totalRegistrations = await Registration.countDocuments({
      eventId: { $in: eventIds }
    });

    // total certificates issued
    const totalCertificates = await Certificate.countDocuments({
      eventId: { $in: eventIds }
    });

    res.json({
      totalEvents,
      totalRegistrations,
      totalCertificates
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Stats error" });
  }
};