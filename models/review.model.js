// id , pation name, comment, taying, date, status(approved/pending)

const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema(
  {
    patientName: {
      type: String,
      required: [true, "Patient name is required!"],
    },
    comment: {
      type: String,
      required: [true, "Comment is required!"],
    },
    rating: {
      type: Number, 
      min: 1,
      max: 5,
      required: [true, "Rating is required!"],
    },
    date: {
      type: Date,
      default: Date.now,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", reviewSchema);
