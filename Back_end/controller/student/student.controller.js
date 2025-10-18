const db = require("../../config/db");

exports.getStudent = async (req, res, next) => {
  const role = req.user?.role || "ADMIN";
  const userId = req.user?.id || "123fds82idjs";
  try {
    const getStudents = await db.enrollment.groupBy({
      by: "userId",
      _count: {
        userId: true,
      },
      _avg: {
        courseProgress: true,
      },
      where: {
        course: {
          adminId: "94b57e76-04a9-49bd-9547-8dc14e17e337",
        },
      },
    });

    const stuents = await Promise.all(
      getStudents.map(async (stu) => {
        const student = await db.user.findUnique({
          where: {
            id: stu.userId,
          },
        });
        delete stu.userId;
        return { ...stu, ...student };
      })
    );
    res.status(200).json({
      sucess: true,
      data: stuents,
    });
  } catch (error) {
    next(error);
  }
};
