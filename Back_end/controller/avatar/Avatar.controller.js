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
