const express= require("express");

const router= express.Router();
const employeesController= require("../controllers/employees.controllers");

router.route("/employees")
        .get(employeesController.getAll);

router.route("/employees/:employeeId")
        .get(employeesController.getOne)
        .patch(employeesController.encOne);

module.exports= router;