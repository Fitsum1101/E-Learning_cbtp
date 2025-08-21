const db = require("../../config/db");
const validate = require("../../util/validate.util");

exports.createResource = async (req, res, next) => {
  try {
    const existingFields = validate(req);
    const isFileUploaded = typeof req.file === "object";

    if (!isFileUploaded) existingFields.course_file = "NO course file upoaded";

    if (Object.keys(existingFields).length > 0) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: existingFields,
      });
    }

    const { subChapterId } = req.body;

    let fileUrl = req.file.path;
    let fileType = req.file.mimetype.split("/")[0];

    const resource = await db.resource.create({
      data: {
        fileUrl,
        fileType,
        subChapterId,
      },
    });

    res.status(201).json({
      success: true,
      message: "file uploading successfuly",
      resource,
    });
  } catch (err) {
    next(err);
  }
};

exports.updateResource = async (req, res, next) => {
  try {
    const { id } = req.params;

    const updated = await db.resource.update({
      where: { id },
      data: {
        fileUrl,
        fileType,
      },
    });

    res
      .status(200)
      .json({ success: true, message: "updated successfuly", updated });
  } catch (err) {
    next(err);
  }
};

exports.deleteResource = async (req, res, next) => {
  try {
    const { id } = req.params;

    await db.resource.delete({ where: { id } });

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

exports.getAllResources = async (req, res, next) => {
  try {
    const resources = await db.resource.findMany({
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

    const resource = await db.resource.findUnique({
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
