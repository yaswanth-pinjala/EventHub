import React, { useEffect, useState } from "react";
import API from "../services/api";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const COLORS = ["#2563eb", "#06b6d4", "#f59e0b", "#ef4444", "#8b5cf6", "#10b981"];

const EventAdminDashboard = () => {
  const [stats, setStats] = useState({
    totalEvents: 0,
    totalRegistrations: 0,
    upcomingEvents: 0,
  });

  const [trendData, setTrendData] = useState([]);
  const [deptData, setDeptData] = useState([]);
  const [recentEvents, setRecentEvents] = useState([]);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await API.get("/admin/dashboard");

        setStats(res.data.stats);
        //console.log("stats Data:", res.data.stats);
        setTrendData(res.data.trend);
        setDeptData(res.data.departmentBreakdown);
        setRecentEvents(res.data.recentEvents);
      } catch (err) {
        console.log("Using demo data");

        // Demo Data
        setStats({
          totalEvents: 25,
          totalRegistrations: 1375,
          upcomingEvents: 8,
        });

        setTrendData([
          { month: "Jan", registrations: 120 },
          { month: "Feb", registrations: 210 },
          { month: "Mar", registrations: 180 },
          { month: "Apr", registrations: 260 },
          { month: "May", registrations: 320 },
        ]);

        setDeptData([
          { name: "Engineering", value: 400 },
          { name: "Science", value: 300 },
          { name: "Business", value: 250 },
          { name: "Arts", value: 180 },
          { name: "Mathematics", value: 120 },
          { name: "Other", value: 125 },
        ]);

        setRecentEvents([
          {
            title: "Coding Workshop",
            date: "Feb 20, 2024",
            registrations: 120,
          },
          {
            title: "Sports Meet",
            date: "Feb 18, 2024",
            registrations: 230,
          },
          {
            title: "Art Exhibition",
            date: "Feb 15, 2024",
            registrations: 95,
          },
        ]);
      }
    };

    fetchDashboard();
  }, []);

  return (
    <div className="p-6 space-y-6">
      {/* TOP STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Events" value={stats.totalEvents} />
        <StatCard title="Total Registrations" value={stats.totalRegistrations} />
        <StatCard title="Upcoming Events" value={stats.upcomingEvents} />
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Registration Trend */}
        <div className="bg-white rounded-xl shadow p-5">
          <h3 className="font-semibold mb-4">Registrations Over Time</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={trendData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="registrations"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Department Breakdown */}
        <div className="bg-white rounded-xl shadow p-5">
          <h3 className="font-semibold mb-4">Department Breakdown</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={deptData}
                dataKey="value"
                outerRadius={90}
                label
              >
                {deptData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* RECENT EVENTS TABLE */}
      <div className="bg-white rounded-xl shadow p-5">
        <h3 className="font-semibold mb-4">Recent Events</h3>

        <table className="w-full text-sm">
          <thead className="text-gray-500 border-b">
            <tr>
              <th className="text-left py-2">Event</th>
              <th className="text-left py-2">Date</th>
              <th className="text-left py-2">Registrations</th>
            </tr>
          </thead>
          <tbody>
            {recentEvents.map((event, i) => (
              <tr key={i} className="border-b last:border-none">
                <td className="py-2">{event.title}</td>
                <td>{event.date}</td>
                <td>{event.registrations}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EventAdminDashboard;

/* ---------- Stat Card ---------- */
const StatCard = ({ title, value }) => {
  return (
    <div className="bg-white shadow rounded-xl p-5">
      <p className="text-gray-500 text-sm">{title}</p>
      <h2 className="text-2xl font-bold mt-1">{value}</h2>
    </div>
  );
};