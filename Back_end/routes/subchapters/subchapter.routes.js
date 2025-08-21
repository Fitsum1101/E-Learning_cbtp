const router = require("express").Router();
const db = require("../../config/db");

const subChapterController = require("../../controller/subchapters/subchapters.controller");
const fileUploadHandler = require("../../middleware/upload");

const { body } = require("express-validator");

const validateSubChapter = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isString()
    .withMessage("Title must be a string")
    .custom(async (title, { req }) => {
      const method = req.method;

      let isTitleExists = await db.subChapter.findFirst({
        where: { title },
      });

      if (method === "PUT") {
        isTitleExists = await db.subChapter.findFirst({
          where: {
            NOT: {
              id: req.params.id,
            },
            title,
          },
        });
      }
      if (isTitleExists) throw new Error("sub chapter title aleady exists");
      return true;
    }),

  body("chapterId")
    .trim()
    .notEmpty()
    .withMessage("Chapter ID is required")
    .isUUID()
    .withMessage("Chapter ID must be a valid UUID")
    .custom(async (chapter_id) => {
      const isChapterIdExists = await db.chapter.findUnique({
        where: { id: chapter_id },
      });
      if (!isChapterIdExists) throw new Error("course chapter not exists!");
      return true;
    }),

  body("minute")
    .trim()
    .notEmpty()
    .withMessage("Minute is required")
    .isInt({ min: 0 })
    .withMessage("Minute must be a positive integer"),
];

router.post(
  "/sub-chapter",
  fileUploadHandler("files", ["octet-stream"]).single("course_file"),
  validateSubChapter,
  subChapterController.createSubChapter
);

router.put(
  "/sub-chapter/:id",
  fileUploadHandler("files", ["markdown"]).single("course_file"),
  validateSubChapter,
  subChapterController.updateSubChapter
);

router.delete("/sub-chapter/:id", subChapterController.deleteSubChapter);

router.get("/sub-chapter", subChapterController.getAllSubChapters);

router.get("/sub-chapter/:id", subChapterController.getSubChapterById);

module.exports = router;
