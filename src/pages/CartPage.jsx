import React from 'react';
import { Container } from 'react-bootstrap';
import Cart from '../components/Cart';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function CartPage() {
  return (
    <div>
      <Navbar />
      <Container className="py-5">
        <Cart />
      </Container>
      <Footer />
    </div>
  );
}

export default CartPage;