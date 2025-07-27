const db = require("../../config/db");
const slugify = require("../../util/slugfy");
const validate = require("../../util/validate.util");
const { deleteFile } = require("../../util/removeFile");
const path = require("path");
const { json } = require("body-parser");

const makePath = (filePath) => path.join(require.main.path, filePath);

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

    const { title, description, categoryId } = req.body;

    const slug = slugify(title);
    const adminId = "4195526e-b088-4b0a-b5ce-92f7267e5bfb";
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
        error: { title: "course with this name aleady exists" },
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

exports.getAllCourses = async (req, res, next) => {
  try {
    const courses = await db.course.findMany({
      include: {
        category: true,
        ratings: true,
      },
    });

    res.json(courses);
  } catch (err) {
    next(err);
  }
};

exports.getCourseBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;

    const isSlugExists = await db.course.findUnique({
      where: {
        slug,
      },
    });

    if (!isSlugExists) {
      res.status(400).json({
        sucess: false,
        message: "course not aleady exists",
      });
    }

    const course = await db.course.findUnique({
      where: { slug },
      include: {
        category: true,
        chapters: {
          include: {
            subChapters: {
              include: {
                resources: true,
              },
            },
          },
        },
        ratings: true,
        testimonials: true,
      },
    });

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    res.json(course);
  } catch (err) {
    next(err);
  }
};
