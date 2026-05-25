import { useState } from "react";
import API from "../services/api";

const ChangePasswordModal = ({ onClose }) => {
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const res = await API.put("/admin/change-password", form);

      alert(res.data.message);
      onClose();

    } catch (err) {
      alert(err.response?.data?.message || "Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">

      <div className="bg-white rounded-2xl p-8 w-96 shadow-xl">
        <h2 className="text-xl font-bold mb-4">Change Password</h2>

        <input
          type="password"
          name="oldPassword"
          placeholder="Old Password"
          className="w-full border p-2 rounded mb-3"
          onChange={handleChange}
        />

        <input
          type="password"
          name="newPassword"
          placeholder="New Password"
          className="w-full border p-2 rounded mb-5"
          onChange={handleChange}
        />

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            {loading ? "Updating..." : "Update"}
          </button>
        </div>
      </div>

    </div>
  );
};

export default ChangePasswordModal;