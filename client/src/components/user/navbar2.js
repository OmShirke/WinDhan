import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar2 = ({ user, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/"); // Redirect to home after logout
  };

  return (
    <nav className="sticky top-0 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-xl p-6 flex justify-between items-center z-20">
      {/* app name */}
      <div className="text-3xl text-purple-400 font-bold font-orbitron tracking-wide select-none">
        <Link to="/">Windhan</Link>
      </div>

      <div className="flex gap-12 text-lg text-gray-300 items-center font-poppins">
        <Link
          to="/"
          className="hover:text-purple-400 transition-colors duration-300"
        >
          Home
        </Link>

        {user ? (
          <>
            <button
              onClick={handleLogout}
              className="cursor-pointer hover:text-purple-400 transition-colors duration-300 font-semibold"
            >
              Logout
            </button>
            <Link to="/profile">
              <span className="pr-6 font-semibold bg-gray-700 border border-gray-600 rounded-full px-5 py-2 select-text text-purple-300">
                {user}
              </span>
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/Login"
              className="hover:text-purple-400 transition-colors duration-300"
            >
              Login
            </Link>
            <Link
              to="/Signup"
              className="hover:text-purple-400 transition-colors duration-300"
            >
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar2;
