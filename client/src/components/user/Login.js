import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login(props) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [invalid, setInvalid] = useState(false);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();
  const loginUser = async (event) => {
    event.preventDefault();
    const response = await fetch("http://localhost:4008/api/auth/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const json = await response.json();

    if (response.status === 200) {
      props.setToken(json.token);
      localStorage.setItem("token", JSON.stringify(json.token));
      localStorage.setItem("tokenCreatedAt", JSON.stringify(Date.now()));
      setInvalid(false);
      setSuccess(true);
      setTimeout(() => {
        navigate("/", { replace: true });
      }, 1000);
    } else {
      setInvalid(true);
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
          {/* Simple left arrow SVG */}
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
      <div className="bg-gradient-to-tr from-[#0a0a0a] via-[#121212] to-[#1c1c1c] w-screen h-screen flex justify-center items-center relative overflow-hidden">
        
        {/* Futuristic glowing background elements */}
        <div className="absolute top-10 left-10 w-56 h-56 bg-cyan-600 rounded-full opacity-30 blur-3xl animate-pulse mix-blend-screen"></div>
        <div className="absolute bottom-20 right-16 w-72 h-72 bg-purple-700 rounded-full opacity-25 blur-3xl animate-pulse mix-blend-screen"></div>

        {/* Success message */}
        {success && (
          <div className="fixed top-6 left-1/2 -translate-x-1/2 z-30 px-6 py-3 bg-green-600/90 border border-green-400 rounded-lg shadow-lg text-green-200 font-semibold backdrop-blur-md flex items-center gap-2 animate-fadeIn">
            ✅ Login Successful
          </div>
        )}

        {/* Login form container */}
        <form
          onSubmit={loginUser}
          className="relative z-10 bg-[#121820] border border-cyan-700 rounded-2xl shadow-[0_0_40px_#00fff7] w-full max-w-md p-8 flex flex-col gap-6 text-cyan-300 font-sans"
          spellCheck="false"
        >
          <h2 className="text-3xl font-orbitron text-cyan-400 mb-4 tracking-wide select-none text-center">
            Welcome Back
          </h2>

          <label htmlFor="email" className="block text-cyan-300 font-semibold tracking-wide">
            Enter your email:
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            onChange={(e) => {
              setEmail(e.target.value);
              setInvalid(false);
            }}
            className="w-full rounded-md border border-cyan-500 bg-[#0e161f] px-3 py-2 placeholder-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 text-cyan-200 transition"
            placeholder="your.email@example.com"
          />

          <label htmlFor="password" className="block text-cyan-300 font-semibold tracking-wide">
            Enter your password:
          </label>
          <input
            id="password"
            name="password"
            type="password"
            minLength={8}
            required
            onChange={(e) => {
              setPassword(e.target.value);
              setInvalid(false);
            }}
            className="w-full rounded-md border border-cyan-500 bg-[#0e161f] px-3 py-2 placeholder-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 text-cyan-200 transition"
            placeholder="••••••••"
          />

          {invalid && (
            <p className="text-sm text-red-500 font-semibold -mt-4 select-none">
              ⚠️ Invalid Credentials!
            </p>
          )}

          <button
            type="submit"
            className="bg-cyan-600 hover:bg-cyan-500 active:bg-cyan-700 transition rounded-md py-3 font-semibold text-cyan-900 shadow-[0_0_20px_#00fff7] shadow-cyan-500/70"
          >
            Login
          </button>

          <div className="text-center text-cyan-400 font-semibold tracking-wider uppercase select-none">OR</div>

          <Link
            to="/Signup"
            className="block text-center bg-purple-700 hover:bg-purple-600 active:bg-purple-800 transition rounded-md py-3 font-semibold shadow-[0_0_20px_#a855f7] shadow-purple-600/70"
          >
            Signup
          </Link>
        </form>
      </div>
    </>
  );
}
