const express = require("express");
const seriesInfo = require("../controllers/seriesController");

const router = express.Router();

router.get("/", seriesInfo.getSeries);
router.get("/store-series", seriesInfo.storeSeriesData);
router.get("/info", seriesInfo.getData);

module.exports = router;
