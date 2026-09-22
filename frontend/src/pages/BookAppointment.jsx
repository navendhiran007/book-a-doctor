import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FaCalendarPlus, FaUserMd, FaClock, FaCommentMedical } from 'react-icons/fa';
import AlertMessage from '../components/AlertMessage';
import LoadingSpinner from '../components/LoadingSpinner';
import API from '../services/api';

const BookAppointment = () => {
  const [searchParams] = useSearchParams();
  const initialDoctorId = searchParams.get('doctorId') || '';

  const [doctors, setDoctors] = useState([]);
  const [selectedDoctorId, setSelectedDoctorId] = useState(initialDoctorId);
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    fetchApprovedDoctors();
  }, []);

const fetchApprovedDoctors = async () => {
  try {
    const res = await API.get('/doctors?status=approved');

    console.log("API Response:", res.data);

    if (res.data.success) {
      const doctorList = res.data.doctors || [];

      setDoctors(doctorList);

      if (!selectedDoctorId && doctorList.length > 0) {
        setSelectedDoctorId(doctorList[0]._id);
      }
    } else {
      setError(res.data.message || "No approved doctors found.");
    }
  } catch (err) {
    console.error("Fetch Doctors Error:", err);
    console.error("Response:", err.response);

    setError(
      err.response?.data?.message ||
      err.message ||
      "Could not load approved doctors."
    );
  } finally {
    setLoading(false);
  }
};

  const selectedDoctorObj = doctors.find((d) => d._id === selectedDoctorId);

  const defaultSlots = ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!selectedDoctorId || !appointmentDate || !appointmentTime || !reason) {
      setError('Please fill in all required fields.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await API.post('/appointments', {
        doctorId: selectedDoctorId,
        appointmentDate,
        appointmentTime,
        reason,
      });

      if (res.data.success) {
        setSuccess('Appointment booked successfully! Redirecting to your appointments...');
        setTimeout(() => {
          navigate('/patient/appointments');
        }, 2000);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to book appointment.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <LoadingSpinner fullScreen />;

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={10} lg={7}>
          <Card className="custom-card border-0 p-4 shadow-lg">
            <Card.Body>
              <div className="text-center mb-4">
                <div className="brand-badge p-3 rounded-circle d-inline-flex mb-3">
                  <FaCalendarPlus size={32} />
                </div>
                <h3 className="fw-bold text-dark mb-1">Book an Appointment</h3>
                <p className="text-muted small">Schedule your consultation with a certified doctor</p>
              </div>

              {error && <AlertMessage variant="danger">{error}</AlertMessage>}
              {success && <AlertMessage variant="success">{success}</AlertMessage>}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="doctorSelect">
                  <Form.Label className="fw-semibold small">Select Doctor</Form.Label>
                  <Form.Select
                    value={selectedDoctorId}
                    onChange={(e) => setSelectedDoctorId(e.target.value)}
                    required
                    className="py-2"
                  >
                    {doctors.map((d) => (
                      <option key={d._id} value={d._id}>
                        Dr. {d.name} — {d.specialization} (${d.consultationFee})
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                {selectedDoctorObj && (
                  <div className="p-3 mb-3 bg-light rounded-3 border small">
                    <div className="fw-bold text-dark mb-1">Dr. {selectedDoctorObj.name}</div>
                    <div className="text-muted">{selectedDoctorObj.specialization} | {selectedDoctorObj.location}</div>
                    <div className="text-success fw-bold mt-1">Fee: ${selectedDoctorObj.consultationFee}</div>
                  </div>
                )}

                <Row className="g-3">
                  <Col md={6}>
                    <Form.Group controlId="appointmentDate">
                      <Form.Label className="fw-semibold small">Appointment Date</Form.Label>
                      <Form.Control
                        type="date"
                        min={new Date().toISOString().split('T')[0]}
                        value={appointmentDate}
                        onChange={(e) => setAppointmentDate(e.target.value)}
                        required
                        className="py-2"
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group controlId="appointmentTime">
                      <Form.Label className="fw-semibold small">Time Slot</Form.Label>
                      <Form.Select
                        value={appointmentTime}
                        onChange={(e) => setAppointmentTime(e.target.value)}
                        required
                        className="py-2"
                      >
                        <option value="">Select Time Slot</option>
                        {defaultSlots.map((slot, idx) => (
                          <option key={idx} value={slot}>{slot}</option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mt-3 mb-4" controlId="reason">
                  <Form.Label className="fw-semibold small">Reason for Visit / Symptoms</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Briefly describe your symptoms or reason for appointment..."
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    required
                  />
                </Form.Group>

                <Button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary-custom w-100 py-3 rounded-3 fw-bold d-flex align-items-center justify-content-center gap-2"
                >
                  <FaCalendarPlus /> {submitting ? 'Booking...' : 'Confirm Appointment Booking'}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default BookAppointment;