import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Instagram,
  Linkedin,
  ArrowUp
} from "lucide-react";

import { Link } from "react-router-dom";
import { productsData } from "../../data/productsData";
import "./Footer.css";

export default function Footer() {

  // Yukarı çık
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Rastgele 6 ürün seç
  const footerProducts = [...productsData]
    .sort(() => Math.random() - 0.5)
    .slice(0, 6);

  const quickLinks = [
    { name: "Anasayfa", href: "/" },
    { name: "Ürünler", href: "/products" },
    { name: "Hizmetlerimiz", href: "/services" },
    { name: "Hakkımızda", href: "/about" },
    { name: "Galeri", href: "/gallery" },
    { name: "İletişim", href: "/contact" }
  ];

  const socialLinks = [
    { icon: Instagram, href: "https://www.instagram.com/orhan_makina_bileme/?__d=1", name: "Instagram" },
    { icon: Linkedin, href: "https://linkedin.com", name: "LinkedIn" },
    {
      icon: () => (
        <img 
          src="https://cdn-icons-png.flaticon.com/512/733/733585.png"
          className="footer-social-icon invert"
          alt="WhatsApp"
        />
      ),
      href: "https://wa.me/905395159925",
      name: "WhatsApp"
    }
  ];

  return (
    <footer className="footer">

      <div className="footer-main">
        <div className="footer-container">
          <div className="footer-grid">

            {/* LOGO */}
            <div className="footer-col footer-company-info">
              <div className="footer-logo">
                <img 
                  src="/images/logo.png"
                  alt="Orhan Makine Logo"
                  className="footer-logo-img"
                />

                <div className="footer-logo-text">
                  <h3>ORHAN MAKİNE</h3>
                  <p>Bileme & Kesici Takım</p>
                </div>
              </div>

              <p className="footer-company-description">
                40 yılı aşkın deneyim ile endüstriyel kesici takım bileme ve bakım hizmetlerinde profesyonel çözümler sunuyoruz.
              </p>

              <div className="footer-social-links">
                {socialLinks.map((s, i) => {
                  const Icon = s.icon;
                  return (
                    <a 
                      key={i}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="footer-social-link"
                      aria-label={s.name}
                    >
                      <Icon className="footer-social-icon" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Hızlı linkler */}
            <div className="footer-col">
              <h4 className="footer-title">Hızlı Linkler</h4>
              <ul className="footer-links">
                {quickLinks.map((link, idx) => (
                  <li key={idx}>
                    <a href={link.href} className="footer-link">{link.name}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Ürünler - Artık productsData’dan geliyor */}
            <div className="footer-col">
              <h4 className="footer-title">Ürünler</h4>
              <ul className="footer-links">
                {footerProducts.map((item) => (
                  <li key={item.id}>
                    <Link 
                      to={`/product/${item.id}`}
                      className="footer-link"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* İLETİŞİM */}
            <div className="footer-col">
              <h4 className="footer-title">İletişim</h4>
              <div className="footer-contact-items">

                <div className="footer-contact-item">
                  <MapPin className="footer-contact-icon" />
                  <div>
                    <p>Orhan Makine Sanayi Sitesi</p>
                    <p className="footer-contact-detail">Sürsürü Mah., Elazığ</p>
                  </div>
                </div>

                <div className="footer-contact-item">
                  <Phone className="footer-contact-icon" />
                  <a href="tel:+905395159925" className="footer-contact-link">
                    +90 539 515 99 25
                  </a>
                </div>

                <div className="footer-contact-item">
                  <Mail className="footer-contact-icon" />
                  <a href="mailto:info@orhanmakine.com" className="footer-contact-link">
                    info@orhanmakine.com
                  </a>
                </div>

                <div className="footer-contact-item">
                  <Clock className="footer-contact-icon" />
                  <div>
                    <p>Pazartesi – Cumartesi</p>
                    <p className="footer-contact-detail">08:00 – 18:00</p>
                  </div>
                </div>

              </div>
            </div>

          </div>

          <div className="footer-copyright">
            © 2024 Orhan Makine Bileme Hizmetleri — Tüm hakları saklıdır.
          </div>

        </div>
      </div>

      {/* Yukarı çık */}
      <button onClick={scrollToTop} className="footer-scroll-top-btn">
        <ArrowUp className="footer-scroll-icon" />
      </button>

    </footer>
  );
}