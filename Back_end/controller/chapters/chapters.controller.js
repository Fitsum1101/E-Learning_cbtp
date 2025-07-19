exports.createChapter = async (req, res, next) => {
  try {
    const { title, order, courseId } = req.body;

    const chapter = await prisma.chapter.create({
      data: {
        title,
        order,
        courseId,
      },
    });

    res.status(201).json(chapter);
  } catch (err) {
    next(err);
  }
};

exports.updateChapter = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, order } = req.body;

    const updated = await prisma.chapter.update({
      where: { id },
      data: {
        title,
        order,
      },
    });

    res.json(updated);
  } catch (err) {
    next(err);
  }
};

exports.deleteChapter = async (req, res, next) => {
  try {
    const { id } = req.params;

    await prisma.chapter.delete({ where: { id } });

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

exports.getAllChapters = async (req, res, next) => {
  try {
    const chapters = await prisma.chapter.findMany({
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

    const chapter = await prisma.chapter.findUnique({
      where: { id },
      include: {
        course: true,
        subChapters: true,
      },
    });

    if (!chapter) {
      return res.status(404).json({ error: "Chapter not found" });
    }

    res.json(chapter);
  } catch (err) {
    next(err);
  }
};
