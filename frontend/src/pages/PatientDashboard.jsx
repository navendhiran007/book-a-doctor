import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Table, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaCalendarPlus, FaCalendarCheck, FaFileUpload, FaBell, FaUserMd, FaClock, FaCheckCircle } from 'react-icons/fa';
import LoadingSpinner from '../components/LoadingSpinner';
import API from '../services/api';

const PatientDashboard = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await API.get('/appointments');
      if (res.data.success) {
        setAppointments(res.data.appointments);
      }
    } catch (error) {
      console.error('Failed to fetch patient appointments:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Confirmed':
        return <Badge className="badge-confirmed px-3 py-2">Confirmed</Badge>;
      case 'Pending':
        return <Badge className="badge-pending px-3 py-2">Pending Approval</Badge>;
      case 'Rejected':
        return <Badge className="badge-rejected px-3 py-2">Rejected</Badge>;
      case 'Cancelled':
        return <Badge className="badge-cancelled px-3 py-2">Cancelled</Badge>;
      case 'Completed':
        return <Badge className="badge-completed px-3 py-2">Completed</Badge>;
      default:
        return <Badge bg="secondary">{status}</Badge>;
    }
  };

  const upcomingCount = appointments.filter((a) => a.status === 'Confirmed' || a.status === 'Pending').length;
  const completedCount = appointments.filter((a) => a.status === 'Completed').length;

  return (
    <Container className="py-5">
      <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between mb-4">
        <div>
          <h2 className="fw-extrabold text-dark mb-1">Patient Dashboard</h2>
          <p className="text-muted mb-0">Welcome back, {user?.name}! Manage your bookings and records.</p>
        </div>
        <Link to="/book-appointment" className="btn btn-primary-custom rounded-pill px-4 mt-3 mt-md-0 d-flex align-items-center gap-2">
          <FaCalendarPlus /> Book New Appointment
        </Link>
      </div>

      {/* Metrics Row */}
      <Row className="g-4 mb-5">
        <Col lg={4} md={6}>
          <div className="stat-card stat-card-blue shadow-sm">
            <h6 className="opacity-75 text-uppercase fw-bold small">Total Appointments</h6>
            <h2 className="display-5 fw-extrabold my-2">{appointments.length}</h2>
            <span className="small opacity-90"><FaCalendarCheck className="me-1" /> Lifetime scheduled</span>
          </div>
        </Col>

        <Col lg={4} md={6}>
          <div className="stat-card stat-card-amber shadow-sm">
            <h6 className="opacity-75 text-uppercase fw-bold small">Upcoming / Pending</h6>
            <h2 className="display-5 fw-extrabold my-2">{upcomingCount}</h2>
            <span className="small opacity-90"><FaClock className="me-1" /> Active consultations</span>
          </div>
        </Col>

        <Col lg={4} md={6}>
          <div className="stat-card stat-card-teal shadow-sm">
            <h6 className="opacity-75 text-uppercase fw-bold small">Completed Visits</h6>
            <h2 className="display-5 fw-extrabold my-2">{completedCount}</h2>
            <span className="small opacity-90"><FaCheckCircle className="me-1" /> Successfully attended</span>
          </div>
        </Col>
      </Row>

      {/* Quick Action Shortcuts */}
      <Row className="g-3 mb-5">
        <Col md={3}>
          <Card as={Link} to="/doctors" className="custom-card border-0 text-center p-3 text-decoration-none">
            <FaUserMd size={28} className="text-primary mx-auto mb-2" />
            <h6 className="fw-bold text-dark mb-0">Find Doctors</h6>
          </Card>
        </Col>
        <Col md={3}>
          <Card as={Link} to="/patient/appointments" className="custom-card border-0 text-center p-3 text-decoration-none">
            <FaCalendarCheck size={28} className="text-success mx-auto mb-2" />
            <h6 className="fw-bold text-dark mb-0">My Appointments</h6>
          </Card>
        </Col>
        <Col md={3}>
          <Card as={Link} to="/patient/documents" className="custom-card border-0 text-center p-3 text-decoration-none">
            <FaFileUpload size={28} className="text-info mx-auto mb-2" />
            <h6 className="fw-bold text-dark mb-0">Upload Medical Reports</h6>
          </Card>
        </Col>
        <Col md={3}>
          <Card as={Link} to="/notifications" className="custom-card border-0 text-center p-3 text-decoration-none">
            <FaBell size={28} className="text-warning mx-auto mb-2" />
            <h6 className="fw-bold text-dark mb-0">Notifications</h6>
          </Card>
        </Col>
      </Row>

      {/* Recent Appointments Table */}
      <Card className="custom-card border-0 p-4 shadow-sm">
        <Card.Body>
          <div className="d-flex align-items-center justify-content-between mb-4">
            <h5 className="fw-bold text-dark mb-0">Recent Appointments</h5>
            <Link to="/patient/appointments" className="text-primary text-decoration-none fw-semibold small">
              View All &rarr;
            </Link>
          </div>

          {loading ? (
            <LoadingSpinner />
          ) : appointments.length > 0 ? (
            <div className="table-responsive">
              <Table hover className="custom-table align-middle">
                <thead>
                  <tr className="text-muted small border-bottom">
                    <th>Doctor</th>
                    <th>Specialization</th>
                    <th>Date & Time</th>
                    <th>Reason</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.slice(0, 5).map((app) => (
                    <tr key={app._id}>
                      <td className="fw-bold text-dark">
                        Dr. {app.doctorId ? app.doctorId.name : 'Doctor Profile'}
                      </td>
                      <td>
                        <span className="spec-badge">
                          {app.doctorId ? app.doctorId.specialization : 'General'}
                        </span>
                      </td>
                      <td className="small text-secondary">
                        {app.appointmentDate} at {app.appointmentTime}
                      </td>
                      <td className="small text-muted">{app.reason}</td>
                      <td>{getStatusBadge(app.status)}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-4 text-muted">
              <p className="mb-0">You have no booked appointments yet.</p>
              <Link to="/book-appointment" className="btn btn-outline-primary rounded-pill mt-3 px-4">
                Book Your First Appointment
              </Link>
            </div>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default PatientDashboard;
