const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Doctor = require('./models/Doctor');

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/book_a_doctor');
    console.log('MongoDB Connected for seeding...');

    // Clear existing users and doctors (Optional)
    // await User.deleteMany();
    // await Doctor.deleteMany();

    const hashedPassword = await bcrypt.hash('admin123', 10);
    const doctorPassword = await bcrypt.hash('doctor123', 10);
    const patientPassword = await bcrypt.hash('patient123', 10);

    // 1. Seed Admin
    let admin = await User.findOne({ email: 'admin@bookadoctor.com' });
    if (!admin) {
      admin = await User.create({
        name: 'System Admin',
        email: 'admin@bookadoctor.com',
        password: hashedPassword,
        phone: '+1 555-0100',
        role: 'admin',
      });
      console.log('Admin account created: admin@bookadoctor.com / admin123');
    }

    // 2. Seed Sample Doctors
    const sampleDoctors = [
      {
        name: 'Dr. Sarah Jenkins',
        email: 'sarah.jenkins@hospital.com',
        phone: '+1 555-0101',
        specialization: 'Cardiology',
        qualification: 'MBBS, MD (Cardiology)',
        experience: '12 Years',
        consultationFee: 150,
        location: 'Heart Care Center, Manhattan, NY',
        about: 'Dr. Sarah Jenkins is a board-certified cardiologist specializing in preventive cardiology and heart failure management.',
      },
      {
        name: 'Dr. Michael Chen',
        email: 'michael.chen@hospital.com',
        phone: '+1 555-0102',
        specialization: 'Dermatology',
        qualification: 'MBBS, DNB (Dermatology)',
        experience: '8 Years',
        consultationFee: 120,
        location: 'Skin Care Clinic, San Francisco, CA',
        about: 'Dr. Michael Chen provides comprehensive clinical and cosmetic dermatology treatments.',
      },
      {
        name: 'Dr. Emily Rodriguez',
        email: 'emily.rodriguez@hospital.com',
        phone: '+1 555-0103',
        specialization: 'Pediatrics',
        qualification: 'MBBS, DCH, MD',
        experience: '10 Years',
        consultationFee: 100,
        location: 'Children Health Plaza, Chicago, IL',
        about: 'Dr. Emily Rodriguez is a compassionate pediatrician devoted to infant and child wellness.',
      },
    ];

    for (const docData of sampleDoctors) {
      let docUser = await User.findOne({ email: docData.email });
      if (!docUser) {
        docUser = await User.create({
          name: docData.name,
          email: docData.email,
          password: doctorPassword,
          phone: docData.phone,
          role: 'doctor',
        });

        await Doctor.create({
          userId: docUser._id,
          name: docData.name,
          email: docData.email,
          specialization: docData.specialization,
          qualification: docData.qualification,
          experience: docData.experience,
          consultationFee: docData.consultationFee,
          location: docData.location,
          about: docData.about,
          approvalStatus: 'approved',
        });
        console.log(`Doctor created & approved: ${docData.email} / doctor123`);
      }
    }

    // 3. Seed Sample Patient
    let patient = await User.findOne({ email: 'patient@example.com' });
    if (!patient) {
      patient = await User.create({
        name: 'Alex Johnson',
        email: 'patient@example.com',
        password: patientPassword,
        phone: '+1 555-0199',
        role: 'patient',
      });
      console.log('Sample Patient created: patient@example.com / patient123');
    }

    console.log('Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedData();
