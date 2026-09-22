import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Badge, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaUserMd, FaCalendarCheck, FaClock, FaCheckCircle, FaTimesCircle, FaTasks, FaFolderOpen } from 'react-icons/fa';
import LoadingSpinner from '../components/LoadingSpinner';
import AlertMessage from '../components/AlertMessage';
import API from '../services/api';

const DoctorDashboard = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await API.get('/appointments');
      if (res.data.success) {
        setAppointments(res.data.appointments);
      }
    } catch (err) {
      console.error('Failed to fetch doctor appointments:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      const res = await API.put(`/appointments/${id}`, { status });
      if (res.data.success) {
        setMessage(`Appointment ${status.toLowerCase()} successfully!`);
        fetchAppointments();
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update status.');
    }
  };

  const pendingAppointments = appointments.filter((a) => a.status === 'Pending');
  const confirmedAppointments = appointments.filter((a) => a.status === 'Confirmed');
  const completedAppointments = appointments.filter((a) => a.status === 'Completed');

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Confirmed':
        return <Badge className="badge-confirmed px-3 py-2">Confirmed</Badge>;
      case 'Pending':
        return <Badge className="badge-pending px-3 py-2">Pending</Badge>;
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

  return (
    <Container className="py-5">
      <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between mb-4">
        <div>
          <h2 className="fw-extrabold text-dark mb-1">Doctor Dashboard</h2>
          <p className="text-muted mb-0">Welcome Dr. {user?.name}! Manage your practice and patient requests.</p>
        </div>
        <div className="d-flex gap-2 mt-3 mt-md-0">
          <Link to="/doctor/availability" className="btn btn-outline-primary rounded-pill px-4 fw-semibold d-flex align-items-center gap-2">
            <FaTasks /> Manage Availability
          </Link>
          <Link to="/doctor/appointments" className="btn btn-primary-custom rounded-pill px-4 fw-semibold d-flex align-items-center gap-2">
            <FaCalendarCheck /> All Appointments
          </Link>
        </div>
      </div>

      {error && <AlertMessage variant="danger">{error}</AlertMessage>}
      {message && <AlertMessage variant="success">{message}</AlertMessage>}

      {/* Metrics Cards */}
      <Row className="g-4 mb-5">
        <Col lg={4} md={6}>
          <div className="stat-card stat-card-amber shadow-sm">
            <h6 className="opacity-75 text-uppercase fw-bold small">Pending Requests</h6>
            <h2 className="display-5 fw-extrabold my-2">{pendingAppointments.length}</h2>
            <span className="small opacity-90"><FaClock className="me-1" /> Requires approval</span>
          </div>
        </Col>

        <Col lg={4} md={6}>
          <div className="stat-card stat-card-blue shadow-sm">
            <h6 className="opacity-75 text-uppercase fw-bold small">Confirmed Consultations</h6>
            <h2 className="display-5 fw-extrabold my-2">{confirmedAppointments.length}</h2>
            <span className="small opacity-90"><FaCalendarCheck className="me-1" /> Scheduled visits</span>
          </div>
        </Col>

        <Col lg={4} md={6}>
          <div className="stat-card stat-card-teal shadow-sm">
            <h6 className="opacity-75 text-uppercase fw-bold small">Completed Visits</h6>
            <h2 className="display-5 fw-extrabold my-2">{completedAppointments.length}</h2>
            <span className="small opacity-90"><FaCheckCircle className="me-1" /> Attended consultations</span>
          </div>
        </Col>
      </Row>

      {/* Pending Appointments Action Queue */}
      <Card className="custom-card border-0 p-4 shadow-sm">
        <Card.Body>
          <h5 className="fw-bold text-dark mb-4">Pending Patient Appointment Requests</h5>

          {loading ? (
            <LoadingSpinner />
          ) : pendingAppointments.length > 0 ? (
            <div className="table-responsive">
              <Table hover className="custom-table align-middle">
                <thead>
                  <tr className="text-muted small border-bottom">
                    <th>Patient Name</th>
                    <th>Contact Phone</th>
                    <th>Date & Time Slot</th>
                    <th>Reason</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingAppointments.map((app) => (
                    <tr key={app._id}>
                      <td className="fw-bold text-dark">
                        {app.patientId ? app.patientId.name : 'Patient'}
                      </td>
                      <td className="small text-secondary">
                        {app.patientId ? app.patientId.phone || app.patientId.email : 'N/A'}
                      </td>
                      <td className="small text-secondary fw-semibold">
                        {app.appointmentDate} at {app.appointmentTime}
                      </td>
                      <td className="small text-muted">{app.reason}</td>
                      <td>
                        <div className="d-flex gap-2">
                          <Button
                            variant="success"
                            size="sm"
                            onClick={() => handleStatusUpdate(app._id, 'Confirmed')}
                            className="rounded-pill px-3 fw-semibold"
                          >
                            <FaCheckCircle className="me-1" /> Accept
                          </Button>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => handleStatusUpdate(app._id, 'Rejected')}
                            className="rounded-pill px-3 fw-semibold"
                          >
                            <FaTimesCircle className="me-1" /> Reject
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-4 text-muted">
              <p className="mb-0">No pending appointment requests currently.</p>
            </div>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default DoctorDashboard;
