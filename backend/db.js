const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      console.warn("⚠️ MONGO_URI is not defined in environment variables. Skipping MongoDB connection.");
      return;
    }
    await mongoose.connect(process.env.MONGO_URI); // No need for extra options
    console.log("✅ MongoDB connected successfully!");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    // Removed process.exit(1) to prevent server crash on Render
  }
};

module.exports = connectDB;
