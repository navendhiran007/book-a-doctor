const User = require('../models/User');
const Doctor = require('../models/Doctor');
const Appointment = require('../models/Appointment');
const Notification = require('../models/Notification');

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private (Admin)
const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all doctors for admin management
// @route   GET /api/admin/doctors
// @access  Private (Admin)
const getAllDoctorsForAdmin = async (req, res, next) => {
  try {
    const doctors = await Doctor.find().sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      count: doctors.length,
      doctors,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all appointments for admin
// @route   GET /api/admin/appointments
// @access  Private (Admin)
const getAllAppointmentsForAdmin = async (req, res, next) => {
  try {
    const appointments = await Appointment.find()
      .populate('patientId', 'name email phone')
      .populate('doctorId', 'name specialization location consultationFee')
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

// @desc    Approve doctor registration
// @route   PUT /api/admin/doctors/:id/approve
// @access  Private (Admin)
const approveDoctor = async (req, res, next) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      return res.status(404).json({ success: false, message: 'Doctor not found.' });
    }

    doctor.approvalStatus = 'approved';
    await doctor.save();

    // Ensure user role is doctor
    if (doctor.userId) {
      await User.findByIdAndUpdate(doctor.userId, { role: 'doctor' });
      await Notification.create({
        userId: doctor.userId,
        message: 'Congratulations! Your doctor profile has been approved by the Admin. You can now accept patient appointments.',
        type: 'admin',
      });
    }

    return res.status(200).json({
      success: true,
      message: `Doctor Dr. ${doctor.name} has been approved successfully.`,
      doctor,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Reject doctor registration
// @route   PUT /api/admin/doctors/:id/reject
// @access  Private (Admin)
const rejectDoctor = async (req, res, next) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      return res.status(404).json({ success: false, message: 'Doctor not found.' });
    }

    doctor.approvalStatus = 'rejected';
    await doctor.save();

    if (doctor.userId) {
      await Notification.create({
        userId: doctor.userId,
        message: 'Your doctor profile registration application was rejected by Admin. Please contact support or update your credentials.',
        type: 'admin',
      });
    }

    return res.status(200).json({
      success: true,
      message: `Doctor Dr. ${doctor.name} registration has been rejected.`,
      doctor,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get Platform Statistics
// @route   GET /api/admin/stats
// @access  Private (Admin)
const getPlatformStats = async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalPatients = await User.countDocuments({ role: 'patient' });
    const totalDoctors = await Doctor.countDocuments();
    const pendingDoctors = await Doctor.countDocuments({ approvalStatus: 'pending' });
    const approvedDoctors = await Doctor.countDocuments({ approvalStatus: 'approved' });
    const totalAppointments = await Appointment.countDocuments();
    const pendingAppointments = await Appointment.countDocuments({ status: 'Pending' });

    return res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        totalPatients,
        totalDoctors,
        pendingDoctors,
        approvedDoctors,
        totalAppointments,
        pendingAppointments,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUsers,
  getAllDoctorsForAdmin,
  getAllAppointmentsForAdmin,
  approveDoctor,
  rejectDoctor,
  getPlatformStats,
};
