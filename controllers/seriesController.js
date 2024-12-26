const http = require("https");
const https = require("https");
const Series = require("../models/seriesModel"); // Import the Series model

// getting Data From API
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

// Storing Data in MongoDB
const storeSeriesData = (req, res) => {
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

  const apiReq = https.request(options, (apiRes) => {
    let data = "";

    apiRes.on("data", (chunk) => {
      data += chunk;
    });

    apiRes.on("end", async () => {
      try {
        const responseData = JSON.parse(data);

        // Check if the response contains results and series data
        if (responseData && responseData.results) {
          const allSeriesData = [];

          // Iterate over each result in the response
          responseData.results.forEach((result) => {
            // Extract series details from the result
            result.series.forEach((series) => {
              const seriesDocument = {
                series_id: series.series_id,
                series_name: series.series_name,
                status: series.status || "Not Available", // Handle missing status
                season: series.season
              };
              allSeriesData.push(seriesDocument);
            });
          });

          // Save series data to MongoDB
          await Series.insertMany(allSeriesData);
          console.log("✅ Series Data Saved to MongoDB");

          res
            .status(200)
            .json({ message: "Data successfully saved in database." });
        } else {
          console.error("❌ No data available from API");
          res.status(400).json({ error: "No valid data available from API." });
        }
      } catch (err) {
        console.error("❌ Error Parsing or Saving Data:", err);
        res.status(500).json({ error: "Failed to parse or save series data." });
      }
    });
  });

  apiReq.on("error", (err) => {
    console.error("❌ API Request Error:", err);
    res.status(500).json({ error: "Failed to fetch data from API." });
  });

  apiReq.end();
};

const getData = async (req, res) => {
  try {
    const seriesData = await Series.find(); // Fetch data from the database

    // Render seriesInfo.ejs with the fetched data
    res.render("seriesInfo", {
      title: "Cricket Series Information", // Title of the page
      seriesData: seriesData, // Pass the data to the view
      error: null // No error message by default
    });
  } catch (err) {
    console.error("Error fetching series data:", err);

    // Render seriesInfo.ejs with an error message
    res.render("seriesInfo", {
      title: "Cricket Series Information",
      seriesData: null,
      error: "Failed to retrieve data from the database."
    });
  }
};
module.exports = {
  getSeries,
  storeSeriesData,
  getData
};
