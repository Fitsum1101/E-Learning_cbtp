const db = require("../../config/db");

exports.createQuestion = async (req, res, next) => {
  const { courseId: id } = req.params;
  const { title, options } = req.body;
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
    const createdQuestion = await db.quiz.create({
      data: {
        title,
        courseId: id,
      },
    });

    const updatedOptions = options.map((opt) => ({
      ...opt,
      questionId: createdQuestion.id,
    }));

    const createOptions = await db.option.createMany({
      data: updatedOptions,
    });

    console.log(createOptions);

    res.status(201).json({
      success: true,
      message: "created successfuly",
    });
  } catch (error) {
    next(error);
  }
};
