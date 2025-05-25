import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Table, Button, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { allCamerasApi, deleteCameraApi, allOrdersApi, allReviewsApi } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { cameraResponseContext } from '../context/ContextApi';
import AddCamera from '../components/AddCamera';
import EditCamera from '../components/EditCamera';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FaTrash, FaBox, FaStar } from 'react-icons/fa';

function AdminDashboard() {
  const [cameras, setCameras] = useState([]);
  const [orders, setOrders] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const { cameraResponse } = useContext(cameraResponseContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await Promise.all([fetchCameras(), fetchOrders(), fetchReviews()]);
      } catch (error) {
        toast.error('Failed to load dashboard data: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [cameraResponse]);

  const fetchCameras = async () => {
    try {
      const response = await allCamerasApi();
      setCameras(response.data || []);
    } catch (error) {
      toast.error('Failed to fetch cameras: ' + error.message);
      if (error.message === 'No token provided' || error.message === 'Invalid token') {
        sessionStorage.clear();
        navigate('/login');
      }
      throw error;
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await allOrdersApi();
      setOrders(response.data || []);
    } catch (error) {
      toast.error('Failed to fetch orders: ' + error.message);
      throw error;
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await allReviewsApi();
      setReviews(response.data || []);
    } catch (error) {
      toast.error('Failed to fetch reviews: ' + error.message);
      throw error;
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this camera?')) {
      setLoading(true);
      try {
        const response = await deleteCameraApi(id);
        if (response.status === 200) {
          toast.success('Camera deleted successfully');
          setCameras(cameras.filter(camera => camera._id !== id));
        }
      } catch (error) {
        toast.error('Failed to delete camera: ' + error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div>
      <Navbar />
      <Container className="py-5">
        <h2 className="mb-4">Admin Dashboard</h2>
        <Row>
          <Col>
            <h4 className="mb-3">Manage Cameras</h4>
            <AddCamera />
            {loading ? (
              <div className="text-center my-5">
                <Spinner animation="border" />
              </div>
            ) : cameras.length > 0 ? (
              <Table responsive striped bordered hover className="mt-3">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Rental Price/Day</th>
                    <th>Default Rental Days</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {cameras.map(camera => (
                    <tr key={camera._id}>
                      <td>{camera.name}</td>
                      <td>{camera.category}</td>
                      <td>₹{camera.price}</td>
                      <td>₹{camera.rentalPrice}</td>
                      <td>{camera.rentalDays || 'N/A'}</td>
                      <td>
                        <EditCamera camera={camera} />
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDelete(camera._id)}
                          className="ms-2"
                          disabled={loading}
                        >
                          <FaTrash />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <p className="text-center mt-4">No cameras available</p>
            )}
          </Col>
        </Row>

        <Row className="mt-5">
          <Col>
            <h4 className="mb-3">
              <FaBox /> Manage Orders
            </h4>
            {loading ? (
              <div className="text-center my-5">
                <Spinner animation="border" />
              </div>
            ) : orders.length > 0 ? (
              <Table responsive striped bordered hover>
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>User</th>
                    <th>Phone</th>
                    <th>Total Amount</th>
                    <th>Status</th>
                    <th>Items</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => (
                    <tr key={order._id}>
                      <td>{order._id}</td>
                      <td>{order.userId?.username || 'N/A'}</td>
                      <td>{order.userId?.phone || 'N/A'}</td>
                      <td>₹{order.totalAmount.toFixed(2)}</td>
                      <td>{order.status || 'Pending'}</td>
                      <td>
                        {order.items.map(item => (
                          <div key={`${order._id}-${item.cameraId}`}>
                            {item.name} ({item.type === 'buy' ? 'Buy' : `Rent for ${item.rentalDays} days`})
                          </div>
                        ))}
                      </td>
                      <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <p className="text-center mt-4">No orders available</p>
            )}
          </Col>
        </Row>

        <Row className="mt-5">
          <Col>
            <h4 className="mb-3">
              <FaStar /> Manage Reviews
            </h4>
            {loading ? (
              <div className="text-center my-5">
                <Spinner animation="border" />
              </div>
            ) : reviews.length > 0 ? (
              <Table responsive striped bordered hover>
                <thead>
                  <tr>
                    <th>Rental ID</th>
                    <th>User</th>
                    <th>Rating</th>
                    <th>Comment</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {reviews.map(review => (
                    <tr key={review._id}>
                      <td>{review.rentalId}</td>
                      <td>{review.userId?.username || 'N/A'}</td>
                      <td>{review.rating} / 5</td>
                      <td>{review.comment || 'No comment'}</td>
                      <td>{new Date(review.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <p className="text-center mt-4">No reviews available</p>
            )}
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
}

export default AdminDashboard;