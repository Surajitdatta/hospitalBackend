const express = require("express");
const router = express.Router();
const Insurance = require("../models/insurance.model");

// =============================
// POST - Create new Insurance
// =============================
router.post("/", async (req, res) => {
  try {
    const { providerName, contactNumber, claimsProcess } = req.body;

    // Basic validations
    if (!providerName || !contactNumber || !claimsProcess) {
      return res.status(400).json({ message: "providerName, contactNumber, and claimsProcess are required fields" });
    }

    const insurance = await Insurance.create(req.body);

    res.status(201).json({
      message: "Insurance record created successfully",
      data: insurance
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create insurance record",
      error: error.message
    });
  }
});

// =============================
// GET - Fetch all Insurances
// =============================
router.get("/", async (req, res) => {
  try {
    const insurances = await Insurance.find().sort({ createdAt: -1 });

    res.status(200).json({
      count: insurances.length,
      data: insurances
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch insurance records",
      error: error.message
    });
  }
});

// =============================
// GET - Fetch Single Insurance by ID
// =============================
router.get("/:id", async (req, res) => {
  try {
    const insurance = await Insurance.findById(req.params.id);

    if (!insurance) {
      return res.status(404).json({ message: "Insurance record not found" });
    }

    res.status(200).json({ data: insurance });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch insurance record",
      error: error.message
    });
  }
});

// =============================
// PUT - Update Insurance by ID
// =============================
router.put("/:id", async (req, res) => {
  try {
    const updateData = { ...req.body };

    const insurance = await Insurance.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true } // return updated document
    );

    if (!insurance) {
      return res.status(404).json({ message: "Insurance record not found" });
    }

    res.status(200).json({
      message: "Insurance record updated successfully",
      data: insurance
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update insurance record",
      error: error.message
    });
  }
});

// =============================
// DELETE - Remove Insurance by ID
// =============================
router.delete("/:id", async (req, res) => {
  try {
    const insurance = await Insurance.findByIdAndDelete(req.params.id);

    if (!insurance) {
      return res.status(404).json({ message: "Insurance record not found" });
    }

    res.status(200).json({
      message: "Insurance record deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete insurance record",
      error: error.message
    });
  }
});

module.exports = router;
