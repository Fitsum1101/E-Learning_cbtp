exports.createSubChapter = async (req, res, next) => {
  try {
    const { title, videoUrl, videoLength, order, chapterId } = req.body;

    const subChapter = await prisma.subChapter.create({
      data: {
        title,
        videoUrl,
        videoLength,
        order,
        chapterId,
      },
    });

    res.status(201).json(subChapter);
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
