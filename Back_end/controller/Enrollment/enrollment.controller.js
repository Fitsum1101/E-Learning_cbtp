const db = require("../../config/db");
const validate = require("../../util/validate.util");

exports.createEnrollment = async (req, res, next) => {
  const { userId, courseId } = req.body;
  try {
    const enrollment = await db.enrollment.create({
      data: { userId, courseId },
    });
    res.status(201).json(enrollment);
  } catch (err) {
    next(err);
  }
};

exports.getAllEnrollments = async (req, res, next) => {
  try {
    const enrollments = await db.enrollment.findMany({
      include: { user: true, course: true },
    });
    res.json(enrollments);
  } catch (err) {
    next(err);
  }
};

exports.getEnrollmentById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const enrollment = await db.enrollment.findUnique({
      where: { id },
      include: { user: true, course: true },
    });
    if (!enrollment) return res.status(404).json({ error: "Not found" });
    res.json(enrollment);
  } catch (err) {
    next(err);
  }
};

exports.updateEnrollment = async (req, res, next) => {
  const { id } = req.params;
  const { completed } = req.body;
  try {
    const updated = await db.enrollment.update({
      where: { id },
      data: { completed },
    });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

exports.deleteEnrollment = async (req, res, next) => {
  const { id } = req.params;
  try {
    await db.enrollment.delete({
      where: { id },
    });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

exports.getUserEnrollments = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const enrollments = await db.enrollment.findMany({
      where: { userId },
      include: { course: true },
    });
    res.json(enrollments);
  } catch (err) {
    next(err);
  }
};

exports.markAsCompleted = async (req, res, next) => {
  const { id } = req.params;
  try {
    const updated = await db.enrollment.update({
      where: { id },
      data: { completed: true },
    });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};
