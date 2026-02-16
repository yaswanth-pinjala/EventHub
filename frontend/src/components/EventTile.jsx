import { useNavigate } from "react-router-dom";
const EventTile = ({ ev }) => {
  const navigate = useNavigate();
  const imageUrl = ev.posterImage
    ? `http://localhost:5000/${ev.posterImage}`
    : null;

  return (
    <div className="bg-white rounded-xl shadow p-4">
      {/* IMAGE */}
      <div className="h-40 w-full rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={ev.title}
            className="h-full w-full object-cover"
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
        ) : (
          <span className="text-gray-400">No Image</span>
        )}
      </div>

      {/* CONTENT */}
      <h3 className="mt-3 font-semibold text-lg">{ev.title}</h3>
      <p className="text-sm text-gray-500">Event</p>

      <div className="mt-2 text-sm text-gray-600">📍 Venue: {ev.venue}</div>
      <div className="text-sm text-gray-600">
        📅 Date: {new Date(ev.date).toDateString()}
      </div>

      <div className="mt-4 flex gap-2">
        <button
          className="px-4 py-1 bg-blue-600 text-white rounded"
          onClick={() => navigate(`/student/events/${ev._id}`)}
        >
          View
        </button>
        <button className="px-4 py-1 border border-blue-600 text-blue-600 rounded">
          Register
        </button>
      </div>
    </div>
  );
};

export default EventTile;
