const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./db");
const resumeRoutes = require("./routes/resumeRoutes"); 
const jobRoutes = require("./routes/jobRoutes");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5173;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/resume", resumeRoutes);
app.use("/api/jobs", jobRoutes);

// Default Route
app.get("/", (req, res) => {
  res.send("ATS Resume Checker API Running");
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
