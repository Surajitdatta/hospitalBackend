const express = require("express");
const router = express.Router();
const Department = require("../models/department.model");
const upload = require("../middlewares/multer"); // multer with memoryStorage
const uploadCloudinary = require("../utils/cloudinary"); // cloudinary uploader

// 📌 Create department
router.post("/", upload.single("icon"), async (req, res) => {
  try {
    const { name, description } = req.body;
    let iconUrl = "";

    // Upload buffer to Cloudinary
    if (req.file) {
      const result = await uploadCloudinary(req.file.buffer);
      iconUrl = result.secure_url; // now we correctly get the url
    }

    const department = await Department.create({
      name,
      description,
      icon: iconUrl,
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

    if (req.file) {
      const result = await uploadCloudinary(req.file.buffer);
      iconUrl = result.secure_url;
    }

    department.name = name;
    department.description = description;
    department.icon = iconUrl;

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
    const department = await Department.findByIdAndDelete(req.params.id);
    if (!department) return res.status(404).json({ message: "Not found" });

    res.status(200).json({ message: "Department deleted!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
