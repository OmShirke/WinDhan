import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [match, setMatch] = useState(true);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const API = process.env.REACT_APP_BACKEND_URL;

  const registerUser = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMatch(false);
      return;
    }
    const res = await fetch(`${API}/api/auth/signup`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email, username, password }),
    });
    if (res.status === 200) {
      setSuccess(true);
      setTimeout(() => navigate("/Login"), 1000);
    }
  };

  return (
    <>
      {/* Back Button */}
      <div className="px-4 p-4 bg-gradient-to-tr from-[#0a0a0a] via-[#121212] to-[#1c1c1c]">
        <button
          onClick={() => navigate("/")}
          className="flex items-center text-cyan-400 hover:text-cyan-200 font-semibold text-sm"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
          Back to Home
        </button>
      </div>

      <div className="bg-gradient-to-tr from-[#0a0a0a] via-[#121212] to-[#1c1c1c] w-screen min-h-screen flex justify-center items-center relative overflow-hidden">
        {/* Background Circles */}
        <div className="absolute top-8 left-8 w-56 h-56 bg-cyan-600 rounded-full opacity-30 blur-3xl animate-pulse mix-blend-screen"></div>
        <div className="absolute bottom-16 right-12 w-72 h-72 bg-purple-700 rounded-full opacity-25 blur-3xl animate-pulse mix-blend-screen"></div>

        {/* Success Message */}
        {success && (
          <div className="fixed top-6 left-1/2 -translate-x-1/2 z-30 px-6 py-3 bg-green-600/90 border border-green-400 rounded-lg shadow-lg text-green-200 font-semibold backdrop-blur-md flex items-center gap-2 animate-fadeIn">
            ✅ Signup Successful
          </div>
        )}

        {/* Form */}
        <form
          onSubmit={registerUser}
          className="relative z-10 bg-[#121820] border border-cyan-700 rounded-2xl shadow-[0_0_40px_#00fff7] w-full max-w-md p-8 flex flex-col gap-6 text-cyan-300 font-sans"
          spellCheck="false"
        >
          <h2 className="text-3xl font-orbitron text-cyan-400 mb-4 tracking-wide select-none text-center">
            Create Account
          </h2>

          {[
            { id: "email", label: "Enter your email:", type: "email", value: email, setter: setEmail, placeholder: "your.email@example.com" },
            { id: "username", label: "Enter your username:", type: "text", maxLength: 8, value: username, setter: setUsername, placeholder: "Username" },
            { id: "password", label: "Enter your password:", type: "password", value: password, setter: (v) => { setPassword(v); setMatch(true); }, placeholder: "••••••••" },
            { id: "confirmPassword", label: "Confirm your password:", type: "password", value: confirmPassword, setter: (v) => { setConfirmPassword(v); setMatch(true); }, placeholder: "••••••••" },
          ].map(({ id, label, type, maxLength, value, setter, placeholder }) => (
            <div key={id}>
              <label htmlFor={id} className="block font-semibold tracking-wide text-cyan-300">
                {label}
              </label>
              <input
                id={id}
                type={type}
                maxLength={maxLength}
                required
                value={value}
                onChange={(e) => setter(e.target.value)}
                className="w-full rounded-md border border-cyan-500 bg-[#0e161f] px-3 py-2 placeholder-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 text-cyan-200 transition"
                placeholder={placeholder}
              />
              {id === "password" && !match && (
                <p className="text-sm text-red-500 font-semibold -mt-4 select-none">
                  ⚠️ Passwords do not match!
                </p>
              )}
            </div>
          ))}

          <button
            type="submit"
            className="bg-cyan-600 hover:bg-cyan-500 active:bg-cyan-700 transition rounded-md py-3 font-semibold text-cyan-900 shadow-[0_0_20px_#00fff7] shadow-cyan-500/70"
          >
            Sign Up
          </button>

          <div className="text-center text-cyan-400 font-semibold tracking-wider uppercase select-none">OR</div>

          <Link
            to="/Login"
            className="block text-center bg-purple-700 hover:bg-purple-600 active:bg-purple-800 transition rounded-md py-3 font-semibold shadow-[0_0_20px_#a855f7] shadow-purple-600/70"
          >
            Login
          </Link>
        </form>
      </div>
    </>
  );
}
