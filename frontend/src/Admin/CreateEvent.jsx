import React, { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

const CreateEvent = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    venue: "",
    department: "",
    eligibility: "",
    year: "All years",
    type: "",
  });

  const [poster, setPoster] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    if (poster) {
      data.append("posterImage", poster);
    }

    try {
      await API.post("/events/create", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Event Created Successfully!");
      navigate("/admin/events");
    } catch (err) {
      console.error("Create event error", err);
      alert("Error creating event");
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-2xl font-bold mb-6">Create New Event</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block mb-2 font-medium">Event Title</label>
            <input
              type="text"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-2 font-medium">Description</label>
            <textarea
              name="description"
              required
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full border rounded-lg px-4 py-2"
            />
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 font-medium">Date</label>
              <input
                type="date"
                name="date"
                required
                value={formData.date}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Time</label>
              <input
                type="time"
                name="time"
                required
                value={formData.time}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2"
              />
            </div>
          </div>

          {/* Venue */}
          <div>
            <label className="block mb-2 font-medium">Venue</label>
            <input
              type="text"
              name="venue"
              required
              value={formData.venue}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2"
            />
          </div>

          {/* Department & Year */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 font-medium">Department</label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                placeholder="CSE, IT, AIML..."
                className="w-full border rounded-lg px-4 py-2"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Year</label>
              <select
                name="year"
                value={formData.year}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2"
              >
                <option>All years</option>
                <option>1st Year</option>
                <option>2nd Year</option>
                <option>3rd Year</option>
                <option>4th Year</option>
              </select>
            </div>
          </div>

          {/* Eligibility */}
          <div>
            <label className="block mb-2 font-medium">Eligibility</label>
            <input
              type="text"
              name="eligibility"
              value={formData.eligibility}
              onChange={handleChange}
              placeholder="CSE, IT, CBDS, AIML"
              className="w-full border rounded-lg px-4 py-2"
            />
          </div>

          {/* Event Type */}
          <div>
            <label className="block mb-2 font-medium">Event Type</label>
            <select
              name="type"
              required
              value={formData.type}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2"
            >
              <option value="">Select Type</option>
              <option>Competition</option>
              <option>Workshop</option>
              <option>Seminar</option>
              <option>Hackathon</option>
              <option>Contest</option>
            </select>
          </div>

          {/* Poster Upload */}
          <div>
            <label className="block mb-2 font-medium">Poster Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setPoster(e.target.files[0])}
              className="w-full"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Create Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;
