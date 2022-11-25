/*
    application setup
*/

require("dotenv").config();
require("." + process.env.API_DIR + process.env.MODEL_DIR );
const path = require("path");
const express = require("express");
const routes = require("." + process.env.API_DIR +  process.env.ROUTES_DIR);
const app = express();

app.use("/", (req, res, next) => {
    console.log(req.method, req.url );
    next();
})

app.use(express.static(path.join(__dirname,process.env.PUBLIC_DIR)));
app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.use(process.env.API_DIR, function(req, res, next) {
    res.header(process.env.HTTP_HEADER_ALLOW_ORIGIN, process.env.ANGULAR_APP_URL);
    res.header(process.env.HTTP_HEADER_ALLOW_HEADERS, process.env.ALLOWED_HEADERS);
    res.header(process.env.HTTP_HEADER_ALLOW_METHODS, process.env.ALLOWED_METHODS);
    next();
});

app.use(process.env.API_DIR, routes);

const server = app.listen(process.env.APP_PORT, function(){
    console.log(process.env.MSG_SERVER_START, server.address().port);
});