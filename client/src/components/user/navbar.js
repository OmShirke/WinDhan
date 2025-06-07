import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ user, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/");
  };

  return (
    <nav className="sticky top-0 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-lg px-4 sm:px-6 py-3 flex flex-col sm:flex-row justify-between items-center z-20 gap-3 sm:gap-0">
      {/* Brand */}
      <div className="text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-green-400 select-none drop-shadow-[0_0_8px_rgb(34,197,94)]">
        <Link to="/">Windhan</Link>
      </div>

      {/* Nav Items */}
      <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-10 text-base sm:text-lg text-gray-300 font-poppins">
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
              className="text-sm sm:text-base bg-gray-800 hover:bg-gray-700 text-purple-300 border border-purple-400 px-4 py-1.5 rounded-full transition duration-300"
            >
              Logout
            </button>

            <Link to="/profile">
              <div className="flex items-center gap-2 bg-gray-800 px-3 py-1.5 rounded-full border border-gray-700 hover:border-purple-500 transition duration-300">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  alt="User"
                  className="w-6 h-6 rounded-full"
                />
                <span className="text-purple-300 font-medium select-none">
                  {user.length > 10 ? user.slice(0, 10) + "..." : user}
                </span>
              </div>
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

export default Navbar;
