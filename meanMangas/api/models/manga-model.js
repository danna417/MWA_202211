const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema({
    name : {
        type : String
    },
    role : {
        type : [String],
        default : process.env.DEFAULT_AUTHOR_ROLE
    }
});


const titlesSchema = mongoose.Schema({
    japanese : String,
    english : {
        type : String,
        required : true
    }
});

const mangaSchema = mongoose.Schema({
    titles : titlesSchema,
    published : Number,
    status : String,
    genres : [],
    authors : {
        default : [],
        type : [authorSchema]
    }
});


mongoose.model(process.env.MANGA_MODEL, mangaSchema, process.env.COLLECTION_NAME);