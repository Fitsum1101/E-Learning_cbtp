const db = require("../../config/db");
const cloudinary = require("../../config/coudinary");
const validate = require("../../util/validate.util");
const { deleteFile } = require("../../util/removeFile");
const path = require("path");
const slugify = require("../../util/slugfy");

let globaleFile;

exports.createSubChapter = async (req, res, next) => {
  try {
    const existingFields = validate(req);
    const isFileUploaded = typeof req.file === "object";

    if (!isFileUploaded) existingFields.course_file = "NO course file upoaded";
    if (isFileUploaded) globaleFile = req.file;

    if (Object.keys(existingFields).length > 0) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: existingFields,
      });
    }

    const { title, order, chapterId } = req.body;

    const chapter = await db.chapter.findFirst({
      where: { id: chapterId },
      include: {
        course: {
          select: {
            slug: true,
          },
        },
      },
    });

    const slug = slugify(chapter.title);

    const filePath = path.join(require.main.path, globaleFile.path);
    const fileName = globaleFile.filename;
    const folderName = path
      .join("course", chapter.course.slug, slug, "file")
      .replaceAll(/\\/g, "/");

    const result = await cloudinary.uploader.upload(filePath, {
      public_id: fileName,
      folder: folderName,
      resource_type: "auto",
      use_filename: true,
      unique_filename: false,
      overwrite: false,
    });

    const fileUrl = result.secure_url;

    const subChapter = await db.subChapter.create({
      data: {
        title,
        fileUrl,
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
  } finally {
    globaleFile && deleteFile(path.join(require.main.path, globaleFile.path));
    globaleFile = undefined;
  }
};

exports.updateSubChapter = async (req, res, next) => {
  try {
    const { id } = req.params;

    const subChapter = await db.subChapter.findUnique({
      where: { id },
      include: {
        chapter: {
          include: {
            course: {
              select: {
                slug: true,
              },
            },
          },
        },
      },
    });

    if (!subChapter) {
      return res.status(404).json({
        success: false,
        message: "NOT Found",
      });
    }

    const existingFields = validate(req);
    const isFileUploaded = typeof req.file === "object";

    if (isFileUploaded) globaleFile = req.file;

    if (Object.keys(existingFields).length > 0) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: existingFields,
      });
    }

    const { title, order } = req.body;

    let result;

    if (isFileUploaded) {
      await cloudinary.uploader.destroy(
        "course" + subChapter.fileUrl.split("course")[1],
        {
          resource_type: "raw",
        }
      );
      const fileName = globaleFile.filename;
      const slug = slugify(subChapter.chapter.title);
      const folderName = path
        .join("course", subChapter.chapter.course.slug, slug, "file")
        .replaceAll(/\\/g, "/");

      const filePath = path.join(require.main.path, globaleFile.path);

      result = await cloudinary.uploader.upload(filePath, {
        public_id: fileName,
        folder: folderName,
        resource_type: "auto",
        use_filename: true,
        unique_filename: false,
        overwrite: false,
      });
    }

    const fileUrl = isFileUploaded ? result.secure_url : subChapter.fileUrl;
    const updated = await db.subChapter.update({
      where: { id },
      data: {
        fileUrl,
        title,
        order,
      },
    });

    res.json(updated);
  } catch (err) {
    next(err);
  } finally {
    globaleFile && deleteFile(path.join(require.main.path, globaleFile.path));
    globaleFile = undefined;
  }
};

exports.deleteSubChapter = async (req, res, next) => {
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

    await cloudinary.uploader.destroy(
      "course" + subChapter.fileUrl.split("course")[1],
      {
        resource_type: "raw",
      }
    );

    await db.subChapter.delete({ where: { id } });

    res.status(204).send({
      success: true,
      message: "suchapter deleted successfuly",
    });
  } catch (err) {
    next(err);
  }
};

exports.getAllSubChapters = async (req, res, next) => {
  try {
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
