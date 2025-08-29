const db = require("../../config/db");

exports.toggleBookmark = async (req, res, next) => {
  try {
    const { enrollmentId, subChapterId } = req.body;

    // Check if already exists
    const existing = await db.bookmark.findUnique({
      where: { enrollmentId_subChapterId: { enrollmentId, subChapterId } },
    });

    if (existing) {
      await db.bookmark.delete({
        where: { enrollmentId_subChapterId: { enrollmentId, subChapterId } },
      });
      return res.json({ success: true, message: "Bookmark removed" });
    }

    const bookmark = await db.bookmark.create({
      data: { enrollmentId, subChapterId },
    });

    res.status(201).json({ success: true, data: bookmark });
  } catch (err) {
    next(err);
  }
};

exports.getBookmarkById = async (req, res, next) => {
  try {
    const { enrollmentId, subChapterId } = req.params;
    // check if the bookmark exists
    const existing = await db.bookmark.findUnique({
      where: { enrollmentId_subChapterId: { enrollmentId, subChapterId } },
    });
    if (existing) {
      return res.json({ success: true, data: true });
    } else if (subChapterId) {
      return res.json({ success: true, data: false });
    }
  } catch (err) {
    next(err);
  }
};

exports.getBookMarks = async (req, res, next) => {
  const userId = req.user?.id || "1301d38b-2d2d-4649-a003-0c45e912fe8f";
  try {
    const userEnrollments = await db.enrollment.findMany({
      where: { userId },
      select: {
        id: true,
      },
    });

    const enrollmentIds = userEnrollments.map((enrollment) => enrollment.id);

    if (enrollmentIds.length < 1) {
      return res.json({ success: true, data: [] });
    }

    const bookmarks = await db.bookmark.findMany({
      where: { enrollmentId: { in: enrollmentIds } },
      include: {
        enrollment: {
          include: {
            course: true,
          },
        },
        subChapter: true,
      },
    });

    console.log(bookmarks);

    const data = bookmarks.map((bookmark) => ({
      id: bookmark.id,
      enrollmentId: bookmark.enrollmentId,
      courseId: bookmark.enrollment.course.id,
      courseTitle: bookmark.enrollment.course.title,
      courseThumbnail: bookmark.enrollment.course.thumbnail,
      subChapterTitle: bookmark.subChapter.title,
      courseCompleted: bookmark.enrollment.course.completed,
      subChapterId: bookmark.subChapter.id,
      isInBookmark: true,
      createdAt: bookmark.createdAt,
    }));
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
};
