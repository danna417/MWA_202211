const express= require("express");
const router= express.Router();
const gamesController= require("../controller/games.controller");

router.route("/games")
    .get(gamesController.getAll);

module.exports = router;
