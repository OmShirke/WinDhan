const orderBookModel = require("../models/orderBookmodel");

const orderbook = async (req, res, next) => {
  try {
    const { event } = req.body;
    const ob = await orderBookModel.findOne({ event: event._id });

    let yes_copy = [];
    let no_copy = [];

    if (ob) {
      yes_copy = ob.yes.map((entry) => ({
        user: entry.user,
        amount: entry.amount,
        timestamp: entry.timestamp,
      }));

      no_copy = ob.no.map((entry) => ({
        user: entry.user,
        amount: entry.amount,
        timestamp: entry.timestamp,
      }));
    }

    return res.status(200).json({ yes_copy, no_copy });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = orderbook;
