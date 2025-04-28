// routes/healthPackage.routes.js
const express = require("express");
const router = express.Router();
const HealthPackage = require("../models/healthPackage.model");

// POST - Create a new Health Package
router.post("/", async (req, res) => {
  try {
    const { packageName, price, discount, inclusions, duration, preparationInstructions, isActive } = req.body;

    // Basic server-side validation
    if (!packageName || !price || !duration) {
      return res.status(400).json({ message: "packageName, price, and duration are required fields" });
    }

    const newPackage = await HealthPackage.create({
      packageName,
      price,
      discount: discount || 0,
      inclusions,
      duration,
      preparationInstructions,
      isActive: isActive !== undefined ? isActive : true
    });

    res.status(201).json({
      message: "Health package created successfully",
      data: newPackage
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create health package",
      error: error.message
    });
  }
});

// GET - Fetch all Health Packages
router.get("/", async (req, res) => {
  try {
    const packages = await HealthPackage.find().sort({ createdAt: -1 });
    res.status(200).json({
      count: packages.length,
      data: packages
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch health packages",
      error: error.message
    });
  }
});

// GET - Fetch a single Health Package by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const healthPackage = await HealthPackage.findById(id);

    if (!healthPackage) {
      return res.status(404).json({ message: "Health package not found" });
    }

    res.status(200).json({
      data: healthPackage
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch health package",
      error: error.message
    });
  }
});

// PUT - Update a Health Package
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = {
      ...req.body
    };

    const updatedPackage = await HealthPackage.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedPackage) {
      return res.status(404).json({ message: "Health package not found" });
    }

    res.status(200).json({
      message: "Health package updated successfully",
      data: updatedPackage
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update health package",
      error: error.message
    });
  }
});

// DELETE - Delete a Health Package
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedPackage = await HealthPackage.findByIdAndDelete(id);

    if (!deletedPackage) {
      return res.status(404).json({ message: "Health package not found" });
    }

    res.status(200).json({
      message: "Health package deleted successfully",
      data: deletedPackage
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete health package",
      error: error.message
    });
  }
});

module.exports = router;
