const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username : {
        type: String,
        isRequired: true
    },
    password : {
        type: String,
        isRequired: true
    }
});


mongoose.model(process.env.USER_MODEL, userSchema, process.env.USER_COLLECTION);