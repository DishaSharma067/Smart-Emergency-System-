const sendSMS = require("../utils/sendSMS");
const User = require("../models/User");

exports.triggerSOS = async (req, res) => {
  try {
    const { userId, latitude, longitude } = req.body;

    // 🔍 Debug (optional)
    console.log("REQ BODY:", req.body);

    // ❗ check missing fields
    if (!userId || !latitude || !longitude) {
      return res.status(400).json({ message: "All fields required" });
    }

    // 🔎 find user
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const contacts = user.emergencyContacts || [];

    if (contacts.length === 0) {
      return res.json({ message: "No contacts found" });
    }

    // ✅ MESSAGE DEFINE (IMPORTANT)
    const message = `🚨 EMERGENCY ALERT!
Location: https://maps.google.com/?q=${latitude},${longitude}`;

    // 🔁 LOOP (alert loop)
    for (let contact of contacts) {
      await sendSMS(contact.phone, message);
    }

    res.json({
      message: "SOS sent with SMS 🚨",
      contactsNotified: contacts.length
    });

  } catch (error) {
    console.error("SOS ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};