const http = require("https");

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

module.exports = { scoreBoard };
