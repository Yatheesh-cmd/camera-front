
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

// import React, { useState, useEffect, useContext } from 'react';
// import { Container, Row, Col, Card, Button, Badge, ListGroup, Tab, Tabs, Accordion } from 'react-bootstrap';
// import { useParams, useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import { getCameraByIdApi } from '../services/api';
// import { cartContext } from '../context/ContextApi';
// import Navbar from '../components/Navbar';
// import Footer from '../components/Footer';
// import { 
//   FaShoppingCart, 
//   FaStar, 
//   FaCamera, 
//   FaBolt,
//   FaWeight,
//   FaRulerVertical,
//   FaMemory,
//   FaFilm,
//   FaShieldAlt,
//   FaBoxOpen,
//   FaCalendarAlt,
//   FaTruck,
//   FaBatteryFull,
//   FaMicrophone,
//   FaWifi,
//   FaBluetooth,
//   FaExpand,
//   FaCompress,
//   FaSun,
//   FaSnowflake,
//   FaTint,
//   FaUserShield,
//   FaCreditCard,
//   FaHeadphones,
//   FaQuestionCircle,
//   FaCameraRetro,
//   FaVideo,
//   FaImage,
//   FaLaptop,
//   FaMobile
// } from 'react-icons/fa';

// function CameraDetails() {
//   const { id } = useParams();
//   const [camera, setCamera] = useState(null);
//   const [activeTab, setActiveTab] = useState('details');
//   const { cart, setCart } = useContext(cartContext);
//   const navigate = useNavigate();
//   const [expandedImage, setExpandedImage] = useState(null);

//   useEffect(() => {
//     fetchCamera();
//   }, [id]);

//   const fetchCamera = async () => {
//     try {
//       const response = await getCameraByIdApi(id);
//       if (response.status === 200) {
//         setCamera(response.data);
//       }
//     } catch (error) {
//       toast.error('Failed to fetch camera details: ' + error.message);
//       navigate('/browse');
//     }
//   };

//   const handleAddToCart = (type) => {
//     if (!camera) return;
//     const existingItem = cart.find(item => item._id === camera._id && item.type === type);
//     if (existingItem) {
//       setCart(cart.map(item =>
//         item._id === camera._id && item.type === type ? { ...item, rentalDays: (item.rentalDays || camera.rentalDays || 1) + 1 } : item
//       ));
//     } else {
//       setCart([...cart, { ...camera, type, rentalDays: type === 'rent' ? (camera.rentalDays || 1) : null }]);
//     }
//     toast.success(`${camera.name} added to cart for ${type}`);
//   };

//   // Common features that apply to all cameras
//   const commonAccessories = [
//     'Camera Body',
//     'Rechargeable Battery',
//     'Battery Charger',
//     'Neck Strap',
//     'Body Cap',
//     'USB Cable',
//     'Lens Cap',
//     'User Manual'
//   ];

//   const commonWhatsInBox = [
//     'Camera Body',
//     'Lens (if kit version)',
//     'Battery Pack',
//     'AC Adapter',
//     'USB Cable',
//     'Shoulder Strap',
//     'Eyecup',
//     'Documentation',
//     'Warranty Card'
//   ];

//   const commonTechSpecs = {
//     'Sensor Resolution': '24.2MP APS-C CMOS',
//     'Image Processor': 'DIGIC 8',
//     'ISO Range': '100-25600 (expandable to 51200)',
//     'Shutter Speed': '1/4000 to 30 sec',
//     'Continuous Shooting': 'Up to 7 fps',
//     'Autofocus Points': '45-point all cross-type',
//     'Video Resolution': '4K UHD at 30p',
//     'LCD Screen': '3.0" Vari-angle Touchscreen',
//     'Viewfinder': 'Optical (pentamirror)',
//     'Connectivity': 'Wi-Fi, NFC, Bluetooth',
//     'Battery Life': 'Approx. 600 shots',
//     'Weight': 'Approx. 500g (body only)',
//     'Dimensions': '126.5 x 93.5 x 63.5mm',
//     'Memory Card Type': 'SD/SDHC/SDXC (UHS-I compatible)',
//     'Microphone Input': '3.5mm stereo',
//     'HDMI Output': 'Micro HDMI (Type D)',
//     'Environmental Sealing': 'Dust and moisture resistant'
//   };

