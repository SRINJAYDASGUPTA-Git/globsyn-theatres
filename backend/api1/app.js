const express=require('express');
const bodyParser=require('body-parser');
const mongoMovie=require('./mongoose');
const app=express();
app.use(bodyParser.json());
app.post('/movie/add',mongoMovie.addMovie);
app.listen(5000);