import React, { useState, useContext } from 'react';
import { Button, Spinner, Table } from 'react-bootstrap';
import { cartContext } from '../context/ContextApi';
import { toast } from 'react-toastify';
import { initiatePaymentApi, verifyPaymentApi } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { useRazorpay } from 'react-razorpay';
import { FaShoppingCart } from 'react-icons/fa';

function Cart() {
  const { cart, setCart } = useContext(cartContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { Razorpay } = useRazorpay();

  const handleRentalDaysChange = (id, type, delta) => {
    const updatedCart = cart.map(item =>
      item._id === id && item.type === type ? { ...item, rentalDays: Math.max(1, (item.rentalDays || 1) + delta) } : item
    );
    setCart(updatedCart);
  };

  const handleRemove = (id, type) => {
    const updatedCart = cart.filter(item => !(item._id === id && item.type === type));
    setCart(updatedCart);
    toast.info('Item removed from cart');
  };

  const validateCart = () => {
    if (cart.length === 0) {
      toast.warning('Cart is empty');
      return false;
    }
    const invalidItems = cart.filter(item => {
      const hasPrice = item.type === 'buy' ? (item.price && !isNaN(Number(item.price)) && Number(item.price) > 0) : (item.rentalPrice && !isNaN(Number(item.rentalPrice)) && Number(item.rentalPrice) > 0);
      const hasRentalDays = item.type === 'rent' ? (item.rentalDays && !isNaN(Number(item.rentalDays)) && Number(item.rentalDays) > 0) : true;
      return !hasPrice || !hasRentalDays;
    });
    if (invalidItems.length > 0) {
      toast.warning('Cart contains items with invalid price or rental days');
      return false;
    }
    return true;
  };

  const handleCheckout = async () => {
    if (!validateCart()) return;
    setLoading(true);

    try {
      const paymentCart = cart.map(item => ({
        cameraId: item._id,
        name: item.name,
        price: item.type === 'buy' ? Number(item.price) : Number(item.rentalPrice),
        rentalDays: item.type === 'rent' ? Number(item.rentalDays || item.defaultRentalDays || 1) : null,
        type: item.type,
        total: item.type === 'buy' ? Number(item.price) : Number(item.rentalPrice) * Number(item.rentalDays || item.defaultRentalDays || 1),
      }));

      const response = await initiatePaymentApi({ items: paymentCart });
      if (response.status !== 200 || !response.data.orderId) {
        throw new Error(response.data?.message || 'Failed to initiate payment');
      }

      const { orderId, amount, currency, dbOrderId } = response.data;

      const options = {
        key: 'rzp_test_BQZeGK1Esi5rzS',
        amount,
        currency,
        order_id: orderId,
        name: 'CameraHive',
        description: 'Camera Purchase/Rental Payment',
        handler: async (response) => {
          try {
            const verifyResponse = await verifyPaymentApi({
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
              dbOrderId,
            });
            if (verifyResponse.status === 200 && verifyResponse.data.order) {
              toast.success('Payment successful!');
              setCart([]);
              navigate('/myorders', { state: { order: verifyResponse.data.order } });
            } else {
              throw new Error(verifyResponse.data?.message || 'Payment verification failed');
            }
          } catch (error) {
            toast.error(error.message || 'Payment verification failed');
          }
        },
        prefill: {
          name: sessionStorage.getItem('user') || 'User Name',
          email: sessionStorage.getItem('email') || 'user@example.com',
          contact: '9999999999',
        },
        theme: {
          color: '#764ba2',
        },
      };

      const rzp = new Razorpay(options);
      rzp.on('payment.failed', (response) => {
        toast.error(`Payment failed: ${response.error.description}`);
      });
      rzp.open();
    } catch (error) {
      toast.error(error.message || 'Payment initiation failed');
      if (error.message === 'No token provided' || error.message === 'Invalid token') {
        sessionStorage.clear();
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const total = cart.reduce((sum, item) => sum + (item.type === 'buy' ? Number(item.price) : Number(item.rentalPrice) * (item.rentalDays || item.defaultRentalDays || 1)), 0);

  return (
    <div className="p-4 bg-white shadow-sm rounded">
      <h4>
        <FaShoppingCart /> Your Cart ({cart.length})
      </h4>
      {cart.length === 0 ? (
        <p className="text-muted text-center my-4">Your cart is empty</p>
      ) : (
        <>
          <Table responsive striped bordered hover className="align-middle">
            <thead>
              <tr>
                <th>Image</th>
                <th>Camera</th>
                <th>Type</th>
                <th>Price</th>
                <th>Rental Days</th>
                <th>Total</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cart.map(item => (
                <tr key={`${item._id}-${item.type}`}>
                  <td>
                    <img
                      src={item.image || 'https://via.placeholder.com/50'}
                      alt={item.name}
                      style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        display: 'block',
                        margin: '0 auto',
                      }}
                    />
                  </td>
                  <td>{item.name}</td>
                  <td>{item.type === 'buy' ? 'Buy' : 'Rent'}</td>
                  <td>₹{(item.type === 'buy' ? Number(item.price) : Number(item.rentalPrice)).toFixed(2)}</td>
                  <td>
                    {item.type === 'rent' ? (
                      <>
                        <Button
                          variant="outline-primary"
                          size="sm"
                          onClick={() => handleRentalDaysChange(item._id, item.type, -1)}
                          style={{ borderRadius: '50%', width: '32px', height: '32px', padding: '0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        >
                          -
                        </Button>
                        <span className="mx-2">{item.rentalDays || item.defaultRentalDays || 1}</span>
                        <Button
                          variant="outline-primary"
                          size="sm"
                          onClick={() => handleRentalDaysChange(item._id, item.type, 1)}
                          style={{ borderRadius: '50%', width: '32px', height: '32px', padding: '0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        >
                          +
                        </Button>
                      </>
                    ) : 'N/A'}
                  </td>
                  <td>₹{(item.type === 'buy' ? Number(item.price) : Number(item.rentalPrice) * (item.rentalDays || item.defaultRentalDays || 1)).toFixed(2)}</td>
                  <td>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleRemove(item._id, item.type)}
                      style={{ borderRadius: '20px', padding: '0.25rem 0.75rem' }}
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div className="d-flex justify-content-between align-items-center mt-4">
            <h5>Total: ₹{total.toFixed(2)}</h5>
            <Button variant="success" onClick={handleCheckout} disabled={loading}>
              {loading ? <Spinner animation="border" size="sm" /> : 'Checkout'}
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;