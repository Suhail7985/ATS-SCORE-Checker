const mongoose = require("mongoose");
const dotenv = require("dotenv");
const JobDescription = require("../models/JobDescription.js"); // ✅ Ensure correct path

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("MongoDB Connection Error:", err));

const jobs = [
  { title: "Software Engineer", keywords: ["JavaScript", "React", "Node.js", "MongoDB", "REST API"] },
  { title: "Data Scientist", keywords: ["Python", "Machine Learning", "Data Analysis", "TensorFlow", "Pandas"] },
  { title: "Product Manager", keywords: ["Agile", "Scrum", "Product Roadmap", "User Research", "Stakeholder Management"] },
  { title: "UI/UX Designer", keywords: ["Figma", "Adobe XD", "Wireframing", "User Research", "Prototyping"] },
  { title: "Cybersecurity Analyst", keywords: ["Network Security", "Penetration Testing", "Firewalls", "SIEM", "Incident Response"] },
  { title: "DevOps Engineer", keywords: ["Docker", "Kubernetes", "CI/CD", "Jenkins", "AWS", "Terraform"] },
  { title: "Cloud Architect", keywords: ["AWS", "Azure", "Google Cloud", "Kubernetes", "Cloud Security"] },
  { title: "Full Stack Developer", keywords: ["MERN Stack", "GraphQL", "TypeScript", "Redux", "Microservices"] },
  { title: "Marketing Specialist", keywords: ["SEO", "Content Marketing", "Google Ads", "Social Media Marketing", "Email Campaigns"] },
  { title: "Finance Analyst", keywords: ["Financial Modeling", "Data Analysis", "Investment Research", "Excel", "SQL"] },
  { title: "Mobile App Developer", keywords: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase"] },
  { title: "AI/ML Engineer", keywords: ["Deep Learning", "NLP", "PyTorch", "TensorFlow", "Computer Vision"] },
];

const seedJobs = async () => {
  try {
    await JobDescription.deleteMany(); // ✅ Ensure the model is imported correctly
    await JobDescription.insertMany(jobs);
    console.log("✅ Job descriptions added!");
    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Error inserting jobs:", error);
    mongoose.connection.close();
  }
};

seedJobs();
