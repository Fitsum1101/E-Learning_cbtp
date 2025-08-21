const express = require("express");
const router = express.Router();

const enrollmentController = require("../../controller/Enrollment/enrollment.controller");

// ✅ Get all enrollments
router.get("/", enrollmentController.getAllEnrollments);

// ✅ Get a specific enrollment by ID
router.get("/:id", enrollmentController.getEnrollmentById);

// ✅ Create a new enrollment
router.post("/", enrollmentController.createEnrollment);

// ✅ Update an enrollment (e.g., mark as completed or other fields)
router.put("/:id", enrollmentController.updateEnrollment);

// ✅ Delete an enrollment
router.delete("/:id", enrollmentController.deleteEnrollment);

// ✅ Get all enrollments for a specific user
router.get("/user/:userId", enrollmentController.getUserEnrollments);

// ✅ Mark an enrollment as completed (PATCH)
router.patch("/:id/complete", enrollmentController.markAsCompleted);

module.exports = router;
