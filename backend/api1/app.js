const express=require('express');
const bodyParser=require('body-parser');
const mongoMovie=require('./mongoose');
const app=express();
app.use(bodyParser.json());
// MOVIE ENDPOINTS
app.post('/movie/add', mongoMovie.addMovie);
app.get('/movie', mongoMovie.getMovies);
app.get('/movie/:id', mongoMovie.getMovieById)


// Schedule Endpoints
app.post('/schedule/add', mongoMovie.addSchedule);
app.get('/schedule', mongoMovie.getSchedules);
app.get('/schedule/:id', mongoMovie.getScheduleById);

// User Endpoints
app.post('/user/add', mongoMovie.addUser);

// Ticket Endpoints
app.post('/ticket/add', mongoMovie.addTicket);

// Scareen Endpoints
app.post('/screen/add', mongoMovie.addScreen);
app.get('/screen', mongoMovie.getScreens);
app.get('/screen/:id', mongoMovie.getScreenByID);


app.listen(5000);