const express = require("express");
const teams = require("../controllers/teamsController");
const player = require("../controllers/playerController");

const router = express.Router();

router.get("/", teams.teamsDetails);
router.post("/store", teams.insertTeams);

module.exports = router;
