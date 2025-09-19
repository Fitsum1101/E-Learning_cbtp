const db = require("../../config/db");
const validate = require("../../util/validate.util");

exports.createQuestion = async (req, res, next) => {
  const errors = validate(req);

  if (Object.keys(errors).length > 0) {
    return res.status(403).json({
      sucess: true,
      message: "validation valied",
      errors,
    });
  }

  const { courseId: id } = req.params;
  const { question, options } = req.body;
  try {
    const course = await db.course.findUnique({
      where: {
        id,
      },
    });

    if (!course) {
      return res.status(403).json({
        sucess: false,
        message: "course does't exists",
        errors: "Not found",
      });
    }

    const isQuestionExists = await db.question.findFirst({
      where: {
        question,
        courseId: id,
      },
    });

    if (isQuestionExists) {
      return res.status(403).json({
        sucess: false,
        message: "question aleady exists",
        errors: { question: "question aleady exists" },
      });
    }

    const createdQuestion = await db.question.create({
      data: {
        courseId: course.id,
        question,
      },
    });

    const updatedOptions = options.map((opt) => ({
      ...opt,
      questionId: createdQuestion.id,
    }));

    const createOptions = await db.option.createMany({
      data: updatedOptions,
    });

    res.status(201).json({
      success: true,
      message: "created successfuly",
      data: createOptions,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateQuestions = async (req, res, next) => {
  const { id } = req.params;
  const { question, options, courseId } = req.body;
  try {
    const isQuestion = await db.question.findUnique({
      where: {
        id,
      },
    });
    if (!isQuestion) {
      return res.status(403).json({
        sucess: false,
        message: "question does not exists",
        errors: "NO QUESTION FOUND",
      });
    }

    const errors = validate(req);

    if (Object.keys(errors).length > 0) {
      return res.status(403).json({
        sucess: true,
        message: "validation valied",
        errors,
      });
    }

    await db.question.update({
      where: {
        id,
      },
      data: {
        question,
        courseId,
      },
    });

    await db.option.deleteMany({
      where: {
        questionId: id,
      },
    });

    const updatedOptions = options.map((opt) => ({
      isCorrect: opt.isCorrect,
      text: opt.text,
      questionId: id,
    }));

    await db.option.createMany({
      data: updatedOptions,
    });
    res.status(200).json({
      success: true,
      message: "updated sucessfuly",
    });
  } catch (error) {
    next(error);
  }
};

exports.getQuestionBy = async (req, res, next) => {
  const { id } = req.params;

  try {
    const isQuestionExists = await db.question.findUnique({
      where: {
        id,
      },
    });
    if (!isQuestionExists) {
      return res.status(304).json({
        sucess: false,
        message: "question deos not exists",
        error: "QUESTION  NOT FOUND",
      });
    }

    const question = await db.question.findUnique({
      where: {
        id,
      },
      include: {
        options: true,
      },
    });

    res.status(200).json({
      sucess: true,
      data: question,
    });
  } catch (error) {
    next(error);
  }
};

exports.getQuestions = async (req, res, next) => {
  const page = +req.query.page || 1;
  const userId = req.user?.id || "1301d38b-2d2d-4649-a003-0c45e912fe8f";
  const slug = !req.query?.filter ? "all" : req.query?.filter;

  try {
    let courseId;
    if (slug === "all") {
      const courses = await db.course.findMany({
        where: {
          adminId: userId,
        },
      });

      if (courses.length === 0) {
        return res.status(200).json({
          sucess: true,
          message: "questions fetched suceessfuly",
          data: { questions: [], hasMore: false, totalQuestions: 0 },
        });
      }

      courseId = courses.map((cour) => cour.id);
    } else {
      const course = await db.course.findUnique({
        where: {
          slug,
          adminId: userId,
        },
      });

      if (!course) {
        return res.status(403).json({
          sucess: true,
          message: "questions fetched suceessfuly",
          error: "course for this admin exists",
        });
      }
      courseId = [course.id];
    }

    const maxQuestions = await db.question.count({
      where: {
        ...(slug === "all"
          ? { course: { adminId: userId } }
          : {
              courseId: {
                in: courseId,
              },
            }),
      },
    });

    const questions = await db.question.findMany({
      skip: page - 1,
      take: 1,
      include: {
        course: {
          select: {
            title: true,
          },
        },
        options: true,
      },
      where: {
        courseId: {
          in: courseId,
        },
      },
    });

    const hasMore = page !== maxQuestions;
    const filter = maxQuestions - questions.length;

    res.status(200).json({
      sucess: true,
      message: "questions fetched suceessfuly",
      data: { questions, hasMore, totalQuestions: maxQuestions, filter },
    });
  } catch (error) {
    next(error);
  }
};
