import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import logo from "../assets/bec-logo.png";

function StaffLogin() {
  const navigate = useNavigate();
  const [staffId, setStaffId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!staffId || !password) {
      setError("Please enter Staff ID and password");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await API.post("/auth/login", {
        regNo: staffId.trim(),   // backend expects regNo field
        password: password.trim(),
        userType: "staff",
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/staff/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-sky-100 to-blue-200 flex items-center justify-center">
      <div className="bg-white p-10 rounded-xl shadow w-full max-w-md">
        <img src={logo} className="w-12 mx-auto mb-4" alt="BEC Logo" />

        <h2 className="text-2xl font-bold text-center mb-6">Staff Login</h2>

        {error && (
          <p className="text-red-500 text-sm mb-3 text-center">{error}</p>
        )}

        <input
          type="text"
          placeholder="Staff ID"
          className="w-full border p-3 rounded mb-4"
          autoFocus
          onChange={(e) => setStaffId(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded mb-2"
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleLogin()}
        />

        {/* Forgot Password */}
        <div className="text-right mb-4">
          <Link
            to="/forgot-password"
            className="text-sm text-blue-600 hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        <button
          onClick={handleLogin}
          disabled={loading}
          className={`w-full py-3 rounded text-white transition ${
            loading
              ? "bg-blue-300 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center text-sm mt-5 text-gray-600">
          Don’t have an account?{" "}
          <Link
            to="/staff/register"
            className="text-blue-600 font-medium hover:underline"
          >
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
}

export default StaffLogin;