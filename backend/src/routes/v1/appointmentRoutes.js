const express = require('express');
const router = express.Router();
const appointmentController = require('../../controllers/appointmentController');
const { validateAppointment } = require('../../middleware/validation');

router.get('/', appointmentController.getAppointments);
router.post('/', validateAppointment, appointmentController.createAppointment);

module.exports = router;
