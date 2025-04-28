//store name , photo, department_id, qualification, experience, language , availability , bio 
// Here i will show the doctors profiles 
const mongoose = require("mongoose");

const doctorSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Doctor name is required!"],
    },
    doctorPhoto: {
      type: String, 
      required: false,                         //
    },
    doctor_id: {
      type: String,
      required: [true, "Doctor's ID is required!"],
    },
    qualification: {
      type: String,
      required: [true, "Doctor qualification is required!"],
    },
    experience: {
      type: String, 
      required: [true, "Experience detail is required!"],
    },
    language: {
      type: String, 
      required: [true, "Languages are required!"],
    },
    availability: {
      type: String, 
      required: [true, "Availability is required!"],
    },
    bio: {
      type: String,
      required: [true, "Bio is required!"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Doctor", doctorSchema);
