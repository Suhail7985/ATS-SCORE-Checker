const express = require("express");
const pdfParse = require("pdf-parse");
const mammoth = require("mammoth");
const multer = require("multer");
const natural = require("natural");
const stemmer = natural.PorterStemmer; // Stems words (e.g., "running" → "run")

const router = express.Router();

// Configure Multer for file uploads
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype !== "application/pdf" &&
    file.mimetype !== "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    return cb(new Error("Only PDF and DOCX files are allowed"), false);
  }
  cb(null, true);
};

const upload = multer({ 
  storage: storage, 
  fileFilter: fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 } // 2MB limit
});


router.post("/upload", upload.single("resume"), async (req, res) => {
  console.log("✅ API HIT: /upload route");  // Checks if API is being called
  console.log("📥 Received Request Body:", req.body);
console.log("📂 Received File:", req.file ? req.file.originalname : "No file received");

  try {
    if (!req.file) {
      console.log("❌ No file received");
      return res.status(400).json({ error: "No file uploaded" });
    }

    if (!req.body.jobDescription) {
      console.log("❌ No job description received");
      return res.status(400).json({ error: "Job description is required" });
    }
    
    const jobDescription = req.body.jobDescription || ""; // ✅ Fix: Define it properly
    
    // Extract keywords
   

    let extractedText = "";

    // Extract text based on file type
    if (req.file.mimetype === "application/pdf") {
      const data = await pdfParse(req.file.buffer);
      extractedText = data.text;
    } else if (req.file.mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
      const { value } = await mammoth.extractRawText({ buffer: req.file.buffer });
      extractedText = value;
    } else {
      return res.status(400).json({ error: "Unsupported file format" });
    }
    
    // ✅ Ensure extractedText is not empty
    if (!extractedText.trim()) {
      console.log("❌ Error: No text extracted from resume");
      return res.status(400).json({ error: "Could not extract text from resume" });
    }
    
    const generalKeywords = [
      "Communication", "Problem-solving", "Leadership", "Teamwork",
      "Critical Thinking", "Project Management", "Creativity",
      "Time Management", "Adaptability", "Collaboration"
    ];
    
    const jobKeywords = jobDescription === "General Resume Analysis"
      ? generalKeywords
      : extractKeywords(jobDescription).map(word => natural.PorterStemmer.stem(word));
        const resumeKeywords = extractKeywords(extractedText).map(word => natural.PorterStemmer.stem(word));
    
   
    // Compare keywords (Improved Matching Logic)
    const keywordSynonyms = {
      "js": ["javascript"],
      "developer": ["engineer", "programmer", "software engineer"],
      "react": ["reactjs", "react.js"],
      "node": ["nodejs", "node.js"],
      "database": ["sql", "mongodb", "mysql"]
    };
    
    // Function to get keyword variations
    const getKeywordVariations = (word) => [word, ...(keywordSynonyms[word] || [])];
    
    const matchedKeywords = resumeKeywords.filter(resumeWord =>
      jobKeywords.some(jobWord =>
        getKeywordVariations(jobWord).some(variant =>
          resumeWord.includes(variant) || natural.JaroWinklerDistance(resumeWord, variant) > 0.85
        )
      )
    );
    
    
    

    const missingKeywords = jobKeywords.filter((word) => !matchedKeywords.includes(word));

    // ✅ PLACE THE ATS SCORE CALCULATION HERE:
  // Advanced ATS Scoring System
  // Define mandatory keywords for each job
  const jobMandatoryKeywords = {
    "General Resume Analysis": [
      "communication", "problem-solving", "leadership", "teamwork",
      "critical thinking", "project management", "creativity",
      "time management", "adaptability", "collaboration"
    ],
    "Software Engineer": ["javascript", "python", "java", "react", "node", "algorithms", "data structures"],
    "Data Scientist": ["python", "machine learning", "data analysis", "pandas", "numpy", "deep learning", "statistics"],
    "Web Developer": ["html", "css", "javascript", "react", "bootstrap", "responsive design"],
    "Backend Developer": ["node", "express", "database", "mongodb", "sql", "rest api", "authentication"],
    "Frontend Developer": ["react", "javascript", "css", "redux", "ui/ux", "tailwind", "styled-components"],
    "Machine Learning Engineer": ["tensorflow", "scikit-learn", "neural networks", "nlp", "computer vision", "python"],
    "Cybersecurity Analyst": ["penetration testing", "encryption", "firewall", "network security", "vulnerability assessment"],
    "DevOps Engineer": ["docker", "kubernetes", "ci/cd", "jenkins", "terraform", "aws", "linux"],
    "Database Administrator": ["sql", "mysql", "mongodb", "database design", "query optimization", "data security"],
    "Product Manager": ["agile", "scrum", "roadmap", "market research", "stakeholder management", "ux design"],
  };
  

// Get the mandatory keywords for the selected job
const mandatoryKeywords = jobMandatoryKeywords[jobDescription] || [];
console.log("📌 Mandatory Keywords for Job:", mandatoryKeywords);

// Extract keywords from the resume

// Match resume keywords with job-specific mandatory keywords
const matchedMandatoryKeywords = mandatoryKeywords.filter(word =>
  resumeKeywords.includes(word)
);
console.log("✅ Matched Mandatory Keywords:", matchedMandatoryKeywords);

// Ensure mandatory keyword match score
const mandatoryKeywordScore = Math.round((matchedMandatoryKeywords.length / (mandatoryKeywords.length || 1)) * 51); // 50% weight

// Resume Formatting & Readability Checks
const hasSkillsSection = extractedText.toLowerCase().includes("skills");
const hasExperienceSection = extractedText.toLowerCase().includes("experience");
const hasEducationSection = extractedText.toLowerCase().includes("education");

// Formatting Score (Max 15%)
const formattingScore = (hasSkillsSection + hasExperienceSection + hasEducationSection) * 8;

// Readability Score (Max 20%)
const wordCount = extractedText.split(/\s+/).length;
const readabilityScore = wordCount > 400 ? 23 : 13;

// Final ATS Score (Ensuring Max is 100)
const atsScore = Math.min(mandatoryKeywordScore + formattingScore + readabilityScore, 100);

// ✅ Debug Logs
console.log("📊 ATS Score:", atsScore);
console.log("📈 Mandatory Keyword Score:", mandatoryKeywordScore);
console.log("📃 Formatting Score:", formattingScore);
console.log("📖 Readability Score:", readabilityScore);

// Send response to frontend
res.json({
  message: "Resume analyzed successfully!",
  atsScore,
  mandatoryKeywordScore,
  formattingScore,
  readabilityScore,
  matchedMandatoryKeywords,
  missingMandatoryKeywords: mandatoryKeywords.filter((word) => !matchedMandatoryKeywords.includes(word)),
  jobDescription,
});

    
    

  } catch (error) {
    console.error("Error processing resume:", error);
    res.status(500).json({ error: "Error extracting text from resume" });
  }
});


