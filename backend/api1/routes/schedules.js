const express = require("express");
const router = express.Router();
const Schedule = require("../models/schedule");

/**
 * @swagger
 * components:
 *   schemas:
 *     Schedule:
 *       type: object
 *       required:
 *         - date
 *         - start_time
 *         - end_time
 *         - movie
 *         - screen
 *       properties:
 *         id:
 *           type: string
 *           description: Auto-generated unique identifier
 *         date:
 *           type: string
 *           format: date
 *           description: Date of the schedule
 *         start_time:
 *           type: string
 *           format: time
 *           description: Start time of the schedule
 *         end_time:
 *           type: string
 *           format: time
 *           description: End time of the schedule
 *         movie:
 *           type: string
 *           description: ID of the Movie associated with the schedule
 *         screen:
 *           type: string
 *           description: ID of the screen associated with the schedule
 *       example:
 *         id: "9b8c7d6e5f4a3c2d1e0f9a8b"
 *         date: "2023-12-01"
 *         start_time: "18:00"
 *         end_time: "20:30"
 *         movie: "4a2d6c1f3e78a9b123c456d7"
 *         screen: "7f8e9b2d3c4a5d6e7f8a9b0c"
 *   parameters:
 *     scheduleId:
 *       name: id
 *       in: path
 *       description: ID of the schedule
 *       required: true
 */


/**
 * @swagger
 * tags:
 *  name: Schedules
 *  description: API for managing movie schedules
 */

/**
 * @swagger
 * /schedule:
 *   get:
 *     summary: Retrieve a list of schedules from the database
 *     tags: [Schedules]
 *     description: Get a list of all schedules
 *     responses:
 *       200:
 *         description: A list of schedules
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Schedule'
 */
router.get("/", async (req, res) => {
  try {
    const schedules = await Schedule.find();
    res.status(200).json(schedules);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /schedule/{id}:
 *   get:
 *     summary: Retrieve a schedule by ID
 *     tags: [Schedules]
 *     parameters:
 *      - $ref: '#/components/parameters/scheduleId'
 *     description: Retrieve a specific schedule by ID
 *     responses:
 *       200:
 *         description: The schedule with the specified ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Schedule'
 *       404:
 *         description: The schedule with the specified ID was not found
 */
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

/**
 * @swagger
 * /schedule:
 *   post:
 *     summary: Add a new schedule to the database
 *     tags: [Schedules]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Schedule'
 *     responses:
 *       201:
 *         description: The schedule was successfully added to the database
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Schedule'
 *       500:
 *         description: Some server error
 */
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

/**
 * @swagger
 * /schedule/{id}:
 *   put:
 *     summary: Update a schedule by ID
 *     tags: [Schedules]
 *     parameters:
 *      - $ref: '#/components/parameters/scheduleId'
 *     description: Update a schedule by ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Schedule'
 *     responses:
 *       200:
 *         description: The schedule was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Schedule'
 *       404:
 *         description: The schedule with the specified ID was not found
 *       500:
 *         description: Some server error
 */
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

/**
 * @swagger
 * /schedule/{id}:
 *   delete:
 *     summary: Delete a schedule by ID
 *     tags: [Schedules]
 *     parameters:
 *      - $ref: '#/components/parameters/scheduleId'
 *     description: Delete a schedule by ID
 *     responses:
 *       200:
 *         description: The schedule was successfully deleted
 *       404:
 *         description: The schedule with the specified ID was not found
 *       500:
 *         description: Some server error
 */
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
