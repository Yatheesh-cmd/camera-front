import React, { useState, useEffect, useContext } from 'react';
import { Button, Modal, Row, Col, Spinner } from 'react-bootstrap';
import { updateCameraApi } from '../services/api';
import { toast } from 'react-toastify';
import { cameraResponseContext } from '../context/ContextApi';

function EditCamera({ camera }) {
  const [show, setShow] = useState(false);
  const [cameraData, setCameraData] = useState({ name: "", description: "", category: "", price: "", rentalPrice: "", image: "", rentalDays: "" });
  const [loading, setLoading] = useState(false);
  const { setCameraResponse } = useContext(cameraResponseContext);

  useEffect(() => {
    setCameraData(camera);
  }, [camera]);

  const handleEdit = async () => {
    const { name, description, category, price, rentalPrice, image, rentalDays } = cameraData;
    if (!name || !description || !category || !price || !rentalPrice || !image || !rentalDays) {
      toast.warning("Please fill in all fields");
      return;
    }
    if (isNaN(price) || Number(price) <= 0 || isNaN(rentalPrice) || Number(rentalPrice) <= 0 || isNaN(rentalDays) || Number(rentalDays) <= 0) {
      toast.warning("Prices and rental days must be positive numbers");
      return;
    }
    if (JSON.stringify(cameraData) === JSON.stringify(camera)) {
      toast.info("No changes detected");
      return;
    }
    if (window.confirm("Are you sure you want to update this camera?")) {
      setLoading(true);
      try {
        const result = await updateCameraApi(camera._id, cameraData);
        if (result.status === 200) {
          toast.success("Camera updated successfully");
          setCameraResponse(result);
          handleClose();
        } else {
          toast.error(result.data?.message || "Update failed");
        }
      } catch (error) {
        toast.error(error.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleClose = () => {
    setShow(false);
    setCameraData(camera);
  };

  return (
    <>
      <button className="btn" onClick={() => setShow(true)}>
        <i className="fa-solid fa-pen-to-square fa-lg text-warning"></i>
      </button>
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Camera</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Image URL"
                value={cameraData.image}
                onChange={(e) => setCameraData({ ...cameraData, image: e.target.value })}
              />
              <img
                src={cameraData.image || "https://via.placeholder.com/150"}
                alt="Camera preview"
                className="img-fluid my-3"
              />
            </Col>
            <Col>
              <input
                type="text"
                value={cameraData.name}
                onChange={(e) => setCameraData({ ...cameraData, name: e.target.value })}
                className="form-control mb-3"
                placeholder="Name"
              />
              <input
                type="text"
                value={cameraData.description}
                onChange={(e) => setCameraData({ ...cameraData, description: e.target.value })}
                className="form-control mb-3"
                placeholder="Description"
              />
              <input
                type="text"
                value={cameraData.category}
                onChange={(e) => setCameraData({ ...cameraData, category: e.target.value })}
                className="form-control mb-3"
                placeholder="Category"
              />
              <input
                type="number"
                value={cameraData.price}
                onChange={(e) => setCameraData({ ...cameraData, price: e.target.value })}
                className="form-control mb-3"
                placeholder="Price"
                min="0"
              />
              <input
                type="number"
                value={cameraData.rentalPrice}
                onChange={(e) => setCameraData({ ...cameraData, rentalPrice: e.target.value })}
                className="form-control mb-3"
                placeholder="Rental Price per Day"
                min="0"
              />
              <input
                type="number"
                value={cameraData.rentalDays}
                onChange={(e) => setCameraData({ ...cameraData, rentalDays: e.target.value })}
                className="form-control mb-3"
                placeholder="Default Rental Days"
                min="1"
              />
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose} disabled={loading}>
            Close
          </Button>
          <Button variant="info" onClick={handleEdit} disabled={loading}>
            {loading ? <Spinner animation="border" size="sm" /> : "Update"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditCamera;