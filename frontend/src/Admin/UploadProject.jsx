import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const UploadProject = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    abstract: "",
    year: "",
    githubUrl: "",
    tags: "",
    teamMembers: "",
    guideName: "",
  });

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) return alert("Upload project file");

    const data = new FormData();

    Object.keys(form).forEach((key) => {
      data.append(key, form[key]);
    });

    data.append("file", file);

    try {
      setLoading(true);
      await API.post("/projects/upload", data);
      alert("Project Uploaded Successfully");
      navigate("/admin/projects");
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 p-8 bg-gray-100 min-h-screen">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Upload Project</h1>

        <button
          onClick={() => navigate(-1)}
          className="bg-gray-600 text-white px-5 py-2 rounded-lg"
        >
          ← Back
        </button>
      </div>

      {/* FORM CARD */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-lg p-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* TITLE */}
          <div>
            <label className="text-sm font-semibold">Project Title</label>
            <input
              name="title"
              className="w-full border mt-1 p-3 rounded-lg"
              onChange={handleChange}
              required
            />
          </div>

          {/* YEAR */}
          <div>
            <label className="text-sm font-semibold">Year</label>
            <input
              name="year"
              placeholder="Eg: 2026"
              className="w-full border mt-1 p-3 rounded-lg"
              onChange={handleChange}
              required
            />
          </div>

          {/* GUIDE */}
          <div>
            <label className="text-sm font-semibold">Guide Name</label>
            <input
              name="guideName"
              className="w-full border mt-1 p-3 rounded-lg"
              onChange={handleChange}
              required
            />
          </div>

          {/* TAGS */}
          <div>
            <label className="text-sm font-semibold">Tags</label>
            <input
              name="tags"
              className="w-full border mt-1 p-3 rounded-lg"
              placeholder="AI, ML, Web"
              onChange={handleChange}
              required
            />
          </div>

          {/* TEAM */}
          <div className="md:col-span-2">
            <label className="text-sm font-semibold">Team Members</label>
            <input
              name="teamMembers"
              className="w-full border mt-1 p-3 rounded-lg"
              placeholder="John Doe, Jane Smith"
              onChange={handleChange}
              required
            />
          </div>

          {/* ABSTRACT */}
          <div className="md:col-span-2">
            <label className="text-sm font-semibold">Abstract</label>
            <textarea
              name="abstract"
              rows="4"
              className="w-full border mt-1 p-3 rounded-lg"
              onChange={handleChange}
              required
            />
          </div>

          {/* GITHUB */}
          <div className="md:col-span-2">
            <label className="text-sm font-semibold">
              Github URL (Optional)
            </label>
            <input
              name="githubUrl"
              className="w-full border mt-1 p-3 rounded-lg"
              onChange={handleChange}
            />
          </div>

          {/* FILE UPLOAD BOX */}
          <div className="md:col-span-2">
            <label className="text-sm font-semibold">Upload Project PDF</label>

            <div className="border-2 border-dashed rounded-xl p-6  mt-2">
              <input
                type="file"
                accept=".pdf"
                onChange={(e) => setFile(e.target.files[0])}
                required
                className="mx-auto"
              />
              <p className="text-gray-500 mt-2 text-sm">
                Upload Final Project Documentation without any spaces and
                special characters in PDF name (PDF)
              </p>
            </div>
          </div>
        </div>

        {/* BUTTONS */}
        <div className="flex justify-end gap-4 mt-8">
          <button
            type="button"
            onClick={() => navigate("/admin/projects")}
            className="bg-gray-400 hover:bg-red-500 text-white px-8 py-3 rounded-xl text-lg"
          >
            Cancel
          </button>

          <button
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl text-lg"
          >
            {loading ? "Uploading..." : "Upload"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadProject;
