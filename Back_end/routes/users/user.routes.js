const router = require("express").Router();
const { body } = require("express-validator");

const userController = require("../../controller/users/users.controller");
const upload = require("../../middleware/upload");

router.post(
  "/users",
  upload.single("profilePicture"),
  [
    body("name")
      .notEmpty()
      .withMessage("username is required.")
      .isLength({ min: 2 })
      .withMessage("username must be at least 2 characters."),
    ,
    body("email")
      .notEmpty()
      .withMessage("Email is required.")
      .isEmail()
      .withMessage("Please provide a valid email."),

    body("password")
      .notEmpty()
      .withMessage("Password is required.")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters."),
  ],
  userController.postUser
);

router.put(
  "/users/:id",
  upload.single("profilePicture"),
  [
    body("name")
      .optional()
      .isLength({ min: 2 })
      .withMessage("Name must be at least 2 characters."),

    body("email")
      .optional()
      .isEmail()
      .withMessage("Please provide a valid email."),

    body("password")
      .optional()
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters."),
  ],
  userController.putUser
);

router.get("/users/:id", userController.getUser);

router.delete("/users/:id", userController.deleteUser);

module.exports = router;
