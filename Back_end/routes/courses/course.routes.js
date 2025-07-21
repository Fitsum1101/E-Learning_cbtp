const router = require("express").Router();
const { body } = require("express-validator");

const courseController = require("../../controller/courses/courses.controller");
const db = require("../../config/db");
const fileUploadHandler = require("../../middleware/upload");

const courseValidationRules = [
  body("title").trim().notEmpty().withMessage("Title is required"),

  body("description").trim().notEmpty().withMessage("Description is required"),

  body("published")
    .optional()
    .isBoolean()
    .withMessage("Published must be a boolean"),

  body("categoryId")
    .notEmpty()
    .withMessage("Category ID is required")
    .isUUID()
    .withMessage("Category ID must be a valid UUID")
    .custom(async (value) => {
      const existing = await db.courseCategory.findFirst({
        where: { id: value },
      });

      if (!existing) {
        throw new Error("Category ID does not exist");
      }

      return true;
    }),
];

router.post(
  "/course",
  fileUploadHandler("images").single("courseImage"),
  (req, res, next) => {
    req.body = req.body && JSON.parse(req.body.course);
    next();
  },
  courseValidationRules,
  courseController.createCourse
);

router.put(
  "/course/:id",
  fileUploadHandler("images").single("courseImage"),
  (req, res, next) => {
    req.body = req.body && JSON.parse(req.body.course);
    next();
  },
  courseValidationRules,
  courseController.updateCourse
);

router.get("/course", courseController.getAllCourses);

router.get("/course/:slug", courseController.getCourseBySlug);

router.delete("/course/:id", courseController.deleteCourse);

module.exports = router;
