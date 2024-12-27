const express = require("express");
const teams = require("../controllers/teamsController");

const router = express.Router();

router.get("/", teams.teamsDetails);
router.post("/store", teams.insertTeams);

module.exports = router;
