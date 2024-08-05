const mongoose = require("mongoose");
const Movie = require("./models/movie");
const Schedule = require("./models/schedule");
const Ticket = require("./models/ticket");
const User = require("./models/user");
const Screen = require("./models/screen");
// import { validationResult } from 'express-validator';

mongoose
  .connect("mongodb://localhost:27017")
  .then(() => {
    console.log("Connection establised!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });
const addMovie = async (req, res) => {
  const createMovie = new Movie({
    name: req.body.name,
    duration: req.body.duration,
    genre: req.body.genre,
    rel_date: req.body.rel_date,
    cast: req.body.cast,
    director: req.body.director,
    imdb_rating: req.body.imdb_rating,
    poster: req.body.poster,
  });
  const result = await createMovie.save();

  res.json(result);
};

const getMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMovieById = async (req, res) => {
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
};

const addSchedule = async (req, res) => {
  const createSchedule = new Schedule({
    date: req.body.date,
    start_time: req.body.start_time,
    end_time: req.body.end_time,
    movie: req.body.movie,
    screen: req.body.screen,
  });
  const result = await createSchedule.save();

  res.json(result);
};

const getSchedules = async (req, res) => {
  try {
    const schedules = await Schedule.find();
    res.status(200).json(schedules);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getScheduleById = async(req, res) => {
    const { id } = req.params;
    try {
      const schedule = await Schedule.findById(id);
      if (!schedule) {
        return res.status(404).json({ message: "Schedule not found" });
      }
      res.status(200).json(schedule);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
}

const updateSchedule = async (req, res) => {
  const { id } = req.params;
  const { date, start_time, end_time, movie, screen } = req.body;
  try {
    const schedule = await Schedule.findById(id);
    if (!schedule) {
      return res.status(404).json({ message: "Schedule not found" });
    }

    schedule.date = date || schedule.date;
    schedule.start_time = start_time || schedule.start_time;
    schedule.end_time = end_time || schedule.end_time;
    schedule.movie = movie || schedule.movie;
    schedule.screen = screen || schedule.screen;

    const result = await schedule.save();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addTicket = async (req, res) => {
  const createTicket = new Ticket({
    name: req.body.name,
    date: req.body.date,
    time: req.body.time,
    movie: req.body.movie,
    schedule: req.body.schedule,
    screen: req.body.screen,
    seat: req.body.seat,
    seatType: req.body.seatType,
    price: req.body.price,
  });

  const result = await createTicket.save();

  res.json(result);
};

const getTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const getTicketById = async (req, res) => {
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
}

const addUser = async (req, res) => {
  const { name, email, phone, password } = req.body;
  const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
  if (existingUser) {
    return res
      .status(400)
      .json({ message: "Email or phone number already exists" });
  }

  try {
    const newUser = new User({
      name,
      email,
      phone,
      password,
    });

    const result = await newUser.save();
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, password } = req.body;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.phone = phone || user.phone;
    user.password = password || user.password;

    await user.save();

    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const addScreen = async (req, res) => {
  const { screenNumber, totalSeats, seatLayout, description } = req.body;

  // Check if all required fields are provided
  if (!screenNumber || !totalSeats || !seatLayout) {
    return res.status(400).json({
      message: "Screen number, total seats, and seat layout are required",
    });
  }

  try {
    // Check if the screen already exists
    const existingScreen = await Screen.findOne({ screenNumber });
    if (existingScreen) {
      return res.status(400).json({ message: "Screen number already exists" });
    }

    // Create a new screen if it does not exist
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
};

const getScreens = async (req, res) => {
  try {
    const screens = await Screen.find();
    res.status(200).json(screens);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getScreenById = async (req, res) => {
  const { id } = req.params;
  try {
    const screen = await Screen.findById(id);
    if (!screen) {
      return res.status(404).json({ message: "Screen not found" });
    }
    res.status(200).json(screen);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addScreen = addScreen;
exports.addUser = addUser;
exports.addMovie = addMovie;
exports.addSchedule = addSchedule;
exports.addTicket = addTicket;
exports.getMovies = getMovies;
exports.getMovieById = getMovieById;
exports.getScreens = getScreens;
exports.getScreenByID = getScreenById;
exports.getSchedules = getSchedules
exports.getScheduleById = getScheduleById
exports.getTickets = getTickets
exports.getTicketByID = getTicketById
exports.getUsers = getUsers;
exports.getUserByID = getUserById;
exports.updateSchedule = updateSchedule;
exports.updateUser = updateUser;