const mongoose = require("mongoose");
const Manga = mongoose.model(process.env.MANGA_MODEL);

module.exports.getAll = function(req,res){
    console.log("getAll mangas");
    let offset = parseInt(process.env.DEFAULT_OFFSETT);
    let count = parseInt(process.env.DEFAULT_COUNT);
    let maxCount = parseInt(process.env.MAX_COUNT);
    
    if(req.query && req.query.offset){
        offset = parseInt(req.query.offset, parseInt(process.env.DECIMAL_RADIX));
    }
    if(req.query && req.query.count){
        count = parseInt(req.query.count, parseInt(process.env.DECIMAL_RADIX));
    }
    if(count > maxCount) count = maxCount;

    Manga.find().skip(offset).limit(count).exec(function(err, manga) {
        const response = {
            status : process.env.OK_STATUS_CODE,
            message : manga
        };
        if(err){
            console.log("error found");
            response.status = process.env.INTERNAL_ERROR_STATUS_CODE;
            response.message = err;
        }else if(!manga) {
            console.log("game not found");
            response.status = process.env.NOT_FOUND_STATUS_CODE;
            response.message = process.env.MANGA_NOT_FOUND_JSON_MSG;
        }
        res.status(parseInt(response.status)).json(response.message);

    });
};


module.exports.getOne = function(req,res){
    console.log("getOne manga");
    const mangaId = req.params.mangaId;
    if(!mongoose.isValidObjectId(mangaId)){
        res.status(parseInt(process.env.NOT_FOUND_STATUS_CODE))
            .json(process.env.INVALID_ID_JSON_MSG);
    }

    Manga.findById(mangaId).exec(function(err, manga) {
        const response = {
            status : process.env.OK_STATUS_CODE,
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
        res.status(parseInt(response.status)).json(response.message);

    });
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
            console.log("Error creating a new manga");
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

    Manga.findByIdanDelete(mangaId).exec(function(err, deletedManga) {
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