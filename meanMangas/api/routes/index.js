//initial variables 
const express = require("express");
const router = express.Router();
const mangaRoutes = require("." + process.env.MANGA_DIR);
const userRoutes = require("." + process.env.USER_DIR);

// routing
router.use(process.env.MANGA_DIR, mangaRoutes);
router.use(process.env.USER_DIR, userRoutes);

module.exports = router;