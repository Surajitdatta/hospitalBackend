const express = require("express");
const router = express.Router();
const NewsEvent = require("../models/newsEvent.model");
const upload = require("../middlewares/multer");
const uploadCloudinary = require("../utils/cloudinary");
const cloudinary = require("cloudinary").v2;

// 📌 Create news/event
router.post("/", upload.single("img"), async (req, res) => {
  try {
    const { title, description, date, type } = req.body;

    if (!title || !description || !date || !type) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    if (!req.file?.buffer) {
      return res.status(400).json({ message: "Image is required!" });
    }

    const uploadResult = await uploadCloudinary(req.file.buffer);
    const imgUrl = uploadResult.secure_url;
    const public_id = uploadResult.public_id;

    const post = await NewsEvent.create({
      title,
      description,
      img: imgUrl,
      public_id,
      date,
      type,
    });

    res.status(201).json({ message: "News/Event created!", post });
  } catch (error) {
    console.error("Create error:", error);
    res.status(500).json({ message: error.message });
  }
});

// 📌 Get all
router.get("/", async (req, res) => {
  try {
    const posts = await NewsEvent.find().sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 📌 Get one
router.get("/:id", async (req, res) => {
  try {
    const post = await NewsEvent.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Not found" });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 📌 Update
router.put("/:id", upload.single("img"), async (req, res) => {
  try {
    const { title, description, date, type } = req.body;

    const post = await NewsEvent.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Not found" });

    let imgUrl = post.img;
    let public_id = post.public_id;

    // If new image provided, delete old image and upload new
    if (req.file?.buffer) {
      if (public_id) {
        await cloudinary.uploader.destroy(public_id);
      }
      const uploadResult = await uploadCloudinary(req.file.buffer);
      imgUrl = uploadResult.secure_url;
      public_id = uploadResult.public_id;
    }

    post.title = title;
    post.description = description;
    post.date = date;
    post.type = type;
    post.img = imgUrl;
    post.public_id = public_id;

    await post.save();

    res.status(200).json({ message: "Updated successfully!", post });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 📌 Delete
// 📌 Delete
router.delete("/:id", async (req, res) => {
  try {
    const post = await NewsEvent.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Department not found" });
    }

    // Check and destroy image from Cloudinary if it exists
    if (post.public_id) {
      console.log("Deleting from Cloudinary:", post.public_id);
      const result = await cloudinary.uploader.destroy(post.public_id);
      console.log("Cloudinary delete result:", result);
    }

    await NewsEvent.findByIdAndDelete(req.params.id);
    res.status(200).json("Post has been deleted");
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json(err);
  }
});


module.exports = router;
