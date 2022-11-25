const mongoose = require("mongoose");
const Manga = mongoose.model(process.env.MANGA_MODEL);
const commonUtil = require('./utilties').Common;


module.exports.getAll = function(req,res){
    //commonUtil._debugLog("getAll");

    const response = {
        status : process.env.OK_STATUS_CODE,
        message : {}
    };
    const _query = _queryBuilder(req);
    const _pageVal = _paginationBuilder(req);

    Manga.find(_query).skip(_pageVal.offset).limit(_pageVal.count).exec()
   // .then(() => {})
    .then((manga) => response.message = manga)
    .catch((err) => commonUtil._errorHandler(err,response))
    .finally(() => commonUtil._sendResponse(res, response));
};

// const _isMangaExist = new Promise ((resolve, reject, manga) => {
//     if(manga){
//         resolve();
//     }else{
//         reject();
//     } 
// })
module.exports.getOne = function(req,res){
    commonUtil._debugLog("getOne manga");

    const mangaId = req.params.mangaId;

    const response = {
        status : process.env.OK_STATUS_CODE,
        message : {}
    };

    // if(!mongoose.isValidObjectId(mangaId)){
    //     response.status = process.env.NOT_FOUND_STATUS_CODE;
    //     response.message = process.env.INVALID_ID_JSON_MSG;
    //     commonUtil._sendResponse(res, response);
    // }

    Manga.findById(mangaId).exec()
    .then((manga) => {response.message = manga;})
    .catch((err) => {commonUtil._handleError(err, response);})
    .finally(() => {commonUtil._sendResponse(res, response);});
};

module.exports.addOne = function(req,res){
    console.log("MANGA addOne request");
    const newManga = {
        titles : req.body.titles,
        published : req.body.published,
        status : req.body.status,
        genres : req.body.genres
    }

    Manga.create(newManga, function(err, manga){
        const response = {
            status : process.env.NEW_DATA_STATUS_CODE,
            message : manga
        }
        if(err) {
            console.log("Error creating a new manga", err);
            response.status = process.env.INTERNAL_ERROR_STATUS_CODE;
            response.message = err;
        }
        res.status(parseInt(response.status)).json(response.message);
    })
};


module.exports.fullUpdateOne = function(req,res){
    console.log("fullUpdateOne manga");
    const mangaId = req.params.mangaId;

    if(!mongoose.isValidObjectId(mangaId)){
        res.status(parseInt(process.env.NOT_FOUND_STATUS_CODE))
            .json(process.env.INVALID_ID_JSON_MSG);
    }

    Manga
        .findById(mangaId)
        .exec(function(err, manga) {
        const response = {
            status : process.env.UPDATED_DATA_STATUS_CODE,
            message : manga
        };
        if(err){
            console.log("error found");
            response.status = process.env.INTERNAL_ERROR_STATUS_CODE;
            response.message = err;
        }else if(!manga) {
            console.log("manga not found");
            response.status = process.env.NOT_FOUND_STATUS_CODE;
            response.message = process.env.MANGA_NOT_FOUND_JSON_MSG;
        }
        if(manga){
            manga.titles = req.body.titles;
            manga.published = req.body.published;
            manga.status = req.body.status;
            manga.genres = req.body.genres;
            manga.save(function(err, updatedManga){
                if(err){
                    response.status = process.env.INTERNAL_ERROR_STATUS_CODE;
                    response.message = err;
                }else {
                    response.message = updatedManga;
                }
            });
        }
        res.status(parseInt(response.status)).json(response.message);

    });
};

module.exports.partialUpdateOne = function(req,res){
    console.log("partial manga");
    const mangaId = req.params.mangaId;

    if(!mongoose.isValidObjectId(mangaId)){
        res.status(parseInt(process.env.NOT_FOUND_STATUS_CODE))
            .json(process.env.INVALID_ID_JSON_MSG);
    }

    Manga
        .findById(mangaId)
        .exec(function(err, manga) {
        const response = {
            status : process.env.UPDATED_DATA_STATUS_CODE,
            message : manga
        };
        if(err){
            console.log("error found");
            response.status = process.env.INTERNAL_ERROR_STATUS_CODE;
            response.message = err;
        }else if(!manga) {
            console.log("manga not found");
            response.status = process.env.NOT_FOUND_STATUS_CODE;
            response.message = process.env.MANGA_NOT_FOUND_JSON_MSG;
        }
        if(manga){
            if(req.body.titles) manga.titles = req.body.titles;
            if(req.body.published) manga.published = req.body.published;
            if(req.body.status) manga.status = req.body.status;
            if(req.body.genres) manga.genres = [req.body.genres];
            manga.save(function(err, updatedManga){
                if(err){
                    response.status = process.env.INTERNAL_ERROR_STATUS_CODE;
                    response.message = err;
                }else {
                    response.message = updatedManga;
                }
            });
        }
        res.status(parseInt(response.status)).json(response.message);

    });
};

module.exports.deleteOne = function(req,res){
    console.log("MANGA deleteOne request");
    const mangaId = req.params.mangaId;
    if(!mongoose.isValidObjectId(mangaId)){
        res
        .status(parseInt(process.env.NOT_FOUND_STATUS_CODE))
        .json(process.env.INVALID_ID_JSON_MSG);
    }

    Manga.findByIdAndDelete(mangaId).exec(function(err, deletedManga) {
        const response = {
            status : process.env.UPDATED_DATA_STATUS_CODE,
            message : deletedManga
        };
        if(err){
            console.log("error found");
            response.status = process.env.INTERNAL_ERROR_STATUS_CODE;
            response.message = err;
        }else if(!deletedManga) {
            console.log("manga not found");
            response.status = process.env.NOT_FOUND_STATUS_CODE;
            response.message = process.env.MANGA_NOT_FOUND_JSON_MSG;
        }
        res.status(parseInt(response.status)).json(response.message);

    });
};

/*Internal Functions */

const _queryBuilder = function(req){
    let query = {};
    if (req.query && req.query.title){
        query = {title : new RegExp(req.query.title)};
    }
    return query;
}


const _paginationBuilder = function(req) {
    const _pageVal = {
        offset:  parseInt(process.env.DEFAULT_OFFSET),
        count: parseInt(process.env.DEFAULT_COUNT)
    }
    
    const maxCount = parseInt(process.env.MAX_COUNT);
  
    if (req.query && req.query.offset) {
        _pageVal.offset = parseInt(req.query.offset, parseInt(process.env.DECIMAL_RADIX));
    }

    if(req.query && req.query.count) {
        _pageVal.count = parseInt(req.query.count , parseInt(process.env.DECIMAL_RADIX));
    }

    if(_pageVal.count > maxCount) _pageVal.count = maxCount;
    
    return _pageVal;
    
}