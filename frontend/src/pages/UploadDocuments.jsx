import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Table } from 'react-bootstrap';
import { FaFileUpload, FaDownload, FaTrash, FaFileAlt, FaUserMd } from 'react-icons/fa';
import AlertMessage from '../components/AlertMessage';
import LoadingSpinner from '../components/LoadingSpinner';
import API from '../services/api';

const UploadDocuments = () => {
  const [documents, setDocuments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [file, setFile] = useState(null);
  const [selectedDoctorId, setSelectedDoctorId] = useState('');
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchDocuments();
    fetchDoctors();
  }, []);

  const fetchDocuments = async () => {
    try {
      const res = await API.get('/documents');
      if (res.data.success) {
        setDocuments(res.data.documents);
      }
    } catch (err) {
      console.error('Failed to fetch documents:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchDoctors = async () => {
    try {
      const res = await API.get('/doctors?status=approved');
      if (res.data.success) {
        setDoctors(res.data.doctors);
      }
    } catch (err) {
      console.error('Failed to fetch doctors list:', err);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.size > 10 * 1024 * 1024) {
        setError('File size exceeds 10MB limit.');
        setFile(null);
        return;
      }
      setError('');
      setFile(selectedFile);
    }
  };

  const handleUploadSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!file) {
      setError('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('document', file);
    if (selectedDoctorId) {
      formData.append('doctorId', selectedDoctorId);
    }

    setUploading(true);

    try {
      const res = await API.post('/documents/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (res.data.success) {
        setSuccess('Medical document uploaded successfully!');
        setFile(null);
        setSelectedDoctorId('');
        fetchDocuments();
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to upload document.');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this document?')) return;

    try {
      const res = await API.delete(`/documents/${id}`);
      if (res.data.success) {
        setSuccess('Document deleted.');
        fetchDocuments();
      }
    } catch (err) {
      setError('Failed to delete document.');
    }
  };

  const handleDownload = (id, fileName) => {
    const token = localStorage.getItem('token');
    const url = `${import.meta.env.VITE_API_URL || '/api'}/documents/${id}/download`;
    
    // Trigger download using fetch with token
    fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.blob())
      .then((blob) => {
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = fileName;
        link.click();
      })
      .catch((err) => console.error('Download error:', err));
  };

  return (
    <Container className="py-5">
      <div className="mb-4">
        <h2 className="fw-extrabold text-dark mb-1">Medical Documents & Reports</h2>
        <p className="text-muted">Upload prescriptions, lab reports, and medical history securely</p>
      </div>

      {error && <AlertMessage variant="danger">{error}</AlertMessage>}
      {success && <AlertMessage variant="success">{success}</AlertMessage>}

      <Row className="gy-4 mb-5">
        <Col lg={5}>
          <Card className="custom-card border-0 p-4 shadow-sm">
            <Card.Body>
              <div className="d-flex align-items-center gap-2 mb-3">
                <FaFileUpload size={24} className="text-primary" />
                <h5 className="fw-bold text-dark mb-0">Upload New File</h5>
              </div>

              <Form onSubmit={handleUploadSubmit}>
                <Form.Group className="mb-3" controlId="docFile">
                  <Form.Label className="small fw-semibold">Select File (PDF, JPG, PNG, DOC)</Form.Label>
                  <Form.Control type="file" onChange={handleFileChange} required />
                  <Form.Text className="text-muted small">Max file size: 10MB</Form.Text>
                </Form.Group>

                <Form.Group className="mb-4" controlId="docDoctor">
                  <Form.Label className="small fw-semibold">Share with Doctor (Optional)</Form.Label>
                  <Form.Select
                    value={selectedDoctorId}
                    onChange={(e) => setSelectedDoctorId(e.target.value)}
                  >
                    <option value="">Do Not Associate / Keep Private</option>
                    {doctors.map((d) => (
                      <option key={d._id} value={d._id}>
                        Dr. {d.name} ({d.specialization})
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Button
                  type="submit"
                  disabled={uploading}
                  className="btn-primary-custom w-100 py-2 rounded-3 fw-bold d-flex align-items-center justify-content-center gap-2"
                >
                  <FaFileUpload /> {uploading ? 'Uploading...' : 'Upload Document'}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={7}>
          <Card className="custom-card border-0 p-4 shadow-sm h-100">
            <Card.Body>
              <h5 className="fw-bold text-dark mb-4">Uploaded Records</h5>

              {loading ? (
                <LoadingSpinner />
              ) : documents.length > 0 ? (
                <div className="table-responsive">
                  <Table hover className="custom-table align-middle">
                    <thead>
                      <tr className="text-muted small border-bottom">
                        <th>File Name</th>
                        <th>Associated Doctor</th>
                        <th>Date</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {documents.map((doc) => (
                        <tr key={doc._id}>
                          <td className="fw-bold text-dark small">
                            <FaFileAlt className="me-2 text-primary" /> {doc.fileName}
                          </td>
                          <td className="small text-secondary">
                            {doc.doctorId ? `Dr. ${doc.doctorId.name}` : 'Private'}
                          </td>
                          <td className="small text-muted">
                            {new Date(doc.uploadedAt).toLocaleDateString()}
                          </td>
                          <td>
                            <div className="d-flex gap-2">
                              <Button
                                variant="outline-primary"
                                size="sm"
                                onClick={() => handleDownload(doc._id, doc.fileName)}
                                className="rounded-circle p-2"
                                title="Download File"
                              >
                                <FaDownload size={14} />
                              </Button>
                              <Button
                                variant="outline-danger"
                                size="sm"
                                onClick={() => handleDelete(doc._id)}
                                className="rounded-circle p-2"
                                title="Delete File"
                              >
                                <FaTrash size={14} />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              ) : (
                <div className="text-center py-4 text-muted">
                  <p className="mb-0">No documents uploaded yet.</p>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default UploadDocuments;
