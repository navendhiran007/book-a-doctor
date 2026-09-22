import React, { useState, useEffect } from 'react';
import { Container, Card, Table, Badge, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaTimesCircle, FaCalendarPlus, FaUserMd } from 'react-icons/fa';
import LoadingSpinner from '../components/LoadingSpinner';
import AlertMessage from '../components/AlertMessage';
import API from '../services/api';

const MyAppointments = () => {
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
      setError('Failed to fetch your appointments.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this appointment?')) return;

    try {
      const res = await API.put(`/appointments/${id}`, { status: 'Cancelled' });
      if (res.data.success) {
        setMessage('Appointment cancelled successfully.');
        fetchAppointments();
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to cancel appointment.');
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

  return (
    <Container className="py-5">
      <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between mb-4">
        <div>
          <h2 className="fw-extrabold text-dark mb-1">My Appointments</h2>
          <p className="text-muted mb-0">Track and manage all your healthcare consultation bookings</p>
        </div>
        <Link to="/book-appointment" className="btn btn-primary-custom rounded-pill px-4 mt-3 mt-md-0 d-flex align-items-center gap-2">
          <FaCalendarPlus /> Book Appointment
        </Link>
      </div>

      {error && <AlertMessage variant="danger">{error}</AlertMessage>}
      {message && <AlertMessage variant="success">{message}</AlertMessage>}

      <Card className="custom-card border-0 p-4 shadow-sm">
        <Card.Body>
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
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((app) => (
                    <tr key={app._id}>
                      <td className="fw-bold text-dark">
                        <div className="d-flex align-items-center gap-2">
                          <FaUserMd className="text-primary" />
                          <span>Dr. {app.doctorId ? app.doctorId.name : 'Doctor Profile'}</span>
                        </div>
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
                      <td>
                        {(app.status === 'Pending' || app.status === 'Confirmed') && (
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => handleCancel(app._id)}
                            className="rounded-pill px-3"
                          >
                            <FaTimesCircle className="me-1" /> Cancel
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-5 text-muted">
              <FaCalendarAlt size={50} className="mb-3 opacity-50 text-muted" />
              <h5 className="fw-bold text-dark">No Appointments Found</h5>
              <p className="mb-3">You haven't scheduled any doctor consultations yet.</p>
              <Link to="/book-appointment" className="btn btn-primary-custom rounded-pill px-4">
                Schedule First Appointment
              </Link>
            </div>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default MyAppointments;
