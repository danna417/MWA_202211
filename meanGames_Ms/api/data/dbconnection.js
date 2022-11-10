const mongoose = require("mongoose");
require("./games-model");

mongoose.connect(process.env.DB_URL);

mongoose.connection.on("connected", function(){
    console.log(process.env.DB_CONNECTION_START_MSG , process.env.DB_NAME);
});

mongoose.connection.on("disconnected", function() {
    console.log(process.env.DB_DISCONNECTED_MSG);
});

mongoose.connection.on("error", function(err) {
    console.error(process.env.DB_CONNECTION_ERR_MSG, err);
});

process.on("SIGINT", function() {
    mongoose.connection.close(function() {
        console.log(process.env.SIGINT_MSG);
        process.exit(0);
    });
});

process.on("SIGTERM", function() {
    mongoose.connection.close(function() {
        console.log(process.env.SIGTERM_MSG);
        process.exit(0);
    });
});

process.on("SIGUSR2", function() {
    mongoose.connection.close(function() {
        console.log(process.env.SIGUSR2_MSG);
        process.exit(0);
    });
});