//   const commonUseCases = [
//     {
//       title: 'Professional Photography',
//       icon: <FaCameraRetro className="text-primary fs-3" />,
//       description: 'Ideal for portrait, landscape, and studio photography'
//     },
//     {
//       title: 'Videography',
//       icon: <FaVideo className="text-primary fs-3" />,
//       description: '4K video capabilities for professional filmmaking'
//     },
//     {
//       title: 'Travel Photography',
//       icon: <FaImage className="text-primary fs-3" />,
//       description: 'Compact and lightweight for on-the-go shooting'
//     },
//     {
//       title: 'Content Creation',
//       icon: <FaMobile className="text-primary fs-3" />,
//       description: 'Perfect for bloggers and social media influencers'
//     }
//   ];

//   if (!camera) {
//     return (
//       <div>
//         <Navbar />
//         <Container className="py-5 text-center">
//           <h3>Loading...</h3>
//         </Container>
//         <Footer />
//       </div>
//     );
//   }

//   return (
//     <div className="bg-light">
//       <Navbar />
//       <Container className="py-5">
//         <Row className="g-4">
//           <Col lg={6}>
//             <Card className="shadow-sm border-0">
//               <Card.Img
//                 variant="top"
//                 src={expandedImage || camera.image || 'https://via.placeholder.com/600'}
//                 className="rounded-3 cursor-pointer"
//                 style={{ 
//                   height: expandedImage ? 'auto' : '500px',
//                   objectFit: 'contain',
//                   backgroundColor: '#f8f9fa',
//                   maxHeight: '80vh'
//                 }}
//                 onClick={() => setExpandedImage(expandedImage ? null : camera.image)}
//               />
//               <div className="d-flex justify-content-between mt-2">
//                 <Button 
//                   variant="link" 
//                   size="sm"
//                   onClick={() => setExpandedImage(expandedImage ? null : camera.image)}
//                 >
//                   {expandedImage ? <FaCompress className="me-1" /> : <FaExpand className="me-1" />}
//                   {expandedImage ? 'Minimize' : 'Expand'}
//                 </Button>
//                 <small className="text-muted">Click image to {expandedImage ? 'minimize' : 'expand'}</small>
//               </div>
//               <div className="d-flex mt-3 flex-wrap" style={{ gap: '10px' }}>
//                 {[1, 2, 3, 4].map((i) => (
//                   <img
//                     key={i}
//                     src={camera.image || 'https://via.placeholder.com/150'}
//                     alt={`Thumbnail ${i}`}
//                     className="img-thumbnail cursor-pointer"
//                     style={{ width: '80px', height: '80px', objectFit: 'cover' }}
//                     onClick={() => setExpandedImage(camera.image)}
//                   />
//                 ))}
//               </div>
//             </Card>

//             {/* Common Camera Features Section */}
//             <Card className="mt-4 border-0 shadow-sm">
//               <Card.Body>
//                 <h5 className="mb-4">
//                   <FaCamera className="me-2 text-primary" />
//                   Key Features
//                 </h5>
//                 <Row>
//                   <Col xs={6} className="mb-3">
//                     <div className="d-flex align-items-center">
//                       <FaBatteryFull className="text-primary me-2" />
//                       <div>
//                         <div className="fw-bold">Battery Life</div>
//                         <small>Approx. 600 shots per charge</small>
//                       </div>
//                     </div>
//                   </Col>
//                   <Col xs={6} className="mb-3">
//                     <div className="d-flex align-items-center">
//                       <FaMicrophone className="text-primary me-2" />
//                       <div>
//                         <div className="fw-bold">Mic Input</div>
//                         <small>3.5mm external mic support</small>
//                       </div>
//                     </div>
//                   </Col>
//                   <Col xs={6} className="mb-3">
//                     <div className="d-flex align-items-center">
//                       <FaWifi className="text-primary me-2" />
//                       <div>
//                         <div className="fw-bold">Wireless</div>
//                         <small>Wi-Fi & Bluetooth</small>
//                       </div>
//                     </div>
//                   </Col>
//                   <Col xs={6} className="mb-3">
//                     <div className="d-flex align-items-center">
//                       <FaTint className="text-primary me-2" />
//                       <div>
//                         <div className="fw-bold">Weather Sealing</div>
//                         <small>Dust & moisture resistant</small>
//                       </div>
//                     </div>
//                   </Col>
//                 </Row>
//               </Card.Body>
//             </Card>

