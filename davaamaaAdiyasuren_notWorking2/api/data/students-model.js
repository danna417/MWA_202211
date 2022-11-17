const mongoose = require("mongoose");

const studentsSchema = mongoose.Schema({
    ID : Number,
    LastName: String,
    FirstName: String,
    City: String,
    State: String,
    Gender: String,
    StudentStatus: String,
    Major: String,
    Country: String,
    Age: Number,
    SAT: Number,
    'Grade': Number,
    Height: Number
});

mongoose.model(process.env.MODEL_NAME, studentsSchema, process.env.COLLECTION_NAME);