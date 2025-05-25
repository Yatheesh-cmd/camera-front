import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, InputGroup } from 'react-bootstrap';
import { allCamerasApi } from '../services/api';
import { toast } from 'react-toastify';
import CameraCard from '../components/CameraCard';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FaSearch } from 'react-icons/fa';

function Rent() {
  const [cameras, setCameras] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchCameras();
  }, [search]);

  const fetchCameras = async () => {
    try {
      const result = await allCamerasApi(search);
      if (result.status === 200) {
        setCameras(result.data);
      }
    } catch (error) {
      toast.error('Failed to fetch cameras: ' + error.message);
    }
  };

  return (
    <div>
      <Navbar />
      <Container className="py-5">
        <Row className="mb-5">
          <Col md={12} className="text-center">
            <h2 className="mb-4 fw-bold">Rent Cameras</h2>
            <Form.Group className="d-flex justify-content-center">
              <InputGroup style={{ maxWidth: '500px' }}>
                <InputGroup.Text>
                  <FaSearch />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Search by category"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  style={{ borderRadius: '8px' }}
                />
              </InputGroup>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          {cameras.length > 0 ? (
            cameras.map(camera => (
              <Col xs={12} sm={6} md={4} lg={3} key={camera._id} className="mb-4">
                <CameraCard camera={camera} onRent />
              </Col>
            ))
          ) : (
            <Col>
              <p className="text-muted text-center">No cameras found</p>
            </Col>
          )}
        </Row>
      </Container>
      <Footer />
    </div>
  );
}

export default Rent;