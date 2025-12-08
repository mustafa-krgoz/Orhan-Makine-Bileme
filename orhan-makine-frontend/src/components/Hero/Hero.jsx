import "./Hero.css";
import { MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";

export default function Hero() {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.setAttribute("playsinline", "");
    video.setAttribute("muted", "");
    video.setAttribute("preload", "auto");

    // Video rengini koru - karartma yok
    video.style.filter = "brightness(1)";
    video.style.opacity = "1";

    const onCanPlay = () => {
      video.play().catch(() => {
        // Auto-play izni yoksa sessiz oynat
        video.muted = true;
        video.play();
      });
    };
    
    video.addEventListener("canplay", onCanPlay);

    return () => video.removeEventListener("canplay", onCanPlay);
  }, []);

  return (
    <section className="hero-section" role="banner">

      {/* --- VİDEO - ZOOM YOK, KARARTMA YOK --- */}
      <div className="video-container">
        <video
          ref={videoRef}
          className="hero-video"
          autoPlay
          loop
          muted
          playsInline
          style={{
            filter: "brightness(1)",
            opacity: 1,
          }}
        >
          <source src="/videos/makine.mp4" type="video/mp4" />
          <source src="/videos/makine.webm" type="video/webm" />
          <img src="/images/hero-background.jpg" alt="Makine tanıtım" />
        </video>
      </div>

      {/* --- CONTENT --- */}
      <div className="hero-content">
        {/* BAŞLIK - TEK SATIR MECBUR */}
        <h1 className="hero-title">
          Profesyonel Makine Satış Hizmetleri
        </h1>

        <p className="hero-description">
          1980'den bu yana mobilya ve endüstriyel sektöre en kaliteli makineleri sunuyoruz. 
          <strong> 40 yılı aşkın deneyimimizle</strong> Freud, Farabi, Mızrak ve daha birçok 
          marka ile profesyonel çözümler üretiyoruz.
        </p>

        {/* Butons */}
        <div className="hero-buttons">
          <Link to="/products" className="hero-btn-primary">
            Ürünleri İncele
          </Link>

          <a
            href="https://wa.me/905395159925"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-btn-secondary"
          >
            <MessageCircle className="hero-btn-icon" />
            WhatsApp'tan Yaz
          </a>
        </div>

        {/* Stats - YAN YANA */}
        <div className="hero-stats">
          <div className="hero-stat-item">
            <span className="hero-stat-number">2000+</span>
            <span className="hero-stat-label">Mutlu Müşteri</span>
          </div>

          <div className="hero-stat-item">
            <span className="hero-stat-number">40+</span>
            <span className="hero-stat-label">Yıl Deneyim</span>
          </div>

          <div className="hero-stat-item">
            <span className="hero-stat-number">10000+</span>
            <span className="hero-stat-label">Tamamlanan İş</span>
          </div>

          <div className="hero-stat-item">
            <span className="hero-stat-number">98%</span>
            <span className="hero-stat-label">Memnuniyet</span>
          </div>
        </div>

        {/* SEO için görünmez */}
        <div className="sr-only">
          <h2>Orhan Makine - Endüstriyel Makine Satışı</h2>
          <p>Profesyonel makine satış hizmetleri ve teknik destek.</p>
        </div>
      </div>
    </section>
  );
}