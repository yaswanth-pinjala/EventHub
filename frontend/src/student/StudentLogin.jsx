import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import logo from "../assets/bec-logo.png";

function StudentLogin() {
  const navigate = useNavigate();
  const [regNo, setRegNo] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);

      const res = await API.post("/auth/login", {
        regNo,
        password,
        userType: "student",
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/student/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-sky-100 to-blue-200 flex items-center justify-center">
      <div className="bg-white p-10 rounded-xl shadow w-full max-w-md">
        <img src={logo} className="w-12 mx-auto mb-4" alt="BEC Logo" />

        <h2 className="text-2xl font-bold text-center mb-6">Student Login</h2>

        <input
          type="text"
          placeholder="Register Number"
          className="w-full border p-3 rounded mb-4"
          onChange={(e) => setRegNo(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded mb-2"
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* 🔹 Forgot Password */}
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
          className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* 🔹 Create Account */}
        <p className="text-center text-sm mt-5 text-gray-600">
          Don’t have an account?{" "}
          <Link
            to="/student/register"
            className="text-blue-600 font-medium hover:underline"
          >
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
}

export default StudentLogin;
