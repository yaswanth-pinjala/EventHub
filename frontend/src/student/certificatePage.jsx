import React, { useState } from "react";

const EventCertificates = () => {
  const [event, setEvent] = useState("");

  const events = [
    "Web Development Workshop",
    "AI Seminar",
    "Cyber Security Bootcamp",
  ];

  const handleDownload = () => {
    if (!event) {
      alert("Please select an event");
      return;
    }
    alert(`Certificate downloaded for ${event}`);
  };

  return (
    <div>
      <header className="bg-white shadow-md px-6 py-4">
        <h1 className="text-xl font-semibold">Certificates</h1>
      </header>
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">
          Event Certificates
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Download your participation certificate
        </p>

        {/* Select */}
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Select Event
        </label>

        <select
          value={event}
          onChange={(e) => setEvent(e.target.value)}
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        >
          <option value="">Choose an event</option>
          {events.map((e, index) => (
            <option key={index} value={e}>
              {e}
            </option>
          ))}
        </select>

        {/* Button */}
        <button
          onClick={handleDownload}
          className="mt-6 w-full rounded-lg bg-blue-600 py-3 text-lg font-semibold text-white shadow hover:bg-blue-700 active:scale-95 transition"
        >
          Download Certificate
        </button>
      </div>
    </div>
    </div>
  );
};

export default EventCertificates;