import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
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
  ShoppingBag
} from "lucide-react";

import { useFavorites } from "../../context/FavoritesContext";
import { useCart } from "../../context/CartContext";

import "./Navbar.css";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showCartPreview, setShowCartPreview] = useState(false);
  
  // REF'ler ekleyelim
  const searchRef = useRef(null);
  const searchInputRef = useRef(null);
  const cartRef = useRef(null);

  // ⭐ CONTEXT'LER
  const { favoritesCount } = useFavorites();
  const { cartItems, getItemCount, getTotalPrice, removeFromCart } = useCart();

  const cartCount = getItemCount();

  const menuItems = [
    { text: "Anasayfa", path: "/" },
    { text: "Ürünler", path: "/products" },
    { text: "Hizmetlerimiz", path: "/services" },
    { text: "Hakkımızda", path: "/about" },
    { text: "Galeri", path: "/gallery" },
    { text: "İletişim", path: "/contact" },
  ];

  // Arama filtresi
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }

    const results = productsData.filter(
      (product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setSearchResults(results.slice(0, 6));
    setShowSearchResults(true);
  }, [searchQuery]);

  // Scroll efekti
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Click outside için useEffect
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Search dropdown için
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        // Eğer tıklanan element search input değilse
        if (searchInputRef.current && !searchInputRef.current.contains(event.target)) {
          setShowSearchResults(false);
        }
      }
      
      // Cart preview için
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setShowCartPreview(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchFocus = () => {
    if (searchQuery.length > 0) {
      setShowSearchResults(true);
    }
  };

  const handleSearchItemClick = () => {
    setSearchQuery("");
    setShowSearchResults(false);
    setIsMenuOpen(false);
  };

  const handleCartIconClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowCartPreview(!showCartPreview);
    // Cart açıldığında search'ü kapat
    setShowSearchResults(false);
  };

  const handleRemoveFromCart = (e, productId) => {
    e.preventDefault();
    e.stopPropagation();
    removeFromCart(productId);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('tr-TR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(price);
  };

  return (
    <>
      {/* ================= TOP BAR ================= */}
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
                <span>Orhan Makine Sanayi</span>
              </div>

              <div className="nav-contact-item">
                <Clock className="nav-contact-icon" />
                <span>Pzt - Cmt: 08:00 - 18:00</span>
              </div>
            </div>

            <div className="nav-top-bar-cta">
              <Truck className="nav-cta-icon" />
              <span>500 TL Üzeri Ücretsiz Kargo</span>
            </div>
          </div>
        </div>
      </div>

      {/* ================= MAIN NAVBAR ================= */}
      <nav className={`nav-navbar ${isScrolled ? "nav-navbar-scrolled" : ""}`}>
        <div className="nav-container">

          {/* LOGO */}
          <Link to="/" className="nav-logo-wrapper">
            <img
              src="/images/logo.png"
              alt="Orhan Makine Logo"
              className="nav-navbar-logo"
            />

            <div className="nav-logo-text">
              <h1 className="nav-logo-title">
                <span className="orhan-text">Orhan</span>
                <span className="makina-text"> Makine</span>
              </h1>

              <p className="nav-logo-subtext">
                BİLEME İNŞ. TUR. PAZ. İTH. İHR. SAN. ve TİC. LTD.
              </p>
            </div>
          </Link>

          {/* DESKTOP MENU */}
          <div className="nav-menu">
            {menuItems.map((item) => (
              <Link 
                key={item.text} 
                to={item.path} 
                className="nav-item"
                onClick={() => window.innerWidth <= 1020 && setIsMenuOpen(false)}
              >
                {item.text}
              </Link>
            ))}
          </div>

          {/* RIGHT ACTIONS */}
          <div className="nav-actions">
            {/* SEARCH */}
            <div className="nav-search-container" ref={searchRef}>
              <div className="nav-search-wrapper">
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Ürün ara..."
                  className="nav-search-input"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onFocus={handleSearchFocus}
                />
                <Search className="nav-search-icon" />
              </div>

              {/* SEARCH DROPDOWN */}
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
                              onError={(e) => {
                                e.target.src = "/images/default-product.png";
                              }}
                            />
                          </div>
                          <div className="search-result-info">
                            <span className="nav-search-result-name">{product.name}</span>
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

            {/* ACTION ICONS */}
            <div className="nav-action-icons">
              {/* USER */}
              <Link 
                to="/login" 
                className="nav-action-icon user-icon"
                title="Giriş Yap"
                onClick={() => {
                  setShowSearchResults(false);
                  setShowCartPreview(false);
                }}
              >
                <User className="icon" />
              </Link>

              {/* ADMIN */}
              <Link 
                to="/admin" 
                className="nav-action-icon admin-icon" 
                title="Admin Paneli"
                onClick={() => {
                  setShowSearchResults(false);
                  setShowCartPreview(false);
                }}
              >
                <ShieldCheck className="icon" />
              </Link>

              {/* FAVORİLER */}
              <Link 
                to="/favorites" 
                className="nav-action-icon favorites-icon" 
                title="Favorilerim"
                onClick={() => {
                  setShowSearchResults(false);
                  setShowCartPreview(false);
                }}
              >
                <Heart className="icon" />
                {favoritesCount > 0 && (
                  <span className="nav-badge favorites-badge">{favoritesCount}</span>
                )}
              </Link>

              {/* SEPET */}
              <div 
                className="nav-cart-container"
                ref={cartRef}
              >
                <Link 
                  to="/cart" 
                  className="nav-action-icon cart-icon"
                  onClick={handleCartIconClick}
                  title="Sepetim"
                >
                  <ShoppingCart className="icon" />
                  {cartCount > 0 && (
                    <span className="nav-badge cart-badge">{cartCount}</span>
                  )}
                </Link>

                {/* SEPET ÖNİZLEME */}
                {showCartPreview && (
                  <div className="nav-cart-preview">
                    <div className="cart-preview-header">
                      <h4>Sepetim</h4>
                      <span className="cart-items-count">{cartCount} ürün</span>
                    </div>

                    {cartItems.length > 0 ? (
                      <>
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
                                  <span className="price">{formatPrice(item.price)} TL</span>
                                </div>
                                <div className="cart-preview-item-total">
                                  {formatPrice(item.price * item.quantity)} TL
                                </div>
                              </div>
                              <button 
                                className="cart-preview-remove"
                                onClick={(e) => handleRemoveFromCart(e, item.id)}
                                title="Ürünü kaldır"
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
                          <span className="total-price">{formatPrice(getTotalPrice())} TL</span>
                        </div>

                        <div className="cart-preview-actions">
                          <Link 
                            to="/cart" 
                            className="btn-view-cart"
                            onClick={() => setShowCartPreview(false)}
                          >
                            <ShoppingBag className="btn-icon" />
                            Sepete Git
                          </Link>
                          <Link 
                            to="/checkout" 
                            className="btn-checkout"
                            onClick={() => setShowCartPreview(false)}
                          >
                            Ödeme Yap
                          </Link>
                        </div>
                      </>
                    ) : (
                      <div className="cart-preview-empty">
                        <ShoppingCart className="empty-cart-icon" />
                        <p>Sepetiniz boş</p>
                        <Link 
                          to="/products" 
                          className="btn-start-shopping"
                          onClick={() => setShowCartPreview(false)}
                        >
                          Alışverişe Başla
                        </Link>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* MOBILE MENU BUTTON */}
              <button
                onClick={() => {
                  setIsMenuOpen(!isMenuOpen);
                  setShowSearchResults(false);
                  setShowCartPreview(false);
                }}
                className="nav-mobile-menu-btn"
                aria-label="Menüyü aç/kapat"
              >
                {isMenuOpen ? <X className="icon" /> : <Menu className="icon" />}
              </button>
            </div>
          </div>
        </div>

        {/* MOBILE MENU */}
        <div
          className={`nav-mobile-menu ${
            isMenuOpen ? "nav-mobile-menu-open" : ""
          }`}
        >
          <div className="nav-mobile-nav-items">
            {/* MOBILE SEARCH */}
            <div className="nav-mobile-search">
              <div className="nav-search-wrapper">
                <input
                  type="text"
                  placeholder="Ürün ara..."
                  className="nav-search-input"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onFocus={handleSearchFocus}
                />
                <Search className="nav-search-icon" />
              </div>

              {showSearchResults && searchQuery.length > 0 && (
                <div className="nav-mobile-search-dropdown">
                  {searchResults.length > 0 ? (
                    searchResults.map((product) => (
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
                            onError={(e) => {
                              e.target.src = "/images/default-product.png";
                            }}
                          />
                        </div>
                        <div className="search-result-info">
                          <span className="nav-search-result-name">{product.name}</span>
                          <span className="nav-search-result-price">
                            {formatPrice(product.price)} TL
                          </span>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <div className="nav-search-no-result">
                      <Package className="no-result-icon" />
                      <span>Ürün bulunamadı</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {menuItems.map((item) => (
              <Link
                key={item.text}
                to={item.path}
                className="nav-mobile-nav-item"
                onClick={() => {
                  setIsMenuOpen(false);
                  setShowSearchResults(false);
                }}
              >
                {item.text}
              </Link>
            ))}

            {/* MOBILE ACTION LINKS */}
            <div className="nav-mobile-actions">
              <Link
                to="/login"
                className="nav-mobile-action-link"
                onClick={() => {
                  setIsMenuOpen(false);
                  setShowSearchResults(false);
                }}
              >
                <LogIn className="mobile-action-icon" />
                <span>Giriş Yap</span>
              </Link>

              <Link
                to="/admin"
                className="nav-mobile-action-link"
                onClick={() => {
                  setIsMenuOpen(false);
                  setShowSearchResults(false);
                }}
              >
                <ShieldCheck className="mobile-action-icon" />
                <span>Admin</span>
              </Link>

              <Link
                to="/favorites"
                className="nav-mobile-action-link"
                onClick={() => {
                  setIsMenuOpen(false);
                  setShowSearchResults(false);
                }}
              >
                <Heart className="mobile-action-icon" />
                <span>Favorilerim</span>
                {favoritesCount > 0 && (
                  <span className="mobile-badge">{favoritesCount}</span>
                )}
              </Link>

              <Link
                to="/cart"
                className="nav-mobile-action-link"
                onClick={() => {
                  setIsMenuOpen(false);
                  setShowSearchResults(false);
                }}
              >
                <ShoppingCart className="mobile-action-icon" />
                <span>Sepetim</span>
                {cartCount > 0 && (
                  <span className="mobile-badge">{cartCount}</span>
                )}
              </Link>
            </div>

            {/* MOBILE CART SUMMARY */}
            {cartCount > 0 && (
              <div className="nav-mobile-cart-summary">
                <div className="mobile-cart-info">
                  <ShoppingCart className="cart-icon" />
                  <div>
                    <span className="cart-count">{cartCount} ürün</span>
                    <span className="cart-total">{formatPrice(getTotalPrice())} TL</span>
                  </div>
                </div>
                <Link 
                  to="/cart" 
                  className="btn-mobile-view-cart"
                  onClick={() => {
                    setIsMenuOpen(false);
                    setShowSearchResults(false);
                  }}
                >
                  Sepeti Gör
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}