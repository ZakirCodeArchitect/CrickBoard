const axios = require("axios");

const teamsDetails = async (req, res) => {
  try {
    res.render("teams"); // renders the teams Page
  } catch (err) {
    console.log("Failed to Render teams Page!!!");
    res.status(400).json({
      message: "Failed to Render teams Page!!!"
    });
  }
};

module.exports = { teamsDetails };
