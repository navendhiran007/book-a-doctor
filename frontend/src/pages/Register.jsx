import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaUserPlus, FaUser, FaEnvelope, FaLock, FaPhone, FaStethoscope, FaGraduationCap, FaMapMarkerAlt, FaDollarSign } from 'react-icons/fa';
import AlertMessage from '../components/AlertMessage';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    role: 'patient',
    specialization: 'General Physician',
    qualification: '',
    experience: '',
    consultationFee: 500,
    location: '',
    about: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await register(formData);
      if (formData.role === 'doctor') {
        navigate('/doctor/dashboard');
      } else {
        navigate('/patient/dashboard');
      }
    } catch (err) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-5 my-4">
      <Row className="justify-content-center">
        <Col md={10} lg={7}>
          <Card className="custom-card border-0 p-4 shadow-lg">
            <Card.Body>
              <div className="text-center mb-4">
                <div className="brand-badge p-3 rounded-circle d-inline-flex mb-3">
                  <FaUserPlus size={32} />
                </div>
                <h3 className="fw-bold text-dark mb-1">Create an Account</h3>
                <p className="text-muted small">Join Book a Doctor to access seamless healthcare services</p>
              </div>

              {error && <AlertMessage variant="danger">{error}</AlertMessage>}

              <Form onSubmit={handleSubmit}>
                {/* Role Selection */}
                <Form.Group className="mb-4 text-center">
                  <Form.Label className="fw-semibold small d-block mb-2">Register As</Form.Label>
                  <div className="d-flex justify-content-center gap-3">
                    <Button
                      variant={formData.role === 'patient' ? 'primary' : 'outline-secondary'}
                      className="px-4 py-2 rounded-pill fw-semibold"
                      onClick={() => setFormData({ ...formData, role: 'patient' })}
                    >
                      Patient
                    </Button>
                    <Button
                      variant={formData.role === 'doctor' ? 'primary' : 'outline-secondary'}
                      className="px-4 py-2 rounded-pill fw-semibold"
                      onClick={() => setFormData({ ...formData, role: 'doctor' })}
                    >
                      Doctor Profile
                    </Button>
                  </div>
                </Form.Group>

                <Row className="g-3">
                  <Col md={6}>
                    <Form.Group controlId="name">
                      <Form.Label className="fw-semibold small">Full Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="py-2"
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group controlId="email">
                      <Form.Label className="fw-semibold small">Email Address</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="py-2"
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group controlId="password">
                      <Form.Label className="fw-semibold small">Password</Form.Label>
                      <Form.Control
                        type="password"
                        name="password"
                        placeholder="At least 6 characters"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        minLength={6}
                        className="py-2"
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group controlId="phone">
                      <Form.Label className="fw-semibold small">Phone Number</Form.Label>
                      <Form.Control
                        type="text"
                        name="phone"
                        placeholder="+1 555-0199"
                        value={formData.phone}
                        onChange={handleChange}
                        className="py-2"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                {/* Additional Doctor Fields */}
                {formData.role === 'doctor' && (
                  <div className="mt-4 pt-3 border-top">
                    <h6 className="fw-bold text-primary mb-3">Professional Details (Doctor Profile)</h6>
                    <Row className="g-3">
                      <Col md={6}>
                        <Form.Group controlId="specialization">
                          <Form.Label className="fw-semibold small">Specialization</Form.Label>
                          <Form.Select
                            name="specialization"
                            value={formData.specialization}
                            onChange={handleChange}
                            required
                          >
                            <option value="General Physician">General Physician</option>
                            <option value="Cardiology">Cardiology</option>
                            <option value="Dermatology">Dermatology</option>
                            <option value="Neurology">Neurology</option>
                            <option value="Pediatrics">Pediatrics</option>
                            <option value="Orthopedics">Orthopedics</option>
                            <option value="Gynecology">Gynecology</option>
                            <option value="Psychiatry">Psychiatry</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>

                      <Col md={6}>
                        <Form.Group controlId="qualification">
                          <Form.Label className="fw-semibold small">Qualification</Form.Label>
                          <Form.Control
                            type="text"
                            name="qualification"
                            placeholder="e.g. MBBS, MD"
                            value={formData.qualification}
                            onChange={handleChange}
                            required
                          />
                        </Form.Group>
                      </Col>

                      <Col md={6}>
                        <Form.Group controlId="experience">
                          <Form.Label className="fw-semibold small">Experience</Form.Label>
                          <Form.Control
                            type="text"
                            name="experience"
                            placeholder="e.g. 8 Years"
                            value={formData.experience}
                            onChange={handleChange}
                            required
                          />
                        </Form.Group>
                      </Col>

                      <Col md={6}>
                        <Form.Group controlId="consultationFee">
                          <Form.Label className="fw-semibold small">Consultation Fee ($)</Form.Label>
                          <Form.Control
                            type="number"
                            name="consultationFee"
                            value={formData.consultationFee}
                            onChange={handleChange}
                            required
                            min={0}
                          />
                        </Form.Group>
                      </Col>

                      <Col md={12}>
                        <Form.Group controlId="location">
                          <Form.Label className="fw-semibold small">Clinic Address / Location</Form.Label>
                          <Form.Control
                            type="text"
                            name="location"
                            placeholder="e.g. City Hospital, Suite 402, New York"
                            value={formData.location}
                            onChange={handleChange}
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={loading}
                  className="btn-primary-custom w-100 py-3 rounded-3 fw-bold mt-4 mb-3 d-flex align-items-center justify-content-center gap-2"
                >
                  <FaUserPlus /> {loading ? 'Creating Account...' : 'Register Now'}
                </Button>
              </Form>

              <div className="text-center mt-3 pt-3 border-top">
                <p className="text-muted small mb-0">
                  Already have an account?{' '}
                  <Link to="/login" className="fw-bold text-primary text-decoration-none">
                    Log In
                  </Link>
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
