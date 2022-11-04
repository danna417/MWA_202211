const _dbconnection = require("../data/dbconnection");
const objectId = require("mongodb").ObjectId;
module.exports.getAll= function(req, res) {
    const db = _dbconnection.get();
    const gameCollection = db.collection("games");
    let offset = parseInt(process.env.DEFAULT_OFFSETT);
    let count =  parseInt(process.env.DEFAULT_COUNT);
    let maxCount = parseInt(process.env.MAX_COUNT);

    if(req.query && req.query.offset){
        offset = parseInt(req.query.offset, parseInt(process.env.DECIMAL_RADIX));
    }
    if(req.query && req.query.count){
        count = parseInt(req.query.count, parseInt(process.env.DECIMAL_RADIX))
        if(count > maxCount){
            count = maxCount;
        }
    }
    gameCollection.find().skip(offset).limit(count).toArray(function(err, game){
        console.log("found game",game);
        res.status(parseInt(process.env.OK_STATUS_CODE)).json(game);
    });
    
};

module.exports.getOne = function(req,res){

}
