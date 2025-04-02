import React, { useEffect, useState } from "react";

const Profile = () => {
  const [userData, setUserData] = useState(null);

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
    <div>
      <h1>Profile</h1>
      {userData ? (
        <div>
          <p>Email: {userData.email}</p>
          <p>Username: {userData.username}</p>
          <p>Balance: ₹{userData.balance}</p>
          <h3>Order History</h3>
          {userData.orders.length > 0 ? (
            userData.orders.map((order, index) => (
              <p key={index}>
                Event: {order.eventId}, Amount: ₹{order.amount}, Outcome:{" "}
                {order.outcome}
              </p>
            ))
          ) : (
            <p>No orders found</p>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;
