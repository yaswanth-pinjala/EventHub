import React from "react";

const IconStub = ({ variant }) => {
  if (variant === "calendar")
    return <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="5" width="18" height="16" rx="2" strokeWidth="1.4"/><path d="M16 3v4M8 3v4" strokeWidth="1.4"/></svg>;
  if (variant === "check")
    return <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M9 11l2 2 4-4" strokeWidth="1.4"/></svg>;
  return <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="1.4"/></svg>;
};

export default function StatCard({ title, value, variant = "calendar" }) {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 text-blue-700">
          <div className="bg-blue-50 rounded p-2">
            <IconStub variant={variant} />
          </div>
          <div className="text-sm font-medium">{title}</div>
        </div>
        <div className="text-3xl font-bold text-gray-800">{value}</div>
      </div>
    </div>
  );
}
