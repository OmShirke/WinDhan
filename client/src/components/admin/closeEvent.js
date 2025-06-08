import React, { useEffect, useState } from "react";

export default function CloseEvent() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState("");
  const [outcome, setOutcome] = useState("no");
  const [message, setMessage] = useState("");

  // Fetch open events for admin to close
  useEffect(() => {
    fetch("http://localhost:5000/api/admin/open-events", {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Open events response:", data);
        setEvents(data);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleClose = async () => {
    if (!selectedEvent) {
      setMessage("Please select an event");
      return;
    }
    try {
      const res = await fetch(
        `http://localhost:5000/api/admin/close-event/${selectedEvent}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ outcome }),
        }
      );
      const data = await res.json();
      if (res.ok) {
        setMessage("Event closed successfully!");
        // Optionally remove the event from the list or refresh
        setEvents(events.filter((e) => e._id !== selectedEvent));
        setSelectedEvent("");
      } else {
        setMessage(data.error || "Failed to close event");
      }
    } catch (err) {
      setMessage("Server error");
    }
  };

  return (
    <div>
      <h2>Close Event</h2>
      {message && <p>{message}</p>}
      <div>
        <label>Select Event:</label>
        <select
          value={selectedEvent}
          onChange={(e) => setSelectedEvent(e.target.value)}
        >
          <option value="">-- Select --</option>
          {events.map((event) => (
            <option key={event._id} value={event._id}>
              {event.title}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Outcome:</label>
        <select value={outcome} onChange={(e) => setOutcome(e.target.value)}>
          <option value="no">No (default)</option>
          <option value="yes">Yes</option>
        </select>
      </div>
      <button onClick={handleClose}>Close Event</button>
    </div>
  );
}
