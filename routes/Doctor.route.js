const express = require("express");
const router = express.Router();
const Doctor = require("../models/doctor.model");
const upload = require("../middlewares/multer"); // memoryStorage multer
const uploadCloudinary = require("../utils/cloudinary"); // buffer uploader
const cloudinary = require("cloudinary").v2;

// 📌 Create a new doctor
router.post("/", upload.single("doctorPhoto"), async (req, res) => {
  try {
    const {
      name,
      doctor_id,
      qualification,
      experience,
      language,
      availability,
      bio
    } = req.body;

    let doctorPhotoUrl = "";

    // Upload image to Cloudinary if provided
    if (req.file) {
      const result = await uploadCloudinary(req.file.buffer);
      doctorPhotoUrl = result.secure_url;
    }

    const doctor = await Doctor.create({
      name,
      doctorPhoto: doctorPhotoUrl,
      doctor_id,
      qualification,
      experience,
      language,
      availability,
      bio
    });

    res.status(201).json({ message: "Doctor profile created!", doctor });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// 📌 Get all doctors
router.get("/", async (req, res) => {
  try {
    const doctors = await Doctor.find().sort({ createdAt: -1 });
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 📌 Get doctor by ID
router.get("/:id", async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });
    res.status(200).json(doctor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 📌 Update doctor
router.put("/:id", upload.single("doctorPhoto"), async (req, res) => {
  try {
    const {
      name,
      doctor_id,
      qualification,
      experience,
      language,
      availability,
      bio
    } = req.body;

    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });

    let doctorPhotoUrl = doctor.doctorPhoto; // fallback to old photo

    if (req.file) {
      const result = await uploadCloudinary(req.file.buffer);
      doctorPhotoUrl = result.secure_url;
    }

    doctor.name = name;
    doctor.doctor_id = doctor_id;
    doctor.qualification = qualification;
    doctor.experience = experience;
    doctor.language = language
    doctor.availability = availability;
    doctor.bio = bio;
    doctor.doctorPhoto = doctorPhotoUrl;

    await doctor.save();

    res.status(200).json({ message: "Doctor profile updated!", doctor });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});


// 📌 Delete doctor
router.delete("/:id", async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndDelete(req.params.id);
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });

    // Delete image from Cloudinary if it exists
    if (doctor.doctorPhoto) {
      const publicId = doctor.doctorPhoto.split("/").slice(-1)[0].split(".")[0];
      await cloudinary.uploader.destroy(`departments/${publicId}`);
    }

    res.status(200).json({ message: "Doctor profile deleted!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
