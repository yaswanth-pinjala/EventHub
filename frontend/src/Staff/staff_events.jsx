import React, { useEffect, useState } from "react";
import EventTile from "./staff_eventTile";
import API from "../services/api";

const FILTERS = ["All", "Contest", "Workshop", "Competition", "Meetup"];

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await API.get("/events");
        setEvents(res.data || []);
      } catch (err) {
        console.error("Events API error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // 🔹 Filter logic (unchanged UI behavior)
  const filtered = events.filter((e) => filter === "All" || e.type === filter);
  const sortedEvents = [...filtered].sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });

  return (
    <div>
      <header className="bg-white shadow-md px-6 py-4 sticky top-0 z-20">
        <h1 className="text-xl font-semibold">Events</h1>
      </header>
      <div className="px-6 mt-6">
        {/* Main content */}
        <main className="flex-1 p-8">
          <div className="flex items-center justify-between mb-6">
            {/* Filter controls */}
            <div className="flex items-center gap-3">
              <div className="text-sm text-gray-600">filter by</div>

              <div className="relative inline-block">
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="appearance-none bg-white border rounded-md py-2 px-3 pr-8 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                >
                  {FILTERS.map((f) => (
                    <option key={f} value={f}>
                      {f}
                    </option>
                  ))}
                </select>

                <svg
                  className="w-4 h-4 absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    d="M6 9l6 6 6-6"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Events listing */}
          <div className="text-sm text-gray-700 mb-4">list of events</div>

          {loading ? (
            <div className="text-gray-500">Loading events...</div>
          ) : (
            <>
              <div className="px-6 py-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedEvents.map((ev) => (
                  <EventTile key={ev._id} ev={ev} />
                ))}
              </div>

              {filtered.length === 0 && (
                <div className="mt-6 text-gray-500">
                  No events found for selected filter.
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}
