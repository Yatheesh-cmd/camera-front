import React, { useContext } from 'react';
import { Card, Button } from 'react-bootstrap';
import { FaCamera, FaHeart, FaEye, FaMoneyBillWave, FaArrowRight } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { cartContext, wishlistContext } from '../context/ContextApi';

function CameraCard({ camera, onBuy, onRent }) {
  const { cart, setCart } = useContext(cartContext);
  const { wishlist, setWishlist } = useContext(wishlistContext);
  const navigate = useNavigate();

  const handleAddToCart = (type) => {
    const existingItem = cart.find(item => item._id === camera._id && item.type === type);
    if (existingItem) {
      setCart(cart.map(item =>
        item._id === camera._id && item.type === type
          ? { ...item, rentalDays: (item.rentalDays || camera.rentalDays || 1) + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...camera, type, rentalDays: type === 'rent' ? (camera.rentalDays || 1) : null }]);
    }
    toast.success(`${camera.name} added to cart for ${type}`);
  };

  const handleAddToWishlist = (e) => {
    e.stopPropagation();
    if (!wishlist.find(item => item._id === camera._id)) {
      setWishlist([...wishlist, camera]);
      toast.success(`${camera.name} added to wishlist`);
    } else {
      toast.info(`${camera.name} is already in your wishlist`);
    }
  };

  const handleViewDetails = () => {
    navigate(`/camera/${camera._id}`);
  };

  return (
    <Card 
      className="card-shadow position-relative" 
      style={{ 
        borderRadius: '12px', 
        overflow: 'hidden',
        transition: 'transform 0.3s ease',
        cursor: 'pointer'
      }}
      onClick={handleViewDetails}
    >
      <div className="position-relative">
        <Card.Img
          variant="top"
          src={camera.image || 'https://via.placeholder.com/150'}
          style={{ height: '200px', objectFit: 'cover' }}
        />
        <div className="image-overlay position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center">
          <Button
            variant="outline-light"
            className="view-button rounded-pill px-4 py-2"
            style={{
              opacity: 0,
              transition: 'opacity 0.3s ease',
              backdropFilter: 'blur(2px)'
            }}
            onClick={(e) => {
              e.stopPropagation();
              handleViewDetails();
            }}
          >
            <FaEye className="me-2" /> Quick View
          </Button>
        </div>
      </div>
      <Card.Body>
        <Card.Title className="text-truncate">{camera.name || 'N/A'}</Card.Title>
        <Card.Text className="text-truncate">{camera.description || 'No description'}</Card.Text>
        
        {/* View details link with arrow icon */}
        <div 
          className="d-flex align-items-center mb-2 text-primary" 
          style={{ cursor: 'pointer' }}
          onClick={(e) => {
            e.stopPropagation();
            handleViewDetails();
          }}
        >
          <span className="small">View details</span>
          <FaArrowRight className="ms-2" size={12} />
        </div>

        <div className="d-flex justify-content-between mb-2">
          <span><strong>Price:</strong> ₹{camera.price || 0}</span>
          <span><strong>Rent/Day:</strong> ₹{camera.rentalPrice || 0}</span>
        </div>
        <div className="d-flex gap-2">
          {onBuy && (
            <Button 
              variant="outline-info" 
              className="flex-grow-1" 
              onClick={(e) => {
                e.stopPropagation();
                handleAddToCart('buy');
              }}
            >
              <FaCamera className="me-2" /> Buy
            </Button>
          )}
          {onRent && (
            <Button 
              variant="outline-warning" 
              className="flex-grow-1"
              onClick={(e) => {
                e.stopPropagation();
                handleAddToCart('rent');
              }}
            >
              <FaMoneyBillWave className="me-2" /> Rent
            </Button>
          )}
          <Button 
            variant="outline-danger" 
            onClick={(e) => {
              e.stopPropagation();
              handleAddToWishlist(e);
            }}
          >
            <FaHeart />
          </Button>
        </div>
      </Card.Body>
      
      {/* Add this CSS for the hover effect */}
      <style jsx>{`
        .card-shadow:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.1);
        }
        .image-overlay {
          background-color: rgba(0,0,0,0.3);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .image-overlay:hover {
          opacity: 1;
        }
        .image-overlay:hover .view-button {
          opacity: 1;
        }
      `}</style>
    </Card>
  );
}

export default CameraCard;