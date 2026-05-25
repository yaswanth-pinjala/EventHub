import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
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
    phone: "", // ⭐ NEW
    gender: "", // ⭐ NEW
    password: "",
    confirmPassword: "",
  });

  const [emailError, setEmailError] = useState("");
  const [regError, setRegError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [idCardFile, setIdCardFile] = useState(null);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /* EMAIL VALIDATION */
  const validateEmail = () => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    setEmailError(
      emailRegex.test(formData.email) ? "" : "Invalid email format",
    );
  };

  /* REG NO VALIDATION */
  const validateRegNo = () => {
    const regRegex =
      /^[YL][1-9][0-9](ACS|AIT|AEC|ACM|AEE|ACB|ADS|ACE|AME)[4-9][0-9]{2}$/;
    setRegError(regRegex.test(formData.regNo) ? "" : "Invalid Register Number");
  };

  /* PASSWORD VALIDATION */
  const validatePassword = () => {
    if (formData.password.length < 8)
      setPasswordError("Password must be at least 8 characters");
    else if (formData.password.length > 16)
      setPasswordError("Password must not exceed 16 characters");
    else setPasswordError("");
  };

  /* SUBMIT */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwordError) return alert(passwordError);
    if (emailError || regError) return alert("Please fix errors first ❌");

    if (formData.password !== formData.confirmPassword)
      return alert("Passwords do not match ❌");

    try {
      setLoading(true);

      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key !== "confirmPassword") data.append(key, formData[key]);
      });

      data.append("idCardUpload", idCardFile);

      await API.post("/auth/register-student", data, {
        headers: { "Content-Type": "multipart/form-data" },
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
    <div className="min-h-screen bg-gradient-to-r from-sky-100 to-blue-200 flex items-center justify-center">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-3xl">
        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-8">
          Student Registration
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-5">
          <div>
            <label className="text-sm font-medium">Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter full name"
              className="w-full border mt-1 p-3 rounded-lg"
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              className="w-full border mt-1 p-3 rounded-lg"
              value={formData.email}
              onChange={handleChange}
              onBlur={validateEmail}
              required
            />
            {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
          </div>

          <div>
            <label className="text-sm font-medium">Register Number</label>
            <input
              type="text"
              name="regNo"
              placeholder="Enter register number"
              className="w-full border mt-1 p-3 rounded-lg"
              value={formData.regNo}
              onChange={handleChange}
              onBlur={validateRegNo}
              required
            />
            {regError && <p className="text-red-500 text-sm">{regError}</p>}
          </div>

          <div>
            <label className="text-sm font-medium">Department</label>
            <input
              type="text"
              name="department"
              placeholder="Enter department"
              className="w-full border mt-1 p-3 rounded-lg"
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium">Academic Year</label>
            <input
              type="text"
              name="academicYear"
              placeholder="Eg: 2022-26"
              className="w-full border mt-1 p-3 rounded-lg"
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium">Phone</label>
            <input
              type="text"
              name="phone"
              placeholder="Enter phone number"
              className="w-full border mt-1 p-3 rounded-lg"
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium">Gender</label>
            <select
              name="gender"
              className="w-full border mt-1 p-3 rounded-lg"
              onChange={handleChange}
              required
            >
              <option value="">Select gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium">Upload ID Card</label>
            <input
              type="file"
              className="w-full border mt-1 p-2 rounded-lg"
              onChange={(e) => setIdCardFile(e.target.files[0])}
              required
            />
          </div>

          {/* PASSWORD */}
          <div className="relative">
            <label className="text-sm font-medium">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter password"
              className="w-full border mt-1 p-3 rounded-lg pr-10"
              value={formData.password}
              onChange={handleChange}
              onBlur={validatePassword}
              required
            />
            <span
              className="absolute right-3 top-10 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
            {passwordError && (
              <p className="text-red-500 text-sm">{passwordError}</p>
            )}
          </div>

          <div className="relative">
            <label className="text-sm font-medium">Confirm Password</label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm password"
              className="w-full border mt-1 p-3 rounded-lg pr-10"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <span
              className="absolute right-3 top-10 cursor-pointer"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <div className="col-span-2 mt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg"
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </div>
        </form>

        <p className="text-center text-sm mt-4 text-indigo-600">
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
