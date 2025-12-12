import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AllUsers() {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem("token"));
        const fetchUsers = async () => {
            const res = await fetch("http://localhost:4008/api/admin/allusers", {
                headers: {
                    "Content-Type": "application/json",
                    // "auth-token": token,
                },
            });
            const data = await res.json();
            if (res.ok) setUsers(data);
            else console.error(data.error);
        };

        fetchUsers();
    }, []);

    const handleDelete = async (userId) => {
        const confirm = window.confirm("Are you sure you want to delete this user?");
        if (!confirm) return;

        const res = await fetch(`http://localhost:4008/api/admin/deleteuser/${userId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                // "auth-token": token,
            },
        });

        if (res.ok) {
            setUsers((prev) => prev.filter((u) => u._id !== userId));
            alert("User deleted");
        } else {
            alert("Failed to delete user");
        }
    };

    return (
        <>
            <div className="min-h-screen bg-[#0F172A] text-[#F1F5F9] p-8">
                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center text-cyan-400 hover:text-cyan-200 font-semibold mb-6"
                >
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
                    Back
                </button>

                <h1 className="text-3xl font-bold mb-6 text-center">User Management</h1>

                <div className="overflow-x-auto rounded-xl border border-[#334155] shadow-lg">
                    <table className="min-w-full text-sm text-left bg-[#1E293B] border-collapse">
                        <thead className="bg-[#334155] text-cyan-300 uppercase text-xs tracking-wider">
                            <tr>
                                <th className="px-6 py-4">#</th>
                                <th className="px-6 py-4">Username</th>
                                <th className="px-6 py-4">Email</th>
                                <th className="px-6 py-4">Role</th>
                                <th className="px-6 py-4">Balance</th>
                                <th className="px-6 py-4">Total Orders</th>
                                <th className="px-6 py-4 text-center">Delete</th>
                            </tr>
                        </thead>

                        <tbody>
                            {users.length === 0 ? (
                                <tr>
                                    <td colSpan="7" className="px-6 py-6 text-center text-gray-400">
                                        No users found.
                                    </td>
                                </tr>
                            ) : (
                                users.map((user, index) => (
                                    <tr
                                        key={user._id}
                                        className="border-b border-[#334155] hover:bg-[#2c3a55] transition"
                                    >
                                        <td className="px-6 py-4">{index + 1}</td>
                                        <td className="px-6 py-4 capitalize">{user.username || "—"}</td>
                                        <td className="px-6 py-4">{user.email}</td>
                                        <td className="px-6 py-4">{user.role}</td>
                                        <td className="px-6 py-4">
                                            <input
                                                type="number"
                                                value={user.balance}
                                                onChange={(e) => {
                                                    const newUsers = [...users];
                                                    newUsers[index].balance = e.target.value;
                                                    setUsers(newUsers);
                                                }}
                                                className="bg-[#1E293B] border border-cyan-700 rounded px-2 py-1 w-24 text-cyan-100"
                                            />
                                            <button
                                                onClick={async () => {
                                                    const res = await fetch(
                                                        `http://localhost:4008/api/admin/updatebalance/${user._id}`,
                                                        {
                                                            method: "PUT",
                                                            headers: {
                                                                "Content-Type": "application/json",
                                                                // "auth-token": token,
                                                            },
                                                            body: JSON.stringify({ balance: user.balance }),
                                                        }
                                                    );
                                                    if (!res.ok) alert("Failed to update");
                                                    else alert("Balance saved")
                                                }}
                                                className="ml-2 text-xs px-2 py-1 bg-cyan-600 hover:bg-cyan-500 rounded text-black font-semibold"
                                            >
                                                Save
                                            </button>
                                        </td>
                                        <td className="px-6 py-4">{user.orders?.length || 0}</td>
                                        <td className="px-6 py-4 text-center">
                                            <button
                                                onClick={() => handleDelete(user._id)}
                                                className="text-red-500 hover:text-red-300 transition"
                                                title="Delete user"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-5 w-5 inline-block"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                    strokeWidth={2}
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7h6m2 0a1 1 0 011 1v0a1 1 0 01-1 1H7a1 1 0 01-1-1v0a1 1 0 011-1h10z"
                                                    />
                                                </svg>
                                            </button>

                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
