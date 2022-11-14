const mongoose = require("mongoose");
const winnerSchema =  new mongoose.Schema({
    id: Number,
    firstname : String,
    surname: String,
    born: String,
    died: String,
    bornCountry: String,
    bornCountryCode: String,
    diedCountry: String,
    diedCountryCode: String,
    diedCity: String,
    gender: String,
    year: String,
    category: String,
    motivation: String,
    affiliation: String
});

mongoose.model(process.env.WINNER_MODEL, winnerSchema, process.env.WINNER_COLLECTION_NAME);
