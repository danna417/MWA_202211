// DEBUG logs
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
    res.status(parseInt(response.status)).json(response.message);
}

module.exports._createDefaultResponse = (status, message) => {
    return {
        status: status,
        message: message
    }
}

module.exports._checkMangaAndUpdateResponse = (manga, message, response) => {
    if(!manga) {
        _updateResponse(process.env.NOT_FOUND_STATUS_CODE ,process.env.MANGA_NOT_FOUND_JSON_MSG, response);
    } else {
        _updateResponse(process.env.OK_STATUS_CODE, message, response);
    }
}
