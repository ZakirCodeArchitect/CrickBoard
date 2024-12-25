const axios = require("axios");

const searchPlayer = async (req, res) => {
  try {
    res.render("searchPlayer"); // renders the Search Player Page
  } catch (err) {
    console.log("Failed to Render Search Player Page!!!");
    res.status(400).json({
      message: "Failed to Render Search Player Page!!!"
    });
  }
};

module.exports = { searchPlayer };
