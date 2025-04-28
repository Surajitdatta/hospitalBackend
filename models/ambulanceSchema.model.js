const mongoose = require("mongoose");
const ambulanceSchema = new mongoose.Schema({
  ambulanceType: {
    type: String,
    enum: ["Basic Life Support", "Advanced Life Support", "Patient Transport Ambulance", "Neonatal Ambulance"],
    required: true
  },
  vehicleNumber: {
    type: String,
    required: true,
    unique: true
  },
  driverName: {
    type: String,
    required: true
  },
  driverContact: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ["available", "on-mission", "maintenance"],
    default: "available"
  },
  locationCoverage: String,
  baseLocation: {
    type: String,
    required: true
  },
  charges: {
    type: Number,
    required: true
  },
  equipment: String,
  isAvailable: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

module.exports = mongoose.model("Ambulance", ambulanceSchema);
