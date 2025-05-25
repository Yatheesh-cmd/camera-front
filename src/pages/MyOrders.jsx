import React, { useState, useEffect } from 'react';
import { Container, Table, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import { getUserOrdersApi } from '../services/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FaBox } from 'react-icons/fa';

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const newOrder = location.state?.order;
    if (newOrder) {
      setOrders(prevOrders => [newOrder, ...prevOrders]);
    } else {
      fetchOrders();
    }
  }, [location.state]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await getUserOrdersApi();
      if (response.status === 200) {
        setOrders(response.data || []);
      }
    } catch (error) {
      toast.error('Failed to fetch orders: ' + error.message);
      if (error.message === 'No token provided' || error.message === 'Invalid token') {
        sessionStorage.clear();
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <Container className="py-5">
        <h2 className="mb-4">
          <FaBox /> My Orders
        </h2>
        {loading ? (
          <div className="text-center my-5">
            <Spinner animation="border" />
          </div>
        ) : orders.length > 0 ? (
          <Table responsive striped bordered hover>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Items</th>
                <th>Total Amount</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>
                    {order.items.map(item => (
                      <div key={`${order._id}-${item.cameraId}`}>
                        {item.name} ({item.type === 'buy' ? 'Buy' : `Rent for ${item.rentalDays} days`})
                      </div>
                    ))}
                  </td>
                  <td>₹{order.totalAmount.toFixed(2)}</td>
                  <td>{order.status || 'Pending'}</td>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <p className="text-center mt-4">You have no orders yet.</p>
        )}
      </Container>
      <Footer />
    </div>
  );
}

export default MyOrders;