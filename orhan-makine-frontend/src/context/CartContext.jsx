import React, { 
  createContext, 
  useState, 
  useContext, 
  useEffect, 
  useCallback, 
  useMemo 
} from 'react';
import { productsData } from '../data/productsData'; // productsData import ediliyor

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
    📌 1) SAYFA YÜKLENİNCE LocalStorage'dan oku  
  --------------------------------------------- */
  useEffect(() => {
    try {
      const saved = localStorage.getItem("orhanmakine-cart");
      if (saved) {
        const parsed = JSON.parse(saved);
        // Sadece gerekli bilgileri localStorage'dan al, diğer verileri productsData'dan tamamla
        const enhancedCart = parsed.map(item => {
          // productsData'dan tam ürün bilgilerini bul
          const fullProduct = productsData.find(p => p.id === item.id);
          
          if (fullProduct) {
            return {
              ...item,
              name: fullProduct.name || item.name,
              price: fullProduct.price || item.price,
              originalPrice: fullProduct.originalPrice || item.originalPrice,
              image: fullProduct.image || item.image,
              brand: fullProduct.brand || item.brand,
              stockCode: fullProduct.productCode || item.stockCode,
              inStock: fullProduct.inStock !== false,
              category: fullProduct.category,
              slug: fullProduct.slug
            };
          }
          return item;
        });
        
        setCartItems(Array.isArray(enhancedCart) ? enhancedCart : []);
      }
    } catch (error) {
      console.error("Sepet verisi okunamadı:", error);
      setCartItems([]);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  /* ---------------------------------------------------------
    📌 2) LocalStorage'a yazmayı optimize et
  ---------------------------------------------------------- */
  useEffect(() => {
    if (!isInitialized) return;

    const timeout = setTimeout(() => {
      try {
        // Sadece gerekli bilgileri localStorage'a kaydet
        const simplifiedCart = cartItems.map(item => ({
          id: item.id,
          quantity: item.quantity,
          // Diğer bilgiler productsData'dan yeniden yüklenecek
        }));
        localStorage.setItem("orhanmakine-cart", JSON.stringify(simplifiedCart));
      } catch (error) {
        console.error("Sepet verisi kaydedilemedi:", error);
      }
    }, 150);

    return () => clearTimeout(timeout);
  }, [cartItems, isInitialized]);

  /* ---------------------------------------------------------
    📌 3) productsData'dan ürün bilgilerini getiren yardımcı fonksiyon
  ---------------------------------------------------------- */
  const getProductFromData = useCallback((productId) => {
    return productsData.find(product => product.id === productId);
  }, []);

  /* --------------------------------------------
     📌 ÜRÜN EKLE — productsData'dan otomatik veri al
  --------------------------------------------- */
  const addToCart = useCallback((productId, quantity = 1) => {
    if (!productId) {
      console.error("Geçersiz ürün ID:", productId);
      return;
    }

    const productFromData = getProductFromData(productId);
    
    if (!productFromData) {
      console.error("Ürün bulunamadı:", productId);
      return;
    }

    setCartItems(prev => {
      const existingIndex = prev.findIndex(item => item.id === productId);

      if (existingIndex >= 0) {
        // Ürün zaten sepette, miktarı artır
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity
        };
        return updated;
      } else {
        // Yeni ürün ekle - TÜM bilgileri productsData'dan al
        const newItem = {
          id: productFromData.id,
          name: productFromData.name || "İsimsiz Ürün",
          price: Number(productFromData.price) || 0,
          originalPrice: Number(productFromData.originalPrice) || null,
          image: productFromData.image || "/images/default-product.png",
          brand: productFromData.brand || "Belirsiz Marka",
          quantity: Math.max(1, quantity),
          inStock: productFromData.inStock !== false,
          stockCode: productFromData.productCode || `STK-${productFromData.id}`,
          category: productFromData.category,
          slug: productFromData.slug,
          productCode: productFromData.productCode,
          metaTitle: productFromData.metaTitle,
          metaDescription: productFromData.metaDescription,
          features: productFromData.features,
          specifications: productFromData.specifications
        };
        return [...prev, newItem];
      }
    });
  }, [getProductFromData]);

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
     📌 SEPETTEKİ ÜRÜNÜN TAM BİLGİLERİNİ GETİR
  --------------------------------------------- */
  const getCartItemDetails = useCallback((productId) => {
    const cartItem = cartItems.find(item => item.id === productId);
    if (!cartItem) return null;
    
    // productsData'dan güncel bilgileri de getir
    const productFromData = getProductFromData(productId);
    
    return {
      ...cartItem,
      // productsData'dan gelen güncel bilgilerle birleştir
      currentPrice: productFromData?.price || cartItem.price,
      currentInStock: productFromData?.inStock !== false,
      productDetails: productFromData
    };
  }, [cartItems, getProductFromData]);

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
      }).format(totalPrice),
      items: cartItems.map(item => ({
        ...item,
        itemTotal: (item.price * item.quantity),
        formattedPrice: new Intl.NumberFormat('tr-TR').format(item.price),
        formattedItemTotal: new Intl.NumberFormat('tr-TR').format(item.price * item.quantity)
      }))
    };
  }, [cartItems, getTotalPrice, getItemCount]);

  /* ---------------------------------------------------------
    📌 ÜRÜN FİYAT KONTROLÜ - productsData'dan güncel fiyat
  ---------------------------------------------------------- */
  const getCurrentProductPrice = useCallback((productId) => {
    const product = getProductFromData(productId);
    return product ? Number(product.price) || 0 : 0;
  }, [getProductFromData]);

  /* ---------------------------------------------------------
    📌 SEPETTEKİ ÜRÜNLERİN GÜNCEL BİLGİLERİNİ KONTROL ET
  ---------------------------------------------------------- */
  const getCartItemsWithCurrentData = useCallback(() => {
    return cartItems.map(item => {
      const productFromData = getProductFromData(item.id);
      return {
        ...item,
        currentPrice: productFromData?.price || item.price,
        currentOriginalPrice: productFromData?.originalPrice || item.originalPrice,
        currentInStock: productFromData?.inStock !== false,
        productData: productFromData
      };
    });
  }, [cartItems, getProductFromData]);

  /* ---------------------------------------------------------
    📌 CONTEXT VALUE → useMemo ile tek sefer oluştur
  ---------------------------------------------------------- */
  const value = useMemo(() => ({
    // State
    cartItems,
    isInitialized,
    
    // Enhanced cart items (güncel verilerle)
    cartItemsWithCurrentData: getCartItemsWithCurrentData(),
    
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
    getCartItemDetails,
    getCurrentProductPrice,
    
    // Convenience properties (memoized değerler)
    totalItems: getItemCount(),
    totalPrice: getTotalPrice(),
    formattedTotalPrice: new Intl.NumberFormat('tr-TR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(getTotalPrice()),
    itemCountText: `${getItemCount()} ${getItemCount() === 1 ? 'ürün' : 'ürün'}`,
    
    // ProductsData erişimi
    getProductFromData
  }), [
    cartItems,
    isInitialized,
    getCartItemsWithCurrentData,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getItemCount,
    isInCart,
    getProductQuantity,
    getCartSummary,
    getCartItemDetails,
    getCurrentProductPrice,
    getProductFromData
  ]);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};