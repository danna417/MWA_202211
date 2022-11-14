const mongoose = require("mongoose");
const winner = mongoose.model(process.env.WINNER_MODEL);

const _resBuilder = function(err, winner, okStatus) {
    const resVal = {
        status : okStatus,
        msg : winner
    };
    if(err) {
        console.log("error", err);
        resVal.status = process.env.INTERNAL_ERR_STAT_CODE;
        resVal.msg = err;
    }else if(!winner){

        console.log("not found");

        resVal.status = process.env.NOT_FOUND_STAT_CODE;
        resVal.msg = process.env.DATA_NOT_FOUND;
    }

    return resVal;
}

const _paginationBuilder = function(req) {
    const _pageVal = {
        offset:  parseInt(process.env.DEF_OFFSET),
        count: parseInt(process.env.DEF_COUNT)
    }
    
    const maxCount = parseInt(process.env.MAX_COUNT);
  
    if (req.query && req.query.offset) {
        _pageVal.offset = parseInt(req.query.offset, parseInt(process.env.NUM_OF_ROUND));
    }

    if(req.query && req.query.count) {
        _pageVal.count = parseInt(req.query.count , parseInt(process.env.NUM_OF_ROUND));
    }

    if(_pageVal.count > maxCount) _pageVal.count = maxCount;
    
    return _pageVal;
    
}

const _queryBuilder = function(req){
    let query = {};
    if (req.query && req.query.bornCountry){
        query = {bornCountry : new RegExp(req.query.bornCountry)};
    }
    return query;
}
module.exports.getAll = function(req,res) {
    console.log("getAll request");
    const _pageVal = _paginationBuilder(req);
    console.log(" request progress ", _pageVal.count, " ", _pageVal.offset);
    const query = _queryBuilder(req);

    winner.find(query).skip(_pageVal.offset).limit(_pageVal.count).exec(function(err, winners) {
   // winner.find().exec(function(err, winners) {
        console.log("winner");
        const resVal = _resBuilder(err,winners, process.env.OK_STAT_CODE)

        res.status(parseInt(resVal.status)).json(resVal.msg);
    });
    
    //res.status(parseInt(response.status)).json(response.msg);
}

module.exports.getOne = function(req, res) {
    console.log("getOne req");
    const winnerId = req.params.winnerId;

    if(!mongoose.isValidObjectId(winnerId)){
        res.status(parseInt(process.env.INCORRECT_STAT_CODE)).json(process.env.INVALID_ID_MSG);
    }
    winner.findById(winnerId).exec(function(err, winner) {
        const resVal = _resBuilder(err,winner, process.env.OK_STAT_CODE);
        res.status(parseInt(resVal.status)).json(resVal.msg);
    });
}

module.exports.addOne = function(req,res) {
    console.log("addOne req");
    const newWinner = req.body;
    winner.create(newWinner, function(err, winner){
        const resVal = {
            status : process.env.NEW_DATA_STAT_CODE,
            msg : winner
        }

        if(err) {
            resVal.status = process.env.INTERNAL_ERR_STAT_CODE;
            resVal.msg = err;
        }

        res.status(parseInt(resVal.status)).json(resVal.msg);
    })
}

module.exports.deleteOne = function(req,res) {
    console.log("deleteOne req");
    const winnerId = req.params.winnerId;
    
    winner.findByIdAndDelete(winnerId).exec(function(err, deletedWinner){
        const resVal = _resBuilder(err, deletedWinner, process.env.UPDT_DATA_STAT_CODE);

        res.status(parseInt(resVal.status)).json(resVal.msg);
    })
}
