import React, { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

const EventsPageAdmin = () => {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const fetchEvents = async () => {
    try {
      const res = await API.get(`/events/my-events?search=${search}`);
      setEvents(res.data);
    } catch (err) {
      console.error("Error fetching events");
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [search]);

  const deleteEvent = async (id) => {
    if (!window.confirm("Delete this event?")) return;

    try {
      await API.delete(`/events/${id}`);
      fetchEvents();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6">
      
      {/* 🔹 Top Section */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">My Events</h2>

        <button
          onClick={() => navigate("/admin/create-event")}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          + Create Event
        </button>
      </div>

      {/* 🔹 Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search your events..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border rounded-lg px-4 py-2"
        />
      </div>

      {/* 🔹 Events List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.length === 0 ? (
          <p>No events found</p>
        ) : (
          events.map((event) => (
            <div
              key={event._id}
              className="bg-white shadow rounded-xl p-4"
            >
              <img
                src={`http://localhost:5000/${event.posterImage}`}
                alt={event.title}
                className="h-40 w-full object-cover rounded-lg mb-3"
              />

              <h3 className="font-semibold text-lg">{event.title}</h3>
              <p className="text-sm text-gray-500">
                {new Date(event.date).toLocaleDateString()}
              </p>
              <p className="text-sm mt-2">{event.venue}</p>
              <div className="flex gap-2 mt-3">

            <button
              onClick={() =>
                navigate(`/admin/view-event/${event._id}`)
              }
              className="bg-blue-500 text-white px-3 py-1 rounded"
            >
              View
            </button>

            <button
              onClick={() =>
                navigate(`/admin/edit-event/${event._id}`)
              }
              className="bg-yellow-500 text-white px-3 py-1 rounded"
            >
              Edit
            </button>

            <button
              onClick={() => deleteEvent(event._id)}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>

          </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default EventsPageAdmin;