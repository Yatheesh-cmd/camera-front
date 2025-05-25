import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

function Contact() {
  return (
    <div>
      <Navbar />
      <Container className="py-5">
        <h2 className="text-center mb-5 fw-bold">Contact Us</h2>
        <Row className="justify-content-center">
          <Col md={6}>
            <Card className="shadow-sm mb-4" style={{ borderRadius: '12px', overflow: 'hidden' }}>
              <Card.Body className="p-0">
                <img
                  src="https://img.lovepik.com/background/20211022/large/lovepik-contact-us-background-image_500584282.jpg"
                  alt="Contact Us"
                  style={{
                    width: '100%',
                    height: 'auto',
                    objectFit: 'cover',
                    borderRadius: '12px'
                  }}
                />
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="shadow-sm" style={{ borderRadius: '12px' }}>
              <Card.Body>
                <h4>Contact Information</h4>
                <p>
                  <FaEnvelope className="me-2" /> Email: support@camerahive.com
                </p>
                <p>
                  <FaPhone className="me-2" /> Phone: +91 987-654-3210
                </p>
                <p>
                  <FaMapMarkerAlt className="me-2" /> Address: 123 Camera Street, Mumbai, India
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

export default Contact;