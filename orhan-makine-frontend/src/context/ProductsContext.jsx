// src/context/ProductsContext.jsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";

// JSON import
import productsDataJSON from "../data/productsData.json";

const ProductsContext = createContext();

// Custom hook
export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error("useProducts must be used within ProductsProvider");
  }
  return context;
};

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ---------------------------------------------
  // 🚀 ÜRÜNLERİ YÜKLE (Simüle delay + güvenli)
  // ---------------------------------------------
  useEffect(() => {
    try {
      setLoading(true);

      // Küçük gecikme = gerçek API hissi + devtools rahat çalışır
      setTimeout(() => {
        if (!productsDataJSON || productsDataJSON.length === 0) {
          console.error("⚠️ productsData.json boş veya yüklenemedi.");
          setError("Ürünler yüklenemedi");
        } else {
          setProducts(productsDataJSON);
        }
        setLoading(false);
      }, 150);
    } catch (err) {
      console.error("❌ Ürünler yüklenirken hata:", err);
      setError("Ürünler yüklenemedi");
      setLoading(false);
    }
  }, []);

  // ---------------------------------------------
  // 📌 KATEGORİ & MARKA LİSTELERİ
  // ---------------------------------------------
  const categories = useMemo(() => {
    return [...new Set(products.map((p) => p.category))];
  }, [products]);

  const brands = useMemo(() => {
    return [...new Set(products.map((p) => p.brand))];
  }, [products]);

  // ---------------------------------------------
  // 🚀 SEO UYUMLU ÜRÜN BULMA FONKSİYONLARI
  // ---------------------------------------------

  // 1) Sadece slug ile ürün bul
  const getProductBySlug = (slug) => {
    if (!slug) return null;
    return products.find((p) => p.slug === slug) || null;
  };

  // 2) KategoriSlug + slug = EN GÜVENLİ YÖNTEM
  const getProductByCategoryAndSlug = (categorySlug, slug) => {
    if (!categorySlug || !slug) return null;

    return (
      products.find(
        (p) =>
          p.categorySlug?.toLowerCase() === categorySlug.toLowerCase() &&
          p.slug?.toLowerCase() === slug.toLowerCase()
      ) || null
    );
  };

  // ---------------------------------------------
  // 🔥 ESKİ YÖNTEMLER (geri uyumluluk için)
  // ---------------------------------------------
  const getProductById = (id) => {
    return products.find((p) => p.id === Number(id)) || null;
  };

  const getProductsByCategory = (category) => {
    if (!category) return [];
    return products.filter((p) => p.category === category);
  };

  const getProductsByBrand = (brand) => {
    if (!brand) return [];
    return products.filter((p) => p.brand === brand);
  };

  const getCampaignProducts = () => {
    return products.filter((p) => p.isCampaign);
  };

  const getNewProducts = () => {
    return products.filter((p) => p.isNew);
  };

  const getDiscountedProducts = () => {
    return products.filter(
      (p) => p.showDiscount && p.originalPrice > p.price
    );
  };

  const getRandomProducts = (count = 8) => {
    return [...products]
      .sort(() => Math.random() - 0.5)
      .slice(0, count);
  };

  // ---------------------------------------------
  // 📦 CONTEXT VALUE
  // ---------------------------------------------
  const value = {
    products,
    loading,
    error,

    categories,
    brands,

    // SEO product lookup
    getProductBySlug,
    getProductByCategoryAndSlug,

    // Legacy functions
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