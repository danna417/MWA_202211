require("dotenv").config();

const express = require("express");
const path = require("path");
const app = express();
const routes = require("./routes");

app.use(function(req, res, next) {
    console.log(req.method, req.url);
    next();
    });

app.use("/pages",express.static(path.join(__dirname, process.env.PUBLIC_DIR)));

app.use("/", routes);

const server = app.listen(process.env.PORT, function(){
    console.log(process.env.MSG_SERVER_START, server.address().port);
});