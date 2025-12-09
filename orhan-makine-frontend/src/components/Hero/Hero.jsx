import "./Hero.css";
import { MessageCircle, AlertTriangle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";

export default function Hero() {
  // ❗ Video referansı burada tanımlanmalıydı – HATA BUNDAN KAYNAKLANIYORDU
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // iOS autoplay fix
    video.setAttribute("playsinline", "");
    video.setAttribute("muted", "");
    video.setAttribute("preload", "auto");

    // Görüntü netliği
    video.style.filter = "brightness(1)";
    video.style.opacity = "1";

    // Başlatıcı fonksiyon (loop + hız optimizasyonu)
    const startVideo = () => {
      video.muted = true;
      video.loop = true;
      video.playbackRate = 1.03; // daha yumuşak döngü
      video.play().catch(() => {});
    };

    video.addEventListener("loadeddata", startVideo);

    // Video pause olursa tekrar çalıştır (arka planda durmasın)
    const keepAlive = setInterval(() => {
      if (video.paused) {
        video.play().catch(() => {});
      }
    }, 2000);

    return () => {
      video.removeEventListener("loadeddata", startVideo);
      clearInterval(keepAlive);
    };
  }, []);

  return (
    <section className="hero-section" role="banner">
      {/* ---------- BACKGROUND VIDEO ---------- */}
      <div className="video-container">
        <video
          ref={videoRef}
          className="hero-video"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        >
          <source src="/videos/makine.mp4" type="video/mp4" />
          <source src="/videos/makine.webm" type="video/webm" />
          {/* Fallback image */}
          <img src="/images/hero-background.jpg" alt="Makine tanıtım görseli" />
        </video>
      </div>

      {/* ---------- HERO CONTENT ---------- */}
      <div className="hero-content">
        <h1 className="hero-title">Profesyonel Makine Satış Hizmetleri</h1>

        <p className="hero-description">
          1980'den bu yana mobilya ve endüstriyel sektöre en kaliteli makineleri
          sunuyoruz. <strong>40 yılı aşkın deneyimimizle</strong> Freud, Farabi,
          Mızrak ve daha birçok marka ile profesyonel çözümler sağlıyoruz.
        </p>

        {/* BUTTONS */}
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

        {/* STATS */}
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

        {/* ---------- PAYMENT ALERT BANNER ---------- */}
        <div
          className="payment-alert-banner"
          role="alert"
          aria-label="Ödeme sistemi bilgilendirme mesajı"
        >
          <div className="payment-alert-content">
            <AlertTriangle className="payment-alert-icon" />

            <div className="payment-alert-text">
              <p className="payment-alert-main">
                <strong>ÖNEMLİ BİLGİ:</strong> Ürünleri inceledikten sonra bizimle
                iletişime geçiniz!
              </p>
              <p className="payment-alert-sub">
                <strong>Not:</strong> Ödeme sayfamız aktif değildir. Satın alma
                işlemleri için lütfen bizimle iletişime geçin.
              </p>
            </div>

            <Link
              to="/contact"
              className="payment-alert-button"
              aria-label="İletişim sayfasına git"
            >
              <span>İletişime Geç</span>
              <ArrowRight className="payment-alert-button-icon" />
            </Link>
          </div>
        </div>

        {/* SEO — Kullanıcıya görünmez */}
        <div className="sr-only">
          <h2>Orhan Makine - Endüstriyel Makine Satışı</h2>
          <p>Profesyonel makine satış hizmetleri ve teknik destek.</p>
        </div>
      </div>
    </section>
  );
}