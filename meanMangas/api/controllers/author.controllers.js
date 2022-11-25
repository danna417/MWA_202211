const { response } = require("express");
const mongoose = require("mongoose");
const Manga = mongoose.model(process.env.MANGA_MODEL);
const commonUtil = require('./utilties').Common;

module.exports.getAll = function(req,res){
    commonUtil._debugLog("getAll author");
    const mangaId = req.params.mangaId;
    const response = commonUtil._buildResBody(process.env.OK_STATUS_CODE, []);
     commonUtil._isValidMangaId(res, response, mangaId);

    Manga
        .findById(mangaId)
        .select(process.env.MANGA_AUTHORS)
        .then((manga) => commonUtil._checkMangaAndUpdateResponse(manga.authors, response))
        .catch((err) => commonUtil._handleError(err,response))
        .finally(() => commonUtil._sendResponse(res, response));
};

module.exports.getOne = function(req,res){
    commonUtil._debugLog("getOne author");
    const authorId = req.params.authorId;
    const mangaId = req.params.mangaId;
    const response = commonUtil._buildResBody(process.env.OK_STATUS_CODE, []);
    
    commonUtil._isValidMangaId(res, response, mangaId);
    _isValidAuthorId(res, response, authorId)

    Manga
        .findById(mangaId)
        .select(process.env.MANGA_AUTHORS)
        .then((manga) => commonUtil._checkMangaAndUpdateResponse(manga.authors.id(authorId), response))
        .catch((err) => commonUtil._handleError(err,response))
        .finally(() => commonUtil._sendResponse(res, response));

};

module.exports.addOne = function(req,res){
    commonUtil._debugLog("Author addOne request");
    
    const mangaId = req.params.mangaId;
    const response = commonUtil._buildResBody(process.env.NEW_DATA_STATUS_CODE, []);
    
    commonUtil._isValidMangaId(res, response, mangaId);

    Manga
    .findById(mangaId)
    .select(process.env.MANGA_AUTHORS)
    .then((manga) => _checkManga(manga, response))
    .then((manga) => _addAuthor(req.body, manga, response))
    .catch((err) => commonUtil._handleError(err,response))
    .finally(() => commonUtil._sendResponse(res, response));
    
};


module.exports.fullUpdateOne = function(req,res){
    commonUtil._debugLog("fullUpdateOne author");
    const authorId = req.params.authorId;
    const mangaId = req.params.mangaId;
    const response = commonUtil._buildResBody(process.env.UPDATED_DATA_STATUS_CODE, []);
    
    commonUtil._isValidMangaId(res, response, mangaId);
    _isValidAuthorId(res, response, authorId);

    Manga
    .findById(mangaId)
    .select(process.env.MANGA_AUTHORS)
    .then((manga) => _checkManga(manga, response))
    .then((manga) => _editAuthorFullUpdate(req.body,authorId, manga, response))
    .catch((err) => commonUtil._handleError(err,response))
    .finally(() => commonUtil._sendResponse(res, response));

};


module.exports.partialUpdateOne = function(req,res){
    commonUtil._debugLog("partialUpdateOne author");
    const authorId = req.params.authorId;
    const mangaId = req.params.mangaId;
    const response = commonUtil._buildResBody(process.env.UPDATED_DATA_STATUS_CODE, []);
    
    commonUtil._isValidMangaId(res, response, mangaId);
    _isValidAuthorId(res, response, authorId);

    Manga
    .findById(mangaId)
    .select(process.env.MANGA_AUTHORS)
    .then((manga) => _checkManga(manga, response))
    .then((manga) => _editAuthorPartialUpdate(req.body,authorId, manga, response))
    .catch((err) => commonUtil._handleError(err,response))
    .finally(() => commonUtil._sendResponse(res, response));
};


module.exports.deleteOne = function(req,res){
    commonUtil._debugLog("Author deleteOne request");
    const authorId = req.params.authorId;
    const mangaId = req.params.mangaId;
    const response = commonUtil._buildResBody(process.env.UPDATED_DATA_STATUS_CODE, []);
    
    commonUtil._isValidMangaId(res, response, mangaId);
    _isValidAuthorId(res, response, authorId);

    Manga
    .findById(mangaId)
    .select(process.env.MANGA_AUTHORS)
    .then((manga) => _checkManga(manga, response))
    .then((manga) => _deleteAuthor(authorId, manga, response))
    .catch((err) => commonUtil._handleError(err,response))
    .finally(() => commonUtil._sendResponse(res, response));
};


/* internal functions */

const _addAuthor = function(reqBody,  manga, response) {
    commonUtil._debugLog("_addAuthor" + reqBody);
    manga.authors.push(_newAuthorObjectBuilder(reqBody));
    return new Promise((resolve, reject) => _saveAuthor( manga, response, reject, resolve));
};

const _editAuthorPartialUpdate = function(reqBody,authorId,  manga, response) {
    commonUtil._debugLog("_editAuthorPartialUpdate" + reqBody);
    const author = manga.authors.id(authorId);

    _buildAuthorObject(reqBody,author, true )
    return new Promise((resolve, reject) => _saveAuthor(manga, response, reject, resolve));
};
const _deleteAuthor = function(authorId,  manga, response) {
    commonUtil._debugLog("_editAuthorPartialUpdate" + reqBody);
    const author = manga.authors.id(authorId);
    author.remove();
    return new Promise((resolve, reject) => _saveAuthor(manga, response, reject, resolve));
};


const _editAuthorFullUpdate = function(reqBody,authorId,  manga, response) {
    commonUtil._debugLog("_editAuthorFullUpdate" + reqBody);
    const author = manga.authors.id(authorId);
    _buildAuthorObject(reqBody,author, false )
    return new Promise((resolve, reject) => _saveAuthor(manga, response, reject, resolve));
};


const _isValidAuthorId = (res,response, authorId) => {

    if(!mongoose.isValidObjectId(authorId)){
        commonUtil._updateResponse(process.env.NOT_FOUND_STATUS_CODE,process.env.INVALID_ID_JSON_MSG)
        commonUtil._sendResponse(res, response);
    }
}

const _checkManga = (manga, response) => {
    return new Promise((resolve, reject) => {
        if (!manga) {
            commonUtil._updateResponse(process.env.NOT_FOUND_STATUS_CODE ,process.env.MANGA_NOT_FOUND_JSON_MSG, response);
            reject();
        } else {
            resolve(manga);
        }
    })
}



const _saveAuthor = ( manga, response, reject, resolve)=> {
    manga.save((err, updatedManga) => {
        commonUtil._debugLog("inside save");
        if(err){
            commonUtil._updateResponse(process.env.INTERNAL_ERROR_STATUS_CODE, err, response);
            reject();
        }else{
            commonUtil._updateResponse(process.env.NEW_DATA_STATUS_CODE, updatedManga, response);
            resolve(updatedManga);
        }
    });
}

const _buildAuthorObject = (reqBody, author, isPartial) => {
    if (isPartial) {
        if(reqBody.name)author.name = reqBody.name;
        if(reqBody.role)author.role = reqBody.role;
    } else {
        commonUtil._debugLog("2 ",reqBody.name);
        author.name = reqBody.name;
        author.role = reqBody.role;
    }
}

const _newAuthorObjectBuilder = (reqBody) => {
   return {
        name : reqBody.name,
        role : reqBody.role
    };
}
