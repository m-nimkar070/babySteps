const express = require("express");
const doctorRoutes = require("./doctorRoutes");
const appointmentsRoutes = require("./appointmentRoutes")
const router = express.Router();

router.use("/doctors" , doctorRoutes);
router.use("/appointments" , appointmentsRoutes);

module.exports = router;