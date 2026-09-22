const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    specialization: {
      type: String,
      required: [true, 'Specialization is required'],
      trim: true,
    },
    qualification: {
      type: String,
      required: [true, 'Qualification is required'],
    },
    experience: {
      type: String,
      required: [true, 'Years of experience is required'],
    },
    consultationFee: {
      type: Number,
      required: [true, 'Consultation fee is required'],
      min: 0,
    },
    location: {
      type: String,
      required: [true, 'Location / Address is required'],
    },
    about: {
      type: String,
      default: '',
    },
    availability: [
      {
        day: { type: String, required: true }, // e.g., "Monday", "Tuesday"
        slots: [{ type: String }], // e.g., ["09:00 AM", "10:00 AM", "02:00 PM"]
      },
    ],
    approvalStatus: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

const Doctor = mongoose.model('Doctor', doctorSchema);
module.exports = Doctor;
