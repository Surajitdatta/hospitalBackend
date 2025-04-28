//id, title, description, img, date, type(news/event)
const mongoose = require("mongoose");

const newsEventSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required!"],
    },
    description: {
      type: String,
      required: [true, "Description is required!"],
    },
    img: {
      type: String, 
      required: [true, "Image is required!"],
    },
    date: {
      type: Date,
      required: [true, "Date is required!"],
    },
    type: {
      type: String,
      enum: ["news", "event"],
      required: [true, "Type (news/event) is required!"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("NewsEvent", newsEventSchema);
