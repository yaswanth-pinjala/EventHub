import { useEffect, useState } from "react";
import API from "../services/api";

const EventCertificates = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState("");
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  /* Fetch admin events */
  useEffect(() => {
    const fetchEvents = async () => {
      const res = await API.get("/events/my-events");

      setEvents(res.data);
    };

    fetchEvents();
  }, []);

  const handleUpload = async () => {
    if (!selectedEvent || !files) {
      alert("Select event and zip file");
      return;
    }

    const data = new FormData();

    data.append("zip", files);

    try {
      setUploading(true);

      await API.post(`/certificates/upload-zip/${selectedEvent}`, data);

      alert("Certificates uploaded successfully");
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <header className="bg-white shadow-md px-6 py-4">
        <h1 className="text-xl font-semibold">Event Certificates</h1>
      </header>

      <div className="p-8 max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow p-6 space-y-6">
          <h2 className="text-lg font-semibold">Upload Event Certificates</h2>

          {/* Select Event */}
          <div>
            <label className="block mb-2 font-medium">Select Event</label>

            <select
              className="w-full border rounded-lg px-4 py-2"
              value={selectedEvent}
              onChange={(e) => setSelectedEvent(e.target.value)}
            >
              <option value="">Select Event</option>

              {events.map((event) => (
                <option key={event._id} value={event._id}>
                  {event.title}
                </option>
              ))}
            </select>
          </div>

          {/* Upload Certificates */}
          <div>
            <label className="block mb-2 font-medium">
              Upload Certificates
            </label>

            <input
              type="file"
              accept=".zip"
              onChange={(e) => setFiles(e.target.files[0])}
            />

            <p className="text-sm text-gray-500 mt-2">
              File name must be Student RegNo Example: <b>Y22ACS529.pdf</b>
            </p>
          </div>

          {/* Upload Button */}
          <button
            onClick={handleUpload}
            disabled={uploading}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            {uploading ? "Uploading..." : "Upload Certificates"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCertificates;
