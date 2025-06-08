const express = require("express");
const router = express.Router();
const { order, getMultiplierPreview } = require("../controllers/order");
const isLoggedin = require("../middlewares/isLoggedin");

router.post("/", isLoggedin, order);
router.get("/preview-multiplier", getMultiplierPreview);

module.exports = router;
