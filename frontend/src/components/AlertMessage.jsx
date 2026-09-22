import React from 'react';
import { Alert } from 'react-bootstrap';

const AlertMessage = ({ variant = 'danger', children, dismissible = true, onClose }) => {
  if (!children) return null;

  return (
    <Alert variant={variant} dismissible={dismissible} onClose={onClose} className="rounded-3 shadow-sm my-2">
      {children}
    </Alert>
  );
};

export default AlertMessage;
