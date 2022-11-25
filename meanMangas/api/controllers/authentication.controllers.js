const jwt = require('jsonwebtoken');
const commonUtil = require('./utilties').Common;
const util = require("util");

module.exports.authenticate = (req, res, next) => {

    const response = commonUtil._createDefaultResponse(403, "no token provided");
    const header = req.headers.authorization;
    const headerLength =parseInt(process.env.AUTH_PROPERTIES, parseInt(process.env.DECIMAL_RADIX));
    
    if (!header || header.split(" ").length !== headerLength) {
        commonUtil._updateResponse(400, "Bad Request", response);
        commonUtil._sendResponse(res, response);
        return;
    }
    
    const token = header.split(" ")[1];
    console.log(token);
    const jwtVerifyPromise = util.promisify(jwt.verify, {context: jwt});
    jwtVerifyPromise(token, process.env.JWT_PASSWORD)
        .then(isValid => _verifyToken(isValid, response))
        .then(() => next())
        .catch(err => commonUtil._handleError(err, response))
}
 
 const _verifyToken = (isValid, response) => {
    return new Promise((resolve, reject) => {
        if (isValid) {
            commonUtil._updateResponse(200, "token ok", response);
            console.log(response);
            resolve();
        } else {
            commonUtil._updateResponse(401, "Unauthorized", response);
            reject();
        }
    })
}

/* Internal functions */