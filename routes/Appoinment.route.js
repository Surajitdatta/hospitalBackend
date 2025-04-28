const express = require('express');
const router = express.Router();
const Appointment = require('../models/appoinment.model');

// POST - Create a new appointment
router.post("/", async (req, res) => {
  try {
    const { patientName, patientPhone, patientEmail, preferredDate, problemDescription } = req.body;

    if (!patientName || !patientPhone || !problemDescription) {
      return res.status(400).json({ message: "Patient name, phone and problem description are required." });
    }

    const newAppointment = new Appointment({
      patientName,
      patientPhone,
      patientEmail,
      preferredDate,
      problemDescription,
    });

    const savedAppointment = await newAppointment.save();
    res.status(201).json(savedAppointment);
  } catch (error) {
    console.error('Error creating appointment:', error.message);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

// GET - Get all appointments
router.get("/", async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ createdAt: -1 });
    res.status(200).json(appointments);
  } catch (error) {
    console.error('Error fetching appointments:', error.message);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

// GET - Get appointment by ID
router.get("/:id", async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    res.status(200).json(appointment);
  } catch (error) {
    console.error('Error fetching appointment:', error.message);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

// PUT - Update appointment by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedAppointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    res.status(200).json(updatedAppointment);
  } catch (error) {
    console.error('Error updating appointment:', error.message);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

// DELETE - Delete appointment by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedAppointment = await Appointment.findByIdAndDelete(req.params.id);
    if (!deletedAppointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    res.status(200).json({ message: "Appointment deleted successfully" });
  } catch (error) {
    console.error('Error deleting appointment:', error.message);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

module.exports = router;
