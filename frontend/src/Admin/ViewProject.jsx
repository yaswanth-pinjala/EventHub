import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";

const ViewProject = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await API.get(`/projects/${id}`);
        setProject(res.data);
      } catch (err) {
        alert("Failed to load project");
      }
    };

    fetchProject();
  }, [id]);

  if (!project) return <div className="p-8">Loading...</div>;

  return (
    <div className="p-8 max-w-4xl mx-auto">

      {/* ⭐ BACK BUTTON */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg"
      >
        ← Back
      </button>

      <h1 className="text-3xl font-bold mb-6">
        {project.title}
      </h1>

      <div className="bg-white shadow rounded-xl p-6 space-y-4">

        <p><b>Abstract:</b> {project.abstract}</p>

        <p><b>Year:</b> {project.year}</p>

        <p><b>Guide:</b> {project.guideName}</p>

        <p><b>Department:</b> {project.department}</p>

        <p><b>Tags:</b> {project.tags?.join(", ")}</p>

        <p><b>Team:</b> {project.teamMembers?.join(", ")}</p>

        <p>
          <b>Github:</b>{" "}
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600"
          >
            Open Link
          </a>
        </p>

        <p><b>Downloads:</b> {project.downloadCount || 0}</p>

      </div>

    </div>
  );
};

export default ViewProject;