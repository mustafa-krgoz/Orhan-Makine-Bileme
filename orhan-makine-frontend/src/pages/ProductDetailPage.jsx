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
  
  // YORUMLAR İÇİN STATE'LER
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [reviewName, setReviewName] = useState('');
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  
  // SORU & CEVAP İÇİN STATE'LER
  const [questionText, setQuestionText] = useState('');
  const [questionName, setQuestionName] = useState('');
  const [questions, setQuestions] = useState([]);

  const reviewsTabRef = useRef(null);
  const questionTabRef = useRef(null);
  const questionFormRef = useRef(null);
  const commentFormRef = useRef(null);

  const { isFavorite, toggleFavorite } = useFavorites();
  const { addToCart } = useCart();

  const product = productsData.find((p) => p.id === Number(id));

  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });

  const handleZoomMove = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
  
    setZoomPosition({ x, y });
  };

  // URL hash kontrolü - Yorumlar ve Soru&Cevap için
  useEffect(() => {
    if (location.hash === '#reviews') {
      setActiveTab('reviews');
      setTimeout(() => {
        reviewsTabRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
    if (location.hash === '#questions') {
      setActiveTab('questions');
      setTimeout(() => {
        questionTabRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
    if (location.hash === '#write-review') {
      setActiveTab('reviews');
      setTimeout(() => {
        commentFormRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [location]);

  // Ürün bulunamazsa hata sayfası göster
  if (!product) {
    return (
      <div className="product-not-found">
        <h2>Ürün bulunamadı</h2>
        <Link to="/products" className="back-to-products">Ürünlere Dön</Link>
      </div>
    );
  }

  // Ürün görsellerini al
  const images = product.images || [product.image];

  // Fiyat formatlama fonksiyonu
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

  // Taksit hesaplama
  const calculateInstallment = (installmentCount = 12) => {
    const monthly = product.price / installmentCount;
    return formatPrice(monthly);
  };

  // Favori butonu işlevi
  const handleFavoriteClick = () => {
    toggleFavorite(product.id);
    toast.success(isFavorite(product.id) ? 'Favorilerden çıkarıldı' : 'Favorilere eklendi');
  };

  // Sepete ekle butonu işlevi
  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast.success(`${product.name} sepete eklendi!`, {
      icon: '🛒',
      position: "bottom-right",
      autoClose: 3000,
    });
  };

  // Hemen al butonu işlevi
  const handleBuyNow = () => {
    addToCart(product, quantity);
    window.location.href = '/cart';
  };

  const productUrl = window.location.href;

  // YORUM İŞLEMLERİ
  const handleReviewClick = () => {
    setActiveTab('reviews');
    setTimeout(() => {
      reviewsTabRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleWriteReviewClick = () => {
    setActiveTab('reviews');
    setTimeout(() => {
      commentFormRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
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

  // SORU İŞLEMLERİ
  const handleQuestionClick = () => {
    setActiveTab('questions');
    setTimeout(() => {
      questionTabRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleAskQuestionClick = () => {
    setActiveTab('questions');
    setTimeout(() => {
      questionFormRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
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
    
    toast.success('Soranız başarıyla gönderildi!');
  };

  // Kategori formatlama
  const formatCategories = () => {
    if (Array.isArray(product.categories)) {
      return product.categories.join(', ');
    }
    return product.category || 'Kategori';
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

          {/* SOL KOLON - Ürün Galerisi */}
          <div className="product-left-column">
            
            {/* Ürün Galerisi */}
            <div className="product-gallery-new">
              
              {/* SOL - Küçük Resimler */}
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

              {/* SAĞ - Ana Resim */}
              <div className="main-image-section">
                <div 
                  className="main-image-container"
                  onMouseEnter={() => setIsHoveringImage(true)}
                  onMouseLeave={() => setIsHoveringImage(false)}
                  onMouseMove={handleZoomMove}   // ⭐ YENİ EKLENDİ
                >
                  <img 
                    src={images[selectedImage]}
                    alt={product.name}
                    className={`main-image ${isHoveringImage ? 'zoom-active' : ''}`}
                    loading="lazy"
                    style={{
                      '--zoom-x': `${zoomPosition.x}%`,
                      '--zoom-y': `${zoomPosition.y}%`,
                    }}
                  />
                                    m
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

          {/* ORTA KOLON - Ürün Bilgileri ve Butonlar - GÜNCELLENDİ (DAHA SIKI) */}
          <div className="product-middle-column">
            <div className="product-info">

              {/* Ürün Başlığı - DAHA SIKI */}
              <header className="product-header">
                <h1 className="product-title">{product.name}</h1>

                {/* PUANLAMA VE AKSİYON LİNKLERİ - DAHA SIKI */}
                <div className="product-rating-section compact">
                  <div className="rating-container compact">
                    {/* Puanlama */}
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
                    
                    {/* AKSİYON LİNKLERİ - DAHA SIKI */}
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

              {/* FİYAT BİLGİSİ - DAHA SIKI */}
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
                  
                  <div className="installment-highlight-top">
                    <FaTag className="installment-icon" />
                    <span>{calculateInstallment(12)} TL'den başlayan taksitlerle!</span>
                  </div>
                </div>
              </div>

              {/* Adet Seçimi - DAHA SIKI */}
              <div className="quantity-section compact">
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

              {/* BUTONLAR - DAHA SIKI */}
              <div className="action-buttons-container compact">
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
                    <small>+90 (533) 461 31 50</small>
                  </div>
                </a>
                <a href="mailto:info@orhanmakine.com" className="contact-option">
                  <FaEnvelope className="option-icon" />
                  <div>
                    <span>E-posta</span>
                    <small>info@orhanmakine.com.tr</small>
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

        {/* TAB'LAR - GÜNCELLENDİ (TEKNİK ÖZELLİKLER TAB'I KALDIRILDI) */}
        <div className="product-tabs" ref={reviewsTabRef}>
          <div className="tab-headers">
            <button 
              className={`tab-header ${activeTab === 'description' ? 'active' : ''}`}
              onClick={() => setActiveTab('description')}
            >
              <FaInfoCircle className="tab-icon" />
              <span>Ürün Bilgisi</span>
            </button>
            <button 
              className={`tab-header ${activeTab === 'questions' ? 'active' : ''}`}
              onClick={() => setActiveTab('questions')}
              ref={questionTabRef}
            >
              <FaQuestionCircle className="tab-icon" />
              <span>Soru & Cevap ({questions.length})</span>
            </button>
            <button 
              className={`tab-header ${activeTab === 'installment' ? 'active' : ''}`}
              onClick={() => setActiveTab('installment')}
            >
              <FaCalendarAlt className="tab-icon" />
              <span>Taksit Seçenekleri</span>
            </button>
            <button 
              className={`tab-header ${activeTab === 'shipping' ? 'active' : ''}`}
              onClick={() => setActiveTab('shipping')}
            >
              <FaTruck className="tab-icon" />
              <span>Kargo Bilgileri</span>
            </button>
            <button 
              className={`tab-header ${activeTab === 'reviews' ? 'active' : ''}`}
              onClick={() => setActiveTab('reviews')}
            >
              <FaStar className="tab-icon" />
              <span>Yorumlar ({totalReviews})</span>
            </button>
          </div>

          <div className="tab-content">
            
            {/* ÜRÜN BİLGİSİ TAB - TAMAMEN YENİ DETAYLI TASARIM */}
            {activeTab === 'description' && (
              <div className="tab-panel modern">
                <header className="description-header">
                  <h2 className="section-title">
                    <FaInfoCircle className="section-icon" />
                    Ürün Açıklaması
                  </h2>
                  <div className="product-badge">
                    <FaCertificate className="badge-icon" />
                    <span>Orijinal Ürün</span>
                  </div>
                </header>
                
                <div className="description-content-modern">
                  {/* Ana Açıklama */}
                  <section className="description-main">
                    <p className="description-lead">
                      MACROZA EXF5121 KAZIMA BIÇAK ORTA, endüstriyel ve profesyonel kullanım için özel olarak tasarlanmış yüksek performanslı bir kazıma bıçağıdır. Özel alaşım çelikten üretilen bu bıçak, uzun ömürlü kullanım ve yüksek dayanıklılık sunar. Ağır iş koşullarında bile maksimum verimlilik sağlayan ürün, EXF5121 modelleri ile tam uyumludur.
                    </p>
                    
                    <div className="description-highlights">
                      <div className="highlight-item">
                        <FaShieldAlt className="highlight-icon" />
                        <div>
                          <h3>2 Yıl Garanti</h3>
                          <p>Üretici firma garantisi ile güvence altında</p>
                        </div>
                      </div>
                      <div className="highlight-item">
                        <FaBox className="highlight-icon" />
                        <div>
                          <h3>Orijinal Kutu</h3>
                          <p>Kutulu ve belgeli orijinal ürün</p>
                        </div>
                      </div>
                      <div className="highlight-item">
                        <FaIndustry className="highlight-icon" />
                        <div>
                          <h3>Endüstriyel Kalite</h3>
                          <p>Profesyonel kullanıma uygun</p>
                        </div>
                      </div>
                    </div>
                  </section>
                  
                  {/* Ürün Özellikleri */}
                  <section className="product-features-modern">
                    <h3 className="features-title">
                      <FaCheckCircle className="features-icon" />
                      Ürün Özellikleri
                    </h3>
                    <div className="features-grid">
                      <div className="feature-card">
                        <FaBoltIcon className="feature-icon" />
                        <div className="feature-content">
                          <h4>Yüksek Dayanıklılık</h4>
                          <p>Özel ısıl işlem görmüş çelik yapı</p>
                        </div>
                      </div>
                      <div className="feature-card">
                        <FaCogs className="feature-icon" />
                        <div className="feature-content">
                          <h4>Kolay Montaj</h4>
                          <p>Standart bağlantı sistemleri ile uyumlu</p>
                        </div>
                      </div>
                      <div className="feature-card">
                        <FaHardHat className="feature-icon" />
                        <div className="feature-content">
                          <h4>Güvenli Kullanım</h4>
                          <p>Koruyucu tasarım ile iş güvenliği</p>
                        </div>
                      </div>
                      <div className="feature-card">
                        <FaShippingFast className="feature-icon" />
                        <div className="feature-content">
                          <h4>Hızlı Teslimat</h4>
                          <p>Stoktan aynı gün kargo imkanı</p>
                        </div>
                      </div>
                    </div>
                  </section>
                  
                  {/* Teknik Ölçüler */}
                  <section className="technical-specs-modern">
                    <h3 className="specs-title">
                      <FaRuler className="specs-icon" />
                      Teknik Ölçüler
                    </h3>
                    <div className="specs-table-modern">
                      <div className="specs-row">
                        <span className="specs-label">Ürün Tipi</span>
                        <span className="specs-value">Kazıma Bıçağı - Orta</span>
                      </div>
                      <div className="specs-row">
                        <span className="specs-label">Uyumlu Makine</span>
                        <span className="specs-value">EXF5121 Serisi</span>
                      </div>
                      <div className="specs-row">
                        <span className="specs-label">Kazıma Genişliği</span>
                        <span className="specs-value">25 mm</span>
                      </div>
                      <div className="specs-row">
                        <span className="specs-label">Kazıma Derinliği</span>
                        <span className="specs-value">15 - 25 mm (ayarlanabilir)</span>
                      </div>
                      <div className="specs-row">
                        <span className="specs-label">Malzeme</span>
                        <span className="specs-value">Yüksek Karbon Çelik</span>
                      </div>
                      <div className="specs-row">
                        <span className="specs-label">Ağırlık</span>
                        <span className="specs-value">850 gr</span>
                      </div>
                      <div className="specs-row">
                        <span className="specs-label">Boyutlar</span>
                        <span className="specs-value">150 x 45 x 25 mm</span>
                      </div>
                      <div className="specs-row">
                        <span className="specs-label">Paket İçeriği</span>
                        <span className="specs-value">1 Adet Kazıma Bıçağı + Montaj Vidaları</span>
                      </div>
                    </div>
                  </section>
                  
                  {/* Ek Bilgiler */}
                  <section className="additional-info-modern">
                    <h3>Kullanım ve Bakım Bilgileri</h3>
                    <div className="info-grid">
                      <div className="info-card">
                        <h4>Kullanım Alanı</h4>
                        <p>Endüstriyel kazıma işlemleri, yol bakımı, inşaat sektörü, tarım makineleri bakımı için ideal.</p>
                      </div>
                      <div className="info-card">
                        <h4>Bakım Önerileri</h4>
                        <p>Her kullanımdan sonra temizlenmeli, düzenli yağlanmalı ve kuru ortamda saklanmalıdır.</p>
                      </div>
                      <div className="info-card">
                        <h4>Performans</h4>
                        <p>Yüksek tork dayanımı, uzun ömürlü keskinlik ve minimum bakım gereksinimi.</p>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            )}

            {/* SORU & CEVAP TAB - AYNI KALDI */}
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

                {/* SORU SORMA FORMU */}
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

                {/* SORULAR LİSTESİ */}
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

                        {/* CEVAPLAR */}
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

            {/* TAKSİT SEÇENEKLERİ TAB - AYNI KALDI */}
            {activeTab === 'installment' && (
              <div className="tab-panel modern">
                <h3 className="section-title">
                  <FaCalendarAlt className="section-icon" />
                  Taksit Seçenekleri
                </h3>
                
                <div className="installment-modern">
                  <div className="installment-summary">
                    <div className="summary-card">
                      <div className="summary-icon">
                        <FaCreditCard />
                      </div>
                      <div className="summary-content">
                        <h4>Toplam Tutar</h4>
                        <p className="total-amount">{formatPrice(product.price)} TL</p>
                      </div>
                    </div>
                    <div className="summary-card">
                      <div className="summary-icon">
                        <FaTag />
                      </div>
                      <div className="summary-content">
                        <h4>En Uygun Taksit</h4>
                        <p className="best-installment">{calculateInstallment(12)} x 12 Ay</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="installment-table-modern">
                    <div className="table-header-modern">
                      <div className="header-cell">Taksit Sayısı</div>
                      <div className="header-cell">Aylık Taksit Tutarı</div>
                      <div className="header-cell">Toplam Tutar</div>
                      <div className="header-cell">Seçenek</div>
                    </div>
                    
                    {[1, 2, 3, 6, 9, 12].map((installment, index) => {
                      const monthlyAmount = installment === 1 
                        ? product.price 
                        : product.price / installment;
                      const isRecommended = installment === 12;
                      
                      return (
                        <div 
                          key={installment} 
                          className={`installment-row-modern ${isRecommended ? 'recommended' : ''} ${index % 2 === 0 ? 'even' : 'odd'}`}
                        >
                          <div className="cell installment-count">
                            {installment === 1 ? 'Tek Çekim' : `${installment} Taksit`}
                            {isRecommended && <span className="recommended-badge">Önerilen</span>}
                          </div>
                          <div className="cell installment-amount">
                            <span className="amount-value">{formatPrice(monthlyAmount)} TL</span>
                            {installment > 1 && <span className="amount-period">/ay</span>}
                          </div>
                          <div className="cell installment-total">
                            {formatPrice(product.price)} TL
                          </div>
                          <div className="cell installment-action">
                            <button className="select-installment-btn">
                              {installment === 1 ? 'Tek Çekim Öde' : `${installment} Taksit Seç`}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  
                  <div className="installment-notes-modern">
                    <div className="notes-grid">
                      <div className="note-card">
                        <div className="note-icon">ℹ️</div>
                        <div className="note-content">
                          <h5>Taksit Notları</h5>
                          <p>Taksit seçenekleri bankalara göre değişiklik gösterebilir.</p>
                        </div>
                      </div>
                      <div className="note-card">
                        <div className="note-icon">💰</div>
                        <div className="note-content">
                          <h5>Minimum Tutar</h5>
                          <p>Minimum taksit tutarı 100 TL'dir.</p>
                        </div>
                      </div>
                      <div className="note-card">
                        <div className="note-icon">🎯</div>
                        <div className="note-content">
                          <h5>İndirimler</h5>
                          <p>İndirimler tek çekim fiyatı üzerinden uygulanır.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* KARGO BİLGİLERİ TAB - GÜNCELLENDİ (RENK VE İKON) */}
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
                        <p className="highlight-value">500 TL Üzeri Ücretsiz</p>
                        <small>500 TL altı için 25 TL</small>
                      </div>
                    </div>
                    
                    <div className="highlight-card tertiary">
                      <div className="highlight-icon">
                        <FaMoneyBill />
                      </div>
                      <div className="highlight-content">
                        <h4>Kapıda Ödeme</h4>
                        <p className="highlight-value available">Mevcut</p>
                        <small>+20 TL ek ücret</small>
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
                          <span>Siparişler saat 17:00'a kadar verilirse aynı gün kargoya verilir.</span>
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

            {/* YORUMLAR TAB - AYNI KALDI */}
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
                
                {/* YORUM ÖZETİ */}
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

                {/* YORUM YAZMA FORMU */}
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

                {/* MEVCUT YORUMLAR */}
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