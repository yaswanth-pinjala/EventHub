const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Student = require("../models/Student");
const Staff = require("../models/Staff");
const Admin = require("../models/Admin");

const extractTextFromIdCard = require("../utils/ocr");
const verifyStudentFromId = require("../utils/verifyStudentFromId");

const sendOTP = require("../utils/sendOTP");

const extractTextFromId = require("../utils/extractTextFromId");
const verifyStaffFromId = require("../utils/verifyStaffFromId");

/* ⭐ Academic Promotion Logic (June Based) */
function calculateAcademicYear(academicYear) {
  try {
    const startYear = parseInt(academicYear.split("-")[0]);

    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth(); // Jan=0

    let diff = currentYear - startYear;

    // Promotion happens after June
    if (currentMonth >= 5) {
      diff = diff + 1;
    }

    if (diff <= 1) return 1;
    if (diff === 2) return 2;
    if (diff === 3) return 3;
    if (diff >= 4) return 4;

    return 1;
  } catch {
    return 1;
  }
}

/* ================= STUDENT REGISTER ================= */
exports.registerStudent = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      regNo,
      department,
      academicYear,
      phone,
      gender
    } = req.body;

    const idCardUpload = req.file ? req.file.path : "";

    if (
      !name ||
      !email ||
      !password ||
      !regNo ||
      !department ||
      !academicYear ||
      !phone ||
      !gender
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "ID Card upload required" });
    }

    const existingStudent = await Student.findOne({ regNo });
    if (existingStudent) {
      return res.status(400).json({ message: "Register number already exists" });
    }

    /* OCR verification */
    const ocrText = await extractTextFromIdCard(req.file.path);

    const isValid = verifyStudentFromId(ocrText, {
      name,
      regNo,
      department,
      academicYear
    });

    if (!isValid) {
      return res.status(400).json({
        message: "ID Card details do not match entered details"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    /* ⭐ calculate studying year */
    const year = calculateAcademicYear(academicYear);

    const student = new Student({
      name,
      email,
      password: hashedPassword,
      regNo,
      department,
      academicYear,
      phone,
      gender,
      idCardUpload,
      year
    });

    await student.save();

    res.status(201).json({
      message: "Student registered successfully (ID verified)"
    });

  } catch (err) {
    console.error("REGISTER STUDENT ERROR:", err);
    res.status(500).json({ message: "Registration error" });
  }
};

/* ================= STAFF REGISTER ================= */
exports.registerStaff = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      staffId,
      department,
      designation,
      phone,
      gender
    } = req.body;

    if (!req.file) {
      return res.status(400).json({
        message: "ID Card upload required"
      });
    }

    const existing = await Staff.findOne({
      $or: [
        { staffId: staffId || null },
        { email }
      ]
    });

    if (existing) {
      return res.status(400).json({
        message: "Staff already exists"
      });
    }

    /* ⭐ USE PROFESSIONAL OCR */
    const ocrText = await extractTextFromIdCard(req.file.path);

    /* ⭐ VERIFY DETAILS */
    const isValid = verifyStaffFromId(ocrText, {
      name,
      staffId,
      department,
      designation
    });

    if (!isValid) {
      return res.status(400).json({
        message:
          "ID Card verification failed. Name / Dept / Designation mismatch"
      });
    }

    const hash = await bcrypt.hash(password, 10);

    const staff = new Staff({
      name,
      email,
      password: hash,
      staffId: staffId || null,
      department,
      designation,
      phone,
      gender,
      idCardUpload: req.file.path
    });

    await staff.save();

    res.status(201).json({
      message: "Staff registered successfully (ID verified)"
    });

  } catch (err) {
    console.error("STAFF REGISTER ERROR:", err);
    res.status(500).json({
      message: "Registration failed"
    });
  }
};
/* ================= LOGIN ================= */
exports.login = async (req, res) => {
  try {
    const { regNo, password, userType } = req.body;

    let user;

    if (userType === "student") {
      user = await Student.findOne({ regNo });
    }
    else if (userType === "staff") {
      user = await Staff.findOne({ staffId: regNo });
    }
    else if (userType === "admin") {
      user = await Admin.findOne({ regNo });
    }
    else {
      return res.status(400).json({ message: "Invalid user type" });
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    /* ⭐ Auto update student year on login */
    if (userType === "student") {
      const newYear = calculateAcademicYear(user.academicYear);

      if (user.year !== newYear) {
        user.year = newYear;
        await user.save();
      }
    }

    const payload = {
      id: user._id,
      userType,
      role: user.role || null
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "7d"
    });

    res.json({
      token,
      user: payload
    });

  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json({ message: "Login error" });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const student = await Student.findOne({ email });

    if (!student) {
      return res.status(404).json({ message: "Email not registered" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    student.otp = otp;
    student.otpExpiry = Date.now() + 5 * 60 * 1000; // 5 minutes

    await student.save();

    await sendOTP(email, otp);

    res.json({ message: "OTP sent to email" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error sending OTP" });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    const student = await Student.findOne({ email });

    if (!student) {
      return res.status(404).json({ message: "User not found" });
    }

    if (student.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (student.otpExpiry < Date.now()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    const hash = await bcrypt.hash(newPassword, 10);

    student.password = hash;
    student.otp = null;
    student.otpExpiry = null;

    await student.save();

    res.json({ message: "Password reset successful" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Reset failed" });
  }
};