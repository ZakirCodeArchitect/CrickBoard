const axios = require("axios");

const scoreBoard = async (req, res) => {
  try {
    res.render("scoreBoard"); // renders the Home Page
  } catch (err) {
    console.log("Failed to Render Score Board Page!!!");
    res.status(400).json({
      message: "Failed to Render Score Board Page!!!"
    });
  }
};

module.exports = { scoreBoard };
