const mongoose = require("mongoose");

const jobSchema = mongoose.Schema(
  {
    postName: {
      type: String,
      required: [true, "Post name is required!"],
    },
    experience: {
      type: String,
      required: [true, "Experience is required!"],
    },
    location: {
      type: String,
      required: [true, "Location is required!"],
    },
    qualification: {
      type: String,
      required: [true, "Qualification is required!"],
    },
    // date: {
    //   type: Date,
    //   required: [true, "Date is required!"],
    // },
    companyOverview: {
      type: String,
      required: [true, "Company overview is required!"],
    },
    positionSummary: {
      type: String,
      required: [true, "Position summary is required!"],
    },
    keyResponsibilities: {
      type: String,
      required: [true, "Key responsibilities are required!"],
    },
    phoneNumber: {
      type: String,
      required: [true, "Phone number is required!"],
    },
    email: {
      type: String,
      required: [true, "Email is required!"],
      match: [/.+\@.+\..+/, "Please enter a valid email address"],
    },
    department: {
      type: String,
      required: [true, "Department is required!"],
    },
    postedOn: {
      type: Date,
      default: Date.now,
    },
    lastDate: {
      type: Date,
      required: [true, "Last date to apply is required!"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", jobSchema);