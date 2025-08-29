const express = require("express");
const router = express.Router();

const enrollmentController = require("../../controller/Enrollment/enrollment.controller");

router.get("/enrollments/courses", enrollmentController.getEnrollmentCourses);

// ✅ Get all enrollments
router.get("/enrollments", enrollmentController.getAllEnrollments);

// ✅ Get a specific enrollment by ID
router.get("/enrollments/:slug", enrollmentController.getEnrollmentById);

// ✅ Create a new enrollment
router.post("/enrollments", enrollmentController.createEnrollment);

// ✅ Update an enrollment (e.g., mark as completed or other fields)
router.put("/enrollments/:id", enrollmentController.updateEnrollment);

module.exports = router;
