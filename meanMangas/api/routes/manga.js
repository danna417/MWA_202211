/* manga routes */
const express = require("express");
const router = express.Router();
const mangaControllers = require(".." + process.env.MANGA_CONTROLLER_DIR);
const authorControllers = require(".." + process.env.AUTHOR_CONTROLLER_DIR);
const authController = require('../controllers/authentication.controllers');

router.route("/")
    .get(mangaControllers.getAll)
    .post(authController.authenticate,mangaControllers.addOne);
    

router.route("/:mangaId")
    .get(mangaControllers.getOne)
    .put(authController.authenticate,mangaControllers.fullUpdateOne)
    .patch(authController.authenticate,mangaControllers.partialUpdateOne)
    .delete(authController.authenticate,mangaControllers.deleteOne);

router.route("/:mangaId/author")
    .get(authorControllers.getAll)
    .post(authController.authenticate,authorControllers.addOne)

router.route("/:mangaId/author/:authorId")
    .get(authorControllers.getOne)
    .put(authController.authenticate,authorControllers.fullUpdateOne)
    .patch(authController.authenticate,authorControllers.partialUpdateOne)
    .delete(authController.authenticate,authorControllers.deleteOne);

module.exports = router;
