const mongoose = require("mongoose");

const JobDescriptionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  keywords: [String], // Keywords required for this job
});

module.exports = mongoose.model("JobDescription", JobDescriptionSchema);
