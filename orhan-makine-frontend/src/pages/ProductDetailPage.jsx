import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../styles/ProductDetailPage.css';
import { productsData } from "../data/productsData";
import { useFavorites } from "../context/FavoritesContext"; // ⭐ Favori context'i import et
import { FaTruck, FaShieldAlt, FaUndo, FaHeart, FaExchangeAlt, FaTag, FaStar, FaShareAlt } from 'react-icons/fa';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  
  // ⭐ FAVORİ CONTEXT'İNİ KULLAN
  const { isFavorite, toggleFavorite } = useFavorites();

  // Ürünü bul
  const product = productsData.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <div className="product-not-found">
        <h2>Ürün bulunamadı</h2>
        <Link to="/products" className="back-to-products">Ürünlere Dön</Link>
      </div>
    );
  }

  // Resimleri hazırla
  const images = product.images || [product.image];
  
  // Teknik özellikler için veri hazırla (örnek)
  const specifications = product.specifications || {
    "Tipi": "A Tip",
    "Uyumlu Makine": "EXF5121",
    "Kazıma Genişliği": "25 mm",
    "Kazıma Derinliği": "15 - 25 mm",
    "Paket İçeriği": "1 ADET",
    "Stok Kodu": product.stockCode || "rm_EX75127",
    "Marka": product.brand || "EUROMAX"
  };

  // Fiyat formatlama
  const formatPrice = (price) => {
    return new Intl.NumberFormat('tr-TR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(price);
  };

  // İndirim hesaplama
  const calculateDiscount = () => {
    if (!product.originalPrice || product.price >= product.originalPrice) return 0;
    return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  };

  const discountPercentage = calculateDiscount();

  // Taksit hesaplama (örnek)
  const calculateInstallment = () => {
    const monthly = product.price / 12;
    return formatPrice(monthly);
  };

  // ⭐ FAVORİ BUTONU TIKLANINCA
  const handleFavoriteClick = () => {
    toggleFavorite(product.id);
  };

  return (
    <div className="product-detail-page">
      <div className="container">
        
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <Link to="/">Ana Sayfa</Link>
          <span> / </span>
          <Link to="/products">Ürünler</Link>
          <span> / </span>
          <Link to={`/products?category=${product.category}`}>{product.category}</Link>
          <span> / </span>
          <span className="current">{product.name}</span>
        </nav>

        <div className="product-main">
          
          {/* Sol Kolon - Ürün Görselleri */}
          <div className="product-gallery">
            <div className="main-image-container">
              <img 
                src={images[selectedImage]} 
                alt={product.name}
                className="main-image"
                loading="lazy"
              />
              {discountPercentage > 0 && (
                <div className="discount-badge-large">
                  %{discountPercentage} İNDİRİM
                </div>
              )}
              {product.isNew && <div className="new-badge">YENİ</div>}
            </div>

            <div className="thumbnail-gallery">
              {images.map((img, index) => (
                <button
                  key={index}
                  className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                  onClick={() => setSelectedImage(index)}
                  aria-label={`Resim ${index + 1}`}
                >
                  <img src={img} alt={`${product.name} - ${index + 1}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Orta Kolon - Ürün Bilgileri */}
          <div className="product-info">
            <div className="product-header">
              <h1 className="product-title">{product.name}</h1>
              
              <div className="product-meta">
                <span className="brand">{product.brand}</span>
                <span className="separator">•</span>
                <span className="stock-code">Stok Kodu: {product.stockCode || "rm_EX75127"}</span>
              </div>

              <div className="rating-section">
                <div className="stars">
                  {[...Array(5)].map((_, i) => (
                    <FaStar 
                      key={i} 
                      className={i < Math.floor(product.rating || 4) ? "star-filled" : "star-empty"} 
                    />
                  ))}
                </div>
                <span className="review-count">({product.reviewCount || 0} yorum)</span>
                <button className="write-review">Yorum Yap</button>
              </div>
            </div>

            <div className="price-section">
              {product.originalPrice && product.originalPrice > product.price && (
                <div className="original-price">
                  <span className="old-price">{formatPrice(product.originalPrice)} TL</span>
                  <span className="discount-percent">%{discountPercentage}</span>
                </div>
              )}
              
              <div className="current-price">{formatPrice(product.price)} TL</div>
              
              <div className="installment-info">
                <FaTag className="installment-icon" />
                <span>{calculateInstallment()} TL x 12 taksit</span>
              </div>
            </div>

            <div className="stock-info">
              <div className={`stock-status ${product.inStock ? 'in-stock' : 'out-of-stock'}`}>
                {product.inStock ? '✓ Stokta Var' : 'Stokta Yok'}
              </div>
              {product.inStock && (
                <div className="shipping-time">
                  <FaTruck /> Aynı gün kargo
                </div>
              )}
            </div>

            <div className="product-features">
              <h3>Öne Çıkan Özellikler</h3>
              <ul>
                {product.features?.map((feature, index) => (
                  <li key={index}>
                    <span className="feature-check">✓</span>
                    {feature}
                  </li>
                )) || (
                  <>
                    <li><span className="feature-check">✓</span> Orijinal EUROMAX Ürünü</li>
                    <li><span className="feature-check">✓</span> Yüksek Kalite</li>
                    <li><span className="feature-check">✓</span> Uyumlu Makineler için</li>
                  </>
                )}
              </ul>
            </div>

            <div className="quantity-section">
              <label htmlFor="quantity">Adet:</label>
              <div className="quantity-control">
                <button 
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                  aria-label="Azalt"
                >
                  −
                </button>
                <input
                  type="number"
                  id="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  min="1"
                />
                <button 
                  onClick={() => setQuantity(q => q + 1)}
                  aria-label="Arttır"
                >
                  +
                </button>
              </div>
            </div>

            <div className="action-buttons">
              <button 
                className="btn-add-to-cart"
                disabled={!product.inStock}
              >
                SEPETE EKLE
              </button>
              <button 
                className="btn-buy-now"
                disabled={!product.inStock}
              >
                HEMEN AL
              </button>
              
              {/* ⭐ FAVORİ BUTONU - context'ten isFavorite fonksiyonunu kullanıyoruz */}
              <button 
                className={`btn-favorite ${isFavorite(product.id) ? 'active' : ''}`}
                onClick={handleFavoriteClick}
                aria-label={isFavorite(product.id) ? "Favorilerden çıkar" : "Favorilere ekle"}
              >
                <FaHeart />
              </button>
              
              <button className="btn-share" aria-label="Paylaş">
                <FaShareAlt />
              </button>
            </div>

            <div className="guarantee-section">
              <div className="guarantee-item">
                <FaUndo />
                <span>14 Gün İade</span>
              </div>
              <div className="guarantee-item">
                <FaShieldAlt />
                <span>2 Yıl Garanti</span>
              </div>
              <div className="guarantee-item">
                <FaExchangeAlt />
                <span>Kolay Değişim</span>
              </div>
            </div>
          </div>

          {/* Sağ Kolon - Kargo ve Ödeme */}
          <div className="product-sidebar">
            <div className="shipping-card">
              <h3><FaTruck /> Kargo Bilgisi</h3>
              <div className="shipping-details">
                <p><strong>Ücretsiz Kargo:</strong> 500 TL ve üzeri alışverişlerde</p>
                <p><strong>Kargo Süresi:</strong> 1-3 iş günü</p>
                <p><strong>Kapıda Ödeme:</strong> Mevcuttur</p>
              </div>
            </div>

            <div className="payment-card">
              <h3>Ödeme Seçenekleri</h3>
              <div className="payment-methods">
                <span className="payment-method">Kredi Kartı</span>
                <span className="payment-method">Havale/EFT</span>
                <span className="payment-method">Kapıda Ödeme</span>
              </div>
              <div className="installment-note">
                <FaTag /> Taksit seçenekleri için tıklayın
              </div>
            </div>

            <div className="contact-card">
              <h3>Yardım İster misiniz?</h3>
              <p>Ürünle ilgili sorularınız için bize ulaşın.</p>
              <button className="btn-contact">İletişime Geç</button>
            </div>
          </div>
        </div>

        {/* Alt Bölüm - Tab'lar */}
        <div className="product-tabs">
          <div className="tab-headers">
            <button 
              className={`tab-header ${activeTab === 'description' ? 'active' : ''}`}
              onClick={() => setActiveTab('description')}
            >
              Ürün Bilgisi
            </button>
            <button 
              className={`tab-header ${activeTab === 'specifications' ? 'active' : ''}`}
              onClick={() => setActiveTab('specifications')}
            >
              Teknik Özellikler
            </button>
            <button 
              className={`tab-header ${activeTab === 'reviews' ? 'active' : ''}`}
              onClick={() => setActiveTab('reviews')}
            >
              Yorumlar (0)
            </button>
            <button 
              className={`tab-header ${activeTab === 'questions' ? 'active' : ''}`}
              onClick={() => setActiveTab('questions')}
            >
              Soru & Cevap
            </button>
          </div>

          <div className="tab-content">
            {activeTab === 'description' && (
              <div className="tab-panel">
                <h3>Ürün Açıklaması</h3>
                <p>{product.fullDescription || product.description}</p>
                <p>
                  <strong>EUROMAX</strong> markasının kalitesi ve güvencesiyle sunulan bu ürün, 
                  dayanıklılığı ve yüksek performansı ile öne çıkmaktadır.
                </p>
              </div>
            )}

            {activeTab === 'specifications' && (
              <div className="tab-panel">
                <h3>Teknik Özellikler</h3>
                <div className="specifications-table">
                  {Object.entries(specifications).map(([key, value]) => (
                    <div key={key} className="spec-row">
                      <div className="spec-key">{key}</div>
                      <div className="spec-value">{value}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="tab-panel">
                <h3>Müşteri Yorumları</h3>
                <div className="no-reviews">
                  <p>Bu ürün için henüz yorum yapılmamış.</p>
                  <button className="btn-write-review">İlk Yorumu Sen Yap</button>
                </div>
              </div>
            )}

            {activeTab === 'questions' && (
              <div className="tab-panel">
                <h3>Soru & Cevap</h3>
                <div className="no-questions">
                  <p>Bu ürün için henüz soru sorulmamış.</p>
                  <button className="btn-ask-question">Soru Sor</button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Benzer Ürünler Bölümü (isteğe bağlı) */}
        <div className="related-products">
          <h2>Benzer Ürünler</h2>
          <div className="related-products-grid">
            {/* Buraya benzer ürünler eklenebilir */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;