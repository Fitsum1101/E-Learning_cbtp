const db = require("../../config/db");
const cloudinary = require("../../config/coudinary");
const validate = require("../../util/validate.util");
const { deleteFile } = require("../../util/removeFile");

exports.createSubChapter = async (req, res, next) => {
  try {
    const existingFields = validate(req);
    const isFileUploaded = typeof req.file === "object";

    if (Object.keys(existingFields).length > 0) {
      res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: existingFields,
      });
      return isFileUploaded && deleteFile(require.main.path, req, file.path);
    }

    const { title, order, chapterId } = req.body;

    const chapter = await db.chapter.findFirst({
      where: { id: chapterId },
    });

    const file = req.file;
    const filePath = path.join(require.main.path, file.filename);
    const fileName = file.filename + file.mimetype.split("/")[1];
    const folderFileName = "course//" + chapter.title + "//file" + fileName;

    const result = await cloudinary.uploader.upload(filePath, {
      public_id: folderFileName,
      resource_type: "auto",
      use_filename: true,
      unique_filename: false,
      overwrite: false,
    });

    const fileURL = result.secure_url;

    const subChapter = await prisma.subChapter.create({
      data: {
        title,
        videoUrl: fileURL,
        order,
        chapterId,
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
    const { title, videoUrl, videoLength, order } = req.body;

    const updated = await prisma.subChapter.update({
      where: { id },
      data: {
        title,
        videoUrl,
        videoLength,
        order,
      },
    });

    res.json(updated);
  } catch (err) {
    next(err);
  }
};

exports.deleteSubChapter = async (req, res, next) => {
  try {
    const { id } = req.params;

    await prisma.subChapter.delete({ where: { id } });

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

exports.getAllSubChapters = async (req, res, next) => {
  try {
    const subChapters = await prisma.subChapter.findMany({
      include: {
        chapter: true,
        progress: true,
        resources: true,
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

    const subChapter = await prisma.subChapter.findUnique({
      where: { id },
      include: {
        chapter: true,
        progress: true,
        resources: true,
      },
    });

    if (!subChapter) {
      return res.status(404).json({ error: "SubChapter not found" });
    }

    res.json(subChapter);
  } catch (err) {
    next(err);
  }
};
