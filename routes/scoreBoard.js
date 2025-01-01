const express = require("express");
const scoreBoardController = require("../controllers/scoreBoardController");

const router = express.Router();

    router.get("/", scoreBoardController.scoreBoard);
    router.get("/store-score", scoreBoardController.storeScoreBoard);
    router.get("/info", scoreBoardController.getScoreBoard);

module.exports = router;
