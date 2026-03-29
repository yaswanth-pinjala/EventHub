import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import logo from "../assets/bec-logo.png";

function AdminLogin() {
  const navigate = useNavigate();

  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("event");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!adminId || !password) {
      setError("Please enter Admin ID and password");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await API.post("/auth/login", {
        regNo: adminId.trim(),
        password: password.trim(),
        userType: "admin", // ✅ ALWAYS admin
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      const loggedUser = res.data.user;

      // 🔥 Redirect based on role from backend
      if (loggedUser.role === "event") {
        navigate("/admin/dashboard");
      } else if (loggedUser.role === "project") {
        navigate("/admin/dashboard");
      }

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

        <h2 className="text-2xl font-bold text-center mb-6">
          Admin Login
        </h2>

        {error && (
          <p className="text-red-500 text-sm mb-3 text-center">{error}</p>
        )}

        <input
          type="text"
          placeholder="Admin ID"
          className="w-full border p-3 rounded mb-4"
          onChange={(e) => setAdminId(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded mb-4"
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleLogin()}
        />

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
      </div>
    </div>
  );
}

export default AdminLogin;