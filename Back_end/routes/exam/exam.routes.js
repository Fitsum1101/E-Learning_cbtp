const router = require("express").Router();

const examContrller = require("../../controller/exam/exam.controller");

router.post(
  "/exam/course/:courseId",

  examContrller.fillExamQuestion
);

router.get("/exam/course/:courseId", examContrller.getExamQuestions);

router.delete("/exam/question/:questionId", examContrller.deleteExamQuestions);

router.get("/exam/:id/session/current", examContrller.getExamSession);

router.get("/exam/:id/start", examContrller.getExamSessionAtake);

router.post("/exam/:id/session/current", examContrller.AnsweredQuestions);

router.post("/exam/:id/result", examContrller.calculateResult);

module.exports = router;
