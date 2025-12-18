import "./Hero.css";
import { MessageCircle, AlertTriangle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";

export default function Hero() {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const startVideo = () => {
      video.muted = true;
      video.playsInline = true;
      video.preload = "auto";
      video.loop = true;
      
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          document.body.addEventListener('click', () => {
            video.play().catch(() => {});
          }, { once: true });
        });
      }
    };

    if (video.readyState >= 3) {
      startVideo();
    } else {
      video.addEventListener('canplay', startVideo, { once: true });
    }

    video.addEventListener('loadeddata', () => {
      video.style.opacity = '1';
    });

    return () => {
      video.removeEventListener('canplay', startVideo);
    };
  }, []);

  return (
    <section className="hero-section" role="banner">
      <div className="video-wrapper">
        <video
          ref={videoRef}
          className="hero-video"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/images/hero-background.webp"
          aria-label="Arka plan videosu"
        >
          <source src="/videos/makine.webm" type="video/webm" />
          <source src="/videos/makine.mp4" type="video/mp4" />
          <img
            src="/images/hero-background.webp"
            alt="Makine tanıtım görseli"
            loading="eager"
          />
        </video>
        <div className="video-overlay"></div>
      </div>

      <div className="hero-container">
        <div className="hero-content-wrapper">
          <div className="hero-text-content">
            <h1 className="hero-title">
              Profesyonel Makine Satış Hizmetleri
            </h1>
            
            <p className="hero-description">
              1980'den bu yana mobilya ve endüstriyel sektöre en kaliteli makineleri sunuyoruz.
              <strong> 40 yılı aşkın deneyimimizle </strong>
              Freud, Farabi, Mızrak ve daha birçok marka ile profesyonel çözümler sağlıyoruz.
            </p>

            <div className="hero-buttons-container">
              <Link to="/products" className="hero-btn primary-btn">
                Ürünleri İncele
              </Link>
              
              <a
                href="https://wa.me/905395159925"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-btn secondary-btn"
              >
                <MessageCircle className="btn-icon" />
                WhatsApp'tan Yaz
              </a>
            </div>

            <div className="stats-container">
              <div className="stats-grid">
                <div className="stat-box">
                  <div className="stat-number">2000+</div>
                  <div className="stat-label">Mutlu Müşteri</div>
                </div>
                
                <div className="stat-box">
                  <div className="stat-number">40+</div>
                  <div className="stat-label">Yıl Deneyim</div>
                </div>
                
                <div className="stat-box">
                  <div className="stat-number">10000+</div>
                  <div className="stat-label">Tamamlanan İş</div>
                </div>
                
                <div className="stat-box">
                  <div className="stat-number">98%</div>
                  <div className="stat-label">Memnuniyet</div>
                </div>
              </div>
            </div>
          </div>

          <div className="alert-banner">
            <div className="alert-content">
              <AlertTriangle className="alert-icon" />
              
              <div className="alert-text">
                <h3 className="alert-title">
                  <strong>ÖNEMLİ BİLGİ:</strong> Ürünleri inceledikten sonra bizimle iletişime geçiniz!
                </h3>
                <p className="alert-subtitle">
                  <strong>Not:</strong> Ödeme sayfamız aktif değildir. Satın alma işlemleri için bizimle iletişime geçmelisiniz.
                </p>
              </div>
              
              <Link to="/contact" className="alert-button">
                <span>İletişime Geç</span>
                <ArrowRight className="button-icon" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="sr-only">
        <h2>Orhan Makine - Endüstriyel Makine Satışı</h2>
        <p>Profesyonel makine satış hizmetleri ve teknik destek.</p>
      </div>
    </section>
  );
}