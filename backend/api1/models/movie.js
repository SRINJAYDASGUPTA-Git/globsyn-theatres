const mongoose=require('mongoose');
const { type } = require('os');

const movieSchema = new mongoose.Schema({
    name: {type:String , required:true},
    duration: {type:Number,required:true},
    genre: {type:String,required:true},
    rel_date: {type:String,required:true},
    cast: {type:String,required:true},
    director: {type:String,required:true},
    imdb_rating: {type:Number,required:true},
    poster:{type:String,required:true},

});

module.exports=mongoose.model('Movie',movieSchema);