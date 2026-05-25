import React, { useEffect, useState } from "react";
import API from "../services/api";

const ProjectAdminDashboard = () => {

  const [loading, setLoading] = useState(true);

  const [projects, setProjects] = useState([]);
  const [totalProjects, setTotalProjects] = useState(0);
  const [managedProjects, setManagedProjects] = useState(0);
  const [totalDownloads, setTotalDownloads] = useState(0);

  useEffect(() => {

    const fetchDashboard = async () => {
      try {

        const res = await API.get("/projects/dashboard");

        setTotalProjects(res.data.totalProjects);
        setManagedProjects(res.data.managedProjects);
        setTotalDownloads(res.data.totalDownloads);
        setProjects(res.data.recentProjects);

      } catch (err) {
        console.error("Dashboard error", err);
        alert("Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();

  }, []);

  if (loading) {
    return (
      <div className="p-10 text-lg font-semibold">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">

      <div className="flex-1 p-8">

        {/* PAGE TITLE */}
        <h1 className="text-3xl font-bold mb-8">
          Project Dashboard
        </h1>

        {/* STATS CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="bg-white shadow-md rounded-xl p-6">
            <p className="text-gray-500">Total Projects</p>
            <h2 className="text-3xl font-bold mt-2">
              {totalProjects}
            </h2>
          </div>

          <div className="bg-white shadow-md rounded-xl p-6">
            <p className="text-gray-500">Projects Managed</p>
            <h2 className="text-3xl font-bold mt-2">
              {managedProjects}
            </h2>
          </div>

          <div className="bg-white shadow-md rounded-xl p-6">
            <p className="text-gray-500">Total Downloads</p>
            <h2 className="text-3xl font-bold mt-2">
              {totalDownloads}
            </h2>
          </div>

        </div>

        {/* RECENT PROJECT TABLE */}
        <div className="bg-white shadow-md rounded-xl p-6 mt-8">

          <h2 className="text-xl font-semibold mb-4">
            Recently Uploaded Projects
          </h2>

          <table className="w-full text-left">

            <thead>
              <tr className="border-b text-gray-500">
                <th className="py-2">Project</th>
                <th>Guide</th>
                <th>Date</th>
                <th>Downloads</th>
              </tr>
            </thead>

            <tbody>

              {projects.length === 0 ? (
                <tr>
                  <td colSpan="4" className="py-6 text-center text-gray-400">
                    No recent projects
                  </td>
                </tr>
              ) : (
                projects.map((project) => (
                  <tr
                    key={project._id}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="py-2 font-medium">
                      {project.title}
                    </td>

                    <td>
                      {project.guideName || "—"}
                    </td>

                    <td>
                      {project.createdAt
                        ? new Date(project.createdAt).toLocaleDateString()
                        : "—"}
                    </td>

                    <td>
                      {project.downloadCount || 0}
                    </td>
                  </tr>
                ))
              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default ProjectAdminDashboard;