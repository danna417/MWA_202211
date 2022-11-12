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

module.exports.login = function(req, res) {
console.log("Login request");
let username = req.body.username;
let password = req.body.password;
const response = {
status : process.env.OK_STATUS_CODE,
message : "login Successfull"
}
user.findOne({username:username}).exec(function(err, user){
if(err) {
console.error("Login error", err);
response.status = process.env.INTERNAL_ERROR_STATUS_CODE;
    response.message = "Error";

}else{
    if(!user) {
        response.status = 400;
    response.message = "Incorrect username or password";
    }else{
        console.error("todo check password & JWT");
        //use jSON Web Token Module
        //todo encrption

    }
}
res.status(parseInt(response.status)).json(response.message);

})
}
