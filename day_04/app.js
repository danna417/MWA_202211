const express = require("express");
require("dotenv").config();
require("./data/dbconnection.js").open();
const app = express();
const path = require("path");
const routes = require("./routes");

app.use(express.static(path.join(__dirname, process.env.PUBLIC_DIR)));
app.use("/", routes);

app.listen(process.env.PORT, function(){
    console.log("test");
});