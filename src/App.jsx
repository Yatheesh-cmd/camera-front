import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import './bootstrap.min.css';

import './App.css';
import ContextApi from './context/ContextApi';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Browse from './pages/Browse';
import Buy from './pages/Buy';
import Rent from './pages/Rent';
import CameraDetails from './pages/CameraDetails';
import CartPage from './pages/CartPage';
import WishlistPage from './pages/WishlistPage';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import MyOrders from './pages/MyOrders';
import About from './pages/About';
import Contact from './pages/Contact';
import UserReviews from './pages/UserReviews';
import PrivateRoute from './PrivateRoute'; // Import the PrivateRoute component

function App() {
  return (
    <ContextApi>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* Protected Routes */}
          <Route path="/browse" element={<PrivateRoute element={<Browse />} />} />
          <Route path="/buy" element={<PrivateRoute element={<Buy />} />} />
          <Route path="/rent" element={<PrivateRoute element={<Rent />} />} />
          <Route path="/camera/:id" element={<CameraDetails />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/profile" element={<UserDashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/myorders" element={<MyOrders />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/ure" element={<UserReviews />} />
        </Routes>
        <ToastContainer position="top-center" autoClose={1000} />
      </BrowserRouter>
    </ContextApi>
  );
}

export default App;