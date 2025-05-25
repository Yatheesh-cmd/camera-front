import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FaUserCircle } from 'react-icons/fa';

function UserDashboard() {
  const [user, setUser] = useState({
    username: sessionStorage.getItem('user') || '',
    email: sessionStorage.getItem('email') || '',
  });
  const [loading, setLoading] = useState(false);

  const handleProfileChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    toast.info('Profile update not implemented in backend.');
    setLoading(false);
  };

  return (
    <div>
      <Navbar />
      <Container className="py-5">
        <div className="mb-5 text-center">
          <FaUserCircle size={50} className="text-primary mb-2" />
          <h2 className="fw-bold">Welcome to Your Dashboard</h2>
          <p className="text-muted w-75 mx-auto">
            This is your personalized space. Here, you can manage your profile and stay updated with your rental experience. Keeping your details current helps us serve you better.
          </p>
        </div>

        <Row className="mb-4">
          <Col md={6}>
            <Card className="shadow-sm" style={{ borderRadius: '16px' }}>
              <Card.Body>
                <h4 className="mb-3">Your Profile</h4>
                <p className="text-muted">
                  Update your profile to keep your contact details accurate and ensure a seamless experience.
                </p>
                <Form onSubmit={handleProfileSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      name="username"
                      value={user.username}
                      onChange={handleProfileChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={user.email}
                      disabled
                    />
                  </Form.Group>
                  {/* <Button variant="primary" type="submit" disabled={loading}>
                    {loading ? <Spinner animation="border" size="sm" /> : 'Update Profile'}
                  </Button> */}
                </Form>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6}>
            <Card className="shadow-sm" style={{ borderRadius: '16px' }}>
              <Card.Body>
                <h4 className="mb-3">Why Keep Your Profile Updated?</h4>
                <ul className="text-muted">
                  <li>Get personalized support and rental recommendations</li>
                  <li>Ensure your rental confirmations go to the right place</li>
                  <li>Enjoy a better experience across all devices</li>
                </ul>
                <hr />
                <h5 className="mt-4">Need Help?</h5>
                <p className="text-muted">
                  If you have any questions or need help, feel free to contact our support team at <a href="mailto:support@rentalhub.com">support@rentalhub.com</a>.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
}

export default UserDashboard;
