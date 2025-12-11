// ==========================================================
// PRODUCTS PAGE — MODERN, SEO-PWA UYUMLU, CLEAN CODE
// ==========================================================

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/ProductsPage.css";
import { productsData } from "../data/productsData";
import { useFavorites } from "../context/FavoritesContext";
import { useCart } from "../context/CartContext";

const ProductsPage = () => {
  // ----------------------------------------------------------
  // STATE YÖNETİMİ
  // ----------------------------------------------------------
  const [products] = useState(productsData);
  const [filteredProducts, setFilteredProducts] = useState(productsData);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [showOnlyInStock, setShowOnlyInStock] = useState(false);
  const [imageErrors, setImageErrors] = useState({});

  const [filters, setFilters] = useState({
    campaign: false,
    sponsored: false,
    new: false,
    discounted: false,
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("recommended");

  // FAVORİLER & SEPET CONTEXT
  const { isFavorite, toggleFavorite } = useFavorites();
  const { addToCart } = useCart();

  // Tüm kategoriler
  const categories = [...new Set(products.map((p) => p.category))];

  // Tüm markalar
  const brands = [...new Set(products.map((p) => p.brand))];

  // ----------------------------------------------------------
  // 🟦 İNDİRİM GÖSTERİM MANTIĞI — showDiscount destekli
  // ----------------------------------------------------------
  const shouldShowDiscount = (product) => {
    if (!product.showDiscount) return false;
    return product.originalPrice > product.price;
  };

  // ----------------------------------------------------------
  // FİLTRELEME VE SIRALAMA
  // ----------------------------------------------------------
  useEffect(() => {
    let result = products;

    if (showOnlyInStock) {
      result = result.filter((p) => p.inStock);
    }

    if (selectedCategories.length > 0) {
      result = result.filter((p) => selectedCategories.includes(p.category));
    }

    if (selectedBrands.length > 0) {
      result = result.filter((p) => selectedBrands.includes(p.brand));
    }

    if (filters.campaign) result = result.filter((p) => p.isCampaign);
    if (filters.sponsored) result = result.filter((p) => p.isSponsored);
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
    showOnlyInStock,
    filters,
    searchTerm,
    sortOption,
    products,
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

  // ----------------------------------------------------------
  // RENDER
  // ----------------------------------------------------------
  return (
    <div className="products-page">
      <div className="products-container">
        
        {/* ------------------------------------------------------
            SOL SİDEBAR — TÜM FİLTRELER
        ------------------------------------------------------ */}
        <div className="products-sidebar">

          {/* Stok Durumu */}
          <div className="filter-group">
            <h3>Stok Durumu</h3>
            <div className="radio-options">
              <label className="radio-item">
                <input
                  type="radio"
                  checked={!showOnlyInStock}
                  onChange={() => setShowOnlyInStock(false)}
                />
                <span className="radio-mark"></span>
                Tüm Ürünler ({products.length})
              </label>

              <label className="radio-item">
                <input
                  type="radio"
                  checked={showOnlyInStock}
                  onChange={() => setShowOnlyInStock(true)}
                />
                <span className="radio-mark"></span>
                Stoktakiler ({products.filter((p) => p.inStock).length})
              </label>
            </div>
          </div>

          {/* Ürün Grupları */}
          <div className="filter-group">
            <h3>Ürün Grupları</h3>
            <div className="category-list">
              {categories.map((cat) => (
                <label key={cat} className="checkbox-item">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat)}
                    onChange={() =>
                      setSelectedCategories((prev) =>
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
                    checked={selectedBrands.includes(brand)}
                    onChange={() =>
                      setSelectedBrands((prev) =>
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
                checked={filters.campaign}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, campaign: e.target.checked }))
                }
              />
              <span className="checkmark"></span>
              Kampanyalı Ürünler
            </label>

            <label className="checkbox-item">
              <input
                type="checkbox"
                checked={filters.sponsored}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, sponsored: e.target.checked }))
                }
              />
              <span className="checkmark"></span>
              Sponsor Ürünler
            </label>

            <label className="checkbox-item">
              <input
                type="checkbox"
                checked={filters.new}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, new: e.target.checked }))
                }
              />
              <span className="checkmark"></span>
              Yeni Ürünler
            </label>

            <label className="checkbox-item">
              <input
                type="checkbox"
                checked={filters.discounted}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    discounted: e.target.checked,
                  }))
                }
              />
              <span className="checkmark"></span>
              İndirimli Ürünler
            </label>
          </div>

          {/* Hızlı Arama */}
          <div className="filter-group">
            <h3>Hızlı Arama</h3>
            <div className="search-box">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Ürün ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------
            SAĞ ÜRÜN LİSTESİ
        ------------------------------------------------------ */}
        <div className="products-content">

          {/* Üst Bilgi */}
          <div className="products-header">
            <span className="products-count">
              Toplam {filteredProducts.length} ürün
            </span>

            <div className="sort-options">
              <label>Sırala:</label>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="sort-select"
              >
                <option value="recommended">Önerilen</option>
                <option value="price-low">Fiyat (Artan)</option>
                <option value="price-high">Fiyat (Azalan)</option>
                <option value="name">İsim (A→Z)</option>
                <option value="rating">Değerlendirme</option>
              </select>
            </div>
          </div>

          {/* Ürün Grid */}
          <div className="products-grid">
            {filteredProducts.map((product) => (
              <div key={product.id} className="product-card">
                
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
                  />

                  {/* BADGE ALANI */}
                  <div className="product-badges">

                    {/* İNDİRİM BADGE — showDiscount destekli */}
                    {shouldShowDiscount(product) && (
                      <span className="badge discount">
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
                  >
                    {isFavorite(product.id) ? "❤️" : "🤍"}
                  </button>
                </div>

                {/* ÜRÜN BİLGİLERİ */}
                <div className="product-info">
                  <div className="product-brand">{product.brand}</div>

                  <h3 className="product-name">{product.name}</h3>

                  {/* ÜRÜN KODU — modern görünüm */}
                  <div className="product-code">
                    <span className="product-code-label">Ürün Kodu:</span>
                    <span className="product-code-value">
                      {product.productCode !== "-" ? product.productCode : "—"}
                    </span>
                  </div>

                  <div className="product-description">
                    {product.description}
                  </div>

                  {/* FİYAT ALANI — showDiscount uyumlu */}
                  <div className="product-pricing">
                    {shouldShowDiscount(product) && (
                      <div className="original-price">
                        {formatPrice(product.originalPrice)} TL
                      </div>
                    )}

                    <div className="current-price">
                      {formatPrice(product.price)} TL
                    </div>
                  </div>

                  {/* BUTONLAR */}
                  <div className="product-actions">
                    <button
                      className="add-to-cart-btn"
                      disabled={!product.inStock}
                      onClick={() => addToCart(product, 1)}
                    >
                      {product.inStock ? "SEPETE EKLE" : "STOKTA YOK"}
                    </button>

                    <Link
                      to={`/product/${product.id}`}
                      className="view-details-btn"
                    >
                      Detaylı İncele
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ÜRÜN YOKSA */}
          {filteredProducts.length === 0 && (
            <div className="no-products">
              <h3>Ürün bulunamadı</h3>
              <p>Filtreleri değiştirip tekrar deneyin.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;