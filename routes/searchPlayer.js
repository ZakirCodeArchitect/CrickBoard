const express = require("express");
const searchPlayerController = require("../controllers/searchPlayerController");

const router = express.Router();

router.get("/players/search", searchPlayerController.searchPlayerPage);   // rendering searchPlayer.ejs
router.post("/players/search", searchPlayerController.searhPlayer);     // logic to search player

module.exports = router;
