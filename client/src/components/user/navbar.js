import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Home, LogOut, User } from "lucide-react";

const Navbar = ({ user, onLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/");
  };

  return (
    <nav className="sticky top-0 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-lg px-4 sm:px-6 py-3 z-20">
      <div className="flex justify-between items-center">
        {/* Brand */}
        <div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-green-400 select-none drop-shadow-[0_0_8px_rgb(34,197,94)]">
          <Link to="/">Windhan</Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="sm:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-cyan-300">
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Desktop Nav */}
        <div className="hidden sm:flex gap-8 text-gray-300 items-center font-poppins text-lg">
          <Link to="/" className="hover:text-purple-400 transition flex items-center gap-1">
            <Home className="w-5 h-5" />
            Home
          </Link>

          {user ? (
            <>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 bg-gray-800 hover:bg-gray-700 text-purple-300 border border-purple-400 px-4 py-1.5 rounded-full text-sm transition"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </button>
              <Link to="/profile">
                <div className="flex items-center gap-2 bg-gray-800 px-3 py-1.5 rounded-full border border-gray-700 hover:border-purple-500 transition">
                  <User className="w-5 h-5 text-purple-300" />
                  <span className="text-purple-300 font-medium">
                    {user.length > 10 ? user.slice(0, 10) + "..." : user}
                  </span>
                </div>
              </Link>
            </>
          ) : (
            <>
              <Link to="/Login" className="hover:text-purple-400 transition">
                Login
              </Link>
              <Link to="/Signup" className="hover:text-purple-400 transition">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="sm:hidden mt-3 flex flex-col gap-3 text-gray-300 font-poppins text-base">
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="hover:text-purple-400 flex items-center gap-1"
          >
            <Home className="w-5 h-5" />
            Home
          </Link>

          {user ? (
            <>
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="flex items-center gap-1 bg-gray-800 hover:bg-gray-700 text-purple-300 border border-purple-400 px-4 py-1.5 rounded-full text-sm transition"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </button>
              <Link to="/profile" onClick={() => setMenuOpen(false)}>
                <div className="flex items-center gap-2 bg-gray-800 px-3 py-1.5 rounded-full border border-gray-700 hover:border-purple-500 transition">
                  <User className="w-5 h-5 text-purple-300" />
                  <span className="text-purple-300 font-medium">
                    {user.length > 10 ? user.slice(0, 10) + "..." : user}
                  </span>
                </div>
              </Link>
            </>
          ) : (
            <>
              <Link to="/Login" onClick={() => setMenuOpen(false)} className="hover:text-purple-400">
                Login
              </Link>
              <Link to="/Signup" onClick={() => setMenuOpen(false)} className="hover:text-purple-400">
                Signup
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
