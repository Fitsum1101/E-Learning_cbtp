const db = require("../../config/db");

exports.createProgress = async (req, res, next) => {
  const { courseId } = req.params;
  const { completed, subChapterId } = req.body;
  const userId = req.user?.id || "1301d38b-2d2d-4649-a003-0c45e912fe8f";
  try {
    const course = await db.course.findFirst({
      where: { id: courseId },
    });

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

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
