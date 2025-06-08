import React, { useEffect, useState } from "react";
import Order from "./Order";

function EventDetails(props) {
  const event = props.event;
  const descriptions = props.descriptions;
  const [showOrder, setShowOrder] = useState(false);
  const [option, setOption] = useState("yes");
  const [paragraph, setParagraph] = useState(false);

  return (
    <>
      <div className="relative bg-gray-900 text-gray-200 p-4 rounded-xl max-w-2xl mx-auto mt-8 shadow-lg flex flex-col gap-4 min-h-[50vh]">
        {/* Back arrow */}
        <div
          className="absolute top-[-50px] left-0 cursor-pointer w-6 h-6 text-purple-400 hover:text-purple-600 transition"
          onClick={() => props.setEventDetail(null)}
          title="Back"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path d="M13.83 19a1 1 0 0 1-.78-.37l-4.83-6a1 1 0 0 1 0-1.27l5-6a1 1 0 1 1 1.54 1.28L10.29 12l4.32 5.36a1 1 0 0 1-.78 1.64z" />
          </svg>
        </div>

        {/* Event Title & Description */}
        <div
          className={`${!paragraph ? "h-[70px] overflow-hidden" : "h-auto"}`}
        >
          <h1 className="text-2xl font-extrabold text-purple-400 mb-2 drop-shadow-lg">
            {event.title}
          </h1>
          {descriptions.map((description, index) => (
            <p key={index} className="leading-snug text-gray-300 text-xs">
              {description.id === event._id ? description.data : ""}
            </p>
          ))}
        </div>

        {/* Read More / Hide toggle */}
        {!paragraph ? (
          <span
            className="text-purple-400 cursor-pointer hover:underline select-none text-xs"
            onClick={() => setParagraph(true)}
          >
            click for more
          </span>
        ) : (
          <span
            className="text-purple-400 cursor-pointer hover:underline select-none text-xs"
            onClick={() => setParagraph(false)}
          >
            Hide
          </span>
        )}

        {/* Bottom Buttons */}
        <div className="w-full h-fit mt-auto flex justify-evenly gap-3 bg-gray-800 p-3 rounded-md shadow-md">
          <button
            onClick={() => {
              setShowOrder(true);
              setOption("yes");
            }}
            className="shadow-md bg-green-700 text-green-300 rounded-md w-28 py-1.5 font-bold active:bg-green-600 hover:brightness-125 transition text-xs"
          >
            Bet Yes
          </button>
          <button
            onClick={() => {
              setShowOrder(true);
              setOption("no");
            }}
            className="shadow-md bg-red-700 text-red-300 rounded-md w-28 py-1.5 font-bold active:bg-red-600 hover:brightness-125 transition text-xs"
          >
            Bet No
          </button>
        </div>
      </div>

      {showOrder && (
        <Order setShowOrder={setShowOrder} event={event} option={option} />
      )}
    </>
  );
}

export default EventDetails;
