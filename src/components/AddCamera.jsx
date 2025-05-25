import React, { useState, useContext } from 'react';
import { Modal, Button, Row, Col, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { addCameraApi } from '../services/api';
import { cameraResponseContext } from '../context/ContextApi';

function AddCamera() {
  const [show, setShow] = useState(false);
  const [camera, setCamera] = useState({ name: "", description: "", category: "", price: "", rentalPrice: "", image: "", rentalDays: "" });
  const [loading, setLoading] = useState(false);
  const { setCameraResponse } = useContext(cameraResponseContext);

  const handleSubmit = async () => {
    const { name, description, category, price, rentalPrice, image, rentalDays } = camera;
    if (!name || !description || !category || !price || !rentalPrice || !image || !rentalDays) {
      toast.warning("Please fill in all fields");
      return;
    }
    if (isNaN(price) || Number(price) <= 0 || isNaN(rentalPrice) || Number(rentalPrice) <= 0 || isNaN(rentalDays) || Number(rentalDays) <= 0) {
      toast.warning("Prices and rental days must be positive numbers");
      return;
    }
    setLoading(true);

    try {
      const result = await addCameraApi(camera);
      if (result.status === 200) {
        toast.success("Camera added successfully");
        setCameraResponse(result);
        handleClose();
      } else {
        toast.error(result.data?.message || "Failed to add camera");
      }
    } catch (error) {
      toast.error(error.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setShow(false);
    setCamera({ name: "", description: "", category: "", price: "", rentalPrice: "", image: "", rentalDays: "" });
  };

  return (
    <>
      <Button variant="outline-success" onClick={() => setShow(true)}>Add Camera</Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Camera</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Image URL"
                value={camera.image}
                onChange={(e) => setCamera({ ...camera, image: e.target.value })}
              />
              <img
                src={camera.image || "https://via.placeholder.com/150"}
                alt="Camera preview"
                className="img-fluid"
              />
            </Col>
            <Col>
              <input
                className="form-control mb-3"
                placeholder="Name"
                value={camera.name}
                onChange={(e) => setCamera({ ...camera, name: e.target.value })}
              />
              <input
                className="form-control mb-3"
                placeholder="Description"
                value={camera.description}
                onChange={(e) => setCamera({ ...camera, description: e.target.value })}
              />
              <input
                className="form-control mb-3"
                placeholder="Category"
                value={camera.category}
                onChange={(e) => setCamera({ ...camera, category: e.target.value })}
              />
              <input
                className="form-control mb-3"
                placeholder="Price"
                type="number"
                min="0"
                value={camera.price}
                onChange={(e) => setCamera({ ...camera, price: e.target.value })}
              />
              <input
                className="form-control mb-3"
                placeholder="Rental Price per Day"
                type="number"
                min="0"
                value={camera.rentalPrice}
                onChange={(e) => setCamera({ ...camera, rentalPrice: e.target.value })}
              />
              <input
                className="form-control mb-3"
                placeholder="Default Rental Days"
                type="number"
                min="1"
                value={camera.rentalDays}
                onChange={(e) => setCamera({ ...camera, rentalDays: e.target.value })}
              />
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose} disabled={loading}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit} disabled={loading}>
            {loading ? <Spinner animation="border" size="sm" /> : "Add Camera"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddCamera;