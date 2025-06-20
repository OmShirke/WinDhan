const orderModel = require("../models/orderModel");
const orderBookModel = require("../models/orderBookmodel");
const eventModel = require("../models/eventModel");
const userModel = require("../models/userModel");

async function matchOrder(newOrder, orderbook) {
  const oppositeBook = newOrder.option === "yes" ? orderbook.no : orderbook.yes;

  let match = "no-match";

  // Since you removed price, this matching logic may need rethinking,
  // but I'll keep a simple match on user_id difference and amount.
  for (let i = 0; i < oppositeBook.length; i++) {
    const order = oppositeBook[i];
    const newOrder_userId = JSON.stringify(newOrder.user_id);
    const order_UserId = JSON.stringify(order.user_id);
    const stringCompare = await newOrder_userId.localeCompare(order_UserId);

    // Example matching condition: opposite option and different users
    if (stringCompare !== 0) {
      if (newOrder.amount < order.amount) {
        order.amount -= newOrder.amount;
        await order.save();
        match = "full-match";
      } else if (newOrder.amount > order.amount) {
        newOrder.amount -= order.amount;
        await newOrder.save();
        oppositeBook.splice(i, 1);
        await orderbook.save();
        match = "half-match";
      } else if (newOrder.amount === order.amount) {
        await newOrder.save();
        oppositeBook.splice(i, 1);
        await orderbook.save();
        match = "full-match";
      }
      break;
    }
  }
  return match;
}

const placeOrder = async (newOrder) => {
  try {
    let orderbook = await orderBookModel.findOne({ event: newOrder.event._id });

    // If no orderbook for this event, create one
    if (!orderbook) {
      orderbook = new orderBookModel({
        event: newOrder.event._id,
        yes: [],
        no: [],
      });
    }

    // Call your matchOrder function, make sure it returns "full-match", "half-match", or "no-match"
    const match = await matchOrder(newOrder, orderbook);

    if (match === "full-match") {
      console.log("order-executed");
      // Handle fully matched order logic if needed
    } else if (match === "half-match" || match === "no-match") {
      if (newOrder.option === "yes") {
        orderbook.yes.push(newOrder._id); // Push just the order ID
      } else {
        orderbook.no.push(newOrder._id);
      }
      await orderbook.save();
    }
  } catch (error) {
    console.error("Error in placeOrder:", error);
    throw error; // rethrow if you want to handle this higher up
  }
};

const order = async (req, res, next) => {
  try {
    const user = req.user;
    const { option, amount, event } = req.body;

    if (!option || !amount || !event) {
      return res.status(400).json({ error: "Incomplete input" });
    }

    const amt = parseFloat(amount);

    // Fetch full user doc from DB to update balance
    const fullUser = await userModel.findById(user._id);
    if (!fullUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if user has enough balance
    if (fullUser.balance < amt) {
      return res.status(400).json({ error: "Insufficient balance" });
    }

    // Deduct balance
    fullUser.balance -= amt;
    await fullUser.save();

    const existing_event = await eventModel.findById(event._id || event);
    if (!existing_event) {
      return res.status(404).json({ error: "Event not found" });
    }

    const newOrder = await orderModel.create({
      option,
      amount,
      event: existing_event._id,
      user_id: user._id,
    });

    let orderbook = await orderBookModel.findOne({ event: existing_event._id });

    if (!orderbook) {
      if (newOrder.option === "yes") {
        orderbook = await orderBookModel.create({
          event: newOrder.event,
          yes: [newOrder],
        });
      } else {
        orderbook = await orderBookModel.create({
          event: newOrder.event,
          no: [newOrder],
        });
      }
    } else {
      if (newOrder.option === "yes") {
        orderbook.yes.push(newOrder);
      } else {
        orderbook.no.push(newOrder);
      }
      await orderbook.save();
    }

    await placeOrder(newOrder);

    if (option === "yes") {
      existing_event.yes += amt;
    } else {
      existing_event.no += amt;
    }

    await existing_event.save();

    res.status(201).json({ msg: "success" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getMultiplierPreview = async (req, res) => {
  try {
    const { eventId, option, amount } = req.query;

    if (!eventId || !option || !amount) {
      return res.status(400).json({ error: "Missing query params" });
    }

    const event = await eventModel.findById(eventId);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    const yesAmount = event.yes || 0;
    const noAmount = event.no || 0;
    const total = yesAmount + noAmount;
    const userAmount = parseFloat(amount);

    let previewYes, previewNo;

    if (option === "yes") {
      previewYes = (total + userAmount) / (yesAmount + userAmount || 1);
      previewNo = (total + userAmount) / (noAmount || 1);
    } else {
      previewYes = (total + userAmount) / (yesAmount || 1);
      previewNo = (total + userAmount) / (noAmount + userAmount || 1);
    }

    res.json({
      multiplier: {
        yes: previewYes.toFixed(2),
        no: previewNo.toFixed(2),
      },
    });
  } catch (error) {
    console.error("Error in getMultiplierPreview:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  order,
  getMultiplierPreview,
};
