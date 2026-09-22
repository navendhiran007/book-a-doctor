const express = require('express');
const router = express.Router();
const { protect, authorizeRoles } = require('../middleware/authMiddleware');
const {
  getAllUsers,
  getAllDoctorsForAdmin,
  getAllAppointmentsForAdmin,
  approveDoctor,
  rejectDoctor,
  getPlatformStats,
} = require('../controllers/adminController');

// Protect all admin routes
router.use(protect);
router.use(authorizeRoles('admin'));

router.get('/users', getAllUsers);
router.get('/doctors', getAllDoctorsForAdmin);
router.get('/appointments', getAllAppointmentsForAdmin);
router.get('/stats', getPlatformStats);

router.put('/doctors/:id/approve', approveDoctor);
router.put('/doctors/:id/reject', rejectDoctor);

module.exports = router;
