import React, { useState, useEffect } from 'react';
import { Container, Card, Table, Badge, Button } from 'react-bootstrap';
import { FaCalendarCheck, FaCheckCircle, FaTimesCircle, FaCheckDouble, FaFileAlt } from 'react-icons/fa';
import LoadingSpinner from '../components/LoadingSpinner';
import AlertMessage from '../components/AlertMessage';
import API from '../services/api';

const DoctorAppointments = () => {
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
      setError('Failed to fetch doctor appointments.');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      const res = await API.put(`/appointments/${id}`, { status });
      if (res.data.success) {
        setMessage(`Appointment status updated to ${status}.`);
        fetchAppointments();
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update status.');
    }
  };

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
      <div className="mb-4">
        <h2 className="fw-extrabold text-dark mb-1">Patient Consultations</h2>
        <p className="text-muted">Review, accept, reject, or complete scheduled patient appointments</p>
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
                    <th>Patient Details</th>
                    <th>Date & Time</th>
                    <th>Reason</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((app) => (
                    <tr key={app._id}>
                      <td>
                        <div className="fw-bold text-dark">
                          {app.patientId ? app.patientId.name : 'Patient Record'}
                        </div>
                        <div className="small text-muted">
                          {app.patientId ? app.patientId.email : ''}
                        </div>
                      </td>
                      <td className="small text-secondary fw-semibold">
                        {app.appointmentDate} at {app.appointmentTime}
                      </td>
                      <td className="small text-muted">{app.reason}</td>
                      <td>{getStatusBadge(app.status)}</td>
                      <td>
                        <div className="d-flex flex-wrap gap-2">
                          {app.status === 'Pending' && (
                            <>
                              <Button
                                variant="success"
                                size="sm"
                                onClick={() => handleStatusUpdate(app._id, 'Confirmed')}
                                className="rounded-pill px-3"
                              >
                                Accept
                              </Button>
                              <Button
                                variant="outline-danger"
                                size="sm"
                                onClick={() => handleStatusUpdate(app._id, 'Rejected')}
                                className="rounded-pill px-3"
                              >
                                Reject
                              </Button>
                            </>
                          )}

                          {app.status === 'Confirmed' && (
                            <Button
                              variant="primary"
                              size="sm"
                              onClick={() => handleStatusUpdate(app._id, 'Completed')}
                              className="rounded-pill px-3"
                            >
                              <FaCheckDouble className="me-1" /> Complete
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-5 text-muted">
              <p className="mb-0">No patient consultations scheduled.</p>
            </div>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default DoctorAppointments;
