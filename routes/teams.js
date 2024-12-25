const express = require("express");
const teams = require("../controllers/teamsController");

const router = express.Router();

router.get("/", teams.teamsDetails);

module.exports = router;
