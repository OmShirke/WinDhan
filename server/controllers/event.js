const eventModel = require("../models/eventModel");

const createEvent = async (req, res, next) => {
  try {
    const { title, yes, no, startTime, endTime, description } = req.body;

    if (!title || !yes || !no || !startTime || !endTime || !description) {
      return res.status(400).jsonp({ error: "Please fill all the fields" });
    }

    await title.toLowerCase();
    const alreadyExist = await eventModel.findOne({ title: title });
    if (alreadyExist) {
      return res.status(500).jsonp({ error: "The event already exists" });
    }

    const buffer = Buffer.from(description, "utf-8");

    const event = await eventModel.create({
      title,
      yes: yes / 10,
      no: no / 10,
      filedata: buffer,
      startTime,
      endTime,
    });

    if (event) {
      return res.status(200).jsonp({ message: "The event is created" });
    }
  } catch (error) {
    return res.status(500).jsonp({ error: error.message });
  }
  next();
};

const showEvent = async (req, res, next) => {
  try {
    const events = await eventModel.find();

    if (events) {
      const description = events.map((event, index) => {
        const data = Buffer.from(event.filedata, "base64").toString("utf-8");
        return { id: event._id, data };
      });

      return res.json({ events: events, description: description }).status(200);
    }
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
  next();
};

// ✅ New: Delete Event Controller
const deleteEvent = async (req, res, next) => {
  try {
    const eventId = req.params.id;

    const deleted = await eventModel.findByIdAndDelete(eventId);
    if (!deleted) {
      return res.status(404).json({ error: "Event not found" });
    }

    return res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  createEvent,
  showEvent,
  deleteEvent,
};
