// components/Hero/Hero.jsx
import "./Hero.css";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="hero-section">

      {/* --- Arka Plan Video --- */}
      <video className="hero-video" autoPlay loop muted playsInline>
        <source src="/videos/makine.mp4" type="video/mp4" />
      </video>

      {/* --- Overlay --- */}
      <div className="hero-overlay"></div>

      {/* --- İçerik --- */}
      <div className="hero-content">

        <h1 className="hero-title">
          Profesyonel <span className="hero-highlight">Bileme Hizmetleri</span>
        </h1>

        <p className="hero-description">
          Endüstriyel kesici takımlarınız için uzman bileme, bakım ve yenileme çözümleri sunuyoruz. 
          <strong> 40 yılı aşkın tecrübemiz</strong> ile kalite, hassasiyet ve güveni bir arada sağlıyoruz.
        </p>

        {/* --- Butonlar --- */}
        <div className="hero-buttons">

          <Link to="/urunler" className="btn-primary">
            Ürünleri İncele <ArrowRight className="btn-icon" />
          </Link>

          <a 
            href="https://wa.me/905395159925"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            WhatsApp’tan Yaz
          </a>

        </div>

        {/* --- İstatistikler --- */}
        <div className="hero-stats">
          <div className="stat-item">
            <span className="stat-number">2000+</span>
            <span className="stat-label">Mutlu Müşteri</span>
          </div>

          <div className="stat-item">
            <span className="stat-number">40+</span>
            <span className="stat-label">Yıl Deneyim</span>
          </div>

          <div className="stat-item">
            <span className="stat-number">5000+</span>
            <span className="stat-label">Tamamlanan İş</span>
          </div>

          <div className="stat-item">
            <span className="stat-number">98%</span>
            <span className="stat-label">Memnuniyet</span>
          </div>
        </div>

      </div>
    </section>
  );
}