import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Home, LogOut, User } from "lucide-react";

const Navbar2 = ({ user, onLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/");
  };

  return (
    <nav className="sticky top-0 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-xl p-4 z-20">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* App Name */}
        <div className="text-2xl sm:text-3xl text-purple-400 font-bold font-orbitron tracking-wide select-none">
          <Link to="/">Windhan</Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-10 text-lg text-gray-300 items-center font-poppins">
          <Link
            to="/"
            className="hover:text-purple-400 transition-colors duration-300 flex items-center gap-1"
          >
            <Home className="w-5 h-5" />
            Home
          </Link>

          {user && (
            <>
              <button
                onClick={handleLogout}
                className="cursor-pointer hover:text-purple-400 transition-colors duration-300 font-semibold flex items-center gap-1"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </button>
              <Link to="/profile">
                <span className="flex items-center gap-1 bg-gray-700 border border-gray-600 rounded-full px-5 py-2 text-purple-300 font-semibold">
                  <User className="w-5 h-5" />
                  {user.length > 10 ? user.slice(0, 10) + "..." : user}
                </span>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-purple-400 focus:outline-none"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden mt-2 px-4 space-y-3 text-gray-300 font-poppins text-base">
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="block hover:text-purple-400 flex items-center gap-1"
          >
            <Home className="w-5 h-5" />
            Home
          </Link>

          {user && (
            <>
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="block w-full text-left hover:text-purple-400 flex items-center gap-1"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </button>
              <Link
                to="/profile"
                onClick={() => setMenuOpen(false)}
                className="block text-purple-300 font-semibold bg-gray-700 border border-gray-600 rounded-full px-4 py-2 flex items-center gap-1"
              >
                <User className="w-5 h-5" />
                {user.length > 10 ? user.slice(0, 10) + "..." : user}
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar2;
