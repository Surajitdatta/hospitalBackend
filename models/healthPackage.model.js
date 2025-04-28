// models/healthPackage.model.js
const mongoose = require("mongoose");

const healthPackageSchema = new mongoose.Schema({
  packageName: { 
    type: String, 
    required: true, 
    unique: true // e.g., "Full Body Checkup", "Diabetes Care"
  },
  price: { 
    type: Number, 
    required: true 
  },
  discount: { 
    type: Number, 
    default: 0 // Optional discount percentage
  },
  inclusions: [{
    name: { type: String, required: true },  // e.g., "CBC Test", "Doctor Consultation"
    description: { type: String }
  }],
  duration: { 
    type: String, 
    required: true // e.g., "2 hours", "1 day"
  },
  preparationInstructions: { 
    type: String 
  },
  isActive: { 
    type: Boolean, 
    default: true 
  }
}, { timestamps: true });

module.exports = mongoose.model("HealthPackage", healthPackageSchema);
