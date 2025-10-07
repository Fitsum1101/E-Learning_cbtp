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
  const userId = req.user?.id || "94b57e76-04a9-49bd-9547-8dc14e17e337";
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

    const data = bookmarks.map((bookmark) => ({
      id: bookmark.id,
      enrollmentId: bookmark.enrollmentId,
      courseId: bookmark.enrollment.course.id,
      courseTitle: bookmark.enrollment.course.title,
      courseSlug: bookmark.enrollment.course.slug,
      courseThumbnail: bookmark.enrollment.course.thumbnail,
      courseCompleted: bookmark.enrollment.course.completed,
      subChapter: {
        subChapterTitle: bookmark.subChapter.title,
        id: bookmark.subChapter.id,
      },
      isInBookmark: true,
      createdAt: bookmark.createdAt,
    }));
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
};
