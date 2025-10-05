const db = require("../../config/db");

exports.createProgress = async (req, res, next) => {
  const { courseId } = req.params;
  const { completed, subChapterId } = req.body;
  const userId = req.user?.id || "94b57e76-04a9-49bd-9547-8dc14e17e337";
  try {
    const course = await db.course.findFirst({
      where: { id: courseId },
    });

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    const totalSubchapters = await db.subChapter.count({
      where: {
        chapter: {
          courseId,
        },
      },
    });

    const enrollment = await db.enrollment.findFirst({
      where: { courseId, userId },
    });

    if (!enrollment) {
      return res.status(404).json({ error: "Enrollment not found" });
    }

    const progress = await db.progress.findFirst({
      where: {
        enrollmentId: enrollment.id,
        subChapterId: subChapterId,
      },
    });

    if (!progress) {
      await db.progress.create({
        data: {
          enrollmentId: enrollment.id,
          completed,
          subChapterId: subChapterId,
        },
      });
    } else {
      const updateProgress = await db.progress.update({
        where: { id: progress.id },
        data: { completed },
      });

      if (completed === "ACTIVE") {
        await db.progress.updateMany({
          where: {
            enrollmentId: enrollment.id,
            NOT: { id: updateProgress.id },
          },
          data: { completed: "IN_PROGRESS" },
        });
      }
    }

    const totalEndedSubchapters = await db.progress.count({
      where: {
        enrollmentId: enrollment.id,
        completed: "COMPLETED",
      },
    });

    await db.enrollment.update({
      where: {
        id: enrollment.id,
      },
      data: {
        completed: totalEndedSubchapters === totalSubchapters ? true : false,
      },
    });

    res.status(201).json({
      data: {
        message: "Progress created successfully",
        success: true,
      },
    });
  } catch (error) {
    next(error);
  }
};
