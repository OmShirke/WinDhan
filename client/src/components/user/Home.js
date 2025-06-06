import React, { useState } from "react";
import Events from "./Events.js";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./navbar.js";
import TrendingEvents from "./trendingEvents.js";
const Home = (props) => {
  const navigate = useNavigate();
  const user = props.user;
  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };
  const [eventDetail, setEventDetail] = useState(null);
  return (
    <>


      {/* Navbar Navbar Navbar */}
      <Navbar user={user} onLogout={logout} />

     {/* home parent */}
     <div className="homeparent">

      {/* left side home */}
      <div className="home-left flex  items-center p-8">
        <Link to="/events"><h1 className="text-7xl">Trade Now</h1></Link>
      </div>

      {/* right side home */}
      <div className="home-right">
        <main
        className={`text-center p-5 flex flex-col gap-10 text-lg z-0    ${eventDetail !== null ? "hidden " : ""
          } `}
      >
        {!user ? (
          <div
            onClick={() => navigate("/Login")}
            className="bg-blue-300 w-fit self-center p-2 rounded-lg text-blue-900 font-semibold hover:cursor-pointer"
          >
            Join Now
          </div>
        ) : (
          <></>
        )}
      </main>

      {/* Events Events */}
      <TrendingEvents eventDetail={eventDetail} setEventDetail={setEventDetail} />
      </div>
     </div>

    </>
  );
};

export default Home;
