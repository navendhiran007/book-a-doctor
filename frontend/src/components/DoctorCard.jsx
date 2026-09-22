import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaStethoscope, FaMapMarkerAlt, FaDollarSign, FaClock, FaUserMd } from 'react-icons/fa';

const DoctorCard = ({ doctor }) => {
  return (
    <Card className="custom-card h-100 border-0">
      <Card.Body className="d-flex flex-column p-4">
        <div className="d-flex align-items-center mb-3">
          <div className="brand-badge me-3 p-3 rounded-circle" style={{ width: '60px', height: '60px', justifyContent: 'center' }}>
            <FaUserMd size={28} />
          </div>
          <div>
            <h5 className="fw-bold mb-1 text-dark">Dr. {doctor.name}</h5>
            <span className="spec-badge">
              <FaStethoscope className="me-1" /> {doctor.specialization}
            </span>
          </div>
        </div>

        <p className="text-muted small mb-2">
          <strong>Qualification:</strong> {doctor.qualification}
        </p>

        <div className="d-flex align-items-center text-secondary small mb-2">
          <FaClock className="me-2 text-primary" />
          <span>{doctor.experience} Experience</span>
        </div>

        <div className="d-flex align-items-center text-secondary small mb-3">
          <FaMapMarkerAlt className="me-2 text-danger" />
          <span>{doctor.location}</span>
        </div>

        <div className="mt-auto pt-3 border-top d-flex align-items-center justify-content-between">
          <div>
            <span className="text-muted small d-block">Consultation Fee</span>
            <span className="fw-bold text-success fs-5">
              ${doctor.consultationFee}
            </span>
          </div>
          <Link to={`/doctors/${doctor._id}`} className="btn btn-outline-primary rounded-pill px-3 fw-semibold">
            View Details
          </Link>
        </div>
      </Card.Body>
    </Card>
  );
};

export default DoctorCard;
