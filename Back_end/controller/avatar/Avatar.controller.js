const db = require("../../config/db");

exports.getAvatars = async (req, res, next) => {
  try {
    const avatars = await db.avatar.findMany({
      include: {
        AvatarCategory: {
          select: {
            style: true,
          },
        },
      },
    });
    console.log(avatars);
    res.json({ message: "Avatar route", data: avatars });
  } catch (error) {
    next(error);
  }
};

exports.createAvater = async (req, res, next) => {
  const { url, name, isFree, minCertificates, minEnrollments, minCompleted } =
    req.body;

  try {
    const avater = await db.avatar.create({
      data: {
        isFree,
        minCertificates,
        minCompleted,
        minEnrollments,
        name,
      },
    });
    res.staus(200).json({
      message: "avater created sucessfuly",
      data: avater,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateAvater = async (req, res, next) => {
  const id = req.params;
  const { url, name, isFree, minCertificates, minEnrollments, minCompleted } =
    req.body;
  try {
    const avater = await db.avatar.update({
      where: { id },
      data: {
        url,
        name,
        isFree,
        minCertificates,
        minEnrollments,
        minCompleted,
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
      id,
    });
    res.status(200).json({
      message: " data feched by the user",
      data: avater,
    });
  } catch (error) {}
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
