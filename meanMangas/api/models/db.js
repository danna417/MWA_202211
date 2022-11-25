const mongoose = require("mongoose");
require("." + process.env.MANGA_MODEL_PATH);
require("." + process.env.USER_MODEL_PATH);

mongoose.connect(process.env.DB_URL);

mongoose.connection.on(process.env.MONGOOSE_CONNECTED, function(){
    console.log(process.env.DB_CONNECTION_START_MSG , process.env.DB_NAME);
});

mongoose.connection.on(process.env.MONGOOSE_DISCONNECTED, function() {
    console.log(process.env.DB_DISCONNECTED_MSG);
});

mongoose.connection.on(process.env.MONGOOSE_ERROR, function(err) {
    console.error(process.env.DB_CONNECTION_ERR_MSG, err);
});

process.on(process.env.PROCESS_SIGINT, function() {
    mongoose.connection.close(function() {
        console.log(process.env.SIGINT_MSG);
        process.exit(0);
    });
});

process.on(process.env.PROCESS_SIGTERM, function() {
    mongoose.connection.close(function() {
        console.log(process.env.SIGTERM_MSG);
        process.exit(0);
    });
});

process.on(process.env.PROCESS_SIGUSR2, function() {
    mongoose.connection.close(function() {
        console.log(process.env.SIGUSR2_MSG);
        process.exit(0);
    });
});

//cant use this
const _connectionClose = function() {
    mongoose.connection.close(function() {
        console.log(process.env.SIGUSR2_MSG);
        process.exit(0);
    });
}
