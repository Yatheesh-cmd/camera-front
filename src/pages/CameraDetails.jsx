

import React, { useState, useEffect, useContext, useCallback } from 'react';
import { Container, Row, Col, Card, Button, ListGroup, Spinner } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getCameraByIdApi } from '../services/api';
import { cartContext, wishlistContext } from '../context/ContextApi';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FaShoppingCart, FaHeart, FaStar, FaCamera } from 'react-icons/fa';
import { MdMemory, MdOutlineSdCard } from 'react-icons/md';

function CameraDetails() {
  const { id } = useParams();
  const [camera, setCamera] = useState(null);
  const [loading, setLoading] = useState(true);
  const { cart, setCart } = useContext(cartContext);
  const { wishlist, setWishlist } = useContext(wishlistContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCamera = async () => {
      try {
        setLoading(true);
        const response = await getCameraByIdApi(id);
        if (response.status === 200) {
          setCamera(response.data);
        } else {
          throw new Error('Invalid response status');
        }
      } catch (error) {
        toast.error(`Failed to fetch camera details: ${error.message}`);
        navigate('/browse');
      } finally {
        setLoading(false);
      }
    };
    fetchCamera();
  }, [id, navigate]);

  const handleAddToCart = useCallback((type) => {
    if (!camera) return;
    const existingItem = cart.find(item => item._id === camera._id && item.type === type);
    if (existingItem) {
      setCart(cart.map(item =>
        item._id === camera._id && item.type === type
          ? { ...item, rentalDays: Math.min((item.rentalDays || 1) + 1, 30) }
          : item
      ));
    } else {
      setCart([...cart, { ...camera, type, rentalDays: type === 'rent' ? 1 : null }]);
    }
    toast.success(`${camera.name} added to cart for ${type}`);
  }, [camera, cart, setCart]);

  const handleAddToWishlist = useCallback(() => {
    if (!camera) return;
    if (!wishlist.find(item => item._id === camera._id)) {
      setWishlist([...wishlist, camera]);
      toast.success(`${camera.name} added to wishlist`);
    } else {
      toast.info(`${camera.name} is already in your wishlist`);
    }
  }, [camera, wishlist, setWishlist]);

  if (loading) {
    return (
      <div>
        <Navbar />
        <Container className="py-5 text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </Container>
        <Footer />
      </div>
    );
  }

  if (!camera) return null;

  return (
    <div className="bg-light">
      <Navbar />
      <Container className="py-5">
        <Row className="g-4">
          <Col lg={6}>
            <Card className="border-0 shadow-sm">
              <Card.Img
                variant="top"
                src={camera.image || 'https://via.placeholder.com/600'}
                style={{ maxHeight: '550px', objectFit: 'contain', width: '100%' }}
                alt={`${camera.name} camera`}
                loading="lazy"
              />
            </Card>
          </Col>
          <Col lg={6}>
            <h1 className="mb-3">{camera.name}</h1>
            <div className="d-flex align-items-center mb-3">
              <div className="me-2" aria-label={`Rating: ${camera.rating || 4} out of 5`}>
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    color={i < (camera.rating || 4) ? '#ffc107' : '#e4e5e9'}
                    size={20}
                  />
                ))}
              </div>
            </div>
            <p className="text-muted mb-3">
              {camera.description || 'Professional-quality camera with high-resolution sensor.'}
            </p>
            <p className="text-muted mb-4">
              {camera.about || `${camera.name} is designed for both professional photographers and enthusiasts, offering cutting-edge features to capture stunning images and videos. this camera excels in various shooting conditions, from low-light environments to fast-paced action scenes. `}
            </p>
            <ListGroup variant="flush" className="mb-4">
              <ListGroup.Item>
                <FaCamera className="me-2" /> Resolution: {camera.resolution || '24 MP'}
              </ListGroup.Item>
              <ListGroup.Item>
                <MdMemory className="me-2" /> Sensor: {camera.sensor || 'Full-frame CMOS'}
              </ListGroup.Item>
              <ListGroup.Item>
                <MdOutlineSdCard className="me-2" /> Storage: {camera.storage || 'Dual SD card slots'}
              </ListGroup.Item>
            </ListGroup>
            <h4 className="mb-3">
              Price: ₹{camera.price?.toLocaleString() || 'N/A'}
              {camera.rentalPrice && ` / Rent: ₹${camera.rentalPrice.toLocaleString()}/day`}
            </h4>
            <div className="d-flex gap-3 mb-4">
              <Button
                variant="primary"
                onClick={() => handleAddToCart('buy')}
                aria-label={`Buy ${camera.name}`}
              >
                <FaShoppingCart className="me-2" /> Buy Now
              </Button>
              {camera.rentalPrice && (
                <Button
                  variant="outline-success"
                  onClick={() => handleAddToCart('rent')}
                  aria-label={`Rent ${camera.name}`}
                >
                  <FaShoppingCart className="me-2" /> Rent @ ₹{camera.rentalPrice.toLocaleString()}/day
                </Button>
              )}
              <Button
                variant="outline-danger"
                onClick={handleAddToWishlist}
                aria-label={`Add ${camera.name} to wishlist`}
              >
                <FaHeart className="me-2" /> Add to Wishlist
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
}

export default CameraDetails;