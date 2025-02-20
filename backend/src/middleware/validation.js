const { body } = require("express-validator");

exports.validateAppointment = [
  body("doctorId").isMongoId(),
  body("date").isISO8601(),
  body("duration").isInt({ min: 1 }),
  body("patientName").notEmpty(),
  body("appointmentType").notEmpty(),
];

// Validation rules for creating a doctor
exports.doctorValidationRules = [
  body("name").notEmpty().withMessage("Name is required"),
  body("workingHours.start")
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .withMessage("Invalid start time format (HH:mm)"),
  body("workingHours.end")
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .withMessage("Invalid end time format (HH:mm)"),
  body("specialization").notEmpty().withMessage("Specialization is required"),
];
