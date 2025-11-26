// pages/HomePage.jsx
import '../styles/HomePage.css'
import Hero from "../components/Hero/Hero.jsx";
import { ArrowRight, Shield, Clock, Truck, Star, CheckCircle, ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom";

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  
  const featuredProducts = [
    {
      name: "CORA Kompresör",
      image: "/images/CORA-KOMPRESOR-2.5HP-100L.png",
      description: "Güçlü ve sessiz çalışan kompresör",
      price: "₺7.900",
      features: ["Yüksek basınç kapasitesi", "Düşük enerji tüketimi", "Sessiz çalışma"]
    },
    {
      name: "Makita Sunta Kesme Makinesi",
      image: "/images/HS7601-SUNTA-KESME.png",
      description: "Hassas kesim için ideal makine",
      price: "₺5.900",
      features: ["Hassas kesim", "Ergonomik tasarım", "Güçlü motor"]
    },
    {
      name: "Makita Dekupaj Elektronik",
      image: "/images/MAKITA 4350CT DEKUPAJ ELEKTRONIK1.png",
      description: "Elektronik hız kontrolü ile dekupaj",
      price: "₺5.300",
      features: ["Değişken hız", "Kolay bıçak değişimi", "Hassas kesim"]
    },
    {
      name: "Makita Akülü Kırıcı Delici",
      image: "/images/MAKITA-DHR241RMJ-AKULU-KIRICI-DELICI-HILTI1.png",
      description: "Güçlü akülü kırıcı delici hilti",
      price: "₺14.500",
      features: ["Kablosuz özgürlük", "Yüksek darbe gücü", "Uzun pil ömrü"]
    },
    {
      name: "Makita Isıtıcı",
      image: "/images/MAKITA-HG5030K-ISITICI1.png",
      description: "Portatif ısıtma çözümü",
      price: "₺2.200",
      features: ["Hızlı ısınma", "Ayarlanabilir sıcaklık", "Güvenli kullanım"]
    },
    {
      name: "Makita Tablalı Gönye Tezgah",
      image: "/images/MAKITA-LH1040-TABLALI-GONYE-TEZGAH.png",
      description: "Profesyonel gönye kesim tezgahı",
      price: "₺18.500",
      features: ["Hassas açı ayarı", "Geniş kesim kapasitesi", "Sağlam yapı"]
    }
  ]

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

  const maxSlide = featuredProducts.length - 4

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev >= maxSlide ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev <= 0 ? maxSlide : prev - 1))
  }

  return (
    <div className="homepage">
      <Hero />

      {/* ========================== */}
      {/* POPÜLER ÜRÜNLER */}
      {/* ========================== */}
      <section className="products-section">
        <div className="container-full">
          <div className="section-header">
            <h2 className="section-title">Popüler Ürünler</h2>
            <p className="section-description">En çok tercih edilen ürünler</p>
          </div>
          
          <div className="products-slider-wrapper">
            
            <button className="slider-arrow slider-arrow-left" onClick={prevSlide}>
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div className="products-slider-container">
              <div className="products-slider">
                <div 
                  className="products-track"
                  style={{ transform: `translateX(calc(-${currentSlide * 25}%))` }}
                >
                  {featuredProducts.map((product, index) => (
                    <div key={index} className="product-card">
                      
                      <div className="product-image">
                        <img src={product.image} alt={product.name} />
                      </div>

                      <div className="product-content">
                        <h3 className="product-title">{product.name}</h3>
                        <p className="product-price">{product.price}</p>
                        <p className="product-description">{product.description}</p>

                        <ul className="product-features">
                          {product.features.map((f, idx) => (
                            <li key={idx} className="feature-item">
                              <CheckCircle className="feature-icon" /> {f}
                            </li>
                          ))}
                        </ul>

                        {/* ⭐ Ürün Detay Linki */}
                        <Link 
                          to={`/urunler/${product.name
                            .toLowerCase()
                            .replace(/ /g, "-")
                            .replace(/ı/g, "i")
                            .replace(/ö/g, "o")
                            .replace(/ü/g, "u")
                            .replace(/ş/g, "s")
                            .replace(/ç/g, "c")
                            .replace(/ğ/g, "g")
                          }`}
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

            <button className="slider-arrow slider-arrow-right" onClick={nextSlide}>
              <ChevronRight className="w-6 h-6" />
            </button>

          </div>
        </div>
      </section>

      {/* ========================== */}
      {/* HİZMETLER */}
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
      {/* MARKALAR */}
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

                <button className="brand-button">
                  Ürünleri İncele <ArrowRight className="button-icon" />
                </button>

              </div>
            ))}
          </div>
        </div>
      </section>

    </div> // ← burası tek kapanış, doğru yer
  )
}