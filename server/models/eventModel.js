const mongoose = require("mongoose");

const eventSchema = mongoose.Schema({
  title: { type: String },
  yes: { type: Number, default: 0 },
  no: { type: Number, default: 0 },
  startTime: { type: String },
  endTime: { type: String },
  filedata: { type: Buffer },
  totalAmount: { type: Number, default: 0 },
});

const eventModel = mongoose.model("event", eventSchema);
module.exports = eventModel;
