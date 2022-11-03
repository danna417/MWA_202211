const express = require("express");
const pageController = require("../controllers/pages");
const router = express.Router();

router.route("/").post(pageController.postJson);
router.route("/pages/:pageId").get(pageController.getPage);

module.exports = router;