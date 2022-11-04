const _mongoClient = require("mongodb").MongoClient;
let _connection = null;
const open = function(){
    if(get() == null){
        _mongoClient.connect(process.env.DB_URL, function(err, client){
            if(err){
                console.log("DB connection failed");
                return;
            }
            _connection = client.db(process.env.DB_NAME);
            console.log("DB connection open ");
        });
    }
};

const get = function(){
    return _connection
};

module.exports = {
    open : open,
    get : get
};