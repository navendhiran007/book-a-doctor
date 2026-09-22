import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import ProtectedRoute from './components/ProtectedRoute';

// Public Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Doctors from './pages/Doctors';
import DoctorProfile from './pages/DoctorProfile';
import About from './pages/About';
import Contact from './pages/Contact';

// Patient Pages
import PatientDashboard from './pages/PatientDashboard';
import BookAppointment from './pages/BookAppointment';
import MyAppointments from './pages/MyAppointments';
import UploadDocuments from './pages/UploadDocuments';

// Doctor Pages
import DoctorDashboard from './pages/DoctorDashboard';
import ManageAvailability from './pages/ManageAvailability';
import DoctorAppointments from './pages/DoctorAppointments';

// Admin & Shared Pages
import AdminDashboard from './pages/AdminDashboard';
import Notifications from './pages/Notifications';

function App() {
  return (
    <MainLayout>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctors/:id" element={<DoctorProfile />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* Protected Patient Routes */}
        <Route element={<ProtectedRoute allowedRoles={['patient', 'admin']} />}>
          <Route path="/patient/dashboard" element={<PatientDashboard />} />
          <Route path="/book-appointment" element={<BookAppointment />} />
          <Route path="/patient/appointments" element={<MyAppointments />} />
          <Route path="/patient/documents" element={<UploadDocuments />} />
        </Route>

        {/* Protected Doctor Routes */}
        <Route element={<ProtectedRoute allowedRoles={['doctor', 'admin']} />}>
          <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
          <Route path="/doctor/availability" element={<ManageAvailability />} />
          <Route path="/doctor/appointments" element={<DoctorAppointments />} />
        </Route>

        {/* Protected Admin Routes */}
        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/doctors" element={<AdminDashboard />} />
        </Route>

        {/* Shared Notifications Route */}
        <Route element={<ProtectedRoute allowedRoles={['patient', 'doctor', 'admin']} />}>
          <Route path="/notifications" element={<Notifications />} />
        </Route>
      </Routes>
    </MainLayout>
  );
}

export default App;
