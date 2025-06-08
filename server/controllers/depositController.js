const Deposit = require("../models/userDepositModel.js");
const Withdraw = require("../models/userWithdrawModel.js");
const User = require("../models/userModel.js");

// ──────────────────────────────
// Deposit Controllers
// ──────────────────────────────

// Get all pending deposit requests (admin)
const getAllDepositRequests = async (req, res) => {
  try {
    const deposits = await Deposit.find({ status: "pending" }).populate("userId");
    res.status(200).json(deposits);
  } catch (error) {
    console.error("Error in getAllDepositRequests:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Submit deposit request (user)
const postDepositRequests = async (req, res) => {
  try {
    const { transactionId, amount } = req.body;
    const userId = req.user._id;

    if (!transactionId || !amount) {
      return res.status(400).json({ error: "Transaction ID and amount are required" });
    }

    const newDeposit = new Deposit({
      userId,
      transactionId,
      amount,
      status: "pending",
    });

    await newDeposit.save();

    res.status(201).json({ message: "Deposit request submitted successfully" });
  } catch (error) {
    console.error("Error in postDepositRequests:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Approve/reject deposit request (admin)
const approveOrRejectDepositRequest = async (req, res) => {
  try {
    const { id, action } = req.params;

    if (!["approve", "reject"].includes(action)) {
      return res.status(400).json({ error: "Invalid action. Use 'approve' or 'reject'." });
    }

    const deposit = await Deposit.findById(id);
    if (!deposit) {
      return res.status(404).json({ error: "Deposit request not found" });
    }

    if (deposit.status !== "pending") {
      return res.status(400).json({ error: "Deposit request already processed" });
    }

    deposit.status = action === "approve" ? "approved" : "rejected";
    await deposit.save();

    if (action === "approve") {
      const user = await User.findById(deposit.userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      user.balance = (user.balance || 0) + deposit.amount;
      await user.save();
    }

    res.status(200).json({ message: `Deposit ${action}d successfully` });
  } catch (error) {
    console.error("Error in approveOrRejectDepositRequest:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// ──────────────────────────────
// Withdraw Controllers
// ──────────────────────────────

// Submit withdraw request (user)
const postWithdrawRequests = async (req, res) => {
  try {
    const { amount } = req.body;
    const userId = req.user._id;

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: "A valid amount is required" });
    }

    const user = await User.findById(userId);
    if (!user || user.balance < amount) {
      return res.status(400).json({ error: "Insufficient balance" });
    }

    const newWithdraw = new Withdraw({
      userId,
      amount,
      status: "pending",
    });

    await newWithdraw.save();

    res.status(201).json({ message: "Withdraw request submitted successfully" });
  } catch (error) {
    console.error("Error in postWithdrawRequests:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Get all pending withdraw requests (admin)
const getAllWithdrawRequests = async (req, res) => {
  try {
    const withdraws = await Withdraw.find({ status: "pending" }).populate("userId");
    res.status(200).json(withdraws);
  } catch (error) {
    console.error("Error in getAllWithdrawRequests:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Approve/reject withdraw request (admin)
const approveOrRejectWithdrawRequest = async (req, res) => {
  try {
    const { id, action } = req.params;

    if (!["approve", "reject"].includes(action)) {
      return res.status(400).json({ error: "Invalid action. Use 'approve' or 'reject'." });
    }

    const withdraw = await Withdraw.findById(id);
    if (!withdraw) {
      return res.status(404).json({ error: "Withdraw request not found" });
    }

    if (withdraw.status !== "pending") {
      return res.status(400).json({ error: "Withdraw request already processed" });
    }

    const user = await User.findById(withdraw.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (action === "approve") {
      if (user.balance < withdraw.amount) {
        return res.status(400).json({ error: "User has insufficient balance" });
      }

      user.balance -= withdraw.amount;
      await user.save();
    }

    withdraw.status = action === "approve" ? "approved" : "rejected";
    await withdraw.save();

    res.status(200).json({ message: `Withdraw ${action}d successfully` });
  } catch (error) {
    console.error("Error in approveOrRejectWithdrawRequest:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// ──────────────────────────────
module.exports = {
  getAllDepositRequests,
  postDepositRequests,
  approveOrRejectDepositRequest,
  postWithdrawRequests,
  getAllWithdrawRequests,
  approveOrRejectWithdrawRequest,
};
