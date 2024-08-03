const mongoose = require('mongoose')
const Movie = require( './models/movie');
const Schedule = require( './models/schedule');
const Ticket = require( './models/ticket');
const User = require( './models/user');
// import { validationResult } from 'express-validator';

mongoose.connect(
    'mongodb://localhost:27017'
).then(()=>{
    console.log("Connection establised!")
}).catch(()=>{
    console.log("Connection failed!")
});
const addMovie=async(req,res)=>{
    const createMovie= new Movie({
        name: req.body.name,
        duration: req.body.duration,
        genre: req.body.genre,
        rel_date: req.body.rel_date,
        cast: req.body.cast,
        director: req.body.director,
        imdb_rating: req.body.imdb_rating,
        poster: req.body.poster
        
    });
    const result = await createMovie.save();
     
    res.json(result);
};

const addSchedule=async(req,res)=>{
    const createSchedule=new Schedule({
        date: req.body.date,
        start_time: req.body.start_time,
        end_time: req.body.end_time,
        movie: req.body.movie,
        screen:req.body.screen
    });
    const result = await createSchedule.save();
     
    res.json(result);
};

const addTicket = async(req, res) => {
    const createTicket = new Ticket({
        name: req.body.name,
        date: req.body.date,
        time: req.body.time,
        movie:req.body.movie,
        schedule: req.body.schedule,
        screen: req.body.screen,
        seat: req.body.seat,
        seatType: req.body.seatType,
        price: req.body.price,
    });
    
    const result = await createTicket.save();

    res.json(result);
}

const addUser = async (req, res) => {
  const { name, email, phone, password } = req.body;
  const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
  if (existingUser) {
    return res.status(400).json({ message: 'Email or phone number already exists' });
  }

  try {
    const newUser = new User({
      name,
      email,
      phone,
      password
    });

    const result = await newUser.save();
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addUser = addUser;
exports.addMovie = addMovie;
exports.addSchedule = addSchedule;
exports.addTicket = addTicket;