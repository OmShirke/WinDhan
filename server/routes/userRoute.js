const express = require("express");
const userModel = require("../models/userModel.js");
const isLoggedin = require("../middlewares/isLoggedin.js");

const router = express.Router();

router.get("/profile", isLoggedin, async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id).select("-password");
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch profile" });
  }
});

module.exports = router;
