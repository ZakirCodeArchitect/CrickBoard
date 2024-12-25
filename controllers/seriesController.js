const axios = require("axios");

const seriesDetails = async (req, res) => {
  try {
    res.render("seriesInfo"); // renders the seriesDetails Page
  } catch (err) {
    console.log("Failed to Render seriesInfo Page!!!");
    res.status(400).json({
      message: "Failed to Render seriesInfo Page!!!"
    });
  }
};

module.exports = { seriesDetails };
