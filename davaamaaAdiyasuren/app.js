require("dotenv").config();
require("./api/data/db");

const express = require("express");
const path = require("path");
const app = express();
const routes = require("./api/routes");
app.use("/", (req, res, next) => {
    res.header("Access-Control-Allow-Origin", 'http://localhost:4200');
    res.header("Access-Control-Allow-headers", 'Origin , X-Requested-With , Content-Type , Accept');
    res.header("Access-Control-Allow-Methods", 'GET , DELETE');
    next();
})
app.use(express.static(path.join(__dirname, '/public')));

app.use("/api", routes);

const server = app.listen(3000, function() {
    console.log("listen", server.address().port);
});