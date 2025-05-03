const express = require("express");
const router = express.Router();
const Department = require("../models/department.model");
const upload = require("../middlewares/multer"); // multer with memoryStorage
const uploadCloudinary = require("../utils/cloudinary"); // cloudinary uploader
const cloudinary = require("cloudinary").v2; // Cloudinary SDK

// 📌 Create department
router.post("/", upload.single("icon"), async (req, res) => {
  try {
    const { name, description } = req.body;
    let iconUrl = "";
    let iconPublicId = "";

    // Upload icon to Cloudinary if present
    if (req.file) {
      const result = await uploadCloudinary(req.file.buffer);
      iconUrl = result.secure_url;  // Store the image URL
      iconPublicId = result.public_id; // Store the Cloudinary public ID
    }

    // Create a new department in the database
    const department = await Department.create({
      name,
      description,
      icon: iconUrl,
      icon_public_id: iconPublicId, // Store the Cloudinary public ID
    });

    res.status(201).json({ message: "Department created!", department });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// 📌 Get all departments
router.get("/", async (req, res) => {
  try {
    const departments = await Department.find().sort({ createdAt: -1 });
    res.status(200).json(departments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 📌 Get one department
router.get("/:id", async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);
    if (!department) return res.status(404).json({ message: "Not found" });
    res.status(200).json(department);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 📌 Update department
router.put("/:id", upload.single("icon"), async (req, res) => {
  try {
    const { name, description } = req.body;
    const department = await Department.findById(req.params.id);
    if (!department) return res.status(404).json({ message: "Not found" });

    let iconUrl = department.icon; // Use old existing icon
    let iconPublicId = department.icon_public_id; // Store old Cloudinary public ID

    if (req.file) {
      // If a new icon is provided, delete the old one from Cloudinary
      if (iconPublicId) {
        await cloudinary.uploader.destroy(iconPublicId); // Delete the old image from Cloudinary
      }

      // Upload new icon to Cloudinary
      const result = await uploadCloudinary(req.file.buffer);
      iconUrl = result.secure_url; // Store the new image URL
      iconPublicId = result.public_id; // Store the new Cloudinary public ID
    }

    // Update department with new data
    department.name = name;
    department.description = description;
    department.icon = iconUrl;
    department.icon_public_id = iconPublicId; // Update the Cloudinary public ID

    await department.save();

    res.status(200).json({ message: "Department updated!", department });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// 📌 Delete department
router.delete("/:id", async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);
    if (!department) return res.status(404).json({ message: "Not found" });

    // Delete the icon image from Cloudinary if present
    if (department.icon_public_id) {
      await cloudinary.uploader.destroy(department.icon_public_id); // Delete the image from Cloudinary
    }

    // Delete the department from the database
    await Department.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Department deleted!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
