const User = require("../models/User");

// Add emergency contact
exports.addContact = async (req, res) => {
  try {
    const { userId, name, phone } = req.body;

    if (!userId || !name || !phone) {
      return res.status(400).json({ message: "All fields required" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.emergencyContacts.push({ name, phone });
    await user.save();

    res.json({
      message: "Contact added ✅",
      contacts: user.emergencyContacts
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
