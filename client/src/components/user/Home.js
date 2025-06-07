import React, { useState, useRef } from "react";
import Events from "./Events.js";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./navbar.js";
import TrendingEvents from "./trendingEvents.js";
import bgVideo from "../pictures/bg-video.mp4"
const Home = (props) => {
  const navigate = useNavigate();
  const user = props.user;
  const [eventDetail, setEventDetail] = useState(null);
  const videoRef = useRef(null);

  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <>
      {/* Video Background */}
      <div className="fixed top-0 left-0 w-full h-full z-0 overflow-hidden">
        <video
          ref={videoRef}
          className="w-full h-full object-cover brightness-75 contrast-130 saturate-130"
          autoPlay
          muted
          playsInline
          loop
        >
          <source
            src={bgVideo}
            type="video/mp4"
          />
        </video>

        {/* Overlays */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-black/40 via-[#0b111a]/30 to-black/50 mix-blend-multiply pointer-events-none" />
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(12,22,36,0.6),rgba(0,0,0,0.85))] pointer-events-none" />
      </div>

      <Navbar user={user} onLogout={logout} />

      <div className="homeparent relative z-10 min-h-screen flex justify-center items-start px-8 sm:px-20 pt-24">
        <div className="home-right max-w-7xl w-full">
          <main
            className={`text-center p-5 flex flex-col gap-14 text-lg ${eventDetail !== null ? "hidden" : ""
              }`}
          >
            <div className="trade-now relative inline-block group cursor-pointer select-none">
              {/* Narrower Glow Background */}
              <div className="absolute inset-x-1/4 top-0 bottom-0 rounded-xl bg-gradient-to-r from-cyan-400 to-purple-600 opacity-15 blur-md pointer-events-none transition-opacity group-hover:opacity-25"></div>

              <Link to="/events" tabIndex={0} aria-label="Go to Trade Now page">
                <h1
                  className="relative text-4xl sm:text-5xl font-orbitron font-semibold uppercase tracking-wide text-cyan-400 drop-shadow-[0_0_4px_rgba(0,255,255,0.4)] transition-colors group-hover:text-purple-400"
                  style={{ letterSpacing: "0.1em" }}
                >
                  Trade Now
                </h1>
              </Link>

              {/* Narrow animated underline on hover */}
              <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-purple-400 rounded-full transition-all group-hover:w-20 group-hover:left-1/2 transform -translate-x-1/2"></span>
            </div>





            {!user && (
              <div
                onClick={() => navigate("/Login")}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && navigate("/Login")}
                className="mx-auto bg-cyan-800/90 hover:bg-cyan-700/95 text-cyan-100 px-8 py-3 rounded-xl font-semibold font-poppins tracking-wide cursor-pointer shadow-lg shadow-cyan-700/80 backdrop-blur-md transition transform hover:scale-[1.05] hover:shadow-cyan-500/90 select-none"
                aria-label="Join Now and create an account"
              >
                Join Now
              </div>
            )}
          </main>

          <div className="mt-12">
            <TrendingEvents eventDetail={eventDetail} setEventDetail={setEventDetail} />
          </div>
        </div>
      </div>

      {/* Additional CSS Animations */}
      <style>
        {`
          @keyframes animate-neon {
            0%, 100% {
              opacity: 0.5;
              filter: blur(15px);
            }
            50% {
              opacity: 0.7;
              filter: blur(20px);
            }
          }
          .animate-animate-neon {
            animation: animate-neon 3s ease-in-out infinite;
          }
          /* Orbitron fallback font if not loaded */
          .font-orbitron {
            font-family: 'Orbitron', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          }
        `}
      </style>
    </>
  );
};

export default Home;
