import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaUserMd, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaHeart } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer-custom mt-auto">
      <Container>
        <Row className="gy-4">
          <Col lg={4} md={6}>
            <div className="d-flex align-items-center mb-3">
              <span className="brand-badge me-2">
                <FaUserMd size={20} />
              </span>
              <h4 className="fw-bold text-white mb-0">Book a Doctor</h4>
            </div>
            <p className="small text-muted mb-3">
              Connecting patients with top-tier healthcare professionals effortlessly. Book consultations, manage appointments, and access medical records securely.
            </p>
          </Col>

          <Col lg={2} md={6}>
            <h6 className="text-white fw-bold mb-3">Quick Links</h6>
            <ul className="list-unstyled small mb-0 d-flex flex-column gap-2">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/doctors">Find Doctors</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact Support</Link></li>
            </ul>
          </Col>

          <Col lg={3} md={6}>
            <h6 className="text-white fw-bold mb-3">Specializations</h6>
            <ul className="list-unstyled small mb-0 d-flex flex-column gap-2">
              <li><Link to="/doctors?specialization=Cardiology">Cardiology</Link></li>
              <li><Link to="/doctors?specialization=Dermatology">Dermatology</Link></li>
              <li><Link to="/doctors?specialization=Neurology">Neurology</Link></li>
              <li><Link to="/doctors?specialization=Pediatrics">Pediatrics</Link></li>
            </ul>
          </Col>

          <Col lg={3} md={6}>
            <h6 className="text-white fw-bold mb-3">Contact Info</h6>
            <ul className="list-unstyled small text-muted mb-0 d-flex flex-column gap-2">
              <li className="d-flex align-items-center gap-2">
                <FaPhoneAlt className="text-primary" /> +1 (800) 555-DOCTOR
              </li>
              <li className="d-flex align-items-center gap-2">
                <FaEnvelope className="text-primary" /> support@bookadoctor.com
              </li>
              <li className="d-flex align-items-center gap-2">
                <FaMapMarkerAlt className="text-primary" /> 123 Healthcare Blvd, Medical Plaza
              </li>
            </ul>
          </Col>
        </Row>

        <hr className="my-4 border-secondary opacity-25" />

        <div className="d-flex flex-column flex-md-row align-items-center justify-content-between text-muted small">
          <p className="mb-0">&copy; {new Date().getFullYear()} Book a Doctor. All rights reserved.</p>
          <p className="mb-0">
            Crafted with <FaHeart className="text-danger mx-1" /> for better healthcare.
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
