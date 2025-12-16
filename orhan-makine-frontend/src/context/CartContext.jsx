import React, { 
  createContext, 
  useState, 
  useContext, 
  useEffect, 
  useCallback, 
  useMemo 
} from 'react';

const CartContext = createContext();

// Custom Hook
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalItems, setTotalItems] = useState(0);

  /* --------------------------------------------
    📌 1) SAYFA YÜKLENİNCE LocalStorage’den oku  
  --------------------------------------------- */
  useEffect(() => {
    const saved = localStorage.getItem("orhanmakine-cart");
    if (saved) {
      const parsed = JSON.parse(saved);
      setCartItems(parsed);
      setTotalItems(parsed.reduce((s, i) => s + i.quantity, 0));
    }
  }, []);

  /* ---------------------------------------------------------
    📌 2) LocalStorage’a yazmayı optimize et
        - Her quantity değişiminde 10 defa yazmayı engeller
        - 150ms debounce → daha performanslı
  ---------------------------------------------------------- */
  useEffect(() => {
    const timeout = setTimeout(() => {
      localStorage.setItem("orhanmakine-cart", JSON.stringify(cartItems));
    }, 150);

    return () => clearTimeout(timeout);
  }, [cartItems]);

  /* --------------------------------------------
     📌 TOPLAM ADETİ GÜNCELLEYEN MEMOIZED FONKSİYON  
  --------------------------------------------- */
  const updateTotal = useCallback((items) => {
    setTotalItems(items.reduce((sum, item) => sum + item.quantity, 0));
  }, []);

  /* --------------------------------------------
     📌 ÜRÜN EKLE — useCallback ile optimize
  --------------------------------------------- */
  const addToCart = useCallback((product, quantity = 1) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);

      let updated;
      if (existing) {
        updated = prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        updated = [
          ...prev,
          {
            id: product.id,
            name: product.name,
            price: product.price,
            originalPrice: product.originalPrice,
            image: product.image,
            brand: product.brand,
            quantity,
            inStock: product.inStock,
            stockCode: product.stockCode
          }
        ];
      }

      updateTotal(updated);
      return updated;
    });
  }, [updateTotal]);

  /* --------------------------------------------
     📌 ÜRÜN SİL
  --------------------------------------------- */
  const removeFromCart = useCallback((productId) => {
    setCartItems(prev => {
      const updated = prev.filter(item => item.id !== productId);
      updateTotal(updated);
      return updated;
    });
  }, [updateTotal]);

  /* --------------------------------------------
     📌 ADET GÜNCELLE
  --------------------------------------------- */
  const updateQuantity = useCallback((productId, newQuantity) => {
    if (newQuantity < 1) return removeFromCart(productId);

    setCartItems(prev => {
      const updated = prev.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      );
      updateTotal(updated);
      return updated;
    });
  }, [removeFromCart, updateTotal]);

  /* --------------------------------------------
     📌 SEPETİ TEMİZLE
  --------------------------------------------- */
  const clearCart = useCallback(() => {
    setCartItems([]);
    setTotalItems(0);
  }, []);

  /* --------------------------------------------
     📌 MEMOIZED SELECTORS (Performans boost)
  --------------------------------------------- */
  const getTotalPrice = useCallback(() => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cartItems]);

  const getItemCount = useCallback(() => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }, [cartItems]);

  /* ---------------------------------------------------------
    📌 CONTEXT VALUE → useMemo ile tek sefer oluştur
       (Her render’da yeni object oluşmasını engeller)
  ---------------------------------------------------------- */
  const value = useMemo(() => ({
    cartItems,
    totalItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getItemCount
  }), [
    cartItems,
    totalItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getItemCount
  ]);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};