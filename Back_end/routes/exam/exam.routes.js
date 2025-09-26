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

module.exports = router;
