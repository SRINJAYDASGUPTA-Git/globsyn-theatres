const express = require("express");
const router = express.Router();
const Screen = require("../models/screen");

/**
 * @swagger
 * components:
 *   schemas:
 *     SeatRange:
 *       type: object
 *       required:
 *         - type
 *         - startRow
 *         - startNumber
 *         - endRow
 *         - endNumber
 *       properties:
 *         type:
 *           type: string
 *           description: Type of seat range
 *         startRow:
 *           type: string
 *           description: Starting row of the seat range
 *         startNumber:
 *           type: number
 *           description: Starting seat number of the seat range
 *         endRow:
 *           type: string
 *           description: Ending row of the seat range
 *         endNumber:
 *           type: number
 *           description: Ending seat number of the seat range
 *       example:
 *         type: "VIP"
 *         startRow: "A"
 *         startNumber: 1
 *         endRow: "A"
 *         endNumber: 10
 *     Screen:
 *       type: object
 *       required:
 *         - screenNumber
 *         - totalSeats
 *         - seatLayout
 *       properties:
 *         id:
 *           type: string
 *           description: Auto-generated unique identifier
 *         screenNumber:
 *           type: number
 *           description: Number of the screen
 *         totalSeats:
 *           type: number
 *           description: Total number of seats
 *         seatLayout:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/SeatRange'
 *         description:
 *           type: string
 *           description: Description of the screen
 *       example:
 *         screenNumber: 1
 *         totalSeats: 200
 *         seatLayout: 
 *           - type: "Regular"
 *             startRow: "A"
 *             startNumber: 1
 *             endRow: "E"
 *             endNumber: 20
 *         description: "Main screen with regular and VIP seats"
 *   parameters:
 *     screenId:
 *       name: id
 *       in: path
 *       description: ID of the screen
 *       required: true
 */

/**
 * @swagger
 * tags:
 *  name: Screens
 *  description: API for managing movie screens
 */

/**
 * @swagger
 * /screen:
 *   get:
 *     summary: Retrieve a list of screens from the database
 *     tags: [Screens]
 *     description: Get a list of all screens
 *     responses:
 *       200:
 *         description: A list of screens
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Screen'
 */
router.get("/", async (req, res) => {
  try {
    const screens = await Screen.find();
    res.status(200).json(screens);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /screen/{id}:
 *   get:
 *     summary: Retrieve a screen by ID
 *     tags: [Screens]
 *     parameters:
 *      - $ref: '#/components/parameters/screenId'
 *     description: Retrieve a specific screen by ID
 *     responses:
 *       200:
 *         description: The screen with the specified ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Screen'
 *       404:
 *         description: The screen with the specified ID was not found
 */
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const screen = await Screen.findById(id);
    if (!screen) {
      return res.status(404).json({ message: "Screen not found" });
    }
    console.log(screen);
    res.status(200).json(screen);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /screen:
 *   post:
 *     summary: Add a new screen to the database
 *     tags: [Screens]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Screen'
 *     responses:
 *       201:
 *         description: The screen was successfully added to the database
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Screen'
 *       500:
 *         description: Some server error
 */
router.post("/", async (req, res) => {
  const { screenNumber, totalSeats, seatLayout, description } = req.body;
  try {
    const newScreen = new Screen({
      screenNumber,
      totalSeats,
      seatLayout,
      description,
    });
    const result = await newScreen.save();
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /screen/{id}:
 *   put:
 *     summary: Update a screen by ID
 *     tags: [Screens]
 *     parameters:
 *      - $ref: '#/components/parameters/screenId'
 *     description: Update a screen by ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Screen'
 *     responses:
 *       200:
 *         description: The screen was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Screen'
 *       404:
 *         description: The screen with the specified ID was not found
 *       500:
 *         description: Some server error
 */
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { screenNumber, totalSeats, seatLayout, description } = req.body;
  try {
    const screen = await Screen.findById(id);
    if (!screen) {
      return res.status(404).json({ message: "Screen not found" });
    }
    screen.screenNumber = screenNumber || screen.screenNumber;
    screen.totalSeats = totalSeats || screen.totalSeats;
    screen.seatLayout = seatLayout || screen.seatLayout;
    screen.description = description || screen.description;
    const result = await screen.save();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /screen/{id}:
 *   delete:
 *     summary: Delete a screen by ID
 *     tags: [Screens]
 *     parameters:
 *      - $ref: '#/components/parameters/screenId'
 *     description: Delete a screen by ID
 *     responses:
 *       200:
 *         description: The screen was successfully deleted
 *       404:
 *         description: The screen with the specified ID was not found
 *       500:
 *         description: Some server error
 */
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const screen = await Screen.findByIdAndDelete(id);
    if (!screen) {
      return res.status(404).json({ message: "Screen not found" });
    }
    res.status(200).json({ message: "Screen deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
