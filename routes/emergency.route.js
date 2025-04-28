// routes/emergencyBed.routes.js
const express = require("express");
const router = express.Router();
const EmergencyBed = require("../models/emergencyBed.model");

// POST - Create new bed entry
router.post("/", async (req, res) => {
  try {
    const { bedType, totalBeds, availableBeds, department } = req.body;

    if (!bedType || !totalBeds || !department) {
      return res.status(400).json({ message: "bedType, totalBeds, and department are required fields" });
    }

    const bed = await EmergencyBed.create({
      bedType,
      totalBeds,
      availableBeds: availableBeds || 0,
      lastUpdated: new Date(),
      department
    });

    res.status(201).json({
      message: "Bed record created successfully",
      data: bed
    });
  } catch (error) {
    res.status(500).json({ 
      message: "Failed to create bed record",
      error: error.message 
    });
  }
});

// GET - Fetch all bed records
router.get("/", async (req, res) => {
  try {
    const beds = await EmergencyBed.find().sort({ lastUpdated: -1 });
    res.status(200).json({
      count: beds.length,
      data: beds
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch bed records",
      error: error.message
    });
  }
});

// GET - Available beds by type
router.get("/available/:type", async (req, res) => {
  try {
    const { type } = req.params;

    if (!type) {
      return res.status(400).json({ message: "Bed type is required in params" });
    }

    const beds = await EmergencyBed.find({
      bedType: type,
      availableBeds: { $gt: 0 }
    });

    if (beds.length === 0) {
      return res.status(404).json({ message: `No available beds found for type: ${type}` });
    }

    res.status(200).json({
      count: beds.length,
      data: beds
    });
  } catch (error) {
    res.status(500).json({
      message: `Failed to fetch available ${req.params.type} beds`,
      error: error.message
    });
  }
});

// PUT - Update bed counts
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = {
      ...req.body,
      lastUpdated: new Date()
    };

    if (!id) {
      return res.status(400).json({ message: "Bed ID is required in params" });
    }

    const bed = await EmergencyBed.findByIdAndUpdate(id, updateData, { new: true });

    if (!bed) {
      return res.status(404).json({ message: "Bed record not found" });
    }

    res.status(200).json({
      message: "Bed record updated successfully",
      data: bed
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update bed record",
      error: error.message
    });
  }
});

// DELETE - Delete a bed record
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Bed ID is required in params" });
    }

    const bed = await EmergencyBed.findByIdAndDelete(id);

    if (!bed) {
      return res.status(404).json({ message: "Bed record not found" });
    }

    res.status(200).json({
      message: "Bed record deleted successfully",
      data: bed
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete bed record",
      error: error.message
    });
  }
});

module.exports = router;
