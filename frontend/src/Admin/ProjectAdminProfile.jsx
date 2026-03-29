import { useEffect, useState } from "react";
import API from "../services/api";
import ChangePasswordModal from "./ChangePasswordModal";

const ProjectAdminProfile = () => {
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
      const res = await API.get("/admin/project-stats");
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
        {/* HEADER */}
        <div className="flex items-center justify-between border-b pb-6">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-indigo-600 text-white flex items-center justify-center text-3xl font-bold">
              {admin.name?.charAt(0).toUpperCase()}
            </div>

            <div>
              <h2 className="text-2xl font-bold">{admin.name}</h2>
              <p className="text-gray-500">{admin.email}</p>

              <span className="inline-block mt-2 bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm">
                Project Administrator
              </span>
            </div>
          </div>

          <button
            onClick={() => setOpenPass(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg"
          >
            Change Password
          </button>
        </div>

        {/* STATS */}
        {/* STATS SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {/* PROJECTS BOX */}
          <div className="bg-indigo-50 rounded-2xl p-8 shadow-sm text-center">
            <h3 className="text-lg font-semibold text-gray-700">
              Projects Uploaded
            </h3>

            <p className="text-5xl font-extrabold text-indigo-600 mt-4">
              {stats.totalProjects}
            </p>

            <p className="text-sm text-gray-500 mt-2">
              Total projects you have published
            </p>
          </div>

          {/* DOWNLOADS BOX */}
          <div className="bg-yellow-50 rounded-2xl p-8 shadow-sm text-center">
            <h3 className="text-lg font-semibold text-gray-700">
              Total Downloads
            </h3>

            <p className="text-5xl font-extrabold text-yellow-600 mt-4">
              {stats.totalDownloads}
            </p>

            <p className="text-sm text-gray-500 mt-2">
              Combined downloads of all projects
            </p>
          </div>
        </div>
      </div>

      {/* PASSWORD MODAL */}
      {openPass && <ChangePasswordModal onClose={() => setOpenPass(false)} />}
    </div>
  );
};

export default ProjectAdminProfile;
