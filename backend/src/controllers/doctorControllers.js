const Doctor = require("../models/doctor");
const { validationResult } = require("express-validator");
const {
  parseISO,
  format,
  addMinutes,
  startOfDay,
  endOfDay,
} = require("date-fns");
const {
  getAppointments,
  generateTimeSlots,
  isOverlapping,
  parseTime,
} = require("../services/appointmentService");

exports.getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createDoctor = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  try {
    const { name, workingHours, specialization } = req.body;
    const doctor = new Doctor({ name, workingHours, specialization });
    await doctor.save();
    res.status(201).json(doctor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getDoctorSlots = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    const date = parseISO(req.query.date);

    const startTime = parseTime(doctor.workingHours.start, date);
    const endTime = parseTime(doctor.workingHours.end, date);
    console.log(startTime, "startTime", endTime);

    const slots = generateTimeSlots(startTime, endTime, 30);
    const appointments = await getAppointments(doctor._id, date);

    const availableSlots = slots.filter(
      (slot) =>
        !appointments.some((appt) =>
          isOverlapping(slot, addMinutes(slot, 30), appt)
        )
    );

    res.json(availableSlots.map((slot) => format(slot, "HH:mm")));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
