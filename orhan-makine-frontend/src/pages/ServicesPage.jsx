// src/pages/ServicesPage.jsx
import { 
    Wrench, 
    Settings, 
    Zap, 
    CheckCircle, 
    Clock, 
    Shield,
    Users,
    Truck,
    Phone,
    Star
  } from "lucide-react";
  import '../styles/ServicesPage.css';
  
  const ServicesPage = () => {
    const services = [
      {
        icon: <Wrench className="service-icon" />,
        title: "Bileme Hizmeti",
        description: "Endüstriyel kesici takımlarınız için profesyonel bileme ve bakım hizmeti",
        features: [
          "Daire testere bıçakları bileme",
          "Freze bıçakları bileme", 
          "Şerit testere bileme",
          "CNC router bıçakları bileme",
          "Takmatik kesiciler bileme",
          "Metal kesme bıçakları bileme"
        ],
        process: [
          "Ücretsiz teknik kontrol",
          "Detaylı analiz ve değerlendirme",
          "Profesyonel bileme işlemi",
          "Kalite kontrol testleri",
          "6 ay garanti"
        ],
        image: "/images/bileme-hizmeti.jpg",
        color: "#1e3a8a"
      },
      {
        icon: <Settings className="service-icon" />,
        title: "Makine Kurulumu",
        description: "Endüstriyel makineleriniz için profesyonel kurulum ve kalibrasyon hizmeti",
        features: [
          "CNC makine kurulumu",
          "Testere makinaları kurulumu",
          "Freze makinaları kurulumu",
          "Kalibrasyon ve ayar",
          "Operatör eğitimi",
          "Teknik destek"
        ],
        process: [
          "Yerinde keşif ve planlama",
          "Profesyonel kurulum",
          "Kalibrasyon ve test",
          "Operatör eğitimi",
          "7/24 teknik destek"
        ],
        image: "/images/makine-kurulumu.jpg",
        color: "#dc2626"
      },
      {
        icon: <Zap className="service-icon" />,
        title: "Elektrikli El Aleti Satışı",
        description: "Profesyonel kullanım için yüksek kaliteli elektrikli el aletleri",
        features: [
          "Makita ürün yelpazesi",
          "Endüstriyel kalitede aletler",
          "Yedek parça ve aksesuarlar",
          "Teknik danışmanlık",
          "Garanti ve servis",
          "Stoktan hızlı teslimat"
        ],
        process: [
          "İhtiyaç analizi",
          "Ürün önerisi",
          "Demo ve test",
          "Satış sonrası destek",
          "Garanti hizmeti"
        ],
        image: "/images/elektrikli-aletler.jpg",
        color: "#059669"
      }
    ];
  
    const stats = [
      { number: "40+", label: "Yıl Deneyim" },
      { number: "2000+", label: "Mutlu Müşteri" },
      { number: "5000+", label: "Tamamlanan Proje" },
      { number: "7/24", label: "Teknik Destek" }
    ];
  
    const whyChooseUs = [
      {
        icon: <Shield className="feature-icon" />,
        title: "Kalite Garantisi",
        description: "Tüm hizmetlerimizde 6 ay garanti sunuyoruz"
      },
      {
        icon: <Clock className="feature-icon" />,
        title: "Hızlı Hizmet",
        description: "Acil ihtiyaçlarınız için aynı gün çözüm"
      },
      {
        icon: <Users className="feature-icon" />,
        title: "Uzman Ekip",
        description: "40 yıllık deneyime sahip teknik ekibimiz"
      },
      {
        icon: <Truck className="feature-icon" />,
        title: "Yerinde Servis",
        description: "Elazığ ve çevre illerde yerinde hizmet"
      }
    ];
  
    return (
      <div className="services-page">
        {/* Hero Section */}
        <section className="services-hero">
          <div className="container">
            <div className="hero-content">
              <h1 className="hero-title">Hizmetlerimiz</h1>
              <p className="hero-description">
                40 yılı aşkın tecrübemizle Elazığ'da endüstriyel kesici takım bileme, 
                makine kurulumu ve elektrikli el aleti satışında profesyonel çözümler sunuyoruz.
              </p>
              <div className="hero-stats">
                {stats.map((stat, index) => (
                  <div key={index} className="stat-item">
                    <span className="stat-number">{stat.number}</span>
                    <span className="stat-label">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
  
        <div className="container">
          {/* Services Grid */}
          <section className="services-section">
            <div className="section-header">
              <h2 className="section-title">Ana Hizmetlerimiz</h2>
              <p className="section-description">
                Endüstriyel ihtiyaçlarınıza yönelik kapsamlı hizmet yelpazemiz
              </p>
            </div>
  
            <div className="services-grid">
              {services.map((service, index) => (
                <div key={index} className="service-card">
                  <div 
                    className="service-header"
                    style={{ background: `linear-gradient(135deg, ${service.color} 0%, ${service.color}99 100%)` }}
                  >
                    <div className="service-icon-wrapper">
                      {service.icon}
                    </div>
                    <h3 className="service-title">{service.title}</h3>
                    <p className="service-description">{service.description}</p>
                  </div>
  
                  <div className="service-content">
                    <div className="service-features">
                      <h4>Hizmet Kapsamı</h4>
                      <ul>
                        {service.features.map((feature, idx) => (
                          <li key={idx}>
                            <CheckCircle className="feature-check" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
  
                    <div className="service-process">
                      <h4>İşlem Süreci</h4>
                      <div className="process-steps">
                        {service.process.map((step, idx) => (
                          <div key={idx} className="process-step">
                            <span className="step-number">{idx + 1}</span>
                            <span className="step-text">{step}</span>
                          </div>
                        ))}
                      </div>
                    </div>
  
                    <button className="service-cta">
                      Detaylı Bilgi Al
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
  
          {/* Why Choose Us */}
          <section className="why-choose-section">
            <div className="section-header">
              <h2 className="section-title">Neden Bizi Tercih Etmelisiniz?</h2>
              <p className="section-description">
                40 yıllık deneyimimiz ve müşteri memnuniyeti odaklı çalışma prensibimizle fark yaratıyoruz
              </p>
            </div>
  
            <div className="features-grid">
              {whyChooseUs.map((feature, index) => (
                <div key={index} className="feature-card">
                  <div className="feature-icon-wrapper">
                    {feature.icon}
                  </div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              ))}
            </div>
          </section>
  
          {/* CTA Section */}
          <section className="cta-section">
            <div className="cta-content">
              <Star className="cta-icon" />
              <h2>Hizmetlerimizden Yararlanmaya Hazır mısınız?</h2>
              <p>
                Profesyonel ekibimiz ihtiyaçlarınızı analiz edip en uygun çözümü sunmak için hazır. 
                Hemen iletişime geçin.
              </p>
              <div className="cta-buttons">
                <a href="tel:+904242345678" className="cta-btn primary">
                  <Phone className="btn-icon" />
                  Hemen Ara
                </a>
                <a href="/iletisim" className="cta-btn secondary">
                  Mesaj Gönder
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  };
  
  export default ServicesPage;