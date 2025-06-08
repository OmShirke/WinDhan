const express = require("express");
const router = express.Router();

const {
  getAllDepositRequests,
  postDepositRequests,
  approveOrRejectDepositRequest,
  postWithdrawRequests,
  getAllWithdrawRequests,
  approveOrRejectWithdrawRequest
} = require("../controllers/depositController");

const authMiddleware = require("../middlewares/isLoggedin.js");

// Deposit Routes
router.get("/get-deposit-requests", authMiddleware, getAllDepositRequests);
router.post("/post-deposit-requests", authMiddleware, postDepositRequests);
router.put("/approve-request/:id/:action", approveOrRejectDepositRequest);

// Withdraw Routes
router.post("/post-withdraw-requests", authMiddleware, postWithdrawRequests);
router.get("/get-withdraw-requests", authMiddleware, getAllWithdrawRequests);
router.put("/approve-withdraw-request/:id/:action", authMiddleware, approveOrRejectWithdrawRequest);

module.exports = router;
