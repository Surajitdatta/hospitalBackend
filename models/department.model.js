// id , name , description, image/icon
// Here i can control which service i will give . means 
// which service i will give in hospital , can put admin..hahaha
const mongoose = require("mongoose");

const departmentSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Department name is required!"],
    },
    description: {
      type: String,
      required: [true, "Department description is required!"],
    },
    icon: {
      type: String, // can be a URL or path to the icon/image
      required: false
    //   required: [true, "Department icon/image is required!"],
    },
  },
  { timestamps: true }
);



const Department = mongoose.model("Department", departmentSchema)

module.exports = Department
