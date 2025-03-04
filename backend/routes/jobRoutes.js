const express = require("express");
const JobDescription = require("../models/JobDescription.js");

const router = express.Router();

// Fetch all job descriptions
router.get("/", async (req, res) => {
    try {
      const jobs = await JobDescription.find();
      res.json(jobs);
    } catch (error) {
      res.status(500).json({ error: "Error fetching job descriptions" });
    }
  });
  

// Add a new job description (for admin purposes)
router.post("/add", async (req, res) => {
  try {
    const { title, keywords } = req.body;
    const newJob = new JobDescription({ title, keywords });
    await newJob.save();
    res.json({ message: "Job description added!" });
  } catch (error) {
    res.status(500).json({ error: "Error adding job description" });
  }
});

module.exports = router;
