import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../services/api";

const ResetPassword = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [matchError, setMatchError] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePasswordChange = (value) => {
    setPassword(value);

    if (confirm && value !== confirm) {
      setMatchError("Passwords do not match");
    } else {
      setMatchError("");
    }
  };

  const handleConfirmChange = (value) => {
    setConfirm(value);

    if (password !== value) {
      setMatchError("Passwords do not match");
    } else {
      setMatchError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (matchError || !password || !confirm) {
      return alert("Please fix password mismatch");
    }

    try {
      setLoading(true);

      await API.post("/auth/reset-password", {
        email: state.email,
        otp: state.otp,
        newPassword: password
      });

      alert("Password reset successful");
      navigate("/login/student");

    } catch (err) {
      alert(err.response?.data?.message || "Reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-200 to-blue-300">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-indigo-600 text-center mb-6">
          Set New Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="password"
            placeholder="New Password"
            className="w-full border p-3 rounded-lg"
            value={password}
            onChange={(e) => handlePasswordChange(e.target.value)}
            required
          />

          <div>
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full border p-3 rounded-lg"
              value={confirm}
              onChange={(e) => handleConfirmChange(e.target.value)}
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
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold"
          >
            {loading ? "Updating..." : "Reset Password"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default ResetPassword;