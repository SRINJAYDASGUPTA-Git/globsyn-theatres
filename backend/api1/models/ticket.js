const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true }, // Store time as a string in HH:mm format
  movie: { type: mongoose.Schema.Types.ObjectId, ref: "Movie", required: true },
  schedule: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Schedule",
    required: true,
  },
  screen: { type: Number, required: true },
  seat: { type: [String], required: true },
  tickets: { type: Number, required: true },
  seatType: { type: String, required: true },
  price: { type: Number, required: true },
});

const Ticket = mongoose.model("Ticket", ticketSchema);

module.exports = Ticket;
