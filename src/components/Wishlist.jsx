import React, { useContext } from 'react';
import { Button, Table } from 'react-bootstrap';
import { FaHeart } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { wishlistContext, cartContext } from '../context/ContextApi';

function Wishlist() {
  const { wishlist, setWishlist } = useContext(wishlistContext);
  const { setCart } = useContext(cartContext);

  const handleRemove = (id) => {
    const updatedWishlist = wishlist.filter(item => item._id !== id);
    setWishlist(updatedWishlist);
    toast.info('Item removed from wishlist');
  };

  const handleAddToCart = (camera, type) => {
    setCart(prevCart => [...prevCart, { ...camera, type, rentalDays: type === 'rent' ? 1 : null }]);
    toast.success(`${camera.name} added to cart for ${type}`);
  };

  return (
    <div className="p-4 bg-white shadow-sm rounded">
      <h4>
        <FaHeart /> Your Wishlist ({wishlist.length})
      </h4>
      {wishlist.length === 0 ? (
        <p className="text-muted text-center my-4">Your wishlist is empty</p>
      ) : (
        <Table responsive striped bordered hover className="align-middle">
          <thead>
            <tr>
              <th>Camera</th>
              <th>Price</th>
              <th>Rental Price/Day</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {wishlist.map(item => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>₹{Number(item.price).toFixed(2)}</td>
                <td>₹{Number(item.rentalPrice).toFixed(2)}</td>
                <td>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleAddToCart(item, 'buy')}
                    className="me-2"
                  >
                    Buy
                  </Button>
                  <Button
                    variant="success"
                    size="sm"
                    onClick={() => handleAddToCart(item, 'rent')}
                    className="me-2"
                  >
                    Rent
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleRemove(item._id)}
                  >
                    Remove
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default Wishlist;