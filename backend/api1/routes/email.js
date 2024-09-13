const express = require("express");
const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
const router = express.Router();
require("dotenv").config({
  path: "../.env.local",
});
const transporter = nodemailer.createTransport({
  service: "gmail", // Replace with your email service
  auth: {
    user: "dasguptasrinjay7@gmail.com",
    pass: process.env.APP_PASSWORD,
  },
});

const loadTemplate = (filePath, replacements) => {
  let template = fs.readFileSync(path.resolve(__dirname, filePath), "utf-8");
  for (const key in replacements) {
    template = template.replace(
      new RegExp(`{{${key}}}`, "g"),
      replacements[key]
    );
  }
  return template;
};

/**
 * @swagger
 * components:
 *   schemas:
 *     EmailTicketBody:
 *       type: object
 *       required:
 *         - email
 *         - bookingDetails
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           example: dasguptasrinjay2004@gmail.com
 *         bookingDetails:
 *           $ref: '#/components/schemas/BookingDetails'
 * 
 *     BookingDetails:
 *       type: object
 *       required:
 *         - username
 *         - movieName
 *         - movieLanguage
 *         - bookingDate
 *         - bookingTime
 *         - moviePosterUrl
 *         - numberOfTickets
 *         - seatType
 *         - seatNumbers
 *         - ticketId
 *       properties:
 *         username:
 *           type: string
 *           example: Srinjay Das Gupta
 *         movieName:
 *           type: string
 *           example: The Dark Knight
 *         movieLanguage:
 *           type: string
 *           example: English
 *         bookingDate:
 *           type: string
 *           format: date-time
 *           example: 2024-09-17T00:00:00.000Z
 *         bookingTime:
 *           type: string
 *           example: 1200
 *         moviePosterUrl:
 *           type: string
 *           format: uri
 *           example: https://www.google.com
 *         numberOfTickets:
 *           type: integer
 *           example: 4
 *         seatType:
 *           type: string
 *           example: Platinum
 *         seatNumbers:
 *           type: array
 *           items:
 *             type: string
 *           example:
 *             - A1
 *             - A2
 *             - A3
 *             - A4
 *         ticketId:
 *           type: string
 *           example: 66e1d4cc505c52a43e951916
 *         ticketPrice:
 *           type: number
 *           example: 500
 *         totalPrice:
 *           type: number
 *           example: 2000
 */

/**
 * @swagger
 * tags:
 *  name: EmailConfirmation
 *  description: Send email confirmation to the user after booking tickets
 */

/**
 * @swagger
 * /email/send-email:
 *   post:
 *     summary: Send a booking confirmation email to the user
 *     tags: [EmailConfirmation]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EmailTicketBody'
 *     responses:
 *       200:
 *         description: Email sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Email sent successfully
 *       400:
 *         description: Missing required fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Missing required fields
 *       500:
 *         description: Failed to send email
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Failed to send email
 */
router.post("/send-email", async (req, res) => {
  const { email, bookingDetails } = req.body;

  // Validate incoming data
  if (!email || !bookingDetails) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  // Prepare replacements for the template
  const replacements = {
    userName: bookingDetails.username,
    movieName: bookingDetails.movieName,
    movieLanguage: bookingDetails.movieLanguage,
    bookingDate: bookingDetails.bookingDate,
    bookingTime: bookingDetails.bookingTime,
    moviePosterUrl: bookingDetails.moviePosterUrl,
    numberOfTickets: bookingDetails.numberOfTickets,
    seatType: bookingDetails.seatType,
    seatNumbers: bookingDetails.seatNumbers.join(", "),
    ticketId: bookingDetails.ticketId,
    ticketPrice: bookingDetails.ticketPrice,
    totalPrice: bookingDetails.totalPrice,
  };

  // Load and replace data in the HTML template
  const htmlContent = loadTemplate("email-template.html", replacements);

  const mailOptions = {
    from: "dasguptasrinjay7@gmail.com",
    to: email,
    subject: "Booking Confirmation",
    html: htmlContent, // Set HTML content here
  };

  try {
    // Send email
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Failed to send email" });
  }
});

module.exports = router;
