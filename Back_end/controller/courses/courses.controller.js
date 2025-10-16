const db = require("../../config/db");
const slugify = require("../../util/slugfy");
const validate = require("../../util/validate.util");
const { deleteFile } = require("../../util/removeFile");
const path = require("path");
const { appendFile } = require("fs");

const makePath = (filePath) => path.join(require.main.path, filePath);

exports.getAllCourses = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const totalCourses = await db.course.count();
    const endPage = Math.ceil(totalCourses / limit);

    let nextPage = page >= endPage ? 0 : page + 1;
    let prevPage = page === 1 ? 0 : page - 1;

    console.log({ skip, limit });

    const courses = await db.course.findMany({
      skip,
      take: limit,
      include: {
        category: true,
        ratings: true,
      },
    });

    res.json({
      success: true,
      pages: {
        startPage: 1,
        endPage,
        nextPage,
        prevPage,
        currentPage: page,
      },
      data: courses,
    });
  } catch (err) {
    next(err);
  }
};

exports.createCourse = async (req, res, next) => {
  try {
    const existingFields = validate(req);
    const isThumbnailExists = typeof req.file === "object";

    if (Object.keys(existingFields).length > 0) {
      res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: existingFields,
      });

      isThumbnailExists && deleteFile(makePath(req.file.path));

      return;
    }

    const { title, description, categoryId, courseLevel } = req.body;

    const slug = slugify(title);
    const adminId = "1301d38b-2d2d-4649-a003-0c45e912fe8f";
    const thumbnail = isThumbnailExists ? req.file.path : undefined;

    const isCourseExists = await db.course.findUnique({
      where: {
        slug,
      },
    });

    if (isCourseExists) {
      res.status(400).json({
        sucess: false,
        message: "vaidation failed",
        errors: { title: "course with this name aleady exists" },
      });
      isThumbnailExists && deleteFile(makePath(req.file.path));
      return;
    }

    const course = await db.course.create({
      data: {
        title,
        slug,
        description,
        thumbnail,
        categoryId,
        adminId,
        level: courseLevel,
      },
    });

    res.status(201).json({
      sucess: true,
      message: "course created successfuly",
      course,
    });
  } catch (err) {
    next(err);
  }
};

exports.updateCourse = async (req, res, next) => {
  try {
    const existingFields = validate(req);
    const isThumbnailExists = typeof req.file === "object";

    if (Object.keys(existingFields).length > 0) {
      res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: existingFields,
      });
      isThumbnailExists && deleteFile(makePath(req.file.path));

      return;
    }

    const { id } = req.params;
    const { title, description, categoryId, published } = req.body;

    const thumbnail = isThumbnailExists ? req.file.path : course.thumbnail;

    const slug = slugify(title);

    const course = await db.course.findUnique({
      where: {
        id,
      },
    });

    if (!course) {
      res.status(400).json({
        sucess: false,
        message: "course not found",
      });

      isThumbnailExists && deleteFile(makePath(req.file.path));
      return;
    }

    const isSlugExists = await db.course.findUnique({
      where: {
        slug,
        NOT: { id },
      },
    });

    if (isSlugExists) {
      res.status(400).json({
        sucess: false,
        message: "course with this name aleady exists",
      });
      isThumbnailExists && deleteFile(makePath(req.file.path));
      return;
    }

    const updated = await db.course.update({
      where: { id },
      data: {
        title,
        description,
        thumbnail,
        categoryId,
        published:
          course.published !== published ? published : course.published,
        updatedAt: new Date(),
      },
    });

    res.json({
      sucess: false,
      message: "course updated successfuly",
      updated,
    });
    if (isThumbnailExists) deleteFile(course.thumbnail);
  } catch (err) {
    next(err);
  }
};

