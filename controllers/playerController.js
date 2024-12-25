const axios = require("axios");

const playerDetails = async (req, res) => {
  try {
    res.render("searchPlayer"); // renders the Home Page
  } catch (err) {
    console.log("Failed to Render Players Page!!!");
    res.status(400).json({
      message: "Failed to Render Players Page!!!"
    });
  }
};

module.exports = { playerDetails };
