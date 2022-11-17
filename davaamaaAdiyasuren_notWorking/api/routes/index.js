const express = require("express");
const router = express.Router();
const studentsController = require("../controllers/students.controllers");

router.route("/students")
   .get(studentsController.getAll);

router.route("/student/:studentId")
   .get(studentsController.getOne)
   .delete(studentsController.deleteOne);

module.exports = router;