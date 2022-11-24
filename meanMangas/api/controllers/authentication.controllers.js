const jwt = require('jsonwebtoken');

const commonUtil = require('./utilties').Common;

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
    const jwtVerifyPromise = util.promisify(jwt.verify, {context: jwt});
    jwtVerifyPromise(token, process.env.JWT_PASS)
        .then(isValid => {
            console.log("verify:", isValid);
            if (isValid) {
                commonUtil._updateResponse(200, "token ok", response);
                resolve();
            } else {
                commonUtil._updateResponse(401, "Unauthorized", response);
                reject();
            }
        })
        .then(() => next())
        .catch(err => commonUtil._handleError(err, response))
}
 
module.exports._verifyToken = (header, response) => {
    return new Promise((resolve, reject) => {
        
        if (header) {
    
        const token = header.split(" ")[1];
            if (jwt.verify(token, process.env.JWT_PASS))
                resolve();
            else {
                commonUtil._updateResponse(498, "Invalid token", response);
                reject();
            }
        } else {
            commonUtil._updateResponse(400, "Bad Request", response);
        }
    })
}

/* Internal functions */