// components/Navbar/Navbar.jsx
import { useState, useEffect } from "react";
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
  ShieldCheck
} from "lucide-react";
import './Navbar.css';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const cartCount = 3;

  const menuItems = [
    { text: "Anasayfa", path: "/" },
    { text: "Ürünler", path: "/products" }, // ⬅ dropdown kaldırıldı, direkt link
    { text: "Hizmetlerimiz", path: "/services" },
    { text: "Hakkımızda", path: "/about" },
    { text: "Galeri", path: "/gallery" },
    { text: "İletişim", path: "/contact" }
  ];

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults([]);
      return;
    }
  
    const results = productsData.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  
    setSearchResults(results.slice(0, 6)); // En fazla 6 sonuç
  }, [searchQuery]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
            <a href="/" className="logo-wrapper">
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
            </a>

          {/* DESKTOP MENU */}
          <div className="nav-menu">
            {menuItems.map((item) => (
              <a key={item.text} href={item.path} className="nav-item">
                {item.text}
              </a>
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
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="search-icon" />
          </div>

          {/* 🔽 ARA SONUÇ DROPDOWN BURAYA GELİYOR 🔽 */}
          {searchQuery.length > 0 && (
            <div className="search-dropdown">
              {searchResults.length > 0 ? (
                searchResults.map((p) => (
                  <Link 
                    key={p.id}
                    to={`/product/${p.id}`}
                    className="search-result-item"
                    onClick={() => setSearchQuery("")}
                  >
                    <img src={p.image} alt={p.name} />
                    <span>{p.name}</span>
                  </Link>
                ))
              ) : (
                <div className="search-no-result">Sonuç bulunamadı</div>
              )}
            </div>
          )}
          {/* 🔼 BURAYA KADAR 🔼 */}
        </div>
            <div className="action-icons">

              {/* USER ICON */}
              <a href="/login" className="action-icon">
                <User className="icon" />
              </a>

              {/* ADMIN ICON */}
              <a href="/admin" className="action-icon" title="Admin Paneli">
                <ShieldCheck className="icon" />
              </a>

              {/* CART ICON */}
              <a href="/cart" className="action-icon cart-icon">
                <ShoppingCart className="icon" />
                {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
              </a>

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
              <a
                key={item.text}
                href={item.path}
                className="mobile-nav-item"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.text}
              </a>
            ))}

            <a href="/admin" className="mobile-nav-item">
              Admin Paneli
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}