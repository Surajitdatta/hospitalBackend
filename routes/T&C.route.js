const express = require("express");
const router = express.Router();
const TermsCondition = require("../models/t&c.model");

// POST - Create or update T&C
router.post("/", async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ message: "Text is required." });

    let terms = await TermsCondition.findOne();
    if (terms) {
      terms.text = text; // Update existing T&C text
      await terms.save();
    } else {
      terms = await TermsCondition.create({ text }); // Create new T&C if none exists
    }

    res.status(200).json({ message: "Terms & Conditions saved.", terms });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET - Fetch T&C
router.get("/", async (req, res) => {
  try {
    const terms = await TermsCondition.findOne();
    if (!terms) return res.status(404).json({ message: "No Terms & Conditions found." });
    res.status(200).json(terms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT - Admin can edit T&C
router.put("/", async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ message: "Text is required." });

    let terms = await TermsCondition.findOne();
    if (!terms) {
      return res.status(404).json({ message: "No Terms & Conditions found to update." });
    }

    terms.text = text; // Update the text
    await terms.save();

    res.status(200).json({ message: "Terms & Conditions updated.", terms });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
