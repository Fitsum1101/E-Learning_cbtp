const db = require("../../config/db");

function calculateExamTimes(startingTime, endsTime, submittedTime) {
  const start = new Date(startingTime).getTime();
  const end = new Date(endsTime).getTime();
  const submitted = new Date(submittedTime).getTime();

  const timeLimit = Math.max(0, Math.floor((end - start) / 1000)); // seconds
  const usedTime = Math.max(0, Math.floor((submitted - start) / 1000)); // seconds
  const remainTime = Math.max(0, Math.floor((end - submitted) / 1000)); // seconds

  return { timeLimit, usedTime, remainTime };
}

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
  console.log(attemptExamId, userId);
  try {
    const isActiveExamExists = await db.examSession.findFirst({
      where: {
        userId,
        attemptId: {
          not: attemptExamId,
        },
      },
    });

    if (isActiveExamExists) {
      console.log(" creating other the continue exam session");
      return res.status(304).json({ sucess: false });
    }

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
      const now = new Date();
      const timeAnalaysis = calculateExamTimes(startedAt, endsAt, now);

      attemptExam = await db.examSession.create({
        data: {
          attemptId: attemptExamId,
          userId,
          endsAt,
          startedAt,
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
        id: eq.questionId,
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
          ...timeAnalaysis,
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

    const anwsersIds = answeredQuestions.map((ans) => ans.answerId);

    let countAnwesres = 0;

    const formattedQuestions = examQuestions.map((eq) => {
      const question = {
        id: eq.questionId,
        questionText: eq.question.question,
      };

      question.options = eq.question.options.map((opt) => {
        const newOpt = {
          id: opt.id,
          text: opt.text,
        };
        if (anwsersIds.includes(newOpt.id)) {
          newOpt.isAnswer = true;
          question.isAnswered = true;
          countAnwesres++;
        }
        return newOpt;
      });
      return question;
    });

    const now = new Date();

    const timeAnalaysis = calculateExamTimes(
      attemptExam.startedAt,
      attemptExam.endsAt,
      now
    );
    console.log({ timeAnalaysis });
    res.status(200).json({
      message: "amaing projects",
      data: {
        questions: formattedQuestions,
        ...timeAnalaysis,
        percent: Math.ceil((countAnwesres / formattedQuestions.length) * 100),
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

    const attempt = attempts.length + 1;

    if (attempt > 3) {
      return res.status(400).json({
        sucess: false,
      });
    }

    const examInfo = await db.examAttempts.findFirst({
      where: {
        attempt: attempt,
        examId,
      },
      include: {
        examQuestions: true,
      },
    });

    const totalQuestions = examInfo.examQuestions.length;

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

    console.log(course);

    return res.status(200).json({
      sucess: true,
      data: { ...examInfo, ...course.course, totalQuestions },
    });
  } catch (error) {
    next(error);
  }
};

exports.questionResult = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

exports.AnsweredQuestions = async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user?.id || "94b57e76-04a9-49bd-9547-8dc14e17e337";
  const { questionId, answerId } = req.body;

  try {
    const questions = await db.examSession.findFirst({
      where: {
        userId,
        attemptId: id,
      },
    });
    if (!questions) {
      return res.status(402);
    }

    const questionAleadyExists = await db.examAnswer.findFirst({
      where: {
        examSessionId: questions.id,
        questionId,
      },
    });

    if (questionAleadyExists) {
      await db.examAnswer.update({
        where: {
          examSessionId_questionId: {
            examSessionId: questions.id,
            questionId,
          },
        },
        data: {
          answerId,
        },
      });
    } else
      await db.examAnswer.create({
        data: {
          examSessionId: questions.id,
          answerId,
          questionId,
        },
      });

    res.status(201).json({
      message: "created or updated  successfuly!!!",
    });
  } catch (error) {
    next(error);
  }
};

exports.calculateResult = async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user?.id || "94b57e76-04a9-49bd-9547-8dc14e17e337";

  try {
    const session = await db.examSession.findFirst({
      where: {
        userId,
        attemptId: id,
      },
    });

    if (!session) {
      return res.status(400).json({ message: "" });
    }

    const currentTime = new Date();
    const timeAnalaysis = calculateExamTimes(
      session.startedAt,
      session.endsAt,
      currentTime
    );

    const answeredQuestions = await db.examAnswer.findMany({
      where: {
        examSessionId: session.id,
      },
    });

    const examQuestions = await db.examQuestions.findMany({
      where: {
        attemptId: id,
      },
      include: {
        question: {
          include: {
            options: true,
          },
        },
      },
    });

    const allQuestions = examQuestions.map((que) => ({
      id: que.questionId,
      options: que.question.options,
    }));

    const totalQuestions = examQuestions.length;

    if (
      timeAnalaysis.remainTime &&
      answeredQuestions.length !== totalQuestions
    ) {
      return res.status(400).json({ message: "" });
    }

    const alalaysisQuestions = [];
    let correctQuestions = 0;

    allQuestions.forEach((que) => {
      const questionIndex = answeredQuestions.findIndex(
        (exmQue) => que.id === exmQue.questionId
      );

      let question = answeredQuestions[questionIndex];

      let option = que.options.find((opt) => opt.isCorrect);

      if (questionIndex !== -1) {
        question = answeredQuestions[questionIndex];

        option = que.options.find((opt) => opt.isCorrect);
      }

      if (option.id === question.answerId) correctQuestions++;

      alalaysisQuestions.push({
        id: que.id,
        answeredId: questionIndex === -1 ? undefined : question.answerId,
        correctId: option.id,
        isCorrect: option.id === question.answerId,
      });
    });

    const isFailed = Math.floor(allQuestions.length / 2) <= correctQuestions;

    if (isFailed) {
    }

    await db.examSession.update({
      where: {
        id: session.id,
      },
      data: {
        score: correctQuestions,
        submittedAt: currentTime,
        status: isFailed ? "PASSED" : "FAILED",
        over: true,
      },
    });
    res.status(200).json({ message: "" });
  } catch (error) {
    next(error);
  }
};

exports.getResult = async (req, res, next) => {
  const id = req.params?.id || "fe7e34b1-f0cf-4ea1-884d-b2fb774d37c6";
  const userId = req.user?.id || "kdkksksjsjssjks";

  try {
    const session = await db.examSession.findUnique({
      id,
      userId,
    });

    if (!session) {
      res.status(404).json({
        sucess: false,
        message: "Not found",
      });
    }
    const examQuestions = await db.examQuestions.count({
      where: {
        attemptId: session.attemptId,
      },
    });
  } catch (error) {
    next(error);
  }
};
