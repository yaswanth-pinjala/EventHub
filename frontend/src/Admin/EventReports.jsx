import { useEffect, useState } from "react";
import API from "../services/api";

const EventReports = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState("");
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchMyEvents();
  }, []);

  const fetchMyEvents = async () => {
    try {
      const res = await API.get("/events/my-events");
      setEvents(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEventChange = async (eventId) => {
    setSelectedEvent(eventId);

    if (!eventId) return;

    try {
      const res = await API.get(`/events/report-data/${eventId}`);
      setStudents(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const downloadReport = async () => {
    try {
      const res = await API.get(`/events/report/${selectedEvent}`, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");

      link.href = url;
      link.setAttribute("download", "event-report.csv");

      document.body.appendChild(link);
      link.click();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Event Reports</h1>

      <div className="bg-white shadow-lg p-6 rounded-xl">
        {/* Event Select */}
        <label className="block mb-2 font-medium">Select Event</label>

        <select
          value={selectedEvent}
          onChange={(e) => handleEventChange(e.target.value)}
          className="w-full border rounded-lg px-4 py-2 mb-4"
        >
          <option value="">Choose Event</option>

          {events.map((event) => (
            <option key={event._id} value={event._id}>
              {event.title}
            </option>
          ))}
        </select>

        {/* Download Button */}
        {selectedEvent && (
          <button
            onClick={downloadReport}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg mb-6"
          >
            Download Report
          </button>
        )}
        <p className="mb-4 font-semibold">
          Total Registrations: {students.length}
        </p>

        {/* Student Table */}
        {students.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 border">S.No</th>
                  <th className="p-2 border">Name</th>
                  <th className="p-2 border">Email</th>
                  <th className="p-2 border">Reg No</th>
                  <th className="p-2 border">Department</th>
                  <th className="p-2 border">Year</th>
                </tr>
              </thead>

              <tbody>
                {students.map((s, index) => (
                  <tr key={index}>
                    <td className="p-2 border">{index + 1}</td>
                    <td className="p-2 border">{s.name}</td>
                    <td className="p-2 border">{s.email}</td>
                    <td className="p-2 border">{s.regNo}</td>
                    <td className="p-2 border">{s.department}</td>
                    <td className="p-2 border">{s.year}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventReports;
