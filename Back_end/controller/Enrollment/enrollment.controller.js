const db = require("../../config/db");

exports.createEnrollment = async (req, res, next) => {
  const { courseId } = req.body;
  const userId = req.user?.id || "94b57e76-04a9-49bd-9547-8dc14e17e337";

  try {
    const course = await db.course.findUnique({
      where: { id: courseId },
    });

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    const enrollment = await db.enrollment.create({
      data: { userId, courseId },
    });

    res.status(201).json({
      success: "student enrollment created successfully",
      enrollment,
    });
  } catch (err) {
    next(err);
  }
};

exports.getAllEnrollments = async (req, res, next) => {
  try {
    const enrollments = await db.enrollment.findMany({
      include: { user: true, course: true },
    });
    res.json(enrollments);
  } catch (err) {
    next(err);
  }
};

exports.getEnrollmentById = async (req, res, next) => {
  const { slug } = req.params;
  const userId = req.user?.id || "1301d38b-2d2d-4649-a003-0c45e912fe8f";
  try {
    const course = await db.course.findUnique({
      where: { slug },
    });

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    const enrollment = await db.enrollment.findFirst({
      where: { courseId: course.id, userId },
      include: { user: true, course: true },
    });

    if (!enrollment) {
      return res.status(404).json({ error: "Enrollment not found" });
    }

    const subChapterProgress = await db.progress.findMany({
      where: { enrollmentId: enrollment.id },
      include: {
        subChapter: {
          include: {
            chapter: true,
          },
        },
      },
      orderBy: {
        watchedAgain: "asc",
      },
    });

    const subChaptersId = subChapterProgress.map((p) => {
      return {
        id: p.subChapter.id,
        completed: p.completed,
      };
    });

    const lastCompletedLessonId = subChapterProgress.findIndex(
      (sub) => sub.completed === "COMPLETED"
    );

    const lessonsData = await db.course.findUnique({
      where: {
        id: enrollment.courseId,
      },
      include: {
        chapters: {
          include: {
            subChapters: true,
          },
        },
      },
    });

    let totalLesson = 0;
    let completedLesson = 0;

    const courseData = [];

    lessonsData.chapters.forEach((p) => {
      const subChapters = p.subChapters || [];

      const subChaptersData = [];

      subChapters
        .sort((a, b) => a.order - b.order)
        .forEach((subChapter, i) => {
          totalLesson += 1;

          const subChapterIndex = subChaptersId.findIndex(
            (sc) => sc.id === subChapter.id
          );

          if (subChapterIndex !== -1) {
            if (subChaptersId[subChapterIndex].completed === "COMPLETED") {
              completedLesson += 1;
            }
            subChaptersData.push({
              ...(lastCompletedLessonId === subChapterIndex && {
                isCurrentCourse: true,
              }),
              ...subChapter,
              completed: subChaptersId[subChapterIndex].completed,
            });
          } else {
            subChaptersData.push({
              ...(lastCompletedLessonId === -1 &&
                i === 0 && {
                  isCurrentCourse: true,
                }),
              ...subChapter,
              completed: "IN_PROGRESS",
            });
          }
        });

      courseData.push({
        ...p,
        subChapters: subChaptersData.sort((a, b) => a.order - b.order),
      });
    });

    const courseProgress =
      completedLesson === 0
        ? 0
        : Math.round((completedLesson / totalLesson) * 100);

    res.json({
      success: true,
      data: {
        enrollment: {
          id: enrollment.id,
        },
        courseData: courseData.sort((a, b) => a.order - b.order),
        course: {
          title: lessonsData.title,
          id: lessonsData.id,
          description: lessonsData.description,
          courseProgress,
          totalLesson,
          completedLesson,
        },
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.updateEnrollment = async (req, res, next) => {
  const { id } = req.params;
  const { completed } = req.body;
  try {
    const updated = await db.enrollment.update({
      where: { id },
      data: { completed },
    });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

exports.deleteEnrollment = async (req, res, next) => {
  const { id } = req.params;
  try {
    await db.enrollment.delete({
      where: { id },
    });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

exports.getUserEnrollments = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const enrollments = await db.enrollment.findMany({
      where: { userId },
      include: { course: true },
    });
    res.json(enrollments);
  } catch (err) {
    next(err);
  }
};

exports.markAsCompleted = async (req, res, next) => {
  const { id } = req.params;
  try {
    const updated = await db.enrollment.update({
      where: { id },
      data: { completed: true },
    });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

// exports.getEnrollentCourses = async (req, res, next) => {
//   const userId = req.user?.id || "1301d38b-2d2d-4649-a003-0c45e912fe8f";
//   const page = parseInt(req.query.page) || 1;
//   const limit = parseInt(req.query.limit) || 3;
//   const skip = (page - 1) * limit;
//   try {
//     const courses = await db.enrollment.findMany({
//       where: { userId },
//       include: {
//         course: {
//           omit: {
//             id: true,
//             createdAt: true,
//             updatedAt: true,
//             adminId: true,
//             categoryId: true,
//           },
//         },
//       },
//       skip,
//       take: limit,
//     });

//     const coursesWithProgress = await Promise.all(
//       courses.map(async (enrollment) => {
//         const courseId = enrollment.courseId;

//         const Lessons = await db.chapter.findMany({
//           where: { courseId },
//           select: {
//             _count: {
//               select: {
//                 subChapters: true,
//               },
//             },
//           },
//         });

//         const totalLessons = Lessons.reduce(
//           (acc, curr) => acc + curr._count.subChapters,
//           0
//         );

//         const completedLessons = await db.progress.count({
//           where: { enrollmentId: enrollment.id, completed: "COMPLETED" },
//         });

//         const progressPercent = (completedLessons / totalLessons) * 100;

//         return {
//           ...enrollment.course,
//           progress: progressPercent,
//           totalLessons,
//           completedLessons,
//         };
//       })
//     );

//     res.json({
//       success: true,
//       data: coursesWithProgress,
//     });
//   } catch (err) {
//     next(err);
//   }
// };

exports.getEnrollmentCourses = async (req, res, next) => {
  try {
    const userId = req.user?.id || "1301d38b-2d2d-4649-a003-0c45e912fe8f";
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 3;
    const skip = (page - 1) * limit;

    const { status, sortBy } = req.query;

    // Build the filter for progress
    let progressFilter = {};
    if (status === "IN_PROGRESS") progressFilter.completed = "IN_PROGRESS";
    else if (status === "COMPLETED") progressFilter.completed = "COMPLETED";
    // Saved could be handled if you have a saved courses table/flag

    // Determine sorting
    let order = {};
    switch (sortBy) {
      case "Alphabetical":
        order = { course: { title: "asc" } };
        break;
      case "Progress":
        order = { course: { title: "asc" } }; // custom later, maybe sort after calculation
        break;
      case "Due Date":
        order = { enrolledAt: "desc" };
        break;
      default: // Recently Accessed
        order = { enrolledAt: "desc" };
    }

    // Fetch enrollments with included course
    const enrollments = await db.enrollment.findMany({
      where: { userId },
      include: {
        course: {
          omit: {
            id: true,
            createdAt: true,
            updatedAt: true,
            adminId: true,
            categoryId: true,
          },
        },
        progress: { where: progressFilter },
      },
      skip,
      take: limit,
      orderBy: order,
    });

    // Calculate progress per course
    const coursesWithProgress = await Promise.all(
      enrollments.map(async (enrollment) => {
        const courseId = enrollment.courseId;

        const chapters = await db.chapter.findMany({
          where: { courseId },
          select: { _count: { select: { subChapters: true } } },
        });

        const totalLessons = chapters.reduce(
          (acc, curr) => acc + curr._count.subChapters,
          0
        );

        const completedLessons = await db.progress.count({
          where: { enrollmentId: enrollment.id, completed: "COMPLETED" },
        });

        const progressPercent = totalLessons
          ? Math.round((completedLessons / totalLessons) * 100)
          : 0;

        return {
          ...enrollment.course,
          progress: progressPercent,
          totalLessons,
          completedLessons,
        };
      })
    );

    res.json({
      success: true,
      data: coursesWithProgress,
    });
  } catch (err) {
    next(err);
  }
};
