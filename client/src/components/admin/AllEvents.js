import React, { useEffect, useState } from "react";
import CreateEvent from "./createEvent";
import { useNavigate } from "react-router-dom";
import { PlusCircle, LogOut } from "lucide-react";

function Events() {
  const [eventDialog, setEventDialog] = useState(false);
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:5000/worker/event", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const data = await response.json();
        setEvents(data.events);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, [eventDialog]);

  const handleLogout = () => {
    localStorage.clear();

    // Ensure all state changes complete before redirecting
    requestAnimationFrame(() => {
      navigate(0);
    });
  };


  return (
    <div className="min-h-screen w-full bg-[#0F172A] text-[#F1F5F9] p-6">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold">Welcome, Admin</h1>

        <div className="flex gap-3">
          <button
            onClick={() => navigate("/all-users")}
            className="flex items-center gap-2 bg-[#1E293B] border border-[#22c55e] text-[#22c55e] px-4 py-2 rounded-xl font-semibold hover:bg-[#0F172A] transition"
          >
            👥 View Users
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-[#1E293B] border border-[#38BDF8] text-[#38BDF8] px-4 py-2 rounded-xl font-semibold hover:bg-[#0F172A] transition"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </header>


      {/* Create Event Button */}
      <div className="flex justify-center mb-6">
        <button
          onClick={() => setEventDialog(true)}
          className="flex items-center gap-2 bg-[#38BDF8] text-black px-6 py-3 rounded-xl font-semibold hover:bg-[#0ea5e9] transition"
        >
          <PlusCircle size={20} />
          Create Event
        </button>
      </div>

      {/* Event Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {events.map((event, index) => (
          <div
            key={index}
            className="bg-[#1E293B] p-4 rounded-2xl shadow hover:scale-[1.02] transition duration-300"
          >
            <h2 className="text-lg font-bold mb-2">{event.title}</h2>
            <div className="bg-blue-200 w-full h-32 rounded-xl mb-3" />
            <p className="text-[#94A3B8] font-medium">Yes: {event.yes}</p>
            <p className="text-[#94A3B8] font-medium">No: {event.no}</p>
            <p className="text-[#94A3B8] text-sm mt-2">
              Start: {event.startTime}
            </p>
            <p className="text-[#94A3B8] text-sm">End: {event.endTime}</p>
          </div>
        ))}
      </section>

      {/* Create Event Modal */}
      {eventDialog && <CreateEvent setEventDialog={setEventDialog} />}
    </div>
  );
}

export default Events;
