const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017")
  .then(() => {
    console.log("Connection establised!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

const userRouter = require("./routes/users");
const movieRouter = require("./routes/movies");
const scheduleRouter = require("./routes/schedules");
const ticketRouter = require("./routes/tickets");
const screenRouter = require("./routes/screens");
const app = express();
app.use(bodyParser.json());

// MOVIE ENDPOINTS
app.use("/movie", movieRouter);

// Schedule Endpoints
app.use("/schedule", scheduleRouter);

// User Endpoints
app.use("/user", userRouter);

// Ticket Endpoints
app.use("/ticket", ticketRouter);

// Screen Endpoints
app.use("/screen", screenRouter);

app.listen(5000);
