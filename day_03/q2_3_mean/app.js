const express = require("express");
require("dotenv").config();
const app = express();
const path = require("path");
const router = require("./routes");
app.use(express.static(path.join(__dirname, process.env.PUBLIC_DIR)));
app.use("/", router);
app.listen(process.env.PORT, function(){
    console.log("test");
});