const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Doctor = require('../models/Doctor');

// Generate JWT Token helper
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'book_a_doctor_super_secret_jwt_key_2026', {
    expiresIn: '30d',
  });
};

// @desc    Register a new user (patient/doctor/admin)
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, phone, role, specialization, qualification, experience, consultationFee, location, about } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide name, email, and password.' });
    }

    // Check if user exists
    const userExists = await User.findOne({ email: email.toLowerCase() });
    if (userExists) {
      return res.status(409).json({ success: false, message: 'User already exists with this email address.' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userRole = role && ['patient', 'doctor', 'admin'].includes(role) ? role : 'patient';

    // Create User
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      phone: phone || '',
      role: userRole,
    });

    // If role is doctor, create linked Doctor profile
    if (userRole === 'doctor') {
      await Doctor.create({
        userId: user._id,
        name: user.name,
        email: user.email,
        specialization: specialization || 'General Physician',
        qualification: qualification || 'MBBS',
        experience: experience || '1 Year',
        consultationFee: consultationFee || 500,
        location: location || 'Clinic Address Required',
        about: about || '',
        approvalStatus: 'pending',
      });
    }

    const token = generateToken(user._id);

    return res.status(201).json({
      success: true,
      message: userRole === 'doctor' 
        ? 'Registration successful! Your doctor profile is pending admin approval.'
        : 'Registration successful!',
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password.' });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }

    let doctorInfo = null;
    if (user.role === 'doctor') {
      doctorInfo = await Doctor.findOne({ userId: user._id });
    }

    const token = generateToken(user._id);

    return res.status(200).json({
      success: true,
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        doctorProfile: doctorInfo,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get logged in user profile
// @route   GET /api/auth/me
// @access  Private
const getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    let doctorProfile = null;
    if (user.role === 'doctor') {
      doctorProfile = await Doctor.findOne({ userId: user._id });
    }
    return res.status(200).json({
      success: true,
      user: {
        ...user.toObject(),
        doctorProfile,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { registerUser, loginUser, getUserProfile };
