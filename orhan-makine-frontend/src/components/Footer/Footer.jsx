import { Phone, Mail, MapPin, Clock, Instagram, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";
import { productsData } from "../../data/productsData";
import "./Footer.css";

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const footerProducts = [...productsData]
    .sort(() => Math.random() - 0.5)
    .slice(0, 6);

  const quickLinks = [
    { name: "Anasayfa", href: "/" },
    { name: "Ürünler", href: "/products" },
    { name: "Hizmetlerimiz", href: "/services" },
    { name: "Hakkımızda", href: "/about" },
    { name: "Galeri", href: "/gallery" },
    { name: "İletişim", href: "/contact" },
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
          loading="lazy"
        />
      ),
      href: "https://wa.me/905395159925",
      name: "WhatsApp",
    },
  ];

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-main">
        <div className="footer-container">
          <div className="footer-grid">

            {/* LOGO + AÇIKLAMA */}
            <section className="footer-col footer-company-info">
              <div className="footer-logo">
                <img
                  src="/images/logo.png"
                  alt="Orhan Makine Logo"
                  className="footer-logo-img"
                  loading="lazy"
                />
                <div className="footer-logo-text">
                  <h3>ORHAN MAKİNE</h3>
                  <p>Bileme & Kesici Takım</p>
                </div>
              </div>

              <p className="footer-company-description">
                40 yılı aşkın deneyim ile endüstriyel kesici takım bileme ve bakım hizmetlerinde
                profesyonel çözümler sunuyoruz.
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
            </section>

            {/* HIZLI LİNKLER */}
            <nav className="footer-col" aria-label="Hızlı Linkler">
              <h4 className="footer-title">Hızlı Linkler</h4>
              <ul className="footer-links">
                {quickLinks.map((link, idx) => (
                  <li key={idx}>
                    <a href={link.href} className="footer-link">{link.name}</a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* ÜRÜNLER (SEO-friendly) */}
            <nav className="footer-col" aria-label="Popüler Ürünler">
              <h4 className="footer-title">Ürünler</h4>
              <ul className="footer-links">
                {footerProducts.map((item) => (
                  <li key={item.id}>
                    <Link to={`/product/${item.id}`} className="footer-link">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* İLETİŞİM */}
            <section className="footer-col">
              <h4 className="footer-title">İletişim</h4>
              <div className="footer-contact-items">

                <div className="footer-contact-item">
                  <MapPin className="footer-contact-icon" />
                  <address>
                    <p>Orhan Makine Bileme</p>
                    <p className="footer-contact-detail">
                      Sanayi Mahallesi Sanayi Sitesi 24. Sokak No:7
                    </p>
                  </address>
                </div>

                <div className="footer-contact-item">
                  <Phone className="footer-contact-icon" />
                  <a href="tel:+905334613150" className="footer-contact-link">
                    +90 533 461 31 50
                  </a>
                </div>

                <div className="footer-contact-item">
                  <Mail className="footer-contact-icon" />
                  <a href="mailto:info@orhanmakine.com.tr" className="footer-contact-link">
                    info@orhanmakine.com.tr
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
            </section>

          </div>

          <div className="footer-copyright">
            © 2024 Orhan Makine Bileme Hizmetleri — Tüm hakları saklıdır.
            <span className="footer-divider"> | </span>
            <a 
              href="https://www.linkedin.com/in/halit-mustafa-karagoz"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-dev"
            >
              Developed by Halit Mustafa Karagöz
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}