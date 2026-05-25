import { useEffect, useState } from "react";
import API from "../services/api";
import StatCard from "../components/StatCard";
import EventCard from "../components/EventCard";
import EventTile from "../components/EventTile";

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const eventsRes = await API.get("/events");
        console.log("EVENTS API RESPONSE:", eventsRes.data);
        const registrationsRes = await API.get("/registrations/my");
        console.log("Registered events:", registrationsRes.data);
        const certificatesRes = await API.get("/certificates/my");
        console.log("Certificates:", certificatesRes.data);
        //const notificationsRes = await API.get("/notifications/student");

        setEvents(eventsRes.data || []);
        setRegistrations(registrationsRes.data.registrations || []);
        setCertificates(certificatesRes.data || []);
        //setNotifications(notificationsRes.data || []);
      } catch (error) {
        console.error("Dashboard API error:", error.response?.data || error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return <div className="p-6 text-gray-500">Loading dashboard...</div>;
  }
    const now = new Date();

  // Recent Events → latest added (max 3)
  const recentEvents = [...events]
    .sort(
      (a, b) =>
        new Date(b.createdAt || b.date) -
        new Date(a.createdAt || a.date)
    )
    .slice(0, 3);

  // Upcoming Events → future only
  const upcomingEvents = events.filter(
    (event) => new Date(event.date) >= now
  );

  return (
    <div>
      <header className="bg-white shadow-md px-6 py-4 sticky top-0 z-20">
        <h1 className="text-xl font-semibold">Dashboard</h1>
      </header>
    <div className="p-6 space-y-8">
      {/* TOP STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Events" value={events.length} />
        <StatCard title="Registered Events" value={registrations.length} />
        <StatCard title="Certificates" value={certificates.length} />
        {/*
        <StatCard title="Notifications" value={notifications.length} />
        */}
      </div>

      {/* RECENT EVENTS */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Recent Events</h2>

        <div className="bg-blue-50 p-6 rounded-2xl flex flex-wrap gap-6">
          {recentEvents.map((event) => {
            const dateObj = new Date(event.date);
            const day = dateObj.getDate();
            const month = dateObj.toLocaleString("default", { month: "short" });

            return (
              <div
                key={event._id}
                className="flex items-center gap-4 bg-white rounded-xl shadow px-6 py-4 min-w-[260px]"
              >
                <div className="bg-blue-600 text-white rounded-lg text-center px-3 py-2 leading-tight">
                  <p className="text-xl font-bold">{day}</p>
                  <p className="text-sm">{month}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-blue-700">{event.title}</h3>

                  <p className="text-sm text-gray-500">
                    {dateObj.toDateString()}
                  </p>

                  <p className="text-sm text-gray-600">{event.type}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* UPCOMING EVENTS */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Upcoming Events</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingEvents.slice(0, 6).map((event) => (
            <EventTile key={event._id} ev={event} />
          ))}
        </div>
      </div>
    </div>
    </div>
  );
};

export default Dashboard;
