const express = require("express");
const router = express.Router();
const winnerControllers = require(".." + process.env.WINNER_CTRL_DIR);

router.route("/winners")
    .get(winnerControllers.getAll)
    .post(winnerControllers.addOne);

router.route("/winner/:winnerId")
    .get(winnerControllers.getOne)
    .delete(winnerControllers.deleteOne);

module.exports = router;