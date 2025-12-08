import '../styles/HomePage.css'
import Hero from "../components/Hero/Hero.jsx";
import { ArrowRight, Shield, Clock, Truck, CheckCircle, ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import { productsData } from "../data/productsData";

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  
  useEffect(() => {
    // Popüler ürünleri seç
    const allProducts = [...productsData]
      .sort(() => Math.random() - 0.5)
      .slice(0, 6);
    
    setFeaturedProducts(allProducts);
  }, []);

  const services = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Kalite Garantisi",
      description: "Tüm makinelerimizde 2 yıl garantili ve kalite standartlarında hizmet"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Hızlı Teslimat",
      description: "Stoktan aynı gün teslimat ile üretiminizin aksamamasını sağlıyoruz"
    },
    {
      icon: <Truck className="w-8 h-8" />,
      title: "Ücretsiz Montaj",
      description: "Belirli modellerde ücretsiz kurulum ve montaj hizmeti sunuyoruz"
    },
  ]

  const brands = [
    { 
      name: "MAKİTA",
      description: "Dünyanın önde gelen elektrikli el aleti markası. Profesyonel kullanıcıların tercihi.",
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
      description: "Türkiye'nin güçlü yerli üreticilerinden. Yüksek kalite, uygun fiyat.",
      image: "/images/brands/mizrak-logo.png",
      features: [
        "Yerli üretim ve mühendislik",
        "Üstün kalite kontrol",
        "Yüksek uyumluluk ve esneklik",
        "Uygun fiyat-performans oranı"
      ]
    }
  ];

  const maxSlide = featuredProducts.length > 4 ? featuredProducts.length - 4 : 0;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev >= maxSlide ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev <= 0 ? maxSlide : prev - 1))
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('tr-TR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(price);
  }

  return (
    <div className="homepage">
      <Hero />

      {/* POPÜLER ÜRÜNLER BÖLÜMÜ */}
      <section className="home-products-section">
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
              
              {/* SOL OK BUTONU */}
              <button 
                className="home-slider-arrow home-slider-arrow-left" 
                onClick={prevSlide}
                aria-label="Önceki ürünler"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* ÜRÜN SLIDER KONTEYNERI */}
              <div className="home-products-slider-container">
                <div className="home-products-slider">
                  <div 
                    className="home-products-track"
                    style={{ transform: `translateX(calc(-${currentSlide * 25}%))` }}
                  >
                    {featuredProducts.map((product) => (
                      <div key={product.id} className="home-product-card">
                        
                        {/* ÜRÜN RESMİ */}
                        <div className="home-product-image">
                          <img 
                            src={product.image} 
                            alt={product.name}
                            loading="lazy"
                            onError={(e) => {
                              e.target.src = "/images/default-product.png";
                            }}
                          />
                        </div>

                        {/* ÜRÜN İÇERİĞİ */}
                        <div className="home-product-content">
                          <div className="home-product-brand">{product.brand}</div>
                          <h3 className="home-product-title">{product.name}</h3>
                          
                          {/* FİYAT BİLGİSİ */}
                          <div className="home-product-pricing">
                            <p className="home-product-price">{formatPrice(product.price)} TL</p>
                          </div>
                          
                          <p className="home-product-description">
                            {product.description.length > 100 
                              ? `${product.description.substring(0, 100)}...` 
                              : product.description}
                          </p>

                          {/* ÜRÜN ÖZELLİKLERİ */}
                          <ul className="home-product-features">
                            {(product.features || []).slice(0, 2).map((feature, idx) => (
                              <li key={idx} className="home-feature-item">
                                <CheckCircle className="home-feature-icon" /> 
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>

                          {/* DETAYLI İNCELE BUTONU */}
                          <Link 
                            to={`/product/${product.id}`}
                            className="home-product-button"
                            aria-label={`${product.name} detaylı incele`}
                          >
                            Detaylı İncele <ArrowRight className="home-button-icon" />
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* SAĞ OK BUTONU */}
              <button 
                className="home-slider-arrow home-slider-arrow-right" 
                onClick={nextSlide}
                aria-label="Sonraki ürünler"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          )}
          
          {/* TÜM ÜRÜNLERİ GÖR BUTONU */}
          <div className="home-view-all-products">
            <Link to="/products" className="home-view-all-button">
              Tüm Ürünleri Gör
            </Link>
          </div>
        </div>
      </section>

      {/* HİZMETLER BÖLÜMÜ */}
      <section className="home-services-section">
        <div className="home-container">
          <div className="home-section-header">
            <h2 className="home-section-title">Neden Orhan Makine?</h2>
            <p className="home-section-description">
              40 yıllık sektör tecrübemizle, makine satışında en güvenilir çözüm ortağınız
            </p>
          </div>

          <div className="home-services-grid">
            {services.map((service, index) => (
              <div key={index} className="home-service-card">
                <div className="home-service-icon">{service.icon}</div>
                <h3 className="home-service-title">{service.title}</h3>
                <p className="home-service-description">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MARKALAR BÖLÜMÜ */}
      <section className="home-brands-section">
        <div className="home-container">
          <div className="home-section-header">
            <h2 className="home-section-title">Güvendiğimiz Markalar</h2>
            <p className="home-section-description">
              Dünyaca ünlü kaliteli markaları sizlerle buluşturuyoruz
            </p>
          </div>

          <div className="home-brands-grid">
            {brands.map((brand, index) => (
              <div key={index} className="home-brand-card">
                
                <div className="home-brand-header">
                  <div className="home-brand-logo">
                    <img 
                      src={brand.image} 
                      alt={`${brand.name} logo`}
                      className="home-brand-logo-image"
                      loading="lazy"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentElement.innerHTML = `<span class="home-brand-name-fallback">${brand.name}</span>`;
                      }}
                    />
                  </div>

                  <h3 className="home-brand-title">{brand.name}</h3>
                </div>

                <p className="home-brand-description">{brand.description}</p>

                <ul className="home-brand-features">
                  {brand.features.map((feature, idx) => (
                    <li key={idx} className="home-brand-feature-item">
                      <CheckCircle className="home-feature-icon" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* MARKA ÜRÜNLERİ BUTONU */}
                <Link to={`/products?brand=${brand.name.toLowerCase()}`} className="home-brand-button">
                  Ürünleri İncele <ArrowRight className="home-button-icon" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO İÇERİK BÖLÜMÜ */}
      <section className="home-seo-section">
        <div className="home-container">
          <div className="home-seo-content">
            <h2 className="home-seo-title">Orhan Makine - Profesyonel Makine Satış Hizmetleri</h2>
            <div className="home-seo-text">
              <p>
                Orhan Makine olarak, sektördeki 40 yıllık tecrübemizle kaliteli makineleri en uygun fiyatlarla 
                müşterilerimizle buluşturuyoruz. Makita, Freud ve Mizrak gibi dünyaca ünlü markaların 
                güvenilir distribütörü olarak, profesyonel makine satış hizmetleri sunmaktayız.
              </p>
              <p>
                Tüm ürünlerimiz 2 yıl garantili olup, ücretsiz kargo ve hızlı teslimat imkanıyla 
                hizmetinizdeyiz. Endüstriyel makinelerden profesyonel el aletlerine kadar geniş ürün 
                yelpazemizle ihtiyacınız olan her türlü ekipmanı bulabilirsiniz.
              </p>
              <p>
                WhatsApp üzerinden 7/24 destek hattımızla (0539 515 99 25) bize ulaşabilir, 
                teknik destek ve ürün danışmanlığı alabilirsiniz.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}