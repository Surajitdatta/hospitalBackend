// id , title, description, department, posted on , last date
const mongoose = require("mongoose");

const jobSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Job title is required!"],
    },
    description: {
      type: String,
      required: [true, "Job description is required!"],
    },
    department: {
      type: String,
      required: [true, "Department is required!"],
    },
    postedOn: {
      type: Date,
      default: Date.now, // auto-set to now when created
    },
    lastDate: {
      type: Date,
      required: [true, "Last date to apply is required!"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", jobSchema);
