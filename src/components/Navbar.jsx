import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaCamera, FaBars, FaTimes, FaShoppingCart, FaHeart } from "react-icons/fa";
import { authContext, cartContext, wishlistContext } from "../context/ContextApi";
import { toast } from "react-toastify";

function Navbar() {
  const { auth, setAuth, contextRole, setContextRole } = useContext(authContext);
  const { cart } = useContext(cartContext);
  const { wishlist } = useContext(wishlistContext);
  const cartCount = cart.length;
  const wishlistCount = wishlist.length;
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const handleLinkClick = () => setSidebarOpen(false);

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('role');
    setAuth(false);
    setContextRole(null);
    toast.info("Logged out successfully");
    navigate('/');
  };

  // Modern CSS styles
  const styles = {
    navbar: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      padding: '0.8rem 0',
      position: 'sticky',
      top: 0,
      zIndex: 1030
    },
    brand: {
      fontWeight: 700,
      fontSize: '1.5rem',
      color: '#ffffff',
      display: 'flex',
      alignItems: 'center',
      textDecoration: 'none',
      transition: 'all 0.3s ease'
    },
    loginButton: {
      background: 'linear-gradient(90deg, #38b2ac 0%, #4fd1c5 100%)',
      border: '2px solid transparent',
      borderRadius: '10px',
      padding: '0.5rem 1.2rem',
      color: '#ffffff',
      fontWeight: 500,
      fontSize: '0.9rem',
      transition: 'all 0.3s ease',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      textDecoration: 'none',
      // Hover: Glow effect, slight rotation, brighter gradient, border animation
      transform: 'none',
      '&:hover': {
        background: 'linear-gradient(90deg, #4fd1c5 0%, #81e6d9 100%)',
        boxShadow: '0 4px 16px rgba(56, 178, 172, 0.4)',
        transform: 'scale(1.05) rotate(1deg)',
        border: '2px solid rgba(255, 255, 255, 0.3)'
      },
      // Active: Pressed effect
      '&:active': {
        transform: 'scale(0.98)',
        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
        border: '2px solid transparent'
      }
    },
    signupButton: {
      background: 'linear-gradient(90deg, #ed64a6 0%, #f687b3 100%)',
      border: '2px solid transparent',
      borderRadius: '10px',
      padding: '0.5rem 1.2rem',
      color: '#ffffff',
      fontWeight: 500,
      fontSize: '0.9rem',
      transition: 'all 0.3s ease',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      textDecoration: 'none',
      // Hover: Glow effect, slight rotation, brighter gradient, border animation
      transform: 'none',
      '&:hover': {
        background: 'linear-gradient(90deg, #f687b3 0%, #f9a8d4 100%)',
        boxShadow: '0 4px 16px rgba(237, 100, 166, 0.4)',
        transform: 'scale(1.05) rotate(-1deg)',
        border: '2px solid rgba(255, 255, 255, 0.3)'
      },
      // Active: Pressed effect
      '&:active': {
        transform: 'scale(0.98)',
        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
        border: '2px solid transparent'
      }
    },
    navButton: {
      background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
      border: '2px solid transparent',
      borderRadius: '10px',
      padding: '0.5rem 1.2rem',
      color: '#ffffff',
      fontWeight: 500,
      fontSize: '0.9rem',
      transition: 'all 0.3s ease',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      // Hover: Glow effect, slight rotation, brighter gradient, border animation
      transform: 'none',
      '&:hover': {
        background: 'linear-gradient(90deg, #764ba2 0%, #9f7aea 100%)',
        boxShadow: '0 4px 16px rgba(102, 126, 234, 0.4)',
        transform: 'scale(1.05) rotate(1deg)',
        border: '2px solid rgba(255, 255, 255, 0.3)'
      },
      // Active: Pressed effect
      '&:active': {
        transform: 'scale(0.98)',
        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
        border: '2px solid transparent'
      }
    },
    navLink: {
      color: '#ffffff',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      position: 'relative',
      textDecoration: 'none',
      fontWeight: 500,
      transition: 'all 0.2s ease',
      '&:hover': {
        color: 'rgba(255, 255, 255, 0.8)'
      }
    },
    badge: {
      fontSize: '0.7rem',
      padding: '0.2rem 0.4rem',
      minWidth: '1.2rem'
    },
    sidebar: {
      backgroundColor: '#ffffff',
      boxShadow: '4px 0 15px rgba(0, 0, 0, 0.1)',
      transform: sidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
      transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
    },
    menuLink: {
      display: 'block',
      padding: '0.6rem 1rem',
      borderRadius: '6px',
      color: '#4a5568',
      textDecoration: 'none',
      transition: 'all 0.2s ease',
      fontWeight: 500,
      '&:hover': {
        backgroundColor: '#f7fafc',
        color: '#667eea',
        transform: 'translateX(5px)'
      }
    },
    dropdownMenu: {
      border: 'none',
      borderRadius: '10px',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
      padding: '0.5rem',
      marginTop: '0.5rem'
    },
    dropdownItem: {
      borderRadius: '6px',
      padding: '0.5rem 1rem',
      transition: 'all 0.2s ease',
      '&:hover': {
        backgroundColor: '#f7fafc'
      }
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      backdropFilter: 'blur(5px)',
      WebkitBackdropFilter: 'blur(5px)'
    }
  };

  return (
    <>
      <nav style={styles.navbar} className="navbar navbar-expand-lg shadow-sm">
        <div className="container">
          <div className="row w-100 align-items-center">
            <div className="col-4 d-flex align-items-center">
              <button className="btn text-white me-2" onClick={toggleSidebar} style={{ border: 'none', background: 'transparent' }}>
                <FaBars size={22} />
              </button>
              <Link to="/" style={styles.brand} onClick={handleLinkClick}>
                <FaCamera className="me-2" /> CameraHive
              </Link>
            </div>
            <div className="col-8 d-flex justify-content-end align-items-center gap-3">
              <Link to="/cart" style={styles.navLink}>
                <FaShoppingCart size={20} />
                <span>Cart</span>
                {cartCount > 0 && (
                  <span className="badge rounded-pill bg-danger" style={styles.badge}>
                    {cartCount}
                  </span>
                )}
              </Link>
              <Link to="/wishlist" style={styles.navLink}>
                <FaHeart size={20} />
                <span>Wishlist</span>
                {wishlistCount > 0 && (
                  <span className="badge rounded-pill bg-danger" style={styles.badge}>
                    {wishlistCount}
                  </span>
                )}
              </Link>
              {auth ? (
                <div className="dropdown">
                  <button 
                    className="dropdown-toggle" 
                    type="button" 
                    id="userMenu" 
                    data-bs-toggle="dropdown" 
                    aria-expanded="false"
                    style={styles.navButton}
                  >
                    Profile
                  </button>
                  <ul className="dropdown-menu" aria-labelledby="userMenu" style={styles.dropdownMenu}>
                    <li><Link className="dropdown-item" to="/profile" style={styles.dropdownItem}>Profile</Link></li>
                    <li><Link className="dropdown-item" to="/ure" style={styles.dropdownItem}>Reviews</Link></li>
                    <li><Link className="dropdown-item" to="/myorders" style={styles.dropdownItem}>My Orders</Link></li>
                    {contextRole === "admin" && (
                      <li><Link className="dropdown-item" to="/admin-dashboard" style={styles.dropdownItem}>Admin Dash</Link></li>
                    )}
                    <li><button className="dropdown-item" onClick={handleLogout} style={{ ...styles.dropdownItem, color: '#e53e3e' }}>Logout</button></li>
                  </ul>
                </div>
              ) : (
                <>
                  <Link to="/login" style={styles.loginButton}>Login</Link>
                  <Link to="/register" style={styles.signupButton}>Signup</Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
      {sidebarOpen && (
        <div 
          className="position-fixed top-0 start-0 w-100 h-100" 
          style={{ ...styles.overlay, zIndex: 1040 }} 
          onClick={toggleSidebar}
        ></div>
      )}
      <div 
        className={`position-fixed top-0 start-0 h-100 p-4`} 
        style={{ ...styles.sidebar, width: "280px", zIndex: 1050 }}
      >
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5 className="fw-bold" style={{ color: '#667eea' }}>Menu</h5>
          <button 
            className="btn btn-sm" 
            onClick={toggleSidebar}
            style={{ border: 'none', background: 'transparent', color: '#4a5568' }}
          >
            <FaTimes size={18} />
          </button>
        </div>
        <ul className="list-unstyled">
          <li className="mb-2"><Link to="/" style={styles.menuLink} onClick={handleLinkClick}>Home</Link></li>
          <li className="mb-2"><Link to="/browse" style={styles.menuLink} onClick={handleLinkClick}>Browse</Link></li>
          <li className="mb-2"><Link to="/buy" style={styles.menuLink} onClick={handleLinkClick}>Buy</Link></li>
          <li className="mb-2"><Link to="/rent" style={styles.menuLink} onClick={handleLinkClick}>Rent</Link></li>
          <li className="mb-2"><Link to="/ure" style={styles.menuLink} onClick={handleLinkClick}>Reviews</Link></li>
          <li className="mb-2"><Link to="/about" style={styles.menuLink} onClick={handleLinkClick}>About</Link></li>
          <li className="mb-2"><Link to="/contact" style={styles.menuLink} onClick={handleLinkClick}>Contact</Link></li>
          {contextRole === "admin" && (
            <li className="mb-2"><Link to="/admin-dashboard" style={styles.menuLink} onClick={handleLinkClick}>Admin Dashboard</Link></li>
          )}
        </ul>
      </div>
    </>
  );
}

export default Navbar;