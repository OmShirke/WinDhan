const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const Event = require("../models/eventModel");
const Order = require("../models/orderModel");

// Fetch all users
router.get("/allusers", async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update or increment user balance
router.put("/updatebalance/:id", async (req, res) => {
  try {
    const { balance, increment } = req.body;
    let update = {};

    if (typeof increment === "number") {
      update = { $inc: { balance: increment } };
    } else if (typeof balance === "number") {
      update = { balance };
    } else {
      return res
        .status(400)
        .json({ error: "Provide 'balance' or 'increment'" });
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, update, {
      new: true,
    });

    if (!updatedUser) return res.status(404).json({ error: "User not found" });

    res.json(updatedUser);
  } catch (err) {
    console.error("Error updating balance:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Delete user by ID
router.delete("/deleteuser/:id", async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "User not found" });
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Close event and process winning payouts
router.put("/close-event/:id", async (req, res) => {
  try {
    const eventId = req.params.id;
    const { outcome } = req.body; // outcome: "yes" or "no"

    if (!["yes", "no"].includes(outcome)) {
      return res.status(400).json({ error: "Invalid outcome" });
    }

    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ error: "Event not found" });

    if (event.closed) {
      return res.status(400).json({ error: "Event already closed" });
    }

    const winningOrders = await Order.find({ event: eventId, option: outcome });

    for (const order of winningOrders) {
      const payout = order.amount * (order.multiplierAtPlacement || 1);

      await User.findByIdAndUpdate(order.user_id, {
        $inc: { balance: payout },
      });
    }

    event.closed = true;
    event.outcome = outcome;
    await event.save();

    res.json({
      message: "Event closed and payouts processed",
      payouts: winningOrders.length,
    });
  } catch (error) {
    console.error("Error closing event:", error);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/open-events", async (req, res) => {
  try {
    // Assuming you add a `closed` boolean field to mark if event is closed
    const openEvents = await Event.find({ closed: { $ne: true } });
    res.json(openEvents);
  } catch (error) {
    console.error("Error fetching open events:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
