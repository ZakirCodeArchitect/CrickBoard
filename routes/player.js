const express = require("express");
const playerController = require("../controllers/playerController");

const router = express.Router();

router.get("/player/:playerName", playerController.getPlayerDetails);

router.post("/store", playerController.insertPlayerDetails);

module.exports = router;
