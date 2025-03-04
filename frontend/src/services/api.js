import axios from "axios";

const API_URL = "https://ats-score-checker.onrender.com/api/resume/upload"; // Ensure this is correct

export const uploadResume = async (formData) => {
  try {
    const response = await axios.post(API_URL, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data; // Ensure backend returns JSON
  } catch (error) {
    console.error("Error uploading resume:", error.response?.data || error.message);
    throw new Error("Failed to analyze resume");
  }
};
