import { useEffect, useState } from "react";
import API from "../services/api";
import ChangePasswordModal from "./ChangePasswordModal";

const EventAdminProfile = () => {
  const [admin, setAdmin] = useState(null);
  const [stats, setStats] = useState(null);
  const [openPass, setOpenPass] = useState(false);

  useEffect(() => {
    fetchProfile();
    fetchStats();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await API.get("/admin/me");
      setAdmin(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await API.get("/admin/event-stats");
      setStats(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  if (!admin || !stats)
    return <div className="p-8 text-gray-500">Loading profile...</div>;

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-5xl mx-auto">
        
        {/* PROFILE HEADER */}
        <div className="flex items-center justify-between border-b pb-6">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-blue-600 text-white flex items-center justify-center text-3xl font-bold">
              {admin.name?.charAt(0).toUpperCase()}
            </div>

            <div>
              <h2 className="text-2xl font-bold">{admin.name}</h2>
              <p className="text-gray-500">{admin.email}</p>

              <span className="inline-block mt-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                Event Administrator
              </span>
            </div>
          </div>

          <button
            onClick={() => setOpenPass(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
          >
            Change Password
          </button>
        </div>

        {/* STATS SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          
          <div className="bg-blue-50 p-6 rounded-xl text-center shadow-sm">
            <h3 className="text-lg font-semibold text-gray-700">
              Events Managed
            </h3>
            <p className="text-4xl font-bold text-blue-600 mt-3">
              {stats.totalEvents}
            </p>
          </div>

          <div className="bg-green-50 p-6 rounded-xl text-center shadow-sm">
            <h3 className="text-lg font-semibold text-gray-700">
              Total Registrations
            </h3>
            <p className="text-4xl font-bold text-green-600 mt-3">
              {stats.totalRegistrations}
            </p>
          </div>

          <div className="bg-purple-50 p-6 rounded-xl text-center shadow-sm">
            <h3 className="text-lg font-semibold text-gray-700">
              Certificates Issued
            </h3>
            <p className="text-4xl font-bold text-purple-600 mt-3">
              {stats.totalCertificates}
            </p>
          </div>

        </div>

      </div>

      {/* CHANGE PASSWORD MODAL */}
      {openPass && (
        <ChangePasswordModal onClose={() => setOpenPass(false)} />
      )}
    </div>
  );
};

export default EventAdminProfile;