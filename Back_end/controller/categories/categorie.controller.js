exports.createCourseCategory = async (req, res, next) => {
  try {
    const { name, slug } = req.body;

    const category = await prisma.courseCategory.create({
      data: {
        name,
        slug,
      },
    });

    res.status(201).json(category);
  } catch (err) {
    next(err);
  }
};

exports.updateCourseCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, slug } = req.body;

    const updated = await prisma.courseCategory.update({
      where: { id },
      data: {
        name,
        slug,
      },
    });

    res.json(updated);
  } catch (err) {
    next(err);
  }
};

exports.deleteCourseCategory = async (req, res, next) => {
  try {
    const { id } = req.params;

    await prisma.courseCategory.delete({ where: { id } });

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

exports.getAllCourseCategories = async (req, res, next) => {
  try {
    const categories = await prisma.courseCategory.findMany({
      include: { courses: true },
      orderBy: { createdAt: "desc" },
    });

    res.json(categories);
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
