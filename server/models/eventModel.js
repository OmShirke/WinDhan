const mongoose = require("mongoose");

const eventSchema = mongoose.Schema({
  title: { type: String },
  yes: { type: Number, default: 0 },
  no: { type: Number, default: 0 },
  startTime: { type: String },
  endTime: { type: String },
  filedata: { type: Buffer },
  totalAmount: { type: Number, default: 0 },
  closed: { type: Boolean, default: false }, // new
  outcome: { type: String, enum: ["yes", "no", null], default: null }, // new
});

const eventModel = mongoose.model("event", eventSchema);
module.exports = eventModel;
