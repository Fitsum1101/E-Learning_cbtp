const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.createResource = async (req, res, next) => {
  try {
    const { title, subChapterId } = req.body;

    const resource = await prisma.resource.create({
      data: {
        title,
        fileUrl,
        fileType,
        subChapterId,
      },
    });
    res.status(201).json(resource);
  } catch (err) {
    next(err);
  }
};

exports.updateResource = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, fileUrl, fileType } = req.body;

    const updated = await prisma.resource.update({
      where: { id },
      data: {
        title,
        fileUrl,
        fileType,
      },
    });

    res.json(updated);
  } catch (err) {
    next(err);
  }
};

exports.deleteResource = async (req, res, next) => {
  try {
    const { id } = req.params;

    await prisma.resource.delete({ where: { id } });

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

exports.getAllResources = async (req, res, next) => {
  try {
    const resources = await prisma.resource.findMany({
      include: {
        subChapter: true,
      },
    });

    res.json(resources);
  } catch (err) {
    next(err);
  }
};

exports.getResourceById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const resource = await prisma.resource.findUnique({
      where: { id },
      include: {
        subChapter: true,
      },
    });

    if (!resource) {
      return res.status(404).json({ error: "Resource not found" });
    }

    res.json(resource);
  } catch (err) {
    next(err);
  }
};
