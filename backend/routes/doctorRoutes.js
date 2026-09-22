const express = require('express');
const router = express.Router();
const {
  getDoctors,
  getDoctorById,
  createDoctorProfile,
  updateDoctorProfile,
  deleteDoctorProfile,
} = require('../controllers/doctorController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

router.route('/')
  .get(getDoctors)
  .post(protect, authorizeRoles('doctor', 'admin'), createDoctorProfile);

router.route('/:id')
  .get(getDoctorById)
  .put(protect, authorizeRoles('doctor', 'admin'), updateDoctorProfile)
  .delete(protect, authorizeRoles('admin'), deleteDoctorProfile);

module.exports = router;
