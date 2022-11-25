const mongoose = require("mongoose");
const Manga = mongoose.model(process.env.MANGA_MODEL);

module.exports.getAll = function(req,res){
    console.log("getAll author");
    const mangaId = req.params.mangaId;
    if(!mongoose.isValidObjectId(mangaId)){
        res.status(parseInt(process.env.NOT_FOUND_STATUS_CODE))
            .json(process.env.INVALID_ID_JSON_MSG);
    }

    Manga.findById(mangaId).select("authors").exec(function(err, manga) {
        const response = {
            status : process.env.OK_STATUS_CODE,
            message : manga.authors
        };
        if(err){
            console.log("error found");
            response.status = process.env.INTERNAL_ERROR_STATUS_CODE;
            response.message = err;
        }else if(!manga) {
            console.log("author not found");
            response.status = process.env.NOT_FOUND_STATUS_CODE;
            response.message = process.env.AUTHOR_NOT_FOUND_JSON_MSG;
        }
        res.status(parseInt(response.status)).json(response.message);
    });
};

module.exports.getOne = function(req,res){
    console.log("getOne author");
    const mangaId = req.params.mangaId;
    const authorId = req.params.authorId;
    if(!mongoose.isValidObjectId(authorId) || !mongoose.isValidObjectId(mangaId)){
        res.status(parseInt(process.env.NOT_FOUND_STATUS_CODE)).json(process.env.INVALID_ID_JSON_MSG);
    }

    Manga.findById(mangaId).select("authors").exec(function(err, manga) {
        const response = {
            status : process.env.OK_STATUS_CODE,
            message : manga.authors.id(authorId)
        };
        if(err){
            console.log("error found");
            response.status = process.env.INTERNAL_ERROR_STATUS_CODE;
            response.message = err;
        }else if(!manga) {
            console.log("author not found");
            response.status = process.env.NOT_FOUND_STATUS_CODE;
            response.message = process.env.MANGA_NOT_FOUND_JSON_MSG;
        }
        res.status(parseInt(response.status)).json(response.message);
    });
};

module.exports.addOne = function(req,res){
    console.log("Author addOne request");
    const mangaId = req.params.mangaId;
    if(!mongoose.isValidObjectId(mangaId)){
        res.status(parseInt(process.env.NOT_FOUND_STATUS_CODE)).json(process.env.INVALID_ID_JSON_MSG);
    }

    Manga.findById(mangaId).select("authors").exec(function(err, manga) {
        const response = {
            status : process.env.OK_STATUS_CODE,
            message : manga
        };
        if(err){
            console.log("error found");
            response.status = process.env.INTERNAL_ERROR_STATUS_CODE;
            response.message = err;
        }else if(!manga) {
            console.log("author not found");
            response.status = process.env.NOT_FOUND_STATUS_CODE;
            response.message = process.env.MANGA_NOT_FOUND_JSON_MSG;
        }
        if(manga){
            console.log("manga found");

            _addAuthor(req, res, manga);
        }else{
            res.status(parseInt(response.status)).json(response.message);
        }
    });
};

const _addAuthor = function(req, res, manga) {
    console.log("_addAuthor" + req.body);
    const newAuthor = {
        name : req.body.name,
        role : req.body.role
    };
    manga.authors.push(newAuthor);
    manga.save(function(err, updatedManga) {
        console.log("inside save");
        const response = {
            status : process.env.OK_STATUS_CODE,
            message : []
        };
        if(err){
            response.status = process.env.INTERNAL_ERROR_STATUS_CODE;
            response.message = err;
        }else(
            response.status = process.env.NEW_DATA_STATUS_CODE,
            response.message = updatedManga
        )
        res.status(parseInt(response.status)).json(response.message);
    });
};


module.exports.fullUpdateOne = function(req,res){
    console.log("fullUpdateOne author");
    const mangaId = req.params.mangaId;
    const authorId = req.params.authorId;

    if(!mongoose.isValidObjectId(authorId) || !mongoose.isValidObjectId(mangaId)){
        res.status(parseInt(process.env.NOT_FOUND_STATUS_CODE))
            .json(process.env.INVALID_ID_JSON_MSG);
    }
    Manga
        .findById(mangaId)
        .select("authors")
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
            const author = manga.authors.id(authorId);
            if(author){
               author.name = req.body.name;
               author.role = req.body.role;
               manga.save(function(err, updatedManga){
                    if(err) {
                        response.status = process.env.INTERNAL_ERROR_STATUS_CODE;
                        response.message = err;
                    }else {
                        response.message = updatedManga.authors;
                    }
                });
            }
        }
        res.status(parseInt(response.status)).json(response.message);

    });
};


module.exports.partialUpdateOne = function(req,res){
    console.log("partialUpdateOne author");
    const mangaId = req.params.mangaId;
    const authorId = req.params.authorId;

    if(!mongoose.isValidObjectId(authorId) || !mongoose.isValidObjectId(mangaId)){
        res.status(parseInt(process.env.NOT_FOUND_STATUS_CODE))
            .json(process.env.INVALID_ID_JSON_MSG);
    }
    Manga
        .findById(mangaId)
        .select("authors")
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
            const author = manga.authors.id(authorId);
            if(author){
                if(req.body.name) author.name = req.body.name;
                if(req.body.role) author.role = req.body.role;
                manga.save(function(err, updatedManga){
                    if(err) {
                        response.status = process.env.INTERNAL_ERROR_STATUS_CODE;
                        response.message = err;
                    }else {
                        response.message = updatedManga.authors;
                    }
                });
            }
        }
        res.status(parseInt(response.status)).json(response.message);

    });
};


module.exports.deleteOne = function(req,res){
    console.log("Author deleteOne request");
    const mangaId = req.params.mangaId;
    const authorId = req.params.authorId;
    if(!mongoose.isValidObjectId(authorId) || !mongoose.isValidObjectId(mangaId)){
        res.status(parseInt(process.env.NOT_FOUND_STATUS_CODE)).json(process.env.INVALID_ID_JSON_MSG);
    }

    Manga
        .findById(mangaId)
        .select("authors")
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
                console.log("author not found");
                response.status = process.env.NOT_FOUND_STATUS_CODE;
                response.message = process.env.MANGA_NOT_FOUND_JSON_MSG;
            }
            if(manga){
                const author = manga.authors.id(authorId);
                if(author){
                    author.remove();
                    manga.save(function(err, updatedManga){
                        if(err) {
                            response.status = process.env.INTERNAL_ERROR_STATUS_CODE;
                            response.message = err;
                        }else {
                            response.message = updatedManga.authors;
                        }
                    });
                }
            }
            res.status(parseInt(response.status)).json(response.message);
            
        });
};