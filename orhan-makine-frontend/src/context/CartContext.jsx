import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalItems, setTotalItems] = useState(0);

  // LocalStorage'dan sepeti yükle
  useEffect(() => {
    const savedCart = localStorage.getItem('orhanmakine-cart');
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      setCartItems(parsedCart);
      updateTotalItems(parsedCart);
    }
  }, []);

  // LocalStorage'a sepeti kaydet
  useEffect(() => {
    localStorage.setItem('orhanmakine-cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const updateTotalItems = (items) => {
    const total = items.reduce((sum, item) => sum + item.quantity, 0);
    setTotalItems(total);
  };

  const addToCart = (product, quantity = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      let newItems;
      if (existingItem) {
        newItems = prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        newItems = [...prevItems, {
          id: product.id,
          name: product.name,
          price: product.price,
          originalPrice: product.originalPrice,
          image: product.image,
          brand: product.brand,
          quantity: quantity,
          inStock: product.inStock,
          stockCode: product.stockCode
        }];
      }
      
      updateTotalItems(newItems);
      return newItems;
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => {
      const newItems = prevItems.filter(item => item.id !== productId);
      updateTotalItems(newItems);
      return newItems;
    });
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }

    setCartItems(prevItems => {
      const newItems = prevItems.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      );
      updateTotalItems(newItems);
      return newItems;
    });
  };

  const clearCart = () => {
    setCartItems([]);
    setTotalItems(0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getItemCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const value = {
    cartItems,
    totalItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getItemCount
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};