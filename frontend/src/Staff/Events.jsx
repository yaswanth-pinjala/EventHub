import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    API.get(`/events/${id}`).then((res) => {
      console.log("EVENT DATA:", res.data);
      setEvent(res.data);
    });
  }, [id]);

  if (!event) return <p>Loading...</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <button onClick={() => navigate(-1)} className="mb-4 text-blue-600">
        ← Back
      </button>

      <img
        src={`http://localhost:5000/${event.posterImage}`}
        alt={event.title}
        className="w-full h-64 object-cover rounded-lg mb-4"
      />

      <p>
        <strong>Name : </strong>
        {event.title}
      </p>
      <p>
        <strong>Venue:</strong> {event.venue}
      </p>
      <p>
        <strong>Date:</strong> {event.date}
      </p>
      <p className="mt-3">{event.description}</p>
    </div>
  );
};

export default EventDetails;