const mongoose = require('mongoose');
const User = mongoose.model(process.env.USER_MODEL);
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const commonUtil = require('./utilties').Common;


module.exports.addOneUser = (req, res) => {
    // commonUtil._debugLog("addOneUser() executing", req.body);
    const response = commonUtil._createDefaultResponse(process.env.OK_STATUS_CODE, []);
    bcrypt.genSalt(parseInt(process.env.DECIMAL_RADIX))
        .then(salt => _hashPassword(req.body.password, salt))
        .then(passwordHash => _createUser(req, passwordHash))
        .then(user => commonUtil._updateResponse(process.env.OK_STATUS_CODE, user, response))
        .catch(err => commonUtil._handleError(err, response))
        .finally(() => commonUtil._sendResponse(res, response));
}

module.exports.login = (req, res) => {
    // commonUtil._debugLog("login starts");
    // commonUtil._debugLog(req.body);

    const response = commonUtil._createDefaultResponse(process.env.OK_STATUS_CODE, {});

    User.findOne({username: req.body.username})
        .then(user => _checkUserExist(process.env.OK_STATUS_CODE, user, response))
        .then(user => _checkPasswordMatch(req.body.password, user))
        .then(token => commonUtil._updateResponse(process.env.OK_STATUS_CODE, {"success": true, "token": token}, response))
        .then(() => commonUtil._debugLog("login successful user: ", req.body.username))
        .catch(err => commonUtil._handleError(err, response))
        .finally(() => commonUtil._sendResponse(res, response));
}

//* internal functions */

const _createNewUserObject = (req, passwordHash) => {
    return {
        username: req.body.username,
        password: passwordHash
    };
}

const _hashPassword = (password, salt) => {
    // commonUtil._debugLog("_hashPassword() executing");
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, salt)
                .then(passwordHash => resolve(passwordHash))
                .catch(err => reject(err))
    })
}

const _createUser = (req, passwordHash) => {
    // commonUtil._debugLog("_createUser() executing");
    return new Promise((resolve, reject) => {
        const newUser = _createNewUserObject(req, passwordHash);
        User.create(newUser)
            .then(user => resolve(user))
            .catch(err => reject(err));
    });
}

const _checkPasswordMatch = (plainPassword, user) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(plainPassword, user.password, (err, passwordMatch) => {
            if (passwordMatch) {
                const token = jwt.sign({ username: user.username }, process.env.JWT_PASSWORD, {
                    expiresIn: parseInt(process.env.TOKEN_EXPIRES_SECONDS, process.env.DECIMAL_RADIX),
                });
                resolve(token);
            } else {
                reject();
            }
        });
    })
}

const _checkUserExist = (statusOk, user, response) => {
    return new Promise((resolve, reject) => {
        if (!user) {
            commonUtil._updateResponse(process.env.NOT_FOUND_STATUS_CODE, process.env.USER_OR_PWD_WRONG_MSG, response)
            reject();
        } else {
            commonUtil._updateResponse(statusOk, user, response)
            resolve(user);
        }
    });
}
