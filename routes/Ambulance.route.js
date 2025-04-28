const express = require("express");
const router = express.Router();
const Ambulance = require("../models/ambulanceSchema.model");  // Ensure correct import

// POST - Create new ambulance record
router.post("/", async (req, res) => {
  try {
    const { ambulanceType, vehicleNumber, driverName, driverContact, locationCoverage, baseLocation, charges } = req.body;

    // Validate required fields
    if (!ambulanceType || !vehicleNumber || !driverName || !driverContact || !baseLocation || !charges) {
      return res.status(400).json({ message: "Required fields are missing" });
    }

    const ambulance = new Ambulance({
      ambulanceType,
      vehicleNumber,
      driverName,
      driverContact,
      locationCoverage,
      baseLocation,
      charges
    });

    await ambulance.save();  // Save the record

    res.status(201).json({
      message: "Ambulance record created successfully",
      data: ambulance
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create ambulance record",
      error: error.message
    });
  }
});

// GET - Fetch all ambulance records
router.get("/", async (req, res) => {
  try {
    const ambulances = await Ambulance.find().sort({ createdAt: -1 });
    res.status(200).json({
      count: ambulances.length,
      data: ambulances
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch ambulances",
      error: error.message
    });
  }
});

// GET - Fetch a single ambulance by ID
router.get("/:id", async (req, res) => {
  try {
    const ambulance = await Ambulance.findById(req.params.id);

    if (!ambulance) {
      return res.status(404).json({ message: "Ambulance not found" });
    }

    res.status(200).json(ambulance);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch ambulance",
      error: error.message
    });
  }
});

// PUT - Update ambulance record
router.put("/:id", async (req, res) => {
  try {
    const updatedAmbulance = await Ambulance.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedAmbulance) {
      return res.status(404).json({ message: "Ambulance not found" });
    }

    res.status(200).json({
      message: "Ambulance record updated successfully",
      data: updatedAmbulance
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update ambulance",
      error: error.message
    });
  }
});

// DELETE - Remove ambulance record
router.delete("/:id", async (req, res) => {
  try {
    const ambulance = await Ambulance.findByIdAndDelete(req.params.id);

    if (!ambulance) {
      return res.status(404).json({ message: "Ambulance not found" });
    }

    res.status(200).json({ message: "Ambulance deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete ambulance",
      error: error.message
    });
  }
});

module.exports = router;
