const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: true,
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  amount: { type: Number, required: true },
  outcome: { type: String, enum: ["yes", "no"], required: true },
  createdAt: { type: Date, default: Date.now },
});

const orderModel = mongoose.model("order", orderSchema);
module.exports = orderModel;
