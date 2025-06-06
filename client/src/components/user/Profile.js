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
      if (!token) {
        console.error("No token found");
        return;
      }

      const response = await fetch("http://localhost:5000/api/user/profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch profile");
      }

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
    <div className="profile-parent">
      <Navbar2 user={user} onLogout={logout} />

      <div className="bg-slate-300 min-h-[80vh] ">

        {/* profile card */}

        <div className="p-5 m-auto w-[30vw] bg-white mt-6 rounded-[50px] min-h-[80vh] border border-slate-400">
          {/* profile picture */}
          <div className="color bg-slate-300 p-4  rounded-md">
            <div className="flex flex-row w-max mx-auto">

              <div className="profile-picture w-max ">
                <img src={profilePic} alt="Profile" className="max-w-36 h-36 rounded-full object-contain" />
              </div>

              <div className="right pt-5">
                {userData && (
                  <div className="text-left pl-[21px]">
                    <p className="text-6xl mt-2 font-semibold">{userData.username}</p>
                    <p>{userData.email}</p>
                  </div>
                )}

              </div>
            </div>
          </div>



          {userData ? (
            <div className="text-left space-y-3 w-max mx-auto">
              <div className="balance-style p-5">
                <p className="text-3xl">Balance: ₹{userData.balance}</p>
              </div>
              <div className="line  border-black w-[25vw] border-t-[0.5px]"></div>
              <div className="location flex flex-row gap-1 p-3">
                <div className="location-logo h-6 w-6 pt-1 ">
                  <img src="   https://cdn-icons-png.flaticon.com/512/3179/3179068.png " alt="" />
                </div>
                <div className="location-place text-2xl ">
                  <p>Mumbai</p>
                </div>
              </div>
              <div className="line  border-black w-[25vw] border-t-[0.5px]"></div>

              <div className="helpandsupport flex flex-row gap-3 pl-5 p-3">
                <div className="hands-svg">
                  <img className="h-7 w-7" src="https://www.svgrepo.com/show/192522/customer-service-support.svg" alt="" />
                </div>
                <div className="help-support text-2xl font-semibold">
                  <p>Help & support</p>
                </div>
              </div>
              <div className="line  border-black w-[25vw] border-t-[0.5px]"></div>

              <h3 className="font-semibold mt-5 text-2xl">Order History</h3>
              {userData.orders.length > 0 ? (
                <div className="overflow-x-auto mt-4">
                  <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-md">
                    <thead>
                      <tr className="bg-blue-100 text-blue-800">
                        <th className="py-2 px-4 border-b">#</th>
                        <th className="py-2 px-4 border-b">Event</th>
                        <th className="py-2 px-4 border-b">Amount</th>
                        <th className="py-2 px-4 border-b">Outcome</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userData.orders.map((order, index) => (
                        <tr key={index} className="text-center hover:bg-blue-50 transition">
                          <td className="py-2 px-4 border-b">{index + 1}</td>
                          <td className="py-2 px-4 border-b">{order.eventId}</td>
                          <td className="py-2 px-4 border-b">₹{order.amount}</td>
                          <td className="py-2 px-4 border-b">{order.outcome}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p>No orders found</p>
              )}

            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>

  );
};

export default Profile;
