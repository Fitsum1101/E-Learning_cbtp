const express = require("express");

const router = express.Router();

const questionController = require("../../controller/quetsions/questions.controller");

router.post("/question/course/:courseId", questionController.createQuestion);

module.exports = router;
