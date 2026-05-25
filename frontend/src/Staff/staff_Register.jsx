import React, { useState } from "react";
import { useNavigate } from "react-router-dom";   // ⭐ ADDED
import API from "../services/api";

export default function StaffRegistration() {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();   // ⭐ ADDED

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    staffId: "",
    department: "",
    designation: "",
    gender: "",
    password: "",
    confirmPassword: "",
  });

  const [idCard, setIdCard] = useState(null);

  const [staffIdError, setStaffIdError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /* ⭐ STAFF ID VALIDATION (OPTIONAL) */
  const validateStaffId = () => {
    if (!formData.staffId) {
      setStaffIdError("");
      return;
    }

    const regex = /^BEC\d{6}$/;

    if (!regex.test(formData.staffId)) {
      setStaffIdError("Staff ID must be like BEC123456");
    } else {
      setStaffIdError("");
    }
  };

  /* ⭐ PASSWORD VALIDATION */
  const validatePassword = () => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,16}$/;

    if (!regex.test(formData.password)) {
      setPasswordError(
        "Password must be 8-16 chars with uppercase, lowercase & number"
      );
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (staffIdError) return alert(staffIdError);
    if (passwordError) return alert(passwordError);

    if (formData.password !== formData.confirmPassword) {
      return alert("Passwords do not match!");
    }

    try {
      setLoading(true);

      const data = new FormData();

      Object.keys(formData).forEach((key) => {
        if (key !== "confirmPassword") {
          data.append(key, formData[key]);
        }
      });

      data.append("idCardUpload", idCard);

      await API.post("/auth/register-staff", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Staff registered successfully!");

      navigate("/login");   // ⭐ REDIRECT ADDED

      setFormData({
        name: "",
        email: "",
        phone: "",
        staffId: "",
        department: "",
        designation: "",
        gender: "",
        password: "",
        confirmPassword: "",
      });

      setIdCard(null);

    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-sky-100 to-blue-200 flex items-center justify-center">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">
          Staff Registration
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <div>
            <label className="block text-sm font-semibold mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400"
              placeholder="Enter full name"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Email</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400"
              placeholder="Enter email"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Phone</label>
            <input
              type="tel"
              name="phone"
              required
              value={formData.phone}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400"
              placeholder="Enter phone number"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Staff ID (Optional)</label>
            <input
              type="text"
              name="staffId"
              value={formData.staffId}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400"
              placeholder="Enter Staff ID"
              onChange={handleChange}
              onBlur={validateStaffId}
            />
            {staffIdError && (
              <p className="text-red-500 text-sm">{staffIdError}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Department</label>
            <input
              type="text"
              name="department"
              required
              value={formData.department}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400"
              placeholder="Enter department"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Designation</label>
            <select
              name="designation"
              required
              value={formData.designation}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400"
              onChange={handleChange}
            >
              <option value="">Select designation</option>
              <option>Assistant Professor</option>
              <option>Associate Professor</option>
              <option>Professor</option>
              <option>Lecturer</option>
              <option>Lab Technician</option>
              <option>Office Staff</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Gender</label>
            <select
              name="gender"
              required
              value={formData.gender}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400"
              onChange={handleChange}
            >
              <option value="">Select gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Password</label>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400"
              placeholder="Enter password"
              onChange={handleChange}
              onBlur={validatePassword}
            />
            {passwordError && (
              <p className="text-red-500 text-sm">{passwordError}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Upload ID Card</label>
            <input
              type="file"
              required
              className="w-full border rounded-lg px-3 py-2"
              onChange={(e) => setIdCard(e.target.files[0])}
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-semibold mb-1">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              required
              value={formData.confirmPassword}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400"
              placeholder="Confirm password"
              onChange={handleChange}
            />
          </div>

          <div className="md:col-span-2">
            <button
              disabled={loading}
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-300"
            >
              {loading ? "Registering..." : "Register Staff"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}