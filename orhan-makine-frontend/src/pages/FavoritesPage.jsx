import React from "react";
import { Link } from "react-router-dom";

// Optimize edilmiş resim yükleme bileşeni (WebP + Lazy Loading)
import OptimizedImage from "../components/OptimizedImage";

import { useFavorites } from "../context/FavoritesContext";
import { useCart } from "../context/CartContext"; // CartContext'i import et
import { ShoppingCart, Heart, Trash2, Eye, Check } from "lucide-react";

import "../styles/FavoritesPage.css";

export default function FavoritesPage() {
  const { favorites, toggleFavorite, favoritesCount } = useFavorites();
  const { addToCart, cartItems } = useCart(); // CartContext'i kullan

  // Fiyat formatlama fonksiyonu (TRL uyumlu)
  const formatPrice = (price) =>
    new Intl.NumberFormat("tr-TR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);

  // İndirim yüzdesi hesaplama
  const calculateDiscount = (original, current) =>
    Math.round(((original - current) / original) * 100);

  // Sepete ekleme fonksiyonu - GERÇEK SEPET CONTEXT'İ KULLAN
  const handleAddToCart = (productId, e) => { // DEĞİŞTİ: product yerine productId alıyor
    e.preventDefault();
    e.stopPropagation();
    
    // Sepete ekle - sadece productId gönder
    addToCart(productId, 1);
    
    // Başarı mesajı (isteğe bağlı)
    const product = favorites.find(p => p.id === productId);
    if (product) {
      showToastMessage(`${product.name} sepete eklendi!`);
    }
  };

  // Toast mesajı gösterme (isteğe bağlı)
  const showToastMessage = (message) => {
    // Mevcut bir toast varsa kaldır
    const existingToast = document.querySelector('.cart-toast-message');
    if (existingToast) {
      existingToast.remove();
    }

    // Basit bir toast mesajı oluştur
    const toast = document.createElement('div');
    toast.className = 'cart-toast-message';
    toast.innerHTML = `
      <div class="toast-content" style="display: flex; align-items: center; gap: 8px;">
        <span>${message}</span>
      </div>
    `;
    toast.style.cssText = `
      position: fixed;
      top: 100px;
      right: 20px;
      background: #10b981;
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      z-index: 9999;
      animation: slideIn 0.3s ease-out;
      font-family: Arial, sans-serif;
    `;
    
    document.body.appendChild(toast);
    
    // 3 saniye sonra kaldır
    setTimeout(() => {
      toast.style.animation = 'slideOut 0.3s ease-out';
      setTimeout(() => {
        if (toast.parentNode) {
          document.body.removeChild(toast);
        }
      }, 300);
    }, 3000);
  };

  // CSS animasyonları ekle (sayfa yüklendiğinde)
  React.useEffect(() => {
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
        document.head.removeChild(style);
      }
    };
  }, []);

  // Favoriden kaldırma click'ini durdurma
  const handleRemoveFavorite = (productId, e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(productId);
  };

  // Ürünün sepette olup olmadığını kontrol et
  const isProductInCart = (productId) => {
    return cartItems.some(item => item.id === productId);
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
              {favorites.map((product) => {
                const inCart = isProductInCart(product.id);
                
                return (
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
                        className={`btn-add-to-cart ${inCart ? 'in-cart' : ''}`}
                        onClick={(e) => handleAddToCart(product.id, e)} // DEĞİŞTİ: product.id gönder
                        disabled={!product.inStock || inCart}
                      >
                        {inCart ? (
                          <>
                            <Check size={18} />
                            <span>Sepete Eklendi</span>
                          </>
                        ) : (
                          <>
                            <ShoppingCart size={18} />
                            <span>Sepete Ekle</span>
                          </>
                        )}
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
                );
              })}
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