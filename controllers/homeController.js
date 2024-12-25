const axios = require("axios");

const recentEvents = async (req, res) => {
  try {
    res.render("home"); // renders the Home Page
  } catch (err) {
    console.log("Failed to Render Home Page!!!");
    res.status(400).json({
      message: "Failed to Render Home Page!!!"
    });
  }
};

module.exports = { recentEvents };
