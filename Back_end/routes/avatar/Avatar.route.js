const { body, param } = require("express-validator");
const express = require("express");

const avatarController = require("../../controller/avatar/Avatar.controller");
const db = require("../../config/db");

const router = express.Router();

const sharedRules = [
  body("name")
    .notEmpty()
    .withMessage("Avatar name is required")
    .isString()
    .withMessage("Avatar name must be a string"),

  body("url")
    .notEmpty()
    .withMessage("Avatar URL is required")
    .isURL()
    .withMessage("Invalid avatar URL"),

  body("minCertificates")
    .optional()
    .isInt({ min: 0 })
    .withMessage("minCertificates must be a non-negative integer"),

  body("minEnrollments")
    .optional()
    .isInt({ min: 0 })
    .withMessage("minEnrollments must be a non-negative integer"),

  body("minCompleted")
    .optional()
    .isInt({ min: 0 })
    .withMessage("minCompleted must be a non-negative integer"),
];

const createAvatarValidator = [
  ...sharedRules,

  body("name").custom(async (value) => {
    const existing = await db.avatar.findFirst({ where: { name: value } });
    console.log({ existing });
    if (existing) throw new Error("Avatar name already exists");
    return true;
  }),

  body("url").custom(async (value) => {
    const isHaveSeed = value.split("=")[1].trim().length > 0;
    console.log({ isHaveSeed });
    if (!isHaveSeed) {
      throw new Error("please instert valid seed value!!");
    }

    const existing = await db.avatar.findFirst({ where: { url: value } });
    if (existing) throw new Error("Avatar URL already exists");
    return true;
  }),
];

const updateAvatarValidator = [
  param("id")
    .notEmpty()
    .withMessage("Avatar ID is required")
    .isUUID()
    .withMessage("Invalid avatar ID format")
    .custom(async (value) => {
      const avatar = await db.avatar.findUnique({ where: { id: value } });
      if (!avatar) {
        throw new Error("Avatar not found");
      }
      return true;
    }),

  ...sharedRules,

  body("name").custom(async (value, { req }) => {
    const existing = await db.avatar.findFirst({
      where: {
        name: value,
        NOT: { id: req.params.id },
      },
    });
    if (existing) throw new Error("Avatar name already exists");
    return true;
  }),

  body("url").custom(async (value, { req }) => {
    const existing = await db.avatar.findFirst({
      where: {
        url: value,
        NOT: { id: req.params.id },
      },
    });
    if (existing) throw new Error("Avatar URL already exists");
    return true;
  }),
];

router.get("/avatar", avatarController.getAvatars);

router.post("/avatar", createAvatarValidator, avatarController.createAvater);

router.get("/avatar/info", avatarController.getAvaterDatas);

router.put("/avatar/:id", updateAvatarValidator, avatarController.updateAvater);

router.get("/avatar/:id", avatarController.getAvaterById);

// router.delete(
//   "/avatar/:id",
//   [
//     param("id")
//       .notEmpty()
//       .withMessage("Avatar ID is required")
//       .isUUID()
//       .withMessage("Invalid avatar ID format")
//       .custom(async (value) => {
//         const avatar = await db.avatar.findUnique({ where: { id: value } });
//         if (!avatar) {
//           throw new Error("Avatar not found");
//         }
//         return true;
//       }),
//   ],
//   avatarController.deleteAvaterById
// );

module.exports = router;
