import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, NavDropdown, Badge } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaUserMd, FaBell, FaUser, FaSignOutAlt, FaCalendarCheck, FaFolder, FaTasks, FaTachometerAlt } from 'react-icons/fa';
import API from '../services/api';

const NavigationBar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (user) {
      fetchNotifications();
    }
  }, [user, location.pathname]);

  const fetchNotifications = async () => {
    try {
      const res = await API.get('/notifications');
      if (res.data.success) {
        const unread = res.data.notifications.filter((n) => !n.readStatus).length;
        setUnreadCount(unread);
      }
    } catch (error) {
      console.error('Failed to fetch notifications count:', error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Navbar expand="lg" className="navbar-custom sticky-top py-3">
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <span className="brand-badge me-2">
            <FaUserMd size={20} />
          </span>
          <span className="fw-extrabold fs-4 text-dark tracking-tight">Book a Doctor</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto ms-lg-4">
            <Nav.Link as={Link} to="/" className="fw-semibold text-dark px-3">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/doctors" className="fw-semibold text-dark px-3">
              Browse Doctors
            </Nav.Link>
            <Nav.Link as={Link} to="/about" className="fw-semibold text-dark px-3">
              About Us
            </Nav.Link>
            <Nav.Link as={Link} to="/contact" className="fw-semibold text-dark px-3">
              Contact
            </Nav.Link>
          </Nav>

          <Nav className="align-items-lg-center">
            {user ? (
              <>
                <Nav.Link as={Link} to="/notifications" className="me-3 position-relative text-dark">
                  <FaBell size={20} />
                  {unreadCount > 0 && (
                    <Badge
                      bg="danger"
                      pill
                      className="position-absolute top-0 start-100 translate-middle badge-sm"
                    >
                      {unreadCount}
                    </Badge>
                  )}
                </Nav.Link>

                <NavDropdown
                  title={
                    <span className="fw-bold text-dark">
                      <FaUser className="me-2 text-primary" />
                      {user.name} ({user.role.toUpperCase()})
                    </span>
                  }
                  id="user-nav-dropdown"
                  align="end"
                >
                  {user.role === 'patient' && (
                    <>
                      <NavDropdown.Item as={Link} to="/patient/dashboard">
                        <FaTachometerAlt className="me-2 text-primary" /> Patient Dashboard
                      </NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/patient/appointments">
                        <FaCalendarCheck className="me-2 text-info" /> My Appointments
                      </NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/patient/documents">
                        <FaFolder className="me-2 text-warning" /> Medical Documents
                      </NavDropdown.Item>
                    </>
                  )}

                  {user.role === 'doctor' && (
                    <>
                      <NavDropdown.Item as={Link} to="/doctor/dashboard">
                        <FaTachometerAlt className="me-2 text-primary" /> Doctor Dashboard
                      </NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/doctor/appointments">
                        <FaCalendarCheck className="me-2 text-success" /> Manage Appointments
                      </NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/doctor/availability">
                        <FaTasks className="me-2 text-warning" /> Update Availability
                      </NavDropdown.Item>
                    </>
                  )}

                  {user.role === 'admin' && (
                    <>
                      <NavDropdown.Item as={Link} to="/admin/dashboard">
                        <FaTachometerAlt className="me-2 text-danger" /> Admin Dashboard
                      </NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/admin/doctors">
                        <FaUserMd className="me-2 text-primary" /> Doctor Approvals
                      </NavDropdown.Item>
                    </>
                  )}

                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout} className="text-danger fw-semibold">
                    <FaSignOutAlt className="me-2" /> Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <div className="d-flex align-items-center gap-2">
                <Link to="/login" className="btn btn-outline-primary fw-semibold rounded-pill px-4">
                  Log In
                </Link>
                <Link to="/register" className="btn btn-primary-custom rounded-pill px-4">
                  Register
                </Link>
              </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
