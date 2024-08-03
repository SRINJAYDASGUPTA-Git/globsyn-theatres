const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  start_time: { type: String, required: true }, 
  end_time: { type: String, required: true }, 
  movie: { type: mongoose.Schema.Types.ObjectId, ref: "Movie", required: true },
  screen: { type: mongoose.Schema.Types.ObjectId, ref: "Screen", required: true },
});

const Schedule = mongoose.model("Schedule", scheduleSchema);

module.exports = Schedule