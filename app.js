const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const bodyParser = require('body-parser');

// Files
const home = require("./routes/home");
const scoreBoard = require("./routes/scoreBoard");
const searchPlayer = require("./routes/searchPlayer");
const series = require("./routes/seriesInfo");
const teams = require("./routes/teams");
const player = require("./routes/player");

// Imports
const PORT = process.env.PORT;
const MONGO_DB_URL = process.env.MONGO_DB_URL;

// Requirments
const app = express();
app.set("view engine", "ejs");

// middlewares
app.use(express.json()); // JSON Parsing
app.use(express.static('public'));  // for accessing static images and assets from Public folder.
app.use(bodyParser.urlencoded({ extended: true })); // FORM data Parsing

// routes
app.use("/", home);
app.use("/scoreBoard", scoreBoard);
app.use("/", searchPlayer);
app.use("/series", series);
app.use("/teams", teams);
app.use("/", player);  
app.use("/player", player); 

// MongoDB connection
mongoose
  .connect(MONGO_DB_URL)
  .then(() => {
    console.log("MongoDB Connected successfully");
  })
  .catch((err) => {
    console.log("Failed to connect MongoDB", err.message);
  });

// server connection
app.listen(PORT, () => {
  console.log(`Server Running on PORT : ${PORT}`);
});