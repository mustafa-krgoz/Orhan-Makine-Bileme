// src/context/ProductsContext.jsx
import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

// JSON'ı import et
import productsDataJSON from '../data/productsData.json';

// Context oluştur
const ProductsContext = createContext();

// Custom hook
export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error('useProducts must be used within ProductsProvider');
  }
  return context;
};

// Provider Component
export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // JSON'dan ürünleri yükle
  useEffect(() => {
    try {
      setLoading(true);
      // JSON'ı doğrudan set et (simüle edilmiş async işlem)
      setTimeout(() => {
        setProducts(productsDataJSON);
        setLoading(false);
      }, 100);
    } catch (err) {
      console.error('Ürünler yüklenirken hata:', err);
      setError('Ürünler yüklenemedi');
      setLoading(false);
    }
  }, []);

  // Kategorileri memoize et
  const categories = useMemo(() => {
    return [...new Set(products.map(p => p.category))];
  }, [products]);

  // Markaları memoize et
  const brands = useMemo(() => {
    return [...new Set(products.map(p => p.brand))];
  }, [products]);

  // ID'ye göre ürün bul
  const getProductById = (id) => {
    return products.find(p => p.id === Number(id));
  };

  // Kategoriye göre ürünleri filtrele
  const getProductsByCategory = (category) => {
    return products.filter(p => p.category === category);
  };

  // Markaya göre ürünleri filtrele
  const getProductsByBrand = (brand) => {
    return products.filter(p => p.brand === brand);
  };

  // Kampanyalı ürünleri getir
  const getCampaignProducts = () => {
    return products.filter(p => p.isCampaign);
  };

  // Yeni ürünleri getir
  const getNewProducts = () => {
    return products.filter(p => p.isNew);
  };

  // İndirimli ürünleri getir
  const getDiscountedProducts = () => {
    return products.filter(p => 
      p.showDiscount && p.originalPrice > p.price
    );
  };

  // Random ürünler getir (featured products için)
  const getRandomProducts = (count = 8) => {
    return [...products]
      .sort(() => Math.random() - 0.5)
      .slice(0, count);
  };

  // Context value
  const value = {
    products,
    loading,
    error,
    categories,
    brands,
    getProductById,
    getProductsByCategory,
    getProductsByBrand,
    getCampaignProducts,
    getNewProducts,
    getDiscountedProducts,
    getRandomProducts,
  };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};