// src/pages/FavoritesPage.jsx
import React from "react";
import { Link } from "react-router-dom";

// Optimize edilmiş resim yükleme bileşeni (WebP + Lazy Loading)
import OptimizedImage from "../components/OptimizedImage";

import { useFavorites } from "../context/FavoritesContext";
import { ShoppingCart, Heart, Trash2, Eye } from "lucide-react";

import "../styles/FavoritesPage.css";

export default function FavoritesPage() {
  const { favorites, toggleFavorite, favoritesCount } = useFavorites();

  // Fiyat formatlama fonksiyonu (TRL uyumlu)
  const formatPrice = (price) =>
    new Intl.NumberFormat("tr-TR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);

  // İndirim yüzdesi hesaplama
  const calculateDiscount = (original, current) =>
    Math.round(((original - current) / original) * 100);

  // Sepete ekleme click'ini durdurma
  const handleAddToCart = (product, e) => {
    e.preventDefault();
    e.stopPropagation();
    alert(`${product.name} sepete eklendi!`);
  };

  // Favoriden kaldırma click'ini durdurma
  const handleRemoveFavorite = (productId, e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(productId);
  };

  return (
    <div className="favorites-page">
      <div className="favorites-container">
        
        {/* ------------------------------
            BAŞLIK BÖLÜMÜ + FAVORİ SAYISI
        ------------------------------- */}
        <header className="favorites-header">
          <div className="header-left">
            <h1 className="page-title">
              <Heart className="title-icon" />
              Favori Ürünlerim
            </h1>
            <p className="page-subtitle">
              Beğendiğiniz ürünleri burada kolayca takip edebilirsiniz.
            </p>
          </div>

          <div className="header-right">
            <div className="favorites-count">
              <span className="count-number">{favoritesCount}</span>
              <span className="count-text">ürün</span>
            </div>
          </div>
        </header>

        {/* FAVORİLER BOŞSA */}
        {favorites.length === 0 ? (
          <section className="empty-favorites">
            <div className="empty-icon">
              <Heart size={60} />
            </div>
            <h2>Henüz favori ürününüz yok</h2>
            <p>Ürünleri kalp ikonuna basarak favorilerinize ekleyebilirsiniz.</p>

            <Link to="/products" className="browse-products-btn">
              Ürünlere Göz At
            </Link>
          </section>
        ) : (
          <>
            {/* ---------------------------------------------------------
                FAVORİ ÜRÜNLER GRID
                Lazy loading + WebP + SEO-friendly alt text
            ----------------------------------------------------------- */}
            <div className="favorites-grid">
              {favorites.map((product) => (
                <article
                  key={product.id}
                  className="favorite-card"
                  aria-label={`${product.name} favori ürün kartı`}
                >
                  {/* ------------------------------
                      ÜRÜN RESMİ + BADGELER
                  ------------------------------- */}
                  <div className="favorite-image-container">

                    {/* WebP destekli lazy load optimize bileşeni */}
                    <OptimizedImage
                      src={product.image}
                      alt={`${product.name} ürün resmi`}
                      className="favorite-image"
                      loading="lazy"
                      onError={(e) => {
                        e.target.src = "/images/default-product.png";
                      }}
                    />

                    <div className="favorite-badges">
                      {product.isNew && <span className="badge new">YENİ</span>}

                      {product.originalPrice &&
                        product.price < product.originalPrice && (
                          <span className="badge discount">
                            %{calculateDiscount(
                              product.originalPrice,
                              product.price
                            )}
                          </span>
                        )}
                    </div>

                    {/* Favoriden kaldırma */}
                    <button
                      className="remove-fav-btn-icon"
                      onClick={(e) => handleRemoveFavorite(product.id, e)}
                      aria-label="Favorilerden kaldır"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  {/* ------------------------------
                      ÜRÜN BİLGİLERİ
                  ------------------------------- */}
                  <div className="favorite-info">
                    
                    <div className="product-brand">{product.brand}</div>

                    <h3 className="product-name">
                      <Link to={`/product/${product.id}`}>
                        {product.name}
                      </Link>
                    </h3>

                    {/* Fiyat Bilgisi */}
                    <div className="product-pricing">
                      {product.originalPrice &&
                        product.price < product.originalPrice && (
                          <div className="original-price">
                            {formatPrice(product.originalPrice)} TL
                          </div>
                        )}
                      <div className="current-price">
                        {formatPrice(product.price)} TL
                      </div>
                    </div>

                    {/* Stok durumu */}
                    <div className="product-stock">
                      <span
                        className={`stock-status ${
                          product.inStock ? "in-stock" : "out-of-stock"
                        }`}
                      >
                        {product.inStock ? "✓ Stokta" : "Stokta Yok"}
                      </span>
                    </div>
                  </div>

                  {/* ------------------------------
                      SEPET VE DETAY BUTONLARI
                  ------------------------------- */}
                  <div className="favorite-actions">
                    <button
                      className="btn-add-to-cart"
                      onClick={(e) => handleAddToCart(product, e)}
                      disabled={!product.inStock}
                    >
                      <ShoppingCart size={18} />
                      <span>Sepete Ekle</span>
                    </button>

                    <Link
                      to={`/product/${product.id}`}
                      className="btn-view-details"
                      aria-label={`${product.name} detaylarını görüntüle`}
                    >
                      <Eye size={18} />
                      <span>Detaylar</span>
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            {/* ------------------------------
                SAYFA ALT NOTLARI
            ------------------------------- */}
            <footer className="favorites-footer">
              <div className="footer-info">
                <p>
                  <strong>Not:</strong> Favori ürünleriniz burada kaydedilir. 
                  Daha sonra sepete ekleyebilir veya silebilirsiniz.
                </p>
              </div>

              <div className="footer-actions">
                <Link to="/products" className="btn-continue-shopping">
                  Alışverişe Devam Et
                </Link>

                <button
                  className="btn-clear-all"
                  onClick={() => {
                    if (
                      window.confirm(
                        "Tüm favorileri silmek istediğinize emin misiniz?"
                      )
                    ) {
                      favorites.forEach((product) => toggleFavorite(product.id));
                    }
                  }}
                >
                  Tümünü Temizle
                </button>
              </div>
            </footer>
          </>
        )}
      </div>
    </div>
  );
}