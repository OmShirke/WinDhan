const express = require("express");
const router = express.Router();
const User = require("../models/userModel");

// Optional: use authentication middleware like fetchAdmin or fetchUser
router.get("/allusers", async (req, res) => {
  try {
    const users = await User.find().select("-password"); // exclude passwords
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/updatebalance/:id", async (req, res) => {
  try {
    const { balance } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { balance },
      { new: true }
    );
    if (!updatedUser) return res.status(404).json({ error: "User not found" });
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// DELETE: Delete a user by ID
router.delete("/deleteuser/:id", async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "User not found" });
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});


module.exports = router;
