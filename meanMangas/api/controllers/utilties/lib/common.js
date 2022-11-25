// DEBUG logs
const mongoose = require("mongoose");

module.exports._debugLog = function(msg, params = ""){
    if((process.env.DEBUG_MODE)){
        console.log(msg, params);
    }
}

module.exports._debugErrorLog = function(msg, errMsg){
    if((process.env.DEBUG_MODE)){
        console.error(msg, errMsg);
    }
}

module.exports._debugWarningLog = function(msg){
    if((process.env.DEBUG_MODE)){
        console.log(msg);
    }
}

//HTTP RESPONSE PREP

module.exports._buildResBody = (status, message) => {
    return {
        status: status,
        message: message
    }
}

module.exports._updateResponse = (status, message, response) => {
    if (status) response.status = status;
    if (message) response.message = message;
}

module.exports._handleError = (err, response) => {
    this._debugErrorLog(err);
    response.status = process.env.INTERNAL_ERROR_STATUS_CODE;
    response.message = err;
}

module.exports._sendResponse = (res, response) => {
    this._debugLog("_sendResponse")
    res.status(parseInt(response.status), parseInt(process.env.DECIMAL_RADIX)).json(response.message);
}

module.exports._checkMangaAndUpdateResponse = (manga, response) => {
    if(!manga) {
        this._debugLog("_checkMangaAndUpdateResponse not found");
        this._updateResponse(process.env.NOT_FOUND_STATUS_CODE ,process.env.MANGA_NOT_FOUND_JSON_MSG, response);
    } else {
        this._debugLog("_checkMangaAndUpdateResponse found");
        this._updateResponse(process.env.OK_STATUS_CODE, manga, response);
    }
}

module.exports._isValidMangaId = (res,response, mangaId) => {

    if(!mongoose.isValidObjectId(mangaId)){
        commonUtil._updateResponse(process.env.NOT_FOUND_STATUS_CODE,process.env.INVALID_ID_JSON_MSG)
        commonUtil._sendResponse(res, response);
    }
}