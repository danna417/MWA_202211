// const dbConnection= require("../data/dbconnection");
// const db= dbConnection.get();
const gamesData = require("../data/games.json");

module.exports.getAllGames= function(req, res) {
    //console.log("db", db);
console.log("GET all games");
res.status(200).json(gamesData);
}
