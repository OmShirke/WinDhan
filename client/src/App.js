import React, { useEffect, useState } from "react";
import Home from "./components/user/Home";
import Login from "./components/user/Login";
import Signup from "./components/user/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminEvents from "./components/admin/AllEvents";
import CreateEvent from "./components/admin/createEvent";
import Profile from "./components/user/Profile";
import UserEvents from "./components/user/Events"; // Your Events component
import Allusers from "./components/admin/Allusers"
import Alldeposit from "./components/admin/Alldeposit"
import AllwithdrawRequests from "./components/admin/AllwithdrawRequests"

function App() {
  const [token, setToken] = useState();
  const [user, setUser] = useState();
  const [role, setRole] = useState();
  const [eventDetail, setEventDetail] = useState(null); // 👈 Add this line

  const getResponse = async () => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) return;

    const token = JSON.parse(storedToken);
    const response = await fetch("http://localhost:5000/user", {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      const json = await response.json();
      setUser(json.user);
      setRole(json.role);
    }
  };

  useEffect(() => {
    getResponse();
  }, [token]);

  useEffect(() => {
    setTimeout(() => {
      const tokenCreatedAt = localStorage.getItem("tokenCreatedAt");
      if (Date.now() - tokenCreatedAt > 1 * 15 * 60 * 1000) {
        localStorage.removeItem("token");
        localStorage.removeItem("tokenCreatedAt");
      }
    }, 5000);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {role === "admin" ? (
          <>
            <Route index element={<AdminEvents />} />
            <Route path="/createEvent" element={<CreateEvent />} />
          </>
        ) : (
          <Route index element={<Home user={user} />} />
        )}
        <Route path="profile" element={<Profile />} />
        {/* ✅ Pass props here */}
        <Route path="events" element={<UserEvents eventDetail={eventDetail} setEventDetail={setEventDetail} />} />
        <Route path="login" element={<Login setToken={setToken} />} />
        <Route path="signup" element={<Signup />} />
        <Route path="/all-users" element={<Allusers />} />
        <Route path="/admin/deposit-requests" element={<Alldeposit />} />
        <Route path="/admin/withdraw-requests" element={<AllwithdrawRequests/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
