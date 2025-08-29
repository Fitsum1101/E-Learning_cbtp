const express = require("express");

const avatarController = require("../../controller/avatar/Avatar.controller");

const router = express.Router();

router.get("/avatar", avatarController.getAvatars);

module.exports = router;
