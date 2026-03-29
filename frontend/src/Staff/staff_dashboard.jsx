import { useState, useEffect } from "react";
import API from "../services/api";

const StaffDashboard = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [totalStudents, setTotalStudents] = useState(0);
  // 🔹 Backend States
  const [projects, setProjects] = useState([]);
  const [recentEvents, setRecentEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  // 🔹 Fetch Data From Backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Projects
        const projectRes = await API.get("/projects");
        setProjects(projectRes.data);

        // Events
        const eventRes = await API.get("/events");

        const today = new Date();
        const recent = [];
        const upcoming = [];

        eventRes.data.forEach((event) => {
          const eventDate = new Date(event.date);

          if (eventDate < today) {
            recent.push(event);
          } else {
            upcoming.push(event);
          }
        });

        setRecentEvents(recent);
        setUpcomingEvents(upcoming);

        // 🔥 Fetch Registrations
        const registrationRes = await API.get("/registrations");

        // Count unique students
        const uniqueStudents = new Set(
          registrationRes.data.map((r) => r.studentId),
        );

        setTotalStudents(uniqueStudents.size);
      } catch (error) {
        console.error("Dashboard fetch error:", error);
      }
    };

    fetchData();
  }, []);

  // 🔹 Stats
  const totalProjects = projects.length;
  const totalEvents = recentEvents.length + upcomingEvents.length;

  return (
      <div>
        <header className="bg-white shadow-md px-6 py-4 sticky top-0 z-20">
        <h1 className="text-xl font-semibold">Dashboard</h1>
      </header>
    <div className="p-6 space-y-10 bg-gray-50 min-h-screen">

      {/* TOP STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl">
        <div className="flex items-center justify-between bg-white rounded-2xl shadow p-6">
          <div className="flex items-center gap-4">
            <div className="bg-blue-100 text-blue-600 p-3 rounded-xl">📅</div>
            <p className="font-medium text-blue-700">Total Events</p>
          </div>
          <span className="text-3xl font-bold text-gray-800">
            {totalEvents}
          </span>
        </div>

        <div className="flex items-center justify-between bg-white rounded-2xl shadow p-6">
          <div className="flex items-center gap-4">
            <div className="bg-blue-100 text-blue-600 p-3 rounded-xl">📝</div>
            <p className="font-medium text-blue-700">
              Total Students Registered
            </p>
          </div>
          <span className="text-3xl font-bold text-gray-800">
            {totalStudents}
          </span>
        </div>
        <div className="flex items-center justify-between bg-white rounded-2xl shadow p-6">
          <div className="flex items-center gap-4">
            <div className="bg-blue-100 text-blue-600 p-3 rounded-xl">📁</div>
            <p className="font-medium text-blue-700">Total Projects</p>
          </div>
          <span className="text-3xl font-bold text-gray-800">
            {totalProjects}
          </span>
        </div>
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
          {upcomingEvents.map((event) => (
            <div
              key={event._id}
              className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition"
            >
              <h3 className="text-lg font-semibold text-gray-800">
                {event.title}
              </h3>

              <p className="text-sm text-gray-600 mt-1">
                <strong>Type:</strong> {event.type}
              </p>

              <p className="text-sm text-gray-600">
                <strong>Date:</strong> {new Date(event.date).toDateString()}
              </p>

              <p className="text-sm text-gray-500">
                <strong>Venue:</strong> {event.venue}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* RECENT PROJECTS */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Recent Projects</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project._id}
              className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition"
            >
              <h3 className="text-lg font-semibold text-gray-800">
                {project.title}
              </h3>

              <p className="text-sm text-gray-600 mt-1">
                <strong>Module:</strong> {project.tags[0]}
              </p>

              <p className="text-sm text-gray-600">
                <strong>Guide:</strong> {project.guideName}
              </p>

            </div>
          ))}
        </div>
      </div>

      {/* PROJECT MODAL */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 relative">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
            >
              ✕
            </button>

            <h2 className="text-xl font-bold">{selectedProject.title}</h2>

            <p className="mt-2">
              <strong>Module:</strong> {selectedProject.module}
            </p>

            <p>
              <strong>Guide:</strong> {selectedProject.guide}
            </p>

            <p className="mt-3 text-gray-700">{selectedProject.description}</p>

            <a
              href={`http://localhost:5000/${selectedProject.fileUrl}`}
              download
              className="block text-center mt-6 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
            >
              Download Project
            </a>
          </div>
        </div>
      )}
    </div>
        </div>
  );
};

export default StaffDashboard;
