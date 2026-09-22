import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { FaSearch, FaStethoscope, FaCalendarCheck, FaUserCheck, FaShieldAlt, FaHeartbeat, FaBrain, FaBaby, FaBone } from 'react-icons/fa';
import DoctorCard from '../components/DoctorCard';
import LoadingSpinner from '../components/LoadingSpinner';
import API from '../services/api';

const specializations = [
  { name: 'Cardiology', icon: <FaHeartbeat size={28} className="text-danger" />, count: '12+ Specialists' },
  { name: 'Dermatology', icon: <FaStethoscope size={28} className="text-info" />, count: '8+ Specialists' },
  { name: 'Neurology', icon: <FaBrain size={28} className="text-primary" />, count: '10+ Specialists' },
  { name: 'Pediatrics', icon: <FaBaby size={28} className="text-warning" />, count: '15+ Specialists' },
  { name: 'Orthopedics', icon: <FaBone size={28} className="text-secondary" />, count: '9+ Specialists' },
  { name: 'General Medicine', icon: <FaUserCheck size={28} className="text-success" />, count: '20+ Specialists' },
];

const Home = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [location, setLocation] = useState('');
  const [featuredDoctors, setFeaturedDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedDoctors();
  }, []);

  const fetchFeaturedDoctors = async () => {
    try {
      const res = await API.get('/doctors');
      if (res.data.success) {
        setFeaturedDoctors(res.data.doctors.slice(0, 6));
      }
    } catch (error) {
      console.error('Failed to load featured doctors:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery) params.append('name', searchQuery);
    if (specialization) params.append('specialization', specialization);
    if (location) params.append('location', location);
    navigate(`/doctors?${params.toString()}`);
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="hero-section">
        <Container>
          <Row className="align-items-center gy-5">
            <Col lg={7}>
              <span className="badge bg-primary bg-opacity-20 text-primary px-3 py-2 rounded-pill fw-semibold mb-3 border border-primary border-opacity-25">
                🏥 Trusted Healthcare Partner
              </span>
              <h1 className="display-4 fw-extrabold mb-4 text-white lh-sm">
                Find & Book the Best <span className="text-info">Doctors</span> Near You
              </h1>
              <p className="lead text-light mb-4 opacity-90">
                Access verified medical specialists, manage digital prescriptions, and schedule in-clinic or online consultations in seconds.
              </p>
              <div className="d-flex flex-wrap gap-3">
                <Link to="/doctors" className="btn btn-primary-custom btn-lg px-4 rounded-pill">
                  Explore All Doctors
                </Link>
                <Link to="/register" className="btn btn-outline-light btn-lg px-4 rounded-pill">
                  Get Started
                </Link>
              </div>
            </Col>
            <Col lg={5} className="text-center">
              <div className="p-4 rounded-4 bg-white bg-opacity-10 backdrop-blur border border-white border-opacity-10 shadow-lg">
                <FaStethoscope size={100} className="text-info mb-3 animate-pulse" />
                <h4 className="fw-bold text-white mb-2">Instant Booking</h4>
                <p className="text-light small opacity-75">
                  Over 5,000+ verified appointments completed this month with 99% patient satisfaction rate.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Search Bar Container */}
      <Container className="search-card-container">
        <Form onSubmit={handleSearchSubmit} className="search-box">
          <Row className="g-3 align-items-center">
            <Col lg={4} md={6}>
              <Form.Group>
                <Form.Label className="small fw-bold text-muted">Search Doctor</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Doctor Name, Keyword..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="rounded-3 py-2"
                />
              </Form.Group>
            </Col>
            <Col lg={3} md={6}>
              <Form.Group>
                <Form.Label className="small fw-bold text-muted">Specialization</Form.Label>
                <Form.Select
                  value={specialization}
                  onChange={(e) => setSpecialization(e.target.value)}
                  className="rounded-3 py-2"
                >
                  <option value="">All Specializations</option>
                  <option value="Cardiology">Cardiology</option>
                  <option value="Dermatology">Dermatology</option>
                  <option value="Neurology">Neurology</option>
                  <option value="Pediatrics">Pediatrics</option>
                  <option value="Orthopedics">Orthopedics</option>
                  <option value="General Medicine">General Medicine</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col lg={3} md={6}>
              <Form.Group>
                <Form.Label className="small fw-bold text-muted">Location</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="City, Hospital..."
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="rounded-3 py-2"
                />
              </Form.Group>
            </Col>
            <Col lg={2} md={6} className="d-flex align-items-end">
              <Button type="submit" className="btn-primary-custom w-100 py-2 rounded-3">
                <FaSearch className="me-2" /> Search
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>

      {/* Popular Specializations */}
      <Container className="py-5 mt-4">
        <div className="text-center mb-5">
          <h2 className="fw-extrabold text-dark">Popular Specializations</h2>
          <p className="text-muted">Find top doctors across widely requested medical fields</p>
        </div>
        <Row className="g-4">
          {specializations.map((spec, idx) => (
            <Col lg={4} md={6} key={idx}>
              <Card
                className="custom-card border-0 h-100 text-center p-4 cursor-pointer"
                onClick={() => navigate(`/doctors?specialization=${spec.name}`)}
              >
                <div className="mb-3 d-inline-block p-3 rounded-circle bg-light">
                  {spec.icon}
                </div>
                <h5 className="fw-bold text-dark">{spec.name}</h5>
                <span className="text-muted small">{spec.count}</span>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Featured Doctors */}
      <Container className="py-5 bg-white rounded-4 my-5 shadow-sm">
        <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between mb-4">
          <div>
            <h2 className="fw-extrabold text-dark mb-1">Featured Doctors</h2>
            <p className="text-muted mb-0">Book appointments with top-rated medical practitioners</p>
          </div>
          <Link to="/doctors" className="btn btn-outline-primary rounded-pill px-4 mt-3 mt-md-0 fw-semibold">
            View All Doctors
          </Link>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : featuredDoctors.length > 0 ? (
          <Row className="g-4">
            {featuredDoctors.map((doctor) => (
              <Col lg={4} md={6} key={doctor._id}>
                <DoctorCard doctor={doctor} />
              </Col>
            ))}
          </Row>
        ) : (
          <div className="text-center py-5 text-muted">
            <p className="mb-0">No approved doctors available at the moment. Please check back soon!</p>
          </div>
        )}
      </Container>

      {/* How It Works */}
      <Container className="py-5">
        <div className="text-center mb-5">
          <h2 className="fw-extrabold text-dark">How It Works</h2>
          <p className="text-muted">3 simple steps to schedule your appointment</p>
        </div>
        <Row className="g-4">
          <Col md={4}>
            <div className="text-center p-4">
              <div className="brand-badge p-4 rounded-circle mx-auto mb-3" style={{ width: '85px', height: '85px', justifyContent: 'center' }}>
                <FaSearch size={36} />
              </div>
              <h5 className="fw-bold mb-2">1. Find a Doctor</h5>
              <p className="text-muted small">
                Search by doctor name, location, or medical specialization.
              </p>
            </div>
          </Col>
          <Col md={4}>
            <div className="text-center p-4">
              <div className="brand-badge p-4 rounded-circle mx-auto mb-3" style={{ width: '85px', height: '85px', justifyContent: 'center' }}>
                <FaCalendarCheck size={36} />
              </div>
              <h5 className="fw-bold mb-2">2. Choose Slot</h5>
              <p className="text-muted small">
                Select your preferred appointment date and available time slot.
              </p>
            </div>
          </Col>
          <Col md={4}>
            <div className="text-center p-4">
              <div className="brand-badge p-4 rounded-circle mx-auto mb-3" style={{ width: '85px', height: '85px', justifyContent: 'center' }}>
                <FaShieldAlt size={36} />
              </div>
              <h5 className="fw-bold mb-2">3. Get Consultation</h5>
              <p className="text-muted small">
                Receive instant confirmation and consult your doctor hassle-free.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
