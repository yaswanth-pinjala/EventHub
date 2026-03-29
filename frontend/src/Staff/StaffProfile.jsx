import { useEffect, useState } from "react";
import API from "../services/api";

const StaffProfile = () => {
  const [staff, setStaff] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await API.get("/staff/me");
      setStaff(res.data);
    } catch (err) {
      alert("Failed to load profile");
    }
  };

  if (!staff) {
    return <div className="p-10">Loading profile...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">

        {/* HEADER */}
        <div className="flex items-center gap-6 border-b pb-6">

          <div className="w-24 h-24 rounded-full bg-indigo-600 text-white flex items-center justify-center text-4xl font-bold">
            {staff.name?.charAt(0)}
          </div>

          <div>
            <h2 className="text-3xl font-bold">{staff.name}</h2>
            <p className="text-gray-500">{staff.email}</p>

            <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm">
              Staff Member
            </span>
          </div>
        </div>

        {/* DETAILS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">

          <div className="bg-indigo-50 p-5 rounded-xl">
            <p className="text-sm text-gray-500">Staff ID</p>
            <p className="text-lg font-semibold">{staff.staffId}</p>
          </div>

          <div className="bg-indigo-50 p-5 rounded-xl">
            <p className="text-sm text-gray-500">Department</p>
            <p className="text-lg font-semibold">{staff.department}</p>
          </div>

          <div className="bg-indigo-50 p-5 rounded-xl">
            <p className="text-sm text-gray-500">Phone</p>
            <p className="text-lg font-semibold">{staff.phone}</p>
          </div>

          <div className="bg-indigo-50 p-5 rounded-xl">
            <p className="text-sm text-gray-500">Gender</p>
            <p className="text-lg font-semibold">{staff.gender}</p>
          </div>

        </div>

        {/* ACTION */}
        <div className="mt-8 text-right">
          <button
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold"
            onClick={() => window.location.href="/staff/change-password"}
          >
            Change Password
          </button>
        </div>

      </div>
    </div>
  );
};

export default StaffProfile;