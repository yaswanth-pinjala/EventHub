import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";

const Staff_Eventdetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch event
        const eventRes = await API.get(`/events/${id}`);
        setEvent(eventRes.data);

        // Fetch registrations
        const regRes = await API.get(`/registrations/event/${id}`);
        setRegistrations(regRes.data);
      } catch (err) {
        console.error("Error loading event details:", err);
      }
    };

    fetchData();
  }, [id]);

  if (!event) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <button
        onClick={() => navigate(-1)}
        className="text-blue-600 font-medium"
      >
        ← Back
      </button>

      {/* EVENT DETAILS */}
      <div className="bg-white p-6 rounded-xl shadow">
        <img
          src={`http://localhost:5000/${event.posterImage}`}
          alt={event.title}
          className="w-full h-64 object-cover rounded-lg mb-4"
        />

        <h2 className="text-2xl font-bold">{event.title}</h2>
        <p>
          <strong>Venue:</strong> {event.venue}
        </p>
        <p>
          <strong>Date:</strong> {new Date(event.date).toDateString()}
        </p>
        <p className="mt-3">{event.description}</p>
      </div>

      {/* REGISTERED STUDENTS */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-xl font-semibold mb-4">
          Registered Students ({registrations.length})
        </h3>

        {registrations.length === 0 ? (
          <p className="text-gray-500">No students registered yet.</p>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="py-2">Reg No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Academic Year</th>
              </tr>
            </thead>

            <tbody>
              {registrations.map((reg) => (
                <tr key={reg._id} className="border-b hover:bg-gray-50">
                  <td className="py-2">{reg.studentId?.regNo}</td>
                  <td>{reg.studentId?.name}</td>
                  <td>{reg.studentId?.email}</td>
                  <td>{reg.studentId?.department}</td>
                  <td>{reg.studentId?.academicYear}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Staff_Eventdetails;
