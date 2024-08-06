const express = require("express");
const router = express.Router();
const Ticket = require("../models/ticket");

/**
 * @swagger
 * components:
 *   schemas:
 *     TicketRequest:
 *       type: object
 *       required:
 *         - name
 *         - date
 *         - time
 *         - movie
 *         - schedule
 *         - screen
 *         - seat
 *         - seatType
 *         - price
 *       properties:
 *         id:
 *           type: string
 *           description: Auto-generated unique identifier
 *         name:
 *           type: string
 *           description: Name of the ticket holder or event
 *         date:
 *           type: string
 *           format: date
 *           description: Date of the event
 *         time:
 *           type: string
 *           description: Time of the event in HH:mm format
 *         movie:
 *           type: string
 *           description: ID of the movie
 *         schedule:
 *           type: string
 *           description: ID of the schedule
 *         screen:
 *           type: number
 *           description: Screen number
 *         seat:
 *           type: array
 *           items:
 *             type: string
 *           description: List of seat numbers
 *         seatType:
 *           type: string
 *           description: Type of seat (e.g., regular, VIP)
 *         price:
 *           type: number
 *           description: Price of the ticket
 *       example:
 *         name: "John Doe"
 *         date: "2024-08-10"
 *         time: "19:30"
 *         movie: "60c72b2f9e7d3c001f1d1d6f"
 *         schedule: "60c72b2f9e7d3c001f1d1d6f"
 *         screen: 1
 *         seat: ["A12", "A13"]
 *         seatType: "VIP"
 *         price: 25.00
 *     TicketResponse:
 *       type: object
 *       required:
 *         - name
 *         - date
 *         - time
 *         - movie
 *         - schedule
 *         - screen
 *         - seat
 *         - seatType
 *         - price
 *       properties:
 *         id:
 *           type: string
 *           description: Auto-generated unique identifier
 *         name:
 *           type: string
 *           description: Name of the ticket holder or event
 *         date:
 *           type: string
 *           format: date
 *           description: Date of the event
 *         time:
 *           type: string
 *           description: Time of the event in HH:mm format
 *         movie:
 *           type: string
 *           description: ID of the movie
 *         schedule:
 *           type: string
 *           description: ID of the schedule
 *         screen:
 *           type: number
 *           description: Screen number
 *         seat:
 *           type: array
 *           items:
 *             type: string
 *           description: List of seat numbers
 *         seatType:
 *           type: string
 *           description: Type of seat (e.g., regular, VIP)
 *         price:
 *           type: number
 *           description: Price of the ticket
 *       example:
 *         id: "60c72b2f9e7d3c001f1d1d6f"
 *         name: "John Doe"
 *         date: "2024-08-10"
 *         time: "19:30"
 *         movie: "60c72b2f9e7d3c001f1d1d6f"
 *         schedule: "60c72b2f9e7d3c001f1d1d6f"
 *         screen: 1
 *         seat: ["A12", "A13"]
 *         seatType: "VIP"
 *         price: 25.00
 *   parameters:
 *     ticketId:
 *       name: id
 *       in: path
 *       description: ID of the ticket
 *       required: true
 */

/**
 * @swagger
 * tags:
 *  name: Tickets
 *  description: API for tickets in the system
 */

/**
 * @swagger
 * /ticket:
 *   get:
 *     summary: Retrieve a list of tickets from the database
 *     tags: [Tickets]
 *     description: Get a list of all tickets
 *     responses:
 *       200:
 *         description: A list of tickets
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TicketResponse'
 */
router.get("/", async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /ticket/{id}:
 *   get:
 *     summary: Retrieve a ticket by ID
 *     tags: [Tickets]
 *     parameters:
 *      - $ref: '#/components/parameters/ticketId'
 *     description: Retrieve a ticket from the database by its ID
 *     responses:
 *       200:
 *         description: The ticket with the specified ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TicketResponse'
 *       404:
 *         description: The ticket with the specified ID was not found
 */
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const ticket = await Ticket.findById(id);
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }
    res.status(200).json(ticket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /ticket:
 *   post:
 *     summary: Add a new ticket to the database
 *     tags: [Tickets]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TicketRequest'
 *     responses:
 *       201:
 *         description: The ticket was successfully added to the database
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TicketResponse'
 *       500:
 *         description: Some server error
 */
router.post("/", async (req, res) => {
  const { name, date, time, movie, schedule, screen, seat, seatType, price } = req.body;
  try {
    const newTicket = new Ticket({
      name,
      date,
      time,
      movie,
      schedule,
      screen,
      seat,
      seatType,
      price,
    });
    const result = await newTicket.save();
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /ticket/{id}:
 *   put:
 *     summary: Update a ticket by ID
 *     tags: [Tickets]
 *     parameters:
 *      - $ref: '#/components/parameters/ticketId'
 *     description: Update a ticket by ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TicketRequest'
 *     responses:
 *       200:
 *         description: The ticket was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TicketResponse'
 *       404:
 *         description: The ticket with the specified ID was not found
 *       500:
 *         description: Some server error
 */
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, date, time, movie, schedule, screen, seat, seatType, price } = req.body;
  try {
    const ticket = await Ticket.findById(id);
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }
    ticket.name = name || ticket.name;
    ticket.date = date || ticket.date;
    ticket.time = time || ticket.time;
    ticket.movie = movie || ticket.movie;
    ticket.schedule = schedule || ticket.schedule;
    ticket.screen = screen || ticket.screen;
    ticket.seat = seat || ticket.seat;
    ticket.seatType = seatType || ticket.seatType;
    ticket.price = price || ticket.price;
    const result = await ticket.save();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /ticket/{id}:
 *   delete:
 *     summary: Delete a ticket by ID
 *     tags: [Tickets]
 *     parameters:
 *      - $ref: '#/components/parameters/ticketId'
 *     description: Delete a ticket by ID
 *     responses:
 *       200:
 *         description: The ticket was successfully deleted
 *       404:
 *         description: The ticket with the specified ID was not found
 *       500:
 *         description: Some server error
 */
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const ticket = await Ticket.findByIdAndDelete(id);
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }
    res.status(200).json(ticket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
