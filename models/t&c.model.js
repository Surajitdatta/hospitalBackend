const mongoose = require("mongoose");

const termsSchema = mongoose.Schema(
  {
    text: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("TermsCondition", termsSchema);
