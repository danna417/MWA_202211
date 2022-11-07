//initial variables 
const express = require("express");
const router = express.Router();
const mangaControllers = require(".." + process.env.MANGA_CONTROLLER_DIR);
const authorControllers = require(".." + process.env.AUTHOR_CONTROLLER_DIR);

// routing

router.route("/manga")
    .get(mangaControllers.getAll)
    .post(mangaControllers.addOne);

router.route("/manga/:mangaId")
    .get(mangaControllers.getOne)
    .put(mangaControllers.fullUpdateOne)
    .patch(mangaControllers.partialUpdateOne)
    .delete(mangaControllers.deleteOne);

router.route("/manga/:mangaId/author")
    .get(authorControllers.getAll)
    .post(authorControllers.addOne)

router.route("/manga/:mangaId/author/:authorId")
    .get(authorControllers.getOne)
    .put(authorControllers.fullUpdateOne)
    .patch(authorControllers.partialUpdateOne)
    .delete(authorControllers.deleteOne);
module.exports = router;