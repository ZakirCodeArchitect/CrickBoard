const http = require("https");
const Score = require("../models/scoreModel");

// viewing scores from MongoDB
const recentEvents = async (req, res) => {
  try {
    // Fetch stages data from the database
    let stagesData = await Score.find();

    // Hardcoded values
    const Snm = "Sample Name"; 
    const Cnm = "Sample Country";
    const Ccd = "Sample Code";
    const hardcodedMessage = "recent mataches played";

    // If the data is not present in the database, fetch from the API
    if (stagesData.length === 0) {
      const options = {
        method: "GET",
        hostname: "cricket-live-data.p.rapidapi.com",
        port: null,
        path: "/v2/search?Category=cricket&Query=pakistan",
        headers: {
          "x-rapidapi-key": "7276a387c1msh2e7403ed45fc13fp1e2df9jsnee6cf179e4fa",
          "x-rapidapi-host": "livescore6.p.rapidapi.com"
        }
      };

      // Make API request
      const reqApi = http.request(options, async (apiRes) => {
        const chunks = [];

        apiRes.on("data", (chunk) => {
          chunks.push(chunk);
        });

        apiRes.on("end", async () => {
          try {
            const body = Buffer.concat(chunks);
            const data = JSON.parse(body.toString());
            stagesData = data.Stages;

            // Insert data into MongoDB
            await Score.insertMany(stagesData);
            console.log("Events data saved to MongoDB");

            // Rendering
            res.render("home", {
              title: "Recent Matches",
              scoreBoard: stagesData,
              Snm,
              Cnm,
              Ccd,
              hardcodedMessage,
              error: null
            });
          } catch (error) {
            res.status(500).send({
              message: "Error parsing API response",
              error: error.message
            });
          }
        });
      });

      reqApi.on("error", (err) => {
        res.status(500).send({
          message: "Error making API request",
          error: err.message
        });
      });

      reqApi.end();
    } else {

      res.render("home", {
        title: "Recent Matches",
        scoreBoard: stagesData,
        Snm,
        Cnm,
        Ccd,
        hardcodedMessage,
        error: null
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error retrieving events data",
      error: error.message
    });
  }
};


module.exports = { recentEvents };
