import React from 'react';
import { Container, Row, Col, Card, Image } from 'react-bootstrap';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FaCamera, FaShieldAlt, FaExchangeAlt, FaStar, FaHandsHelping } from 'react-icons/fa';

function About() {
  // Google-hosted image URLs
  const aboutHero = "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1630&q=80";
  const teamPhoto = "https://cdn.pixabay.com/photo/2016/04/01/08/34/camera-1298800_1280.png";
  const equipment = "https://static.vecteezy.com/system/resources/previews/035/079/241/original/ai-generated-a-cartoon-camera-on-transparent-background-png.png";

  return (
    <div className="about-page">
      <Navbar />
      
      {/* Hero Section */}
      <div className="about-hero position-relative">
        <Image src={aboutHero} fluid className="w-100 hero-image" style={{ height: '400px', objectFit: 'cover' }} />
        <div className="hero-overlay position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center">
          <h1 className="text-white display-4 fw-bold text-center">Capturing Your Vision, <br/> One Lens at a Time</h1>
        </div>
      </div>

      <Container className="py-5">
        {/* Mission Section */}
        {/* Mission Section */}
<Row className="mb-5 align-items-center">
  <Col md={6} className="d-flex justify-content-center">
    <Image 
      src={equipment} 
      rounded 
      className="shadow-lg img-fluid" 
      style={{ 
        maxHeight: '350px', 
        width: 'auto',
        objectFit: 'contain' 
      }} 
      alt="Professional camera equipment"
    />
  </Col>
  <Col md={6} className="mt-4 mt-md-0">
    <h2 className="fw-bold mb-4">Our Mission</h2>
    <p className="lead">
      At CameraHive, we believe everyone deserves access to professional photography equipment without the hefty price tag.
    </p>
    <p>
      Founded in 2025 by a team of photography enthusiasts, we've grown from a small rental service to India's premier platform for camera gear. Whether you're shooting your first wedding or capturing wildlife in the Himalayas, we've got the gear to make it happen.
    </p>
    <div className="d-flex align-items-center mt-4">
      <FaHandsHelping size={30} className="text-primary me-3" />
      <div>
        <h5 className="mb-0">Community Focused</h5>
        <small>We support local photographers and filmmakers</small>
      </div>
    </div>
  </Col>
</Row>

        {/* Why Choose Us */}
        <h2 className="text-center fw-bold mb-5">Why Photographers Choose CameraHive</h2>
        <Row className="g-4 mb-5">
          <Col md={3}>
            <Card className="h-100 border-0 shadow-sm text-center p-4">
              <FaCamera size={40} className="text-primary mx-auto mb-3" />
              <h5>Premium Equipment</h5>
              <p>From Canon to Sony, we offer top-tier cameras and lenses maintained to perfection.</p>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="h-100 border-0 shadow-sm text-center p-4">
              <FaShieldAlt size={40} className="text-primary mx-auto mb-3" />
              <h5>Damage Protection</h5>
              <p>Affordable insurance options give you peace of mind on every shoot.</p>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="h-100 border-0 shadow-sm text-center p-4">
              <FaExchangeAlt size={40} className="text-primary mx-auto mb-3" />
              <h5>Flexible Options</h5>
              <p>Rent for a day or buy with our rent-to-own program - the choice is yours.</p>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="h-100 border-0 shadow-sm text-center p-4">
              <FaStar size={40} className="text-primary mx-auto mb-3" />
              <h5>Expert Support</h5>
              <p>Our team includes working photographers who understand your needs.</p>
            </Card>
          </Col>
        </Row>

        {/* Team Section */}
        <Row className="mb-5 py-4 align-items-center bg-light rounded-3">
          <Col md={6} className="order-md-2 ps-md-5">
            <h2 className="fw-bold mb-4">Meet Our Team</h2>
            <p>
              CameraHive is run by photographers, for photographers. Our diverse team includes award-winning professionals, tech experts, and customer service specialists who speak your language - literally and figuratively.
            </p>
            <p>
              We test every piece of equipment ourselves before it goes into our inventory, ensuring you get gear that performs when it matters most.
            </p>
            <button className="btn btn-primary mt-3">View Open Positions</button>
          </Col>
          <Col md={6} className="order-md-1">
            <Image src={teamPhoto} rounded className="shadow w-100" />
          </Col>
        </Row>

        {/* Testimonials */}
        <h2 className="text-center fw-bold mb-5">What Our Community Says</h2>
        <Row className="g-4">
          <Col md={4}>
            <Card className="h-100 border-0 shadow-sm p-4">
              <div className="d-flex mb-3">
                {[...Array(5)].map((_, i) => <FaStar key={i} className="text-warning" />)}
              </div>
              <p>"CameraHive saved my wedding shoot when my main camera failed. Their next-day delivery was a lifesaver!"</p>
              <div className="mt-auto">
                <h6 className="mb-0">Priya K.</h6>
                <small className="text-muted">Wedding Photographer</small>
              </div>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="h-100 border-0 shadow-sm p-4">
              <div className="d-flex mb-3">
                {[...Array(5)].map((_, i) => <FaStar key={i} className="text-warning" />)}
              </div>
              <p>"As a film student, renting from CameraHive lets me experiment with different cameras without breaking the bank."</p>
              <div className="mt-auto">
                <h6 className="mb-0">Rahul M.</h6>
                <small className="text-muted">Film Student</small>
              </div>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="h-100 border-0 shadow-sm p-4">
              <div className="d-flex mb-3">
                {[...Array(5)].map((_, i) => <FaStar key={i} className="text-warning" />)}
              </div>
              <p>"Their equipment is always in perfect condition, and their customer service is unmatched in the industry."</p>
              <div className="mt-auto">
                <h6 className="mb-0">Ananya S.</h6>
                <small className="text-muted">Travel Photographer</small>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* CTA Section */}
      <div className="bg-dark text-white py-5 mt-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} className="text-center">
              <h2 className="fw-bold mb-4">Ready to Elevate Your Photography?</h2>
              <p className="lead mb-4">Join thousands of photographers who trust CameraHive for their gear needs.</p>
              <button className="btn btn-primary btn-lg me-3">Browse Equipment</button>
              <button className="btn btn-outline-light btn-lg">Contact Our Team</button>
            </Col>
          </Row>
        </Container>
      </div>

      <Footer />
      
      {/* Styles */}
      <style jsx>{`
        .about-hero {
          overflow: hidden;
        }
        .hero-overlay {
          background: rgba(0, 0, 0, 0.5);
        }
        .hero-image {
          filter: brightness(0.8);
        }
        .about-page {
          overflow-x: hidden;
        }
      `}</style>
    </div>
  );
}

export default About;