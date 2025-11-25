import { 
    Phone, 
    Mail, 
    MapPin, 
    Clock, 
    Instagram,
    Linkedin,
    ArrowUp
  } from "lucide-react";
  import "./Footer.css";
  
  export default function Footer() {
    const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
  
    const quickLinks = [
      { name: "Anasayfa", href: "/" },
      { name: "Ürünler", href: "/products" },
      { name: "Hizmetlerimiz", href: "/services" },
      { name: "Hakkımızda", href: "/about" },
      { name: "Galeri", href: "/gallery" },
      { name: "İletişim", href: "/contact" }
    ];
  
    const products = [
      { name: "Daire Testereler", href: "/products/daire-testereler" },
      { name: "Freze Bıçakları", href: "/products/freze-bicaklari" },
      { name: "CNC Router Bıçakları", href: "/products/cnc-router-bicaklari" },
      { name: "Şerit Testere", href: "/products/serit-testere" },
      { name: "Takmatik Kesiciler", href: "/products/takmatik-kesiciler" },
      { name: "Metal Kesme Bıçakları", href: "/products/metal-kesme-bicaklari" }
    ];
  
    const socialLinks = [
      { icon: Instagram, href: "https://instagram.com", name: "Instagram" },
      { icon: Linkedin, href: "https://linkedin.com", name: "LinkedIn" },
      { 
        icon: () => (
          <img 
            src="https://cdn-icons-png.flaticon.com/512/733/733585.png"
            className="social-icon invert"
            alt="WhatsApp"
          />
        ),
        href: "https://wa.me/905555555555",
        name: "WhatsApp"
      }
    ];
  
    return (
      <footer className="footer">
  
        {/* FOOTER MAIN */}
        <div className="footer-main">
          <div className="footer-container">
  
            <div className="footer-grid">
  
              {/* COMPANY INFO */}
              <div className="footer-col company-info">
                <div className="footer-logo">
                  <div className="logo-icon">OM</div>
                  <div className="logo-text">
                    <h3>ORHAN MAKİNE</h3>
                    <p>Bileme & Kesici Takım</p>
                  </div>
                </div>
  
                <p className="company-description">
                  20 yılı aşkın deneyim ile endüstriyel kesici takım bileme ve bakım hizmetlerinde profesyonel çözümler sunuyoruz.
                </p>
  
                <div className="social-links">
                  {socialLinks.map((s, i) => {
                    const Icon = s.icon;
                    return (
                      <a 
                        key={i}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-link"
                        aria-label={s.name}
                      >
                        <Icon className="social-icon" />
                      </a>
                    );
                  })}
                </div>
              </div>
  
              {/* QUICK LINKS */}
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
  
              {/* PRODUCTS */}
              <div className="footer-col">
                <h4 className="footer-title">Ürünler</h4>
                <ul className="footer-links">
                  {products.map((item, idx) => (
                    <li key={idx}>
                      <a href={item.href} className="footer-link">{item.name}</a>
                    </li>
                  ))}
                </ul>
              </div>
  
              {/* CONTACT */}
              <div className="footer-col">
                <h4 className="footer-title">İletişim</h4>
                <div className="contact-items">
  
                  <div className="contact-item">
                    <MapPin className="contact-icon" />
                    <div>
                      <p>Orhan Makine Sanayi Sitesi</p>
                      <p className="contact-detail">Sürsürü Mah., Elazığ</p>
                    </div>
                  </div>
  
                  <div className="contact-item">
                    <Phone className="contact-icon" />
                    <a href="tel:+904242345678" className="contact-link">
                      +90 424 234 56 78
                    </a>
                  </div>
  
                  <div className="contact-item">
                    <Mail className="contact-icon" />
                    <a href="mailto:info@orhanmakine.com" className="contact-link">
                      info@orhanmakine.com
                    </a>
                  </div>
  
                  <div className="contact-item">
                    <Clock className="contact-icon" />
                    <div>
                      <p>Pazartesi – Cumartesi</p>
                      <p className="contact-detail">08:00 – 18:00</p>
                    </div>
                  </div>
  
                </div>
              </div>
  
            </div>
  
            {/* COPYRIGHT */}
            <div className="footer-copyright">
              © 2024 Orhan Makine Bileme Hizmetleri — Tüm hakları saklıdır.
            </div>
          </div>
        </div>
  
        {/* SCROLL TOP */}
        <button onClick={scrollToTop} className="scroll-top-btn">
          <ArrowUp className="scroll-icon" />
        </button>
  
      </footer>
    );
  }