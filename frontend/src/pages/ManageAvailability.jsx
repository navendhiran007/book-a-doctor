import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { FaTasks, FaSave } from 'react-icons/fa';
import AlertMessage from '../components/AlertMessage';
import LoadingSpinner from '../components/LoadingSpinner';
import API from '../services/api';

const ManageAvailability = () => {
  const { user } = useAuth();
  const [doctorProfile, setDoctorProfile] = useState(null);

  const [specialization, setSpecialization] = useState('General Physician');
  const [qualification, setQualification] = useState('');
  const [experience, setExperience] = useState('');
  const [consultationFee, setConsultationFee] = useState(500);
  const [location, setLocation] = useState('');
  const [about, setAbout] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await API.get('/auth/me');
      if (res.data.success && res.data.user.doctorProfile) {
        const doc = res.data.user.doctorProfile;
        setDoctorProfile(doc);
        setSpecialization(doc.specialization || 'General Physician');
        setQualification(doc.qualification || '');
        setExperience(doc.experience || '');
        setConsultationFee(doc.consultationFee || 500);
        setLocation(doc.location || '');
        setAbout(doc.about || '');
      }
    } catch (err) {
      console.error('Failed to fetch profile:', err);
      setError('Could not load profile details.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!doctorProfile) {
      setError('Doctor profile record missing.');
      return;
    }

    setSaving(true);
    try {
      const res = await API.put(`/doctors/${doctorProfile._id}`, {
        specialization,
        qualification,
        experience,
        consultationFee,
        location,
        about,
      });

      if (res.data.success) {
        setSuccess('Doctor profile & consultation settings updated successfully!');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <LoadingSpinner fullScreen />;

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={10} lg={8}>
          <Card className="custom-card border-0 p-4 shadow-lg">
            <Card.Body>
              <div className="text-center mb-4">
                <div className="brand-badge p-3 rounded-circle d-inline-flex mb-3">
                  <FaTasks size={32} />
                </div>
                <h3 className="fw-bold text-dark mb-1">Doctor Profile & Availability</h3>
                <p className="text-muted small">Update your consultation fee, location, and practice details</p>
              </div>

              {error && <AlertMessage variant="danger">{error}</AlertMessage>}
              {success && <AlertMessage variant="success">{success}</AlertMessage>}

              <Form onSubmit={handleSubmit}>
                <Row className="g-3">
                  <Col md={6}>
                    <Form.Group controlId="spec">
                      <Form.Label className="fw-semibold small">Specialization</Form.Label>
                      <Form.Select
                        value={specialization}
                        onChange={(e) => setSpecialization(e.target.value)}
                        required
                      >
                        <option value="General Physician">General Physician</option>
                        <option value="Cardiology">Cardiology</option>
                        <option value="Dermatology">Dermatology</option>
                        <option value="Neurology">Neurology</option>
                        <option value="Pediatrics">Pediatrics</option>
                        <option value="Orthopedics">Orthopedics</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group controlId="qual">
                      <Form.Label className="fw-semibold small">Qualification</Form.Label>
                      <Form.Control
                        type="text"
                        value={qualification}
                        onChange={(e) => setQualification(e.target.value)}
                        required
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group controlId="exp">
                      <Form.Label className="fw-semibold small">Years of Experience</Form.Label>
                      <Form.Control
                        type="text"
                        value={experience}
                        onChange={(e) => setExperience(e.target.value)}
                        required
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group controlId="fee">
                      <Form.Label className="fw-semibold small">Consultation Fee ($)</Form.Label>
                      <Form.Control
                        type="number"
                        value={consultationFee}
                        onChange={(e) => setConsultationFee(e.target.value)}
                        required
                        min={0}
                      />
                    </Form.Group>
                  </Col>

                  <Col md={12}>
                    <Form.Group controlId="loc">
                      <Form.Label className="fw-semibold small">Clinic Address / Location</Form.Label>
                      <Form.Control
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                      />
                    </Form.Group>
                  </Col>

                  <Col md={12}>
                    <Form.Group controlId="aboutText">
                      <Form.Label className="fw-semibold small">About / Bio</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={4}
                        placeholder="Write a brief professional summary..."
                        value={about}
                        onChange={(e) => setAbout(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Button
                  type="submit"
                  disabled={saving}
                  className="btn-primary-custom w-100 py-3 rounded-3 fw-bold mt-4 d-flex align-items-center justify-content-center gap-2"
                >
                  <FaSave /> {saving ? 'Saving...' : 'Save Profile Changes'}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ManageAvailability;
