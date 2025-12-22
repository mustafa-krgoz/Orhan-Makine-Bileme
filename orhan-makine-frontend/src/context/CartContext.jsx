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
  const [isInitialized, setIsInitialized] = useState(false);

  /* --------------------------------------------
    📌 1) SAYFA YÜKLENİNCE LocalStorage’den oku  
  --------------------------------------------- */
  useEffect(() => {
    try {
      const saved = localStorage.getItem("orhanmakine-cart");
      if (saved) {
        const parsed = JSON.parse(saved);
        setCartItems(Array.isArray(parsed) ? parsed : []);
      }
    } catch (error) {
      console.error("Sepet verisi okunamadı:", error);
      setCartItems([]);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  /* ---------------------------------------------------------
    📌 2) LocalStorage’a yazmayı optimize et
        - Sadece cartItems değiştiğinde ve başlatıldıktan sonra yaz
        - Debounce ile performans optimizasyonu
  ---------------------------------------------------------- */
  useEffect(() => {
    if (!isInitialized) return;

    const timeout = setTimeout(() => {
      try {
        localStorage.setItem("orhanmakine-cart", JSON.stringify(cartItems));
      } catch (error) {
        console.error("Sepet verisi kaydedilemedi:", error);
      }
    }, 150);

    return () => clearTimeout(timeout);
  }, [cartItems, isInitialized]);

  /* --------------------------------------------
     📌 ÜRÜN EKLE — useCallback ile optimize
  --------------------------------------------- */
  const addToCart = useCallback((product, quantity = 1) => {
    if (!product || !product.id) {
      console.error("Geçersiz ürün:", product);
      return;
    }

    setCartItems(prev => {
      const existingIndex = prev.findIndex(item => item.id === product.id);

      if (existingIndex >= 0) {
        // Ürün zaten sepette, miktarı artır
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity
        };
        return updated;
      } else {
        // Yeni ürün ekle
        const newItem = {
          id: product.id,
          name: product.name || "İsimsiz Ürün",
          price: Number(product.price) || 0,
          originalPrice: Number(product.originalPrice) || null,
          image: product.image || "/images/default-product.png",
          brand: product.brand || "Belirsiz Marka",
          quantity: Math.max(1, quantity),
          inStock: product.inStock !== false,
          stockCode: product.stockCode || `STK-${product.id}`,
          category: product.category,
          description: product.description
        };
        return [...prev, newItem];
      }
    });
  }, []);

  /* --------------------------------------------
     📌 ÜRÜN SİL
  --------------------------------------------- */
  const removeFromCart = useCallback((productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  }, []);

  /* --------------------------------------------
     📌 ADET GÜNCELLE
  --------------------------------------------- */
  const updateQuantity = useCallback((productId, newQuantity) => {
    if (newQuantity < 1) {
      // Miktar 0'dan küçükse ürünü sil
      setCartItems(prev => prev.filter(item => item.id !== productId));
      return;
    }

    setCartItems(prev => 
      prev.map(item =>
        item.id === productId 
          ? { ...item, quantity: Math.max(1, newQuantity) }
          : item
      )
    );
  }, []);

  /* --------------------------------------------
     📌 SEPETİ TEMİZLE
  --------------------------------------------- */
  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  /* --------------------------------------------
     📌 SEPETTE VAR MI KONTROLÜ
  --------------------------------------------- */
  const isInCart = useCallback((productId) => {
    return cartItems.some(item => item.id === productId);
  }, [cartItems]);

  /* --------------------------------------------
     📌 BELİRLİ ÜRÜNÜN MİKTARINI GETİR
  --------------------------------------------- */
  const getProductQuantity = useCallback((productId) => {
    const item = cartItems.find(item => item.id === productId);
    return item ? item.quantity : 0;
  }, [cartItems]);

  /* --------------------------------------------
     📌 MEMOIZED SELECTORS (Performans boost)
  --------------------------------------------- */
  const getTotalPrice = useCallback(() => {
    return cartItems.reduce((total, item) => {
      const price = Number(item.price) || 0;
      const quantity = Number(item.quantity) || 0;
      return total + (price * quantity);
    }, 0);
  }, [cartItems]);

  const getItemCount = useCallback(() => {
    return cartItems.reduce((total, item) => {
      return total + (Number(item.quantity) || 0);
    }, 0);
  }, [cartItems]);

  /* ---------------------------------------------------------
    📌 SEPET ÖZETİ (Sipariş özeti için)
  ---------------------------------------------------------- */
  const getCartSummary = useCallback(() => {
    const totalPrice = getTotalPrice();
    const itemCount = getItemCount();
    const itemCountText = `${itemCount} ${itemCount === 1 ? 'ürün' : 'ürün'}`;
    
    return {
      totalPrice,
      itemCount,
      itemCountText,
      formattedTotalPrice: new Intl.NumberFormat('tr-TR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(totalPrice)
    };
  }, [getTotalPrice, getItemCount]);

  /* ---------------------------------------------------------
    📌 CONTEXT VALUE → useMemo ile tek sefer oluştur
       (Her render'da yeni object oluşmasını engeller)
  ---------------------------------------------------------- */
  const value = useMemo(() => ({
    // State
    cartItems,
    isInitialized,
    
    // Actions
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    
    // Selectors
    getTotalPrice,
    getItemCount,
    isInCart,
    getProductQuantity,
    getCartSummary,
    
    // Convenience properties (memoized değerler)
    totalItems: getItemCount(),
    totalPrice: getTotalPrice(),
    formattedTotalPrice: new Intl.NumberFormat('tr-TR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(getTotalPrice()),
    itemCountText: `${getItemCount()} ${getItemCount() === 1 ? 'ürün' : 'ürün'}`
  }), [
    cartItems,
    isInitialized,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getItemCount,
    isInCart,
    getProductQuantity,
    getCartSummary
  ]);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};