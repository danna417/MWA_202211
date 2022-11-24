const mongoose = require("mongoose");
// console.log("models ", mongoose.models);
const City = mongoose.model(process.env.CITY_MODEL);

const getAll = function (req, res) {
    
    let offset = parseInt(process.env.DEFAULT_FIND_OFFSET, 10);
    let count = parseInt(process.env.DEFAULT_FIND_COUNT, 10);

    if(req.query && req.query.offset){
        offset = parseInt(req.query.offset, 10);
    }

    if(req.query && req.query.count){
        count = parseInt(req.query.count, 10);
    }

    City.find().skip(offset).limit(count).exec(function (err, cities) {
        const response = {
            status: parseInt(process.env.REST_API_OK, 10),
            message: cities
        };
        if (err) {
            response.status= parseInt(process.env.REST_API_SYSTEM_ERROR, 10);
            response.message= err;
        }
        res.status(response.status).json(response.message);
    });
}

const getOne = function (req, res) {
    const cityId = req.params.cityId;
    City.findById(cityId).exec(function (err, city) {
        const response = {
            status: parseInt(process.env.REST_API_OK, 10),
            message: city
        };
        if (err) {
            response.status = parseInt(process.env.REST_API_SYSTEM_ERROR, 10);
            response.message = err;
        } else if (!city) {
            response.status = parseInt(process.env.REST_API_RESOURCE_NOT_FOUND_ERROR, 10);
            response.message = {
                "message": process.env.REST_API_RESOURCE_NOT_FOUND_MESSAGE
            };
        }
        res.status(response.status).json(response.message);
    });
}

const deleteOne = function (req, res) {
    const cityId = req.params.cityId;
    City.findByIdAndDelete(cityId).exec(function (err, city) {
        const response = {
            status: parseInt(process.env.REST_API_OK, 10),
            message: city
        };
        if (err) {
            response.status = parseInt(process.env.REST_API_SYSTEM_ERROR, 10);
            response.message = err;
        } else if (!city) {
            response.status = parseInt(process.env.REST_API_RESOURCE_NOT_FOUND_ERROR, 10);
            response.message = {
                "message": process.env.REST_API_RESOURCE_NOT_FOUND_MESSAGE
            };
        }
        res.status(response.status).json(response.message);
    });
}

module.exports = {
    getAll,
    getOne,
    deleteOne
};