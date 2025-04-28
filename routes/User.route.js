const express = require("express");
const router = express.Router();
const User = require("../models/userSchema.model");
const upload = require("../middlewares/multer");
const uploadCloudinary = require("../utils/cloudinary");

// 📌 Create a new user with photo
router.post("/", upload.single("photo"), async (req, res) => {
  try {
    const { name, gender, dob, email, phone, address } = req.body;

    let userPhotoUrl = "";

    // Upload photo to Cloudinary if provided
    if (req.file?.path) {
      userPhotoUrl = await uploadCloudinary(req.file.path);
    }

    const user = await User.create({
      name,
      gender,
      dob,
      email,
      phone,
      photo: userPhotoUrl,  // Store Cloudinary URL for the user photo
      address,
    });

    res.status(201).json({ message: "User created successfully!", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 📌 Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 📌 Get a single user by ID
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 📌 Update user by ID with optional photo update
router.put("/:id", upload.single("photo"), async (req, res) => {
  try {
    const { name, gender, dob, email, phone, address } = req.body;

    let userPhotoUrl = req.body.photo;  // fallback to old photo URL if no new photo uploaded

    // If new photo uploaded, update the photo URL
    if (req.file?.path) {
      userPhotoUrl = await uploadCloudinary(req.file.path);
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        name,
        gender,
        dob,
        email,
        phone,
        photo: userPhotoUrl,  // Update photo URL in the database
        address,
      },
      { new: true }
    );

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "User updated successfully!", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 📌 Delete a user by ID and remove the photo from Cloudinary
router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // If user has a photo, delete it from Cloudinary
    if (user.photo) {
      const publicId = user.photo.split("/").slice(-1)[0].split(".")[0];
      await cloudinary.uploader.destroy(`users/${publicId}`);  // Use the correct folder name
    }

    res.status(200).json({ message: "User deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
