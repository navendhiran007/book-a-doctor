import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Badge, Button, Tabs, Tab } from 'react-bootstrap';
import { FaUserShield, FaUserMd, FaUsers, FaCalendarCheck, FaCheckCircle, FaTimesCircle, FaClock, FaChartLine } from 'react-icons/fa';
import LoadingSpinner from '../components/LoadingSpinner';
import AlertMessage from '../components/AlertMessage';
import API from '../services/api';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [users, setUsers] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    setLoading(true);
    try {
      const [statsRes, doctorsRes, usersRes, appointmentsRes] = await Promise.all([
        API.get('/admin/stats'),
        API.get('/admin/doctors'),
        API.get('/admin/users'),
        API.get('/admin/appointments'),
      ]);

      if (statsRes.data.success) setStats(statsRes.data.stats);
      if (doctorsRes.data.success) setDoctors(doctorsRes.data.doctors);
      if (usersRes.data.success) setUsers(usersRes.data.users);
      if (appointmentsRes.data.success) setAppointments(appointmentsRes.data.appointments);
    } catch (err) {
      console.error('Failed to load admin dashboard data:', err);
      setError('Failed to fetch administrative records.');
    } finally {
      setLoading(false);
    }
  };

  const handleApproveDoctor = async (id) => {
    try {
      const res = await API.put(`/admin/doctors/${id}/approve`);
      if (res.data.success) {
        setMessage(res.data.message);
        fetchAdminData();
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Approval action failed.');
    }
  };

  const handleRejectDoctor = async (id) => {
    try {
      const res = await API.put(`/admin/doctors/${id}/reject`);
      if (res.data.success) {
        setMessage(res.data.message);
        fetchAdminData();
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Rejection action failed.');
    }
  };

  const pendingDoctors = doctors.filter((d) => d.approvalStatus === 'pending');

  if (loading) return <LoadingSpinner fullScreen />;

  return (
    <Container className="py-5">
      <div className="d-flex align-items-center gap-3 mb-4">
        <div className="brand-badge p-3 rounded-circle">
          <FaUserShield size={28} />
        </div>
        <div>
          <h2 className="fw-extrabold text-dark mb-1">System Admin Dashboard</h2>
          <p className="text-muted mb-0">Platform overview, doctor approvals, and user governance</p>
        </div>
      </div>

      {error && <AlertMessage variant="danger">{error}</AlertMessage>}
      {message && <AlertMessage variant="success">{message}</AlertMessage>}

      {/* Metrics Row */}
      <Row className="g-4 mb-5">
        <Col lg={3} md={6}>
          <div className="stat-card stat-card-blue shadow-sm">
            <h6 className="opacity-75 text-uppercase fw-bold small">Total Users</h6>
            <h2 className="display-6 fw-extrabold my-2">{stats?.totalUsers || 0}</h2>
            <span className="small opacity-90"><FaUsers className="me-1" /> Patients & Doctors</span>
          </div>
        </Col>

        <Col lg={3} md={6}>
          <div className="stat-card stat-card-amber shadow-sm">
            <h6 className="opacity-75 text-uppercase fw-bold small">Pending Approvals</h6>
            <h2 className="display-6 fw-extrabold my-2">{stats?.pendingDoctors || 0}</h2>
            <span className="small opacity-90"><FaClock className="me-1" /> Awaiting review</span>
          </div>
        </Col>

        <Col lg={3} md={6}>
          <div className="stat-card stat-card-teal shadow-sm">
            <h6 className="opacity-75 text-uppercase fw-bold small">Approved Doctors</h6>
            <h2 className="display-6 fw-extrabold my-2">{stats?.approvedDoctors || 0}</h2>
            <span className="small opacity-90"><FaUserMd className="me-1" /> Active practitioners</span>
          </div>
        </Col>

        <Col lg={3} md={6}>
          <div className="stat-card stat-card-indigo shadow-sm">
            <h6 className="opacity-75 text-uppercase fw-bold small">Total Bookings</h6>
            <h2 className="display-6 fw-extrabold my-2">{stats?.totalAppointments || 0}</h2>
            <span className="small opacity-90"><FaCalendarCheck className="me-1" /> Platform consultations</span>
          </div>
        </Col>
      </Row>

      {/* Admin Operations Tabs */}
      <Card className="custom-card border-0 p-4 shadow-sm">
        <Card.Body>
          <Tabs defaultActiveKey="pending" id="admin-tabs" className="mb-4">
            <Tab eventKey="pending" title={`Pending Doctor Approvals (${pendingDoctors.length})`}>
              {pendingDoctors.length > 0 ? (
                <div className="table-responsive">
                  <Table hover className="custom-table align-middle">
                    <thead>
                      <tr className="text-muted small border-bottom">
                        <th>Doctor Name</th>
                        <th>Email</th>
                        <th>Specialization</th>
                        <th>Qualification</th>
                        <th>Fee</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pendingDoctors.map((doc) => (
                        <tr key={doc._id}>
                          <td className="fw-bold text-dark">Dr. {doc.name}</td>
                          <td className="small text-secondary">{doc.email}</td>
                          <td><span className="spec-badge">{doc.specialization}</span></td>
                          <td className="small text-muted">{doc.qualification}</td>
                          <td className="fw-bold text-success">${doc.consultationFee}</td>
                          <td>
                            <div className="d-flex gap-2">
                              <Button
                                variant="success"
                                size="sm"
                                onClick={() => handleApproveDoctor(doc._id)}
                                className="rounded-pill px-3"
                              >
                                <FaCheckCircle className="me-1" /> Approve
                              </Button>
                              <Button
                                variant="outline-danger"
                                size="sm"
                                onClick={() => handleRejectDoctor(doc._id)}
                                className="rounded-pill px-3"
                              >
                                <FaTimesCircle className="me-1" /> Reject
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
                  <p className="mb-0">No pending doctor registration applications!</p>
                </div>
              )}
            </Tab>

            <Tab eventKey="doctors" title={`All Doctors (${doctors.length})`}>
              <div className="table-responsive">
                <Table hover className="custom-table align-middle">
                  <thead>
                    <tr className="text-muted small border-bottom">
                      <th>Name</th>
                      <th>Specialization</th>
                      <th>Location</th>
                      <th>Fee</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {doctors.map((doc) => (
                      <tr key={doc._id}>
                        <td className="fw-bold text-dark">Dr. {doc.name}</td>
                        <td><span className="spec-badge">{doc.specialization}</span></td>
                        <td className="small text-secondary">{doc.location}</td>
                        <td className="fw-bold text-success">${doc.consultationFee}</td>
                        <td>
                          {doc.approvalStatus === 'approved' ? (
                            <Badge className="badge-confirmed px-3 py-2">Approved</Badge>
                          ) : doc.approvalStatus === 'pending' ? (
                            <Badge className="badge-pending px-3 py-2">Pending</Badge>
                          ) : (
                            <Badge className="badge-rejected px-3 py-2">Rejected</Badge>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Tab>

            <Tab eventKey="users" title={`User Accounts (${users.length})`}>
              <div className="table-responsive">
                <Table hover className="custom-table align-middle">
                  <thead>
                    <tr className="text-muted small border-bottom">
                      <th>User Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Role</th>
                      <th>Joined Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((usr) => (
                      <tr key={usr._id}>
                        <td className="fw-bold text-dark">{usr.name}</td>
                        <td className="small text-secondary">{usr.email}</td>
                        <td className="small text-muted">{usr.phone || 'N/A'}</td>
                        <td>
                          <Badge bg={usr.role === 'admin' ? 'danger' : usr.role === 'doctor' ? 'primary' : 'info'} className="px-3 py-2 text-uppercase">
                            {usr.role}
                          </Badge>
                        </td>
                        <td className="small text-muted">{new Date(usr.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Tab>
          </Tabs>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AdminDashboard;
