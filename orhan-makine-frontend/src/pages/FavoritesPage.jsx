import React from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from "../context/FavoritesContext";
import { ShoppingCart, Heart, Trash2, Eye } from 'lucide-react';
import '../styles/FavoritesPage.css';

export default function FavoritesPage() {
  const { favorites, toggleFavorite, favoritesCount } = useFavorites();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('tr-TR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(price);
  };

  const calculateDiscount = (original, current) => {
    return Math.round(((original - current) / original) * 100);
  };

  const handleAddToCart = (product, e) => {
    e.preventDefault();
    e.stopPropagation();
    // Sepet işlemleri burada
    console.log("Sepete eklendi:", product.name);
    alert(`${product.name} sepete eklendi!`);
  };

  const handleRemoveFavorite = (productId, e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(productId);
  };

  return (
    <div className="favorites-page">
      <div className="favorites-container">
        
        {/* BAŞLIK */}
        <div className="favorites-header">
          <div className="header-left">
            <h1 className="page-title">
              <Heart className="title-icon" />
              Favori Ürünlerim
            </h1>
            <p className="page-subtitle">
              Beğendiğiniz ürünleri burada kolayca takip edebilirsiniz
            </p>
          </div>
          
          <div className="header-right">
            <div className="favorites-count">
              <span className="count-number">{favoritesCount}</span>
              <span className="count-text">ürün</span>
            </div>
          </div>
        </div>

        {/* FAVORİ LİSTESİ */}
        {favorites.length === 0 ? (
          <div className="empty-favorites">
            <div className="empty-icon">
              <Heart size={60} />
            </div>
            <h2>Henüz favori ürününüz yok</h2>
            <p>Beğendiğiniz ürünleri kalp ikonuna tıklayarak favorilerinize ekleyebilirsiniz.</p>
            <Link to="/products" className="browse-products-btn">
              Ürünlere Gözat
            </Link>
          </div>
        ) : (
          <>
            <div className="favorites-grid">
              {favorites.map((product) => (
                <div key={product.id} className="favorite-card">
                  
                  {/* ÜRÜN RESMİ VE BADGELER */}
                  <div className="favorite-image-container">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="favorite-image"
                      onError={(e) => {
                        e.target.src = "/images/default-product.png";
                      }}
                    />
                    
                    <div className="favorite-badges">
                      {product.isNew && <span className="badge new">YENİ</span>}
                      {product.price < product.originalPrice && (
                        <span className="badge discount">
                          %{calculateDiscount(product.originalPrice, product.price)}
                        </span>
                      )}
                    </div>
                    
                    <button 
                      className="remove-fav-btn-icon"
                      onClick={(e) => handleRemoveFavorite(product.id, e)}
                      aria-label="Favorilerden çıkar"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  {/* ÜRÜN BİLGİLERİ */}
                  <div className="favorite-info">
                    <div className="product-brand">{product.brand}</div>
                    <h3 className="product-name">
                      <Link to={`/product/${product.id}`}>
                        {product.name}
                      </Link>
                    </h3>
                    
                    {/* FİYAT BİLGİSİ */}
                    <div className="product-pricing">
                      {product.originalPrice && product.price < product.originalPrice && (
                        <div className="original-price">
                          {formatPrice(product.originalPrice)} TL
                        </div>
                      )}
                      <div className="current-price">{formatPrice(product.price)} TL</div>
                    </div>

                    {/* STOK DURUMU */}
                    <div className="product-stock">
                      <span className={`stock-status ${product.inStock ? 'in-stock' : 'out-of-stock'}`}>
                        {product.inStock ? '✓ Stokta' : 'Stokta Yok'}
                      </span>
                    </div>
                  </div>

                  {/* AKSİYON BUTONLARI */}
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
                    >
                      <Eye size={18} />
                      <span>Detaylar</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* ALT BİLGİ */}
            <div className="favorites-footer">
              <div className="footer-info">
                <p>
                  <strong>Not:</strong> Favori ürünleriniz burada kalır. 
                  İstediğiniz zaman sepete ekleyebilir veya favorilerden çıkarabilirsiniz.
                </p>
              </div>
              
              <div className="footer-actions">
                <Link to="/products" className="btn-continue-shopping">
                  Alışverişe Devam Et
                </Link>
                
                <button 
                  className="btn-clear-all"
                  onClick={() => {
                    if (window.confirm('Tüm favori ürünlerinizi silmek istediğinize emin misiniz?')) {
                      favorites.forEach(product => toggleFavorite(product.id));
                    }
                  }}
                  disabled={favorites.length === 0}
                >
                  Tümünü Temizle
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}