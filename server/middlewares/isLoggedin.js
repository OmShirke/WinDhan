const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel.js");

const isLoggedin = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ success: false, message: "No token provided" });
    }

    const token = authHeader.split("Bearer ")[1];

    if (!token || token === "undefined" || token === "null") {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }

    const data = jwt.verify(token, "secret");
    const user = await userModel.findOne({ email: data.email });

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    } else if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token" });
    }

    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = isLoggedin;
