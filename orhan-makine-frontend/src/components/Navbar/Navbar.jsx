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
import './Navbar.css';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);

  // ⭐ FAVORİLER CONTEXT'İ — global state
  const { favoritesCount } = useFavorites();

  const cartCount = 3;

  const menuItems = [
    { text: "Anasayfa", path: "/" },
    { text: "Ürünler", path: "/products" },
    { text: "Hizmetlerimiz", path: "/services" },
    { text: "Hakkımızda", path: "/about" },
    { text: "Galeri", path: "/gallery" },
    { text: "İletişim", path: "/contact" }
  ];

  // 🔍 Arama filtresi
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }
  
    const results = productsData.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  
    setSearchResults(results.slice(0, 6));
    setShowSearchResults(true);
  }, [searchQuery]);

  // Navbar scroll efekti
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
    setTimeout(() => {
      setShowSearchResults(false);
    }, 200);
  };

  return (
    <>
      {/* TOP BAR */}
      <div className="top-bar">
        <div className="top-bar-container">
          <div className="top-bar-content">
            <div className="contact-info">
              <div className="contact-item">
                <Phone className="contact-icon" />
                <span>+90 539 515 99 25</span>
              </div>
              <div className="contact-item">
                <MapPin className="contact-icon" />
                <span>Orhan Makine Sanayi</span>
              </div>
              <div className="contact-item">
                <Clock className="contact-icon" />
                <span>Pzt - Cmt: 08:00 - 18:00</span>
              </div>
            </div>

            <div className="top-bar-cta">
              <Truck className="cta-icon" />
              <span>Güvenilir Teslimat</span>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN NAVBAR */}
      <nav className={`navbar ${isScrolled ? "navbar-scrolled" : ""}`}>
        <div className="nav-container">

          {/* LOGO */}
          <Link to="/" className="logo-wrapper">
            <img 
              src="/images/logo.png"
              alt="Orhan Makine Logo"
              className="navbar-logo"
            />

            <div className="logo-text">
              <h1 className="logo-title">
                <span className="orhan-text">Orhan</span>
                <span className="makina-text"> Makine</span>
              </h1>

              <p className="logo-subtext">
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
            <div className="search-container">
              <div className="search-wrapper">
                <input
                  type="text"
                  placeholder="Ürün ara..."
                  className="search-input"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onFocus={() => searchQuery && setShowSearchResults(true)}
                  onBlur={handleSearchBlur}
                />
                <Search className="search-icon" />
              </div>

              {/* 🔽 ARA SONUÇ DROPDOWN 🔽 */}
              {showSearchResults && searchQuery.length > 0 && (
                <div className="search-dropdown">
                  {searchResults.length > 0 ? (
                    searchResults.map((product) => (
                      <Link 
                        key={product.id}
                        to={`/product/${product.id}`}
                        className="search-result-item"
                        onClick={handleSearchItemClick}
                      >
                        <img 
                          src={product.image} 
                          alt={product.name}
                          onError={(e) => {
                            e.target.src = "/images/default-product.png";
                          }}
                        />
                        <span className="search-result-name">{product.name}</span>
                      </Link>
                    ))
                  ) : (
                    <div className="search-no-result">
                      "Ürün bulunamadı"
                    </div>
                  )}
                </div>
              )}
              {/* 🔼 BURAYA KADAR 🔼 */}
            </div>

            <div className="action-icons">
              {/* USER ICON */}
              <Link to="/login" className="action-icon">
                <User className="icon" />
              </Link>

              {/* ADMIN ICON */}
              <Link to="/admin" className="action-icon" title="Admin Paneli">
                <ShieldCheck className="icon" />
              </Link>

              {/* ⭐ FAVORİLER İCONU — favoritesCount kullanıyoruz */}
              <Link to="/favorites" className="action-icon" title="Favorilerim">
                <Heart className="icon" />
                {favoritesCount > 0 && <span className="cart-badge">{favoritesCount}</span>}
              </Link>

              {/* CART ICON */}
              <Link to="/cart" className="action-icon cart-icon">
                <ShoppingCart className="icon" />
                {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
              </Link>

              {/* MOBILE MENU BUTTON */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="mobile-menu-btn"
              >
                {isMenuOpen ? <X className="icon" /> : <Menu className="icon" />}
              </button>
            </div>
          </div>
        </div>

        {/* MOBILE MENU */}
        <div className={`mobile-menu ${isMenuOpen ? "mobile-menu-open" : ""}`}>
          <div className="mobile-nav-items">
            {menuItems.map((item) => (
              <Link
                key={item.text}
                to={item.path}
                className="mobile-nav-item"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.text}
              </Link>
            ))}

            <Link to="/admin" className="mobile-nav-item" onClick={() => setIsMenuOpen(false)}>
              Admin Paneli
            </Link>

            {/* ⭐ MOBILE MENÜDE FAVORİLER LİNKİ */}
            <Link to="/favorites" className="mobile-nav-item" onClick={() => setIsMenuOpen(false)}>
              Favorilerim {favoritesCount > 0 && `(${favoritesCount})`}
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}