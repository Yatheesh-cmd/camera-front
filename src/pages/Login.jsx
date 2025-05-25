import React, { useState, useContext } from 'react';
import { Container, Row, Col, Card, Form, Button, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loginApi } from '../services/api';
import { authContext } from '../context/ContextApi';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { setAuth, setContextRole } = useContext(authContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await loginApi(formData);
      if (result.status === 200) {
        sessionStorage.setItem('token', result.data.token);
        sessionStorage.setItem('role', result.data.user.role);
        sessionStorage.setItem('user', result.data.user.username);
        sessionStorage.setItem('email', result.data.user.email);
        setAuth(true);
        setContextRole(result.data.user.role);
        toast.success('Logged in successfully');
        navigate(result.data.user.role === 'admin' ? '/admin-dashboard' : '/profile');
      } else {
        toast.error(result.data?.message || 'Login failed');
      }
    } catch (error) {
      toast.error(error.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={8}>
            <Card className="shadow-sm" style={{ borderRadius: '12px' }}>
              <Row className="g-0">
                <Col md={6} className="d-flex align-items-center justify-content-center">
                  <div style={{ padding: '20px', width: '100%' }}>
                    <img
                      src="https://png.pngtree.com/png-vector/20240321/ourmid/pngtree-trendy-taking-picture-png-image_12021498.png"
                      alt="Login Illustration"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: '12px 0 0 12px',
                      }}
                    />
                  </div>
                </Col>
                <Col md={6}>
                  <Card.Body className="p-4">
                    <h2 className="text-center mb-4">Login</h2>
                    <Form onSubmit={handleSubmit}>
                      <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Enter email"
                          required
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type="password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          placeholder="Enter password"
                          required
                        />
                      </Form.Group>
                      <Button variant="primary" type="submit" disabled={loading} className="w-100">
                        {loading ? <Spinner animation="border" size="sm" /> : 'Login'}
                      </Button>
                    </Form>
                    <p className="text-center mt-3">
                      Don't have an account? <Button variant="link" onClick={() => navigate('/register')}>Register</Button>
                    </p>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
}

export default Login;