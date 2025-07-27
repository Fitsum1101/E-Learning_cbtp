const db = require("../../config/db");
const validate = require("../../util/validate.util");

exports.createChapter = async (req, res, next) => {
  try {
    const existingFields = validate(req);

    if (Object.keys(existingFields).length > 0) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: existingFields,
      });
    }

    const { title, order, courseId } = req.body;

    const chapter = await db.chapter.create({
      data: {
        title,
        order,
        courseId,
      },
    });

    res.status(200).json({
      success: true,
      msg: "chapter created successfuy",
      chapter,
    });
  } catch (err) {
    next(err);
  }
};

exports.updateChapter = async (req, res, next) => {
  try {
    const { id } = req.params;

    const isChapterExists = await db.chapter.findUnique({
      where: { id },
    });

    if (!isChapterExists) {
      return res.status(404).json({
        error: "Chapter not found",
        id,
      });
    }
    const existingFields = validate(req);
    if (Object.keys(existingFields).length > 0) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: existingFields,
      });
    }

    const { title, order } = req.body;

    const updated = await db.chapter.update({
      where: { id },
      data: {
        title,
        order,
      },
    });

    res.status(200).json({
      success: true,
      msg: "chapter updated successfuy",
      updated,
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteChapter = async (req, res, next) => {
  try {
    const { id } = req.params;

    const isChapterExists = await db.chapter.findUnique({
      where: { id },
    });

    if (!isChapterExists) {
      return res.status(400).json({
        success: false,
        msg: "chapter not found",
      });
    }

    const [chapter, subChapter] = await db.$transaction([
      db.subChapter.deleteMany({
        where: {
          chapterId: id,
        },
      }),
      db.chapter.delete({
        where: {
          id,
        },
      }),
    ]);

    res.status(204).send({
      success: true,
      msg: "chapter deleted successfuy",
      chapter,
    });
  } catch (err) {
    next(err);
  }
};

exports.getAllChapters = async (req, res, next) => {
  try {
    const chapters = await db.chapter.findMany({
      include: {
        course: true,
        subChapters: true,
      },
    });

    res.json(chapters);
  } catch (err) {
    next(err);
  }
};

exports.getChapterById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const chapter = await db.chapter.findUnique({
      where: { id },
      include: {
        course: true,
        subChapters: true,
      },
    });

    if (!chapter) {
      return res.status(400).json({
        success: false,
        msg: "chapter not found",
      });
    }

    res.status(200).json({ success: true, chapter });
  } catch (err) {
    next(err);
  }
};
