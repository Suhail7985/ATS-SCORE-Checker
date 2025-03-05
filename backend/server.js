const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./db");
const resumeRoutes = require("./routes/resumeRoutes");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Fix CORS: Ensure the frontend is allowed
app.use(cors({
    origin: "https://ats-score-checker-1.onrender.com", // ✅ Your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true // ✅ Allow cookies & authentication headers
}));

// ✅ Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Connect to MongoDB
connectDB();

// ✅ Logging Middleware (See if requests are reaching the backend)
app.use((req, res, next) => {
  console.log(`🔥 Received request: ${req.method} ${req.url}`);
  next();
});

// ✅ Routes
app.use("/api/resume", resumeRoutes);

// ✅ Default Route (For Testing)
app.get("/", (req, res) => {
  res.send("ATS Resume Checker API Running");
});

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
