const Doctor = require('../models/Doctor');

// @desc    Get all doctors
// @route   GET /api/doctors
// @access  Public
const getDoctors = async (req, res, next) => {
  try {
    const { name, specialization, location, status } = req.query;

    const query = {};

    // Filter by approval status
    if (status) {
      query.approvalStatus =
        status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
    } else {
      query.approvalStatus = "Approved";
    }

    // Search by name
    if (name) {
      query.name = { $regex: name, $options: "i" };
    }

    // Search by specialization
    if (specialization) {
      query.specialization = { $regex: specialization, $options: "i" };
    }

    // Search by location
    if (location) {
      query.location = { $regex: location, $options: "i" };
    }

    const doctors = await Doctor.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: doctors.length,
      doctors,
    });

  } catch (error) {
    next(error);
  }
};

// @desc    Get single doctor
// @route   GET /api/doctors/:id
// @access  Public
const getDoctorById = async (req, res, next) => {
  try {
    const doctor = await Doctor.findById(doctorId);

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    res.status(200).json({
      success: true,
      doctor,
    });

  } catch (error) {
    next(error);
  }
};

// @desc    Create doctor profile
// @route   POST /api/doctors
// @access  Private
const createDoctorProfile = async (req, res, next) => {
  try {
    const {
      name,
      email,
      specialization,
      qualification,
      experience,
      consultationFee,
      location,
      about,
      availability,
    } = req.body;

    const existingDoctor = await Doctor.findOne({
      userId: req.user._id,
    });

    if (existingDoctor) {
      return res.status(409).json({
        success: false,
        message: "Doctor profile already exists.",
      });
    }

    const doctor = await Doctor.create({
      userId: req.user._id,
      name: name || req.user.name,
      email: email || req.user.email,
      specialization,
      qualification,
      experience,
      consultationFee,
      location,
      about,
      availability: availability || [],
      approvalStatus:
        req.user.role === "admin" ? "Approved" : "Pending",
    });

    res.status(201).json({
      success: true,
      message: "Doctor profile created successfully.",
      doctor,
    });

  } catch (error) {
    next(error);
  }
};

// @desc    Update doctor
// @route   PUT /api/doctors/:id
// @access  Private
const updateDoctorProfile = async (req, res, next) => {
  try {
    const doctor = await Doctor.findById(req.params.id);

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    if (
      req.user.role !== "admin" &&
      doctor.userId.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    Object.assign(doctor, req.body);

    const updatedDoctor = await doctor.save();

    res.status(200).json({
      success: true,
      message: "Doctor updated successfully.",
      doctor: updatedDoctor,
    });

  } catch (error) {
    next(error);
  }
};

// @desc    Delete doctor
// @route   DELETE /api/doctors/:id
// @access  Private/Admin
const deleteDoctorProfile = async (req, res, next) => {
  try {
    const doctor = await Doctor.findById(req.params.id);

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    await doctor.deleteOne();

    res.status(200).json({
      success: true,
      message: "Doctor deleted successfully.",
    });

  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDoctors,
  getDoctorById,
  createDoctorProfile,
  updateDoctorProfile,
  deleteDoctorProfile,
};