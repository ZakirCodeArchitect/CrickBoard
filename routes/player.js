const express = require("express");
const playerController = require("../controllers/playerController");

const router = express.Router();

router.get("/", playerController.playerDetails);

module.exports = router;
