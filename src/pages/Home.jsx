import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button, Spinner } from 'react-bootstrap';
import { sampleCamerasApi } from '../services/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CameraCard from '../components/CameraCard';

function Home() {
  const [sampleCameras, setSampleCameras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);

  useEffect(() => {
    fetchSampleCameras();
  }, []);

  const fetchSampleCameras = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await sampleCamerasApi();
      if (response.status === 200) {
        setSampleCameras(response.data || []);
      }
    } catch (error) {
      console.error('Failed to fetch sample cameras:', error);
      setError('Failed to load cameras. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const nextSlide = () => {
    const maxSlides = Math.max(1, Math.ceil(sampleCameras.length / 4));
    setCurrentSlide((prev) => (prev < maxSlides - 1 ? prev + 1 : 0));
  };

  const prevSlide = () => {
    const maxSlides = Math.max(1, Math.ceil(sampleCameras.length / 4));
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : maxSlides - 1));
  };

  const features = [
    {
      icon: '📷',
      title: 'Premium Equipment',
      description: 'Top-tier cameras and lenses from leading brands',
      bgColor: 'bg-primary bg-opacity-10'
    },
    {
      icon: '🔧',
      title: 'Expert Maintenance',
      description: 'All gear professionally serviced and calibrated',
      bgColor: 'bg-success bg-opacity-10'
    },
    {
      icon: '🚚',
      title: 'Fast Delivery',
      description: 'Same-day shipping available in major cities',
      bgColor: 'bg-warning bg-opacity-10'
    },
    {
      icon: '💳',
      title: 'Flexible Payments',
      description: 'Multiple payment options including installments',
      bgColor: 'bg-info bg-opacity-10'
    }
  ];

  const projectInfo = [
    {
      icon: '🛠️',
      title: 'Project Development',
      content: 'This platform was built using modern web technologies including React, React Bootstrap, and a custom Node.js backend. The focus was on creating a seamless user experience for photographers to browse and rent equipment.'
    },
    {
      icon: '🎯',
      title: 'Our Mission',
      content: 'To democratize access to professional photography equipment by providing affordable rental options and high-quality used gear. We believe every photographer should have access to the tools they need to create their best work.'
    },
    {
      icon: '🌐',
      title: 'Global Reach',
      content: 'While we started as a local service, we now ship to over 50 countries worldwide. Our international fulfillment centers ensure quick delivery times and reduced shipping costs for our global customers.'
    },
    {
      icon: '♻️',
      title: 'Sustainability',
      content: 'Were committed to reducing electronic waste by extending the lifecycle of photography equipment. All traded-in gear is professionally refurbished and given a second life with new owners.'
    }
  ];

  const shouldShowSliderControls = sampleCameras.length > 4;
  const translateValue = -(currentSlide * 100);
  const sliderWidth = sampleCameras.length * 25; // 25% width per card (4 cards visible)

  return (
    <div className="home-page">
      <Navbar />
      
      {/* Hero Section */}
      <section className="camera-bg d-flex align-items-center position-relative">
        <div className="camera-bg-overlay"></div>
        <Container className="text-center position-relative z-index-1 py-5">
          <h1 className="display-3 fw-bold mb-4 animate-fade text-shadow">
            Elevate Your Photography
          </h1>
          <p className="fs-3 mb-4 animate-fade text-shadow" style={{ animationDelay: '0.2s' }}>
            Professional gear for <span className="fw-bold" style={{ color: '#764ba2' }}>creators</span> who demand excellence
          </p>
          <div className="d-flex justify-content-center gap-3 animate-fade" style={{ animationDelay: '0.4s' }}>
            <Link 
              to="/buy" 
              className="btn btn-lg px-4 py-3 fw-bold rounded-pill"
              style={{ backgroundColor: '#764ba2', color: 'white' }}
            >
              Shop Your Order
            </Link>
            <Link to="/rent" className="btn btn-outline-light btn-lg px-4 py-3 fw-bold rounded-pill">
              Rent Equipment
            </Link>
          </div>
        </Container>
      </section>

      {/* Stats Banner */}
      <section className="py-8 bg-dark text-white">
        <Container>
          <Row className="g-4 g-lg-6 text-center">
            <Col md={3}>
              <div className="p-4 p-lg-5 hover-scale" style={{transition: 'transform 0.3s ease'}}>
                <div className="icon-lg bg-camera-10 mb-3 mx-auto rounded-circle d-flex align-items-center justify-content-center">
                  <i className="bi bi-emoji-smile fs-3"></i>
                </div>
                <h2 className="fw-bold mb-1 display-5" style={{ color: '#764ba2' }}>10K+</h2>
                <p className="mb-0 text-300">Satisfied Photographers</p>
                <p className="small text-muted mt-2 mb-0">Trusted by professionals worldwide</p>
              </div>
            </Col>
            <Col md={3}>
              <div className="p-4 p-lg-5 hover-scale" style={{transition: 'transform 0.3s ease'}}>
                <div className="icon-lg bg-camera-20 mb-3 mx-auto rounded-circle d-flex align-items-center justify-content-center">
                  <i className="bi bi-camera fs-3"></i>
                </div>
                <h2 className="fw-bold mb-1 display-5" style={{ color: '#764ba2' }}>500+</h2>
                <p className="mb-0 text-300">Premium Gear</p>
                <p className="small text-muted mt-2 mb-0">From vintage to mirrorless</p>
              </div>
            </Col>
            <Col md={3}>
              <div className="p-4 p-lg-5 hover-scale" style={{transition: 'transform 0.3s ease'}}>
                <div className="icon-lg bg-camera-30 mb-3 mx-auto rounded-circle d-flex align-items-center justify-content-center">
                  <i className="bi bi-headset fs-3"></i>
                </div>
                <h2 className="fw-bold mb-1 display-5" style={{ color: '#764ba2' }}>24/7</h2>
                <p className="mb-0 text-300">Expert Support</p>
                <p className="small text-muted mt-2 mb-0">Award-winning customer care</p>
              </div>
            </Col>
            <Col md={3}>
              <div className="p-4 p-lg-5 hover-scale" style={{transition: 'transform 0.3s ease'}}>
                <div className="icon-lg bg-camera-40 mb-3 mx-auto rounded-circle d-flex align-items-center justify-content-center">
                  <i className="bi bi-arrow-repeat fs-3"></i>
                </div>
                <h2 className="fw-bold mb-1 display-5" style={{ color: '#764ba2' }}>30-Day</h2>
                <p className="mb-0 text-300">Hassle-Free Returns</p>
                <p className="small text-muted mt-2 mb-0">No questions asked policy</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Featured Cameras Section with Slider */}
      <section className="py-5 bg-light">
        <Container>
          <div className="text-center mb-5">
            <h2 className="fw-bold mb-3">Featured Cameras</h2>
            <p className="text-muted fs-5">Professional tools trusted by industry leaders</p>
          </div>
          
          {loading ? (
            <div className="text-center py-5">
              <Spinner animation="border" variant="primary" size="lg" />
              <p className="mt-3 fs-5">Loading our premium selection...</p>
            </div>
          ) : error ? (
            <div className="text-center py-5">
              <p className="text-danger fs-5">{error}</p>
              <Button variant="outline-primary" onClick={fetchSampleCameras}>
                Retry
              </Button>
            </div>
          ) : (
            <div className="position-relative">
              <div className="slider-container" ref={sliderRef}>
                <Row 
                  className="g-4 flex-nowrap" 
                  style={{ 
                    transform: `translateX(${translateValue}%)`,
                    transition: 'transform 0.5s ease-in-out',
                    width: `${sliderWidth}%`
                  }}
                >
                  {sampleCameras.map((camera, index) => (
                    <Col 
                      key={camera._id || index} 
                      className="animate-fade" 
                      style={{ 
                        flex: '0 0 25%',
                        maxWidth: '25%',
                        animationDelay: `${0.1 * index}s`
                      }}
                    >
                      <CameraCard camera={camera} onBuy={true} onRent={true} />
                    </Col>
                  ))}
                </Row>
              </div>
              
              {shouldShowSliderControls && (
                <>
                  <button 
                    className="slider-nav slider-nav-prev btn btn-secondary rounded-circle"
                    onClick={prevSlide}
                  >
                    <i className="bi bi-chevron-left"></i>
                    <span className="visually-hidden">Previous</span>
                  </button>
                  <button 
                    className="slider-nav slider-nav-next btn btn-secondary rounded-circle"
                    onClick={nextSlide}
                  >
                    <i className="bi bi-chevron-right"></i>
                    <span className="visually-hidden">Next</span>
                  </button>
                </>
              )}
            </div>
          )}
        </Container>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-5">
        <Container>
          <div className="text-center mb-5">
            <h2 className="fw-bold mb-3">Why Choose LensPro?</h2>
            <p className="text-muted fs-5">We're committed to your photographic journey</p>
          </div>
          
          <Row className="g-4">
            {features.map((feature, index) => (
              <Col md={6} lg={3} key={index}>
                <div className={`h-100 p-4 rounded-4 shadow-sm ${feature.bgColor} animate-fade`} 
                     style={{ animationDelay: `${0.1 * index}s` }}>
                  <div className="feature-icon mb-3 fs-1">{feature.icon}</div>
                  <h3 className="h4 fw-bold mb-3">{feature.title}</h3>
                  <p className="mb-0">{feature.description}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Project Information Section */}
      <section className="py-5 bg-white">
        <Container>
          <div className="text-center mb-5">
            <h2 className="fw-bold mb-3">About LensPro</h2>
            <p className="text-muted fs-5">Our vision and values</p>
          </div>
          
          <Row className="g-4">
            {projectInfo.map((item, index) => (
              <Col md={6} key={index}>
                <div className="h-100 p-4 rounded-4 shadow-sm animate-fade" 
                     style={{ animationDelay: `${0.1 * index}s` }}>
                  <div className="d-flex align-items-start">
                    <div className="feature-icon me-4 fs-1">{item.icon}</div>
                    <div>
                      <h3 className="h4 fw-bold mb-3">{item.title}</h3>
                      <p className="mb-0">{item.content}</p>
                    </div>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Testimonial Section */}
      <section className="py-5 bg-light">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="mb-5 mb-lg-0">
              <div className="pe-lg-5">
                <h2 className="fw-bold mb-4">Trusted by Professional Photographers</h2>
                <div className="d-flex align-items-center mb-4">
                  <div className="me-4">
                    <div className="bg-primary bg-opacity-10 p-3 rounded-circle d-inline-block">
                      <span className="fs-2">⭐</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="h5 fw-bold mb-1">4.9/5 Stars</h3>
                    <p className="text-muted mb-0">Average customer rating</p>
                  </div>
                </div>
                <p className="fs-5">
                  "LensPro transformed my workflow with their reliable equipment and exceptional service. 
                  I've never missed a shot since switching to their rental program."
                </p>
                <div className="d-flex align-items-center mt-4">
                  <div className="rounded-circle overflow-hidden me-3" style={{ width: '50px', height: '50px' }}>
                    <img 
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" 
                      alt="Sarah J." 
                      className="img-fluid"
                    />
                  </div>
                  <div>
                    <h4 className="h6 fw-bold mb-0">Sarah J.</h4>
                    <p className="text-muted mb-0">Professional Wedding Photographer</p>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={6}>
              <div className="ratio ratio-16x9 rounded-4 overflow-hidden shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1469371670807-013ccf25f16a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                  alt="Photographer at work" 
                  className="object-fit-cover"
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-5 bg-dark text-white">
        <Container className="text-center py-4">
          <h2 className="display-5 fw-bold mb-4">Ready to Create Something Amazing?</h2>
          <p className="fs-5 mb-4">Join thousands of photographers who trust LensPro for their equipment needs</p>
          <div className="d-flex justify-content-center gap-3">
            <Link 
              to="/signup" 
              className="btn btn-lg px-4 py-3 fw-bold rounded-pill"
              style={{ backgroundColor: '#764ba2', color: 'white' }}
            >
              Get Started
            </Link>
            <Link to="/contact" className="btn btn-outline-light btn-lg px-4 py-3 fw-bold rounded-pill">
              Contact Us
            </Link>
          </div>
        </Container>
      </section>

      <Footer />

      <style>{`
        .slider-container {
          overflow: hidden;
          position: relative;
          padding: 0 60px;
          width: 100%;
          box-sizing: border-box;
        }
        
        .slider-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 1000;
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: none;
          background-color: #6c757d;
          color: white;
          font-size: 1.5rem;
          transition: background-color 0.3s ease;
        }
        
        .slider-nav:hover {
          background-color: #5c636a !important;
        }
        
        .slider-nav-prev {
          left: 0;
        }
        
        .slider-nav-next {
          right: 0;
        }
        
        .slider-nav:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          background-color: #6c757d;
        }
        
        @media (max-width: 768px) {
          .slider-container {
            padding: 0 40px;
          }
          
          .slider-nav {
            width: 40px;
            height: 40px;
            font-size: 1.2rem;
          }
        }
      `}</style>
    </div>
  );
}

export default Home;