// ✅ Extract structured sections from resume
function extractResumeSections(text) {
    const sections = {
      skills: "",
      experience: "",
      education: "",
    };
  
    const lines = text.split("\n");
  
    let currentSection = "";
    lines.forEach((line) => {
      line = line.trim().toLowerCase();
  
      if (line.includes("skills")) currentSection = "skills";
      else if (line.includes("experience")) currentSection = "experience";
      else if (line.includes("education")) currentSection = "education";
      else if (line === "") currentSection = ""; // Reset if empty line
  
      if (currentSection && line !== "") {
        sections[currentSection] += line + " ";
      }
    });
  
    return sections;
  }


  function extractKeywords(text) {
    const tokenizer = new natural.WordTokenizer();
    let words = tokenizer.tokenize(text.toLowerCase());
  
    // Remove common stop words
    const stopWords = new Set([
      "a", "an", "the", "and", "or", "but", "if", "then", "for", "with", "on", "at", "by", "from", "about",
      "as", "into", "like", "through", "after", "over", "under", "again", "further", "here", "there", "when",
      "where", "why", "how", "all", "any", "both", "each", "few", "more", "most", "some", "such", "no", "nor",
      "only", "own", "same", "so", "than", "too", "very", "this", "that", "these", "those"
    ]);
  
    words = words.filter((word) => !stopWords.has(word));
  
    // ✅ Apply word stemming to normalize variations
    return words.map(word => stemmer.stem(word));
  }
  

module.exports = router;
