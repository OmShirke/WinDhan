import React, { useState } from "react";

const UserWithdraw = ({ onClose, onWithdraw, balance }) => {
  const [amount, setAmount] = useState("");

  const handleSubmit = async () => {
    const withdrawAmount = parseFloat(amount);

    if (!withdrawAmount || withdrawAmount <= 0) {
      alert("Enter a valid amount");
      return;
    }

    if (withdrawAmount > balance) {
      alert("Insufficient balance");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:4008/api/deposits/post-withdraw-requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
        body: JSON.stringify({ amount: withdrawAmount }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Withdrawal request submitted");
        onWithdraw();
        onClose();
      } else {
        alert(data.error || "Withdrawal failed");
      }
    } catch (err) {
      console.error("Withdraw error:", err);
      alert("Server error");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center px-4 m-w-[70vw]">
      <div className="bg-gray-900 p-5 sm:p-6 rounded-lg w-[70vw] max-w-sm border border-cyan-700 shadow-lg shadow-cyan-900/40">
        <h2 className="text-lg font-semibold text-cyan-400 mb-4 text-center">Withdraw Funds</h2>

        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full mb-4 px-3 py-2 rounded bg-gray-800 text-gray-200 border border-gray-700 focus:outline-none focus:ring-1 focus:ring-cyan-400 text-sm"
        />

        <div className="flex flex-col sm:flex-row justify-end gap-3">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-3 py-2 bg-gray-700 hover:bg-gray-600 text-sm rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="w-full sm:w-auto px-3 py-2 bg-yellow-400 text-black font-semibold text-sm rounded hover:bg-yellow-300"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserWithdraw;
