import React from 'react';
import { Spinner } from 'react-bootstrap';

const LoadingSpinner = ({ fullScreen = false, message = 'Loading...' }) => {
  if (fullScreen) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center min-vh-100 bg-light">
        <Spinner animation="border" variant="primary" style={{ width: '3rem', height: '3rem' }} />
        <p className="mt-3 text-muted fw-semibold">{message}</p>
      </div>
    );
  }

  return (
    <div className="d-flex align-items-center justify-content-center py-4">
      <Spinner animation="border" variant="primary" size="sm" className="me-2" />
      <span className="text-muted">{message}</span>
    </div>
  );
};

export default LoadingSpinner;
