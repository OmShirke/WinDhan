import React, { useEffect, useState } from "react";
import CreateEvent from "./createEvent";
import { useNavigate } from "react-router-dom";
import { PlusCircle, LogOut, Trash2 } from "lucide-react";

function Events() {
  const [eventDialog, setEventDialog] = useState(false);
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();
  const API = process.env.REACT_APP_BACKEND_URL;

  const fetchEvents = async () => {
    try {
      const response = await fetch(`${API}/worker/event`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      setEvents(data.events);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [eventDialog]);

  const handleDelete = async (eventId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this event?"
    );
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `${API}/api/delete-event/${eventId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
        }
      );

      if (res.ok) {
        alert("Event deleted successfully.");
        fetchEvents();
      } else {
        const data = await res.json();
        alert(data.error || "Failed to delete event.");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Server error");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    requestAnimationFrame(() => navigate(0));
  };

  return (
    <div className="min-h-screen  bg-[#0F172A] text-[#F1F5F9] p-4 sm:p-6 w-[100vw]">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold">Welcome, Admin</h1>
        <div className="flex flex-wrap gap-3 justify-center md:justify-end">
          <button
            className="flex items-center bg-cyan-700 hover:bg-cyan-600 text-sm px-3 py-2 rounded-lg shadow shadow-cyan-900 transition"
            onClick={() => navigate("/admin/deposit-requests")}
          >
            💰 Deposit Requests
          </button>

          <button
            onClick={() => navigate("/admin/close-event")}
            className="flex items-center bg-orange-600 hover:bg-orange-500 text-sm px-3 py-2 rounded-lg shadow shadow-orange-800 transition"
          >
            Close Event
          </button>

          <button
            className="flex items-center bg-cyan-700 hover:bg-cyan-600 text-sm px-3 py-2 rounded-lg shadow shadow-cyan-900 transition"
            onClick={() => navigate("/admin/withdraw-requests")}
          >
            🏧 Withdraw Requests
          </button>
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

      {/* Create Event */}
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
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {events.map((event, index) => (
          <div
            key={index}
            className="bg-[#1E293B] p-4 rounded-2xl shadow-lg hover:shadow-cyan-800/30 hover:scale-[1.02] transition duration-300 relative"
          >
            <h2 className="text-lg font-bold mb-2 pr-8">{event.title}</h2>
            <div className="bg-gradient-to-br from-[#38BDF8] to-[#1E293B] w-full h-32 rounded-xl mb-3" />
            <div className="flex justify-between text-sm font-semibold mb-1">
              <span className="text-green-400">✅ Yes: {event.yes}</span>
              <span className="text-blue-400">❌ No: {event.no}</span>
            </div>
            <p className="text-[#94A3B8] text-sm">Start: {event.startTime}</p>
            <p className="text-[#94A3B8] text-sm mb-6">End: {event.endTime}</p>

            {/* Delete Button */}
            <button
              onClick={() => handleDelete(event._id)}
              className="absolute top-3 right-3 text-red-500 hover:text-red-400"
              title="Delete Event"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </section>

      {/* Modal */}
      {eventDialog && <CreateEvent setEventDialog={setEventDialog} />}
    </div>
  );
}

export default Events;
