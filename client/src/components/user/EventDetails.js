import React, { useEffect, useState } from "react";
import Order from "./Order";

function EventDetails(props) {
  const event = props.event;
  const descriptions = props.descriptions;
  const [showOrder, setShowOrder] = useState(false);
  const [yesbook, setYesbook] = useState([]);
  const [nobook, setNobook] = useState([]);
  const [option, setOption] = useState("yes");
  const [paragraph, setParagraph] = useState(false);

  const getResponse = async (event) => {
    const response = await fetch("http://localhost:5000/events/orderbook", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ event }),
    });
    const json = await response.json();

    setYesbook(json.yes_copy);
    setNobook(json.no_copy);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      getResponse(event);
    }, 3000);
    return () => clearInterval(interval);
  }, [event]);

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
        <div className={`${!paragraph ? "h-[70px] overflow-hidden" : "h-auto"}`}>
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
            click for more orders
          </span>
        ) : (
          <span
            className="text-purple-400 cursor-pointer hover:underline select-none text-xs"
            onClick={() => setParagraph(false)}
          >
            Hide
          </span>
        )}

        {/* Order Book Section */}
        {paragraph && (
          <div className="bg-gray-800 p-3 rounded-md shadow-inner text-center flex flex-col gap-4 lg:w-3/4 mx-auto">
            <div className="text-lg font-semibold text-purple-400 drop-shadow-md">
              Order Book
            </div>

            <div className="flex gap-3 p-2 bg-gray-900 rounded-md">
              {/* Yes Table */}
              <table className="w-1/2 text-center border border-green-700 rounded-md overflow-hidden text-xs">
                <thead>
                  <tr className="bg-green-900/20">
                    <th className="py-1.5 px-2 border-b border-green-700 text-green-300">
                      Price <span className="text-green-400">(Yes)</span>
                    </th>
                    <th className="py-1.5 px-2 border-b border-green-700">Qty</th>
                  </tr>
                </thead>
                <tbody>
                  {yesbook.map((order, index) => (
                    <tr
                      key={index}
                      className="odd:bg-green-900/10 even:bg-green-900/20 hover:bg-green-800 cursor-default transition"
                    >
                      <td className="py-1 px-2 border-b border-green-700">
                        ₹ {order.price}
                      </td>
                      <td className="py-1 px-2 border-b border-green-700">
                        {order.quantity}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* No Table */}
              <table className="w-1/2 text-center border border-red-700 rounded-md overflow-hidden text-xs">
                <thead>
                  <tr className="bg-red-900/20">
                    <th className="py-1.5 px-2 border-b border-red-700 text-red-300">
                      Price <span className="text-red-400">(No)</span>
                    </th>
                    <th className="py-1.5 px-2 border-b border-red-700">Qty</th>
                  </tr>
                </thead>
                <tbody>
                  {nobook.map((order, index) => (
                    <tr
                      key={index}
                      className="odd:bg-red-900/10 even:bg-red-900/20 hover:bg-red-800 cursor-default transition"
                    >
                      <td className="py-1 px-2 border-b border-red-700">
                        ₹ {order.price}
                      </td>
                      <td className="py-1 px-2 border-b border-red-700">
                        {order.quantity}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
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
            Yes ₹{event.yes}
          </button>
          <button
            onClick={() => {
              setShowOrder(true);
              setOption("no");
            }}
            className="shadow-md bg-red-700 text-red-300 rounded-md w-28 py-1.5 font-bold active:bg-red-600 hover:brightness-125 transition text-xs"
          >
            No ₹{event.no}
          </button>
        </div>
      </div>

      {showOrder && <Order setShowOrder={setShowOrder} event={event} option={option} />}
    </>
  );
}

export default EventDetails;
