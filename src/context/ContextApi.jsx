import React, { createContext, useState } from 'react';

export const authContext = createContext();
export const cartContext = createContext();
export const wishlistContext = createContext();
export const cameraResponseContext = createContext();

const ContextApi = ({ children }) => {
  const [auth, setAuth] = useState(!!sessionStorage.getItem('token'));
  const [contextRole, setContextRole] = useState(sessionStorage.getItem('role') || null);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [cameraResponse, setCameraResponse] = useState({});

  return (
    <authContext.Provider value={{ auth, setAuth, contextRole, setContextRole }}>
      <cartContext.Provider value={{ cart, setCart }}>
        <wishlistContext.Provider value={{ wishlist, setWishlist }}>
          <cameraResponseContext.Provider value={{ cameraResponse, setCameraResponse }}>
            {children}
          </cameraResponseContext.Provider>
        </wishlistContext.Provider>
      </cartContext.Provider>
    </authContext.Provider>
  );
};

export default ContextApi;