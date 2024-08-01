const mongoose =require('mongoose');
const Movie=require('./models/movie');
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

exports.addMovie=addMovie;