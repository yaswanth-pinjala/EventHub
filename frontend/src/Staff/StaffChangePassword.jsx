import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import API from "../services/api";

const StaffChangePassword = () => {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [loading, setLoading] = useState(false);
  const [matchError, setMatchError] = useState("");

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    const updated = { ...form, [name]: value };
    setForm(updated);

    // ⭐ live match validation
    if (
      (name === "newPassword" || name === "confirmPassword") &&
      updated.confirmPassword
    ) {
      if (updated.newPassword !== updated.confirmPassword) {
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

      const res = await API.put("/staff/change-password", {
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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">

        <h2 className="text-3xl font-bold text-indigo-600 text-center mb-6">
          Change Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* CURRENT PASSWORD */}
          <div className="relative">
            <input
              type={showCurrent ? "text" : "password"}
              name="currentPassword"
              placeholder="Current Password"
              value={form.currentPassword}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg pr-10"
              required
            />
            <span
              className="absolute right-3 top-3 cursor-pointer text-gray-500"
              onClick={() => setShowCurrent(!showCurrent)}
            >
              {showCurrent ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* NEW PASSWORD */}
          <div className="relative">
            <input
              type={showNew ? "text" : "password"}
              name="newPassword"
              placeholder="New Password"
              value={form.newPassword}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg pr-10"
              required
            />
            <span
              className="absolute right-3 top-3 cursor-pointer text-gray-500"
              onClick={() => setShowNew(!showNew)}
            >
              {showNew ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* CONFIRM PASSWORD */}
          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg pr-10"
              required
            />
            <span
              className="absolute right-3 top-3 cursor-pointer text-gray-500"
              onClick={() => setShowConfirm(!showConfirm)}
            >
              {showConfirm ? <FaEyeSlash /> : <FaEye />}
            </span>

            {matchError && (
              <p className="text-red-500 text-sm mt-1">
                {matchError}
              </p>
            )}
          </div>

          <button
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold"
          >
            {loading ? "Updating..." : "Update Password"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default StaffChangePassword;