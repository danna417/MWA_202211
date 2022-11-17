const mongoose = require("mongoose");
require("./students-model");

mongoose.connect(process.env.DB_URL);

mongoose.connection.on("connected", function(){
    console.log("Mongoose connected to ", process.env.DB_NAME);
});

mongoose.connection.on("disconnected", function() {
    console.log("Mongoose disconnected");
})

mongoose.connection.on("error", function(err) {
    console.error("Mongoose connection error " , err);
})

process.on("SIGINT", function() {
    mongoose.connection.close(function(){
        console.log(process.env.SIGINT_MSG);
        process.exit(0);
    });
});

process.on("SIGUSR2", function() {
    mongoose.connection.close(function(){
        console.log(process.env.SIGUSR2_MSG);
        process.exit(0);
    });
});
