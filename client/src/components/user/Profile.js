import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar2 from "./navbar2";
import profilePic from "../pictures/profilePic.jpg";

const Profile = ({ user }) => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/Login");
  };

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await fetch("http://localhost:5000/api/user/profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch profile");

      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-gray-300 font-sans">
      <Navbar2 user={user} onLogout={logout} />

      {/* Back Button */}
      <div className="px-4 pt-4">
        <button
          onClick={() => navigate("/")}
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

      <div className="flex justify-center pt-6 px-2">
        <div className="w-full max-w-sm bg-gray-900/70 border border-gray-800 rounded-xl p-5 shadow-md shadow-cyan-800/30">
          {/* Profile Header */}
          <div className="flex flex-col items-center text-center gap-3">
            <img
              src={profilePic}
              alt="Profile"
              className="w-24 h-24 rounded-full border-2 border-cyan-400 object-cover shadow"
            />
            {userData && (
              <>
                <h1 className="text-xl font-bold text-cyan-400">{userData.username}</h1>
                <p className="text-xs text-gray-400">{userData.email}</p>
              </>
            )}
          </div>

          {/* User Info */}
          {userData ? (
            <div className="mt-6 space-y-4">
              {/* Balance */}
              <div className="bg-cyan-900/40 rounded-md p-3 text-center shadow">
                <p className="text-sm font-semibold">
                  Balance: <span className="text-green-400">₹{userData.balance}</span>
                </p>
              </div>

              {/* Static Info */}
              <div className="flex gap-2 items-center text-xs text-cyan-300">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3179/3179068.png"
                  alt="Location"
                  className="w-4 h-4"
                />
                <span>Mumbai</span>
              </div>

              <div className="flex gap-2 items-center text-xs text-cyan-300 hover:text-cyan-200 cursor-pointer">
                <img
                  src="https://www.svgrepo.com/show/192522/customer-service-support.svg"
                  alt="Support"
                  className="w-5 h-5"
                />
                <span>Help & Support</span>
              </div>

              {/* Orders */}
              <div>
                <h3 className="text-sm font-medium text-cyan-400 mb-2">Order History</h3>
                {userData.orders.length > 0 ? (
                  <div className="overflow-x-auto border border-cyan-800 rounded-md">
                    <table className="w-full text-[11px]">
                      <thead className="bg-cyan-900/60">
                        <tr>
                          <th className="py-1 px-2 text-left">#</th>
                          <th className="py-1 px-2 text-left">Event</th>
                          <th className="py-1 px-2 text-left">₹</th>
                          <th className="py-1 px-2 text-left">Result</th>
                        </tr>
                      </thead>
                      <tbody>
                        {userData.orders.map((order, index) => (
                          <tr key={index} className="hover:bg-cyan-800/20">
                            <td className="px-2 py-1">{index + 1}</td>
                            <td className="px-2 py-1">{order.eventId}</td>
                            <td className="px-2 py-1">₹{order.amount}</td>
                            <td className="px-2 py-1">{order.outcome}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-xs italic text-gray-500">No orders yet</p>
                )}
              </div>
            </div>
          ) : (
            <p className="text-center text-cyan-400 text-sm mt-8 animate-pulse">Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
