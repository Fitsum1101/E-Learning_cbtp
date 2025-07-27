const router = require("express").Router();
const { body } = require("express-validator");
const db = require("../../config/db");
const chapterController = require("../../controller/chapters/chapters.controller");

const validateSubChapter = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isString()
    .withMessage("Title must be a string")
    .custom(async (title, { req }) => {
      const method = req.method;

      let isTitleExists = await db.chapter.findFirst({
        where: { title },
      });

      if (method === "PUT") {
        isTitleExists = await db.chapter.findFirst({
          where: {
            courseId: req.body.courseId,
            NOT: [
              {
                id: req.params.id,
              },
            ],
            title,
          },
        });
      }
      if (isTitleExists) throw new Error("chapter title aleady exists");
      return true;
    }),

  body("courseId")
    .trim()
    .notEmpty()
    .withMessage("Chapter ID is required")
    .isUUID()
    .withMessage("Chapter ID must be a valid UUID")
    .custom(async (courseId) => {
      const isCourseExists = await db.course.findUnique({
        where: { id: courseId },
      });
      if (!isCourseExists) throw new Error("course does not exists!");
      return true;
    }),

  body("order")
    .notEmpty()
    .withMessage("Order is required")
    .isInt({ min: 0 })
    .withMessage("Order must be a non-negative integer")
    .custom(async (order, { req }) => {
      let isOrderExistss = await db.chapter.findFirst({
        where: { courseId: req.body.courseId, order },
      });
      const method = req.method;
      if (method === "PUT") {
        isOrderExistss = await db.chapter.findFirst({
          where: {
            courseId: req.body.courseId,
            NOT: [
              {
                id: req.params.id,
              },
            ],
            order,
          },
        });
      }
      if (isOrderExistss) throw new Error(" order number aleady exists");
      return true;
    }),
];

router.post("/chapter", validateSubChapter, chapterController.createChapter);

router.put("/chapter/:id", validateSubChapter, chapterController.updateChapter);

module.exports = router;
