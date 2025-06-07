import React, { useState } from "react";

export default function CreateEvent(props) {
  const [title, setTitle] = useState("");
  const [yes, setYes] = useState("");
  const [no, setNo] = useState("");
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const eventSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/worker/event", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ title, yes, no, startTime, endTime, description }),
    });
    const json = await response.json();

    if (!response.ok) {
      console.log(json.error);
    } else {
      props.setEventDialog(false);
      console.log(json.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center p-4">
      <div className="bg-[#1E293B] text-[#F1F5F9] rounded-2xl w-full max-w-lg p-6 shadow-xl relative">
        {/* Back arrow button */}
        <button
          onClick={() => props.setEventDialog(false)}
          className="absolute top-4 left-4 text-xl font-bold hover:text-gray-400 transition"
          title="Back"
        >
          ←
        </button>

        {/* Close button */}
        <button
          onClick={() => props.setEventDialog(false)}
          className="absolute top-4 right-6 text-xl font-bold hover:text-gray-400 transition"
          title="Close"
        >
          ×
        </button>

        <form className="flex flex-col gap-6 mt-10" onSubmit={eventSubmit}>
          <input
            autoFocus
            type="text"
            placeholder="Enter Event Name"
            required
            onChange={(e) => setTitle(e.target.value)}
            className="bg-transparent border-b border-slate-500 p-2 text-lg placeholder:text-slate-400 focus:outline-none focus:border-blue-400 transition"
          />
          <textarea
            placeholder="Enter Event Description"
            required
            onChange={(e) => setDescription(e.target.value)}
            className="resize-none bg-transparent border-b border-slate-500 p-2 text-lg placeholder:text-slate-400 focus:outline-none focus:border-blue-400 transition"
          />
          <div className="flex justify-between gap-4">
            <label className="flex items-center gap-2 text-sm sm:text-base">
              Yes%
              <input
                type="number"
                name="yes"
                required
                min={1}
                max={99}
                onChange={(e) => setYes(e.target.value)}
                className="w-20 bg-transparent border-b border-slate-500 p-1 focus:outline-none focus:border-blue-400 text-center"
              />
            </label>
            <label className="flex items-center gap-2 text-sm sm:text-base">
              No%
              <input
                type="number"
                name="no"
                required
                min={1}
                max={99}
                onChange={(e) => setNo(e.target.value)}
                className="w-20 bg-transparent border-b border-slate-500 p-1 focus:outline-none focus:border-blue-400 text-center"
              />
            </label>
          </div>
          <div className="flex justify-between gap-4 text-sm sm:text-base">
            <label className="flex items-center gap-2">
              Start Time
              <input
                type="time"
                name="startTime"
                onChange={(e) => setStartTime(e.target.value)}
                className="bg-blue-500 text-black px-2 py-1 rounded-lg focus:outline-none"
              />
            </label>
            <label className="flex items-center gap-2">
              End Time
              <input
                type="time"
                name="endTime"
                onChange={(e) => setEndTime(e.target.value)}
                className="bg-blue-500 text-black px-2 py-1 rounded-lg focus:outline-none"
              />
            </label>
          </div>
          <input
            type="submit"
            value="Create"
            className="bg-yellow-400 text-black rounded-md py-2 font-bold hover:bg-yellow-500 active:bg-yellow-300 transition w-32 self-center"
          />
        </form>
      </div>
    </div>
  );
}
