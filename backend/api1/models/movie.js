const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  name: { type: String, required: true },
  duration: { type: Number, required: true },
  genre: { type: String, required: true },
  rel_date: { type: Date, required: true },
  cast: { type: [String], required: true },
  director: { type: String, required: true },
  imdb_rating: { type: Number, required: true },
  poster: { type: String, required: true },
  language: { type: String, required: true }
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
