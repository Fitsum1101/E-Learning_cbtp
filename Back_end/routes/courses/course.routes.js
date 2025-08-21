const router = require("express").Router();
const { body } = require("express-validator");

const courseController = require("../../controller/courses/courses.controller");
const db = require("../../config/db");
const fileUploadHandler = require("../../middleware/upload");

const courseLevels = ["beginner", "intermediate", "advanced"];

const courseValidationRules = [
  body("title").trim().notEmpty().withMessage("Title is required"),

  body("description")
    .trim()
    .notEmpty()
    .withMessage("Description is required")
    .isLength({ min: 150, max: 200 })
    .withMessage("description need to be  between 150 and 200 lettars"),

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

  body("courseLevel")
    .trim()
    .notEmpty()
    .withMessage("Course level is required")
    .isIn(courseLevels)
    .withMessage(
      `Course level must be one of the following: ${courseLevels.join(", ")}`
    ),
];

router.post(
  "/course",
  fileUploadHandler("images", ["png", "jpg", "jpeg"]).single("courseImage"),
  courseValidationRules,
  courseController.createCourse
);

router.put(
  "/course/:id",
  fileUploadHandler("images", ["jpg", "png", "jpeg"]).single("courseImage"),
  (req, res, next) => {
    console.log(req.body);
    req.body = req.body && req.body.course && JSON.parse(req.body.course);
    next();
  },
  courseValidationRules,
  courseController.updateCourse
);

router.get("/course", courseController.getAllCourses);

router.get("/course/:slug", courseController.getCourseBySlug);

router.get("/courses/category", courseController.getCourseByCategory);

router.delete("/course/:id", courseController.deleteCourse);

router.patch(
  "/courses/:courseId/chapters/:chapterId/subchapters/reorder",
  courseController.updateSubChapterOrder
);

module.exports = router;
