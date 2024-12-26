const http = require("https");
const Score = require("../models/scoreModel");
const Series = require("../models/seriesModel");

const scoreBoard = async (req, res) => {
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

  const reqApi = http.request(options, function (apiRes) {
    const chunks = [];

    apiRes.on("data", function (chunk) {
      chunks.push(chunk);
    });

    apiRes.on("end", function () {
      const body = Buffer.concat(chunks);
      try {
        const data = JSON.parse(body.toString());
        // Ensure 'data' exists and is an array before passing to the view
        res.render("scoreBoard", {
          title: "Score Board",
          scoreBoard: data,
          error: null
        });
      } catch (error) {
        // Render with error if parsing fails
        res.render("scoreBoard", {
          title: "Score Board",
          scoreBoard: null,
          error: "Error parsing API response"
        });
      }
    });
  });

  reqApi.on("error", function (err) {
    // Render with error if API request fails
    res.render("scoreBoard", {
      title: "Score Board",
      scoreBoard: null,
      error: "Error making API request",
      details: err
    });
  });

  reqApi.end();
};

// Controller for getting the score board
const storeScoreBoard = async (req, res) => {
  try {
    // Fetch stages data from the database
    let stagesData = await Score.find();

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

      const reqApi = http.request(options, async (apiRes) => {
        const chunks = [];

        apiRes.on("data", (chunk) => {
          chunks.push(chunk);
        });

        apiRes.on("end", async () => {
          const body = Buffer.concat(chunks);
          try {
            const data = JSON.parse(body.toString());
            stagesData = data.Stages;

            // Insert the stages data into MongoDB
            await Score.insertMany(stagesData);
            console.log("Stages data saved to MongoDB");

            // // Render the score board with the fetched data
            // res.render("scoreBoard", {
            //   title: "Score Board",
            //   scoreBoard: stagesData,
            //   error: null
            // });
          } catch (error) {
            // Render error if parsing the API response fails
            // res.render("scoreBoard", {
            //   title: "Score Board",
            //   scoreBoard: null,
            //   error: "Error parsing API response"
            // });
            res.send(error);
          }
        });
      });

      reqApi.on("error", (err) => {
        // // Handle errors from the API request
        // res.render("scoreBoard", {
        //   title: "Score Board",
        //   scoreBoard: null,
        //   error: "Error making API request",
        //   details: err
        // });
        res.send(err.message);
      });

      reqApi.end();
    } else {
      // If stages data is already in the database, render the view
      res.render("scoreBoard", {
        title: "Score Board",
        scoreBoard: stagesData,
        error: null
      });
    }
  } catch (error) {
    // Handle any errors that occur in the controller
    res.render("scoreBoard", {
      title: "Score Board",
      scoreBoard: null,
      error: "Error retrieving score board data",
      details: error
    });
  }
};

// viewing scores from MongoDB
const getScoreBoard = async (req, res) => {
  try {
    // Fetch series whose status is not 'Upcoming'
    const seriesData = await Series.find({ status: { $ne: 'Upcoming' } });

    // Render seriesInfo.ejs with the fetched data
    res.render("scoreBoard", {
      title: "Cricket Series Information", // Title of the page
      seriesData: seriesData, // Pass the data to the view
      error: null // No error message by default
    });
} catch (err) {
    console.error("Error fetching series data:", err);

    // Render seriesInfo.ejs with an error message
    res.render("scoreBoard", {
      title: "Cricket Series Information",
      seriesData: null,
      error: "Failed to retrieve data from the database."
    });
}

};

module.exports = { 
  scoreBoard,
  storeScoreBoard,
  getScoreBoard
};
