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

app.use("/api", function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE');
    next();
});

app.use("/api", routes);

const server = app.listen(process.env.APP_PORT, function(){
    console.log(process.env.MSG_SERVER_START, server.address().port);
});