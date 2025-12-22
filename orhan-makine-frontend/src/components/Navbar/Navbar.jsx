import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { productsData } from "../../data/productsData";
import {
  Search,
  ShoppingCart,
  User,
  Phone,
  Clock,
  Menu,
  X,
  Truck,
  Heart,
  Package,
  ShoppingBag,
  Home,
  Info,
  Images,
  Mail,
  MapPin
} from "lucide-react";

import { useFavorites } from "../../context/FavoritesContext";
import { useCart } from "../../context/CartContext";

import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  
  // =====================================================
  // STATE YÖNETİMİ
  // =====================================================
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showCartPreview, setShowCartPreview] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [isTablet, setIsTablet] = useState(
    window.innerWidth >= 768 && window.innerWidth < 1024
  );

  // =====================================================
  // REF YÖNETİMİ
  // =====================================================
  const searchRef = useRef(null);
  const searchInputRef = useRef(null);
  const cartRef = useRef(null);
  const navbarRef = useRef(null);
  const cartPreviewRef = useRef(null);
  const cartIconRef = useRef(null);
  const previewTimeoutRef = useRef(null);

  // =====================================================
  // CONTEXT API
  // =====================================================
  const { favoritesCount } = useFavorites();
  const { cartItems, getItemCount, getTotalPrice, removeFromCart } = useCart();
  const cartCount = getItemCount();

  // =====================================================
  // MOBİL DETECTION & SCROLL EFFECT
  // =====================================================
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 1024);
      setIsTablet(width >= 768 && width < 1024);
      
      if (width >= 1024) {
        setIsMenuOpen(false);
      }
    };

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
      setShowSearchResults(false);
      setShowCartPreview(false);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // =====================================================
  // DIŞ TIKLAMA ALGILAMA
  // =====================================================
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(e.target) &&
        searchInputRef.current &&
        !searchInputRef.current.contains(e.target)
      ) {
        setShowSearchResults(false);
      }

      // Sepet önizlemesi için: İkon veya önizleme kutusu dışına tıklanırsa kapat
      if (
        cartRef.current && 
        !cartRef.current.contains(e.target) && 
        cartPreviewRef.current && 
        !cartPreviewRef.current.contains(e.target)
      ) {
        setShowCartPreview(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // =====================================================
  // MENÜ İÇERİKLERİ
  // =====================================================
  const menuItems = useMemo(
    () => [
      { text: "Anasayfa", path: "/", icon: <Home className="mobile-menu-icon" /> },
      { text: "Ürünler", path: "/products", icon: <ShoppingBag className="mobile-menu-icon" /> },
      { text: "Hizmetlerimiz", path: "/services", icon: <Info className="mobile-menu-icon" /> },
      { text: "Hakkımızda", path: "/about", icon: <User className="mobile-menu-icon" /> },
      { text: "Galeri", path: "/gallery", icon: <Images className="mobile-menu-icon" /> },
      { text: "İletişim", path: "/contact", icon: <Mail className="mobile-menu-icon" /> },
    ],
    []
  );

  // =====================================================
  // ARAMA FONKSİYONU
  // =====================================================
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return productsData
      .filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .slice(0, 6);
  }, [searchQuery]);

  // =====================================================
  // EVENT HANDLER'LAR
  // =====================================================
  const handleSearchChange = useCallback((e) => {
    setSearchQuery(e.target.value);
    setShowSearchResults(true);
    setShowCartPreview(false);
  }, []);

  const handleSearchFocus = useCallback(() => {
    if (searchQuery.length > 0) setShowSearchResults(true);
  }, [searchQuery]);

  const handleSearchSubmit = useCallback((e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
      setShowSearchResults(false);
      setIsMenuOpen(false);
    }
  }, [searchQuery, navigate]);

  const handleSearchItemClick = useCallback(() => {
    setSearchQuery("");
    setShowSearchResults(false);
    setIsMenuOpen(false);
  }, []);

  // SEPET ÖNİZLEME TOGGLE - Desktop için
  const handleCartPreviewToggle = useCallback(
    (e) => {
      // Desktop'ta ve sepet doluysa: Önizlemeyi aç/kapat, linki engelle
      if (!isMobile && cartItems.length > 0) {
        e.preventDefault();
        e.stopPropagation();
        setShowCartPreview((prev) => !prev);
        setShowSearchResults(false);
      }
      // Mobile veya sepet boşsa: Normal link davranışı (yönlendir)
    },
    [isMobile, cartItems.length]
  );

  // SEPET İKONUNA TIKLAMA - Desktop için doğrudan sepet sayfasına git
  const handleCartIconClick = useCallback((e) => {
    if (!isMobile && cartItems.length === 0) {
      // Sepet boşsa doğrudan sepet sayfasına git
      navigate("/cart");
      setShowCartPreview(false);
    }
    // Sepet doluysa handleCartPreviewToggle zaten önizlemeyi yönetecek
  }, [isMobile, cartItems.length, navigate]);

  // SEPETE HOVER - Mouse üzerine gelince önizleme aç
  const handleCartMouseEnter = useCallback(() => {
    if (!isMobile && cartItems.length > 0) {
      // Önceki timeout'u temizle
      if (previewTimeoutRef.current) {
        clearTimeout(previewTimeoutRef.current);
      }
      setShowCartPreview(true);
      setShowSearchResults(false);
    }
  }, [isMobile, cartItems.length]);

  // SEPETTEN ÇIKARKEN - Gecikmeli kapatma
  const handleCartMouseLeave = useCallback(() => {
    if (!isMobile && cartItems.length > 0) {
      previewTimeoutRef.current = setTimeout(() => {
        // Eğer mouse hala sepet ikonu veya önizleme kutusu üzerinde değilse kapat
        const isMouseOverCart = cartIconRef.current?.contains(document.activeElement) || 
                               cartPreviewRef.current?.contains(document.activeElement);
        
        if (!isMouseOverCart) {
          setShowCartPreview(false);
        }
      }, 300); // 300ms gecikme
    }
  }, [isMobile, cartItems.length]);

  // ÖNİZLEME KUTUSUNA HOVER
  const handlePreviewMouseEnter = useCallback(() => {
    if (previewTimeoutRef.current) {
      clearTimeout(previewTimeoutRef.current);
    }
  }, []);

  // ÖNİZLEME KUTUSUNDAN ÇIKARKEN
  const handlePreviewMouseLeave = useCallback(() => {
    if (!isMobile && cartItems.length > 0) {
      previewTimeoutRef.current = setTimeout(() => {
        setShowCartPreview(false);
      }, 300);
    }
  }, [isMobile, cartItems.length]);

  const handleRemoveFromCart = useCallback(
    (e, id) => {
      e.preventDefault();
      e.stopPropagation();
      removeFromCart(id);
    },
    [removeFromCart]
  );

  const closeAll = useCallback(() => {
    setShowSearchResults(false);
    setShowCartPreview(false);
    setIsMenuOpen(false);
  }, []);

  const formatPrice = useCallback((price) => {
    return new Intl.NumberFormat("tr-TR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  }, []);

  // =====================================================
  // CLEANUP EFFECT
  // =====================================================
  useEffect(() => {
    return () => {
      if (previewTimeoutRef.current) {
        clearTimeout(previewTimeoutRef.current);
      }
    };
  }, []);

  // =====================================================
  // RENDER
  // =====================================================
  return (
    <>
      {/* TOP BAR - Sadece Desktop'ta (1024px+) */}
      {!isMobile && (
        <div className="nav-top-bar">
          <div className="nav-top-bar-container">
            <div className="nav-top-bar-content">
              <div className="nav-contact-info">
                <div className="nav-contact-item">
                  <Phone className="nav-contact-icon" />
                  <a href="tel:+905395159925" className="nav-contact-link">
                    +90 539 515 99 25
                  </a>
                </div>

                <div className="nav-contact-item">
                  <Clock className="nav-contact-icon" />
                  <span>Pzt - Cmt: 08:00 - 18:00</span>
                </div>

                <div className="nav-contact-item">
                  <Truck className="nav-contact-icon" />
                  <span>10.000 TL Üzeri Ücretsiz Kargo</span>
                </div>
              </div>

              <div className="nav-top-bar-right">
                <Link to="/login" className="nav-login-btn">
                  <User className="login-icon" />
                  <span>Giriş Yap / Üye Ol</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MAIN NAVBAR */}
      <nav 
        ref={navbarRef}
        className={`nav-navbar ${isScrolled ? "nav-navbar-scrolled" : ""}`}
        role="navigation"
        aria-label="Ana navigasyon"
      >
        <div className="nav-container">
          
          {/* HAMBURGER MENU BUTTON (Mobil & Tablet) */}
          {isMobile && (
            <button
              className="nav-hamburger"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Menüyü kapat" : "Menüyü aç"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMenuOpen ? <X className="hamburger-icon" /> : <Menu className="hamburger-icon" />}
            </button>
          )}

          {/* LOGO - PC'de solda, Mobilde sola hizalı */}
          <Link 
            to="/" 
            className={`nav-logo-wrapper ${isMobile ? 'mobile' : 'desktop'}`}
            onClick={closeAll}
            aria-label="Orhan Makine Ana Sayfa"
          >
            <div className="nav-logo-image">
              <picture>
                <source srcSet="/images/logo.webp" type="image/webp" />
                <img
                  src="/images/logo.png"
                  alt="Orhan Makine Logo"
                  className="nav-logo-img"
                  loading="eager"
                  decoding="async"
                  width="120"
                  height="60"
                />
              </picture>
            </div>
            
            {/* Logo yazısı - PC'de ve Mobilde görünsün */}
            <div className="nav-logo-text">
              <h1 className="nav-logo-title">
                <span className="orhan-text">Orhan</span>
                <span className="makina-text">Makine</span>
              </h1>
              <p className="nav-logo-subtext">
                BİLEME İNŞ. TUR. PAZ. İTH. İHR. SAN. ve TİC. LTD. ŞTİ.
              </p>
            </div>
          </Link>

          {/* DESKTOP MENÜ (1024px+) */}
          {!isMobile && (
            <nav className="nav-menu" aria-label="Ana menü">
              {menuItems.map((item) => (
                <Link
                  key={item.text}
                  to={item.path}
                  className="nav-item"
                  onClick={closeAll}
                >
                  {item.text}
                </Link>
              ))}
            </nav>
          )}

          {/* DESKTOP ARAMA (1024px+) */}
          {!isMobile && (
            <div className="nav-search-container" ref={searchRef}>
              <form 
                onSubmit={handleSearchSubmit} 
                className="nav-search-wrapper"
                role="search"
                aria-label="Site içi arama"
              >
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Ürün ara..."
                  className="nav-search-input"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onFocus={handleSearchFocus}
                  aria-label="Arama terimi"
                />
                <button 
                  type="submit" 
                  className="nav-search-button"
                  aria-label="Ara"
                >
                  <Search className="nav-search-icon" />
                </button>
              </form>

              {/* ARAMA SONUÇLARI DROPDOWN */}
              {showSearchResults && searchQuery.length > 0 && (
                <div 
                  className="nav-search-dropdown" 
                  role="listbox"
                  aria-label="Arama sonuçları"
                >
                  {searchResults.length > 0 ? (
                    <>
                      <div className="nav-search-results-header">
                        <span>{searchResults.length} ürün bulundu</span>
                      </div>
                      {searchResults.map((product) => (
                        <Link
                          key={product.id}
                          to={`/product/${product.id}`}
                          className="nav-search-result-item"
                          onClick={handleSearchItemClick}
                          role="option"
                        >
                          <div className="search-result-image">
                            <img
                              src={product.image}
                              alt={product.name}
                              loading="lazy"
                              width="48"
                              height="48"
                            />
                          </div>
                          <div className="search-result-info">
                            <span className="nav-search-result-name">
                              {product.name}
                            </span>
                            <span className="nav-search-result-price">
                              {formatPrice(product.price)} TL
                            </span>
                          </div>
                        </Link>
                      ))}
                    </>
                  ) : (
                    <div className="nav-search-no-result">
                      <Package className="no-result-icon" />
                      <span>Aramanızla eşleşen ürün bulunamadı</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* AKSİYON İKONLARI */}
          <div className="nav-actions">
            {/* MOBİL İÇİN */}
            {isMobile ? (
              <>
                {/* FAVORİLER - Mobil */}
                <Link
                  to="/favorites"
                  className="nav-action-icon favorites-icon mobile-with-text"
                  onClick={closeAll}
                  aria-label="Favoriler"
                >
                  <Heart className="icon" />
                  <span className="nav-action-text">Favoriler</span>
                  {favoritesCount > 0 && (
                    <span className="nav-badge favorites-badge" aria-label={`${favoritesCount} favori ürün`}>
                      {favoritesCount}
                    </span>
                  )}
                </Link>

                {/* SEPET - Mobil (DİREKT YÖNLENDİR) */}
                <Link
                  to="/cart"
                  className="nav-action-icon cart-icon mobile-with-text"
                  onClick={closeAll}
                  aria-label="Sepet"
                >
                  <ShoppingCart className="icon" />
                  <span className="nav-action-text">Sepet</span>
                  {cartCount > 0 && (
                    <span className="nav-badge cart-badge" aria-label={`${cartCount} ürün sepetinizde`}>
                      {cartCount}
                    </span>
                  )}
                </Link>
              </>
            ) : (
              <>
                {/* DESKTOP İÇİN */}
                {/* FAVORİLER */}
                <Link
                  to="/favorites"
                  className="nav-action-icon favorites-icon"
                  onClick={closeAll}
                  aria-label="Favoriler"
                >
                  <Heart className="icon" />
                  <span className="nav-action-text">Favoriler</span>
                  {favoritesCount > 0 && (
                    <span className="nav-badge favorites-badge" aria-label={`${favoritesCount} favori ürün`}>
                      {favoritesCount}
                    </span>
                  )}
                </Link>

                {/* SEPET - Desktop (HOVER + CLICK) */}
                <div 
                  className="nav-cart-container" 
                  ref={cartRef}
                  onMouseEnter={handleCartMouseEnter}
                  onMouseLeave={handleCartMouseLeave}
                >
                  <Link
                    to="/cart"
                    className="nav-action-icon cart-icon"
                    onClick={(e) => {
                      handleCartIconClick(e);
                      handleCartPreviewToggle(e);
                    }}
                    aria-label="Sepet"
                    ref={cartIconRef}
                  >
                    <ShoppingCart className="icon" />
                    <span className="nav-action-text">Sepet</span>
                    {cartCount > 0 && (
                      <span className="nav-badge cart-badge" aria-label={`${cartCount} ürün sepetinizde`}>
                        {cartCount}
                      </span>
                    )}
                  </Link>

                  {/* SEPET ÖNİZLEME (Sadece Desktop) */}
                  {showCartPreview && cartItems.length > 0 && (
                    <div 
                      className="nav-cart-preview" 
                      ref={cartPreviewRef}
                      role="dialog"
                      aria-label="Sepet önizleme"
                      onMouseEnter={handlePreviewMouseEnter}
                      onMouseLeave={handlePreviewMouseLeave}
                    >
                      <div className="cart-preview-header">
                        <h4>Sepetim</h4>
                        <span className="cart-items-count">
                          {cartCount} ürün
                        </span>
                      </div>
                      <div className="cart-preview-items">
                        {cartItems.slice(0, 3).map((item) => (
                          <div key={item.id} className="cart-preview-item">
                            <div className="cart-preview-item-image">
                              <img src={item.image} alt={item.name} width="60" height="60" />
                            </div>
                            <div className="cart-preview-item-info">
                              <h5>{item.name}</h5>
                              <div className="cart-preview-item-meta">
                                <span>{item.quantity} adet</span>
                                <span>×</span>
                                <span className="price">
                                  {formatPrice(item.price)} TL
                                </span>
                              </div>
                              <div className="cart-preview-item-total">
                                {formatPrice(item.price * item.quantity)} TL
                              </div>
                            </div>
                            <button
                              className="cart-preview-remove"
                              onClick={(e) => handleRemoveFromCart(e, item.id)}
                              aria-label={`${item.name} ürününü kaldır`}
                            >
                              <X className="remove-icon" />
                            </button>
                          </div>
                        ))}
                      </div>
                      {cartItems.length > 3 && (
                        <div className="cart-preview-more">
                          +{cartItems.length - 3} ürün daha...
                        </div>
                      )}
                      <div className="cart-preview-total">
                        <span>Toplam:</span>
                        <span className="total-price">
                          {formatPrice(getTotalPrice())} TL
                        </span>
                      </div>
                      <div className="cart-preview-actions">
                        <Link 
                          to="/cart" 
                          className="btn-view-cart" 
                          onClick={() => {
                            closeAll();
                            setShowCartPreview(false);
                          }}
                        >
                          <ShoppingBag className="btn-icon" />
                          Sepete Git
                        </Link>
                        <Link 
                          to="/checkout" 
                          className="btn-checkout" 
                          onClick={() => {
                            closeAll();
                            setShowCartPreview(false);
                          }}
                        >
                          Ödeme Yap
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>

        {/* MOBİL ARAMA BAR (Navbar Altında - Mobil & Tablet) */}
        {isMobile && (
          <div className="nav-mobile-search-container">
            <div className="nav-mobile-search-wrapper">
              <form 
                onSubmit={handleSearchSubmit} 
                className="nav-mobile-search-form"
                role="search"
                aria-label="Mobil site içi arama"
              >
                <input
                  type="text"
                  placeholder="Ürün ara..."
                  className="nav-mobile-search-input"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onFocus={handleSearchFocus}
                  aria-label="Arama terimi"
                />
                <button 
                  type="submit" 
                  className="nav-mobile-search-button"
                  aria-label="Ara"
                >
                  <Search className="nav-mobile-search-icon" />
                </button>
              </form>

              {/* MOBİL ARAMA SONUÇLARI */}
              {showSearchResults && searchQuery.length > 0 && (
                <div 
                  className="nav-mobile-search-results" 
                  role="listbox"
                  aria-label="Mobil arama sonuçları"
                >
                  {searchResults.length > 0 ? (
                    searchResults.map((product) => (
                      <Link
                        key={product.id}
                        to={`/product/${product.id}`}
                        className="nav-mobile-search-result-item"
                        onClick={handleSearchItemClick}
                        role="option"
                      >
                        <div className="nav-mobile-result-image">
                          <img src={product.image} alt={product.name} width="48" height="48" />
                        </div>
                        <div className="nav-mobile-result-info">
                          <span className="nav-mobile-result-name">
                            {product.name}
                          </span>
                          <span className="nav-mobile-result-price">
                            {formatPrice(product.price)} TL
                          </span>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <div className="nav-mobile-no-results">
                      <Package className="nav-no-result-icon" />
                      <span>Aramanızla eşleşen ürün bulunamadı</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* MOBİL MENÜ SIDEBAR */}
        {isMobile && (
          <>
            <div 
              className={`nav-mobile-menu ${isMenuOpen ? "open" : ""}`}
              id="mobile-menu"
              role="dialog"
              aria-label="Mobil menü"
              aria-modal="true"
            >
              <div className="mobile-menu-header">
                <div className="mobile-menu-user">
                  <User className="user-icon" />
                  <div>
                    <span className="user-greeting">Hoş geldiniz</span>
                    <Link to="/login" className="user-login" onClick={closeAll}>
                      Giriş Yap / Üye Ol
                    </Link>
                  </div>
                </div>
                <button 
                  className="mobile-menu-close" 
                  onClick={() => setIsMenuOpen(false)}
                  aria-label="Menüyü kapat"
                >
                  <X className="close-icon" />
                </button>
              </div>

              <nav className="mobile-menu-items" aria-label="Mobil menü öğeleri">
                {menuItems.map((item) => (
                  <Link
                    key={item.text}
                    to={item.path}
                    className="mobile-menu-item"
                    onClick={closeAll}
                  >
                    {item.icon}
                    <span>{item.text}</span>
                  </Link>
                ))}
              </nav>

              <div className="mobile-menu-footer">
                <div className="mobile-menu-contact">
                  <div className="contact-item">
                    <Phone className="contact-icon" />
                    <a href="tel:+905395159925">+90 539 515 99 25</a>
                  </div>
                  <div className="contact-item">
                    <Clock className="contact-icon" />
                    <span>Pzt - Cmt: 08:00 - 18:00</span>
                  </div>
                  <div className="contact-item">
                    <Truck className="contact-icon" />
                    <span>10.000 TL Üzeri Ücretsiz Kargo</span>
                  </div>
                  <div className="contact-item">
                    <MapPin className="contact-icon" />
                    <span>Orhan Makine</span>
                  </div>
                </div>
                
                {cartCount > 0 && (
                  <div className="mobile-cart-summary">
                    <ShoppingCart className="cart-summary-icon" />
                    <div className="cart-summary-info">
                      <span className="cart-count">{cartCount} ürün</span>
                      <span className="cart-total">{formatPrice(getTotalPrice())} TL</span>
                    </div>
                    <Link to="/cart" className="cart-summary-button" onClick={closeAll}>
                      Sepete Git
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* MOBİL MENÜ OVERLAY */}
            {isMenuOpen && (
              <div 
                className="nav-mobile-overlay" 
                onClick={() => setIsMenuOpen(false)}
                aria-label="Menüyü kapat"
                role="presentation"
              />
            )}
          </>
        )}
      </nav>
    </>
  );
}