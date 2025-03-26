const express = require("express");
const router = express.Router();

const Auth = require("../controllers/auth.js");
const getUser = require("../controllers/user.js");
const isLoggedin = require("../middlewares/isLoggedin.js");
router.route("/login").post(Auth.login);
router.route("/signup").post(Auth.signup);
router.route("/").get(isLoggedin, getUser);

router.get("/test", (req, res) => {
  res.json({ message: "Auth route is working!" });
});

module.exports = router;