//             {/* Common Use Cases */}
//             <Card className="mt-4 border-0 shadow-sm">
//               <Card.Body>
//                 <h5 className="mb-4">
//                   <FaCameraRetro className="me-2 text-primary" />
//                   Ideal For
//                 </h5>
//                 <Row>
//                   {commonUseCases.map((useCase, index) => (
//                     <Col md={6} key={index} className="mb-3">
//                       <div className="d-flex align-items-start">
//                         <div className="me-3">
//                           {useCase.icon}
//                         </div>
//                         <div>
//                           <h6 className="mb-1">{useCase.title}</h6>
//                           <small className="text-muted">{useCase.description}</small>
//                         </div>
//                       </div>
//                     </Col>
//                   ))}
//                 </Row>
//               </Card.Body>
//             </Card>
//           </Col>
          
//           <Col lg={6}>
//             <div className="d-flex justify-content-between align-items-start mb-3">
//               <div>
//                 <h1 className="mb-1">{camera.name}</h1>
//                 <div className="d-flex align-items-center mb-3">
//                   <Badge bg="secondary" className="me-2">{camera.category || 'Mirrorless'}</Badge>
//                   <div className="text-warning">
//                     <FaStar className="me-1" />
//                     <span>4.8 (24 reviews)</span>
//                   </div>
//                 </div>
//               </div>
//               <div className="text-end">
//                 <h4 className="text-danger text-decoration-line-through mb-0">₹{Math.round(camera.price * 1.2)}</h4>
//                 <h2 className="text-primary mb-0">₹{camera.price}</h2>
//                 <small className="text-success">20% OFF</small>
//               </div>
//             </div>

//             <div className="mb-4">
//               <h5 className="mb-3">Quick Specifications</h5>
//               <Row>
//                 <Col xs={6} className="mb-3">
//                   <div className="d-flex align-items-center">
//                     <FaCamera className="text-primary me-2" />
//                     <div>
//                       <div className="fw-bold">Sensor</div>
//                       <small>{camera.sensorType || '24MP APS-C'}</small>
//                     </div>
//                   </div>
//                 </Col>
//                 <Col xs={6} className="mb-3">
//                   <div className="d-flex align-items-center">
//                     <FaBolt className="text-primary me-2" />
//                     <div>
//                       <div className="fw-bold">ISO</div>
//                       <small>{camera.isoRange || '100-25600'}</small>
//                     </div>
//                   </div>
//                 </Col>
//                 <Col xs={6} className="mb-3">
//                   <div className="d-flex align-items-center">
//                     <FaWeight className="text-primary me-2" />
//                     <div>
//                       <div className="fw-bold">Weight</div>
//                       <small>{camera.weight || 'Approx. 500g'}</small>
//                     </div>
//                   </div>
//                 </Col>
//                 <Col xs={6} className="mb-3">
//                   <div className="d-flex align-items-center">
//                     <FaRulerVertical className="text-primary me-2" />
//                     <div>
//                       <div className="fw-bold">Dimensions</div>
//                       <small>{camera.dimensions || '126.5 x 93.5 x 63.5mm'}</small>
//                     </div>
//                   </div>
//                 </Col>
//               </Row>
//             </div>

