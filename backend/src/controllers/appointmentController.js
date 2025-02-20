const Appointment = require('../models/appointment');
const { validationResult } = require('express-validator');
const { getAppointments, isSlotBooked, notifySlotUpdate } = require('../services/appointmentService');

exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().populate('doctorId');
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createAppointment = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const newAppt = req.body;
    const appointments = await getAppointments(newAppt.doctorId, newAppt.date);
    
    if (isSlotBooked(newAppt, appointments)) {
      return res.status(400).json({ message: 'Time slot already booked' });
    }

    const appointment = await Appointment.create(newAppt);
    notifySlotUpdate(appointment);
    res.status(201).json(appointment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
