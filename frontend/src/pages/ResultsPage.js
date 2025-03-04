import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { atsScore, matchedKeywords, missingKeywords } = location.state || {};

  return (
    <div>
      <h1>ATS Score Results</h1>
      {atsScore !== undefined ? (
        <>
          <p>ATS Score: {atsScore}%</p>
          <h3>Matched Keywords</h3>
          <p>{matchedKeywords?.join(", ") || "No matches"}</p>
          <h3>Missing Keywords</h3>
          <p>{missingKeywords?.join(", ") || "None"}</p>
        </>
      ) : (
        <p>No data available</p>
      )}
      <button onClick={() => navigate("/")}>Go Back</button>
    </div>
  );
};

export default ResultsPage;
