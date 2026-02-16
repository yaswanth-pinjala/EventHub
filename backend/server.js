const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
dotenv.config();
const app = express();
// Connect to MongoDB Atlas
connectDB();
// Middlewares
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/events", require("./routes/eventRoutes"));
app.use("/api/projects", require("./routes/projectRoutes"));
app.use("/api/registrations", require("./routes/registrationRoutes"));
app.use("/api/notifications", require("./routes/notificationRoutes"));
app.use("/api/certificates", require("./routes/certificateRoutes"));
app.use("/api/students", require("./routes/studentRoutes"));
// Health check
app.get("/", (req, res) => {
 res.send("EventHub backend running");
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`■ Server running on port ${PORT}`));