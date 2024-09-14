const express = require("express");
const router = express.Router();
const Movie = require("../models/movie");

/**
 * @swagger
 * components:
 *   schemas:
 *     Movie:
 *       type: object
 *       required:
 *         - name
 *         - duration
 *         - genre
 *         - rel_date
 *         - cast
 *         - director
 *         - imdb_rating
 *         - poster
 *         - language
 *       properties:
 *         id:
 *           type: string
 *           description: Auto-generated unique identifier
 *         name:
 *           type: string
 *           description: Name of the movie
 *         duration:
 *           type: number
 *           description: Duration of the movie in minutes
 *         genre:
 *           type: string
 *           description: Genre of the movie
 *         rel_date:
 *           type: string
 *           format: date
 *           description: Release date of the movie
 *         cast:
 *           type: array
 *           items:
 *             type: string
 *           description: Cast of the movie
 *         director:
 *           type: string
 *           description: Director of the movie
 *         imdb_rating:
 *           type: number
 *           description: IMDb rating of the movie
 *         poster:
 *           type: string
 *           description: URL of the movie poster
 *         language:
 *           type: string
 *           description: Language of the movie
 *       example:
 *         name: "The Shawshank Redemption"
 *         duration: 142
 *         genre: "Drama"
 *         rel_date: "1994-09-23"
 *         cast: 
 *           - "Tim Robbins"
 *           - "Morgan Freeman"
 *         director: "Frank Darabont"
 *         imdb_rating: 9.3
 *         poster: "https://example.com/shawshank_redemption.jpg"
 *         language: "English"
 *   parameters:
 *     movieId:
 *       name: id
 *       in: path
 *       description: ID of the movie
 *       required: true
 * 
 */

/**
 * @swagger
 * tags:
 *  name: Movies
 *  description: API for movies in the database
 */

/**
 * @swagger
 * /movie:
 *   get:
 *     summary: Retrieve a list of movies
 *     tags: [Movies]
 *     description: Retrieve a list of movies from the database
 *     responses:
 *       200:
 *         description: A list of movies
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Movie'
 */

router.get("/", async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /movie/{id}:
 *   get:
 *     summary: Retrieve a movie by ID
 *     tags: [Movies]
 *     parameters:
 *      - $ref: '#/components/parameters/movieId'
 *     description: Retrieve a list of movies from the database
 *     responses:
 *       200:
 *         description: The movie with the specified ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 *       404:
 *        description: The movie with the specified ID was not found
 */

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

/**
 * @swagger
 * /movie:
 *   post:
 *     summary: Add a new movie to the database
 *     tags: [Movies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:  
 *             $ref: '#/components/schemas/Movie'
 *     responses:
 *       201:
 *         description: The movie was successfully added to the database
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 *       500:
 *         description: Some server error 
 */
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

/**
 * @swagger
 * /movie/{id}:
 *   put:
 *     summary: Update a movie by ID
 *     tags: [Movies]
 *     parameters:
 *      - $ref: '#/components/parameters/movieId'
 *     description: Update a movie by ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *          schema:
 *           $ref: '#/components/schemas/Movie'
 *     responses:
 *       200:
 *         description: The movie was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 *       404:
 *        description: The movie with the specified ID was not found
 *       500:
 *        description: Some server error
 */
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

/**
 * @swagger
 * /movie/{id}:
 *   delete:
 *     summary: Delete a movie by ID
 *     tags: [Movies]
 *     parameters:
 *      - $ref: '#/components/parameters/movieId'
 *     description: Delete a movie by ID
 *     responses:
 *       200:
 *        description: The movie was successfully deleted
 *       404:
 *        description: The movie with the specified ID was not found
 *       500:
 *        description: Some server error
 */
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const movie = await Movie.findById(id);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    await Movie.deleteOne({ _id: id });
    res.status(200).json({ message: "Movie deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
