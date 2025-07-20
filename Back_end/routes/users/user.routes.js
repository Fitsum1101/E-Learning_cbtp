const router = require("express").Router();
const { body } = require("express-validator");

const userController = require("../../controller/users/users.controller");
const fileUpload = require("../../middleware/upload");

router.post(
  "/users",
  fileUpload("images").single("profilePicture"),
  (req, res, next) => {
    req.body = req.body.user ? JSON.parse(req.body.user) : req.body;
    next();
  },
  [
    body("userName")
      .isLength({ min: 2 })
      .withMessage("username must be at least 2 characters."),
    ,
    body("firstName")
      .isLength({ min: 2 })
      .withMessage("firstName must be at least 2 characters."),
    body("lastName")
      .isLength({ min: 2 })
      .withMessage("lastName must be at least 2 characters."),
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
  fileUpload("images").single("profilePicture"),
  (req, res, next) => {
    console.log(req.body.user);
    req.body = req.body.user ? JSON.parse(req.body.user) : req.body;
    next();
  },
  [
    body("userName")
      .isLength({ min: 2 })
      .withMessage("username must be at least 2 characters."),
    ,
    body("firstName")
      .isLength({ min: 2 })
      .withMessage("firstName must be at least 2 characters."),
    body("lastName")
      .isLength({ min: 2 })
      .withMessage("lastName must be at least 2 characters."),
    ,
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
