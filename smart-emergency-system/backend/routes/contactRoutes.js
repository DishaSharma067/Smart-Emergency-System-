const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");

router.post("/add", async (req, res) => {
  try {
    const { userId, name, phone } = req.body;

    const contact = await Contact.create({
      userId,
      name,
      phone
    });

    res.json({
      success: true,
      contact
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;