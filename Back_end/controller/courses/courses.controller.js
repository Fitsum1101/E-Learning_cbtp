const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.createCourse = async (req, res, next) => {
  try {
    const { title, description, categoryId, adminId } = req.body;

    const thumbnail = req.file.path;
    const slug = title
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9\-]/g, "");

    const course = await prisma.course.create({
      data: {
        title,
        slug,
        description,
        thumbnail,
        categoryId,
        adminId,
      },
    });

    res.status(201).json(course);
  } catch (err) {
    next(err);
  }
};

exports.updateCourse = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, categoryId, published } = req.body;
    const thumbnail = req.file.path;

    const updated = await prisma.course.update({
      where: { id },
      data: {
        title,
        description,
        thumbnail,
        categoryId,
        published,
        updatedAt: new Date(),
      },
    });

    res.json(updated);
  } catch (err) {
    next(err);
  }
};

exports.deleteCourse = async (req, res, next) => {
  try {
    const { id } = req.params;

    await prisma.course.delete({ where: { id } });

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

exports.getAllCourses = async (req, res, next) => {
  try {
    const courses = await prisma.course.findMany({
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

    const course = await prisma.course.findUnique({
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
