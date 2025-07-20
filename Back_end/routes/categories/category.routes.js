const router = require("express").Router();
const { body } = require("express-validator");

const courseCategoryController = require("../../controller/categories/categorie.controller");

const validateCategory = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Category name is required.")
    .isLength({ min: 2 })
    .withMessage("Category name must be at least 2 characters."),
];

router.post(
  "/categories",
  validateCategory,
  courseCategoryController.createCourseCategory
);

router.put(
  "/categories/:id",
  validateCategory,
  courseCategoryController.updateCourseCategory
);

router.get("/categories/:id", courseCategoryController.getCourseCategoryById);

router.get("/categories", courseCategoryController.getAllCourseCategories);

router.delete("/categories/:id", courseCategoryController.deleteCourseCategory);

module.exports = router;
