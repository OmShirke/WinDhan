import React, { useEffect, useState } from "react";
import EventDetails from "./EventDetails.js";
import Navbar from "./navbar.js";
import { useNavigate } from "react-router-dom";

function Events(props) {
  const navigate = useNavigate();
  const user = props.user;
  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };
  const { eventDetail, setEventDetail } = props;
  const [events, setEvents] = useState([]);
  const [descriptions, setDescriptions] = useState([]);
  const API = process.env.REACT_APP_BACKEND_URL;

  const getResponse = async () => {
    const response = await fetch(`${API}/worker/event`, {
      method: "GET",
      headers: { "content-type": "application/json" },
    });
    const json = await response.json();
    if (response.status === 200) {
      setEvents(json.events);
      setDescriptions(json.description);
    }
  };

  useEffect(() => {
    getResponse();
  }, []);

  return (
    <>
      <Navbar user={user} onLogout={logout} />

      <div className="w-full min-h-screen pt-14 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-200">
        <div className="px-4 pt-4">
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

        <div className="text-center text-2xl font-semibold text-purple-400 mb-6 drop-shadow-lg">
          Events
        </div>

        <div
          className={`p-4 w-full flex flex-wrap gap-6 justify-center ${
            eventDetail !== null ? "hidden" : ""
          }`}
        >
          {events.length === 0 ? (
            <p className="text-gray-400 text-lg">No Events</p>
          ) : (
            events.map((event, index) => (
              <div
                onClick={() => setEventDetail(event)}
                key={index}
                className="bg-gray-800 hover:bg-gray-700 cursor-pointer shadow-lg w-full sm:w-[300px] p-4 rounded-xl flex flex-col gap-3 text-center transition"
              >
                <h1 className="font-bold text-xl text-purple-300 drop-shadow">
                  {event.title}
                </h1>
                <div className="flex gap-4 w-full justify-center">
                  <button className="bg-green-700 text-green-300 rounded-md w-20 py-1.5 text-sm font-semibold hover:brightness-110 transition">
                    Bet Yes
                  </button>
                  <button className="bg-red-700 text-red-300 rounded-md w-20 py-1.5 text-sm font-semibold hover:brightness-110 transition">
                    Bet No
                  </button>
                </div>
                <p className="text-gray-400 italic text-xs">
                  {event.startTime} - {event.endTime}
                </p>
              </div>
            ))
          )}
        </div>

        {eventDetail && (
          <EventDetails
            event={eventDetail}
            setEventDetail={setEventDetail}
            descriptions={descriptions}
          />
        )}
      </div>
    </>
  );
}

export default Events;
