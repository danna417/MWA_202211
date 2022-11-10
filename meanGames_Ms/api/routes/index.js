//initial variables 
const express = require("express");
const router = express.Router();
const gameControllers = require(".." + process.env.GAMES_CONTROLLER_DIR);

// routing
router.route("/games")
    .get(gameControllers.getAll)
    .post(gameControllers.addOne);

router.route("/game/:gameId")
    .get(gameControllers.getOne)
    .put(gameControllers.fullUpdateOne)
    .patch(gameControllers.partialUpdateOne)
    .delete(gameControllers.deleteOne);

module.exports = router;