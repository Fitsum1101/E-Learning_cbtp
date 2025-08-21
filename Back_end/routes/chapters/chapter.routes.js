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
        where: {
          title,
          courseId: req.body.courseId,
        },
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
      if (isTitleExists) throw new Error("hi fitsum kifle");
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
];

router.post("/chapter", validateSubChapter, chapterController.createChapter);

router.put("/chapter/:id", validateSubChapter, chapterController.updateChapter);

router.get(
  "/course/:courseId/chapters",
  chapterController.getChapterDataByCourseId
);

module.exports = router;
