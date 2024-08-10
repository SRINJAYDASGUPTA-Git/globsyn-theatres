const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
require('dotenv').config({
  path: './.env.local'
})
const mongoose = require("mongoose");
const USERNAME = process.env.MONGO_INITDB_ROOT_USERNAME;
const PASSWORD = process.env.MONGO_INITDB_ROOT_PASSWORD;
console.log(USERNAME);
mongoose
  .connect(`mongodb://mongodb:27017`)
  .then(() => {
    console.log("Connection established!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

const userRouter = require("./routes/users");
const movieRouter = require("./routes/movies");
const scheduleRouter = require("./routes/schedules");
const ticketRouter = require("./routes/tickets");
const screenRouter = require("./routes/screens");
const authRouter = require("./routes/auth");

const options = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "Globsyn Theatres API",
      description: `API for managing Globsyn Theatres online ticket booking system

Contacts:
- Adrita Chatterjee: adritachatterji@gmail.com
- Anamitra Chandra: anamitrachandra18@gmail.com
- Souraajit Samanta: samantasouraajit@gmail.com
- Srinjay Das Gupta: dasguptasrinjay2004@gmail.com, https://www.srinjaydg.in`,
      contact: {
        name: "Srinjay Das Gupta",
        email: "dasguptasrinjay2004@gmail.com",
      },
      license: {
        name: "MIT License",
        url: "https://opensource.org/licenses/MIT",
      },
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "Development server",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJsDoc(options);

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// AUTH ENDPOINTS
app.use("/auth", authRouter);

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
