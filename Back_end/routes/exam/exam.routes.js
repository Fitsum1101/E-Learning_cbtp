const express = require("express");

const examContrller = require("../../controller/exam/exam.controller");

const router = express.Router();

router.post("exam/course/:courseId", examContrller.fillExamQuestion);

router.get("exam/course/:courseId", examContrller.getExamQuestions);

router.delete("exam/question/:questionId", examContrller.deleteExamQuestions);

module.exports = router;
