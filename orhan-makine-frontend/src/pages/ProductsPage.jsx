// ==========================================================
// PRODUCTS PAGE — MODERN, SEO-PWA UYUMLU, MOBILE OPTIMIZED
// ==========================================================

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/ProductsPage.css";
import { useProducts } from "../context/ProductsContext";
import { useFavorites } from "../context/FavoritesContext";
import { useCart } from "../context/CartContext";

const ProductsPage = () => {
  // ----------------------------------------------------------
  // STATE YÖNETİMİ
  // ----------------------------------------------------------
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [imageErrors, setImageErrors] = useState({});
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Mobil için geçici filtreler (uygula butonuna basılana kadar)
  const [tempSelectedCategories, setTempSelectedCategories] = useState([]);
  const [tempSelectedBrands, setTempSelectedBrands] = useState([]);
  const [tempFilters, setTempFilters] = useState({
    campaign: false,
    new: false,
    discounted: false,
  });

  const [filters, setFilters] = useState({
    campaign: false,
    new: false,
    discounted: false,
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("recommended");

  // FAVORİLER & SEPET CONTEXT
  const { isFavorite, toggleFavorite } = useFavorites();
  const { addToCart } = useCart(); // Sadece addToCart'ı al

  // Tüm kategoriler, markalar, ürünler
  
    const { 
      products: productsData, 
      categories, 
      brands, 
      loading 
    } = useProducts();

  // ----------------------------------------------------------
  // MOBİL FILTER OVERLAY KONTROL
  // ----------------------------------------------------------
  useEffect(() => {
    if (isMobileFilterOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileFilterOpen]);

  // ----------------------------------------------------------
  // İNDİRİM GÖSTERİM MANTIĞI
  // ----------------------------------------------------------
  const shouldShowDiscount = (product) => {
    if (!product.showDiscount) return false;
    return product.originalPrice > product.price;
  };

  // ----------------------------------------------------------
  // SEPETE EKLEME İŞLEMİ
  // ----------------------------------------------------------
  const handleAddToCart = (productId) => {
    addToCart(productId, 1);
    
    // Kullanıcıya feedback göster
    const product = productsData.find(p => p.id === productId);
    if (product) {
      // Mini toast mesajı
      showToast(`${product.name} sepete eklendi!`);
    }
  };

  // Toast mesajı gösterme
  const showToast = (message) => {
    // Mevcut bir toast varsa kaldır
    const existingToast = document.querySelector('.product-toast');
    if (existingToast) {
      existingToast.remove();
    }

    // Yeni toast oluştur
    const toast = document.createElement('div');
    toast.className = 'product-toast';
    toast.textContent = message;
    toast.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: #4CAF50;
      color: white;
      padding: 12px 24px;
      border-radius: 4px;
      z-index: 10000;
      animation: slideIn 0.3s ease;
      font-weight: 500;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;
    
    document.body.appendChild(toast);
    
    // 3 saniye sonra kaldır
    setTimeout(() => {
      toast.style.animation = 'slideOut 0.3s ease';
      setTimeout(() => {
        if (toast.parentNode) {
          toast.remove();
        }
      }, 300);
    }, 3000);
  };

  // CSS animasyonu ekle
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideIn {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
      @keyframes slideOut {
        from {
          transform: translateX(0);
          opacity: 1;
        }
        to {
          transform: translateX(100%);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      if (style.parentNode) {
        style.remove();
      }
    };
  }, []);

  // ----------------------------------------------------------
  // FİLTRELEME VE SIRALAMA
  // ----------------------------------------------------------
  useEffect(() => {
    if (!productsData || productsData.length === 0) return;
    let result = productsData;

    if (selectedCategories.length > 0) {
      result = result.filter((p) => selectedCategories.includes(p.category));
    }

    if (selectedBrands.length > 0) {
      result = result.filter((p) => selectedBrands.includes(p.brand));
    }

    if (filters.campaign) result = result.filter((p) => p.isCampaign);
    if (filters.new) result = result.filter((p) => p.isNew);
    if (filters.discounted)
      result = result.filter((p) => shouldShowDiscount(p));

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          p.description.toLowerCase().includes(term) ||
          p.productCode.toLowerCase().includes(term)
      );
    }

    // Sıralama
    switch (sortOption) {
      case "price-low":
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case "name":
        result = [...result].sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "rating":
        result = [...result].sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      default:
        break;
    }

    setFilteredProducts(result);
  }, [
    selectedCategories,
    selectedBrands,
    filters,
    searchTerm,
    sortOption,
    productsData,
  ]);

  // ----------------------------------------------------------
  // YARDIMCI FONKSİYONLAR
  // ----------------------------------------------------------
  const handleImageError = (id) =>
    setImageErrors((prev) => ({ ...prev, [id]: true }));

  const formatPrice = (price) =>
    new Intl.NumberFormat("tr-TR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);

  const calculateDiscount = (original, current) =>
    Math.round(((original - current) / original) * 100);

  const toggleMobileFilter = () => {
    if (!isMobileFilterOpen) {
      // Açılırken mevcut filtreleri geçicilere kopyala
      setTempSelectedCategories(selectedCategories);
      setTempSelectedBrands(selectedBrands);
      setTempFilters(filters);
    }
    setIsMobileFilterOpen(!isMobileFilterOpen);
  };

  const closeMobileFilter = () => {
    setIsMobileFilterOpen(false);
  };

  // Mobil filtreleri uygula
  const applyMobileFilters = () => {
    setSelectedCategories(tempSelectedCategories);
    setSelectedBrands(tempSelectedBrands);
    setFilters(tempFilters);
    closeMobileFilter();
  };

  // Desktop filtre değişikliklerini anında uygula
  const handleDesktopCategoryChange = (cat) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const handleDesktopBrandChange = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const handleDesktopFilterChange = (filterName, value) => {
    setFilters((prev) => ({ ...prev, [filterName]: value }));
  };

  // ----------------------------------------------------------
  // DESKTOP FILTER SIDEBAR COMPONENT
  // ----------------------------------------------------------
  const DesktopFilterSidebar = () => (
    <div className="filter-sidebar-content">
      {/* Ürün Grupları */}
      <div className="filter-group">
        <h3>Ürün Grupları</h3>
        <div className="category-list">
          {categories.map((cat) => (
            <label key={cat} className="checkbox-item">
              <input
                type="checkbox"
                checked={selectedCategories.includes(cat)}
                onChange={() => handleDesktopCategoryChange(cat)}
              />
              <span className="checkmark"></span>
              {cat}
            </label>
          ))}
        </div>
      </div>

      {/* Marka */}
      <div className="filter-group">
        <h3>Marka</h3>
        <div className="brand-list">
          {brands.map((brand) => (
            <label key={brand} className="checkbox-item">
              <input
                type="checkbox"
                checked={selectedBrands.includes(brand)}
                onChange={() => handleDesktopBrandChange(brand)}
              />
              <span className="checkmark"></span>
              {brand}
            </label>
          ))}
        </div>
      </div>

      {/* Filtre Seçenekleri */}
      <div className="filter-group">
        <h3>Filtreler</h3>

        <label className="checkbox-item">
          <input
            type="checkbox"
            checked={filters.campaign}
            onChange={(e) =>
              handleDesktopFilterChange("campaign", e.target.checked)
            }
          />
          <span className="checkmark"></span>
          Kampanyalı Ürünler
        </label>

        <label className="checkbox-item">
          <input
            type="checkbox"
            checked={filters.new}
            onChange={(e) => handleDesktopFilterChange("new", e.target.checked)}
          />
          <span className="checkmark"></span>
          Yeni Ürünler
        </label>

        <label className="checkbox-item">
          <input
            type="checkbox"
            checked={filters.discounted}
            onChange={(e) =>
              handleDesktopFilterChange("discounted", e.target.checked)
            }
          />
          <span className="checkmark"></span>
          İndirimli Ürünler
        </label>
      </div>
    </div>
  );

  // ----------------------------------------------------------
  // MOBILE FILTER SIDEBAR COMPONENT
  // ----------------------------------------------------------
  const MobileFilterSidebar = () => (
    <div className="filter-sidebar-content">
      {/* Ürün Grupları */}
      <div className="filter-group">
        <h3>Ürün Grupları</h3>
        <div className="category-list">
          {categories.map((cat) => (
            <label key={cat} className="checkbox-item">
              <input
                type="checkbox"
                checked={tempSelectedCategories.includes(cat)}
                onChange={() =>
                  setTempSelectedCategories((prev) =>
                    prev.includes(cat)
                      ? prev.filter((c) => c !== cat)
                      : [...prev, cat]
                  )
                }
              />
              <span className="checkmark"></span>
              {cat}
            </label>
          ))}
        </div>
      </div>

      {/* Marka */}
      <div className="filter-group">
        <h3>Marka</h3>
        <div className="brand-list">
          {brands.map((brand) => (
            <label key={brand} className="checkbox-item">
              <input
                type="checkbox"
                checked={tempSelectedBrands.includes(brand)}
                onChange={() =>
                  setTempSelectedBrands((prev) =>
                    prev.includes(brand)
                      ? prev.filter((b) => b !== brand)
                      : [...prev, brand]
                  )
                }
              />
              <span className="checkmark"></span>
              {brand}
            </label>
          ))}
        </div>
      </div>

      {/* Filtre Seçenekleri */}
      <div className="filter-group">
        <h3>Filtreler</h3>

        <label className="checkbox-item">
          <input
            type="checkbox"
            checked={tempFilters.campaign}
            onChange={(e) =>
              setTempFilters((prev) => ({ ...prev, campaign: e.target.checked }))
            }
          />
          <span className="checkmark"></span>
          Kampanyalı Ürünler
        </label>

        <label className="checkbox-item">
          <input
            type="checkbox"
            checked={tempFilters.new}
            onChange={(e) =>
              setTempFilters((prev) => ({ ...prev, new: e.target.checked }))
            }
          />
          <span className="checkmark"></span>
          Yeni Ürünler
        </label>

        <label className="checkbox-item">
          <input
            type="checkbox"
            checked={tempFilters.discounted}
            onChange={(e) =>
              setTempFilters((prev) => ({
                ...prev,
                discounted: e.target.checked,
              }))
            }
          />
          <span className="checkmark"></span>
          İndirimli Ürünler
        </label>
      </div>

      {/* Filtrele Butonu */}
      <div className="mobile-apply-filters">
        <button
          className="apply-filters-btn"
          onClick={applyMobileFilters}
          aria-label="Filtreleri uygula"
        >
          Filtrele
        </button>
      </div>
    </div>
  );
// ----------------------------------------------------------
// RENDER
// ----------------------------------------------------------
return (
  <div className="products-page">
    <div className="products-container">
      
      {/* ------------------------------------------------------
          DESKTOP SIDEBAR - HER ZAMAN GÖRÜNSİN
      ------------------------------------------------------ */}
      <aside className="products-sidebar desktop-only" aria-label="Ürün filtreleri">
        {loading ? (
          <div className="filter-sidebar-content">
            <div className="filter-group">
              <div className="filter-loading">
                <div className="loading-spinner-small"></div>
                <p>Filtreler yükleniyor...</p>
              </div>
            </div>
          </div>
        ) : (
          <DesktopFilterSidebar />
        )}
      </aside>

      {/* ------------------------------------------------------
          MOBİL HAMBURGER OVERLAY
      ------------------------------------------------------ */}
      {isMobileFilterOpen && (
        <>
          <div 
            className="mobile-filter-overlay" 
            onClick={closeMobileFilter}
            aria-hidden="true"
          ></div>
          <aside 
            className="mobile-filter-sidebar"
            role="dialog"
            aria-label="Mobil filtre menüsü"
          >
            <div className="mobile-filter-header">
              <h2>Filtrele</h2>
              <button 
                className="close-filter-btn"
                onClick={closeMobileFilter}
                aria-label="Filtreyi kapat"
              >
                ✕
              </button>
            </div>
            {loading ? (
              <div className="filter-sidebar-content">
                <div className="filter-group">
                  <div className="filter-loading">
                    <div className="loading-spinner-small"></div>
                    <p>Filtreler yükleniyor...</p>
                  </div>
                </div>
              </div>
            ) : (
              <MobileFilterSidebar />
            )}
          </aside>
        </>
      )}

      {/* ------------------------------------------------------
          SAĞ ÜRÜN LİSTESİ - LOADING BURDA
      ------------------------------------------------------ */}
      <main className="products-content">

        {/* MOBİL HAMBURGER BUTON */}
        <button 
          className="mobile-filter-toggle"
          onClick={toggleMobileFilter}
          aria-label="Filtreleri aç"
          aria-expanded={isMobileFilterOpen}
        >
          <span className="hamburger-icon">
            <span></span>
            <span></span>
            <span></span>
          </span>
          <span className="filter-text">Filtrele</span>
        </button>

        {/* Üst Bilgi */}
        <header className="products-header">
          <span className="products-count">
            {loading ? 'Yükleniyor...' : `Toplam ${filteredProducts.length} ürün`}
          </span>

          {/* HIZLI ARAMA - PC GÖRÜNÜMDE HEADER'DA */}
          <div className="header-search-box desktop-search-only">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Ürün, marka veya kod ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
              aria-label="Ürün arama"
              disabled={loading}
            />
          </div>

          <div className="sort-options">
            <label htmlFor="sort-select">Sırala:</label>
            <select
              id="sort-select"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="sort-select"
              aria-label="Ürün sıralama seçenekleri"
              disabled={loading}
            >
              <option value="recommended">Önerilen</option>
              <option value="price-low">Fiyat (Artan)</option>
              <option value="price-high">Fiyat (Azalan)</option>
              <option value="name">İsim (A→Z)</option>
              <option value="rating">Değerlendirme</option>
            </select>
          </div>
        </header>

        {/* ✅ LOADING STATE - ÜRÜN GRİDİNDE */}
        {loading ? (
          <div className="products-loading">
            <div className="loading-spinner"></div>
            <p>Ürünler yükleniyor...</p>
          </div>
        ) : (
          <>
            {/* Ürün Grid */}
            <section className="products-grid" aria-label="Ürün listesi">
              {filteredProducts.map((product) => (
                <article key={product.id} className="product-card">
                  
                  {/* ÜRÜN GÖRSELİ */}
                  <div className="product-image">
                    <img
                      src={
                        imageErrors[product.id]
                          ? "/images/default-product.png"
                          : product.image
                      }
                      alt={`${product.brand} ${product.name}`}
                      onError={() => handleImageError(product.id)}
                      loading="lazy"
                      width="300"
                      height="300"
                    />

                    {/* BADGE ALANI */}
                    <div className="product-badges" aria-label="Ürün etiketleri">
                      {shouldShowDiscount(product) && (
                        <span className="badge discount" aria-label="İndirim yüzdesi">
                          %{calculateDiscount(
                            product.originalPrice,
                            product.price
                          )}
                        </span>
                      )}

                      {product.isNew && <span className="badge new">YENİ</span>}
                      {product.isCampaign && (
                        <span className="badge campaign">KAMPANYA</span>
                      )}
                    </div>

                    {/* FAVORİ BUTONU */}
                    <button
                      className={`favorite-btn ${
                        isFavorite(product.id) ? "active" : ""
                      }`}
                      onClick={() => toggleFavorite(product.id)}
                      aria-label={
                        isFavorite(product.id)
                          ? "Favorilerden çıkar"
                          : "Favorilere ekle"
                      }
                    >
                      {isFavorite(product.id) ? "❤️" : "🤍"}
                    </button>
                  </div>

                  {/* ÜRÜN BİLGİLERİ */}
                  <div className="product-info">
                    <div className="product-brand">{product.brand}</div>

                    <h3 className="product-name">{product.name}</h3>

                    {/* ÜRÜN KODU */}
                    <div className="product-code">
                      <span className="product-code-label">Ürün Kodu:</span>
                      <span className="product-code-value">
                        {product.productCode !== "-" ? product.productCode : "—"}
                      </span>
                    </div>

                    <p className="product-description">
                      {product.description}
                    </p>

                    {/* FİYAT ALANI */}
                    <div className="product-pricing">
                      {shouldShowDiscount(product) && (
                        <div className="original-price" aria-label="Eski fiyat">
                          {formatPrice(product.originalPrice)} TL
                        </div>
                      )}

                      <div className="current-price" aria-label="Güncel fiyat">
                        {formatPrice(product.price)} TL
                      </div>
                    </div>

                    {/* BUTONLAR */}
                    <div className="product-actions">
                      <button
                        className="add-to-cart-btn"
                        disabled={!product.inStock}
                        onClick={() => handleAddToCart(product.id)}
                        aria-label={
                          product.inStock
                            ? "Sepete ekle"
                            : "Stokta yok"
                        }
                      >
                        {product.inStock ? "SEPETE EKLE" : "STOKTA YOK"}
                      </button>

                      <Link
                        to={`/${product.categorySlug}/${product.slug}`}
                        className="view-details-btn"
                        aria-label={`${product.name} detaylarını görüntüle`}
                      >
                        Detaylı İncele
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </section>

            {/* ÜRÜN YOKSA */}
            {filteredProducts.length === 0 && (
              <div className="no-products" role="status">
                <h3>Ürün bulunamadı</h3>
                <p>Filtreleri değiştirip tekrar deneyin.</p>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  </div>
  );  
};

export default ProductsPage;