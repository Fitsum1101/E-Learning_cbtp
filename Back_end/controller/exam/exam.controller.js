const db = require("../../config/db");

const examQuestions = (questionsId, examId, attempt) =>
  questionsId.map((questionId) => ({
    examId: examId,
    questionId: questionId,
    attempt: attempt,
  }));

exports.fillExamQuestion = async (req, res, next) => {
  try {
    const { attempt, questionsId } = req.body;
    const courseId = req.params.courseId;

    const attemptExam = await db.examQuestions.findFirst({
      where: {
        attempt,

        question: {
          courseId: courseId,
        },
      },
      include: {
        exam: true,
      },
    });

    let exam;
    let examQuestionsResult;

    if (!attemptExam) {
      exam = await db.exam.create({
        data: {
          duration: questionsId.length,
          passingScore: Math.ceil(questionsId.length * 0.5),
        },
      });

      examQuestionsResult = await db.examQuestions.createMany({
        data: examQuestions(questionsId, exam.id, attempt),
      });
    } else {
      examQuestionsResult = await db.examQuestions.createMany({
        data: examQuestions(questionsId, attemptExam.examId, attempt),
      });

      await db.exam.update({
        where: {
          id: attemptExam.examId,
        },
        data: {
          duration: questionsId.length + attemptExam.exam.duration,
          passingScore:
            Math.ceil(questionsId.length * 0.5) + attemptExam.exam.passingScore,
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

    const examQuestionsResult = await db.examQuestions.findMany({
      where: {
        question: {
          courseId: courseId,
          question: search,
        },
        attempt: attempt,
      },
      include: {
        exam: true,
      },
    });
    res.status(200).json({
      status: "success",
      data: examQuestionsResult,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteExamQuestions = async (req, res, next) => {
  const { questionId } = req.params;
  try {
    const isQuestionExist = await db.examQuestions.findFirst({
      where: {
        questionId,
      },
    });
    if (!isQuestionExist) {
      return res.status(404).json({
        status: "fail",
        message: "Question not found",
      });
    }

    await db.examQuestions.delete({
      where: {
        questionId,
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
