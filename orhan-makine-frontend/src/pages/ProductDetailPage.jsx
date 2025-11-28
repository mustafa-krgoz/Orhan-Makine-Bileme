import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../styles/ProductDetailPage.css';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  // Burada normalde API'den ürün detayı çekilir, şimdilik mock data kullanıyoruz
  const product = {
    id: 1,
    name: "CORA Kompresör",
    category: "kompresor",
    subCategory: "elektrikli",
    brand: "CORA",
    price: 7900,
    originalPrice: 8500,
    images: [
      "/images/CORA-KOMPRESOR-2.5HP-100L.png",
      "/images/CORA-KOMPRESOR-2.5HP-100L.png",
      "/images/CORA-KOMPRESOR-2.5HP-100L.png"
    ],
    description: "Güçlü ve sessiz çalışan kompresör. Profesyonel kullanıma uygun, yüksek performanslı kompresör modeli. Düşük enerji tüketimi ile uzun süreli kullanım sağlar.",
    features: ["Yüksek basınç kapasitesi", "Düşük enerji tüketimi", "Sessiz çalışma", "2 yıl garanti", "Termik koruma", "Otomatik basınç kontrolü"],
    specifications: {
      "Güç": "2.5 HP",
      "Kapasite": "100 Litre",
      "Maksimum Basınç": "8 Bar",
      "Ağırlık": "45 kg",
      "Boyutlar": "60x40x80 cm",
      "Hava Çıkışı": "1/4 inch",
      "Motor Tipi": "Direk tahrik",
      "Ses Seviyesi": "65 dB"
    },
    inStock: true,
    isNew: true,
    isCampaign: true,
    rating: 4.5,
    reviewCount: 24,
    reviews: [
      { id: 1, user: "Ahmet Y.", rating: 5, comment: "Çok sessiz ve güçlü, tavsiye ederim.", date: "2024-01-15" },
      { id: 2, user: "Mehmet K.", rating: 4, comment: "Fiyat/performans ürünü, memnunum.", date: "2024-01-10" }
    ]
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('tr-TR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(price);
  };

  const calculateDiscount = (original, current) => {
    return Math.round(((original - current) / original) * 100);
  };

  if (!product) {
    return <div className="product-not-found">Ürün bulunamadı.</div>;
  }

  return (
    <div className="product-detail-page">
      <div className="product-detail-container">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <Link to="/">Ana Sayfa</Link>
          <span> / </span>
          <Link to="/products">Ürünler</Link>
          <span> / </span>
          <span>{product.name}</span>
        </nav>

        <div className="product-detail-content">
          {/* Sol Taraf - Görseller */}
          <div className="product-images">
            <div className="main-image">
              <img src={product.images[selectedImage]} alt={product.name} />
              {product.isNew && <span className="product-badge new">YENİ</span>}
              {product.isCampaign && <span className="product-badge campaign">KAMPANYA</span>}
            </div>
            <div className="image-thumbnails">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img src={image} alt={`${product.name} ${index + 1}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Sağ Taraf - Ürün Bilgileri */}
          <div className="product-info">
            <div className="product-header">
              <h1 className="product-title">{product.name}</h1>
              <div className="product-rating">
                <div className="stars">
                  {'★'.repeat(Math.floor(product.rating))}
                  {'☆'.repeat(5 - Math.floor(product.rating))}
                </div>
                <span className="rating-text">({product.reviewCount} değerlendirme)</span>
              </div>
            </div>

            <div className="product-brand">{product.brand}</div>

            <div className="product-pricing">
              {product.price < product.originalPrice && (
                <div className="original-price">{formatPrice(product.originalPrice)} TL</div>
              )}
              <div className="current-price">{formatPrice(product.price)} TL</div>
              {product.price < product.originalPrice && (
                <div className="discount-badge">
                  %{calculateDiscount(product.originalPrice, product.price)} İNDİRİM
                </div>
              )}
            </div>

            <div className="product-stock">
              <span className={`stock-status ${product.inStock ? 'in-stock' : 'out-of-stock'}`}>
                {product.inStock ? '✓ Stokta' : 'Stokta Yok'}
              </span>
            </div>

            <div className="product-features">
              <h3>Öne Çıkan Özellikler</h3>
              <ul>
                {product.features.map((feature, index) => (
                  <li key={index}>✓ {feature}</li>
                ))}
              </ul>
            </div>

            <div className="product-actions">
              <div className="quantity-selector">
                <label>Adet:</label>
                <div className="quantity-controls">
                  <button 
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <span>{quantity}</span>
                  <button onClick={() => setQuantity(q => q + 1)}>+</button>
                </div>
              </div>

              <div className="action-buttons">
                <button className="add-to-cart-btn" disabled={!product.inStock}>
                  SEPETE EKLE
                </button>
                <button className="buy-now-btn" disabled={!product.inStock}>
                  HEMEN AL
                </button>
                <button className="favorite-btn">❤</button>
              </div>
            </div>

            <div className="product-shipping">
              <div className="shipping-info">
                <span>🚚 Aynı Gün Kargo</span>
                <span>🔄 14 Gün İade</span>
                <span>🛡️ 2 Yıl Garanti</span>
              </div>
            </div>
          </div>
        </div>

        {/* Alt Kısım - Detaylar */}
        <div className="product-details-tabs">
          <div className="tab-headers">
            <button 
              className={`tab-header ${activeTab === 'description' ? 'active' : ''}`}
              onClick={() => setActiveTab('description')}
            >
              Ürün Açıklaması
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
              Değerlendirmeler ({product.reviewCount})
            </button>
          </div>

          <div className="tab-content">
            {activeTab === 'description' && (
              <div className="tab-panel">
                <h3>Ürün Açıklaması</h3>
                <p>{product.description}</p>
                <div className="feature-details">
                  <h4>Detaylı Özellikler</h4>
                  <ul>
                    {product.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'specifications' && (
              <div className="tab-panel">
                <h3>Teknik Özellikler</h3>
                <div className="specifications-table">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="spec-row">
                      <div className="spec-name">{key}</div>
                      <div className="spec-value">{value}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="tab-panel">
                <h3>Müşteri Değerlendirmeleri</h3>
                <div className="reviews-summary">
                  <div className="average-rating">
                    <div className="rating-score">{product.rating}</div>
                    <div className="rating-stars">
                      {'★'.repeat(Math.floor(product.rating))}
                      {'☆'.repeat(5 - Math.floor(product.rating))}
                    </div>
                    <div className="rating-count">{product.reviewCount} değerlendirme</div>
                  </div>
                </div>
                <div className="reviews-list">
                  {product.reviews.map(review => (
                    <div key={review.id} className="review-item">
                      <div className="review-header">
                        <div className="review-user">{review.user}</div>
                        <div className="review-rating">
                          {'★'.repeat(review.rating)}
                          {'☆'.repeat(5 - review.rating)}
                        </div>
                        <div className="review-date">{review.date}</div>
                      </div>
                      <div className="review-comment">{review.comment}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;