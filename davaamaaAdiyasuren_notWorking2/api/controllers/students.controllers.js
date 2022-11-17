const mongoose = require("mongoose");
const student = mongoose.model(process.env.MODEL_NAME);

//helpers

const _resBuilder = function(err, student, okStatus){
    const resVal = {
        status : okStatus,
        msg : student
    };

    if(err){
        console.log("error ", err);
        resVal.status = process.env.INTERNAL_ERR_CODE;
        resVal.msg = err;
    }else if(!student){
        resVal.status = process.env.NOT_FOUND_CODE;
        resVal.msg = process.env.NOT_FOUND_MSG;
    }

    return resVal;
}

 const _pagBuilder = function(req) {
    const _pagValue = {
        offset : parseInt(process.env.DEF_OFFSET),
        count : parseInt(process.env.DEF_COUNT)
    }
    if(req.query && req.query.offset){

    }
 }

 module.exports.getAll = function(req, res){
    console.log("getALl student req");
    student.find().exec(function(err, students){
        console.log("select res");
        let resVal = _resBuilder(err,students, process.env.OK_STATUS_CODE);
        res.status(parseInt(resVal.status)).json(resVal.msg);
    })
}



 module.exports.getOne = function(req, res){
    console.log("getOne student req");
    let studentId = "";
    if(req.params && req.params.studentId) studentId = req.params.studentId;

    student.findById(studentId).exec(function(err, student){
        console.log("one select res");
        let resVal = _resBuilder(err,student, process.env.OK_STATUS_CODE);
        res.status(parseInt(resVal.status)).json(resVal.msg);
    })
}

 module.exports.deleteOne = function(req, res){
    console.log("Del student req");
    let studentId = "";
    if(req.params && req.params.studentId) studentId = req.params.studentId;

    student.findByIdAndDelete(studentId).exec(function(err, student){
        console.log("one delete res");
        let resVal = _resBuilder(err,student, process.env.OK_STATUS_CODE);
        res.status(parseInt(resVal.status)).json(resVal.msg);
    })
}

