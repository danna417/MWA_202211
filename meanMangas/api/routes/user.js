//user routes
const express = require("express");
const router = express.Router();
const userControllers = require(".." + process.env.USER_CONTROLLER_DIR);
const authController = require('../controllers/authentication.controllers');

router.route("/register")
    .post(userControllers.addOneUser);

router.route("/login")
    .post(userControllers.login);

module.exports = router;
