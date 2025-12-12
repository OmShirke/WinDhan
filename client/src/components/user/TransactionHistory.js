import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserHistory = () => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
      const navigate = useNavigate();
    

    const fetchHistory = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return alert("Not authenticated");

            const headers = {
                Authorization: `Bearer ${JSON.parse(token)}`,
            };

            // ✅ Fetch user-approved deposits
            const depositRes = await fetch("http://localhost:4008/api/deposits/user-approved-deposits", {
                method: "GET",
                headers,
            });
            const depositData = await depositRes.json();

            const deposits = (depositData || []).map((item) => ({
                type: "Deposit",
                amount: item.amount,
                time: item.createdAt || item.time || item.date,
            }));

            // ✅ Fetch user-approved withdraws
            const withdrawRes = await fetch("http://localhost:4008/api/deposits/user-approved-withdraws", {
                method: "GET",
                headers,
            });
            const withdrawData = await withdrawRes.json();

            const withdraws = (withdrawData || []).map((item) => ({
                type: "Withdraw",
                amount: item.amount,
                time: item.createdAt || item.time || item.date,
            }));

            // ✅ Combine, sort, and limit the latest 40 transactions
            const allHistory = [...deposits, ...withdraws]
                .sort((a, b) => new Date(b.time) - new Date(a.time))
                .slice(0, 40);

            setHistory(allHistory);
        } catch (err) {
            console.error("Failed to fetch history:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHistory();
    }, []);

    return (
        <div className="bg-[#0F172A] min-h-screen p-6 text-[#F1F5F9]">
            {/* Back Button */}
            <div className="px-4 pt-4">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center text-cyan-400 hover:text-cyan-200 font-semibold text-sm"
                >
                    {/* Simple left arrow SVG */}
                    <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        viewBox="0 0 24 24"
                    >
                        <path d="M15 18l-6-6 6-6" />
                    </svg>
                    Back to Home
                </button>
            </div>
            <h2 className="text-2xl font-bold mb-6 text-center">Your Transaction History</h2>

            {loading ? (
                <div className="text-center text-gray-400">Loading...</div>
            ) : history.length === 0 ? (
                <div className="text-center text-gray-400">No approved transactions found.</div>
            ) : (
                <div className="overflow-x-auto max-w-5xl mx-auto bg-[#1E293B] rounded-2xl shadow-md">
                    <table className="w-full text-left">
                        <thead className="bg-[#334155]">
                            <tr>
                                <th className="px-6 py-3 text-[#F8FAFC]">Type</th>
                                <th className="px-6 py-3 text-[#F8FAFC]">Amount</th>
                                <th className="px-6 py-3 text-[#F8FAFC]">Date & Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {history.map((item, index) => (
                                <tr
                                    key={index}
                                    className={`border-t border-[#475569] ${item.type === "Deposit"
                                            ? "bg-green-800/30 text-green-200"
                                            : "bg-blue-800/30 text-blue-200"
                                        }`}
                                >
                                    <td className="px-6 py-4 font-semibold">{item.type}</td>
                                    <td className="px-6 py-4">₹{item.amount}</td>
                                    <td className="px-6 py-4 text-sm text-gray-300">
                                        {new Date(item.time).toLocaleString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default UserHistory;
