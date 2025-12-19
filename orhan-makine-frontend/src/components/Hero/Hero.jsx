import "./Hero.css";
import { MessageCircle, AlertTriangle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";

export default function Hero() {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // GPU acceleration için hardware acceleration aktif et
    video.style.transform = 'translateZ(0)';
    video.style.backfaceVisibility = 'hidden';
    video.style.perspective = '1000px';

    const startVideo = async () => {
      try {
        // Video ayarlarını optimize et
        video.muted = true;
        video.playsInline = true;
        video.loop = true;
        video.defaultMuted = true;
        
        // Direkt play işlemini başlat - opacity gecikmesi yok
        video.style.opacity = '1';
        
        const playPromise = video.play();
        
        if (playPromise !== undefined) {
          await playPromise.catch((error) => {
            console.warn('Video autoplay engellendi:', error);
            
            // Kullanıcı etkileşimi ile play et
            const playOnInteraction = () => {
              video.play().catch(() => {});
              document.removeEventListener('click', playOnInteraction);
              document.removeEventListener('touchstart', playOnInteraction);
            };
            
            document.addEventListener('click', playOnInteraction, { once: true });
            document.addEventListener('touchstart', playOnInteraction, { once: true });
          });
        }
      } catch (error) {
        console.error('Video oynatma hatası:', error);
      }
    };

    // Video hazır olduğunda hemen başlat
    if (video.readyState >= 2) {
      // HAVE_CURRENT_DATA veya daha fazlası
      startVideo();
    } else {
      // loadedmetadata eventi ile hızlı başlangıç
      video.addEventListener('loadedmetadata', startVideo, { once: true });
    }

    // Video yüklenme hatalarını yakala
    const handleError = (e) => {
      console.error('Video yükleme hatası:', e);
      video.style.opacity = '1'; // Poster'ı göster
    };

    video.addEventListener('error', handleError);

    // Cleanup
    return () => {
      video.removeEventListener('loadedmetadata', startVideo);
      video.removeEventListener('error', handleError);
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
          preload="metadata"
          poster="/images/hero-background.webp"
          aria-label="Arka plan videosu"
          width="1920"
          height="1080"
          crossOrigin="anonymous"
        >
          <source src="/videos/makine.webm" type="video/webm; codecs=vp9,vorbis" />
          <source src="/videos/makine.mp4" type="video/mp4; codecs=avc1.42E01E,mp4a.40.2" />
          <img
            src="/images/hero-background.webp"
            alt="Makine tanıtım görseli"
            loading="eager"
            fetchpriority="high"
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
                <MessageCircle className="btn-icon" aria-hidden="true" />
                WhatsApp'tan Yaz
              </a>
            </div>

            <div className="stats-container">
              <div className="stats-grid">
                <div className="stat-box">
                  <div className="stat-number" aria-label="2000'den fazla">2000+</div>
                  <div className="stat-label">Mutlu Müşteri</div>
                </div>
                
                <div className="stat-box">
                  <div className="stat-number" aria-label="40 yıldan fazla">40+</div>
                  <div className="stat-label">Yıl Deneyim</div>
                </div>
                
                <div className="stat-box">
                  <div className="stat-number" aria-label="10000'den fazla">10000+</div>
                  <div className="stat-label">Tamamlanan İş</div>
                </div>
                
                <div className="stat-box">
                  <div className="stat-number" aria-label="Yüzde 98">98%</div>
                  <div className="stat-label">Memnuniyet</div>
                </div>
              </div>
            </div>
          </div>

          <div className="alert-banner">
            <div className="alert-content">
              <AlertTriangle className="alert-icon" aria-hidden="true" />
              
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
                <ArrowRight className="button-icon" aria-hidden="true" />
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