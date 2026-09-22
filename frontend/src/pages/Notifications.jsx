import React, { useState, useEffect } from 'react';
import { Container, Card, ListGroup, Button, Badge } from 'react-bootstrap';
import { FaBell, FaCheckDouble, FaInfoCircle, FaCalendarCheck, FaUserShield } from 'react-icons/fa';
import LoadingSpinner from '../components/LoadingSpinner';
import AlertMessage from '../components/AlertMessage';
import API from '../services/api';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await API.get('/notifications');
      if (res.data.success) {
        setNotifications(res.data.notifications);
      }
    } catch (err) {
      setError('Failed to fetch notifications.');
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      const res = await API.put(`/notifications/${id}/read`);
      if (res.data.success) {
        fetchNotifications();
      }
    } catch (err) {
      console.error('Failed to mark notification as read:', err);
    }
  };

  const handleMarkAllRead = async () => {
    try {
      const res = await API.put('/notifications/read-all');
      if (res.data.success) {
        setMessage('All notifications marked as read.');
        fetchNotifications();
      }
    } catch (err) {
      setError('Failed to mark all as read.');
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case 'appointment':
      case 'status':
        return <FaCalendarCheck className="text-primary me-3" size={24} />;
      case 'admin':
        return <FaUserShield className="text-danger me-3" size={24} />;
      default:
        return <FaInfoCircle className="text-info me-3" size={24} />;
    }
  };

  return (
    <Container className="py-5">
      <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between mb-4">
        <div>
          <h2 className="fw-extrabold text-dark mb-1">Notifications</h2>
          <p className="text-muted mb-0">Stay updated on your appointment status and account alerts</p>
        </div>
        {notifications.some((n) => !n.readStatus) && (
          <Button
            variant="outline-primary"
            onClick={handleMarkAllRead}
            className="rounded-pill px-4 mt-3 mt-md-0 d-flex align-items-center gap-2 fw-semibold"
          >
            <FaCheckDouble /> Mark All as Read
          </Button>
        )}
      </div>

      {error && <AlertMessage variant="danger">{error}</AlertMessage>}
      {message && <AlertMessage variant="success">{message}</AlertMessage>}

      <Card className="custom-card border-0 p-4 shadow-sm">
        <Card.Body>
          {loading ? (
            <LoadingSpinner />
          ) : notifications.length > 0 ? (
            <ListGroup variant="flush">
              {notifications.map((n) => (
                <ListGroup.Item
                  key={n._id}
                  className={`p-3 border-bottom d-flex align-items-center justify-content-between ${
                    !n.readStatus ? 'bg-light rounded-3 my-1 border-start border-primary border-4' : ''
                  }`}
                >
                  <div className="d-flex align-items-center">
                    {getIcon(n.type)}
                    <div>
                      <p className={`mb-1 ${!n.readStatus ? 'fw-bold text-dark' : 'text-secondary'}`}>
                        {n.message}
                      </p>
                      <span className="small text-muted">
                        {new Date(n.createdAt).toLocaleString()}
                      </span>
                    </div>
                  </div>
                  {!n.readStatus && (
                    <Button
                      variant="light"
                      size="sm"
                      onClick={() => handleMarkAsRead(n._id)}
                      className="rounded-pill px-3 ms-3 text-primary fw-semibold"
                    >
                      Mark Read
                    </Button>
                  )}
                </ListGroup.Item>
              ))}
            </ListGroup>
          ) : (
            <div className="text-center py-5 text-muted">
              <FaBell size={50} className="mb-3 opacity-50 text-muted" />
              <h5 className="fw-bold text-dark">No Notifications</h5>
              <p className="mb-0">You have no new alerts at the moment.</p>
            </div>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Notifications;
