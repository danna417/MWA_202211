const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const user = mongoose.model(process.env.USER_MODEL);


module.exports.register = function(req, res){
    console.log("user register request");
    const newUser = {
        name : req.body.name,
        username : req.body.username,
        password : req.body.password
    }

    user.create(newUser, function(err, user){
        const response = {
            status : process.env.NEW_DATA_STATUS_CODE,
            message : user
        }
        if(err) {
            console.log("Error creating a new game");
            response.status = process.env.INTERNAL_ERROR_STATUS_CODE;
            response.message = err;
        }
        res.status(parseInt(response.status)).json(response.message);
    })
}


module.exports.registerSync = function(req, res){
    console.log("user register Sync request");

    const hashSalt = bcrypt.genSaltSync(parseInt(process.env.NUMBER_OF_ROUND));
    
    console.log("salt ", hashSalt);
    const passHash = bcrypt.hashSync(req.body.password, hashSalt);

    const newUser = {
        name : req.body.name,
        username : req.body.username,
        password : passHash
    }

    user.create(newUser, function(err, user){
        const response = {
            status : process.env.NEW_DATA_STATUS_CODE,
            message : user
        }
        if(err) {
            console.log("Error creating a new game");
            response.status = process.env.INTERNAL_ERROR_STATUS_CODE;
            response.message = err;
        }
        res.status(parseInt(response.status)).json(response.message);
    })
}

module.exports.loginSync = function(req, res) {
    console.log("Login request");
    
    let username = req.body.username;
    let password = req.body.password;
    const response = {
        status : process.env.OK_STATUS_CODE,
        message : process.env.LOGIN_SUCCESSFUL
    }
    user.findOne({username:username}).exec(function(err, user){
        if(err) {
            console.error("Login error", err);
            response.status = process.env.INTERNAL_ERROR_STATUS_CODE;
            response.message = "Error";

        }else{
            if(!user) {
                response.status = process.env.INCORRECT_STATUS_CODE;
                response.message = "Incorrect username or password";
            }else{
                if(bcrypt.compareSync(password, user.password)){
                    console.log("todo check password & JWT");
                }else{
                    console.error("password mismatch");
                    response.status = process.env.INCORRECT_STATUS_CODE;
                    response.message = "Incorrect username or password";
                }
                //use jSON Web Token Module
            }
        }
    res.status(parseInt(response.status)).json(response.message);

})
}
