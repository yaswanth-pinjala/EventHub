import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";

const EditProject = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(false);

  /* =============================
     Fetch Project
  ============================= */
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await API.get(`/projects/${id}`);
        setForm(res.data);
      } catch {
        alert("Failed to load project");
      }
    };

    fetchProject();
  }, [id]);

  /* =============================
     Handle Change
  ============================= */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* =============================
     Submit Update
  ============================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await API.put(`/projects/${id}`, form);

      alert("✅ Project updated successfully");
      navigate("/admin/projects");

    } catch {
      alert("❌ Update failed");
    } finally {
      setLoading(false);
    }
  };

  if (!form) return <div className="p-8">Loading...</div>;

  return (
    <div className="p-8 max-w-4xl mx-auto">

      {/* ⭐ Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 bg-gray-200 hover:bg-gray-300 px-5 py-2 rounded-lg"
      >
        ← Back
      </button>

      <h1 className="text-3xl font-bold mb-6">
        Edit Project
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-8 space-y-5"
      >

        <input
          name="title"
          value={form.title}
          placeholder="Project Title"
          className="w-full border p-3 rounded-lg"
          onChange={handleChange}
          required
        />

        <textarea
          name="abstract"
          value={form.abstract}
          placeholder="Project Abstract"
          className="w-full border p-3 rounded-lg"
          onChange={handleChange}
          required
        />

        <input
          name="year"
          value={form.year}
          placeholder="Year"
          className="w-full border p-3 rounded-lg"
          onChange={handleChange}
          required
        />

        <input
          name="guideName"
          value={form.guideName}
          placeholder="Guide Name"
          className="w-full border p-3 rounded-lg"
          onChange={handleChange}
          required
        />

        <input
          name="githubUrl"
          value={form.githubUrl}
          placeholder="Github URL"
          className="w-full border p-3 rounded-lg"
          onChange={handleChange}
        />

        <input
          name="tags"
          value={form.tags?.join(",")}
          placeholder="Tags (AI,ML,Web)"
          className="w-full border p-3 rounded-lg"
          onChange={(e) =>
            setForm({
              ...form,
              tags: e.target.value.split(",")
            })
          }
          required
        />

        <input
          name="teamMembers"
          value={form.teamMembers?.join(",")}
          placeholder="Team Members"
          className="w-full border p-3 rounded-lg"
          onChange={(e) =>
            setForm({
              ...form,
              teamMembers: e.target.value.split(",")
            })
          }
          required
        />

        {/* ⭐ Bottom Buttons */}
        <div className="flex justify-end gap-4 pt-6">

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
            {loading ? "Updating..." : "Update"}
          </button>

        </div>

      </form>

    </div>
  );
};

export default EditProject;