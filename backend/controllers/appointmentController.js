const Appointment = require('../models/Appointment');
const User = require('../models/User');
const Doctor=require('../models/Doctor');
const Notification = require('../models/Notification');

// @desc    Create new appointment
// @route   POST /api/appointments
// @access  Private (Patient / Admin)
const createAppointment = async (req, res, next) => {
  try {
    const { doctorId, appointmentDate, appointmentTime, reason } = req.body;

    if (!doctorId || !appointmentDate || !appointmentTime || !reason) {
      return res.status(400).json({ success: false, message: 'Please provide doctorId, appointmentDate, appointmentTime, and reason.' });
    }

    // Find doctor profile
const doctorProfile = await Doctor.findById(doctorId);

if (!doctorProfile) {
  return res.status(404).json({
    success: false,
    message: 'Doctor profile not found.'
  });
}

// Find corresponding user
const doctor = await User.findById(doctorProfile.userId);

if (!doctor) {
  return res.status(404).json({
    success: false,
    message: 'Doctor user not found.'
  });
}

    const existingAppointment = await Appointment.findOne({
  doctorId: doctor._id,
  appointmentDate,
  appointmentTime,
  status: { $in: ['Pending', 'Confirmed'] },
});
    if (existingAppointment) {
      return res.status(409).json({
        success: false,
        message: 'This time slot is already booked for the selected doctor. Please choose a different date or time.',
      });
    }

    const appointment = await Appointment.create({
  patientId: req.user._id,
  doctorId: doctor._id,
  appointmentDate,
  appointmentTime,
  reason,
  status: 'Pending',
});

    // 4. Create Notification for Patient
    await Notification.create({
      userId: req.user._id,
      message: `Your appointment request with Dr. ${doctor.name} on ${appointmentDate} at ${appointmentTime} has been submitted (Pending).`,
      type: 'appointment',
    });

    // 5. Create Notification for Doctor
    await Notification.create({
      userId: doctor._id,
      message: `New appointment requested by ${req.user.name} for ${appointmentDate} at ${appointmentTime}.`,
      type: 'appointment',
    });

    return res.status(201).json({
      success: true,
      message: 'Appointment booked successfully!',
      appointment,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user appointments (role filtered)
// @route   GET /api/appointments
// @access  Private
const getAppointments = async (req, res, next) => {
  try {
    let query = {};

    if (req.user.role === 'patient') {
      query.patientId = req.user._id;
    } else if (req.user.role === 'doctor') {
      query.doctorId = req.user._id; // Doctor's ID is the same as User ID
    }

    const appointments = await Appointment.find(query)
      .populate('patientId', 'name email phone profileImage')
      .populate('doctorId', 'name email')
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: appointments.length,
      appointments,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single appointment details
// @route   GET /api/appointments/:id
// @access  Private
const getAppointmentById = async (req, res, next) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate('patientId', 'name email phone profileImage')
      .populate('doctorId', 'name email');

    if (!appointment) {
      return res.status(404).json({ success: false, message: 'Appointment not found.' });
    }

    const isPatient = appointment.patientId._id.toString() === req.user._id.toString();
    const isDoctor = req.user.role === 'doctor' && appointment.doctorId._id.toString() === req.user._id.toString();

    if (req.user.role !== 'admin' && !isPatient && !isDoctor) {
      return res.status(403).json({ success: false, message: 'Not authorized to view this appointment.' });
    }

    return res.status(200).json({ success: true, appointment });
  } catch (error) {
    next(error);
  }
};

// @desc    Update appointment status
// @route   PUT /api/appointments/:id
// @access  Private
const updateAppointmentStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const validStatuses = ['Pending', 'Confirmed', 'Rejected', 'Cancelled', 'Completed'];
    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: `Invalid status.` });
    }

    const appointment = await Appointment.findById(req.params.id)
      .populate('patientId', 'name email')
      .populate('doctorId', 'name');

    if (!appointment) {
      return res.status(404).json({ success: false, message: 'Appointment not found.' });
    }

    if (req.user.role === 'patient' && appointment.patientId._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized.' });
    } 
    if (req.user.role === 'doctor' && appointment.doctorId._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized.' });
    }

    appointment.status = status;
    await appointment.save();

    await Notification.create({
      userId: appointment.patientId._id,
      message: `Your appointment status with Dr. ${appointment.doctorId.name} on ${appointment.appointmentDate} has been updated to: ${status}.`,
      type: 'status',
    });

    return res.status(200).json({ success: true, message: `Appointment status updated to ${status}.`, appointment });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete appointment
// @route   DELETE /api/appointments/:id
// @access  Private
const deleteAppointment = async (req, res, next) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ success: false, message: 'Appointment not found.' });
    }
    if (req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Only administrators can delete appointments.' });
    }
    await appointment.deleteOne();
    return res.status(200).json({ success: true, message: 'Appointment deleted successfully.' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createAppointment,
  getAppointments,
  getAppointmentById,
  updateAppointmentStatus,
  deleteAppointment,
};