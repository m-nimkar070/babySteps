const { addMinutes, startOfDay, endOfDay } = require('date-fns');
const Appointment = require('../models/appointment');

exports.parseTime = (timeStr, date) => {
  const [hours, minutes] = timeStr.split(':').map(Number);
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), hours, minutes);
};

exports.generateTimeSlots = (start, end, interval) => {
  const slots = [];
  let current = start;
  while (current < end) {
    slots.push(current);
    current = addMinutes(current, interval);
  }
  return slots;
};

exports.getAppointments = async (doctorId, date) => {
  return Appointment.find({
    doctorId,
    date: { $gte: startOfDay(date), $lt: endOfDay(date) }
  });
};

exports.isOverlapping = (start, end, appointment) => {
  const apptEnd = addMinutes(appointment.date, appointment.duration);
  return start < apptEnd && end > appointment.date;
};

exports.isSlotBooked = (newAppt, existingAppts) => {
  const newEnd = addMinutes(newAppt.date, newAppt.duration);
  return existingAppts.some(appt => this.isOverlapping(newAppt.date, newEnd, appt));
};

exports.notifySlotUpdate = (appointment) => {
  const { format } = require('date-fns');
  const io = require('../server').io;  // Importing WebSocket instance

  const appointmentDate = format(appointment.date, 'yyyy-MM-dd');
  io.emit('slot-update', { 
    doctorId: appointment.doctorId, 
    date: appointmentDate 
  });
};
