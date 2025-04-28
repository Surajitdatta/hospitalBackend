// models/emergencyBed.model.js
const mongoose = require("mongoose");

const emergencyBedSchema = new mongoose.Schema({
  bedType: {
    type: String,
    enum: ["General ICU", "Cardiac ICU", "Pediatric ICU", "Ventilator", "General Ward"],
    required: true
  },
  totalBeds: { 
    type: Number, 
    required: true 
  },
  availableBeds: { 
    type: Number, 
    default: 0 
  },
  lastUpdated: { 
    type: Date, 
    default: Date.now 
  },
  department: { 
    type: String, 
    required: true // Should ideally be ObjectId if referencing Department collection
  }
}, { timestamps: true });

module.exports = mongoose.model("EmergencyBed", emergencyBedSchema);
