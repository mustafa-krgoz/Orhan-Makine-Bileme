// =======================================
// ORHAN MAKİNE - HOME PAGE (OPTIMIZED)
// MOBİL/TABLET RESPONSIVE GÜNCELLEMELERİ
// =======================================

import "../styles/HomePage.css";
import Hero from "../components/Hero/Hero.jsx";

import {
  ArrowRight,
  Shield,
  Clock,
  Truck,
  CheckCircle,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

import { useState, useEffect, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import OptimizedImage from "../components/OptimizedImage";
import { productsData } from "../data/productsData";

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const sliderRef = useRef(null);

  // ===============================
  // RESPONSIVE DETECTION
  // ===============================
  useEffect(() => {
    const checkResponsive = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 768);
      setIsTablet(width > 768 && width <= 1024);
    };

    checkResponsive();
    window.addEventListener('resize', checkResponsive);
    return () => window.removeEventListener('resize', checkResponsive);
  }, []);

  // ===============================
  // POPÜLER ÜRÜNLER - RESPONSIVE SLIDER
  // ===============================
  const featuredProducts = useMemo(() => {
    return [...productsData]
      .sort(() => Math.random() - 0.5)
      .slice(0, 8); // Daha fazla ürün göster
  }, []);

  // Responsive slide hesaplama
  const getSlidesToShow = () => {
    if (isMobile) return 2;
    if (isTablet) return 3;
    return 4; // Desktop
  };

  const slidesToShow = getSlidesToShow();
  const maxSlide = Math.max(0, featuredProducts.length - slidesToShow);

  const nextSlide = () => {
    if (currentSlide >= maxSlide) {
      setCurrentSlide(0);
    } else {
      setCurrentSlide(prev => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide <= 0) {
      setCurrentSlide(maxSlide);
    } else {
      setCurrentSlide(prev => prev - 1);
    }
  };

  // Auto-slide for desktop
  useEffect(() => {
    if (isMobile) return; // Mobilde auto-slide yok
    
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentSlide, isMobile]);

  // ===============================
  // HİZMETLER - RESPONSIVE
  // ===============================
  const services = useMemo(
    () => [
      {
        icon: <Shield className="w-8 h-8" />,
        title: "Kalite Garantisi",
        description:
          "Ürünlerimiz, yüksek kalite standartlarına uygun olarak titiz denetimlerden geçirilerek müşterilerimize ulaştırılır."
      },
      {
        icon: <Clock className="w-8 h-8" />,
        title: "Hızlı Teslimat",
        description: "Siparişlerinizi hızlı, güvenli ve zamanında teslim ediyoruz."
      },
      {
        icon: <Truck className="w-8 h-8" />,
        title: "Belirli Fiyat Üstüne Ücretsiz Kargo",
        description:
          "Belirlenen tutarın üzerindeki tüm siparişlerde ücretsiz kargo avantajı sağlıyoruz."
      }
    ],
    []
  );

  // ===============================
  // MARKALAR - RESPONSIVE
  // ===============================
  const brands = useMemo(
    () => [
      {
        name: "MAKİTA",
        description: "Dünyanın önde gelen elektrikli el aleti markası.",
        image: "/images/brands/makita-logo.webp",
        features: [
          "Profesyonel motor teknolojisi",
          "Uzun ömürlü batarya sistemi",
          "Titreşim azaltan ergonomik tasarım",
          "Geniş ürün gamı"
        ]
      },
      {
        name: "FREUD",
        description:
          "Ahşap işleme ve endüstriyel kesimde dünya lideri İtalyan marka.",
        image: "/images/brands/freud-logo.webp",
        features: [
          "İtalyan mühendisliği ve tasarımı",
          "Endüstriyel dayanıklılık",
          "Premium karbür uç teknolojisi",
          "Uzun ömürlü kesim performansı"
        ]
      },
      {
        name: "MIZRAK",
        description: "Türkiye'nin güçlü yerli üreticilerinden.",
        image: "/images/brands/mizrak-logo.webp",
        features: [
          "Yerli üretim",
          "Üstün kalite kontrol",
          "Yüksek uyumluluk",
          "Uygun fiyat-performans oranı"
        ]
      }
    ],
    []
  );

  // ===============================
  // FİYAT FORMATLAYICI
  // ===============================
  const formatPrice = price =>
    new Intl.NumberFormat("tr-TR", { minimumFractionDigits: 2 }).format(price);

  // ===============================
  // SEO: JSON-LD Schema
  // ===============================
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";

    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Orhan Makine Bileme",
      url: window.location.origin,
      description: "40 yıllık tecrübeyle profesyonel makine satış hizmetleri",
      potentialAction: {
        "@type": "SearchAction",
        target: `${window.location.origin}/products?search={search_term_string}`,
        "query-input": "required name=search_term_string"
      }
    });

    document.head.appendChild(script);
    return () => document.head.removeChild(script);
  }, []);

  // ===============================
  // RENDER
  // ===============================
  return (
    <div className="homepage">

      {/* ================= HERO ================= */}
      <Hero />

      {/* ================= POPÜLER ÜRÜNLER ================= */}
      <section className="home-products-section" aria-label="Popüler Ürünler">
        <div className="home-container-full">
          <div className="home-section-header">
            <h2 className="home-section-title">Popüler Ürünlerimiz</h2>
            <p className="home-section-description">
              En çok tercih edilen makine ve ekipmanlar
            </p>
          </div>

          {featuredProducts.length === 0 ? (
            <div className="home-products-loading">
              <p>Ürünler yükleniyor...</p>
            </div>
          ) : (
            <div className="home-products-slider-wrapper">
              
              {/* Sol ok - Desktop için */}
              {!isMobile && (
                <button
                  className="home-slider-arrow home-slider-arrow-left"
                  onClick={prevSlide}
                  aria-label="Önceki ürünler"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
              )}

              {/* SLIDER CONTAINER */}
              <div 
                className="home-products-slider-container"
                ref={sliderRef}
              >
                <div className="home-products-slider">
                  <div
                    className="home-products-track"
                    style={{
                      transform: `translateX(-${currentSlide * (100 / slidesToShow)}%)`
                    }}
                  >
                    {featuredProducts.map(product => (
                      <div 
                        key={product.id} 
                        className="home-product-card"
                        role="group"
                        aria-label={`${product.brand} ${product.name}`}
                      >

                        {/* OPTIMIZED IMAGE */}
                        <div className="home-product-image">
                          <OptimizedImage
                            src={product.image}
                            alt={product.name}
                            className="home-product-img"
                            loading="lazy"
                            width="300"
                            height="300"
                          />
                        </div>

                        {/* ÜRÜN BİLGİLERİ */}
                        <div className="home-product-content">
                          <div className="home-product-brand">{product.brand}</div>

                          <h3 className="home-product-title">{product.name}</h3>

                          <p className="home-product-price">
                            {formatPrice(product.price)} TL
                          </p>

                          <p className="home-product-description">
                            {product.description.length > 80
                              ? product.description.slice(0, 80) + "..."
                              : product.description}
                          </p>

                          <ul className="home-product-features">
                            {product.features?.slice(0, 2).map((f, idx) => (
                              <li key={idx} className="home-feature-item">
                                <CheckCircle className="home-feature-icon" />
                                <span>{f}</span>
                              </li>
                            ))}
                          </ul>

                          <Link
                            to={`/product/${product.id}`}
                            className="home-product-button"
                            aria-label={`${product.name} detaylarını gör`}
                          >
                            Detaylı İncele
                            <ArrowRight className="home-button-icon" />
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sağ ok - Desktop için */}
              {!isMobile && (
                <button
                  className="home-slider-arrow home-slider-arrow-right"
                  onClick={nextSlide}
                  aria-label="Sonraki ürünler"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              )}

              {/* Mobile slider controls */}
              {isMobile && (
                <div className="home-mobile-slider-controls">
                  <button
                    className="home-mobile-slider-arrow"
                    onClick={prevSlide}
                    aria-label="Önceki"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  
                  <div className="home-slider-dots">
                    {Array.from({ length: Math.ceil(featuredProducts.length / slidesToShow) }).map((_, idx) => (
                      <button
                        key={idx}
                        className={`home-slider-dot ${idx === Math.floor(currentSlide / slidesToShow) ? 'active' : ''}`}
                        onClick={() => setCurrentSlide(idx * slidesToShow)}
                        aria-label={`${idx + 1}. sayfa`}
                      />
                    ))}
                  </div>
                  
                  <button
                    className="home-mobile-slider-arrow"
                    onClick={nextSlide}
                    aria-label="Sonraki"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
          )}

          <div className="home-view-all-products">
            <Link to="/products" className="home-view-all-button">
              Tüm Ürünleri Gör
            </Link>
          </div>
        </div>
      </section>

      {/* ================= HİZMETLER ================= */}
      <section className="home-services-section" aria-label="Neden Orhan Makine?">
        <div className="home-container">
          <div className="home-section-header">
            <h2 className="home-section-title">Neden Orhan Makine?</h2>
            <p className="home-section-description">
              40 yıllık sektör tecrübemizle en güvenilir çözüm ortağınız
            </p>
          </div>

          <div className="home-services-grid">
            {services.map((service, idx) => (
              <div 
                key={idx} 
                className="home-service-card"
                role="article"
                aria-label={service.title}
              >
                <div className="home-service-icon">{service.icon}</div>
                <h3 className="home-service-title">{service.title}</h3>
                <p className="home-service-description">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= MARKALAR ================= */}
      <section className="home-brands-section" aria-label="Popüler Markalarımız">
        <div className="home-container">

          <div className="home-section-header">
            <h2 className="home-section-title">Popüler Markalarımız</h2>
            <p className="home-section-description">
              Dünyaca ünlü kaliteli markaları sizlerle buluşturuyoruz
            </p>
          </div>

          <div className="home-brands-grid">
            {brands.map((brand, idx) => (
              <div 
                key={idx} 
                className="home-brand-card"
                role="article"
                aria-label={brand.name}
              >

                <div className="home-brand-header">
                  <div className="home-brand-logo">
                    <OptimizedImage
                      src={brand.image}
                      alt={`${brand.name} Logo`}
                      className="home-brand-logo-image"
                      loading="lazy"
                      width="150"
                      height="150"
                    />
                  </div>

                  <h3 className="home-brand-title">{brand.name}</h3>
                </div>

                <p className="home-brand-description">{brand.description}</p>

                <ul className="home-brand-features">
                  {(brand.features ?? []).map((f, i) => (
                    <li key={i} className="home-brand-feature-item">
                      <CheckCircle className="home-feature-icon" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="home-brand-button-wrapper">
            <Link 
              to="/about#brands" 
              className="home-brand-bottom-button"
              aria-label="Tüm markaları görüntüle"
            >
              Tüm Markaları Gör <ArrowRight />
            </Link>
          </div>

        </div>
      </section>

      {/* ================= SEO SECTION ================= */}
      <section className="home-seo-section" aria-label="Orhan Makine Hakkında">
        <div className="home-container">
          <div className="home-seo-content">
            <h2 className="home-seo-title">
              Orhan Makine – Profesyonel Makine Satış Hizmetleri
            </h2>
            <div className="home-seo-text">
              <p>
                Orhan Makine olarak 40 yıla dayanan sektör deneyimimizle, yüksek
                kalite standartlarına sahip profesyonel makineleri müşterilerimize
                güvenilir bir hizmet anlayışıyla sunuyoruz.
              </p>

              <p>
                Geniş ürün yelpazemiz; endüstriyel makinelerden profesyonel el
                aletlerine kadar farklı ihtiyaçlara yönelik çözümler sunmaktadır.
              </p>

              <p>
                Ürün danışmanlığı veya teknik destek almak isterseniz WhatsApp
                üzerinden <strong>0533 461 31 50</strong> numaramızdan bize
                ulaşabilirsiniz.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}