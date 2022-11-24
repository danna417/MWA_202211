//initial variables 
const express = require("express");
const router = express.Router();
const mangaRoutes = require("./manga");
const userRoutes = require("./user");

// routing
router.use("/manga", mangaRoutes);
router.use('/user', userRoutes);

module.exports = router;