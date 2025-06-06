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
    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <>
      <div className="w-20vw h-20vh relative bg-white  p-10 flex flex-col gap-10 w-max m-auto ">
        {/* Main event */}
        <div
          className=" absolute h-20 w-20 z-50 top-[-180px] left-[-100px] mt-32"
          onClick={() => {
            props.setEventDetail(null);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            id="back-arrow"
          >
            <g>
              <path d="M13.83 19a1 1 0 0 1-.78-.37l-4.83-6a1 1 0 0 1 0-1.27l5-6a1 1 0 0 1 1.54 1.28L10.29 12l4.32 5.36a1 1 0 0 1-.78 1.64z"></path>
            </g>
          </svg>
        </div>
        <div
          className={`sm:[${!paragraph ? " h-[100px] overflow-hidden  " : "h-screen"
            }]   `}
        >
          <h1 className="text-4xl p-2 font-bold ">{event.title}</h1>
          {descriptions.map((description, index) => (
            <p key={index} className="h-fit ">
              {description.id === event._id ? description.data : ""}
            </p>
          ))}
        </div>

        {/*hide and read more  */}

        {!paragraph ? (
          <span
            className="text-blue-500 -mt-10 cursor-pointer "
            onClick={() => {
              setParagraph(true);
            }}
          >
            Read More
          </span>
        ) : (
          <span
            className="text-blue-500 cursor-pointer"
            onClick={() => {
              setParagraph(false);
            }}
          >
            Hide
          </span>
        )}

        {/* Order Book */}
        {paragraph && (
          <div className="bg-slate-50 p-6 rounded-lg shadow-md text-center gap-5 flex flex-col lg:w-1/2 self-center ">
            <div className="text-2xl text-blue-400 font-semibold">Order Book</div>

            <div className="flex gap-4 p-4 bg-white rounded-md">
              <table className="w-1/2 text-center border border-green-900 rounded-md overflow-hidden">
                <thead>
                  <tr className="bg-green-50">
                    <th className="py-2 px-3 border-b">Price <span className="text-green-400">(Yes)</span></th>
                    <th className="py-2 px-3 border-b">Qty</th>
                  </tr>
                </thead>
                <tbody>
                  {yesbook.map((order, index) => (
                    <tr key={index}>
                      <td className="py-2 px-3 border-b">₹ {order.price}</td>
                      <td className="py-2 px-3 border-b">{order.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <table className="w-1/2 text-center border border-red-800 rounded-md overflow-hidden">
                <thead>
                  <tr className="bg-red-50">
                    <th className="py-2 px-3 border-b">Price <span className="text-red-400">(No)</span></th>
                    <th className="py-2 px-3 border-b">Qty</th>
                  </tr>
                </thead>
                <tbody>
                  {nobook.map((order, index) => (
                    <tr key={index}>
                      <td className="py-2 px-3 border-b">₹ {order.price}</td>
                      <td className="py-2 px-3 border-b">{order.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}


        <div className=" w-full h-fit -ml-10 bottom-0 absolute">
          <div
            className="flex   w-full    justify-evenly   p-5 gap-5 bg-gray-50 shadow-md  md:absolute
        "
          >
            <button
              onClick={() => {
                setShowOrder(true);
                setOption("yes");
              }}
              className="shadow-md bg-green-100 text-green-700 rounded-md w-52 p-2 font-bold active:bg-green-200   hover:cursor-pointer self-center"
            >
              Yes ₹{event.yes}
            </button>
            <button
              onClick={() => {
                setShowOrder(true);
                setOption("no");
              }}
              className="shadow-md bg-red-100 text-red-700 rounded-md w-52 p-2 font-bold active:bg-red-200   hover:cursor-pointer self-center"
            >
              No ₹{event.no}
            </button>
          </div>
        </div>
      </div>
      {showOrder ? (
        <Order setShowOrder={setShowOrder} event={event} option={option} />
      ) : (
        ""
      )}
    </>
  );
}

export default EventDetails;
