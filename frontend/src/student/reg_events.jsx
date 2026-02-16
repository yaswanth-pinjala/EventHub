import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const RegisteredEvents = () => {
  const [allEvents, setAllEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    type: "",
    dept: "",
    status: "",
  });

  useEffect(() => {
    const fetchRegisteredEvents = async () => {
      try {
        const res = await API.get("/registrations/my");

        const mappedEvents = (res.data.registrations || []).map((r) => ({
          id: r.eventId._id, // IMPORTANT
          title: r.eventId.title,
          date: new Date(r.eventId.date).toDateString(),
          venue: r.eventId.venue,
          dept: r.eventId.department,
          type: r.eventId.type,
          description: r.eventId.description,
          status: r.status || "Registered",
          poster: r.eventId.posterImage
            ? `http://localhost:5000/${r.eventId.posterImage}`
            : null,
        }));

        setAllEvents(mappedEvents);
      } catch (err) {
        console.error("Registered Events API error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRegisteredEvents();
  }, []);

  const filteredEvents = allEvents.filter((event) => {
    return (
      (filters.type ? event.type === filters.type : true) &&
      (filters.dept ? event.dept === filters.dept : true) &&
      (filters.status ? event.status === filters.status : true)
    );
  });

  if (loading) {
    return (
      <div className="p-6 text-gray-500">Loading registered events...</div>
    );
  }

  return (
    <div>
      <header className="bg-white shadow-md px-6 py-4">
        <h1 className="text-xl font-semibold">Registered Events</h1>
      </header>

      {/* EVENTS LIST */}
      <div className="px-6 py-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event) => (
          <div
            key={event.id}
            className="bg-white rounded-xl shadow hover:shadow-lg transition-shadow duration-300 overflow-hidden"
          >
            {event.poster && (
              <img
                src={event.poster}
                alt={event.title}
                className="w-full h-40 object-cover"
              />
            )}

            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">
                {event.title}
              </h3>

              <p className="text-sm text-gray-600 mt-1">
                📍 Venue: {event.venue}
              </p>

              <p className="text-sm text-gray-600">📅 Date: {event.date}</p>

              <p className="text-sm text-gray-500 mt-2 line-clamp-3">
                {event.description}
              </p>
            </div>

            <div className="px-4 py-3 border-t flex items-center justify-between">
              {/* FIXED NAVIGATION */}
              <button
                className="px-4 py-1 bg-blue-600 text-white rounded"
                onClick={() => navigate(`/student/events/${event.id}`)}
              >
                View
              </button>

              <span
                className={`text-xs px-3 py-1 rounded-full font-medium ${
                  event.status === "Registered"
                    ? "bg-green-100 text-green-700"
                    : "bg-blue-100 text-blue-700"
                }`}
              >
                {event.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RegisteredEvents;
