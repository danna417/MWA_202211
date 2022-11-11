const mongoose = require("mongoose");
const publisherSchema = mongoose.Schema({
    name: String,
    location: {
        coordinates: {
            type: [Number], //[long, lat]
            index: "2dsphere"
        }
     },
    country: String,
    established: Number
});
const gameSchema= mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    year: Number,
    rate: {
        type: Number,
        min: 1,
        max: 5,
        "default": 1
    },
    price : Number,
    minPlayers: {
        type: Number,
        min : 1,
        max: 10
    },
    maxPlayers: {
        type: Number,
        min : 1,
        max: 10
    },
    minAge: Number,
    designers : [String]
    });

mongoose.model(process.env.GAME_MODEL, gameSchema, process.env.COLLECTION_NAME);