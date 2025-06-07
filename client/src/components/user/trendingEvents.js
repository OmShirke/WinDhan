import React, { useEffect, useState } from "react";
import EventDetails from "./EventDetails.js";

function TrendingEvents(props) {
  const { eventDetail, setEventDetail } = props;
  const [events, setEvents] = useState([]);
  const [descriptions, setDescriptions] = useState([]);

  const getResponse = async () => {
    const response = await fetch("http://localhost:5000/worker/event", {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
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
    <div className="w-full h-full mt-14">
      <div className="text-center text-3xl font-semibold text-cyan-400 drop-shadow-[0_0_10px_rgba(0,255,255,0.5)] tracking-wide">
        Trending Events
      </div>

      <div
  className={`p-6 w-full items-center flex flex-wrap gap-8 justify-center ${
    eventDetail !== null ? "hidden" : ""
  }`}
>
  {events.length === 0 ? (
    <p className="text-gray-400">No Events</p>
  ) : (
    events.slice(0, 3).map((event, index) => (
      <div
        onClick={() => setEventDetail(event)}
        key={index}
        className="relative group bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white p-4 rounded-xl shadow-[0_0_15px_rgba(0,255,255,0.1)] hover:shadow-cyan-600/50 transition-all duration-300 transform hover:-translate-y-0.5 hover:scale-[1.01] cursor-pointer backdrop-blur-md border border-cyan-700/30 w-full md:w-[22rem] flex flex-col gap-2 text-center"
      >
        <h1 className="text-xl font-semibold text-cyan-400 tracking-wide drop-shadow">
          {event.title}
        </h1>

        <div className="flex justify-around items-center gap-3 mt-1">
          <div className="bg-cyan-700/20 hover:bg-cyan-600/40 px-3 py-1.5 rounded-lg border border-cyan-400 text-cyan-300 font-medium transition w-1/2 text-sm">
            Yes ₹{event.yes}
          </div>
          <div className="bg-red-700/20 hover:bg-red-600/40 px-3 py-1.5 rounded-lg border border-red-400 text-red-300 font-medium transition w-1/2 text-sm">
            No ₹{event.no}
          </div>
        </div>

        <p className="text-gray-400 mt-2 text-xs">
          Start: <span className="text-gray-300">{event.startTime}</span> | End:{" "}
          <span className="text-gray-300">{event.endTime}</span>
        </p>
      </div>
    ))
  )}
</div>


      {eventDetail !== null && (
        <EventDetails
          event={eventDetail}
          setEventDetail={setEventDetail}
          descriptions={descriptions}
        />
      )}
    </div>
  );
}

export default TrendingEvents;
