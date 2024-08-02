const mongoose=require('mongoose');
const { type } = require('os');

const scheduleSchema = new mongoose.Schema({
    date: {type:Date , required:true},
    start_time: {type:Number, required:true},
    end_time: {type:Number,required:true},
    movie: {type:String,required:true},
    screen: {type:Number,required:true},
});

module.exports=mongoose.model('Schedule',scheduleSchema);