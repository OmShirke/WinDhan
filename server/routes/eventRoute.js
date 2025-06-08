const express = require("express");
const router = express.Router();
const Event = require("../controllers/event.js");

// Create a new event
router.post("/", Event.createEvent);

// Get all events
router.get("/", Event.showEvent);

// Delete an event by ID
router.delete("/:id", Event.deleteEvent);

module.exports = router;