//             <div className="d-flex gap-3 mb-4">
//               <Button 
//                 variant="primary" 
//                 size="lg"
//                 className="flex-grow-1"
//                 onClick={() => handleAddToCart('buy')}
//               >
//                 <FaShoppingCart className="me-2" /> Buy Now
//               </Button>
//               <Button 
//                 variant="outline-success" 
//                 size="lg"
//                 className="flex-grow-1"
//                 onClick={() => handleAddToCart('rent')}
//               >
//                 <FaShoppingCart className="me-2" /> Rent @ ₹{camera.rentalPrice}/day
//               </Button>
//             </div>

//             <Card className="mb-4 border-0 shadow-sm">
//               <Card.Body className="p-3">
//                 <div className="d-flex justify-content-around text-center">
//                   <div>
//                     <FaTruck className="text-success fs-4 mb-2" />
//                     <div>Free Shipping</div>
//                     <small className="text-muted">2-3 business days</small>
//                   </div>
//                   <div>
//                     <FaBoxOpen className="text-success fs-4 mb-2" />
//                     <div>7-Day Returns</div>
//                     <small className="text-muted">No questions asked</small>
//                   </div>
//                   <div>
//                     <FaShieldAlt className="text-success fs-4 mb-2" />
//                     <div>1 Year Warranty</div>
//                     <small className="text-muted">Manufacturer</small>
//                   </div>
//                 </div>
//               </Card.Body>
//             </Card>

//             <Tabs
//               activeKey={activeTab}
//               onSelect={(k) => setActiveTab(k)}
//               className="mb-3"
//             >
//               <Tab eventKey="details" title="Product Details">
//                 <div className="p-3">
//                   <h5 className="mb-3">About this camera</h5>
//                   <p className="mb-4">{camera.description || 'This advanced camera delivers professional-quality images with its high-resolution sensor and powerful image processor. Designed for both enthusiasts and professionals, it offers intuitive controls and robust construction for reliable performance in various shooting conditions.'}</p>
                  
//                   <h5 className="mb-3">Technical Specifications</h5>
//                   <ListGroup variant="flush">
//                     {Object.entries(commonTechSpecs).map(([key, value]) => (
//                       <ListGroup.Item key={key} className="d-flex justify-content-between align-items-center py-3">
//                         <span className="text-muted">{key}</span>
//                         <span className="fw-bold">{value}</span>
//                       </ListGroup.Item>
//                     ))}
//                   </ListGroup>
//                 </div>
//               </Tab>
//               <Tab eventKey="accessories" title="Accessories">
//                 <div className="p-3">
//                   <h5 className="mb-3">Compatible Accessories</h5>
//                   <Row>
//                     {commonAccessories.map((item, index) => (
//                       <Col md={6} key={index}>
//                         <div className="d-flex align-items-center mb-3">
//                           <div className="bg-light rounded-circle p-2 me-3">
//                             <FaBoxOpen className="text-primary" />
//                           </div>
//                           <span>{item}</span>
//                         </div>
//                       </Col>
//                     ))}
//                   </Row>
                  
