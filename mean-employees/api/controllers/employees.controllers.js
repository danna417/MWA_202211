const mongoose = require("mongoose");
const Employee = mongoose.model(process.env.EMPLOYEEMODEL);
const bcrypt = require("bcrypt");

const _buildPagination = function(req) {
    const pagVal = {
        offset : parseInt(process.env.DEFAULT_FIND_OFFSET),
        count : parseInt(process.env.DEFAULT_FIND_COUNT)
    }
    if (req.query && req.query.offset) {
        pagVal.offset = req.query.offset;
    }
    
    if (req.query && req.query.count) {
        pagVal.count = req.query.count;
    }

    if(pagVal.count > parseInt(process.env.DEFAULT_MAX_FIND_LIMIT)) {
        pagVal.count = parseInt(process.env.DEFAULT_MAX_FIND_LIMIT);
    }
    return pagVal;
}
const _queryBuilder = function(req) {
    let query= {};
    if(req.query && req.query.name) {
        query = {name : new RegExp(req.query.name)};
    }
    return query;
}
const getAll = function (req, res) {
    const _pagVal = _buildPagination(req);
    let _query = _queryBuilder(req);
    console.log("query ", _query);
    Employee.find(_query).skip(_pagVal.offset).limit(_pagVal.count).exec(function (err, employees) {
        const response = {
            status: parseInt(process.env.REST_API_OK, 10),
            message: employees
        };
        if (err) {
            response.status= parseInt(process.env.REST_API_SYSTEM_ERROR, 10);
            response.message= err;
        }
        res.status(response.status).json(response.message);
    });
}

const getOne = function (req, res) {
    const employeeId = req.params.employeeId;
    Employee.findById(employeeId).exec(function (err, employee) {
        const response = {
            status: parseInt(process.env.REST_API_OK, 10),
            message: employee
        };
        if (err) {
            response.status = parseInt(process.env.REST_API_SYSTEM_ERROR, 10);
            response.message = err;
        } else if (!employee) {
            response.status = parseInt(process.env.REST_API_RESOURCE_NOT_FOUND_ERROR, 10);
            response.message = {
                "message": process.env.REST_API_RESOURCE_NOT_FOUND_MESSAGE
            };
        }
        res.status(response.status).json(response.message);
    });
}
const encOne = function (req, res) {
    const employeeId = req.params.employeeId;
    Employee.findById(employeeId).exec(function (err, employee) {
        const response = {
            status: parseInt(process.env.REST_API_OK, 10),
            message: employee
        };
        if (err) {
            response.status = parseInt(process.env.REST_API_SYSTEM_ERROR, 10);
            response.message = err;
        } else if (!employee) {
            response.status = parseInt(process.env.REST_API_RESOURCE_NOT_FOUND_ERROR, 10);
            response.message = {
                "message": process.env.REST_API_RESOURCE_NOT_FOUND_MESSAGE
            };
        }
        if(response.status === parseInt(process.env.REST_API_OK)){
            let salt = bcrypt.genSaltSync(10);
            let hash = bcrypt.hashSync(employee.password, salt);
            employee.password = hash;
            employee.save(function(err, updtEmp){
                if(err) {
                    response.status = parseInt(process.env.REST_API_SYSTEM_ERROR, 10);
                    response.message = err;
                }else{
                    response.message = updtEmp;
                }
            })

        }
        res.status(response.status).json(response.message);
    });
}

module.exports = {
    getAll: getAll,
    getOne: getOne,
    encOne : encOne
};