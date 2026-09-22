import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';
import AlertMessage from '../components/AlertMessage';

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <Container className="py-5">
      <div className="text-center mb-5">
        <h2 className="fw-extrabold text-dark">Get in Touch</h2>
        <p className="text-muted">Have questions or need assistance? Our support team is here for you.</p>
      </div>

      <Row className="gy-4">
        <Col lg={4}>
          <div className="d-flex flex-column gap-3">
            <Card className="custom-card border-0 p-4">
              <div className="d-flex align-items-center gap-3">
                <div className="p-3 bg-primary bg-opacity-10 text-primary rounded-circle">
                  <FaPhoneAlt size={24} />
                </div>
                <div>
                  <h6 className="fw-bold mb-0">Phone</h6>
                  <p className="text-muted small mb-0">+1 (800) 555-DOCTOR</p>
                </div>
              </div>
            </Card>

            <Card className="custom-card border-0 p-4">
              <div className="d-flex align-items-center gap-3">
                <div className="p-3 bg-info bg-opacity-10 text-info rounded-circle">
                  <FaEnvelope size={24} />
                </div>
                <div>
                  <h6 className="fw-bold mb-0">Email</h6>
                  <p className="text-muted small mb-0">support@bookadoctor.com</p>
                </div>
              </div>
            </Card>

            <Card className="custom-card border-0 p-4">
              <div className="d-flex align-items-center gap-3">
                <div className="p-3 bg-danger bg-opacity-10 text-danger rounded-circle">
                  <FaMapMarkerAlt size={24} />
                </div>
                <div>
                  <h6 className="fw-bold mb-0">Office</h6>
                  <p className="text-muted small mb-0">123 Healthcare Blvd, Medical Plaza</p>
                </div>
              </div>
            </Card>
          </div>
        </Col>

        <Col lg={8}>
          <Card className="custom-card border-0 p-4 shadow-sm">
            <Card.Body>
              <h4 className="fw-bold mb-4">Send Us a Message</h4>
              {submitted ? (
                <AlertMessage variant="success">
                  Thank you! Your message has been sent successfully. Our team will contact you shortly.
                </AlertMessage>
              ) : (
                <Form onSubmit={handleSubmit}>
                  <Row className="g-3">
                    <Col md={6}>
                      <Form.Group controlId="contactName">
                        <Form.Label className="small fw-semibold">Your Name</Form.Label>
                        <Form.Control type="text" placeholder="John Doe" required />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="contactEmail">
                        <Form.Label className="small fw-semibold">Email Address</Form.Label>
                        <Form.Control type="email" placeholder="john@example.com" required />
                      </Form.Group>
                    </Col>
                    <Col md={12}>
                      <Form.Group controlId="contactSubject">
                        <Form.Label className="small fw-semibold">Subject</Form.Label>
                        <Form.Control type="text" placeholder="Appointment Inquiry..." required />
                      </Form.Group>
                    </Col>
                    <Col md={12}>
                      <Form.Group controlId="contactMessage">
                        <Form.Label className="small fw-semibold">Message</Form.Label>
                        <Form.Control as="textarea" rows={4} placeholder="Type your query..." required />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button type="submit" className="btn-primary-custom mt-4 px-4 py-2 rounded-3 d-flex align-items-center gap-2">
                    <FaPaperPlane /> Send Message
                  </Button>
                </Form>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Contact;
