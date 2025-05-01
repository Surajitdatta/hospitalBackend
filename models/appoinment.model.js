// models/Appointment.js
const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  patientName: {
    type: String,
    required: true,
    trim: true
  },
  doctorName: {
    type: String,
    required: true,
    trim: true

  },
  patientPhone: {
    type: String,
    required: true,
    trim: true
  },
  patientEmail: {
    type: String,
    trim: true
  },
  preferredDate: {
    type: Date
  },
  problemDescription: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
