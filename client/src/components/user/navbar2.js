// src/components/Navbar2.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar2 = ({ user, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/"); // Redirect to home after logout
  };

  return (
    <nav className="sticky top-0 bg-slate-100 rounded-sm w-full shadow-lg p-5 flex justify-between z-20">
      {/* app name */}
      <div className="text-xl text-blue-500 font-bold font-[cursive]">
        <Link to="/">Windhan</Link>
      </div>

      <div className="flex gap-9 text-md text-blue-700 items-center">
        <Link to="/">Home</Link>
        <button onClick={handleLogout} className="cursor-pointer">
          Logout
        </button>
        {user && (
          <Link to="/profile">
            <span className="pr-4 font-semibold bg-slate-500 text-white rounded-full px-4 py-1">
              {user}
            </span>
          </Link>
        )}

      </div>
    </nav>
  );
};

export default Navbar2;
