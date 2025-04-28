const express = require("express");
const router = express.Router();
const NewsEvent = require("../models/newsEvent.model");
const upload = require("../middlewares/multer");
const uploadCloudinary = require("../utils/cloudinary");
const cloudinary = require("cloudinary").v2;

// 📌 Create a news/event post with image
router.post("/", upload.single("img"), async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const { title, description, date, type } = req.body;

    if (!title || !description || !date || !type) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    let imgUrl = "";
    if (req.file?.buffer) {
      const uploadResult = await uploadCloudinary(req.file.buffer);
      imgUrl = uploadResult.secure_url;
    } else {
      return res.status(400).json({ message: "Image is required!" });
    }

    console.log("Image URL:", imgUrl);

    const post = await NewsEvent.create({
      title,
      description,
      img: imgUrl,
      date,
      type,
    });

    res.status(201).json({ message: "News/Event created successfully!", post });
  } catch (error) {
    console.error("Error during POST /:", error);
    res.status(500).json({ message: error.message });
  }
});

// 📌 Get all news/events
router.get("/", async (req, res) => {
  try {
    const posts = await NewsEvent.find().sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 📌 Get single post by ID
router.get("/:id", async (req, res) => {
  try {
    const post = await NewsEvent.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Not found" });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 📌 Update a post (with optional image change)
router.put("/:id", upload.single("img"), async (req, res) => {
  try {
    const { title, description, date, type } = req.body;

    let imgUrl = req.body.img; // default old image URL

    if (req.file?.buffer) {
      const uploadResult = await uploadCloudinary(req.file.buffer);
      imgUrl = uploadResult.secure_url;
    }

    const post = await NewsEvent.findByIdAndUpdate(
      req.params.id,
      { title, description, img: imgUrl, date, type },
      { new: true }
    );

    if (!post) return res.status(404).json({ message: "Not found" });

    res.status(200).json({ message: "News/Event updated successfully!", post });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 📌 Delete a post and image from Cloudinary
router.delete("/:id", async (req, res) => {
  try {
    const post = await NewsEvent.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ message: "Not found" });

    // Delete image from Cloudinary
    if (post.img) {
      const publicId = post.img.split("/").slice(-1)[0].split(".")[0];
      await cloudinary.uploader.destroy(publicId);
    }

    res.status(200).json({ message: "News/Event deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
