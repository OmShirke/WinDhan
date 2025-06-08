import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar2 from "./navbar2";
import profilePic from "../pictures/profilePic.jpg";
import UserDeposit from "./userDeposit";
import UserWithdraw from "./userWithdraw";
import QrDetails from "./QrDetails";


const Profile = ({ user }) => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token"); // 🔐 Clear auth token
    navigate("/"); // 🏠 Redirect to homepage
  };
  const [showDeposit, setShowDeposit] = useState(false);
  const [showQr, setshowQr] = useState(false)
  const [showWithdraw, setShowWithdraw] = useState(false);

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
              <div className="bg-cyan-900/40 rounded-md p-4 shadow space-y-3 text-center">
                <p className="text-sm font-semibold">
                  Balance: <span className="text-green-400">₹{userData.balance}</span>
                </p>


                <div className="flex justify-center gap-4">
                  {/* Deposit Button */}
                  <button
                    onClick={() => setShowDeposit(true)}
                    className="flex items-center gap-1 px-3 py-1.5 bg-green-500 text-black font-semibold text-xs rounded hover:bg-green-400 transition"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    Deposit
                  </button>

                  <button
                    onClick={() => setShowWithdraw(true)}
                    className="flex items-center gap-1 px-3 py-1.5 bg-yellow-400 text-black font-semibold text-xs rounded hover:bg-yellow-300 transition"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 20V4m0 0L8 8m4-4l4 4"
                      />
                    </svg>
                    Withdraw
                  </button>


                </div>
              </div>
              <div className="flex justify-center gap-4 mt-3">
                {/* Payment History Button */}
                <button
                  onClick={() => navigate("/payment-history")}
                  className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white font-semibold text-xs rounded hover:bg-blue-500 transition"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
                  </svg>
                  Payment History
                </button>

                {/* Logout Button */}
                <button
                  onClick={logout}
                  className="flex items-center gap-1 px-3 py-1.5 bg-red-600 text-white font-semibold text-xs rounded hover:bg-red-500 transition"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1m0-10v1" />
                  </svg>
                  Logout
                </button>
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
      {showDeposit && (
        <UserDeposit
          onClose={() => setShowDeposit(false)}
          onDeposit={fetchProfile} // Refresh balance
        />
      )}
      {showDeposit && (
        <QrDetails />
      )}
      {showWithdraw && (
        <UserWithdraw
          onClose={() => setShowWithdraw(false)}
          onWithdraw={fetchProfile} // refresh balance
          balance={userData.balance}
        />
      )}


    </div>
  );
};

export default Profile;
