const express = require("express");
const Wallet = require("../models/walletModel");
const isLoggedin = require("../middlewares/isLoggedin");
const router = express.Router();

// Get Wallet Balance
router.get("/", isLoggedin, async (req, res) => {
  try {
    let wallet = await Wallet.findOne({ userId: req.user._id });
    if (!wallet) {
      wallet = await Wallet.create({ userId: req.user._id, balance: 0 });
    }
    res.json({ success: true, balance: wallet.balance });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Manually Deposit Money (Admin Only)
router.post("/deposit", isLoggedin, async (req, res) => {
  if (req.user.role !== "admin")
    return res.status(403).json({ success: false, message: "Unauthorized" });

  const { userId, amount } = req.body;
  if (!userId || amount <= 0)
    return res.status(400).json({ success: false, message: "Invalid request" });

  let wallet = await Wallet.findOne({ userId });
  if (!wallet) wallet = await Wallet.create({ userId, balance: 0 });

  wallet.balance += amount;
  await wallet.save();
  res.json({
    success: true,
    message: "Deposit successful",
    balance: wallet.balance,
  });
});

// Place Bet (Deduct Balance)
router.post("/bet", isLoggedin, async (req, res) => {
  const { amount } = req.body;
  if (amount <= 0)
    return res.status(400).json({ success: false, message: "Invalid amount" });

  let wallet = await Wallet.findOne({ userId: req.user._id });
  if (!wallet || wallet.balance < amount)
    return res
      .status(400)
      .json({ success: false, message: "Insufficient balance" });

  wallet.balance -= amount;
  await wallet.save();
  res.json({ success: true, message: "Bet placed", balance: wallet.balance });
});

// Withdraw Request (Admin Manual Processing)
router.post("/withdraw", isLoggedin, async (req, res) => {
  const { amount } = req.body;
  if (amount <= 0)
    return res.status(400).json({ success: false, message: "Invalid amount" });

  let wallet = await Wallet.findOne({ userId: req.user._id });
  if (!wallet || wallet.balance < amount)
    return res
      .status(400)
      .json({ success: false, message: "Insufficient balance" });

  // Admin manually verifies and sends money via UPI
  wallet.balance -= amount;
  await wallet.save();
  res.json({
    success: true,
    message: "Withdrawal request sent",
    balance: wallet.balance,
  });
});

module.exports = router;
