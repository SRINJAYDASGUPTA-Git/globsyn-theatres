const mongoose =require('mongoose');
const Movie=require('./models/movie');
const Schedule=require('./models/schedule');
const { validationResult } = require('express-validator');

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

exports.addMovie=addMovie;
exports.addSchedule=addSchedule;