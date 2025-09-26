const db = require("../../config/db");

const examQuestions = (questionsId, examId, attempt) =>
  questionsId.map((questionId) => ({
    attemptId: examId,
    questionId: questionId,
    attempt: attempt,
  }));

exports.fillExamQuestion = async (req, res, next) => {
  const { attempt, questionsId } = req.body;
  const courseId = req.params.courseId;

  let attemptExam;

  console.log("called");

  try {
    let exam = await db.exam.findFirst({
      where: {
        courseId,
      },
      include: {
        ExamAttempts: true,
      },
    });

    let examQuestionsResult;

    if (!exam) {
      exam = await db.exam.create({
        data: {
          courseId,
        },
      });

      attemptExam = await db.examAttempts.create({
        data: {
          duration: questionsId.length,
          passingScore: Math.ceil(questionsId.length * 0.5),
          examId: exam.id,
          attempt: +attempt,
        },
      });

      examQuestionsResult = await db.examQuestions.createMany({
        data: examQuestions(questionsId, attemptExam.id, +attempt),
      });
    } else {
      const isExamAttemtExsits =
        exam.ExamAttempts.length === 0 ||
        exam.ExamAttempts.findIndex((exam) => exam.attempt === attempt) === -1;
      if (isExamAttemtExsits)
        attemptExam = await db.examAttempts.create({
          data: {
            examId: exam.id,
            attempt,
          },
        });
      else {
        attemptExam = exam.ExamAttempts.find(
          (exam) => exam.attempt === attempt
        );
      }
      console.log({ attemptExam });
      examQuestionsResult = await db.examQuestions.createMany({
        data: examQuestions(questionsId, attemptExam.id, attempt),
      });

      await db.examAttempts.update({
        where: {
          id: attemptExam.id,
        },
        data: {
          duration: questionsId.length + attemptExam.duration,
          passingScore:
            Math.ceil(questionsId.length * 0.5) + attemptExam.passingScore,
        },
      });
    }
    res.status(201).json({
      status: "success",
      data: examQuestionsResult,
    });
  } catch (error) {
    next(error);
  }
};

exports.getExamQuestions = async (req, res, next) => {
  try {
    const { courseId, attempt } = req.params;
    const search = req.query.search || "";

    const examQuestionsResult = await db.examAttempts.findFirst({
      where: {
        exam: {
          courseId,
        },
        attempt: attempt,
      },
      include: {
        examQuestions: true,
      },
    });

    console.log(examQuestions);
    const questionIds = examQuestionsResult.examQuestions.map(
      (examQue) => examQue.questionId
    );
    const questions = await db.question.findMany({
      where: {
        id: { in: questionIds },
      },
    });

    res.status(200).json({
      status: "success",
      data: questions,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteExamQuestions = async (req, res, next) => {
  const { questionId } = req.params;
  try {
    const examQuestion = await db.examQuestions.findFirst({
      where: {
        questionId,
      },
    });
    if (!examQuestion) {
      return res.status(404).json({
        status: "fail",
        message: "Question not found",
      });
    }

    await db.examQuestions.delete({
      where: {
        questionId: questionId,
        id: examQuestion.id,
      },
    });

    res.status(204).json({
      status: "success",
      message: "Question deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

exports.getExamSession = async (req, res, next) => {
  const attemptExamId = req.params.id;
  const userId = req.user?.id || "94b57e76-04a9-49bd-9547-8dc14e17e337";
  try {
    let attemptExam = await db.examSession.findFirst({
      where: {
        attemptId: attemptExamId,
      },
    });

    const exam = await db.examAttempts.findUnique({
      where: {
        id: attemptExamId,
      },
    });

    if (!attemptExam) {
      const startedAt = new Date();
      const endsAt = new Date(startedAt.getTime() + exam.duration * 60 * 1000);

      attemptExam = await db.examSession.create({
        data: {
          attemptId: attemptExamId,
          endsAt,
          userId,
        },
      });

      const examQuestions = await db.examQuestions.findMany({
        where: {
          attemptId: attemptExamId,
        },
        include: {
          question: {
            include: {
              options: {
                omit: {
                  isCorrect: true,
                },
              },
            },
          },
        },
      });

      const formattedQuestions = examQuestions.map((eq) => ({
        examQuestionId: eq.questionId.id,
        questionText: eq.question.question,
        options: eq.question.options.map((opt) => ({
          id: opt.id,
          text: opt.text,
        })),
      }));

      return res.status(200).json({
        message: "finally",
        data: {
          questions: formattedQuestions,
          startsAt: attemptExam.startedAt,
          endsAt: attemptExam.endsAt,
        },
      });
    }

    if (attemptExam.status !== "IN_PROGRESS") {
      return res.status(403).json({ message: "NOT FOUNDE" });
    }

    const examQuestions = await db.examQuestions.findMany({
      where: {
        attemptId: attemptExamId,
      },
      include: {
        question: {
          include: {
            options: {
              omit: {
                isCorrect: true,
              },
            },
          },
        },
      },
    });

    const answeredQuestions = await db.examAnswer.findMany({
      where: {
        examSessionId: attemptExam.id,
      },
    });

    const formattedQuestions = examQuestions.map((eq) => ({
      examQuestionId: eq.questionId.id,
      questionText: eq.question.question,
      options: eq.question.options.map((opt) => {
        const newOpt = {
          id: opt.id,
          text: opt.text,
        };
        if (answeredQuestions.findIndex((ansQue) => ansQue.answerId) !== -1)
          newOpt.isCorrect = true;
        return newOpt;
      }),
    }));

    res.status(200).json({
      message: "amaing projects",
      data: {
        questions: formattedQuestions,
        startsAt: attemptExam.startedAt,
        endsAt: attemptExam.endsAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.getExamSessionAtake = async (req, res, next) => {
  const examId = req.params.id;
  try {
    const attempts = await db.examSession.findMany({
      where: {
        examAttempts: {
          examId,
        },
      },
      include: {
        examAttempts: true,
      },
    });

    const index = attempts.length + 1;

    const attemptIndex = attempts.findIndex(
      (att) => att.status === "IN_PROGRESS"
    );

    if (index > 3) {
      return res.status(400).json({
        sucess: false,
      });
    }

    const examInfo = await db.examAttempts.findFirst({
      where: {
        attempt:
          attemptIndex !== -1
            ? attempts[attemptIndex].examAttempts.attempt
            : index,
        examId,
      },
    });

    const course = await db.exam.findFirst({
      where: {
        id: examInfo.examId,
      },
      include: {
        course: {
          select: {
            title: true,
            thumbnail: true,
            description: true,
            level: true,
            slug: true,
          },
        },
      },
    });

    console.log(examInfo);

    return res.status(200).json({
      sucess: true,
      data: { ...examInfo, ...course.course },
    });
  } catch (error) {
    next(error);
  }
};
