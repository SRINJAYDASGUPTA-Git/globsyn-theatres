const express = require("express");
const router = express.Router();
const Schedule = require("../models/schedule");

router.get("/", async (req, res) => {
  try {
    const schedules = await Schedule.find();
    res.status(200).json(schedules);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const schedule = await Schedule.findById(id);
    if (!schedule) {
      return res.status(404).json({ message: "Schedule not found" });
    }
    res.status(200).json(schedule);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  const { date, start_time, end_time, movie, screen } = req.body;
  try {
    const newSchedule = new Schedule({
      date,
      start_time,
      end_time,
      movie,
      screen,
    });
    const result = await newSchedule.save();
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { date, start_time, end_time, movie, screen } = req.body;
  try {
    const schedule = await Schedule.findById(id);
    if (!schedule) {
      return res.status(404).json({ message: "Schedule not found" });
    }
    schedule.date = date || schedule.date;
    schedule.start_time = start_time || schedule.start_time;
    schedule.end_time = end_time || schedule.end_time;
    schedule.movie = movie || schedule.movie;
    schedule.screen = screen || schedule.screen;
    const result = await schedule.save();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const schedule = await Schedule.findById(id);
    if (!schedule) {
      return res.status(404).json({ message: "Schedule not found" });
    }
    await schedule.remove();
    res.status(200).json({ message: "Schedule deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
