const dbConnection= require("../data/dbconnection");
const db= dbConnection.get();


module.exports.gamesGetAll= function(req, res) {
    console.log("db", db);
console.log("GET all games");
res.status(200).json(gamesData);
}