exports.deleteCourse = async (req, res, next) => {
  try {
    const { id } = req.params;

    const isCourseExists = await db.course.findUnique({
      where: {
        id,
      },
    });

    if (!isCourseExists) {
      res.status(400).json({
        sucess: false,
        message: "course not found",
      });
    }

    await db.course.delete({ where: { id } });

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

exports.getCourseBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;

    console.log({ slug });

    const isSlugExists = await db.course.findUnique({
      where: {
        slug,
      },
    });

    if (!isSlugExists) {
      res.status(400).json({
        sucess: false,
        message: "course not already exists",
      });
    }

    const course = await db.course.findUnique({
      where: { slug },
      omit: {
        adminId: true,
        updatedAt: true,
        createdAt: true,
        categoryId: true,
      },
      include: {
        category: true,
        chapters: {
          include: {
            subChapters: true,
          },
        },
      },
    });

    const totalLessons = course.chapters.reduce((acc, chapter) => {
      return acc + chapter.subChapters.length;
    }, 0);

    const totalStudents = await db.enrollment.count({
      where: {
        courseId: course.id,
      },
    });

    const rating = await db.rating.aggregate({
      where: {
        courseId: course.id,
      },
      _count: {
        _all: true,
      },
      _avg: {
        rating: true,
      },
    });

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    res.json({
      success: true,
      data: {
        course,
        totalStudents,
        averageRating: rating._avg.rating || 0,
        totalLessons,
        totalRatings: rating._count._all || 0,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.getCourseByCategory = async (req, res, next) => {
  const categoryId = req.query.categoryId || "All";
  const limit = parseInt(req.query.limit) || 12;
  const page = parseInt(req.query.page) || 1;
  let nextPage = 0;
  let prevPage = 0;

  try {
    const totalCourse = await db.course.count({
      where: {
        ...(categoryId !== "All" && { categoryId }),
      },
    });

    const endPage = Math.ceil(totalCourse / limit);

    nextPage = page + 1;
    prevPage = page - 1;

    const skip = (page - 1) * limit;

    const courses = await db.course.findMany({
      take: limit,
      skip,
      where: {
        ...(categoryId !== "All" && { categoryId }),
      },
      select: {
        description: true,
        title: true,
        thumbnail: true,
        level: true,
        id: true,
        slug: true,
      },
    });

    res.json({
      success: true,
      data: {
        courses,
        pages: {
          currentPage: page,
          startPage: 1,
          endPage,
          nextPage,
          prevPage,
        },
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.updateSubChapterOrder = async (req, res, next) => {
  const chapter = await db.chapter.findUnique({
    where: { id: req.params.chapterId },
  });

  if (!chapter) {
    return res.status(404).json({
      success: false,
      message: "Chapter not found",
    });
  }

  const { initialOrder, finalOrder } = req.body;

  const orderArray = await db.subChapter.findMany({
    where: { chapterId: req.params.chapterId },
    select: {
      order: true,
      id: true,
    },
    orderBy: { order: "asc" },
  });

  const updatedOrderArray = [...orderArray];

  const initialIndex = updatedOrderArray.findIndex(
    (subOrder) => subOrder.id === initialOrder.id
  );
  const finalIndex = updatedOrderArray.findIndex(
    (subOrder) => subOrder.id === finalOrder.id
  );

  updatedOrderArray.splice(initialIndex, 1);
  updatedOrderArray.splice(finalIndex, 0, initialOrder);

  await Promise.all(
    updatedOrderArray.map(({ order, id }, index) =>
      db.subChapter.update({
        where: { id },
        data: { order: index + 1 },
      })
    )
  );

  res.json({
    success: true,
    message: "SubChapter order updated successfully",
  });
};

exports.getCourseAnalytics = async (req, res, next) => {
  try {
    const userId = req.user?.id;

    const EnrolledCourse = await db.enrollment.aggregate({
      where: {
        userId,
      },
      _count: {
        userId: true,
      },
    });

    const completedCourses = await db.enrollment.aggregate({
      where: {
        userId,
        completed: true,
      },
      _count: {
        courseId: true,
      },
    });

    const courseAnalytics = {
      enrolledCourses: EnrolledCourse._count.courseId || 0,
      completedCourses: completedCourses._count.courseId || 0,
    };

    res.json({
      success: true,
      data: { ...courseAnalytics },
    });
  } catch (error) {
    next(error);
  }
};

exports.getCourseQuestions = async (req, res, next) => {
  const { slug } = req.params;
  const userId = req.user?.id || "1301d38b-2d2d-4649-a003-0c45e912fe8f";
  try {
    const isCourseExists = await db.enrollment.findFirst({
      where: {
        course: {
          slug,
        },
        userId,
        completed: false,
      },
    });
    if (!isCourseExists) {
      return res.status(400).json({
        message: "course does not exists",
      });
    }
    const questions = await db.question.findMany({
      where: {
        course: {
          slug,
        },
      },
      include: {
        options: {
          omit: {
            isCorrect: true,
          },
        },
      },
    });
    res.status(200).json({
      message: "course questions",
      data: questions,
    });
  } catch (error) {
    next(error);
  }
};

exports.getAllUserCourses = async (req, res, next) => {
  const userId = req.user?.id || "94b57e76-04a9-49bd-9547-8dc14e17e337";
  try {
    const courses = await db.course.findMany({
      where: {
        adminId: userId,
      },
      include: {
        chapters: {
          include: {
            subChapters: true,
          },
        },
      },
    });
    res.status(200).json({
      success: true,
      data: courses,
    });
  } catch (error) {
    next(error);
  }
};

exports.getEnrollmentCompleteCourses = async (req, res, next) => {
  const userId = res.user?.id || "94b57e76-04a9-49bd-9547-8dc14e17e337";
  try {
    let courses = await db.course.findMany({
      where: {
        enrollments: {
          some: {
            userId,
            completed: true,
          },
        },
      },
      include: {
        exams: true,
      },
    });

    courses = await Promise.all(
      courses.map(async (cour, i) => {
        const ExamAttempts = await db.examAttempts.findMany({
          where: {
            examId: cour.exams[0]?.id || "0",
          },
        });

        const takenExams = await db.examSession.findMany({
          where: {
            userId,
            attemptId: {
              in: ExamAttempts.map((e) => e.id),
            },
          },
        });

        if (
          takenExams.length > 0 &&
          takenExams.findIndex((exam) => ["PASSED"].includes(exam.status)) !==
            -1
        )
          return undefined;

        const progressExam = takenExams.find(
          (exam) => exam.status === "IN_PROGRESS"
        );

        if (takenExams.length === 3 && !progressExam) {
          return undefined;
        }

        if (progressExam) {
          cour.status = progressExam.status;
          cour.attemptId = progressExam.attemptId;
        } else cour.status = "NOT_TAKEN";

        cour.examId = cour.exams[0]?.id;

        return cour;
      })
    );

    res.json({
      success: true,
      data: courses.filter((cour) => cour),
    });
  } catch (error) {
    next(error);
  }
};
