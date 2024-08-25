const mongoose = require('mongoose');


const seatRangeSchema = new mongoose.Schema({
  type: { type: String, required: true }, 
  startRow: { type: String, required: true }, 
  startNumber: { type: Number, required: true }, 
  endRow: { type: String, required: true }, 
  endNumber: { type: Number, required: true },
  
  filled: {type: Number, required: false, default: 0}
});

const screenSchema = new mongoose.Schema({
  screenNumber: { type: Number, required: true, unique: true },
  totalSeats: { type: Number, required: true },
  seatLayout: { type: [seatRangeSchema], required: true }, 
  description: { type: String },
});

const Screen = mongoose.model('Screen', screenSchema);

module.exports = Screen;
