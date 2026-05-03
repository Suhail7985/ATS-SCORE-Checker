import axios from "axios";

// Automatically use local backend in development, and Render backend in production
const API_URL = process.env.NODE_ENV === "development"
  ? "http://localhost:3000/api/resume/upload"
  : "https://ats-score-checker.onrender.com/api/resume/upload";

export const uploadResume = async (formData) => {
  try {
    const response = await axios.post(API_URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true, // Ensure cookies & credentials are sent
    });

    return response.data; // Ensure backend returns JSON
  } catch (error) {
    if (error.response) {
      console.error("❌ API Error:", error.response.data);
      throw new Error(error.response.data.error || "Server error while analyzing resume");
    } else if (error.request) {
      console.error("❌ Network Error: No response from server");
      throw new Error("Network error: Unable to connect to the server");
    } else {
      console.error("❌ Unexpected Error:", error.message);
      throw new Error("Unexpected error occurred");
    }
  }
};
