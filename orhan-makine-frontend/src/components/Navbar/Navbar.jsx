import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { productsData } from "../../data/productsData";
import {
  Search,
  ShoppingCart,
  User,
  Phone,
  MapPin,
  Clock,
  Menu,
  X,
  Truck,
  ShieldCheck,
  Heart,
  LogIn,
  Package,
  ShoppingBag,
  Home,
  Info,
  Images,
  Mail
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
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  // =====================================================
  // REF YÖNETİMİ
  // =====================================================
  const searchRef = useRef(null);
  const searchInputRef = useRef(null);
  const cartRef = useRef(null);
  const navbarRef = useRef(null);

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
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
        setIsSearchExpanded(false);
      }
    };

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
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
      // Arama dropdown'ı kapat
      if (
        searchRef.current &&
        !searchRef.current.contains(e.target) &&
        searchInputRef.current &&
        !searchInputRef.current.contains(e.target)
      ) {
        setShowSearchResults(false);
      }

      // Sepet preview'ını kapat
      if (cartRef.current && !cartRef.current.contains(e.target)) {
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
    if (isMobile) setIsSearchExpanded(true);
  }, [searchQuery, isMobile]);

  const handleSearchSubmit = useCallback((e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
      setShowSearchResults(false);
      setIsSearchExpanded(false);
      setIsMenuOpen(false);
    }
  }, [searchQuery, navigate]);

  const handleSearchItemClick = useCallback(() => {
    setSearchQuery("");
    setShowSearchResults(false);
    setIsMenuOpen(false);
    setIsSearchExpanded(false);
  }, []);

  const handleCartIconClick = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      setShowCartPreview((prev) => !prev);
      setShowSearchResults(false);
    },
    []
  );

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
    setIsSearchExpanded(false);
  }, []);

  const formatPrice = useCallback((price) => {
    return new Intl.NumberFormat("tr-TR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  }, []);

  // =====================================================
  // RENDER
  // =====================================================
  return (
    <>
      {/* TOP BAR - Sadece Desktop'ta göster */}
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
                  <MapPin className="nav-contact-icon" />
                  <span>Orhan Makine</span>
                </div>

                <div className="nav-contact-item">
                  <Clock className="nav-contact-icon" />
                  <span>Pzt - Cmt: 08:00 - 18:00</span>
                </div>
              </div>

              <div className="nav-top-bar-cta">
                <Truck className="nav-cta-icon" />
                <span>10.000 TL Üzeri Ücretsiz Kargo</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MAIN NAVBAR */}
      <nav 
        ref={navbarRef}
        className={`nav-navbar ${isScrolled ? "nav-navbar-scrolled" : ""} ${isMobile ? "nav-mobile" : ""}`}
      >
        <div className="nav-container">
          
          {/* HAMBURGER MENU BUTTON (Mobilde Sol Tarafta) */}
          {isMobile && (
            <button
              className="nav-hamburger"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Menüyü kapat" : "Menüyü aç"}
            >
              {isMenuOpen ? <X className="hamburger-icon" /> : <Menu className="hamburger-icon" />}
            </button>
          )}

          {/* LOGO (Mobilde Ortada) */}
          <Link to="/" className="nav-logo-wrapper" onClick={closeAll}>
            <div className="nav-logo-image">
              <picture>
                <source srcSet="/images/logo.webp" type="image/webp" />
                <img
                  src="/images/logo.png"
                  alt="Orhan Makine Logo"
                  className="nav-logo-img"
                  loading="lazy"
                  decoding="async"
                />
              </picture>
            </div>
            
            {!isMobile && (
              <div className="nav-logo-text">
                <h1 className="nav-logo-title">
                  <span className="orhan-text">Orhan</span>
                  <span className="makina-text"> Makine</span>
                </h1>
                <p className="nav-logo-subtext">
                  BİLEME İNŞ. TUR. PAZ. İTH. İHR. SAN. ve TİC. LTD.
                </p>
              </div>
            )}
          </Link>

          {/* DESKTOP MENÜ (768px+) */}
          {!isMobile && (
            <div className="nav-menu">
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
            </div>
          )}

          {/* SAĞ TARAF AKSİYONLARI */}
          <div className="nav-actions">
            
            {/* DESKTOP ARAMA (768px+) */}
            {!isMobile && (
              <div className="nav-search-container" ref={searchRef}>
                <form onSubmit={handleSearchSubmit} className="nav-search-wrapper">
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Ürün ara..."
                    className="nav-search-input"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    onFocus={handleSearchFocus}
                  />
                  <button type="submit" className="nav-search-button">
                    <Search className="nav-search-icon" />
                  </button>
                </form>

                {/* ARAMA SONUÇLARI DROPDOWN */}
                {showSearchResults && searchQuery.length > 0 && (
                  <div className="nav-search-dropdown">
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
                          >
                            <div className="search-result-image">
                              <img
                                src={product.image}
                                alt={product.name}
                                loading="lazy"
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
            <div className="nav-action-icons">
              
              {/* MOBİL ARAMA İKONU */}
              {isMobile && !isSearchExpanded && (
                <button
                  className="nav-action-icon"
                  onClick={() => setIsSearchExpanded(true)}
                  aria-label="Arama yap"
                >
                  <Search className="icon" />
                </button>
              )}

              {/* KULLANICI GİRİŞİ */}
              <Link to="/login" className="nav-action-icon" onClick={closeAll}>
                <User className="icon" />
                {!isMobile && <span className="nav-action-text">Giriş</span>}
              </Link>

              {/* ADMIN PANELİ */}
              <Link
                to="/admin"
                className="nav-action-icon admin-icon"
                onClick={closeAll}
              >
                <ShieldCheck className="icon" />
                {!isMobile && <span className="nav-action-text">Admin</span>}
              </Link>

              {/* FAVORİLER */}
              <Link
                to="/favorites"
                className="nav-action-icon favorites-icon"
                onClick={closeAll}
              >
                <Heart className="icon" />
                {favoritesCount > 0 && (
                  <span className="nav-badge favorites-badge">
                    {favoritesCount}
                  </span>
                )}
                {!isMobile && <span className="nav-action-text">Favoriler</span>}
              </Link>

              {/* SEPET */}
              <div className="nav-cart-container" ref={cartRef}>
                <Link
                  to="/cart"
                  className="nav-action-icon cart-icon"
                  onClick={handleCartIconClick}
                >
                  <ShoppingCart className="icon" />
                  {cartCount > 0 && (
                    <span className="nav-badge cart-badge">{cartCount}</span>
                  )}
                  {!isMobile && <span className="nav-action-text">Sepet</span>}
                </Link>

                {/* SEPET ÖNİZLEME (Sadece Desktop) */}
                {!isMobile && showCartPreview && cartItems.length > 0 && (
                  <div className="nav-cart-preview">
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
                            <img src={item.image} alt={item.name} />
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
                      <Link to="/cart" className="btn-view-cart" onClick={closeAll}>
                        <ShoppingBag className="btn-icon" />
                        Sepete Git
                      </Link>
                      <Link to="/checkout" className="btn-checkout" onClick={closeAll}>
                        Ödeme Yap
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* MOBİL ARAMA BAR (Açık durumda) */}
        {isMobile && isSearchExpanded && (
          <div className="nav-mobile-search-expanded">
            <div className="mobile-search-container">
              <form onSubmit={handleSearchSubmit} className="mobile-search-form">
                <button
                  type="button"
                  className="mobile-search-back"
                  onClick={() => setIsSearchExpanded(false)}
                >
                  <X className="back-icon" />
                </button>
                <input
                  type="text"
                  placeholder="Ürün ara..."
                  className="mobile-search-input"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onFocus={handleSearchFocus}
                  autoFocus
                />
                <button type="submit" className="mobile-search-submit">
                  <Search className="search-icon" />
                </button>
              </form>
              
              {/* MOBİL ARAMA SONUÇLARI */}
              {showSearchResults && searchQuery.length > 0 && (
                <div className="mobile-search-results">
                  {searchResults.length > 0 ? (
                    searchResults.map((product) => (
                      <Link
                        key={product.id}
                        to={`/product/${product.id}`}
                        className="mobile-search-result-item"
                        onClick={handleSearchItemClick}
                      >
                        <div className="mobile-result-image">
                          <img src={product.image} alt={product.name} />
                        </div>
                        <div className="mobile-result-info">
                          <span className="mobile-result-name">
                            {product.name}
                          </span>
                          <span className="mobile-result-price">
                            {formatPrice(product.price)} TL
                          </span>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <div className="mobile-no-results">
                      <Package className="no-result-icon" />
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
          <div className={`nav-mobile-menu ${isMenuOpen ? "open" : ""}`}>
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
              <button className="mobile-menu-close" onClick={() => setIsMenuOpen(false)}>
                <X className="close-icon" />
              </button>
            </div>

            <div className="mobile-menu-items">
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
            </div>

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
        )}

        {/* MOBİL MENÜ OVERLAY */}
        {isMobile && isMenuOpen && (
          <div className="nav-mobile-overlay" onClick={() => setIsMenuOpen(false)} />
        )}
      </nav>
    </>
  );
}