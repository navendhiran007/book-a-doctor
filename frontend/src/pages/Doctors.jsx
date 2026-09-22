import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import { FaSearch, FaFilter, FaUserMd } from 'react-icons/fa';
import DoctorCard from '../components/DoctorCard';
import LoadingSpinner from '../components/LoadingSpinner';
import API from '../services/api';

const Doctors = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState(searchParams.get('name') || '');
  const [specialization, setSpecialization] = useState(searchParams.get('specialization') || '');
  const [location, setLocation] = useState(searchParams.get('location') || '');

  useEffect(() => {
    fetchDoctors();
  }, [searchParams]);

  const fetchDoctors = async () => {
    setLoading(true);
    try {
      const queryStr = searchParams.toString();
      const res = await API.get(`/doctors?${queryStr}`);
      if (res.data.success) {
        setDoctors(res.data.doctors);
      }
    } catch (error) {
      console.error('Failed to fetch doctors:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    const params = {};
    if (name) params.name = name;
    if (specialization) params.specialization = specialization;
    if (location) params.location = location;
    setSearchParams(params);
  };

  const handleReset = () => {
    setName('');
    setSpecialization('');
    setLocation('');
    setSearchParams({});
  };

  return (
    <Container className="py-5">
      <div className="text-center mb-5">
        <h2 className="fw-extrabold text-dark">Find Healthcare Specialists</h2>
        <p className="text-muted">Browse top approved medical professionals and book your appointment</p>
      </div>

      <Row className="mb-4">
        <Col lg={12}>
          <div className="bg-white p-4 rounded-4 shadow-sm border">
            <Form onSubmit={handleFilterSubmit}>
              <Row className="g-3 align-items-end">
                <Col lg={3} md={4}>
                  <Form.Group>
                    <Form.Label className="small fw-semibold">Doctor Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Search by name..."
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Form.Group>
                </Col>

                <Col lg={3} md={4}>
                  <Form.Group>
                    <Form.Label className="small fw-semibold">Specialization</Form.Label>
                    <Form.Select
                      value={specialization}
                      onChange={(e) => setSpecialization(e.target.value)}
                    >
                      <option value="">All Specializations</option>
                      <option value="Cardiology">Cardiology</option>
                      <option value="Dermatology">Dermatology</option>
                      <option value="Neurology">Neurology</option>
                      <option value="Pediatrics">Pediatrics</option>
                      <option value="Orthopedics">Orthopedics</option>
                      <option value="General Physician">General Physician</option>
                    </Form.Select>
                  </Form.Group>
                </Col>

                <Col lg={3} md={4}>
                  <Form.Group>
                    <Form.Label className="small fw-semibold">Location</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Search location..."
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </Form.Group>
                </Col>

                <Col lg={3} md={12} className="d-flex gap-2">
                  <Button type="submit" className="btn-primary-custom flex-grow-1 py-2 rounded-3">
                    <FaFilter className="me-1" /> Filter
                  </Button>
                  <Button variant="outline-secondary" onClick={handleReset} className="py-2 rounded-3">
                    Reset
                  </Button>
                </Col>
              </Row>
            </Form>
          </div>
        </Col>
      </Row>

      {loading ? (
        <LoadingSpinner />
      ) : doctors.length > 0 ? (
        <Row className="g-4">
          {doctors.map((doctor) => (
            <Col lg={4} md={6} key={doctor._id}>
              <DoctorCard doctor={doctor} />
            </Col>
          ))}
        </Row>
      ) : (
        <div className="text-center py-5 bg-white rounded-4 shadow-sm border">
          <FaUserMd size={60} className="text-muted mb-3 opacity-50" />
          <h5 className="fw-bold text-dark">No Doctors Found</h5>
          <p className="text-muted small">Try adjusting your search criteria or resetting filters.</p>
          <Button variant="outline-primary" onClick={handleReset} className="rounded-pill px-4">
            Clear Filters
          </Button>
        </div>
      )}
    </Container>
  );
};

export default Doctors;
