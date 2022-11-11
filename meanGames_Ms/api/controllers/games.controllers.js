const mongoose = require("mongoose");
const game = mongoose.model(process.env.GAME_MODEL);

_buildGeoSearchQuery = function(req, res, query){
    const lng = parseFloat(req.query.lng);
    const lat = parseFloat(req.query.lat);
    let maxDist = process.env.DEFAULT_GEOSEARCH_MAX_DIST;
    let minDist = process.env.DEFAULT_GEOSEARCH_MIN_DIST;

    const point = {
        type: "Point",
        coordinates: [lat, lng]
       // coordinates: [lng, lat]
    }
        
 
    if(req.query.maxDist && req.query.minDist){
        maxDist = parseFloat(req.query.maxDist);
        minDist = parseFloat(req.query.minDist);
    }

    query = {
        "publisher.location.coordinates" :{
            $near: {
                $geometry: point,
                $maxDistance : maxDist,
                $minDisctance : minDist
            }
        }
    };

    return query;
};

module.exports.getAll = function(req,res){
    console.log("getAll games");
    let offset = parseInt(process.env.DEFAULT_OFFSETT);
    let count = parseInt(process.env.DEFAULT_COUNT);
    let maxCount = parseInt(process.env.MAX_COUNT);
    let query = {};

    if(req.query && req.query.offset){
        offset = parseInt(req.query.offset, parseInt(process.env.DECIMAL_RADIX));
    }
    if(req.query && req.query.count){
        count = parseInt(req.query.count, parseInt(process.env.DECIMAL_RADIX));
    }
    if(count > maxCount) count = maxCount;

    if(req.query && req.query.lat && req.query.lng) {
        console.log("lng&lat");
        _buildGeoSearchQuery(req, res, query);
    }

    game.find(query).skip(offset).limit(count).exec(function(err, games) {
    //game.find().exec(function(err, games) {
        const response = {
            status : process.env.OK_STATUS_CODE,
            message : games
        };
        if(err){
            console.error("error found", err);
            response.status = process.env.INTERNAL_ERROR_STATUS_CODE;
            response.message = err;
        }else if(!game) {
            console.log("game not found");
            response.status = process.env.NOT_FOUND_STATUS_CODE;
            response.message = process.env.GAME_NOT_FOUND_JSON_MSG;
        }
        res.status(parseInt(response.status)).json(response.message);

    });
};


module.exports.getOne = function(req,res){
    console.log("getOne game");
    const gameId = req.params.gameId;
    if(!mongoose.isValidObjectId(gameId)){
        res.status(parseInt(process.env.NOT_FOUND_STATUS_CODE))
            .json(process.env.INVALID_ID_JSON_MSG);
    }

    game.findById(gameId).exec(function(err, game) {
        const response = {
            status : process.env.OK_STATUS_CODE,
            message : game
        };
        if(err){
            console.log("error found");
            response.status = process.env.INTERNAL_ERROR_STATUS_CODE;
            response.message = err;
        }else if(!game) {
            console.log("game not found");
            response.status = process.env.NOT_FOUND_STATUS_CODE;
            response.message = process.env.GAME_NOT_FOUND_JSON_MSG;
        }
        res.status(parseInt(response.status)).json(response.message);

    });
};

module.exports.addOne = function(req,res){
    console.log("game addOne request");
    const newgame = {
        titles : req.body.titles,
        published : req.body.published,
        status : req.body.status,
        genres : req.body.genres
    }
    game.create(newgame, function(err, game){
        const response = {
            status : process.env.NEW_DATA_STATUS_CODE,
            message : game
        }
        if(err) {
            console.log("Error creating a new game");
            response.status = process.env.INTERNAL_ERROR_STATUS_CODE;
            response.message = err;
        }
        res.status(parseInt(response.status)).json(response.message);
    })
};

module.exports.fullUpdateOne = function(req,res){
    console.log("fullUpdateOne game");
    const gameId = req.params.gameId;

    if(!mongoose.isValidObjectId(gameId)){
        res.status(parseInt(process.env.NOT_FOUND_STATUS_CODE))
            .json(process.env.INVALID_ID_JSON_MSG);
    }

    game
        .findById(gameId)
        .exec(function(err, game) {
        const response = {
            status : process.env.UPDATED_DATA_STATUS_CODE,
            message : game
        };
        if(err){
            console.log("error found");
            response.status = process.env.INTERNAL_ERROR_STATUS_CODE;
            response.message = err;
        }else if(!game) {
            console.log("game not found");
            response.status = process.env.NOT_FOUND_STATUS_CODE;
            response.message = process.env.GAME_NOT_FOUND_JSON_MSG;
        }
        if(game){
            game.titles = req.body.titles;
            game.published = req.body.published;
            game.status = req.body.status;
            game.genres = req.body.genres;
            game.save(function(err, updatedgame){
                if(err){
                    response.status = process.env.INTERNAL_ERROR_STATUS_CODE;
                    response.message = err;
                }else {
                    response.message = updatedgame;
                }
            });
        }
        res.status(parseInt(response.status)).json(response.message);

    });
};

module.exports.partialUpdateOne = function(req,res){
    console.log("partial game");
    const gameId = req.params.gameId;

    if(!mongoose.isValidObjectId(gameId)){
        res.status(parseInt(process.env.NOT_FOUND_STATUS_CODE))
            .json(process.env.INVALID_ID_JSON_MSG);
    }

    game
        .findById(gameId)
        .exec(function(err, game) {
        const response = {
            status : process.env.UPDATED_DATA_STATUS_CODE,
            message : game
        };
        if(err){
            console.log("error found");
            response.status = process.env.INTERNAL_ERROR_STATUS_CODE;
            response.message = err;
        }else if(!game) {
            console.log("game not found");
            response.status = process.env.NOT_FOUND_STATUS_CODE;
            response.message = process.env.GAME_NOT_FOUND_JSON_MSG;
        }
        if(game){
            if(req.body.titles) game.titles = req.body.titles;
            if(req.body.published) game.published = req.body.published;
            if(req.body.status) game.status = req.body.status;
            if(req.body.genres) game.genres = [req.body.genres];
            game.save(function(err, updatedgame){
                if(err){
                    response.status = process.env.INTERNAL_ERROR_STATUS_CODE;
                    response.message = err;
                }else {
                    response.message = updatedgame;
                }
            });
        }
        res.status(parseInt(response.status)).json(response.message);

    });
};

module.exports.deleteOne = function(req,res){
    console.log("game deleteOne request");
    const gameId = req.params.gameId;
    if(!mongoose.isValidObjectId(gameId)){
        res
        .status(parseInt(process.env.NOT_FOUND_STATUS_CODE))
        .json(process.env.INVALID_ID_JSON_MSG);
    }

    game.findByIdAndDelete(gameId).exec(function(err, deletedgame) {
        const response = {
            status : process.env.UPDATED_DATA_STATUS_CODE,
            message : deletedgame
        };
        if(err){
            console.log("error found");
            response.status = process.env.INTERNAL_ERROR_STATUS_CODE;
            response.message = err;
        }else if(!deletedgame) {
            console.log("game not found");
            response.status = process.env.NOT_FOUND_STATUS_CODE;
            response.message = process.env.GAME_NOT_FOUND_JSON_MSG;
        }
        res.status(parseInt(response.status)).json(response.message);

    });
};