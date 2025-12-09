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

import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { productsData } from "../data/productsData";

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  /* --------------------------------------------------------
     POPÜLER ÜRÜNLERİ SEÇ (Memoized — performans için)
  -------------------------------------------------------- */
  const featuredProducts = useMemo(() => {
    return [...productsData]
      .sort(() => Math.random() - 0.5)
      .slice(0, 6);
  }, []);

  const maxSlide = featuredProducts.length > 4 ? featuredProducts.length - 4 : 0;

  const nextSlide = () => setCurrentSlide(prev => (prev >= maxSlide ? 0 : prev + 1));
  const prevSlide = () => setCurrentSlide(prev => (prev <= 0 ? maxSlide : prev - 1));

  /* --------------------------------------------------------
     HİZMETLER (Static data → render sırasında yeniden oluşmaz)
  -------------------------------------------------------- */
  const services = useMemo(() => [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Kalite Garantisi",
      description: "Ürünlerimiz, yüksek kalite standartlarına uygun olarak titiz denetimlerden geçirilerek müşterilerimize ulaştırılır."
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Hızlı Teslimat",
      description: "Siparişlerinizi hızlı, güvenli ve zamanında teslim ediyoruz."
    },
    {
      icon: <Truck className="w-8 h-8" />,
      title: "Belirli Fiyat Üstüne Ücretsiz Kargo",
      description: "Belirlenen tutarın üzerindeki tüm siparişlerde ücretsiz kargo avantajı sağlıyoruz."
    }
  ], []);

  /* --------------------------------------------------------
     MARKALAR – SEO açısından değişmedi
  -------------------------------------------------------- */
  const brands = useMemo(() => [
    { 
      name: "MAKİTA",
      description: "Dünyanın önde gelen elektrikli el aleti markası.",
      image: "/images/brands/makita-logo.png",
      features: [
        "Profesyonel motor teknolojisi",
        "Uzun ömürlü batarya sistemi",
        "Titreşim azaltan ergonomik tasarım",
        "Geniş ürün gamı"
      ]
    },
    { 
      name: "FREUD", 
      description: "Ahşap işleme ve endüstriyel kesimde dünya lideri İtalyan marka.",
      image: "/images/brands/freud-logo.png",
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
      image: "/images/brands/mizrak-logo.png",
      features: [
        "Yerli üretim",
        "Üstün kalite kontrol",
        "Yüksek uyumluluk",
        "Uygun fiyat-performans oranı"
      ]
    }
  ], []);

  /* --------------------------------------------------------
     FİYAT FORMATLAYICI (performanslı)
  -------------------------------------------------------- */
  const formatPrice = (price) =>
    new Intl.NumberFormat("tr-TR", { minimumFractionDigits: 2 }).format(price);

  /* --------------------------------------------------------
     JSX Render
  -------------------------------------------------------- */
  return (
    <div className="homepage">
      <Hero />

      {/* ========================== POPÜLER ÜRÜNLER ========================== */}
      <section className="home-products-section">
        <div className="home-container-full">
          <div className="home-section-header">
            <h2 className="home-section-title">Popüler Ürünlerimiz</h2>
            <p className="home-section-description">
              En çok tercih edilen makine ve ekipmanlar
            </p>
          </div>

          {featuredProducts.length === 0 ? (
            <div className="home-products-loading"><p>Ürünler yükleniyor...</p></div>
          ) : (
            <div className="home-products-slider-wrapper">

              {/* SOL OK */}
              <button 
                className="home-slider-arrow home-slider-arrow-left"
                onClick={prevSlide}
                aria-label="Önceki ürünler"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* SLIDER */}
              <div className="home-products-slider-container">
                <div className="home-products-slider">
                  <div 
                    className="home-products-track"
                    style={{ transform: `translateX(-${currentSlide * 25}%)` }}
                  >
                    {featuredProducts.map(product => (
                      <div key={product.id} className="home-product-card">

                        {/* ÜRÜN RESMİ */}
                        <div className="home-product-image">
                          <img 
                            src={product.image}
                            alt={product.name}
                            loading="lazy"
                            onError={e => {
                              e.target.src = "/images/default-product.png";
                            }}
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
                            {product.description.length > 100
                              ? product.description.slice(0, 100) + "..."
                              : product.description}
                          </p>

                          {/* ÖZELLİKLER */}
                          <ul className="home-product-features">
                            {product.features?.slice(0, 2).map((f, idx) => (
                              <li key={idx} className="home-feature-item">
                                <CheckCircle className="home-feature-icon" />
                                <span>{f}</span>
                              </li>
                            ))}
                          </ul>

                          {/* DETAYLI İNCELE */}
                          <Link 
                            to={`/product/${product.id}`}
                            className="home-product-button"
                          >
                            Detaylı İncele <ArrowRight className="home-button-icon" />
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* SAĞ OK */}
              <button 
                className="home-slider-arrow home-slider-arrow-right"
                onClick={nextSlide}
                aria-label="Sonraki ürünler"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

            </div>
          )}

          <div className="home-view-all-products">
            <Link to="/products" className="home-view-all-button">Tüm Ürünleri Gör</Link>
          </div>
        </div>
      </section>

      {/* ========================== HİZMETLER ========================== */}
      <section className="home-services-section">
        <div className="home-container">

          <div className="home-section-header">
            <h2 className="home-section-title">Neden Orhan Makine?</h2>
            <p className="home-section-description">
              40 yıllık sektör tecrübemizle en güvenilir çözüm ortağınız
            </p>
          </div>

          <div className="home-services-grid">
            {services.map((service, idx) => (
              <div key={idx} className="home-service-card">
                <div className="home-service-icon">{service.icon}</div>
                <h3 className="home-service-title">{service.title}</h3>
                <p className="home-service-description">{service.description}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================== MARKALAR ========================== */}
      <section className="home-brands-section">
        <div className="home-container">

          <div className="home-section-header">
            <h2 className="home-section-title">Popüler Markalarımız</h2>
            <p className="home-section-description">
              Dünyaca ünlü kaliteli markaları sizlerle buluşturuyoruz
            </p>
          </div>

          <div className="home-brands-grid">
            {brands.map((brand, idx) => (
              <div key={idx} className="home-brand-card">

                <div className="home-brand-header">
                  <div className="home-brand-logo">
                    <img 
                      src={brand.image}
                      alt={`${brand.name} Logo`}
                      className="home-brand-logo-image"
                      loading="lazy"
                      onError={e => {
                        e.target.style.display = "none";
                        e.target.parentElement.innerHTML =
                          `<span class="home-brand-name-fallback">${brand.name}</span>`;
                      }}
                    />
                  </div>

                  <h3 className="home-brand-title">{brand.name}</h3>
                </div>

                <p className="home-brand-description">{brand.description}</p>

                <ul className="home-brand-features">
                  {brand.features.map((f, i) => (
                    <li key={i} className="home-brand-feature-item">
                      <CheckCircle className="home-feature-icon" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

              </div>
            ))}
          </div>

          {/* TEK BUTON – TÜM MARKALARA GÖTÜRÜR */}
          <div className="home-brand-button-wrapper">
            <Link 
              to="/about#brands"
              className="home-brand-bottom-button"
            >
              Tüm Markaları Gör
              <ArrowRight className="home-button-icon" />
            </Link>
          </div>

        </div>
      </section>
      {/* ========================== SEO SECTION ========================== */}
      <section className="home-seo-section">
        <div className="home-container">
          <div className="home-seo-content">

            <h2 className="home-seo-title">
              Orhan Makine – Profesyonel Makine Satış Hizmetleri
            </h2>

            <div className="home-seo-text">
                <p>
                  Orhan Makine olarak 40 yıla dayanan sektör deneyimimizle, yüksek kalite standartlarına sahip 
                  profesyonel makineleri müşterilerimize güvenilir bir hizmet anlayışıyla sunuyoruz. Freud, 
                  Makita ve Mızrak gibi alanında lider markaların resmi distribütörlüğünü yaparak çözüm odaklı 
                  bir hizmet yaklaşımı benimsiyoruz.
                </p>

                <p>
                  Geniş ürün yelpazemiz; endüstriyel makinelerden profesyonel el aletlerine kadar farklı 
                  ihtiyaçlara yönelik çözümler sunmaktadır. Müşteri memnuniyetini esas alarak satış sürecinden 
                  teknik desteğe kadar tüm aşamalarda yanınızdayız.
                </p>

                <p>
                  Ürün danışmanlığı veya teknik destek almak isterseniz WhatsApp üzerinden 
                  <strong> 0533 461 31 50 </strong> numaramızdan bize kolayca ulaşabilirsiniz.
                </p>
              </div>

          </div>
        </div>
      </section>
    </div>
  );
}