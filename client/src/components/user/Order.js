import React, { useEffect, useState, useRef } from "react";

function Order(props) {
  const [token, setToken] = useState(null);
  const [amount, setAmount] = useState(10);
  const [option, setOption] = useState(props.option || "yes");
  const [multiplier, setMultiplier] = useState(null);
  const [loadingMultiplier, setLoadingMultiplier] = useState(false);
  const [success, setSuccess] = useState(false);
  const [unauthorized, setUnauthorized] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const offsetRef = useRef({ x: 0, y: 0 });
  const popupRef = useRef(null);

  const event = props.event;

  useEffect(() => {
    const el = popupRef.current;
    if (el) {
      const { width, height } = el.getBoundingClientRect();
      setPosition({
        x: window.innerWidth / 2 - width / 2,
        y: window.innerHeight * 0.2,
      });
    }
  }, []);

  const handleDoubleClick = (e) => {
    const el = popupRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    offsetRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
    setDragging(true);
  };

  const handleMouseMove = (e) => {
    if (!dragging) return;
    setPosition({
      x: e.clientX - offsetRef.current.x,
      y: e.clientY - offsetRef.current.y,
    });
  };

  const handleMouseUp = () => {
    if (dragging) setDragging(false);
  };

  useEffect(() => {
    if (dragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging]);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) setToken(JSON.parse(storedToken));
  }, []);

  // Fetch multiplier preview on amount or option change
  useEffect(() => {
    if (!event?._id || !option || amount < 1) {
      setMultiplier(null);
      return;
    }

    async function fetchMultiplier() {
      setLoadingMultiplier(true);
      try {
        const url = `http://localhost:5000/events/order/preview-multiplier?eventId=${event._id}&option=${option}&amount=${amount}`;
        console.log("Fetching multiplier from:", url);
        const res = await fetch(url);

        if (res.ok) {
          const data = await res.json();
          if (
            data.multiplier &&
            typeof data.multiplier === "object" &&
            option in data.multiplier
          ) {
            setMultiplier(data.multiplier[option]);
          } else {
            setMultiplier(null);
          }
        } else {
          setMultiplier(null);
        }
      } catch {
        setMultiplier(null);
      } finally {
        setLoadingMultiplier(false);
      }
    }
    fetchMultiplier();
  }, [event, option, amount]);

  const placeOrder = async () => {
    try {
      const response = await fetch("http://localhost:5000/events/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          option,
          amount,
          event: event._id,
        }),
      });

      if (response.status === 401) {
        setUnauthorized(true);
      } else if (response.status === 201) {
        setSuccess(true);
        setTimeout(() => props.setShowOrder(false), 1000);
      }
    } catch (error) {
      console.error("Order placement failed:", error);
    }
  };

  return (
    <div
      ref={popupRef}
      onDoubleClick={handleDoubleClick}
      style={{
        top: `${position.y}px`,
        left: `${position.x}px`,
        position: "fixed",
        cursor: dragging ? "grabbing" : "grab",
      }}
      className="p-3 w-[90vw] sm:w-[260px] shadow-xl bg-white rounded-xl flex flex-col gap-3 items-center font-sans text-gray-900 text-xs sm:text-xs z-50"
    >
      {success && (
        <div className="p-2 bg-green-100 shadow-md rounded-md absolute -top-14 left-1/2 -translate-x-1/2 text-green-700 font-semibold select-none text-xs">
          ✅ Order Placed Successfully
        </div>
      )}
      {unauthorized && (
        <div className="p-2 bg-red-100 shadow-md rounded-md absolute -top-14 left-1/2 -translate-x-1/2 text-red-700 font-semibold select-none text-xs">
          ❌ Unauthorized, please Log in
        </div>
      )}

      <div
        className="absolute top-3 left-3 w-5 h-5 cursor-pointer hover:text-gray-600"
        onClick={() => props.setShowOrder(false)}
        aria-label="Back"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-4 h-4"
        >
          <path d="M13.83 19a1 1 0 0 1-.78-.37l-4.83-6a1 1 0 0 1 0-1.27l5-6a1 1 0 0 1 1.54 1.28L10.29 12l4.32 5.36a1 1 0 0 1-.78 1.64z" />
        </svg>
      </div>

      {/* Option Selector */}
      <div className="flex text-center gap-4 w-full">
        {["yes", "no"].map((opt) => (
          <div className="flex-1" key={opt}>
            <input
              id={opt}
              className={`appearance-none peer/${opt}`}
              name="option"
              type="radio"
              value={opt}
              checked={option === opt}
              onChange={(e) => setOption(e.target.value)}
            />
            <label
              htmlFor={opt}
              className={`peer-checked/${opt}:ring-2 ${
                opt === "yes"
                  ? "ring-green-500 peer-checked/yes:bg-green-50"
                  : "ring-red-500 peer-checked/no:bg-red-50"
              } shadow-sm bg-gray-100 rounded-md w-full p-1.5 font-semibold cursor-pointer select-none text-xs`}
            >
              {opt === "yes" ? "Yes" : "No"} —{" "}
              {opt === "yes" ? event.yes : event.no}
            </label>
          </div>
        ))}
      </div>

      <hr className="h-[1.5px] w-full bg-gray-300" />

      {/* Amount Input */}
      <div className="flex flex-col gap-1 w-full justify-between items-center">
        <div className="flex flex-row gap-2 items-center w-full justify-between">
          <div className="text-sm font-medium">Amount :</div>
          <input
            type="number"
            min={1}
            value={amount}
            onChange={(e) => setAmount(Math.max(1, Number(e.target.value)))}
            className="rounded-xl w-20 text-center border border-gray-300 outline-none focus:ring-2 focus:ring-green-400 text-xs"
          />
        </div>

        <div className="text-xs text-gray-600 mt-1">
          {loadingMultiplier ? (
            "Loading multiplier..."
          ) : multiplier ? (
            <>
              Multiplier for {option.toUpperCase()}:{" "}
              <span className="font-bold">
                {typeof multiplier === "number"
                  ? multiplier.toFixed(2)
                  : multiplier}
                x
              </span>
            </>
          ) : (
            "Multiplier not available"
          )}
        </div>
      </div>

      <button
        onClick={placeOrder}
        disabled={loadingMultiplier || !multiplier || amount < 1}
        className="shadow-md bg-yellow-400 disabled:bg-yellow-200 disabled:text-gray-600 text-gray-900 rounded-lg w-36 p-1.5 font-semibold hover:bg-yellow-500 active:bg-yellow-600 transition select-none text-xs"
      >
        Place Order
      </button>
    </div>
  );
}

export default Order;
