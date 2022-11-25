const jwt = require('jsonwebtoken');
const commonUtil = require('./utilties').Common;
const util = require("util");

module.exports.authenticate = (req, res, next) => {

    const response = commonUtil._buildResBody(process.env.TOKEN_NOT_FOUND_STATUS_CODE, process.env.TOKEN_NOT_FOUND_JSON_MSG);
    const header = req.headers.authorization;
    const headerLength =parseInt(process.env.AUTH_PROPERTIES, parseInt(process.env.DECIMAL_RADIX));
    
    if (!header || header.split(" ").length !== headerLength) {
        commonUtil._updateResponse(process.env.BAD_REQUEST_STATUS_CODE, process.env.BAD_REQ_JSON_MSG, response);
        commonUtil._sendResponse(res, response);
        return;
    }
    
    const token = header.split(" ")[1];
    const jwtVerifyPromise = util.promisify(jwt.verify, {context: jwt});
    jwtVerifyPromise(token, process.env.JWT_PASSWORD)
        .then(isValid => _verifyToken(isValid, response))
        .then(() => next())
        .catch(err => commonUtil._handleError(err, response))
}
 
/* Internal functions */

 const _verifyToken = (isValid, response) => {
    return new Promise((resolve, reject) => {
        if (isValid) {
            commonUtil._updateResponse(process.env.OK_STATUS_CODE, "", response);
            resolve();
        } else {
            commonUtil._updateResponse(process.env.UNAUTH_STATUS_CODE, process.env.UNAUTH_JSON_MSG, response);
            reject();
        }
    })
}
