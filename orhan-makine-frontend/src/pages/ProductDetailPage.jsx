import React, { useState, useRef, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import '../styles/ProductDetailPage.css';
import { useProducts } from "../context/ProductsContext";
import { useFavorites } from "../context/FavoritesContext";
import { useCart } from "../context/CartContext";
import ShareModal from '../components/ShareModel/ShareModel';
import { 
  FaTruck, FaHeart, FaExchangeAlt, 
  FaTag, FaStar, FaShareAlt, FaShoppingCart, FaBolt,
  FaCreditCard, FaUniversity, FaMoneyBill, FaShippingFast,
  FaPhone, FaEnvelope, FaComment, FaUser, FaQuestionCircle,
  FaBox, FaShieldAlt, FaTools, FaCertificate, FaInfoCircle,
  FaCheckCircle, FaCalendarAlt, FaMapMarkerAlt, FaClock,
  FaRuler, FaWeight, FaCube, FaBolt as FaBoltIcon,
  FaIndustry, FaCogs, FaHardHat
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
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  
  const [questionText, setQuestionText] = useState('');
  const [questionName, setQuestionName] = useState('');
  const [questions, setQuestions] = useState([]);

  const reviewsTabRef = useRef(null);
  const questionTabRef = useRef(null);
  const questionFormRef = useRef(null);
  const commentFormRef = useRef(null);

  const { isFavorite, toggleFavorite } = useFavorites();
  const { addToCart } = useCart();

  // ✅ YENİ - Context'ten product ve loading state'ini al
  const { getProductById, loading } = useProducts();
  const product = getProductById(id);

  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });

  const handleZoomMove = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x, y });
  };

  useEffect(() => {
    if (location.hash === '#reviews') {
      setActiveTab('reviews');
      setTimeout(() => reviewsTabRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    }
    if (location.hash === '#questions') {
      setActiveTab('questions');
      setTimeout(() => questionTabRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    }
    if (location.hash === '#write-review') {
      setActiveTab('reviews');
      setTimeout(() => commentFormRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    }
  }, [location]);

  // ✅ LOADING STATE kontrolü ekle
  if (loading) {
    return (
      <div className="product-detail-page">
        <div className="container">
          <div className="product-loading">
            <div className="loading-spinner"></div>
            <p>Ürün bilgileri yükleniyor...</p>
          </div>
        </div>
      </div>
    );
  }

  // ✅ Ürün bulunamadı kontrolü
  if (!product) {
    return (
      <div className="product-not-found">
        <h2>Ürün bulunamadı</h2>
        <Link to="/products" className="back-to-products">Ürünlere Dön</Link>
      </div>
    );
  }

  const images = product.images || [product.image];

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
    addToCart(product.id, quantity);
    toast.success(`${product.name} sepete eklendi!`, {
      icon: '🛒',
      position: "bottom-right",
      autoClose: 3000,
    });
  };

  const handleBuyNow = () => {
    addToCart(product.id, quantity);
    window.location.href = '/cart';
  };

  const productUrl = window.location.href;

  const handleReviewClick = () => {
    setActiveTab('reviews');
    setTimeout(() => reviewsTabRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
  };

  const handleWriteReviewClick = () => {
    setActiveTab('reviews');
    setTimeout(() => commentFormRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    
    if (!reviewName.trim()) {
      toast.error('Lütfen adınızı giriniz');
      return;
    }
    
    if (!reviewRating) {
      toast.error('Lütfen puan veriniz');
      return;
    }
    
    if (!reviewText.trim() || reviewText.trim().length < 10) {
      toast.error('Lütfen en az 10 karakterlik yorum yazınız');
      return;
    }
    
    const newReview = {
      id: Date.now(),
      name: reviewName.trim(),
      rating: reviewRating,
      text: reviewText.trim(),
      date: new Date().toLocaleDateString('tr-TR')
    };
    
    const updatedReviews = [newReview, ...reviews];
    setReviews(updatedReviews);
    
    const newTotalReviews = updatedReviews.length;
    const newAverage = updatedReviews.reduce((acc, review) => acc + review.rating, 0) / newTotalReviews;
    
    setTotalReviews(newTotalReviews);
    setAverageRating(newAverage.toFixed(1));
    
    setReviewName('');
    setReviewRating(0);
    setReviewText('');
    
    toast.success('Yorumunuz başarıyla gönderildi!');
  };

  const handleQuestionClick = () => {
    setActiveTab('questions');
    setTimeout(() => questionTabRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
  };

  const handleAskQuestionClick = () => {
    setActiveTab('questions');
    setTimeout(() => questionFormRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
  };

  const handleSubmitQuestion = (e) => {
    e.preventDefault();
    
    if (!questionName.trim()) {
      toast.error('Lütfen adınızı giriniz');
      return;
    }
    
    if (!questionText.trim() || questionText.trim().length < 10) {
      toast.error('Lütfen en az 10 karakterlik soru yazınız');
      return;
    }
    
    const newQuestion = {
      id: Date.now(),
      name: questionName.trim(),
      question: questionText.trim(),
      date: new Date().toLocaleDateString('tr-TR'),
      answers: []
    };
    
    setQuestions([newQuestion, ...questions]);
    
    setQuestionName('');
    setQuestionText('');
    
    toast.success('Sorunuz başarıyla gönderildi!');
  };

  const formatCategories = () => {
    if (Array.isArray(product.categories)) {
      return product.categories.join(', ');
    }
    return product.category || 'Kategori';
  };

  // İkon mapping helper
  const getIconComponent = (iconName) => {
    const icons = {
      FaBolt: FaBolt,
      FaCogs: FaCogs,
      FaHardHat: FaHardHat,
      FaShippingFast: FaShippingFast,
      FaBox: FaBox,
      FaShieldAlt: FaShieldAlt,
      FaIndustry: FaIndustry
    };
    return icons[iconName] || FaCheckCircle;
  };

  return (
    <div className="product-detail-page">
      <ToastContainer />
      
      <ShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        productName={product.name}
        productUrl={productUrl}
      />

      <div className="container">

        <nav className="breadcrumb" aria-label="Breadcrumb">
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

          <div className="product-left-column">
            
            <div className="product-gallery-new">
              
              <div className="thumbnail-gallery-vertical">
                {images.map((img, index) => (
                  <button
                    key={index}
                    className={`thumbnail-vertical ${selectedImage === index ? 'active' : ''}`}
                    onClick={() => setSelectedImage(index)}
                    aria-label={`Resim ${index + 1}`}
                  >
                    <img src={img} alt={`${product.name} - ${index + 1}`} loading="lazy" />
                  </button>
                ))}
              </div>

              <div className="main-image-section">
                  <div 
                    className="main-image-container"
                    onMouseEnter={() => setIsHoveringImage(true)}
                    onMouseLeave={() => setIsHoveringImage(false)}
                    onMouseMove={handleZoomMove}
                  >
                    
                  <img 
                    src={images[selectedImage]}
                    alt={product.name}
                    className={`main-image ${isHoveringImage ? 'zoom-active' : ''}`}
                    loading="lazy"
                    decoding="async"
                    fetchpriority="low"
                    width="800"
                    height="800"
                    style={{
                      '--zoom-x': `${zoomPosition.x}%`,
                      '--zoom-y': `${zoomPosition.y}%`,
                    }}
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

            {/* DİNAMİK ÜRÜN DETAY KARTI */}
            <div className="product-details-card">
              <div className="detail-row">
                <span className="detail-label">Kategori</span>
                <span className="detail-value">{formatCategories()}</span>
              </div>
              
              <div className="detail-row">
                <span className="detail-label">Marka</span>
                <span className="detail-value">{product.brand || "Belirtilmemiş"}</span>
              </div>
              
              {product.productCode && (
                <div className="detail-row">
                  <span className="detail-label">Ürün Kodu</span>
                  <span className="detail-value">{product.productCode}</span>
                </div>
              )}
              
              {product.stockCode && (
                <div className="detail-row">
                  <span className="detail-label">Stok Kodu</span>
                  <span className="detail-value">{product.stockCode}</span>
                </div>
              )}
              
              <div className="detail-row">
                <span className="detail-label">Stok Durumu</span>
                <span className={`detail-value stock-status-indicator ${product.inStock ? 'in-stock' : 'out-of-stock'}`}>
                  {product.inStock ? '✓ Stokta Var' : '✗ Stokta Yok'}
                </span>
              </div>
              
              {product.isNew && (
                <div className="detail-row">
                  <span className="detail-label">Durum</span>
                  <span className="detail-value badge-new">🆕 Yeni Ürün</span>
                </div>
              )}
              
              {product.isCampaign && (
                <div className="detail-row">
                  <span className="detail-label">Kampanya</span>
                  <span className="detail-value badge-campaign">🎉 Kampanyalı Ürün</span>
                </div>
              )}
              
              {product.isFeatured && (
                <div className="detail-row">
                  <span className="detail-label">Özellik</span>
                  <span className="detail-value badge-featured">⭐ Öne Çıkan Ürün</span>
                </div>
              )}
            </div>

          </div>

          <div className="product-middle-column">
            <div className="product-info">

              <header className="product-header">
                <h1 className="product-title">{product.name}</h1>

                <div className="product-rating-section compact">
                  <div className="rating-container compact">
                    <div className="rating-display compact">
                      <span className="rating-score">{averageRating}</span>
                      <div className="stars">
                        {[...Array(5)].map((_, i) => (
                          <FaStar
                            key={i}
                            className={i < Math.floor(averageRating) ? "star-filled" : "star-empty"}
                          />
                        ))}
                      </div>
                      <span className="review-count">({totalReviews} yorum)</span>
                    </div>
                    
                    <div className="action-links compact">
                      <button 
                        className="action-link review-link"
                        onClick={handleReviewClick}
                        aria-label="Yorumlar sayfasına git"
                      >
                        <FaComment className="action-icon" />
                        <span>Yorumlar</span>
                      </button>
                      
                      <span className="divider">|</span>
                      
                      <button 
                        className="action-link question-link"
                        onClick={handleQuestionClick}
                        aria-label="Soru & Cevap sayfasına git"
                      >
                        <FaQuestionCircle className="action-icon" />
                        <span>Soru & Cevap</span>
                      </button>
                    </div>
                  </div>
                </div>
              </header>

              <div className="price-section-top compact">
                <div className="price-display-top compact">
                  {product.originalPrice && product.originalPrice > product.price && (
                    <div className="original-price-top">
                      <span className="old-price">{formatPrice(product.originalPrice)} TL</span>
                      {discountPercentage > 0 && (
                        <span className="discount-percent">%{discountPercentage}</span>
                      )}
                    </div>
                  )}
                  <div className="current-price-top">{formatPrice(product.price)} TL</div>
                </div>
              </div>

              <div className="quantity-section compact">
                <label htmlFor="quantity-input">Adet:</label>
                <div className="quantity-control">
                  <button 
                    onClick={() => setQuantity(q => Math.max(1, q - 1))} 
                    disabled={quantity <= 1}
                    aria-label="Azalt"
                  >
                    −
                  </button>
                  <input 
                    id="quantity-input"
                    type="number" 
                    value={quantity} 
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    min="1"
                    max="99"
                    aria-label="Ürün adedi"
                  />
                  <button 
                    onClick={() => setQuantity(q => q + 1)}
                    aria-label="Arttır"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="action-buttons-container compact">
                <div className="primary-buttons">
                  <button 
                    className="btn-add-to-cart" 
                    onClick={handleAddToCart}
                    disabled={!product.inStock}
                    aria-label="Sepete ekle"
                  >
                    <div className="btn-content">
                      <FaShoppingCart className="btn-icon" />
                      <span className="btn-text">SEPETE EKLE</span>
                    </div>
                  </button>

                  <button 
                    className="btn-buy-now" 
                    onClick={handleBuyNow}
                    disabled={!product.inStock}
                    aria-label="Hemen satın al"
                  >
                    <div className="btn-content">
                      <span className="btn-text">HEMEN SATIN AL</span>
                    </div>
                  </button>
                </div>

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

          <div className="product-right-column">
            
            <div className="contact-card">
              <h3>Yardım İster misiniz?</h3>
              <p>Ürünle ilgili sorularınız için bize ulaşın.</p>
              <div className="contact-options">
                <a href="tel:+905395159925" className="contact-option">
                  <FaPhone className="option-icon" />
                  <div>
                    <span>Telefon</span>
                    <small>+90 (539) 515 99 25</small>
                  </div>
                </a>
                <a href="mailto:info@orhanmakina.com.tr" className="contact-option">
                  <FaEnvelope className="option-icon" />
                  <div>
                    <span>E-posta</span>
                    <small>info@orhanmakina.com.tr</small>
                  </div>
                </a>
              </div>
              <Link to="/contact" className="btn-contact">
                İletişime Geç
              </Link>
            </div>

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
                      <small className="payment-method-desc">Banka hesap bilgileri</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

        <div className="product-tabs" ref={reviewsTabRef}>
          <div className="tab-headers">
            <button 
              className={`tab-header ${activeTab === 'description' ? 'active' : ''}`}
              onClick={() => setActiveTab('description')}
              aria-label="Ürün Bilgisi"
            >
              <FaInfoCircle className="tab-icon" />
              <span>Ürün Bilgisi</span>
            </button>
            <button 
              className={`tab-header ${activeTab === 'questions' ? 'active' : ''}`}
              onClick={() => setActiveTab('questions')}
              ref={questionTabRef}
              aria-label="Soru ve Cevap"
            >
              <FaQuestionCircle className="tab-icon" />
              <span>Soru & Cevap ({questions.length})</span>
            </button>

            <button 
              className={`tab-header ${activeTab === 'shipping' ? 'active' : ''}`}
              onClick={() => setActiveTab('shipping')}
              aria-label="Kargo Bilgileri"
            >
              <FaTruck className="tab-icon" />
              <span>Kargo Bilgileri</span>
            </button>
            <button 
              className={`tab-header ${activeTab === 'reviews' ? 'active' : ''}`}
              onClick={() => setActiveTab('reviews')}
              aria-label="Yorumlar"
            >
              <FaStar className="tab-icon" />
              <span>Yorumlar ({totalReviews})</span>
            </button>
          </div>

          <div className="tab-content">
            
            {/* DİNAMİK ÜRÜN BİLGİSİ TAB */}
          {activeTab === 'description' && (
            <div className="tab-panel modern">

              {/* ÜST BAŞLIK */}
              <header className="description-header">
                <h2 className="section-title">
                  <FaInfoCircle className="section-icon" />
                  Ürün Açıklaması
                </h2>

                {product.warranty && (
                  <div className="product-badge">
                    <FaCertificate className="badge-icon" />
                    <span>{product.warranty}</span>
                  </div>
                )}
              </header>

              <div className="description-content-modern">

                {/* ANA AÇIKLAMA */}
                {product.description && (
                  <section className="description-main">
                    <p className="description-lead">{product.description}</p>

                    {(product.warranty || product.certificates) && (
                      <div className="description-highlights">

                        {product.warranty && (
                          <div className="highlight-item">
                            <FaShieldAlt className="highlight-icon" />
                            <div>
                              <h3>{product.warranty}</h3>
                              <p>Üretici firma garantisi ile güvence altında</p>
                            </div>
                          </div>
                        )}

                        {product.certificates?.map((cert, idx) => (
                          <div className="highlight-item" key={idx}>
                            <FaBox className="highlight-icon" />
                            <div>
                              <h3>{cert}</h3>
                              <p>Orijinal ve belgeli ürün</p>
                            </div>
                          </div>
                        ))}

                      </div>
                    )}
                  </section>
                )}

                {/* ÜRÜN ÖZELLİKLERİ (features array) */}
                {product.features && product.features.length > 0 && (
                  <section className="product-features-modern">
                    <h3 className="features-title">
                      <FaCheckCircle className="features-icon" />
                      Ürün Özellikleri
                    </h3>

                    <div className="features-grid">
                      {product.features.map((feature, idx) => (
                        <div className="feature-card" key={idx}>
                          <FaCheckCircle className="feature-icon" />
                          <div className="feature-content">
                            <h4>{feature}</h4>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* TEKNİK ÖZELLİKLER (specifications object) */}
                {product.specifications && Object.keys(product.specifications).length > 0 && (
                  <section className="technical-specs-modern">
                    <h3 className="specs-title">
                      <FaRuler className="specs-icon" />
                      Teknik Özellikler
                    </h3>

                    <div className="specs-table-modern">
                      {Object.entries(product.specifications).map(([label, value], idx) => (
                        <div className="specs-row" key={idx}>
                          <span className="specs-label">{label}</span>
                          <span className="specs-value">{value}</span>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* EK BİLGİLER (opsiyonel) */}
                {product.additionalInfo && product.additionalInfo.length > 0 && (
                  <section className="additional-info-modern">
                    <h3>Kullanım ve Bakım Bilgileri</h3>
                    <div className="info-grid">
                      {product.additionalInfo.map((info, idx) => (
                        <div className="info-card" key={idx}>
                          <h4>{info.title}</h4>
                          <p>{info.content}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

              </div>
            </div>
          )}

            {activeTab === 'questions' && (
              <div className="tab-panel">
                <div className="questions-header">
                  <h3>Soru & Cevap ({questions.length})</h3>
                  <button 
                    className="btn-ask-question"
                    onClick={handleAskQuestionClick}
                  >
                    Soru Sor
                  </button>
                </div>

                <div className="ask-question-section" ref={questionFormRef}>
                  <h4>Soru Sor</h4>
                  <p className="form-description">
                    Bu ürün hakkında merak ettiklerinizi sorun. En kısa sürede cevaplayacağız.
                  </p>
                  
                  <form className="question-form" onSubmit={handleSubmitQuestion}>
                    <div className="form-group">
                      <label className="form-label" htmlFor="questionName">
                        Adınız Soyadınız *
                      </label>
                      <input
                        type="text"
                        id="questionName"
                        className="form-input"
                        value={questionName}
                        onChange={(e) => setQuestionName(e.target.value)}
                        placeholder="Adınızı ve soyadınızı girin"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="questionText">
                        Sorunuz *
                      </label>
                      <textarea
                        id="questionText"
                        className="form-textarea"
                        value={questionText}
                        onChange={(e) => setQuestionText(e.target.value)}
                        placeholder="Ürün hakkında sormak istediğiniz soruyu yazın..."
                        rows="4"
                        required
                      ></textarea>
                      <small className="form-help">
                        Sorunuz en az 10 karakter olmalıdır.
                      </small>
                    </div>

                    <div className="form-actions">
                      <button type="submit" className="btn-submit-question">
                        <FaQuestionCircle className="submit-icon" />
                        Soruyu Gönder
                      </button>
                    </div>
                  </form>
                </div>

                <div className="questions-list">
                  {questions.length > 0 ? (
                    questions.map((question) => (
                      <div key={question.id} className="question-item">
                        <div className="question-header">
                          <div className="questioner-info">
                            <FaUser className="user-icon" />
                            <div>
                              <span className="questioner-name">{question.name}</span>
                              <span className="question-date">{question.date}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="question-content">
                          <p>{question.question}</p>
                        </div>

                        {question.answers && question.answers.length > 0 && (
                          <div className="answers-section">
                            <h5>Cevaplar ({question.answers.length})</h5>
                            {question.answers.map((answer) => (
                              <div key={answer.id} className="answer-item">
                                <div className="answer-header">
                                  <FaUser className="answer-user-icon" />
                                  <div>
                                    <span className="answer-author">{answer.answeredBy}</span>
                                    <span className="answer-date">{answer.date}</span>
                                  </div>
                                </div>
                                <div className="answer-content">
                                  <p>{answer.text}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="no-questions">
                      <div className="no-questions-icon">❓</div>
                      <h4>Henüz Soru Yok</h4>
                      <p>Bu ürün için henüz soru sorulmamış.</p>
                      <button 
                        className="btn-ask-first"
                        onClick={handleAskQuestionClick}
                      >
                        İlk Soruyu Sen Sor
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'shipping' && (
              <div className="tab-panel modern">
                <h3 className="section-title">
                  <FaTruck className="section-icon" />
                  Kargo Bilgileri
                </h3>
                
                <div className="shipping-modern">
                  <div className="shipping-highlights">
                    <div className="highlight-card primary">
                      <div className="highlight-icon">
                        <FaShippingFast />
                      </div>
                      <div className="highlight-content">
                        <h4>Teslimat Süresi</h4>
                        <p className="highlight-value">1-3 İş Günü</p>
                        <small>Stok durumuna göre değişir</small>
                      </div>
                    </div>
                    
                    <div className="highlight-card secondary">
                      <div className="highlight-icon">
                        <FaTruck />
                      </div>
                      <div className="highlight-content">
                        <h4>Kargo Ücreti</h4>
                        <p className="highlight-value">10.000 TL Üzeri Ücretsiz Kargo</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="shipping-details-grid">
                    <div className="detail-section">
                      <h4 className="detail-title">
                        <FaClock className="detail-icon" />
                        Teslimat Süreçleri
                      </h4>
                      <ul className="detail-list">
                        <li className="detail-item">
                          <span className="item-bullet">✓</span>
                          <span>Siparişler hızlı bir şekilde kargoya verilir.</span>
                        </li>
                        <li className="detail-item">
                          <span className="item-bullet">✓</span>
                          <span>Hafta içi verilen siparişler en geç 2 iş günü içinde kargolanır.</span>
                        </li>
                        <li className="detail-item">
                          <span className="item-bullet">✓</span>
                          <span>Hafta sonu verilen siparişler pazartesi günü kargolanır.</span>
                        </li>
                        <li className="detail-item">
                          <span className="item-bullet">✓</span>
                          <span>Teslimat süresi kargo firmasına ve teslimat adresine göre değişir.</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="detail-section">
                      <h4 className="detail-title">
                        <FaMapMarkerAlt className="detail-icon" />
                        Teslimat Koşulları
                      </h4>
                      <ul className="detail-list">
                        <li className="detail-item">
                          <span className="item-bullet">✓</span>
                          <span>Ürün teslimatında imza alınır.</span>
                        </li>
                        <li className="detail-item">
                          <span className="item-bullet">✓</span>
                          <span>Hasarlı ürün teslimatında kargo firmasına tutanak tutturulmalıdır.</span>
                        </li>
                        <li className="detail-item">
                          <span className="item-bullet">✓</span>
                          <span>Adres değişikliği kargoya verilmeden önce yapılabilir.</span>
                        </li>
                        <li className="detail-item">
                          <span className="item-bullet">✓</span>
                          <span>Teslimat adresinde alıcı yoksa ürün en yakın şubeye bırakılır.</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="shipping-companies-modern">
                    <h4 className="companies-title">Anlaşmalı Kargo Firmaları</h4>
                    <div className="companies-grid">
                      <div className="company-card">
                        <div className="company-logo">Aras Kargo</div>
                        <small className="company-desc">Tüm Türkiye</small>
                      </div>
                      <div className="company-card">
                        <div className="company-logo">Yurtiçi Kargo</div>
                        <small className="company-desc">Tüm Türkiye</small>
                      </div>
                      <div className="company-card">
                        <div className="company-logo">Sürat Kargo</div>
                        <small className="company-desc">Tüm Türkiye</small>
                      </div>
                      <div className="company-card">
                        <div className="company-logo">MNG Kargo</div>
                        <small className="company-desc">Tüm Türkiye</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="tab-panel">
                <div className="reviews-header">
                  <h3>Müşteri Yorumları ({totalReviews})</h3>
                  <button 
                    className="btn-write-review"
                    onClick={handleWriteReviewClick}
                  >
                    Yorum Yap
                  </button>
                </div>
                
                <div className="review-summary">
                  <div className="average-rating">
                    <span className="rating-number">{averageRating}</span>
                    <div className="rating-stars-large">
                      {[...Array(5)].map((_, i) => (
                        <FaStar 
                          key={i} 
                          className={i < Math.floor(averageRating) ? "star-filled" : "star-empty"} 
                        />
                      ))}
                    </div>
                    <span className="total-reviews">{totalReviews} yorum</span>
                  </div>
                </div>

                <div className="write-review-section" ref={commentFormRef}>
                  <h4>Yorumunuzu Yazın</h4>
                  <p className="form-description">
                    Ürün hakkındaki deneyimlerinizi paylaşın. Yorum yapmak için kayıt olmanıza gerek yok.
                  </p>
                  
                  <form className="review-form" onSubmit={handleSubmitReview}>
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

                <div className="reviews-list">
                  {reviews.length > 0 ? (
                    reviews.map((review) => (
                      <div key={review.id} className="review-item">
                        <div className="review-header">
                          <div className="reviewer-info">
                            <FaUser className="user-icon" />
                            <div>
                              <span className="reviewer-name">{review.name}</span>
                              <span className="review-date">{review.date}</span>
                            </div>
                          </div>
                          <div className="review-rating">
                            {[...Array(5)].map((_, i) => (
                              <FaStar 
                                key={i} 
                                className={i < review.rating ? "star-filled" : "star-empty"} 
                              />
                            ))}
                          </div>
                        </div>
                        <div className="review-content">
                          <p>{review.text}</p>
                        </div>
                      </div>
                    ))
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
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductDetailPage;