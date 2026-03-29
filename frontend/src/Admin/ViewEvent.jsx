import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";

const ViewEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // 👈 navigation hook
  const [event, setEvent] = useState(null);

  useEffect(() => {
    API.get(`/events/${id}`).then((res) => {
      setEvent(res.data);
    });
  }, [id]);

  if (!event) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        ← Back
      </button>

      <h1 className="text-2xl font-bold mb-2">{event.title}</h1>

      <p className="mb-4">{event.description}</p>

      <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
      <p><strong>Time:</strong> {event.time}</p>
      <p><strong>Venue:</strong> {event.venue}</p>
      <p><strong>Department:</strong> {event.department}</p>

      {event.posterImage && (
        <img
          src={`http://localhost:5000/${event.posterImage}`}
          alt="poster"
          className="mt-4 w-64 rounded shadow"
        />
      )}

    </div>
  );
};

export default ViewEvent;