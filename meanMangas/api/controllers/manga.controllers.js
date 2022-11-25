const mongoose = require("mongoose");
const Manga = mongoose.model(process.env.MANGA_MODEL);
const commonUtil = require('./utilties').Common;


module.exports.getAll = function(req,res){
    //commonUtil._debugLog("getAll");
    const response = commonUtil._buildResBody(process.env.OK_STATUS_CODE, []);

    const _query = _queryBuilder(req);
    const _pageVal = _paginationBuilder(req);

    Manga.find(_query).skip(_pageVal.offset).limit(_pageVal.count)
    .then((mangas) => commonUtil._checkMangaAndUpdateResponse(mangas, response))
    .catch((err) => commonUtil._handleError(err,response))
    .finally(() => commonUtil._sendResponse(res, response));
};

module.exports.getOne = function(req,res){
    commonUtil._debugLog("getOne manga");
    const mangaId = req.params.mangaId;
    const response = commonUtil._buildResBody(process.env.UPDATED_DATA_STATUS_CODE, []);
    
    commonUtil._isValidMangaId(res, response, mangaId);
    
    Manga.findById(mangaId).exec()
    .then((manga) => commonUtil._checkMangaAndUpdateResponse(manga, response))
    .catch((err) => {commonUtil._handleError(err, response);})
    .finally(() => {commonUtil._sendResponse(res, response);});
};

module.exports.addOne = function(req,res){
    commonUtil._debugLog("MANGA addOne request");
    const newManga = _newMangaObjectBuilder(req.body);
    const response = commonUtil._buildResBody(process.env.NOT_FOUND_STATUS_CODE, []);

    Manga.create(newManga)
    .then((manga) => commonUtil._updateResponse(process.env.NEW_DATA_STATUS_CODE,manga, response))
    .catch((err) => {commonUtil._handleError(err, response);})
    .finally(() => {commonUtil._sendResponse(res, response);});
};


module.exports.fullUpdateOne = function(req,res){
    commonUtil._debugLog(this.name)
    const mangaId = req.params.mangaId;
    const response = commonUtil._buildResBody(process.env.UPDATED_DATA_STATUS_CODE, []);

    commonUtil._isValidMangaId(res, response, mangaId);

   _updateManga(mangaId, req,res, response, false);

};

module.exports.partialUpdateOne = function(req,res){
    commonUtil._debugLog(this.name)
    const mangaId = req.params.mangaId;
    const response = commonUtil._buildResBody(process.env.UPDATED_DATA_STATUS_CODE, []);
   
    commonUtil._isValidMangaId(res, response, mangaId);
   
    _updateManga(mangaId, req, res,response, true);
};

module.exports.deleteOne = function(req,res){
    
    commonUtil._debugLog(this.name)
    const mangaId = req.params.mangaId;
    const response = commonUtil._buildResBody(process.env.UPDATED_DATA_STATUS_CODE, []);
   
    commonUtil._isValidMangaId(res, response, mangaId);

    Manga.findByIdAndDelete(mangaId)
    .then((delManga) => _checkManga(delManga, response))
    .catch((err) => {commonUtil._handleError(err, response);})
    .finally(() => {commonUtil._sendResponse(res, response);});
};

/*search and Pagination Functions */
       
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

/*partial and fully update Functions */


const _updateManga = (mangaId, req, res,response, isPartial) => {
    Manga
        .findById(mangaId)
        .then(manga => _checkManga(manga, response))
        .then(manga => _saveManga(req,manga,response,isPartial))
        .catch(err => commonUtil._handleError(err, response))
        .finally(() => commonUtil._sendResponse(res, response));
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
const _saveManga = (req, manga, response, isPartial)=> {

    return new Promise((resolve, reject) => {
        _buildMangaObject(req, manga, isPartial)
        manga.save((err, updatedManga) => {
            if(err){
                commonUtil._updateResponse(process.env.INTERNAL_ERROR_STATUS_CODE, err, response);
                reject();
            }else {
                commonUtil._updateResponse(process.env.OK_STATUS_CODE, updatedManga, response);
                resolve(manga);
            }
        });
    });
}

const _buildMangaObject = (req, manga, isPartial) => {
    if (isPartial) {
        if(req.body.titles) manga.titles = req.body.titles;
        if(req.body.published) manga.published = req.body.published;
        if(req.body.status) manga.status = req.body.status;
        if(req.body.genres) manga.genres = [req.body.genres];
    } else {
        commonUtil._debugLog("2 ",req.body.titles);
        manga.titles = _titleBuiler(req.body);
        manga.published = req.body.published;
        manga.status = req.body.status;
        manga.genres = req.body.genres;
    }
}

const _newMangaObjectBuilder = (reqBody) => {
    return {
        titles : _titleBuiler(reqBody),
        published : reqBody.published,
        status : reqBody.status,
        genres : reqBody.genres
    };
}

const _titleBuiler = (reqBody) => {
    commonUtil._debugLog("_titlebuilder ", reqBody)
    return {
        japanese : reqBody.titles.japanese,
        english : reqBody.titles.english
    };
}



