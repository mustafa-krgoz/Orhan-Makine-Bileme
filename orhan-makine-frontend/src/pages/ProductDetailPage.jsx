import React, { useState, useRef, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import '../styles/ProductDetailPage.css';
import { productsData } from "../data/productsData";
import { useFavorites } from "../context/FavoritesContext";
import { useCart } from "../context/CartContext";
import ShareModal from '../components/ShareModel/ShareModel';
import { 
  FaTruck, FaHeart, FaExchangeAlt, 
  FaTag, FaStar, FaShareAlt, FaShoppingCart, FaBolt,
  FaCreditCard, FaUniversity, FaMoneyBill, FaShippingFast,
  FaPhone, FaEnvelope, FaComment, FaUser
} from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductDetailPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [showShareModal, setShowShareModal] = useState(false);
  const [isHoveringImage, setIsHoveringImage] = useState(false);
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [reviewName, setReviewName] = useState('');
  const [reviewEmail, setReviewEmail] = useState('');

  const reviewsTabRef = useRef(null);
  const commentFormRef = useRef(null);

  const { isFavorite, toggleFavorite } = useFavorites();
  const { addToCart } = useCart();

  const product = productsData.find((p) => p.id === Number(id));

  // URL'de yorum hash'i varsa Yorumlar tab'ına git
  useEffect(() => {
    if (location.hash === '#reviews') {
      setActiveTab('reviews');
      setTimeout(() => {
        reviewsTabRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
    if (location.hash === '#write-review') {
      setActiveTab('reviews');
      setTimeout(() => {
        commentFormRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [location]);

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
    "Stok Kodu": product.stockCode || "38248",
    "Marka": product.brand || "MACROZA"
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

  const calculateInstallment = (installmentCount = 12) => {
    const monthly = product.price / installmentCount;
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

  // Yorum yap butonuna tıklanınca Yorumlar tab'ına git
  const handleReviewClick = () => {
    setActiveTab('reviews');
    setTimeout(() => {
      reviewsTabRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // Yorum yaz butonuna tıklanınca yorum formuna git
  const handleWriteReviewClick = () => {
    setActiveTab('reviews');
    setTimeout(() => {
      commentFormRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // Yorum gönderme işlemi
  const handleSubmitReview = (e) => {
    e.preventDefault();
    
    // Basit doğrulama
    if (!reviewName.trim()) {
      toast.error('Lütfen adınızı giriniz');
      return;
    }
    
    if (!reviewEmail.trim()) {
      toast.error('Lütfen e-posta adresinizi giriniz');
      return;
    }
    
    if (!reviewRating) {
      toast.error('Lütfen puan veriniz');
      return;
    }
    
    if (!reviewText.trim()) {
      toast.error('Lütfen yorumunuzu yazınız');
      return;
    }
    
    // Burada yorumu backend'e gönderebilirsiniz
    console.log('Yorum gönderildi:', {
      name: reviewName,
      email: reviewEmail,
      rating: reviewRating,
      text: reviewText,
      productId: product.id
    });
    
    toast.success('Yorumunuz başarıyla gönderildi! Teşekkür ederiz.');
    
    // Formu temizle
    setReviewName('');
    setReviewEmail('');
    setReviewRating(0);
    setReviewText('');
  };

  // Kategori bilgilerini formatla
  const formatCategories = () => {
    if (Array.isArray(product.categories)) {
      return product.categories.join(', ');
    }
    return product.category || 'Macroza Yedek Biçakları, Kamal Açma Makinesi Yedek Biçaklar';
  };

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

          {/* SOL KOLON - Ürün Galerisi (Yeni Düzen) */}
          <div className="product-left-column">
            
            {/* Ürün Galerisi - Yeni Düzen: Küçük resimler solda, büyük resim sağda */}
            <div className="product-gallery-new">
              
              {/* SOL - Küçük Resimler (Vertical) */}
              <div className="thumbnail-gallery-vertical">
                {images.map((img, index) => (
                  <button
                    key={index}
                    className={`thumbnail-vertical ${selectedImage === index ? 'active' : ''}`}
                    onClick={() => setSelectedImage(index)}
                    aria-label={`Resim ${index + 1}`}
                  >
                    <img src={img} alt={`${product.name} - ${index + 1}`} />
                  </button>
                ))}
              </div>

              {/* SAĞ - Ana Resim */}
              <div className="main-image-section">
                <div 
                  className="main-image-container"
                  onMouseEnter={() => setIsHoveringImage(true)}
                  onMouseLeave={() => setIsHoveringImage(false)}
                >
                  <img 
                    src={images[selectedImage]}
                    alt={product.name}
                    className={`main-image ${isHoveringImage ? 'zoom-active' : ''}`}
                    loading="lazy"
                  />
                  
                  {isHoveringImage && (
                    <div className="zoom-overlay">
                      <div className="zoom-text">
                        🔍 Yakınlaştırmak için üzerine gelin
                      </div>
                    </div>
                  )}
                </div>
              </div>

            </div>

            {/* Ürün Detay Bilgileri */}
            <div className="product-details-card">
              <div className="detail-row">
                <span className="detail-label">Kategori</span>
                <span className="detail-value">{formatCategories()}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Marka</span>
                <span className="detail-value">{product.brand || "MACROZA"}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Stok Kodu</span>
                <span className="detail-value">{product.stockCode || "38248"}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Stok Durumu</span>
                <span className={`detail-value stock-status-indicator ${product.inStock ? 'in-stock' : 'out-of-stock'}`}>
                  {product.inStock ? 'Stokta Var' : 'Stokta Yok'}
                </span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Havale</span>
                <span className="detail-value eft-discount">
                  (%2.00 Havale/EFT indirimi)
                </span>
              </div>
            </div>

          </div>

          {/* ORTA KOLON - Ürün Bilgileri ve Butonlar */}
          <div className="product-middle-column">
            <div className="product-info">

              {/* Ürün Başlığı - Sadece Ürün İsmi */}
              <div className="product-header">
                <h1 className="product-title">{product.name}</h1>

                {/* Puanlama ve Yorum Yap Butonu - Marka kaldırıldı */}
                <div className="product-rating-section">
                  <div className="rating-container">
                    <span className="rating-score">{product.rating || 4.0}</span>
                    <div className="stars">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={i < Math.floor(product.rating || 4) ? "star-filled" : "star-empty"}
                        />
                      ))}
                    </div>
                    <button 
                      className="review-action-btn"
                      onClick={handleReviewClick}
                    >
                      <FaComment className="review-icon" />
                      Yorum Yap
                    </button>
                  </div>
                </div>
              </div>

              {/* FİYAT BİLGİSİ - Adet'in üstünde */}
              <div className="price-section-top">
                <div className="price-display-top">
                  {product.originalPrice && product.originalPrice > product.price && (
                    <div className="original-price-top">
                      <span className="old-price">{formatPrice(product.originalPrice)} TL</span>
                      {discountPercentage > 0 && (
                        <span className="discount-percent">%{discountPercentage}</span>
                      )}
                    </div>
                  )}
                  <div className="current-price-top">{formatPrice(product.price)} TL</div>
                  
                  <div className="installment-highlight-top">
                    <FaTag className="installment-icon" />
                    <span>{calculateInstallment(12)} TL'den başlayan taksitlerle!</span>
                  </div>
                </div>
              </div>

              {/* Adet Seçimi */}
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
              </div>

              {/* BUTONLAR */}
              <div className="action-buttons-container">
                <div className="primary-buttons">
                  {/* SEPETE EKLE BUTONU */}
                  <button 
                    className="btn-add-to-cart" 
                    onClick={handleAddToCart}
                    disabled={!product.inStock}
                  >
                    <div className="btn-content">
                      <FaShoppingCart className="btn-icon" />
                      <span className="btn-text">SEPETE EKLE</span>
                    </div>
                  </button>

                  {/* HEMEN AL BUTONU */}
                  <button 
                    className="btn-buy-now" 
                    onClick={handleBuyNow}
                    disabled={!product.inStock}
                  >
                    <div className="btn-content">
                      <span className="btn-text">HEMEN SATIN AL</span>
                    </div>
                  </button>
                </div>

                {/* İKİNCİL BUTONLAR */}
                <div className="secondary-buttons">
                  <button 
                    className={`btn-favorite ${isFavorite(product.id) ? "active" : ""}`}
                    onClick={handleFavoriteClick}
                    aria-label={isFavorite(product.id) ? "Favorilerden çıkar" : "Favorilere ekle"}
                  >
                    <FaHeart className="favorite-icon" />
                    <span className="favorite-text">
                      {isFavorite(product.id) ? "Favorilerde" : "Favorilere Ekle"}
                    </span>
                  </button>

                  <button 
                    className="btn-share" 
                    onClick={() => setShowShareModal(true)}
                    aria-label="Paylaş"
                  >
                    <FaShareAlt className="share-icon" />
                    <span className="share-text">Paylaş</span>
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* SAĞ KOLON - İletişim ve Ödeme Bilgileri */}
          <div className="product-right-column">
            
            {/* YARDIM İSTER MİSİNİZ? */}
            <div className="contact-card">
              <h3>Yardım İster misiniz?</h3>
              <p>Ürünle ilgili sorularınız için bize ulaşın.</p>
              <div className="contact-options">
                <a href="tel:+905001234567" className="contact-option">
                  <FaPhone className="option-icon" />
                  <div>
                    <span>Telefon</span>
                    <small>+90 (500) 123 45 67</small>
                  </div>
                </a>
                <a href="mailto:info@orhanmakine.com" className="contact-option">
                  <FaEnvelope className="option-icon" />
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

            {/* ÖDEME SEÇENEKLERİ */}
            <div className="payment-info-card">
              <h3>Ödeme Seçenekleri</h3>
              <div className="payment-info-list">
                <div className="payment-info-item">
                  <div className="payment-method-info">
                    <FaCreditCard className="payment-icon" />
                    <div className="payment-details">
                      <span className="payment-method-name">Kredi Kartı</span>
                      <small className="payment-method-desc">Tüm bankalar, tek çekim/taksit</small>
                    </div>
                  </div>
                </div>
                <div className="payment-info-item">
                  <div className="payment-method-info">
                    <FaUniversity className="payment-icon" />
                    <div className="payment-details">
                      <span className="payment-method-name">Havale/EFT</span>
                      <small className="payment-method-desc">%2 indirim, banka hesap bilgileri</small>
                    </div>
                  </div>
                </div>
                <div className="payment-info-item">
                  <div className="payment-method-info">
                    <FaMoneyBill className="payment-icon" />
                    <div className="payment-details">
                      <span className="payment-method-name">Kapıda Ödeme</span>
                      <small className="payment-method-desc">Nakit veya kredi kartı, +20 TL</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* TAB'LAR */}
        <div className="product-tabs" ref={reviewsTabRef}>
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
              className={`tab-header ${activeTab === 'questions' ? 'active' : ''}`}
              onClick={() => setActiveTab('questions')}
            >
              Soru & Cevap ({product.qnaCount || 0})
            </button>
            <button 
              className={`tab-header ${activeTab === 'installment' ? 'active' : ''}`}
              onClick={() => setActiveTab('installment')}
            >
              Taksit Seçenekleri
            </button>
            <button 
              className={`tab-header ${activeTab === 'shipping' ? 'active' : ''}`}
              onClick={() => setActiveTab('shipping')}
            >
              Kargo Bilgileri
            </button>
            <button 
              className={`tab-header ${activeTab === 'reviews' ? 'active' : ''}`}
              onClick={() => setActiveTab('reviews')}
            >
              Yorumlar ({product.reviewCount || 0})
            </button>
          </div>

          <div className="tab-content">
            
            {/* Ürün Bilgisi Tab */}
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
                  {product.features && product.features.length > 0 && (
                    <div className="product-features-tab">
                      <h4>Özellikler</h4>
                      <ul>
                        {product.features.map((f, i) => (
                          <li key={i}>
                            <span className="feature-check">✓</span> 
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Teknik Özellikler Tab */}
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

            {/* Soru & Cevap Tab */}
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

            {/* Taksit Seçenekleri Tab */}
            {activeTab === 'installment' && (
              <div className="tab-panel">
                <h3>Taksit Seçenekleri</h3>
                <div className="installment-table-container">
                  <div className="installment-table">
                    <div className="installment-table-header">
                      <div>Taksit</div>
                      <div>Taksit Tutarı</div>
                      <div>Toplam Tutar</div>
                    </div>
                    {[1, 2, 3, 6, 9, 12].map((installment) => (
                      <div key={installment} className="installment-table-row">
                        <div className="installment-count">
                          {installment === 1 ? 'Tek Çekim' : `${installment} Taksit`}
                        </div>
                        <div className="installment-amount">
                          {installment === 1 
                            ? formatPrice(product.price)
                            : formatPrice(product.price / installment)
                          } TL
                        </div>
                        <div className="installment-total">
                          {formatPrice(product.price)} TL
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="installment-notes">
                    <h4>Taksit Notları:</h4>
                    <ul>
                      <li>Taksit seçenekleri bankalara göre değişiklik gösterebilir.</li>
                      <li>Minimum taksit tutarı 100 TL'dir.</li>
                      <li>İndirimler tek çekim fiyatı üzerinden uygulanır.</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Kargo Bilgileri Tab */}
            {activeTab === 'shipping' && (
              <div className="tab-panel">
                <h3>Kargo Bilgileri</h3>
                <div className="shipping-info-tab">
                  <div className="shipping-info-grid">
                    <div className="shipping-info-card">
                      <div className="shipping-info-icon">
                        <FaShippingFast />
                      </div>
                      <h4>Teslimat Süresi</h4>
                      <p><strong>1-3 İş Günü</strong></p>
                      <small>Stok durumuna göre değişir</small>
                    </div>
                    
                    <div className="shipping-info-card">
                      <div className="shipping-info-icon">
                        <FaTruck />
                      </div>
                      <h4>Kargo Ücreti</h4>
                      <p><strong>500 TL Üzeri Ücretsiz</strong></p>
                      <small>500 TL altı için 25 TL</small>
                    </div>
                    
                    <div className="shipping-info-card">
                      <div className="shipping-info-icon">
                        <FaMoneyBill />
                      </div>
                      <h4>Kapıda Ödeme</h4>
                      <p><strong className="available">Mevcut</strong></p>
                      <small>+20 TL ek ücret</small>
                    </div>
                  </div>
                  
                  <div className="shipping-companies">
                    <h4>Anlaşmalı Kargo Firmaları</h4>
                    <div className="company-logos">
                      <span className="company-logo">Aras Kargo</span>
                      <span className="company-logo">Yurtiçi Kargo</span>
                      <span className="company-logo">Sürat Kargo</span>
                      <span className="company-logo">MNG Kargo</span>
                    </div>
                  </div>
                  
                  <div className="shipping-terms">
                    <h4>Kargo Şartları</h4>
                    <ul>
                      <li>Siparişler saat 17:00'a kadar verilirse aynı gün kargoya verilir.</li>
                      <li>Ürün teslimatında imza alınır.</li>
                      <li>Hasarlı ürün teslimatında kargo firmasına tutanak tutturulmalıdır.</li>
                      <li>Adres değişikliği kargoya verilmeden önce yapılabilir.</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* YORUMLAR TAB - GÜNCELLENMİŞ */}
            {activeTab === 'reviews' && (
              <div className="tab-panel">
                <div className="reviews-header">
                  <h3>Müşteri Yorumları</h3>
                  <button 
                    className="btn-write-review"
                    onClick={handleWriteReviewClick}
                  >
                    Yorum Yap
                  </button>
                </div>
                
                {/* Yorum Özeti */}
                <div className="review-summary">
                  <div className="average-rating">
                    <span className="rating-number">{product.rating || 4.0}</span>
                    <div className="rating-stars-large">
                      {[...Array(5)].map((_, i) => (
                        <FaStar 
                          key={i} 
                          className={i < Math.floor(product.rating || 4) ? "star-filled" : "star-empty"} 
                        />
                      ))}
                    </div>
                    <span className="total-reviews">{product.reviewCount || 0} yorum</span>
                  </div>
                </div>

                {/* YORUM YAZMA FORMU - Kayıtlı/Kayıtsız Tüm Kullanıcılar İçin */}
                <div className="write-review-section" ref={commentFormRef}>
                  <h4>Yorumunuzu Yazın</h4>
                  <p className="form-description">
                    Ürün hakkındaki deneyimlerinizi paylaşın. Yorum yapmak için kayıt olmanıza gerek yok.
                  </p>
                  
                  <form className="review-form" onSubmit={handleSubmitReview}>
                    {/* Puanlama */}
                    <div className="form-group">
                      <label className="form-label">Puanınız:</label>
                      <div className="rating-input">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            className={`rating-star-btn ${star <= reviewRating ? 'selected' : ''}`}
                            onClick={() => setReviewRating(star)}
                            aria-label={`${star} yıldız`}
                          >
                            <FaStar />
                          </button>
                        ))}
                        <span className="rating-text">
                          {reviewRating === 0 ? 'Puan seçin' : `${reviewRating} / 5`}
                        </span>
                      </div>
                    </div>

                    {/* Ad Soyad */}
                    <div className="form-group">
                      <label className="form-label" htmlFor="reviewName">
                        Adınız Soyadınız *
                      </label>
                      <input
                        type="text"
                        id="reviewName"
                        className="form-input"
                        value={reviewName}
                        onChange={(e) => setReviewName(e.target.value)}
                        placeholder="Adınızı ve soyadınızı girin"
                        required
                      />
                    </div>

                    {/* E-posta */}
                    <div className="form-group">
                      <label className="form-label" htmlFor="reviewEmail">
                        E-posta Adresiniz *
                      </label>
                      <input
                        type="email"
                        id="reviewEmail"
                        className="form-input"
                        value={reviewEmail}
                        onChange={(e) => setReviewEmail(e.target.value)}
                        placeholder="E-posta adresinizi girin"
                        required
                      />
                      <small className="form-help">
                        E-posta adresiniz yayınlanmayacaktır.
                      </small>
                    </div>

                    {/* Yorum */}
                    <div className="form-group">
                      <label className="form-label" htmlFor="reviewText">
                        Yorumunuz *
                      </label>
                      <textarea
                        id="reviewText"
                        className="form-textarea"
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        placeholder="Ürün hakkındaki deneyimlerinizi yazın..."
                        rows="5"
                        required
                      ></textarea>
                      <small className="form-help">
                        Yorumunuz en az 10 karakter olmalıdır.
                      </small>
                    </div>

                    {/* Gönder Butonu */}
                    <div className="form-actions">
                      <button type="submit" className="btn-submit-review">
                        <FaComment className="submit-icon" />
                        Yorumu Gönder
                      </button>
                      <small className="form-note">
                        Yorumunuz onaylandıktan sonra yayınlanacaktır.
                      </small>
                    </div>
                  </form>
                </div>

                {/* Mevcut Yorumlar */}
                {product.reviewCount > 0 ? (
                  <div className="reviews-list">
                    {/* Yorum listesi buraya gelecek */}
                    <div className="no-reviews-message">
                      <p>Henüz yorum yapılmamış. İlk yorumu siz yapın!</p>
                    </div>
                  </div>
                ) : (
                  <div className="no-reviews">
                    <div className="no-reviews-icon">📝</div>
                    <h4>Henüz Yorum Yok</h4>
                    <p>Bu ürün için henüz müşteri yorumu bulunmuyor.</p>
                    <button 
                      className="btn-be-first"
                      onClick={handleWriteReviewClick}
                    >
                      İlk Yorumu Sen Yap
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* BENZER ÜRÜNLER */}
        <div className="related-products">
          <h3>Benzer Ürünler</h3>
          <div className="related-products-grid">
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