import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const ProjectAdminProjects = () => {

  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  /* 🔹 Fetch My Projects */
  useEffect(() => {

    const fetchProjects = async () => {
      try {

        const res = await API.get("/projects");   // department wise projects
        setProjects(res.data);

      } catch (err) {
        console.error(err);
        alert("Failed to load projects");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();

  }, []);

  /* 🔹 Delete Project */
  const handleDelete = async (id) => {

    if (!window.confirm("Delete this project?")) return;

    try {

      await API.delete(`/projects/${id}`);

      setProjects(projects.filter(p => p._id !== id));

      alert("Project deleted");

    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  if (loading) {
    return <div className="p-8">Loading projects...</div>;
  }

  return (
    <div className="p-8">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">

        <h1 className="text-2xl font-bold">
          My Projects
        </h1>

        <button
          onClick={() => navigate("/admin/projects/upload")}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
        >
          + Upload Project
        </button>

      </div>

      {/* TABLE */}
      <div className="bg-white shadow rounded-xl overflow-hidden">

        <table className="w-full text-left">

          <thead className="bg-gray-50 border-b">
            <tr className="text-gray-600 text-sm">
              <th className="p-3">Title</th>
              <th>Year</th>
              <th>Guide</th>
              <th>Downloads</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>

            {projects.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-6 text-center text-gray-400">
                  No projects uploaded
                </td>
              </tr>
            ) : (
              projects.map(project => (
                <tr
                  key={project._id}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="p-3 font-medium">
                    {project.title}
                  </td>

                  <td>{project.year}</td>

                  <td>{project.guideName}</td>

                  <td>{project.downloadCount || 0}</td>

                  <td className="text-center space-x-2">

                    <button
                      onClick={() => navigate(`/admin/projects/view/${project._id}`)}
                      className="px-3 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300"
                    >
                      View
                    </button>

                    <button
                      onClick={() => navigate(`/admin/projects/edit/${project._id}`)}
                      className="px-3 py-1 text-sm bg-yellow-400 text-white rounded hover:bg-yellow-500"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(project._id)}
                      className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Delete
                    </button>

                  </td>

                </tr>
              ))
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default ProjectAdminProjects;