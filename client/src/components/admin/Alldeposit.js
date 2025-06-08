// src/components/UserDepositRequests.js
import React, { useEffect, useState } from "react";

const UserDepositRequests = () => {
    const [requests, setRequests] = useState([]);

    const fetchRequests = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await fetch("http://localhost:5000/api/deposits/get-deposit-requests", {
                headers: {
                    Authorization: `Bearer ${JSON.parse(token)}`,
                },
            });

            const data = await res.json();
            setRequests(data);
        } catch (err) {
            console.error("Error fetching deposit requests:", err);
        }
    };

    const handleAction = async (id, action) => {
        try {
            const token = localStorage.getItem("token");

            const res = await fetch(`http://localhost:5000/api/deposits/approve-request/${id}/${action}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${JSON.parse(token)}`,
                },
            });

            const data = await res.json();
            if (res.ok) {
                alert(`Deposit ${action}ed successfully`);
                fetchRequests(); // Refresh the list
            } else {
                alert(data.error || "Action failed");
            }
        } catch (err) {
            console.error("Action error:", err);
            alert("Server error");
        }
    };


    useEffect(() => {
        fetchRequests();
    }, []);

    return (
        <div className="p-6 text-gray-200 bg-gray-900 min-h-screen w-[100vw]">
            <button
                onClick={() => window.history.back()}
                className="text-cyan-400 hover:text-cyan-300 mb-4 flex items-center space-x-1"
            >
                <span className="text-lg">←</span>
                <span className="text-sm">Back</span>
            </button>
            <h2 className="text-xl font-semibold text-cyan-400 mb-4">User Deposit Requests</h2>
            <div className="overflow-x-auto border border-cyan-700 rounded-lg">
                <table className="w-full text-sm">
                    <thead className="bg-gray-800 text-cyan-300">
                        <tr>
                            <th className="p-3 text-left">UserID</th>
                            <th className="p-3 text-left">Transaction ID</th>
                            <th className="p-3 text-left">Amount</th>
                            <th className="p-3 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.length > 0 ? (
                            requests.map((req) => (
                                <tr key={req._id} className="border-t border-gray-700 hover:bg-gray-800/50">
                                    <td className="p-3">{req.userId}</td>
                                    <td className="p-3">{req.transactionId}</td>
                                    <td className="p-3 text-green-400 font-medium">₹{req.amount}</td>
                                    <td className="p-3 text-center space-x-2">
                                        <button
                                            onClick={() => handleAction(req._id, "approve")}
                                            className="bg-green-600 hover:bg-green-500 text-white px-3 py-1 rounded text-xs"
                                        >
                                            ✅ Approve
                                        </button>
                                        <button
                                            onClick={() => handleAction(req._id, "reject")}
                                            className="bg-red-600 hover:bg-red-500 text-white px-3 py-1 rounded text-xs"
                                        >
                                            ❌ Reject
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center p-4 text-gray-400">
                                    No deposit requests found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserDepositRequests;
