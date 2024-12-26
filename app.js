const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

// Files
const home = require("./routes/home");
const scoreBoard = require("./routes/scoreBoard");
const searchPlayer = require("./routes/searchPlayer");
const series = require("./routes/seriesInfo");
const teams = require("./routes/teams");

// Imports
const PORT = process.env.PORT;
const MONGO_DB_URL = process.env.MONGO_DB_URL;

// Requirments
const app = express();
app.set("view engine", "ejs");

// middlewares
app.use(express.json()); // JSON Parsing
app.use(express.static('public'));

// routes
app.use("/", home);
app.use("/scoreBoard", scoreBoard);
app.use("/search", searchPlayer);
app.use("/series", series);
app.use("/teams", teams);

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
