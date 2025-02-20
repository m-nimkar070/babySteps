const express = require("express");
const router = express.Router();
const doctorController = require("../../controllers/doctorControllers");
const { doctorValidationRules } = require("../../middleware/validation");

router.get("/", doctorController.getDoctors);
router.post("/", doctorValidationRules, doctorController.createDoctor);
router.get("/:id/slots", doctorController.getDoctorSlots);

module.exports = router;
