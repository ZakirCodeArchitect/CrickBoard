const express = require("express");
const homeController = require("../controllers/homeController");

const router = express.Router();

router.get("/", homeController.recentEvents);
router.get("/info", homeController.recentEvents);

module.exports = router;
