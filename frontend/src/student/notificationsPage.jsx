import { useEffect, useState } from "react";
import API from "../services/api";

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await API.get("/notifications/student");

        // convert backend data to UI format
        const formatted = (res.data || []).map((n) => ({
          title: n.title,
          message: n.message,
          time: new Date(n.createdAt).toLocaleDateString(),
        }));

        setNotifications(formatted);
      } catch (err) {
        console.error("Notification API error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div>
      <header className="bg-white shadow-md px-6 py-4">
        <h1 className="text-xl font-semibold">Notifications</h1>
      </header>

      <div className="px-6 py-6">
        {loading && <div className="text-gray-500">Loading...</div>}

        {!loading &&
          notifications.map((note, i) => (
            <div
              key={i}
              className="bg-white p-4 mb-4 rounded-lg shadow flex justify-between"
            >
              <div>
                <h3 className="font-semibold">{note.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{note.message}</p>
              </div>
              <span className="text-gray-400 text-xs">{note.time}</span>
            </div>
          ))}

        {!loading && notifications.length === 0 && (
          <div className="text-gray-500">No notifications available</div>
        )}
      </div>
    </div>
  );
};

export default NotificationPage;