//                   <h5 className="mt-4 mb-3">What's in the Box</h5>
//                   <ListGroup variant="flush">
//                     {commonWhatsInBox.map((item, index) => (
//                       <ListGroup.Item key={index} className="d-flex align-items-center py-2">
//                         <FaBoxOpen className="text-muted me-3" />
//                         {item}
//                       </ListGroup.Item>
//                     ))}
//                   </ListGroup>
//                 </div>
//               </Tab>
//               <Tab eventKey="rental" title="Rental Info">
//                 <div className="p-3">
//                   <h5 className="mb-3">Rental Terms</h5>
//                   <ListGroup variant="flush">
//                     <ListGroup.Item className="d-flex align-items-center py-3">
//                       <FaCalendarAlt className="text-primary me-3 fs-5" />
//                       <div>
//                         <strong>Minimum Rental Period:</strong> 3 days
//                         <div className="text-muted small">Maximum rental period: 30 days</div>
//                       </div>
//                     </ListGroup.Item>
//                     <ListGroup.Item className="d-flex align-items-center py-3">
//                       <FaBoxOpen className="text-primary me-3 fs-5" />
//                       <div>
//                         <strong>Package Includes:</strong> Camera body, battery, charger, strap
//                         <div className="text-muted small">Optional lenses available for additional cost</div>
//                       </div>
//                     </ListGroup.Item>
//                     <ListGroup.Item className="d-flex align-items-center py-3">
//                       <FaShieldAlt className="text-primary me-3 fs-5" />
//                       <div>
//                         <strong>Insurance:</strong> Optional damage waiver available
//                         <div className="text-muted small">₹200/day for full coverage</div>
//                       </div>
//                     </ListGroup.Item>
//                     <ListGroup.Item className="d-flex align-items-center py-3">
//                       <FaTruck className="text-primary me-3 fs-5" />
//                       <div>
//                         <strong>Delivery Options:</strong> Free pickup/drop at our store
//                         <div className="text-muted small">Home delivery available for ₹200</div>
//                       </div>
//                     </ListGroup.Item>
//                   </ListGroup>
//                 </div>
//               </Tab>
//               <Tab eventKey="support" title="Support">
//                 <div className="p-3">
//                   <h5 className="mb-3">Customer Support</h5>
//                   <ListGroup variant="flush">
//                     <ListGroup.Item className="d-flex align-items-center py-3">
//                       <FaUserShield className="text-primary me-3 fs-5" />
//                       <div>
//                         <strong>Warranty:</strong> 1 year manufacturer warranty
//                         <div className="text-muted small">Extended warranty options available</div>
//                       </div>
//                     </ListGroup.Item>
//                     <ListGroup.Item className="d-flex align-items-center py-3">
//                       <FaHeadphones className="text-primary me-3 fs-5" />
//                       <div>
//                         <strong>Customer Service:</strong> 24/7 support available
//                         <div className="text-muted small">Call: 1800-123-4567</div>
//                       </div>
//                     </ListGroup.Item>
//                     <ListGroup.Item className="d-flex align-items-center py-3">
//                       <FaQuestionCircle className="text-primary me-3 fs-5" />
//                       <div>
//                         <strong>FAQs & Guides:</strong> Comprehensive online resources
//                         <div className="text-muted small">Download user manuals and tutorials</div>
//                       </div>
//                     </ListGroup.Item>
//                   </ListGroup>
//                 </div>
//               </Tab>
//             </Tabs>

//             {/* Frequently Asked Questions */}
//             <Card className="mt-4 border-0 shadow-sm">
//               <Card.Body>
//                 <h5 className="mb-4">
//                   <FaQuestionCircle className="me-2 text-primary" />
//                   Frequently Asked Questions
//                 </h5>
//                 <Accordion defaultActiveKey="0">
//                   <Accordion.Item eventKey="0">
//                     <Accordion.Header>Is this camera good for beginners?</Accordion.Header>
//                     <Accordion.Body>
//                       Yes, this camera is suitable for both beginners and advanced users. It features automatic modes for easy shooting and manual controls for when you're ready to explore more creative options.
//                     </Accordion.Body>
//                   </Accordion.Item>
//                   <Accordion.Item eventKey="1">
//                     <Accordion.Header>Does it support external flash?</Accordion.Header>
//                     <Accordion.Body>
//                       Yes, this camera has a standard hot shoe mount that supports most external flash units from major manufacturers.
//                     </Accordion.Body>
//                   </Accordion.Item>
//                   <Accordion.Item eventKey="2">
//                     <Accordion.Header>What memory cards are compatible?</Accordion.Header>
//                     <Accordion.Body>
//                       The camera supports SD, SDHC, and SDXC memory cards (UHS-I compatible). We recommend using cards with at least Class 10 speed rating for best performance.
//                     </Accordion.Body>
//                   </Accordion.Item>
//                 </Accordion>
//               </Card.Body>
//             </Card>
//           </Col>
//         </Row>
//       </Container>
//       <Footer />
//     </div>
//   );
// }

// export default CameraDetails;