import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { createReviewApi, getRentalReviewsApi } from '../services/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FaStar } from 'react-icons/fa';

function UserReviews() {
  const [review, setReview] = useState({ rentalId: '', rating: 1, comment: '' });
  const [reviews, setReviews] = useState([]);
  const [fetchRentalId, setFetchRentalId] = useState('');
  const [loading, setLoading] = useState(false);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await createReviewApi(review);
      if (result.status === 201) {
        toast.success('Review submitted successfully');
        setReview({ rentalId: '', rating: 1, comment: '' });
        if (fetchRentalId === review.rentalId) {
          fetchReviews(review.rentalId);
        }
      }
    } catch (error) {
      toast.error('Review submission failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async (rentalId) => {
    setLoading(true);
    try {
      const response = await getRentalReviewsApi(rentalId);
      setReviews(response.data || []);
    } catch (error) {
      toast.error(`Failed to fetch reviews: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleFetchReviews = (e) => {
    e.preventDefault();
    if (fetchRentalId) {
      fetchReviews(fetchRentalId);
    } else {
      toast.error('Please enter a rental ID');
    }
  };

  return (
    <div>
      <Navbar />
      <Container className="py-5">
        <h2 className="mb-4">
          <FaStar /> Manage Reviews
        </h2>
        <Row>
          <Col md={6}>
            <Card className="shadow-sm mb-4" style={{ borderRadius: '12px' }}>
              <Card.Body>
                <h4>Submit Review</h4>
                <Form onSubmit={handleReviewSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Rental ID</Form.Label>
                    <Form.Control
                      type="text"
                      value={review.rentalId}
                      onChange={(e) => setReview({ ...review, rentalId: e.target.value })}
                      placeholder="Enter rental ID"
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Rating</Form.Label>
                    <Form.Select
                      value={review.rating}
                      onChange={(e) => setReview({ ...review, rating: Number(e.target.value) })}
                    >
                      {[1, 2, 3, 4, 5].map(num => (
                        <option key={num} value={num}>{num} Star{num > 1 ? 's' : ''}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Comment</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={review.comment}
                      onChange={(e) => setReview({ ...review, comment: e.target.value })}
                      placeholder="Write your review"
                    />
                  </Form.Group>
                  <Button variant="primary" type="submit" disabled={loading}>
                    {loading ? <Spinner animation="border" size="sm" /> : 'Submit Review'}
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="shadow-sm" style={{ borderRadius: '12px' }}>
              <Card.Body>
                <h4>View Reviews for a Rental</h4>
                <Form onSubmit={handleFetchReviews} className="mb-3">
                  <Form.Group className="mb-3">
                    <Form.Label>Rental ID</Form.Label>
                    <Form.Control
                      type="text"
                      value={fetchRentalId}
                      onChange={(e) => setFetchRentalId(e.target.value)}
                      placeholder="Enter rental ID"
                    />
                  </Form.Group>
                  <Button variant="primary" type="submit" disabled={loading}>
                    {loading ? <Spinner animation="border" size="sm" /> : 'Fetch Reviews'}
                  </Button>
                </Form>
                {reviews.length > 0 ? (
                  reviews.map((rev, index) => (
                    <Card key={index} className="mb-3 p-3">
                      <div className="d-flex align-items-center mb-2">
                        <FaStar className="text-warning me-2" />
                        <span>{rev.rating} / 5</span>
                      </div>
                      <p className="mb-0">{rev.comment || 'No comment'}</p>
                      <small className="text-muted">
                        By {rev.userId?.username || 'Anonymous'} on{' '}
                        {new Date(rev.createdAt).toLocaleDateString()}
                      </small>
                    </Card>
                  ))
                ) : (
                  <p className="text-muted text-center">No reviews found</p>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
}

export default UserReviews;