import React from 'react';
import { Container } from 'react-bootstrap';
import Wishlist from '../components/Wishlist';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function WishlistPage() {
  return (
    <div>
      <Navbar />
      <Container className="py-5">
        <Wishlist />
      </Container>
      <Footer />
    </div>
  );
}

export default WishlistPage;