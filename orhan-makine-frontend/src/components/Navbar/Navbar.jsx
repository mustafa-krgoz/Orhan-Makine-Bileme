import { useState, useEffect } from "react";
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
  Heart
} from "lucide-react";

import { useFavorites } from "../../context/FavoritesContext";

import "./Navbar.css";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);

  // ⭐ FAVORİLER CONTEXT'İ
  const { favoritesCount } = useFavorites();

  const cartCount = 3;

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

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchItemClick = () => {
    setSearchQuery("");
    setShowSearchResults(false);
  };

  const handleSearchBlur = () => {
    setTimeout(() => setShowSearchResults(false), 200);
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
                <span>+90 539 515 99 25</span>
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
              <span>Güvenilir Teslimat</span>
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
              <Link key={item.text} to={item.path} className="nav-item">
                {item.text}
              </Link>
            ))}
          </div>

          {/* RIGHT ACTIONS */}
          <div className="nav-actions">
            {/* SEARCH */}
            <div className="nav-search-container">
              <div className="nav-search-wrapper">
                <input
                  type="text"
                  placeholder="Ürün ara..."
                  className="nav-search-input"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onFocus={() => searchQuery && setShowSearchResults(true)}
                  onBlur={handleSearchBlur}
                />
                <Search className="nav-search-icon" />
              </div>

              {/* SEARCH DROPDOWN */}
              {showSearchResults && searchQuery.length > 0 && (
                <div className="nav-search-dropdown">
                  {searchResults.length > 0 ? (
                    searchResults.map((product) => (
                      <Link
                        key={product.id}
                        to={`/product/${product.id}`}
                        className="nav-search-result-item"
                        onClick={handleSearchItemClick}
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          onError={(e) => {
                            e.target.src = "/images/default-product.png";
                          }}
                        />
                        <span className="nav-search-result-name">{product.name}</span>
                      </Link>
                    ))
                  ) : (
                    <div className="nav-search-no-result">"Ürün bulunamadı"</div>
                  )}
                </div>
              )}
            </div>

            {/* ACTION ICONS */}
            <div className="nav-action-icons">
              {/* USER */}
              <Link to="/login" className="nav-action-icon">
                <User className="icon" />
              </Link>

              {/* ADMIN */}
              <Link to="/admin" className="nav-action-icon" title="Admin Paneli">
                <ShieldCheck className="icon" />
              </Link>

              {/* FAVORİLER */}
              <Link to="/favorites" className="nav-action-icon" title="Favorilerim">
                <Heart className="icon" />
                {favoritesCount > 0 && (
                  <span className="nav-cart-badge">{favoritesCount}</span>
                )}
              </Link>

              {/* CART */}
              <Link to="/cart" className="nav-action-icon">
                <ShoppingCart className="icon" />
                {cartCount > 0 && (
                  <span className="nav-cart-badge">{cartCount}</span>
                )}
              </Link>

              {/* MOBILE MENU BUTTON */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="nav-mobile-menu-btn"
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
            {menuItems.map((item) => (
              <Link
                key={item.text}
                to={item.path}
                className="nav-mobile-nav-item"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.text}
              </Link>
            ))}

            {/* Admin */}
            <Link
              to="/admin"
              className="nav-mobile-nav-item"
              onClick={() => setIsMenuOpen(false)}
            >
              Admin Paneli
            </Link>

            {/* Favoriler */}
            <Link
              to="/favorites"
              className="nav-mobile-nav-item"
              onClick={() => setIsMenuOpen(false)}
            >
              Favorilerim {favoritesCount > 0 && `(${favoritesCount})`}
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}