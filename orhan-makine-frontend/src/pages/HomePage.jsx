// pages/HomePage.jsx
import '../styles/HomePage.css'
import Hero from "../components/Hero/Hero.jsx";
import { ArrowRight, Shield, Clock, Truck, Star, Phone, CheckCircle } from "lucide-react"

export default function HomePage() {
  const featuredProducts = [
    {
      name: "Daire Testereler",
      image: "/images/daire-testere.jpg",
      description: "Yüksek kaliteli daire testere bıçakları",
      features: ["Yüksek kesim performansı", "Uzun ömür", "Çeşitli ebatlar"]
    },
    {
      name: "Freze Bıçakları",
      image: "/images/freze-bicaklari.jpg",
      description: "Çeşitli ebatlarda freze bıçakları",
      features: ["Yüksek hassasiyet", "Dayanıklı malzeme", "Farklı tipler"]
    },
    {
      name: "CNC Router Bıçakları",
      image: "/images/cnc-router.jpg",
      description: "Profesyonel CNC router kesiciler",
      features: ["Yüksek hız", "Mükemmel yüzey", "Uzun ömür"]
    },
    {
      name: "Şerit Testere",
      image: "/images/serit-testere.jpg",
      description: "Dayanıklı şerit testere bıçakları",
      features: ["Kesintisiz kesim", "Dayanıklılık", "Çeşitli boyutlar"]
    }
  ]

  const brands = [
    { 
      name: "KONİG", 
      description: "Mevzuatı Gazetesi Üretimde yüksek kalite", 
      image: "/images/konig.jpg",
      features: ["Yüksek kalite", "Standart uyumlu", "Uzun ömür"]
    },
    { 
      name: "FREUD", 
      description: "Güçlü italyan markası", 
      image: "/images/freud.jpg",
      features: ["İtalyan kalitesi", "Yüksek performans", "Geniş ürün yelpazesi"]
    },
    { 
      name: "FINİHS", 
      description: "Yerli üretim - azmin ve müsağelenin gücü", 
      image: "/images/finihs.jpg",
      features: ["Yerli üretim", "Uygun fiyat", "Hızlı temin"]
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
    {
      icon: <Star className="w-8 h-8" />,
      title: "Uzman Ekip",
      description: "Deneyimli teknik ekibimizle profesyonel hizmet"
    }
  ]

  return (
    <div className="homepage">
      <Hero />
      {/* HİZMETLER SECTION */}
      <section className="services-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Neden Bizi Tercih Etmelisiniz?</h2>
            <p className="section-description">
              Kaliteli hizmet anlayışımız ve müşteri memnuniyeti odaklı çalışma prensibimizle yanınızdayız
            </p>
          </div>
          <div className="services-grid">
            {services.map((service, index) => (
              <div key={index} className="service-card">
                <div className="service-icon">
                  {service.icon}
                </div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* POPÜLER ÜRÜNLER */}
      <section className="products-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Popüler Ürünler</h2>
            <p className="section-description">
              En çok tercih edilen kesici takım ve ekipmanlar
            </p>
          </div>
          
          <div className="products-grid">
            {featuredProducts.map((product, index) => (
              <div key={index} className="product-card">
                <div className="product-image">
                  <div className="image-placeholder">
                    <span>{product.name}</span>
                  </div>
                </div>
                <div className="product-content">
                  <h3 className="product-title">{product.name}</h3>
                  <p className="product-description">{product.description}</p>
                  <ul className="product-features">
                    {product.features.map((feature, idx) => (
                      <li key={idx} className="feature-item">
                        <CheckCircle className="feature-icon" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button className="product-button">
                    Detaylı İncele <ArrowRight className="button-icon" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MARKALAR */}
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
                    <Star className="logo-icon" />
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
    </div>
  )
}