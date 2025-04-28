// id, name ,email, subject , msg , date 
const mongoose = require("mongoose");

const contactSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required!"],
    },
    email: {
      type: String,
      required: [true, "Email is required!"],
    },
    subject: {
      type: String,
      required: [true, "Subject is required!"],
    },
    msg: {
      type: String,
      required: [true, "Message is required!"],
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contact", contactSchema);
