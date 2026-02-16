import React from "react";

export default function EventCard({ ev }) {
  return (
    <div className="bg-white rounded-xl shadow p-4 flex items-center gap-4 max-w-31x1">
      <div className="w-12 h-12 rounded-md bg-blue-700 text-white flex flex-col items-center justify-center text-sm font-bold">
        <div className="text-lg">{ev.day}</div>
        <div className="text-xs">{ev.month}</div>
      </div>

      <div>
        <div className="font-semibold text-sm text-blue-800">{ev.title}</div>
        <div className="text-xs text-gray-400 mb-1">{ev.date}</div>
        <div className="text-xs text-gray-500">{ev.desc}</div>
      </div>
    </div>
  );
}
