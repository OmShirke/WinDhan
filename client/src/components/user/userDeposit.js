// src/components/userDeposit.js
import React, { useState } from "react";

const UserDeposit = ({ onClose, onDeposit }) => {
  const [amount, setAmount] = useState("");
  const [transactionId, setTransactionId] = useState(""); // Added

  const handleDeposit = async () => {
    const token = localStorage.getItem("token");
    if (!token) return alert("Not authenticated");

    const res = await fetch("http://localhost:5000/api/deposits/post-deposit-requests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
      body: JSON.stringify({
        transactionId,
        amount,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Deposit request sent");
      onDeposit(); // Refresh profile or data
      onClose();   // Close modal
    } else {
      alert(data.error || "Deposit request failed");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-gray-900 border border-cyan-700 rounded-xl p-6 shadow-lg w-80 text-center text-gray-200">
        <h2 className="text-xl font-semibold mb-4 text-cyan-400">Deposit Funds</h2>

        {/* Transaction ID Input */}
        <input
          type="text"
          placeholder="Transaction ID"
          value={transactionId}
          onChange={(e) => setTransactionId(e.target.value)}
          className="w-full px-3 py-2 mb-4 rounded bg-gray-800 border border-cyan-500 text-white focus:outline-none"
        />

        {/* Amount Input */}
        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full px-3 py-2 mb-4 rounded bg-gray-800 border border-cyan-500 text-white focus:outline-none"
        />

        <div className="flex justify-between gap-4">
          <button
            onClick={handleDeposit}
            className="flex-1 bg-cyan-600 hover:bg-cyan-500 text-black font-semibold py-2 rounded"
          >
            Deposit
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDeposit;
