const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String },
  password: { type: String, required: true },
  role: { type: String, default: "user" },
  balance: { type: Number, default: 0 }, // Add wallet balance
  orders: [
    {
      eventId: mongoose.Schema.Types.ObjectId, // Reference to event
      amount: Number,
      outcome: String, // "win" or "lose"
      createdAt: { type: Date, default: Date.now },
    },
  ],
});

const userModel = mongoose.model("user", userSchema);
module.exports = userModel;
