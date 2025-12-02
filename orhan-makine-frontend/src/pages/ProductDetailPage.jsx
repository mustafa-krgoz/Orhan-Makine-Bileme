import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../styles/ProductDetailPage.css';
import { productsData } from "../data/productsData";
import { useFavorites } from "../context/FavoritesContext";
import { useCart } from "../context/CartContext";
import ShareModal from '../components/ShareModel/ShareModel';
import { 
  FaTruck, FaShieldAlt, FaUndo, FaHeart, FaExchangeAlt, 
  FaTag, FaStar, FaShareAlt, FaShoppingCart, FaBolt
} from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [showShareModal, setShowShareModal] = useState(false);

  const { isFavorite, toggleFavorite } = useFavorites();
  const { addToCart } = useCart();

  const product = productsData.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <div className="product-not-found">
        <h2>Ürün bulunamadı</h2>
        <Link to="/products" className="back-to-products">Ürünlere Dön</Link>
      </div>
    );
  }

  const images = product.images || [product.image];

  const specifications = product.specifications || {
    "Tipi": "A Tip",
    "Uyumlu Makine": "EXF5121",
    "Kazıma Genişliği": "25 mm",
    "Kazıma Derinliği": "15 - 25 mm",
    "Paket İçeriği": "1 ADET",
    "Stok Kodu": product.stockCode || "rm_EX75127",
    "Marka": product.brand || "EUROMAX"
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('tr-TR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(price);
  };

  const calculateDiscount = () => {
    if (!product.originalPrice || product.price >= product.originalPrice) return 0;
    return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  };

  const discountPercentage = calculateDiscount();

  const calculateInstallment = () => {
    const monthly = product.price / 12;
    return formatPrice(monthly);
  };

  const handleFavoriteClick = () => {
    toggleFavorite(product.id);
    toast.success(isFavorite(product.id) ? 'Favorilerden çıkarıldı' : 'Favorilere eklendi');
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast.success(`${product.name} sepete eklendi!`, {
      icon: '🛒',
      position: "bottom-right",
      autoClose: 3000,
    });
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    window.location.href = '/cart';
  };

  const productUrl = window.location.href;

  return (
    <div className="product-detail-page">
      <ToastContainer />
      
      {/* PAYLAŞIM MODAL'I */}
      <ShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        productName={product.name}
        productUrl={productUrl}
      />

      <div className="container">

        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <Link to="/">Ana Sayfa</Link>
          <span> / </span>
          <Link to="/products">Ürünler</Link>
          <span> / </span>
          <Link to={`/products?category=${product.category}`}>
            {product.category}
          </Link>
          <span> / </span>
          <span className="current">{product.name}</span>
        </nav>

        <div className="product-main">

          {/* SOL — Ürün galerisi */}
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
              {product.isCampaign && <div className="campaign-badge">KAMPANYA</div>}
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

          {/* ORTA — Ürün Info */}
          <div className="product-info">

            <div className="product-header">
              <h1 className="product-title">{product.name}</h1>

              <div className="product-meta">
                <span className="brand">{product.brand}</span>
                <span className="separator">•</span>
                <span className="stock-code">Stok Kodu: {product.stockCode || "rm_EX75127"}</span>
                <span className="separator">•</span>
                <span className="category">{product.category}</span>
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
                <span className="rating-score">{product.rating || 4.0}/5</span>
                <span className="review-count">({product.reviewCount || 0} yorum)</span>
                <button className="write-review">Yorum Yap</button>
              </div>
            </div>

            {/* Fiyat alanı */}
            <div className="price-section">
              {product.originalPrice && product.originalPrice > product.price && (
                <div className="original-price">
                  <span className="old-price">{formatPrice(product.originalPrice)} TL</span>
                  <span className="discount-percent">%{discountPercentage}</span>
                </div>
              )}
              <div className="current-price">{formatPrice(product.price)} TL</div>

              <div className="price-details">
                <div className="installment-info">
                  <FaTag className="installment-icon" />
                  <span>{calculateInstallment()} TL x 12 taksit</span>
                </div>
                {product.price > 1000 && (
                  <div className="cash-discount">
                    <FaBolt className="cash-icon" />
                    <span>Peşin fiyatına {formatPrice(product.price * 0.95)} TL</span>
                  </div>
                )}
              </div>
            </div>

            {/* Stok bilgisi */}
            <div className="stock-info">
              <div className={`stock-status ${product.inStock ? 'in-stock' : 'out-of-stock'}`}>
                {product.inStock ? (
                  <>
                    <span className="stock-icon">✓</span>
                    <span>Stokta Var</span>
                  </>
                ) : (
                  <>
                    <span className="stock-icon">✗</span>
                    <span>Stokta Yok</span>
                  </>
                )}
              </div>

              {product.inStock && (
                <div className="shipping-time">
                  <FaTruck /> 
                  <div>
                    <strong>Aynı gün kargo</strong>
                    <small>Saat 17:00'a kadar verilen siparişler</small>
                  </div>
                </div>
              )}
            </div>

            {/* Ürün Özellikleri */}
            <div className="product-features">
              <h3>Öne Çıkan Özellikler</h3>
              <ul>
                {product.features.map((f, i) => (
                  <li key={i}>
                    <span className="feature-check">✓</span> 
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Adet */}
            <div className="quantity-section">
              <label>Adet:</label>
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
                  value={quantity} 
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  min="1"
                  max="99"
                />
                <button 
                  onClick={() => setQuantity(q => q + 1)}
                  aria-label="Arttır"
                >
                  +
                </button>
              </div>
              <div className="quantity-note">Maksimum 99 adet</div>
            </div>

            {/* BUTONLAR */}
            <div className="action-buttons">
              <button 
                className="btn-add-to-cart" 
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                <FaShoppingCart /> SEPETE EKLE
              </button>
              <button 
                className="btn-buy-now" 
                onClick={handleBuyNow}
                disabled={!product.inStock}
              >
                HEMEN AL
              </button>

              {/* BUTON GRUBU */}
              <div className="action-button-group">
                {/* FAVORİ */}
                <button 
                  className={`btn-favorite ${isFavorite(product.id) ? "active" : ""}`}
                  onClick={handleFavoriteClick}
                  aria-label={isFavorite(product.id) ? "Favorilerden çıkar" : "Favorilere ekle"}
                >
                  <FaHeart />
                </button>

                {/* PAYLAŞ */}
                <button 
                  className="btn-share" 
                  onClick={() => setShowShareModal(true)}
                  aria-label="Paylaş"
                >
                  <FaShareAlt />
                </button>
              </div>
            </div>

            {/* Garanti */}
            <div className="guarantee-section">
              <div className="guarantee-item">
                <FaUndo />
                <div>
                  <span>14 Gün İade</span>
                  <small>Koşulsuz iade</small>
                </div>
              </div>
              <div className="guarantee-item">
                <FaShieldAlt />
                <div>
                  <span>2 Yıl Garanti</span>
                  <small>Resmi garanti</small>
                </div>
              </div>
              <div className="guarantee-item">
                <FaExchangeAlt />
                <div>
                  <span>Kolay Değişim</span>
                  <small>7 gün içinde</small>
                </div>
              </div>
            </div>

            {/* Hızlı Satın Alma */}
            <div className="quick-buy-section">
              <h4>Hızlı Satın Alma</h4>
              <div className="quick-buy-options">
                <button className="quick-buy-btn" onClick={() => {
                  setQuantity(1);
                  handleAddToCart();
                }}>
                  1 Adet Satın Al
                </button>
                <button className="quick-buy-btn" onClick={() => {
                  setQuantity(2);
                  handleAddToCart();
                }}>
                  2 Adet Satın Al
                </button>
              </div>
            </div>

          </div>

          {/* SAĞ — Kargo / Ödeme / İletişim */}
          <div className="product-sidebar">

            <div className="shipping-card">
              <div className="card-header">
                <FaTruck />
                <h3>Kargo Bilgisi</h3>
              </div>
              <div className="shipping-details">
                <div className="shipping-item">
                  <strong>Ücretsiz Kargo:</strong>
                  <span className="free-shipping">500 TL +</span>
                </div>
                <div className="shipping-item">
                  <strong>Kargo Süresi:</strong>
                  <span>1-3 iş günü</span>
                </div>
                <div className="shipping-item">
                  <strong>Kapıda Ödeme:</strong>
                  <span className="available">Mevcut</span>
                </div>
                <div className="shipping-item">
                  <strong>Kargo Firmaları:</strong>
                  <div className="couriers">
                    <span>Aras</span>
                    <span>Yurtiçi</span>
                    <span>Sürat</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="payment-card">
              <h3>Ödeme Seçenekleri</h3>
              <div className="payment-methods">
                <div className="payment-method active">
                  <span className="method-icon">💳</span>
                  <span>Kredi Kartı</span>
                  <small>Tek çekim/taksit</small>
                </div>
                <div className="payment-method">
                  <span className="method-icon">🏦</span>
                  <span>Havale/EFT</span>
                  <small>%3 indirim</small>
                </div>
                <div className="payment-method">
                  <span className="method-icon">🚚</span>
                  <span>Kapıda Ödeme</span>
                  <small>+20 TL</small>
                </div>
              </div>
            </div>

            {/* İLETİŞİM */}
            <div className="contact-card">
              <h3>Yardım İster misiniz?</h3>
              <p>Ürünle ilgili sorularınız için bize ulaşın.</p>
              <div className="contact-options">
                <a href="tel:+905001234567" className="contact-option">
                  <span className="option-icon">📞</span>
                  <div>
                    <span>Telefon</span>
                    <small>+90 (500) 123 45 67</small>
                  </div>
                </a>
                <a href="mailto:info@orhanmakine.com" className="contact-option">
                  <span className="option-icon">✉️</span>
                  <div>
                    <span>E-posta</span>
                    <small>info@orhanmakine.com</small>
                  </div>
                </a>
              </div>
              <Link to="/contact" className="btn-contact">
                İletişime Geç
              </Link>
            </div>

            {/* GÜVENLİ ALIŞVERİŞ */}
            <div className="security-card">
              <h3>Güvenli Alışveriş</h3>
              <div className="security-features">
                <div className="security-item">
                  <span className="security-icon">🔒</span>
                  <span>SSL Sertifikası</span>
                </div>
                <div className="security-item">
                  <span className="security-icon">🏛️</span>
                  <span>Banka Onaylı</span>
                </div>
                <div className="security-item">
                  <span className="security-icon">🛡️</span>
                  <span>3D Secure</span>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* TAB'LAR */}
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
              Yorumlar ({product.reviewCount || 0})
            </button>
            <button 
              className={`tab-header ${activeTab === 'questions' ? 'active' : ''}`}
              onClick={() => setActiveTab('questions')}
            >
              Soru & Cevap ({product.qnaCount || 0})
            </button>
            <button 
              className={`tab-header ${activeTab === 'documents' ? 'active' : ''}`}
              onClick={() => setActiveTab('documents')}
            >
              Dokümanlar
            </button>
          </div>

          <div className="tab-content">
            {activeTab === 'description' && (
              <div className="tab-panel">
                <div className="description-content">
                  <h3>Ürün Açıklaması</h3>
                  <div className="description-text">
                    <p>{product.description}</p>
                    <p className="additional-info">
                      Bu ürün profesyonel kullanım için tasarlanmıştır. Yüksek kaliteli malzemelerden üretilmiştir ve uzun ömürlü kullanım sunar.
                    </p>
                  </div>
                  <div className="description-features">
                    <h4>Ekstra Özellikler</h4>
                    <ul>
                      <li>Yüksek performanslı motor</li>
                      <li>Uzun ömürlü kullanım</li>
                      <li>Enerji tasarrufu</li>
                      <li>Kolay bakım</li>
                    </ul>
                  </div>
                </div>
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
                <div className="spec-notes">
                  <h4>Notlar:</h4>
                  <ul>
                    <li>Tüm ölçüler yaklaşık değerlerdir.</li>
                    <li>Ürün görselleri temsilidir.</li>
                    <li>Teknik özellikler üretici firma tarafından değiştirilebilir.</li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="tab-panel">
                <div className="reviews-header">
                  <h3>Müşteri Yorumları</h3>
                  <button className="btn-write-review">Yorum Yap</button>
                </div>
                {product.reviewCount > 0 ? (
                  <div className="reviews-list">
                    <div className="review-summary">
                      <div className="average-rating">
                        <span className="rating-number">{product.rating || 4.0}</span>
                        <div className="rating-stars">
                          {[...Array(5)].map((_, i) => (
                            <FaStar key={i} className={i < Math.floor(product.rating || 4) ? "star-filled" : "star-empty"} />
                          ))}
                        </div>
                        <span className="total-reviews">{product.reviewCount || 0} yorum</span>
                      </div>
                    </div>
                    <div className="no-reviews-message">
                      <p>Henüz yorum yapılmamış. İlk yorumu siz yapın!</p>
                    </div>
                  </div>
                ) : (
                  <div className="no-reviews">
                    <div className="no-reviews-icon">📝</div>
                    <h4>Henüz Yorum Yok</h4>
                    <p>Bu ürün için henüz müşteri yorumu bulunmuyor.</p>
                    <button className="btn-be-first">İlk Yorumu Sen Yap</button>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'questions' && (
              <div className="tab-panel">
                <div className="questions-header">
                  <h3>Soru & Cevap</h3>
                  <button className="btn-ask-question">Soru Sor</button>
                </div>
                {product.qnaCount > 0 ? (
                  <div className="questions-list">
                    {/* Soru-cevap listesi buraya gelecek */}
                  </div>
                ) : (
                  <div className="no-questions">
                    <div className="no-questions-icon">❓</div>
                    <h4>Henüz Soru Yok</h4>
                    <p>Bu ürün için henüz soru sorulmamış.</p>
                    <button className="btn-ask-first">İlk Soruyu Sen Sor</button>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'documents' && (
              <div className="tab-panel">
                <h3>Dokümanlar</h3>
                <div className="documents-list">
                  <div className="document-item">
                    <span className="doc-icon">📄</span>
                    <div className="doc-info">
                      <h4>Kullanım Kılavuzu</h4>
                      <p>PDF - 2.4 MB</p>
                    </div>
                    <button className="btn-download">İndir</button>
                  </div>
                  <div className="document-item">
                    <span className="doc-icon">📋</span>
                    <div className="doc-info">
                      <h4>Teknik Çizim</h4>
                      <p>DWG - 5.1 MB</p>
                    </div>
                    <button className="btn-download">İndir</button>
                  </div>
                  <div className="document-item">
                    <span className="doc-icon">📊</span>
                    <div className="doc-info">
                      <h4>Garanti Belgesi</h4>
                      <p>PDF - 1.2 MB</p>
                    </div>
                    <button className="btn-download">İndir</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* BENZER ÜRÜNLER */}
        <div className="related-products">
          <h3>Benzer Ürünler</h3>
          <div className="related-products-grid">
            {/* Buraya benzer ürünlerin listesi gelecek */}
            <div className="related-placeholder">
              <p>Benzer ürünler yükleniyor...</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductDetailPage;