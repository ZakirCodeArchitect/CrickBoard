const express = require("express");
const searchPlayerController = require("../controllers/searchPlayerController");

const router = express.Router();

router.get("/", searchPlayerController.searchPlayer);

module.exports = router;
