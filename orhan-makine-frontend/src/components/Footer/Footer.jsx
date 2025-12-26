import { Phone, Mail, MapPin, Clock, Instagram, Linkedin, Facebook } from "lucide-react";
import { Link } from "react-router-dom";
import WhatsAppButton from "../WhatsAppButton/WhatsAppButton";
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

  // Sosyal medya linkleri - Renkli arka planlar ile
  const socialLinks = [
    { 
      icon: Instagram, 
      href: "https://www.instagram.com/orhan_makina_bileme/", 
      name: "Instagram",
      color: "#E4405F",
      gradient: "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)"
    },
    { 
      icon: Linkedin, 
      href: "https://linkedin.com", 
      name: "LinkedIn",
      color: "#0A66C2"
    },
    { 
      icon: Facebook, 
      href: "https://www.facebook.com/orhanmakina.23/", 
      name: "Facebook",
      color: "#1877F2"
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
                      style={{ 
                        '--social-color': social.color,
                        '--social-gradient': social.gradient || social.color
                      }}
                      data-platform={social.name.toLowerCase()}
                    >
                      <Icon className="footer-social-icon" aria-hidden="true" />
                    </a>
                  );
                })}
                
                {/* WhatsApp için özel buton komponenti */}
                <div className="footer-whatsapp-wrapper">
                  <WhatsAppButton 
                    phoneNumber="905395159925"
                    message="Merhaba, Orhan Makine'den ürünler hakkında bilgi almak istiyorum."
                  />
                </div>
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

            {/* BÖLÜM 3: İLETİŞİM BİLGİLERİ */}
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