const { body } = require("express-validator");

const express = require("express");

const router = express.Router();

const db = require("../../config/db");

const questionController = require("../../controller/quetsions/questions.controller");

router.post(
  "/question/course/:courseId",
  [
    body("question")
      .trim()
      .notEmpty()
      .withMessage("question can not be empty")
      .isLength({ min: 5 })
      .withMessage("Question needs to be more than 5 digit!"),
    body("options")
      .isArray({ min: 2, max: 6 })
      .withMessage("Options must be an array with items between 2 and 6.")
      .custom((options) => {
        const optionErrors = {};
        console.log(options);
        let count = 0;

        for (let i = 0; i < options.length; i++) {
          let opt = options[i];

          if (opt.isCorrect === true) count++;

          if (opt.text?.length <= 0)
            optionErrors[`option${i + 1}`] =
              "Options cannot be empty or duplicated.";
        }

        if (Object.keys(optionErrors).length > 0) {
          throw { ...optionErrors };
        }

        options.forEach((opt, index) => {
          const optIndex = options.findIndex(
            (op, i) => index !== i && op.text === opt.text
          );

          if (optIndex !== -1)
            throw {
              duplicated: "Options cannot be duplicated",
            };
        });

        if (count === 0) {
          throw {
            answer: "please select one valid answer",
          };
        }
        if (count > 1) {
          throw {
            answer: "oly one answer is needed!",
          };
        }

        return true;
      }),
  ],
  questionController.createQuestion
);

router.put(
  "/questions/:id",
  [
    body("question")
      .trim()
      .notEmpty()
      .withMessage("question can not be empty")
      .isLength({ min: 5 })
      .withMessage("Question needs to be more than 5 digit!")
      .custom(async (question, { req }) => {
        const questionId = req.params.id;
        const courseId = req.body.courseId;
        const isQuestionExists = await db.question.findFirst({
          where: {
            NOT: {
              id: questionId,
            },
            courseId,
            question,
          },
        });
        if (isQuestionExists) {
          throw "question already exists";
        }
        return true;
      }),
    body("options")
      .isArray({ min: 2, max: 6 })
      .withMessage("Options must be an array with items between 2 and 6.")
      .custom((options) => {
        const optionErrors = {};

        let count = 0;

        for (let i = 0; i < options.length; i++) {
          let opt = options[i];

          if (opt.isCorrect === true) count++;

          if (opt.text?.length <= 0)
            optionErrors[`option${i + 1}`] =
              "Options cannot be empty or duplicated.";
        }

        if (Object.keys(optionErrors).length > 0) {
          throw { ...optionErrors };
        }

        options.forEach((opt, index) => {
          const optIndex = options.findIndex(
            (op, i) => index !== i && op.text === opt.text
          );

          if (optIndex !== -1)
            throw {
              duplicated: "Options cannot be duplicated",
            };
        });

        if (count === 0) {
          throw {
            answer: "please select one valid answer",
          };
        }
        if (count > 1) {
          throw {
            answer: "oly one answer is needed!",
          };
        }

        return true;
      }),
  ],
  questionController.updateQuestions
);

router.get("/questions", questionController.getQuestions);

router.get("/questions/:id", questionController.getQuestionBy);

module.exports = router;
