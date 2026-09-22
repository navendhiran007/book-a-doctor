import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaUserMd, FaShieldAlt, FaHeart, FaAward } from 'react-icons/fa';

const About = () => {
  return (
    <Container className="py-5">
      <div className="text-center mb-5">
        <span className="spec-badge mb-2">Our Mission</span>
        <h2 className="fw-extrabold text-dark">About Book a Doctor</h2>
        <p className="text-muted lead col-lg-8 mx-auto">
          We are empowering healthcare access by connecting patients directly with certified doctors and medical specialists through seamless digital scheduling.
        </p>
      </div>

      <Row className="g-4 mb-5">
        <Col md={3}>
          <Card className="custom-card border-0 text-center p-4 h-100">
            <FaUserMd size={40} className="text-primary mx-auto mb-3" />
            <h5 className="fw-bold">1,000+ Doctors</h5>
            <p className="text-muted small">Verified healthcare practitioners across multiple specialties</p>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="custom-card border-0 text-center p-4 h-100">
            <FaShieldAlt size={40} className="text-success mx-auto mb-3" />
            <h5 className="fw-bold">100% Verified</h5>
            <p className="text-muted small">Strict admin approval process for all registered doctors</p>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="custom-card border-0 text-center p-4 h-100">
            <FaHeart size={40} className="text-danger mx-auto mb-3" />
            <h5 className="fw-bold">50,000+ Patients</h5>
            <p className="text-muted small">Helping thousands of families receive timely care every month</p>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="custom-card border-0 text-center p-4 h-100">
            <FaAward size={40} className="text-warning mx-auto mb-3" />
            <h5 className="fw-bold">24/7 Access</h5>
            <p className="text-muted small">Schedule appointments anytime, anywhere from any device</p>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default About;
