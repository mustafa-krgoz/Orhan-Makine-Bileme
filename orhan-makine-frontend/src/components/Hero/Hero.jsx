// components/Hero/Hero.jsx
// Hero bileşeni – sol üst kurumsal yerleşim + tam ekran video arkaplan

import "./Hero.css";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="hero-section">

      {/* --- Arka Plan Video --- */}
      <video className="hero-video" autoPlay loop muted playsInline>
        <source src="/videos/makine.mp4" type="video/mp4" />
      </video>

      {/* --- Karanlık Gradient Overlay (okunabilirlik için) --- */}
      <div className="hero-overlay"></div>

      {/* --- İçerik --- */}
      <div className="hero-content">

        {/* Başlık */}
        <h1 className="hero-title">
          Profesyonel <span className="hero-highlight">Bileme Hizmetleri</span>
        </h1>

        {/* Açıklama */}
        <p className="hero-description">
          Endüstriyel kesici takımlarınız için uzman bileme, bakım ve yenileme çözümleri sunuyoruz. 
          <strong> 40 yılı aşkın tecrübemiz</strong> ile kalite, hassasiyet ve güveni bir arada sağlıyoruz.
        </p>

        {/* Butonlar */}
        <div className="hero-buttons">
          <button className="btn-primary">
            Ürünleri İncele <ArrowRight className="btn-icon" />
          </button>

          <button className="btn-secondary">
            WhatsApp’tan Yaz
          </button>
        </div>

        {/* İstatistikler */}
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