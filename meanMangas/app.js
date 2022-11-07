/*
    application setup
*/

require("dotenv").config();
require("." + process.env.API_DIR + process.env.MODEL_DIR );
const path = require("path");
const express = require("express");
const routes = require("." + process.env.API_DIR +  process.env.ROUTES_DIR);
const app = express();


app.use(express.static(path.join(__dirname,process.env.PUBLIC_DIR)));
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use("/", routes);

const server = app.listen(process.env.PORT, function(){
    console.log(process.env.MSG_SERVER_START, server.address().port);
});