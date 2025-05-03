const express = require("express");
const router = express.Router();
const Job = require("../models/jobs.model");

// Create a new job posting
router.post("/", async (req, res) => {
  try {
    const {
      postName,
      experience,
      location,
      qualification,
      companyOverview,
      positionSummary,
      keyResponsibilities,
      phoneNumber,
      email,
      department,
      lastDate
    } = req.body;

    const newJob = await Job.create({
      postName,
      experience,
      location,
      qualification,
      companyOverview,
      positionSummary,
      keyResponsibilities,
      phoneNumber,
      email,
      department,
      lastDate
    });

    res.status(201).json({
      success: true,
      message: "Job posted successfully!",
      job: newJob
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Get all jobs (with optional filtering)
router.get("/", async (req, res) => {
  try {
    const { department, location, postName } = req.query;
    const filter = {};

    if (department) filter.department = department;
    if (location) filter.location = location;
    if (postName) filter.postName = { $regex: postName, $options: "i" };

    const jobs = await Job.find(filter).sort({ postedOn: -1 });

    res.status(200).json({
      success: true,
      count: jobs.length,
      jobs
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Get job by ID
router.get("/:id", async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found"
      });
    }

    res.status(200).json({
      success: true,
      job
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Update job by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!updatedJob) {
      return res.status(404).json({
        success: false,
        message: "Job not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Job updated successfully!",
      job: updatedJob
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Delete job by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedJob = await Job.findByIdAndDelete(req.params.id);

    if (!deletedJob) {
      return res.status(404).json({
        success: false,
        message: "Job not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Job deleted successfully!",
      deletedJobId: deletedJob._id
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;
