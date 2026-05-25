import React, { useEffect, useState } from "react";
import API from "../services/api"; // make sure this path is correct

const TeacherUpcomingEvents = () => {
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await API.get("/events");

        const today = new Date();

        // Filter only future events
        const upcoming = res.data.filter((event) => {
          return new Date(event.date) > today;
        });

        setUpcomingEvents(upcoming);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div>
      <header className="bg-white shadow-md px-6 py-4 sticky top-0 z-20">
        <h1 className="text-xl font-semibold">Upcoming Events</h1>
      </header>
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex">
        <div className="flex-1 p-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingEvents.map((event) => (
              <div
                key={event._id}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition duration-300"
              >
                {/* Image Section */}
                <div className="relative">
                  <img
                    src={
                      event.posterImage
                        ? `https://eventhub-ln9y.onrender.com/${event.posterImage}`
                        : ""
                    }
                    alt={event.title}
                    className="h-48 w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

                  <span className="absolute top-4 right-4 bg-yellow-400 text-black text-sm px-3 py-1 rounded-full font-semibold shadow-md">
                    {new Date(event.date).toDateString()}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-2">
                    {event.title}
                  </h2>

                  <p className="text-gray-600 text-sm mb-1">
                    🏫 {event.eligibility}
                  </p>

                  <p className="text-gray-600 text-sm mb-4">🎓 {event.year}</p>

                  <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherUpcomingEvents;
