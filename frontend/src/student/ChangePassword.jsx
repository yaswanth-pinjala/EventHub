import { useState } from "react";
import API from "../services/api";

const ChangePassword = () => {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [loading, setLoading] = useState(false);
  const [matchError, setMatchError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    const updatedForm = { ...form, [name]: value };
    setForm(updatedForm);

    // ⭐ live password match validation
    if (
      (name === "newPassword" || name === "confirmPassword") &&
      updatedForm.confirmPassword
    ) {
      if (updatedForm.newPassword !== updatedForm.confirmPassword) {
        setMatchError("Passwords do not match");
      } else {
        setMatchError("");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (matchError) {
      return alert("Passwords do not match");
    }

    try {
      setLoading(true);

      const res = await API.put("/students/change-password", {
        oldPassword: form.currentPassword,
        newPassword: form.newPassword
      });

      alert(res.data.message || "Password updated");

      setForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      });

    } catch (err) {
      alert(err.response?.data?.message || "Error updating password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-semibold mb-6">Change Password</h1>

      <div className="bg-white rounded-xl shadow p-6 w-full max-w-md">
        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="password"
            name="currentPassword"
            placeholder="Current Password"
            value={form.currentPassword}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            required
          />

          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            value={form.newPassword}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            required
          />

          <div>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm New Password"
              value={form.confirmPassword}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
              required
            />
            {matchError && (
              <p className="text-red-500 text-sm mt-1">
                {matchError}
              </p>
            )}
          </div>

          <button
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
          >
            {loading ? "Updating..." : "Update Password"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default ChangePassword;