import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import { FaUserMd, FaStethoscope, FaGraduationCap, FaClock, FaMapMarkerAlt, FaDollarSign, FaCalendarPlus, FaCheckCircle } from 'react-icons/fa';
import LoadingSpinner from '../components/LoadingSpinner';
import AlertMessage from '../components/AlertMessage';
import API from '../services/api';

const DoctorProfile = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDoctor();
  }, [id]);

  const fetchDoctor = async () => {
    try {
      const res = await API.get(`/doctors/${id}`);
      if (res.data.success) {
        setDoctor(res.data.doctor);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch doctor profile');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner fullScreen />;
  if (error) return <Container className="py-5"><AlertMessage variant="danger">{error}</AlertMessage></Container>;
  if (!doctor) return null;

  return (
    <Container className="py-5">
      <Row className="gy-4">
        {/* Left Column: Doctor Summary Card */}
        <Col lg={4}>
          <Card className="custom-card border-0 text-center p-4 shadow-sm">
            <Card.Body>
              <div className="brand-badge p-4 rounded-circle mx-auto mb-3" style={{ width: '100px', height: '100px', justifyContent: 'center' }}>
                <FaUserMd size={50} />
              </div>
              <h3 className="fw-bold text-dark mb-1">Dr. {doctor.name}</h3>
              <span className="spec-badge mb-3">
                <FaStethoscope className="me-1" /> {doctor.specialization}
              </span>

              <div className="text-start border-top pt-3 mt-3 d-flex flex-column gap-2 small text-muted">
                <div>
                  <strong className="text-dark"><FaGraduationCap className="me-2 text-primary" /> Qualification:</strong> {doctor.qualification}
                </div>
                <div>
                  <strong className="text-dark"><FaClock className="me-2 text-info" /> Experience:</strong> {doctor.experience}
                </div>
                <div>
                  <strong className="text-dark"><FaMapMarkerAlt className="me-2 text-danger" /> Location:</strong> {doctor.location}
                </div>
                <div>
                  <strong className="text-dark"><FaDollarSign className="me-2 text-success" /> Fee:</strong> ${doctor.consultationFee}
                </div>
              </div>

              <Link
                to={`/book-appointment?doctorId=${doctor._id}`}
                className="btn btn-primary-custom w-100 mt-4 py-3 rounded-3 fw-bold d-flex align-items-center justify-content-center gap-2"
              >
                <FaCalendarPlus /> Book Appointment
              </Link>
            </Card.Body>
          </Card>
        </Col>

        {/* Right Column: About & Availability */}
        <Col lg={8}>
          <Card className="custom-card border-0 p-4 mb-4 shadow-sm">
            <Card.Body>
              <h4 className="fw-bold text-dark mb-3">About Dr. {doctor.name}</h4>
              <p className="text-secondary leading-relaxed">
                {doctor.about || `Dr. ${doctor.name} is a highly experienced ${doctor.specialization} dedicated to providing top-quality medical care and personalized treatment plans for patients.`}
              </p>

              <h5 className="fw-bold text-dark mt-4 mb-3">Available Slots & Days</h5>
              {doctor.availability && doctor.availability.length > 0 ? (
                <div className="d-flex flex-column gap-3">
                  {doctor.availability.map((avail, idx) => (
                    <div key={idx} className="p-3 rounded-3 bg-light border">
                      <h6 className="fw-bold text-primary mb-2">
                        <FaCheckCircle className="me-2 text-success" /> {avail.day}
                      </h6>
                      <div className="d-flex flex-wrap gap-2">
                        {avail.slots && avail.slots.length > 0 ? (
                          avail.slots.map((slot, sIdx) => (
                            <Badge key={sIdx} bg="info" className="px-3 py-2 fw-semibold">
                              {slot}
                            </Badge>
                          ))
                        ) : (
                          <span className="text-muted small">No slots listed</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted small">General consultation hours available Monday through Friday (09:00 AM - 05:00 PM).</p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default DoctorProfile;
