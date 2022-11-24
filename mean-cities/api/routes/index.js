const express= require("express");

const router= express.Router();
const citiesController= require("../controllers/cities.controllers");

router.route("/cities")
        .get(citiesController.getAll);

router.route("/cities/:cityId")
        .get(citiesController.getOne)
        .delete(citiesController.deleteOne);

module.exports= router;