const express= require("express");
const router= express.Router();
const gamesController= require("../controller/games.controller");
router.route("/games")
.get(gamesController.getAllGames);
module.exports = router;
