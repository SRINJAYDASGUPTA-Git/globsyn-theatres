const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  start_time: { type: String, required: true }, // Store time as a string in HH:mm format
  end_time: { type: String, required: true }, // Store time as a string in HH:mm format
  movie: { type: mongoose.Schema.Types.ObjectId, ref: "Movie", required: true },
  screen: { type: Number, required: true },
});

const Schedule = mongoose.model("Schedule", scheduleSchema);

module.exports = Schedule