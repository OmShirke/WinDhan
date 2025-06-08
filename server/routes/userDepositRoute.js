const express = require("express");
const router = express.Router();

const {
  getAllDepositRequests,
  postDepositRequests,
  approveOrRejectDepositRequest,
  postWithdrawRequests,
  getAllWithdrawRequests,
  approveOrRejectWithdrawRequest,
  getUserApprovedDeposits,     // ✅ added
  getUserApprovedWithdraws     // ✅ added
} = require("../controllers/depositController");

const authMiddleware = require("../middlewares/isLoggedin.js");

// ──────────────────────────────
// Deposit Routes
// ──────────────────────────────
router.get("/get-deposit-requests", authMiddleware, getAllDepositRequests);
router.post("/post-deposit-requests", authMiddleware, postDepositRequests);
router.put("/approve-request/:id/:action", authMiddleware, approveOrRejectDepositRequest);

// ✅ Get user’s approved deposits
router.get("/user-approved-deposits", authMiddleware, getUserApprovedDeposits);

// ──────────────────────────────
// Withdraw Routes
// ──────────────────────────────
router.post("/post-withdraw-requests", authMiddleware, postWithdrawRequests);
router.get("/get-withdraw-requests", authMiddleware, getAllWithdrawRequests);
router.put("/approve-withdraw-request/:id/:action", authMiddleware, approveOrRejectWithdrawRequest);

// ✅ Get user’s approved withdraws
router.get("/user-approved-withdraws", authMiddleware, getUserApprovedWithdraws);

module.exports = router;
