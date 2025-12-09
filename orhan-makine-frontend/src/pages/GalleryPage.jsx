// ============================================
// ORHAN MAKİNE BİLEME - MODERN ÜRÜN GALERİSİ
// Güncellenmiş: 
// 1. Ürün arka plan rengi #5ba3f7 olarak değiştirildi
// 2. Arama kutusu sola doğru uzatıldı
// 3. "Yeni" badge kaldırıldı
// 4. İletişim linki ürünler sayfasına yönlendirildi
// 5. SEO, PWA ve responsive optimizasyonları yapıldı
// ============================================

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, Filter, X, Camera, 
  ChevronRight, Home, Package,
  ExternalLink, Maximize2, Share2,
  ArrowLeft, ArrowRight, Building,
  Tag, ChevronDown, ChevronUp,
  Settings, Zap, Wrench,
  Mail, MessageCircle, Facebook,
  Copy, Check
} from 'lucide-react';
import { productsData } from '../data/productsData';
import '../styles/GalleryPage.css';

const GalleryPage = () => {
  // ============================================
  // STATE YÖNETİMİ
  // ============================================
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(null);
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();
  const shareMenuRef = useRef(null);

  // ============================================
  // SEO AYARLARI - React Helmet YERİNE
  // ============================================
  useEffect(() => {
    // Sayfa başlığı
    document.title = `Ürün Galerisi (${productsData.length} Ürün) | Orhan Makine Bileme`;
    
    // Meta açıklama
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.content = `Orhan Makine Bileme'de ${productsData.length} farklı makine ve ekipmanın fotoğraf galerisi. Endüstriyel makineler için profesyonel çözümler.`;
    }
    
    // Canonical URL
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.href = window.location.href;
    }
    
    // Sayfa yüklendiğinde scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    return () => {
      // Cleanup - eski başlığı geri al
      document.title = 'Orhan Makine Bileme';
    };
  }, []);

  // ============================================
  // KATEGORİ VE MARKA LİSTELERİ
  // ============================================
  const categories = useMemo(() => {
    const cats = [...new Set(productsData.map(product => product.category))];
    return ['all', ...cats];
  }, []);

  const brands = useMemo(() => {
    const brnds = [...new Set(productsData.map(product => product.brand))];
    return ['all', ...brnds];
  }, []);

  // Kategori ikonları
  const getCategoryIcon = (category) => {
    const iconMap = {
      'kompresor': <Settings size={16} />,
      'kesme-makineleri': <Zap size={16} />,
      'kirici-delici': <Wrench size={16} />,
      'isitici': <Zap size={16} />,
      'matkap': <Settings size={16} />,
      'all': <Package size={16} />
    };
    return iconMap[category] || <Package size={16} />;
  };

  // ============================================
  // FİLTRELEME LOGİĞİ
  // ============================================
  const filteredProducts = useMemo(() => {
    let filtered = [...productsData];

    // Arama filtresi
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.brand.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
      );
    }

    // Kategori filtresi
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Marka filtresi
    if (selectedBrand !== 'all') {
      filtered = filtered.filter(product => product.brand === selectedBrand);
    }

    return filtered;
  }, [searchQuery, selectedCategory, selectedBrand]);

  // ============================================
  // LIGHTBOX FONKSİYONLARI
  // ============================================
  const openLightbox = (product) => {
    setSelectedImage(product);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  const navigateLightbox = (direction) => {
    if (!selectedImage) return;
    
    const currentIndex = filteredProducts.findIndex(p => p.id === selectedImage.id);
    let newIndex;
    
    if (direction === 'prev') {
      newIndex = currentIndex === 0 ? filteredProducts.length - 1 : currentIndex - 1;
    } else {
      newIndex = currentIndex === filteredProducts.length - 1 ? 0 : currentIndex + 1;
    }
    
    setSelectedImage(filteredProducts[newIndex]);
  };

  // ============================================
  // PAYLAŞIM FONKSİYONLARI
  // ============================================
  const handleShare = (product, platform = null) => {
    const productUrl = `${window.location.origin}/gallery`;
    const shareText = `${product.brand} ${product.name} - Orhan Makine Bileme`;
    
    // Kopyala
    if (platform === 'copy') {
      navigator.clipboard.writeText(shareText + '\n' + productUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      setShowShareMenu(null);
      return;
    }
    
    // E-posta
    if (platform === 'email') {
      window.location.href = `mailto:?subject=${encodeURIComponent(shareText)}&body=${encodeURIComponent(`${shareText}\n\n${productUrl}`)}`;
      setShowShareMenu(null);
      return;
    }
    
    // WhatsApp
    if (platform === 'whatsapp') {
      window.open(`https://wa.me/?text=${encodeURIComponent(`${shareText}\n${productUrl}`)}`, '_blank');
      setShowShareMenu(null);
      return;
    }
    
    // Facebook
    if (platform === 'facebook') {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(productUrl)}&quote=${encodeURIComponent(shareText)}`, '_blank');
      setShowShareMenu(null);
      return;
    }
    
    // Modern Share API
    if (navigator.share) {
      navigator.share({
        title: shareText,
        text: `${product.brand} marka ${product.name}`,
        url: productUrl,
      });
      setShowShareMenu(null);
    }
  };

  // Paylaşım menüsünü dışarı tıklayınca kapat
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (shareMenuRef.current && !shareMenuRef.current.contains(event.target)) {
        setShowShareMenu(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // ============================================
  // RESİM YÜKLEME VE OPTİMİZASYON
  // ============================================
  const handleImageLoad = (e) => {
    e.target.classList.add('loaded');
  };

  const handleImageError = (e) => {
    e.target.src = '/images/placeholder.jpg';
  };

  // ============================================
  // RENDER - GÜNCELLENMİŞ
  // ============================================
  return (
    <div className="gallery-page">
      
      {/* ============================================
          BREADCRUMB (Minimal)
          ============================================ */}
      <nav className="gallery-breadcrumb" aria-label="Breadcrumb">
        <div className="gallery-breadcrumb-container">
          <Link to="/" className="gallery-breadcrumb-link">
            <Home size={16} />
            <span>Ana Sayfa</span>
          </Link>
          <ChevronRight size={14} />
          <span className="gallery-breadcrumb-current" aria-current="page">
            <Camera size={16} />
            <span>Galeri</span>
          </span>
        </div>
      </nav>

      {/* ============================================
          PAGE HEADER (Güncellenmiş - Arama geniş, filtre dengeli)
          ============================================ */}
      <header className="gallery-header">
        <div className="gallery-header-container">
          
          {/* Sol taraf: Başlık ve Ürün Sayacı */}
          <div className="gallery-header-left">
            <h1 className="gallery-title">
              Ürün Galerimiz
            </h1>
            <div className="gallery-counter">
              <span className="gallery-counter-number">{filteredProducts.length}</span>
              <span className="gallery-counter-text">ürün</span>
              <span className="gallery-counter-total">/ {productsData.length} toplam</span>
            </div>
          </div>
          
          {/* Sağ taraf: Genişletilmiş Arama ve Filtre */}
          <div className="gallery-header-right">
            
            {/* Arama Kutusu - GENİŞLETİLDİ */}
            <div className="gallery-search">
              <Search size={18} />
              <input
                type="text"
                placeholder="Ürün ara (isim, marka veya kategori)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Ürün arama"
                className="gallery-search-input"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  aria-label="Aramayı temizle"
                  className="gallery-search-clear"
                >
                  <X size={14} />
                </button>
              )}
            </div>
            
            {/* Filtre Butonu - Arama ile dengeli */}
            <button 
              className="gallery-filter-btn"
              onClick={() => setShowFilters(!showFilters)}
              aria-expanded={showFilters}
              aria-label="Filtreleri göster"
            >
              <Filter size={18} />
              <span>Filtreler</span>
              {showFilters ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
          </div>
        </div>
      </header>

      {/* ============================================
          FİLTRELER PANEL
          ============================================ */}
      {showFilters && (
        <div className="gallery-filters-panel" aria-label="Filtre seçenekleri">
          <div className="gallery-filters-content">
            
            {/* Kategori Filtresi */}
            <div className="gallery-filter-group">
              <h3 className="gallery-filter-title">
                <Package size={16} />
                <span>Kategori</span>
              </h3>
              <div className="gallery-filter-options">
                {categories.map(category => (
                  <button
                    key={category}
                    className={`gallery-filter-option ${selectedCategory === category ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(category)}
                    aria-pressed={selectedCategory === category}
                  >
                    {getCategoryIcon(category)}
                    <span>{category === 'all' ? 'Tümü' : category}</span>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Marka Filtresi */}
            <div className="gallery-filter-group">
              <h3 className="gallery-filter-title">
                <Building size={16} />
                <span>Marka</span>
              </h3>
              <div className="gallery-filter-options">
                {brands.map(brand => (
                  <button
                    key={brand}
                    className={`gallery-filter-option ${selectedBrand === brand ? 'active' : ''}`}
                    onClick={() => setSelectedBrand(brand)}
                    aria-pressed={selectedBrand === brand}
                  >
                    <Tag size={16} />
                    <span>{brand === 'all' ? 'Tümü' : brand}</span>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Aktif Filtreler ve Temizle */}
            <div className="gallery-filter-actions">
              <div className="gallery-active-filters">
                {selectedCategory !== 'all' && (
                  <span className="active-filter">
                    Kategori: {selectedCategory}
                    <button onClick={() => setSelectedCategory('all')}>
                      <X size={12} />
                    </button>
                  </span>
                )}
                {selectedBrand !== 'all' && (
                  <span className="active-filter">
                    Marka: {selectedBrand}
                    <button onClick={() => setSelectedBrand('all')}>
                      <X size={12} />
                    </button>
                  </span>
                )}
              </div>
              
              <button 
                className="gallery-filter-clear"
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedBrand('all');
                  setSearchQuery('');
                }}
                aria-label="Tüm filtreleri temizle"
              >
                <X size={14} />
                <span>Temizle</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================
          ANA GALERİ
          ============================================ */}
      <main className="gallery-main" id="main-content">
        
        {/* Sonuç Bilgisi */}
        {filteredProducts.length !== productsData.length && (
          <div className="gallery-results-info">
            <p>
              <strong>{filteredProducts.length}</strong> ürün bulundu
              {searchQuery && ` • "${searchQuery}" için`}
              {selectedCategory !== 'all' && ` • ${selectedCategory}`}
              {selectedBrand !== 'all' && ` • ${selectedBrand}`}
            </p>
          </div>
        )}
        
        {/* Galeri Grid */}
        <div className="gallery-grid">
          {filteredProducts.length === 0 ? (
            <div className="gallery-empty">
              <Package size={48} />
              <h3>Ürün Bulunamadı</h3>
              <p>Arama kriterlerinize uygun ürün bulunamadı.</p>
              <button 
                className="gallery-empty-btn"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setSelectedBrand('all');
                }}
              >
                Filtreleri Sıfırla
              </button>
            </div>
          ) : (
            filteredProducts.map(product => (
              <article 
                key={product.id} 
                className="gallery-card"
              >
                
                {/* Ürün Görseli - #5ba3f7 arka plan rengi */}
                <div className="gallery-card-image">
                  <img 
                    src={product.image} 
                    alt={`${product.name} - ${product.brand} marka makine`}
                    loading="lazy"
                    width="400"
                    height="300"
                    className="gallery-image"
                    onLoad={handleImageLoad}
                    onError={handleImageError}
                  />
                  
                  {/* Overlay Butonları */}
                  <div className="gallery-card-overlay">
                    <button 
                      className="gallery-zoom-btn"
                      onClick={() => openLightbox(product)}
                      aria-label={`${product.name} fotoğrafını büyüt`}
                    >
                      <Maximize2 size={20} />
                    </button>
                    
                    {/* Paylaşım Butonu ve Menüsü */}
                    <div className="gallery-share-container" ref={shareMenuRef}>
                      <button 
                        className="gallery-share-btn"
                        onClick={() => setShowShareMenu(showShareMenu === product.id ? null : product.id)}
                        aria-label="Ürünü paylaş"
                        aria-expanded={showShareMenu === product.id}
                      >
                        <Share2 size={20} />
                      </button>
                      
                      {/* Paylaşım Menüsü */}
                      {showShareMenu === product.id && (
                        <div className="gallery-share-menu">
                          <div className="share-menu-header">
                            <span>Paylaş</span>
                            <button 
                              onClick={() => setShowShareMenu(null)}
                              aria-label="Paylaşım menüsünü kapat"
                            >
                              <X size={16} />
                            </button>
                          </div>
                          
                          <div className="share-options">
                            <button 
                              className="share-option"
                              onClick={() => handleShare(product, 'whatsapp')}
                              aria-label="WhatsApp'ta paylaş"
                            >
                              <MessageCircle size={18} />
                              <span>WhatsApp</span>
                            </button>
                            
                            <button 
                              className="share-option"
                              onClick={() => handleShare(product, 'facebook')}
                              aria-label="Facebook'ta paylaş"
                            >
                              <Facebook size={18} />
                              <span>Facebook</span>
                            </button>
                            
                            <button 
                              className="share-option"
                              onClick={() => handleShare(product, 'email')}
                              aria-label="E-posta ile paylaş"
                            >
                              <Mail size={18} />
                              <span>E-posta</span>
                            </button>
                            
                            <button 
                              className="share-option"
                              onClick={() => handleShare(product, 'copy')}
                              aria-label="Linki kopyala"
                            >
                              {copied ? <Check size={18} /> : <Copy size={18} />}
                              <span>{copied ? 'Kopyalandı!' : 'Kopyala'}</span>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* YENİ ÜRÜN BADGE KALDIRILDI */}
                </div>
                
                {/* Ürün Bilgileri */}
                <div className="gallery-card-info">
                  <div className="gallery-card-brand">
                    <Building size={14} />
                    <span>{product.brand}</span>
                  </div>
                  
                  <h3 className="gallery-card-title">
                    {product.name}
                  </h3>
                  
                  {/* Kategori */}
                  <div className="gallery-card-category">
                    {getCategoryIcon(product.category)}
                    <span>{product.category}</span>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
      </main>

      {/* ============================================
          LIGHTBOX MODAL
          ============================================ */}
      {selectedImage && (
        <div 
          className="gallery-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`${selectedImage.name} - Tam ekran görünüm`}
        >
          <div className="gallery-lightbox-backdrop" onClick={closeLightbox} />
          
          <div className="gallery-lightbox-container">
            
            {/* Kapatma Butonu */}
            <button 
              className="gallery-lightbox-close"
              onClick={closeLightbox}
              aria-label="Kapat"
            >
              <X size={24} />
            </button>
            
            {/* Navigasyon */}
            <button 
              className="gallery-lightbox-nav prev"
              onClick={() => navigateLightbox('prev')}
              aria-label="Önceki ürün"
            >
              <ArrowLeft size={24} />
            </button>
            
            <button 
              className="gallery-lightbox-nav next"
              onClick={() => navigateLightbox('next')}
              aria-label="Sonraki ürün"
            >
              <ArrowRight size={24} />
            </button>
            
            {/* Görsel */}
            <div className="gallery-lightbox-image-wrapper">
              <img 
                src={selectedImage.image} 
                alt={selectedImage.name}
                className="gallery-lightbox-image"
                loading="eager"
              />
            </div>
            
            {/* Bilgiler */}
            <div className="gallery-lightbox-info">
              <div className="gallery-lightbox-brand">
                <Building size={16} />
                <span>{selectedImage.brand}</span>
              </div>
              
              <h2 className="gallery-lightbox-title">
                {selectedImage.name}
              </h2>
              
              {/* Kategori */}
              <div className="gallery-lightbox-category">
                {getCategoryIcon(selectedImage.category)}
                <span>{selectedImage.category}</span>
              </div>
              
              {/* Paylaşım Butonları */}
              <div className="gallery-lightbox-share">
                <span>Paylaş:</span>
                <button 
                  onClick={() => handleShare(selectedImage, 'whatsapp')}
                  aria-label="WhatsApp'ta paylaş"
                  className="lightbox-share-btn"
                >
                  <MessageCircle size={18} />
                </button>
                <button 
                  onClick={() => handleShare(selectedImage, 'facebook')}
                  aria-label="Facebook'ta paylaş"
                  className="lightbox-share-btn"
                >
                  <Facebook size={18} />
                </button>
                <button 
                  onClick={() => handleShare(selectedImage, 'email')}
                  aria-label="E-posta ile paylaş"
                  className="lightbox-share-btn"
                >
                  <Mail size={18} />
                </button>
                <button 
                  onClick={() => handleShare(selectedImage, 'copy')}
                  aria-label="Linki kopyala"
                  className="lightbox-share-btn"
                >
                  {copied ? <Check size={18} /> : <Copy size={18} />}
                </button>
              </div>
            </div>
            
            {/* Thumbnail Navigasyon */}
            <div className="gallery-lightbox-thumbnails">
              {filteredProducts.map(product => (
                <button
                  key={product.id}
                  className={`gallery-lightbox-thumb ${selectedImage.id === product.id ? 'active' : ''}`}
                  onClick={() => setSelectedImage(product)}
                  aria-label={`${product.name} görseline git`}
                >
                  <img src={product.image} alt="" loading="lazy" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ============================================
          GALERİ FOOTER (Güncellenmiş)
          ============================================ */}
      <footer className="gallery-footer">
        <div className="gallery-footer-container">
          <div className="gallery-footer-stats">
            <div className="footer-stat">
              <span className="stat-number">{productsData.length}</span>
              <span className="stat-label">Toplam Ürün</span>
            </div>
            <div className="footer-stat">
              <span className="stat-number">{brands.length - 1}</span>
              <span className="stat-label">Marka</span>
            </div>
            <div className="footer-stat">
              <span className="stat-number">{categories.length - 1}</span>
              <span className="stat-label">Kategori</span>
            </div>
          </div>
          
          <p className="gallery-footer-note">
            Tüm ürünlerimiz Orhan Makine Bileme garantisi altındadır.
            <Link to="/products" className="gallery-footer-link"> Tüm Ürünleri İncele</Link>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default GalleryPage;