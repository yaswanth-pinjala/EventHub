import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function StudentRegister() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    regNo: "",
    department: "",
    academicYear: "",
    password: "",
    confirmPassword: "",
  });
  const [emailError, setEmailError] = useState("");
  const [regError, setRegError] = useState("");

  const [idCardFile, setIdCardFile] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateEmail = () => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    if (!emailRegex.test(formData.email)) {
      setEmailError("Invalid email format");
    } else {
      setEmailError("");
    }
  };
  const validateRegNo = () => {
    const regRegex =
      /^[YL][1-9][0-9](ACS|AIT|AEC|ACM|AEE|ACB|ADS|ACE|AME)[4-9][0-9]{2}$/;

    if (!regRegex.test(formData.regNo)) {
      setRegError("Invalid Register Number");
    } else {
      setRegError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match ❌");
      return;
    }

    try {
      setLoading(true);

      const data = new FormData();
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("regNo", formData.regNo);
      data.append("department", formData.department);
      data.append("academicYear", formData.academicYear);
      data.append("password", formData.password);
      data.append("idCardUpload", idCardFile);

      await API.post("/auth/register-student", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Student Registered Successfully ✅");
      navigate("/login/student");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-sky-100 to-blue-200">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-blue-900 mb-6">
          Student Registration
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name(as per ID card)"
            className="w-full border p-3 rounded-lg"
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full border p-3 rounded-lg"
            value={formData.email}
            onChange={handleChange}
            onBlur={validateEmail}
            required
          />
          {emailError && <p className="text-red-500 text-sm">{emailError}</p>}

          <input
            type="text"
            name="regNo"
            placeholder="Register Number"
            className="w-full border p-3 rounded-lg"
            value={formData.regNo}
            onChange={handleChange}
            onBlur={validateRegNo}
            required
          />
          {regError && <p className="text-red-500 text-sm">{regError}</p>}

          <input
            type="text"
            name="department"
            placeholder="Department (Eg:CSE / IT / ECE)"
            className="w-full border p-3 rounded-lg"
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="academicYear"
            placeholder="Academic Year (Eg:2022-2026)"
            className="w-full border p-3 rounded-lg"
            onChange={handleChange}
            required
          />

          {/*  ID CARD UPLOAD */}
          <input
            type="file"
            accept=".png,.jpg,.jpeg,.pdf"
            className="w-full border p-2 rounded-lg"
            onChange={(e) => setIdCardFile(e.target.files[0])}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full border p-3 rounded-lg"
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className="w-full border p-3 rounded-lg"
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="text-center text-sm mt-4 text-blue-600">
          Already have an account?{" "}
          <a href="/login/student" className="underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}

export default StudentRegister;
