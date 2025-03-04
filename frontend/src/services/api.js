import axios from "axios";

const API_URL = "https://ats-score-checker.onrender.com"; // Make sure this is correct

export const uploadResume = async (formData) => {
  try {
    const response = await fetch("https://ats-score-checker.onrender.com/api/resume/upload", {
      method: "POST",
      body: formData, // Do not set Content-Type manually (FormData handles it)
    });

    if (!response.ok) {
      throw new Error("Failed to analyze resume");
    }

    return response.json();
  } catch (error) {
    console.error("Error uploading resume:", error);
    throw error;
  }
};
