const db = require("../../config/db");
const validate = require("../../util/validate.util");

exports.getAvatars = async (req, res, next) => {
  try {
    const avatars = await db.avatar.findMany();

    res.status(200).json({
      sucess: true,
      data: avatars.map((ava) => ({ ...ava, seed: ava.url.split("=")[1] })),
    });
  } catch (error) {
    next(error);
  }
};

exports.getAvaterDatas = async (req, res, next) => {
  try {
    const totalAvatars = await db.avatar.count();
    const activeAvaters = await db.avatar.count({
      where: {
        isFree: false,
      },
    });
    const lockedAvaters = await db.avatar.count({
      where: {
        isFree: true,
      },
    });
    res.status(200).json({
      success: true,
      data: {
        "Total Avatars": totalAvatars,
        "Locked Avatars": lockedAvaters,
        "Active Avatars": activeAvaters,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.createAvater = async (req, res, next) => {
  const { url, name, minCertificates, minCompleted, style } = req.body;
  const isFree = +minCertificates === +minCompleted;
  console.log({ style });
  try {
    const existingFields = validate(req);

    if (Object.keys(existingFields).length > 0)
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: existingFields,
      });

    const avater = await db.avatar.create({
      data: {
        isFree,
        url,
        minCertificates: +minCertificates,
        minCompleted: +minCompleted,
        name,
        style,
      },
    });

    console.log({ avater });

    res.status(200).json({
      message: "avater created sucessfuly",
      data: avater,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateAvater = async (req, res, next) => {
  const { id } = req.params;
  const { url, name, minCertificates, minCompleted, style } = req.body;
  try {
    const existingFields = validate(req);

    if (Object.keys(existingFields).length > 0)
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: existingFields,
      });

    const avater = await db.avatar.update({
      where: { id },
      data: {
        url,
        name,
        minCertificates: +minCertificates,
        minCompleted: +minCompleted,
        style,
        isFree: +minCertificates === +minCompleted && !+minCertificates,
      },
    });
    res.status(200).json({
      message: "avater update sucessfuly",
      data: avater,
    });
  } catch (error) {
    next(error);
  }
};

exports.getAvaterById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const avater = await db.avatar.findUnique({
      where: { id },
    });

    res.status(200).json({
      message: " data feched by the user",
      data: { ...avater, seed: avater.url.split("=")[1] },
    });
  } catch (error) {
    next(error);
  }
};
exports.deleteAvaterById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const avater = await db.avatar.delete({
      id,
    });
    res.status(200).json({
      message: " data feched by the user",
      data: avater,
    });
  } catch (error) {
    next(error);
  }
};
