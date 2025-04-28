const mongoose = require("mongoose");

const insuranceSchema = new mongoose.Schema({
  providerName: { 
    type: String, 
    required: true, 
    trim: true // clean extra spaces
  },
  contactNumber: { 
    type: String, 
    required: true,
    trim: true
  },
  email: {
    type: String,
    trim: true,
    lowercase: true
  },
  policyCoverage: [{
    type: String,
    trim: true
  }],
  claimsProcess: { 
    type: String, 
    required: true 
  },
  isCashless: { 
    type: Boolean, 
    default: true 
  },
  hospitalEmpanelmentCode: {
    type: String,
    trim: true
  }
}, { timestamps: true });

module.exports = mongoose.model("Insurance", insuranceSchema);
