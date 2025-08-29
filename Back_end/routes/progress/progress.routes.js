const express = require("express");
const router = express.Router();

const progressController = require("../../controller/progress/progress.controller");

router.post("/progress/course/:courseId", progressController.createProgress);

module.exports = router;
