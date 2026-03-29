const express = require("express");
const router = express.Router();

const Event = require("../models/Event");
const Registration = require("../models/Registration");

// GET Admin Dashboard Data
router.get("/dashboard", async (req, res) => {
  try {
    const now = new Date();

    // 🔹 TOTAL EVENTS
    const totalEvents = await Event.countDocuments();

    // 🔹 TOTAL REGISTRATIONS
    const totalRegistrations = await Registration.countDocuments();

    // 🔹 UPCOMING EVENTS
    const upcomingEvents = await Event.countDocuments({
      date: { $gt: now },
    });

    // 🔹 REGISTRATION TREND (Monthly)
    const trendData = await Registration.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$timestamp" },
            month: { $month: "$timestamp" },
          },
          registrations: { $sum: 1 },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
        },
      },
    ]);

    const monthNames = [
      "Jan","Feb","Mar","Apr","May","Jun",
      "Jul","Aug","Sep","Oct","Nov","Dec"
    ];

    const trend = trendData.map(item => ({
      month: monthNames[item._id.month - 1],
      registrations: item.registrations,
    }));

    // 🔹 DEPARTMENT BREAKDOWN
    const deptData = await Registration.aggregate([
      {
        $lookup: {
          from: "students",
          localField: "studentId",
          foreignField: "_id",
          as: "student",
        },
      },
      { $unwind: "$student" },
      {
        $group: {
          _id: "$student.department",
          value: { $sum: 1 },
        },
      },
    ]);

    const departmentBreakdown = deptData.map(d => ({
      name: d._id,
      value: d.value,
    }));

    // 🔹 RECENT EVENTS WITH REGISTRATION COUNT
    const recentEventsRaw = await Event.find()
      .sort({ date: -1 })
      .limit(5);

    const recentEvents = await Promise.all(
      recentEventsRaw.map(async (event) => {
        const count = await Registration.countDocuments({
          eventId: event._id,
        });

        return {
          title: event.title,
          date: event.date,
          registrations: count,
        };
      })
    );

    // 🔹 FINAL RESPONSE
    res.json({
      stats: {
        totalEvents,
        totalRegistrations,
        upcomingEvents,
      },
      trend,
      departmentBreakdown,
      recentEvents,
    });

  } catch (err) {
    console.error("Admin dashboard error:", err);
    res.status(500).json({ message: "Dashboard error" });
  }
});

module.exports = router;