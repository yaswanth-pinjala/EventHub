const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Student = require("../models/Student");
const Staff = require("../models/Staff");
const Admin = require("../models/Admin");
const extractTextFromIdCard = require("../utils/ocr");
const verifyStudentFromId = require("../utils/verifyStudentFromId");

/**
 * userType: "student" | "staff" | "admin"
 */
exports.registerStudent = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      regNo,
      department,
      academicYear,
    } = req.body;

    const idCardUpload = req.file ? req.file.path : "";

    // Basic validation
    if (
      !name ||
      !email ||
      !password ||
      !regNo ||
      !department ||
      !academicYear
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        message: "ID Card upload is required",
      });
    }

    // Check existing student
    const existingStudent = await Student.findOne({ regNo });
    if (existingStudent) {
      return res.status(400).json({
        message: "Register number already exists",
      });
    }

    //  OCR – Extract text from ID card
    const ocrText = await extractTextFromIdCard(req.file.path);

    //  Verify ID card details
    const isValid = verifyStudentFromId(ocrText, {
      name,
      regNo,
      department,
    });
    

    if (!isValid) {
      return res.status(400).json({
        message: "ID Card details do not match entered student details",
      });
    }

    //  Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    //  Save student
    const student = new Student({
      name,
      email,
      regNo,
      password: hashedPassword,
      department,
      academicYear,
      idCardUpload,
    });

    await student.save();

    res.status(201).json({
      message: "Student registered successfully (ID Verified)",
    });

  } catch (err) {
    console.error("REGISTER STUDENT ERROR:", err);
    res.status(500).json({
      message: err.message || "Error registering student",
    });
  }
};

exports.login = async (req, res) => {
 try {
 const { regNo, password, userType } = req.body;
 let Model;
 if (userType === "student") Model = Student;
 else if (userType === "staff") Model = Staff;
 else if (userType === "admin") Model = Admin;
 else return res.status(400).json({ message: "Invalid user type" });
 const user = await Model.findOne({ regNo });
 if (!user) return res.status(404).json({ message: "User not found" });
 const ok = await bcrypt.compare(password, user.password);
 if (!ok) return res.status(400).json({ message: "Invalid credentials" });
 const payload = {
 id: user._id,
 userType,
 };
 if (userType === "admin") {
 payload.adminType = user.role;
 payload.department = user.department;
 }
 const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });
 res.json({ token, user: payload });
 } catch (err) {
 res.status(500).json({ message: "Login error" });
 }
};
