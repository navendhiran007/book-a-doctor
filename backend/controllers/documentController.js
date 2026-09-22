const path = require('path');
const fs = require('fs');
const Document = require('../models/Document');
const Doctor = require('../models/Doctor');
const Appointment = require('../models/Appointment');
const Notification = require('../models/Notification');

// @desc    Upload medical document/report
// @route   POST /api/documents/upload
// @access  Private (Patient / Admin)
const uploadDocument = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Please select a file to upload.' });
    }

    const { doctorId, appointmentId } = req.body;

    const doc = await Document.create({
      patientId: req.user._id,
      doctorId: doctorId || null,
      appointmentId: appointmentId || null,
      fileName: req.file.originalname,
      filePath: req.file.filename,
      fileType: req.file.mimetype,
      fileSize: req.file.size,
    });

    // Notify doctor if associated
    if (doctorId) {
      const doctor = await Doctor.findById(doctorId);
      if (doctor && doctor.userId) {
        await Notification.create({
          userId: doctor.userId,
          message: `Patient ${req.user.name} uploaded a medical document (${req.file.originalname}).`,
          type: 'info',
        });
      }
    }

    return res.status(201).json({
      success: true,
      message: 'Document uploaded successfully.',
      document: doc,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get medical documents (role filtered)
// @route   GET /api/documents
// @access  Private
const getDocuments = async (req, res, next) => {
  try {
    let query = {};

    if (req.user.role === 'patient') {
      query.patientId = req.user._id;
    } else if (req.user.role === 'doctor') {
      const doctorProfile = await Doctor.findOne({ userId: req.user._id });
      if (!doctorProfile) {
        return res.status(404).json({ success: false, message: 'Doctor profile not found.' });
      }
      query.doctorId = doctorProfile._id;
    }

    const documents = await Document.find(query)
      .populate('patientId', 'name email phone')
      .populate('doctorId', 'name specialization')
      .populate('appointmentId', 'appointmentDate appointmentTime')
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: documents.length,
      documents,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Download / view file
// @route   GET /api/documents/:id/download
// @access  Private
const downloadDocument = async (req, res, next) => {
  try {
    const doc = await Document.findById(req.params.id);
    if (!doc) {
      return res.status(404).json({ success: false, message: 'Document not found.' });
    }

    // Permission check
    const isPatient = doc.patientId.toString() === req.user._id.toString();
    let isDoctor = false;

    if (req.user.role === 'doctor') {
      const doctorProfile = await Doctor.findOne({ userId: req.user._id });
      if (doctorProfile && doc.doctorId && doc.doctorId.toString() === doctorProfile._id.toString()) {
        isDoctor = true;
      }
    }

    if (req.user.role !== 'admin' && !isPatient && !isDoctor) {
      return res.status(403).json({ success: false, message: 'Not authorized to access this document.' });
    }

    const absolutePath = path.join(__dirname, '../uploads', doc.filePath);
    if (!fs.existsSync(absolutePath)) {
      return res.status(404).json({ success: false, message: 'File asset missing from server storage.' });
    }

    return res.download(absolutePath, doc.fileName);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete medical document
// @route   DELETE /api/documents/:id
// @access  Private
const deleteDocument = async (req, res, next) => {
  try {
    const doc = await Document.findById(req.params.id);
    if (!doc) {
      return res.status(404).json({ success: false, message: 'Document not found.' });
    }

    const isPatient = doc.patientId.toString() === req.user._id.toString();
    if (req.user.role !== 'admin' && !isPatient) {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this document.' });
    }

    const absolutePath = path.join(__dirname, '../uploads', doc.filePath);
    if (fs.existsSync(absolutePath)) {
      fs.unlinkSync(absolutePath);
    }

    await doc.deleteOne();

    return res.status(200).json({
      success: true,
      message: 'Document deleted successfully.',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  uploadDocument,
  getDocuments,
  downloadDocument,
  deleteDocument,
};
