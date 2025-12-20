import { Phone, Mail, MapPin, Clock, Instagram, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  // Sayfa başına smooth scroll
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Navigation için Link bileşeni kullan
  const quickLinks = [
    { name: "Anasayfa", path: "/" },
    { name: "Ürünler", path: "/products" },
    { name: "Hizmetlerimiz", path: "/services" },
    { name: "Hakkımızda", path: "/about" },
    { name: "Galeri", path: "/gallery" },
    { name: "İletişim", path: "/contact" },
  ];

  // Sosyal medya linkleri - external linkler için a etiketi
  const socialLinks = [
    { 
      icon: Instagram, 
      href: "https://www.instagram.com/orhan_makina_bileme/", 
      name: "Instagram",
      color: "#E4405F"
    },
    { 
      icon: Linkedin, 
      href: "https://linkedin.com", 
      name: "LinkedIn",
      color: "#0A66C2"
    },
    { 
      // WhatsApp için özel SVG ikonu
      icon: () => (
        <svg 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M17.507 14.307l-.009.075c-.016.15-.02.321-.04.472-.114.836-.35 1.509-.983 2.066-.338.3-.77.48-1.18.633-.823.307-1.678.386-2.539.442-1.797.117-3.573-.264-5.166-1.23-2.186-1.319-3.892-3.294-4.97-5.599a9.95 9.95 0 0 1-1.108-4.66c.037-1.6.528-3.128 1.514-4.375C3.768 1.482 5.334.6 6.993.175c1.745-.45 3.544-.248 5.195.521 1.183.55 2.23 1.345 3.114 2.311.82.893 1.302 1.982 1.537 3.155.2 1.006.156 2.022-.127 3.003-.207.72-.518 1.4-.883 2.046-.385.682-.517 1.417-.58 2.18-.013.155-.02.31-.03.464l-.003.045c-.001.015-.003.03-.005.045zM12 0C5.373 0 0 5.373 0 12c0 2.126.663 4.1 1.788 5.718L0 24l6.335-1.652A11.96 11.96 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
        </svg>
      ), 
      href: "https://wa.me/905395159925",
      name: "WhatsApp",
      color: "#25D366"
    },
  ];

  return (
    <footer className="footer" role="contentinfo" aria-label="Sayfa alt bilgisi">
      <div className="footer-main">
        <div className="footer-container">
          
          {/* Ana grid yapısı - 3 kolon */}
          <div className="footer-grid">
            
            {/* BÖLÜM 1: LOGO & AÇIKLAMA & SOSYAL MEDYA */}
            <section 
              className="footer-col footer-company-info" 
              aria-labelledby="company-info-title"
            >
              <div className="footer-logo">
                <img
                  src="/images/logo.png"
                  alt="Orhan Makine Bileme & Kesici Takım Logo"
                  className="footer-logo-img"
                  loading="lazy"
                  width="55"
                  height="55"
                  decoding="async"
                />
                <div className="footer-logo-text">
                  <h3 id="company-info-title">ORHAN MAKİNE</h3>
                  <p>Bileme & Kesici Takım</p>
                </div>
              </div>

              <p className="footer-company-description">
                40 yılı aşkın deneyim ile endüstriyel kesici takım bileme ve bakım hizmetlerinde
                profesyonel çözümler sunuyoruz.
              </p>

              <div className="footer-social-links" aria-label="Sosyal medya bağlantıları">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={`social-${index}`}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      aria-label={`${social.name} sayfamızı ziyaret edin`}
                      className="footer-social-link"
                      style={{ '--social-color': social.color }}
                    >
                      <Icon className="footer-social-icon" aria-hidden="true" />
                    </a>
                  );
                })}
              </div>
            </section>

            {/* BÖLÜM 2: HIZLI LİNKLER */}
            <nav 
              className="footer-col" 
              aria-label="Hızlı erişim linkleri"
            >
              <h4 className="footer-title">Hızlı Linkler</h4>
              <ul className="footer-links" role="list">
                {quickLinks.map((link, index) => (
                  <li key={`quicklink-${index}`} role="listitem">
                    <Link 
                      to={link.path} 
                      className="footer-link"
                      onClick={scrollToTop}
                      aria-label={`${link.name} sayfasına git`}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* BÖLÜM 3: İLETİŞİM BİLGİLERİ (Hızlı Linklerin sağına taşındı) */}
            <section 
              className="footer-col" 
              aria-labelledby="contact-info-title"
            >
              <h4 className="footer-title" id="contact-info-title">İletişim</h4>
              <div className="footer-contact-items">
                
                <div className="footer-contact-item" aria-label="Adres bilgisi">
                  <MapPin className="footer-contact-icon" aria-hidden="true" />
                  <address className="not-italic">
                    <p>Orhan Makine Bileme</p>
                    <p className="footer-contact-detail">
                      Sanayi Mahallesi Sanayi Sitesi 24. Sokak No:7
                    </p>
                  </address>
                </div>

                <div className="footer-contact-item" aria-label="Telefon numarası">
                  <Phone className="footer-contact-icon" aria-hidden="true" />
                  <a 
                    href="tel:+905395159925" 
                    className="footer-contact-link"
                    aria-label="Telefon aç: +90 539 515 99 25"
                  >
                    +90 539 515 99 25
                  </a>
                </div>

                <div className="footer-contact-item" aria-label="E-posta adresi">
                  <Mail className="footer-contact-icon" aria-hidden="true" />
                  <a 
                    href="mailto:info@orhanmakina.com.tr" 
                    className="footer-contact-link"
                    aria-label="E-posta gönder: info@orhanmakina.com.tr"
                  >
                    info@orhanmakina.com.tr
                  </a>
                </div>

                <div className="footer-contact-item" aria-label="Çalışma saatleri">
                  <Clock className="footer-contact-icon" aria-hidden="true" />
                  <div>
                    <p>Pazartesi – Cumartesi</p>
                    <p className="footer-contact-detail">08:00 – 18:00</p>
                  </div>
                </div>

              </div>
            </section>

          </div>

          {/* ALT BÖLÜM: COPYRIGHT */}
          <div className="footer-bottom">
            <div className="footer-copyright">
              <span>
                © {new Date().getFullYear()} Orhan Makine Satış Hizmetleri — Tüm hakları saklıdır.
              </span>
              
              <span className="footer-divider" aria-hidden="true"> | </span>
              
              <a 
                href="https://www.linkedin.com/in/halit-mustafa-karagoz"
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="footer-dev"
                aria-label="Geliştirici: Halit Mustafa Karagöz LinkedIn profili"
              >
                Developed by Halit Mustafa Karagöz
              </a>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}