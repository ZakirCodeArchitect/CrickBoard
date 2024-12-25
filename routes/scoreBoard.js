const express = require("express");
const scoreBoardController = require("../controllers/scoreBoardController");

const router = express.Router();

router.get("/", scoreBoardController.scoreBoard);

module.exports = router;
