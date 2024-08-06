const express = require("express");
const router = express.Router();
const Movie = require("../models/movie");

router.get("/", async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const movie = await Movie.findById(id);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  const {
    name,
    duration,
    genre,
    rel_date,
    cast,
    director,
    imdb_rating,
    poster,
    language,
  } = req.body;
  try {
    const newMovie = new Movie({
      name,
      duration,
      genre,
      rel_date,
      cast,
      director,
      imdb_rating,
      poster,
      language,
    });
    const result = await newMovie.save();
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const {
    name,
    duration,
    genre,
    rel_date,
    cast,
    director,
    imdb_rating,
    poster,
    language,
  } = req.body;
  try {
    const movie = await Movie.findById(id);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    movie.name = name || movie.name;
    movie.duration = duration || movie.duration;
    movie.genre = genre || movie.genre;
    movie.rel_date = rel_date || movie.rel_date;
    movie.cast = cast || movie.cast;
    movie.director = director || movie.director;
    movie.imdb_rating = imdb_rating || movie.imdb_rating;
    movie.poster = poster || movie.poster;
    movie.language = language || movie.language;
    const result = await movie.save();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const movie = await Movie.findById(id);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    await movie.remove();
    res.status(200).json({ message: "Movie deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
