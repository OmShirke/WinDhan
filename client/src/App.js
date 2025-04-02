import React, { useEffect } from "react";
import { useState } from "react";
import Home from "./components/user/Home";
import Login from "./components/user/Login";
import Signup from "./components/user/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Events from "./components/admin/AllEvents";
import CreateEvent from "./components/admin/createEvent";
import Profile from "./components/user/Profile";

function App() {
  const [token, setToken] = useState();
  const [user, setUser] = useState();
  const [role, setRole] = useState();
  const getResponse = async () => {
    const storedToken = localStorage.getItem("token");

    if (!storedToken) {
      console.log("No token found in localStorage");
      return;
    }

    const token = JSON.parse(storedToken); // Parse token once

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
      console.log("User Role:", json.role);
    } else {
      console.log("Unauthorized: Invalid token");
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
    <>
      <BrowserRouter>
        <Routes>
          {role === "admin" ? (
            <>
              <Route index element={<Events />} />
              <Route path="/createEvent" element={<CreateEvent />} />
            </>
          ) : (
            <Route index element={<Home user={user} />} />
          )}
          <Route path="profile" element={<Profile />} />

          <Route path="Login" element={<Login setToken={setToken} />} />
          <Route path="Signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
