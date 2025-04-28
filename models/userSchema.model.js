const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: [true, "Name is required!"] },
    gender: { type: String, enum: ["male", "female", "other"], required: [true, "Gender is required!"] },
    dob: { type: Date, required: [true, "Date of birth is required!"] },
    email: { type: String, required: [true, "Email is required!"], unique: true },
    phone: { type: String, required: [true, "Phone number is required!"] },
    photo: { type: String, required: [true, "User photo is required!"] },
    address: { type: String, required: [true, "Address is required!"] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
