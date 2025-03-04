import React, { useState } from "react";
import { uploadResume } from "../services/api";
import "../styles.css";



const jobOptions = [
  "General Resume Analysis",
  "Software Engineer",
  "Data Scientist",
  "Web Developer",
  "Backend Developer",
  "Frontend Developer",
  "Machine Learning Engineer",
  "Cybersecurity Analyst",
  "DevOps Engineer",
  "Database Administrator",
  "Product Manager",
];

const UploadPage = () => {
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("General Resume Analysis");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setResult(null);

    if (!file || !jobDescription) {
      setError("Please upload a resume and select a job description.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("resume", file);
    formData.append("jobDescription", jobDescription);

    try {
      const response = await uploadResume(formData);
      setResult(response);
    } catch (err) {
      setError("Failed to analyze resume. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    
    <div className="page-container" style={{ backgroundColor: 'rgb(0, 0, 0)', color: 'white', minHeight: '100vh', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <p className="description quote" style={{ fontWeight: 'bold', fontSize: '1.5em', fontFamily: 'cursive', textAlign: 'center' }}>🎭 Is your resume ready to party, or is it still in its pajamas? 🎭</p>

      <form onSubmit={handleSubmit} className="upload-form">
      <label className="label" style={{ marginBottom: '10px', display: 'block', textAlign: 'center', fontWeight: 'bold' }}>Select Job Description:</label>
      <select
          className="dropdown"
          value={jobDescription || "General Resume Analysis"}
          onChange={(e) => setJobDescription(e.target.value)}
        >
          {jobOptions.map((job, index) => (
            <option key={index} value={job}>{job}</option>
          ))}
        </select>

        <div className="upload-box">
          <input type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={handleFileChange} />
          <p className="upload-text">Drag & Drop your resume here or <span className="browse">browse</span></p>
        </div>

        {error && <p className="error">❌ {error}</p>}
        {result && (
          <div className="result-box">
            <p className="result-text">✅ ATS Score: {result.atsScore}%</p>
          </div>
        )}

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "Analyzing..." : "Analyze Resume"}
        </button>
      </form>
    </div>
  );
};

export default UploadPage;
