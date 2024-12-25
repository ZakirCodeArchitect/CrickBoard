// const axios = require("axios");

// const seriesDetails = async (req, res) => {
//   try {
//     res.render("seriesInfo"); // renders the seriesDetails Page
//   } catch (err) {
//     console.log("Failed to Render seriesInfo Page!!!");
//     res.status(400).json({
//       message: "Failed to Render seriesInfo Page!!!"
//     });
//   }
// };

// module.exports = { seriesDetails };

const http = require("https");

const getSeries = (req, res) => {
  const options = {
    method: "GET",
    hostname: "cricket-live-data.p.rapidapi.com",
    port: null,
    path: "/series",
    headers: {
      "x-rapidapi-key": "7276a387c1msh2e7403ed45fc13fp1e2df9jsnee6cf179e4fa",
      "x-rapidapi-host": "cricket-live-data.p.rapidapi.com"
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
        res.render("seriesInfo", {
          title: "Series Information",
          seriesData: data,
          error: null
        });
      } catch (error) {
        // Render with error if parsing fails
        res.render("seriesInfo", {
          title: "Series Information",
          seriesData: null,
          error: "Error parsing API response"
        });
      }
    });
  });

  reqApi.on("error", function (err) {
    // Render with error if API request fails
    res.render("seriesInfo", {
      title: "Home Page",
      seriesData: null,
      error: "Error making API request",
      details: err
    });
  });

  reqApi.end();
};

module.exports = { getSeries };
