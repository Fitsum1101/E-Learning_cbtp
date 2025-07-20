const prisma = require("../../config/db");

const validate = require("../../util/validate.util");
const slugify = require("../../util/slugfy");

exports.createCourseCategory = async (req, res, next) => {
  try {
    const existingFields = validate(req);

    if (Object.keys(existingFields).length > 0) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: existingFields,
      });
    }

    const { name } = req.body;

    const slug = slugify(name);

    const isCatagoryExists = await prisma.courseCategory.findUnique({
      where: {
        slug,
      },
    });

    if (isCatagoryExists) {
      res.status(400).json({
        success: false,
        errors: "catagory aleady exists",
      });
    }

    const category = await prisma.courseCategory.create({
      data: {
        name,
        slug,
      },
    });

    res.status(201).json({
      success: true,
      category,
    });
  } catch (err) {
    next(err);
  }
};

exports.updateCourseCategory = async (req, res, next) => {
  try {
    const { id } = req.params;

    const existingId = await prisma.courseCategory.findFirst({
      where: {
        id,
      },
    });

    if (!existingId || !id) {
      return res.status(400).json({
        success: false,
        message: "Category with this id not exists.",
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

    const { name } = req.body;

    const slug = slugify(name);

    const existing = await prisma.courseCategory.findFirst({
      where: {
        slug,
        NOT: { id },
      },
    });

    if (existing) {
      return res.status(400).json({
        message: "Category with this name  already exists.",
      });
    }
    const updated = await prisma.courseCategory.update({
      where: { id },
      data: {
        name,
        slug,
      },
    });

    res.json({
      success: true,
      updated,
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteCourseCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const existing = await prisma.courseCategory.findFirst({
      where: {
        id,
      },
    });

    if (!existing) {
      return res.status(400).json({
        success: false,
        message: "Category with this id not exists.",
      });
    }

    await prisma.courseCategory.delete({ where: { id } });

    res.status(200).send({
      success: true,
      message: "catagory deleted successfuly",
    });
  } catch (err) {
    next(err);
  }
};

exports.getAllCourseCategories = async (req, res, next) => {
  try {
    const categories = await prisma.courseCategory.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.status(200).send({
      success: true,
      message: categories,
    });
  } catch (err) {
    next(err);
  }
};

exports.getCourseCategoryById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const category = await prisma.courseCategory.findUnique({
      where: { id },
      include: { courses: true },
    });

    if (!category) {
      return res.status(404).json({ error: "CourseCategory not found" });
    }

    res.json(category);
  } catch (err) {
    next(err);
  }
};
