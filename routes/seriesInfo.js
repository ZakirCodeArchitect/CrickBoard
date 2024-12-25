const express = require("express");
const seriesInfo = require("../controllers/seriesController");

const router = express.Router();

router.get("/", seriesInfo.seriesDetails);

module.exports = router;
