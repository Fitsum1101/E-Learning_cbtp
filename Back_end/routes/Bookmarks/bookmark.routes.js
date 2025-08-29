const express = require("express");

const router = express.Router();

const bookmarkController = require("../../controller/Bookmarks/bookmark.controller");

router.post("/bookmarks/toggle", bookmarkController.toggleBookmark);

router.get("/bookmarks", bookmarkController.getBookMarks);

router.get(
  "/bookmarks/:enrollmentId/:subChapterId",
  bookmarkController.getBookmarkById
);

module.exports = router;
