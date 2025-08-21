const path = require("path");
const fs = require("fs");

const db = require("../../config/db");

const validate = require("../../util/validate.util");
const { deleteFile } = require("../../util/removeFile");

exports.createSubChapter = async (req, res, next) => {
  try {
    const existingFields = validate(req);
    const isFileUploaded = typeof req.file === "object";

    let file = req.file;

    if (!isFileUploaded) existingFields.course_file = "NO course file upoaded";

    if (Object.keys(existingFields).length > 0) {
      res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: existingFields,
      });

      file && deleteFile(path.join(require.main.path, file.path));
      return;
    }

    const { title, chapterId, minute, chapterMinute } = req.body;

    const order = await db.subChapter.count({
      where: { chapterId },
    });

    const fileUrl = file.path;

    const subChapter = await db.subChapter.create({
      data: {
        title,
        fileUrl,
        order: order + 1,
        chapterId,
        chapterTakeMinute: chapterMinute,
        minute: +minute,
      },
    });

    res.status(201).json({
      success: true,
      subChapter,
    });
  } catch (err) {
    next(err);
  }
};

exports.updateSubChapter = async (req, res, next) => {
  try {
    const { id } = req.params;

    let file = req.file;

    const subChapter = await db.subChapter.findUnique({
      where: { id },
    });

    if (!subChapter) {
      res.status(404).json({
        success: false,
        message: "NOT Found",
      });
      file && deleteFile(path.join(require.main.path, file.path));
      return;
    }

    const existingFields = validate(req);
    const isFileUploaded = typeof req.file === "object";

    if (Object.keys(existingFields).length > 0) {
      res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: existingFields,
      });
      file && deleteFile(path.join(require.main.path, file.path));
      return;
    }

    const { title, order } = req.body;

    const fileUrl = isFileUploaded ? file.path : subChapter.fileUrl;
    const updated = await db.subChapter.update({
      where: { id },
      data: {
        fileUrl,
        title,
        order,
      },
    });

    res.status(200).json({
      success: "true",
      message: "subChapter uploaded succesfuly",
      updated,
    });
    file && deleteFile(path.join(require.main.path, subChapter.fileUrl));
  } catch (err) {
    next(err);
  }
};

exports.deleteSubChapter = async (req, res, next) => {
  try {
    const { id } = req.params;
    let file = req.file;

    const subChapter = await db.subChapter.findUnique({
      where: { id },
    });

    if (!subChapter) {
      return res.status(404).json({
        success: false,
        message: "NOT Found",
      });
    }

    await db.subChapter.delete({ where: { id } });

    res.status(204).send({
      success: true,
      message: "suchapter deleted successfuly",
    });

    file && deleteFile(path.join(require.main.path, subChapter.fileUrl));
  } catch (err) {
    next(err);
  }
};

exports.getAllSubChapters = async (req, res, next) => {
  try {
    let file = req.file;

    const subChapters = await db.subChapter.findMany({
      include: {
        chapter: true,
      },
    });

    res.json(subChapters);
  } catch (err) {
    next(err);
  }
};

exports.getSubChapterById = async (req, res, next) => {
  try {
    const { id } = req.params;
    let file = req.file;

    const subChapter = await db.subChapter.findUnique({
      where: { id },
    });

    if (!subChapter) {
      return res.status(404).json({
        success: false,
        message: "NOT Found",
      });
    }
    res.json(subChapter);
  } catch (err) {
    next(err);
  }
};

exports.getSubChapterById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const subChapter = await db.subChapter.findUnique({
      where: { id },
    });

    if (!subChapter) {
      return res.status(404).json({
        success: false,
        message: "NOT Found",
      });
    }

    const filePath = path.join(require.main.path, subChapter.fileUrl);

    const readStream = fs.createReadStream(filePath);
    readStream.pipe(res);
  } catch (err) {
    next(err);
  }
};
