// src/components/Navbar.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ user, onLogout }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        onLogout();
        navigate("/"); // Redirect to home after logout
    };

    return (
        <nav className="sticky top-0 bg-slate-100 rounded-sm w-full shadow-lg p-5 flex justify-between z-20">
            <div className="text-xl text-blue-500 font-bold font-[cursive]">
                <Link to="/">Windhan</Link>
            </div>

            <div className="flex gap-9 text-md text-blue-700 items-center">
                <Link to="/">Home</Link>

                {user ? (
                    <>
                        <button onClick={handleLogout} className="cursor-pointer">
                            Logout
                        </button>
                        <Link to="/profile">            <span className="pr-4 font-semibold bg-slate-300 border border-slate-400 rounded-full p-4">{user}</span>
                        </Link>
                    </>
                ) : (
                    <>
                        <Link to="/Login">Login</Link>
                        <Link to="/Signup">Signup</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
