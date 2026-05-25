import { useState, useEffect } from "react";
import axios from "axios";

export default function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedModule, setSelectedModule] = useState("All");

  /* =============================
     Fetch Projects
  ============================= */
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "https://eventhub-ln9y.onrender.com/api/projects",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        const formatted = res.data.map((p) => ({
          id: p._id,
          title: p.title,
          module: p.tags?.[0] || "General",
          guide: p.guide || p.guideName || "N/A",
          members: p.teamMembers || [],
          description: p.abstract
        }));
        console.log("Fetched projects:", formatted);

        setProjects(formatted);

      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchProjects();
  }, []);

  /* =============================
     Secure Download
  ============================= */
const handleDownload = async (id) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(
      `https://eventhub-ln9y.onrender.com/api/projects/download/${id}`,
      {
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    // ⭐ get filename from backend header
    const disposition = response.headers["content-disposition"];

    let filename = "project";

    if (disposition) {
      const match = disposition.match(/filename="(.+)"/);
      if (match) filename = match[1];
    }

    const url = window.URL.createObjectURL(response.data);

    const link = document.createElement("a");
    link.href = url;
    link.download = filename;

    document.body.appendChild(link);
    link.click();
    link.remove();

    window.URL.revokeObjectURL(url);

  } catch (err) {
    console.error("Download error", err);
  }
};

  const modules = ["All", ...new Set(projects.map(p => p.module))];

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesModule =
      selectedModule === "All" || project.module === selectedModule;

    return matchesSearch && matchesModule;
  });

  return (
    <div>
      <header className="bg-white shadow-md px-6 py-4 sticky top-0 z-20">
        <h1 className="text-xl font-semibold">Project</h1>
      </header>

      <div className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Academic Projects
        </h1>

        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-4 mb-8">
          <input
            type="text"
            placeholder="Search projects..."
            className="flex-1 px-4 py-2 rounded-lg border"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <select
            className="px-4 py-2 rounded-lg border"
            value={selectedModule}
            onChange={(e) => setSelectedModule(e.target.value)}
          >
            {modules.map((module, index) => (
              <option key={index} value={module}>
                {module}
              </option>
            ))}
          </select>
        </div>

        {filteredProjects.length === 0 ? (
          <p className="text-center text-gray-500">No projects found</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-2xl shadow-md p-6"
              >
                <h2 className="text-xl font-semibold">
                  {project.title}
                </h2>

                <p className="text-sm mt-1">
                  <strong>Module:</strong> {project.module}
                </p>

                <p className="text-sm">
                  <strong>Guide:</strong> {project.guide}
                </p>

                <div className="flex gap-3 mt-5">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                  >
                    View
                  </button>

                  <button
                    onClick={() => handleDownload(project.id)}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg"
                  >
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedProject && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 relative max-h-[80vh] overflow-y-auto">
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-3 right-3 text-xl"
              >
                ✕
              </button>

              <h2 className="text-2xl font-bold">
                {selectedProject.title}
              </h2>

              <p className="mt-2">
                <strong>Module:</strong> {selectedProject.module}
              </p>
              <p className="mt-2">
                <strong>Guide:</strong> {selectedProject.guide}
              </p>
              <h3 className="mt-4 font-semibold">Team Members</h3>
              <ul className="list-disc list-inside">
                {selectedProject.members.map((member, i) => (
                  <li key={i}>{member}</li>
                ))}
              </ul>

              <p className="mt-4">
                {selectedProject.description}
              </p>

              <button
                onClick={() => handleDownload(selectedProject.id)}
                className="block w-full mt-6 bg-green-600 text-white py-2 rounded-lg"
              >
                Download Project
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}