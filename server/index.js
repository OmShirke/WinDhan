const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookies = require("cookie-parser");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connection established"))
  .catch((err) => console.error("MongoDB connection error:", err));

const db = mongoose.connection;
db.on("error", (err) => console.error("MongoDB connection error:", err));
db.once("open", () => console.log("MongoDB is connected"));

// Middleware
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(cookies());
app.use(bodyParser.json());
app.use(express.json());
app.use("/api/admin", require("./routes/adminroute.js"));
app.use("/api/deposits", require("./routes/userDepositRoute.js"));
app.use("/api/delete-event", require("./routes/eventRoute.js"));



// Routes
const authRoute = require("./routes/authRoute.js");
const eventRoute = require("./routes/eventRoute.js");
const orderRoute = require("./routes/orderRoute.js");
const orderbookRoute = require("./routes/orderbookRoute.js");
const userRoute = require("./routes/userRoute.js");
const walletRoute = require("./routes/walletRoute");

app.use("/worker/event", eventRoute);
app.use("/events/order", orderRoute);
app.use("/events/orderbook", orderbookRoute);
app.use("/api/auth", authRoute);
app.use("/user", authRoute);
app.use("/api/user", userRoute);
app.use("/api/wallet", walletRoute);

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server listening on port", PORT);
});
