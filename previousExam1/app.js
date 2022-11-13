require("dotenv").config();
require("." + process.env.API_DIR + process.env.DB_CONNECTION);

const express = require("express");
const path = require("path");
const routes = require("." + process.env.API_DIR + process.env.ROUTES_DIR);
const app = express();

app.use(function(req,res,next){
    console.log(req.method, req.url);
    next();
}
)
app.use(express.static(path.join(__dirname, process.env.PUBLIC_DIR)));

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use("/api", routes);

const server = app.listen(process.env.PORT, function() {
    console.log(process.env.APP_LISTEN_MSG, server.address().port);
});