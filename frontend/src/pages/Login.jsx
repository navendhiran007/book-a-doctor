import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaUserMd, FaEnvelope, FaLock, FaSignInAlt } from 'react-icons/fa';
import AlertMessage from '../components/AlertMessage';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await login(email, password);
      const userRole = data.user.role;
      if (userRole === 'admin') {
        navigate('/admin/dashboard');
      } else if (userRole === 'doctor') {
        navigate('/doctor/dashboard');
      } else {
        navigate('/patient/dashboard');
      }
    } catch (err) {
      setError(err.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-5 my-5">
      <Row className="justify-content-center">
        <Col md={8} lg={5}>
          <Card className="custom-card border-0 p-4 shadow-lg">
            <Card.Body>
              <div className="text-center mb-4">
                <div className="brand-badge p-3 rounded-circle d-inline-flex mb-3">
                  <FaUserMd size={32} />
                </div>
                <h3 className="fw-bold text-dark mb-1">Welcome Back</h3>
                <p className="text-muted small">Sign in to manage your appointments & medical records</p>
              </div>

              {error && <AlertMessage variant="danger">{error}</AlertMessage>}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label className="fw-semibold small">Email Address</Form.Label>
                  <div className="input-group">
                    <span className="input-group-text bg-light border-end-0">
                      <FaEnvelope className="text-muted" />
                    </span>
                    <Form.Control
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="border-start-0 ps-0"
                    />
                  </div>
                </Form.Group>

                <Form.Group className="mb-4" controlId="formPassword">
                  <Form.Label className="fw-semibold small">Password</Form.Label>
                  <div className="input-group">
                    <span className="input-group-text bg-light border-end-0">
                      <FaLock className="text-muted" />
                    </span>
                    <Form.Control
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="border-start-0 ps-0"
                    />
                  </div>
                </Form.Group>

                <Button
                  type="submit"
                  disabled={loading}
                  className="btn-primary-custom w-100 py-3 rounded-3 fw-bold mb-3 d-flex align-items-center justify-content-center gap-2"
                >
                  <FaSignInAlt /> {loading ? 'Signing In...' : 'Log In'}
                </Button>
              </Form>

              <div className="text-center mt-3 pt-3 border-top">
                <p className="text-muted small mb-0">
                  Don't have an account?{' '}
                  <Link to="/register" className="fw-bold text-primary text-decoration-none">
                    Register Here
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

export default Login;
