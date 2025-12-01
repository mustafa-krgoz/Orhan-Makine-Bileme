import '../styles/HomePage.css'
import Hero from "../components/Hero/Hero.jsx";
import { ArrowRight, Shield, Clock, Truck, Star, CheckCircle, ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import { productsData } from "../data/productsData"; // ⭐ Ürün verilerini import ediyoruz

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [featuredProducts, setFeaturedProducts] = useState([]); // ⭐ Popüler ürünleri state'te tutuyoruz
  
  // ⭐ POPÜLER ÜRÜNLERİ productsData.js'DEN AL - sayfa yüklendiğinde çalışır
  useEffect(() => {
    // 1. Önce indirimli ürünleri al (en popüler olduğu için)
    const discountedProducts = productsData
      .filter(product => product.price < product.originalPrice)
      .slice(0, 3);
    
    // 2. Eğer 3'ten az indirimli ürün varsa, yeni ürünler ekle
    const remainingCount = 6 - discountedProducts.length;
    const otherProducts = productsData
      .filter(product => !discountedProducts.includes(product))
      .filter(product => product.isNew || product.isCampaign) // Yeni veya kampanyalı ürünler
      .slice(0, remainingCount);
    
    // 3. İkisini birleştir
    const allProducts = [...discountedProducts, ...otherProducts];
    
    // 4. Eğer hala 6'dan azsa, rastgele ürünler ekle
    if (allProducts.length < 6) {
      const remaining = productsData
        .filter(product => !allProducts.includes(product))
        .slice(0, 6 - allProducts.length);
      allProducts.push(...remaining);
    }
    
    setFeaturedProducts(allProducts.slice(0, 6)); // En fazla 6 ürün göster
  }, []);

  const services = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Kalite Garantisi",
      description: "Tüm işlemlerimizde yüksek kalite standartları ve garanti"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Hızlı Teslimat",
      description: "Aynı gün teslimat ile acil ihtiyaçlarınıza çözüm"
    },
    {
      icon: <Truck className="w-8 h-8" />,
      title: "Ücretsiz Kargo",
      description: "Belirli tutar üzeri ücretsiz kargo imkanı"
    },
  ]

  const brands = [
    { 
      name: "MAKİTA",
      description: "Dünyanın en güçlü elektrikli el aleti markalarından biri.",
      image: "/images/makita-logo.png",
      features: [
        "Profesyonel motor teknolojisi",
        "Uzun ömürlü batarya",
        "Titreşim azaltan tasarım",
        "Geniş ürün gamı"
      ]
    },
    { 
      name: "FREUD", 
      description: "Ahşap kesim ve talaşlı üretimde dünya lideri İtalyan marka.",
      image: "/images/freud-logo.png",
      features: [
        "İtalyan mühendisliği",
        "Endüstriyel dayanıklılık",
        "Premium karbür uç",
        "Uzun ömürlü kesim"
      ]
    },
    { 
      name: "MIZRAK",
      description: "Türkiye'nin güçlü yerli üreticilerinden.",
      image: "/images/mizrak-logo.png",
      features: [
        "Yerli üretim",
        "Kaliteli işçilik",
        "Yüksek uyumluluk",
        "Uygun fiyat"
      ]
    }
  ];

  // ⭐ SLIDER HESAPLAMALARI - featuredProducts yüklendikten sonra çalışır
  const maxSlide = featuredProducts.length > 4 ? featuredProducts.length - 4 : 0;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev >= maxSlide ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev <= 0 ? maxSlide : prev - 1))
  }

  // ⭐ FİYAT FORMATLAMA FONKSİYONU
  const formatPrice = (price) => {
    return new Intl.NumberFormat('tr-TR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(price);
  }

  // ⭐ ÜRÜN ADINI URL UYUMLU HALE GETİRME FONKSİYONU
  const createProductSlug = (productName) => {
    return productName
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/ı/g, "i")
      .replace(/ö/g, "o")
      .replace(/ü/g, "u")
      .replace(/ş/g, "s")
      .replace(/ç/g, "c")
      .replace(/ğ/g, "g");
  }

  return (
    <div className="homepage">
      <Hero />

      {/* ========================== */}
      {/* POPÜLER ÜRÜNLER BÖLÜMÜ */}
      {/* ========================== */}
      <section className="products-section">
        <div className="container-full">
          <div className="section-header">
            <h2 className="section-title">Popüler Ürünler</h2>
            <p className="section-description">En çok tercih edilen ürünler</p>
          </div>
          
          {/* ⭐ ÜRÜNLER YÜKLENİYORSA LOADER GÖSTER */}
          {featuredProducts.length === 0 ? (
            <div className="products-loading">
              <p>Ürünler yükleniyor...</p>
            </div>
          ) : (
            <div className="products-slider-wrapper">
              
              {/* ⭐ SOL OK BUTONU - önceki ürünlere kaydırır */}
              <button className="slider-arrow slider-arrow-left" onClick={prevSlide}>
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* ⭐ ÜRÜN SLIDER KONTEYNERI */}
              <div className="products-slider-container">
                <div className="products-slider">
                  <div 
                    className="products-track"
                    style={{ transform: `translateX(calc(-${currentSlide * 25}%))` }}
                  >
                    {featuredProducts.map((product, index) => (
                      <div key={product.id} className="product-card"> {/* ⭐ product.id kullanıyoruz */}
                        
                        {/* ⭐ ÜRÜN RESMİ */}
                        <div className="product-image">
                          <img 
                            src={product.image} 
                            alt={product.name}
                            onError={(e) => {
                              e.target.src = "/images/default-product.png";
                            }}
                          />
                          
                          {/* ⭐ ÜRÜN BADGELERİ (indirim, yeni, kampanya) */}
                          <div className="home-product-badges">
                            {product.price < product.originalPrice && (
                              <span className="badge discount">
                                %{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}
                              </span>
                            )}
                            {product.isNew && <span className="badge new">YENİ</span>}
                            {product.isCampaign && <span className="badge campaign">KAMPANYA</span>}
                          </div>
                        </div>

                        {/* ⭐ ÜRÜN İÇERİĞİ */}
                        <div className="product-content">
                          <div className="product-brand">{product.brand}</div>
                          <h3 className="product-title">{product.name}</h3>
                          
                          {/* ⭐ FİYAT BİLGİSİ */}
                          <div className="product-pricing">
                            {product.price < product.originalPrice && (
                              <div className="original-price-home">
                                {formatPrice(product.originalPrice)} TL
                              </div>
                            )}
                            <p className="product-price">{formatPrice(product.price)} TL</p>
                          </div>
                          
                          <p className="product-description">{product.description}</p>

                          {/* ⭐ ÜRÜN ÖZELLİKLERİ */}
                          <ul className="product-features">
                            {(product.features || []).slice(0, 2).map((feature, idx) => (
                              <li key={idx} className="feature-item">
                                <CheckCircle className="feature-icon" /> {feature}
                              </li>
                            ))}
                          </ul>

                          {/* ⭐ DETAYLI İNCELE BUTONU - ürün detay sayfasına yönlendirir */}
                          <Link 
                            to={`/product/${product.id}`} // ⭐ URL'de ürün ID'sini kullanıyoruz
                            className="product-button"
                          >
                            Detaylı İncele <ArrowRight className="button-icon" />
                          </Link>

                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* ⭐ SAĞ OK BUTONU - sonraki ürünlere kaydırır */}
              <button className="slider-arrow slider-arrow-right" onClick={nextSlide}>
                <ChevronRight className="w-6 h-6" />
              </button>

            </div>
          )}
          
          {/* ⭐ TÜM ÜRÜNLERİ GÖR BUTONU - ürünler sayfasına yönlendirir */}
          <div className="view-all-products">
            <Link to="/products" className="view-all-button">
              Tüm Ürünleri Gör <ArrowRight className="button-icon" />
            </Link>
          </div>
        </div>
      </section>

      {/* ========================== */}
      {/* HİZMETLER BÖLÜMÜ */}
      {/* ========================== */}
      <section className="services-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Neden Bizi Tercih Etmelisiniz?</h2>
            <p className="section-description">
              Kalite ve müşteri memnuniyeti odaklı çalışma prensibimizle yanınızdayız.
            </p>
          </div>

          <div className="services-grid">
            {services.map((service, index) => (
              <div key={index} className="service-card">
                <div className="service-icon">{service.icon}</div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================== */}
      {/* MARKALAR BÖLÜMÜ */}
      {/* ========================== */}
      <section className="brands-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Güvenilen Markalar</h2>
            <p className="section-description">
              Kaliteye ortak olduğumuz ve güvendiğimiz markalar
            </p>
          </div>

          <div className="brands-grid">
            {brands.map((brand, index) => (
              <div key={index} className="brand-card">
                
                <div className="brand-header">
                  <div className="brand-logo">
                    <img 
                      src={brand.image} 
                      alt={`${brand.name} logo`}
                      className="brand-logo-image"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextElementSibling.style.display = 'flex';
                      }}
                    />
                    <div className="brand-logo-fallback">
                      <Star className="logo-icon" />
                    </div>
                  </div>

                  <h3 className="brand-title">{brand.name}</h3>
                </div>

                <p className="brand-description">{brand.description}</p>

                <ul className="brand-features">
                  {brand.features.map((feature, idx) => (
                    <li key={idx} className="brand-feature-item">
                      <CheckCircle className="feature-icon" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* ⭐ MARKA ÜRÜNLERİ BUTONU - ürünler sayfasına yönlendirir */}
                <Link to="/products" className="brand-button">
                  Ürünleri İncele <ArrowRight className="button-icon" />
                </Link>

              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}