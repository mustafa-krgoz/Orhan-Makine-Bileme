import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Factory, Target, Eye, Award, Users, Clock,
  CheckCircle, Shield, Wrench, Package, Truck,
  Phone, Mail, MapPin, ChevronRight, Star,
  HardHat, Settings, Zap, ShieldCheck, Globe
} from 'lucide-react';
import '../styles/AboutPage.css';

const AboutPage = () => {
  const [activeSection, setActiveSection] = useState('about');

  // SEO için sayfa başlığı
  React.useEffect(() => {
    document.title = 'Hakkımızda | Orhan Makine Bileme - 40 Yıllık Tecrübe';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 
        'Orhan Makine Bileme - 40 yılı aşkın tecrübemizle mobilya ve endüstriyel sektöre kaliteli makine satışı ve teknik destek hizmetleri sunuyoruz.'
      );
    }
    
    // Structured data için JSON-LD
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "name": "Orhan Makine Bileme Hakkımızda",
      "description": "40 yıllık tecrübe ile mobilya sektörüne makine satışı ve teknik destek",
      "publisher": {
        "@type": "Organization",
        "name": "Orhan Makine Bileme",
        "url": window.location.origin,
        "logo": `${window.location.origin}/logo.png`,
        "foundingDate": "1980",
        "founder": {
          "@type": "Person",
          "name": "Orhan Makine"
        },
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Elazığ",
          "addressRegion": "Elazığ",
          "addressCountry": "TR"
        }
      }
    });
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  // Markalar listesi
  const brands = [
    { name: 'Freud', description: 'Kaliteli Testere Bıçakları', category: 'Testereler' },
    { name: 'Farabi', description: 'Endüstriyel Testereler', category: 'Testereler' },
    { name: 'Mızrak', description: 'Profesyonel Makineler', category: 'Makineler' },
    { name: 'Biçmaksan', description: 'Kesim Makineleri', category: 'Makineler' },
    { name: 'Altendorf', description: 'Kesim Sistemleri', category: 'Makineler' },
    { name: 'Homag', description: 'CNC Makineler', category: 'CNC' },
    { name: 'Weeke', description: 'Panel İşleme', category: 'CNC' },
    { name: 'Schelling', description: 'Kesim Makineleri', category: 'Makineler' }
  ];

  // Çözümler listesi
  const solutions = [
    {
      icon: <Settings size={24} />,
      title: 'CNC Makineler',
      description: 'Panel işleme, router ve kesim makineleri'
    },
    {
      icon: <Wrench size={24} />,
      title: 'Testere Bileme',
      description: 'Freud, Farabi marka testerelerin bakım ve bileme hizmetleri'
    },
    {
      icon: <Zap size={24} />,
      title: 'Toz Emme Sistemleri',
      description: 'Endüstriyel toz emme ve filtreleme sistemleri'
    },
    {
      icon: <Package size={24} />,
      title: 'Yedek Parça',
      description: 'Orijinal yedek parça ve aksesuar temini'
    },
    {
      icon: <ShieldCheck size={24} />,
      title: 'Teknik Servis',
      description: '7/24 teknik destek ve bakım hizmetleri'
    },
    {
      icon: <Globe size={24} />,
      title: 'Danışmanlık',
      description: 'Sektörel danışmanlık ve çözüm önerileri'
    }
  ];

  // Sektörler listesi
  const industries = [
    'Mobilya Üretimi',
    'Ahşap İşleme',
    'Kapı-Pencere Üretimi',
    'Parke Üretimi',
    'Laminasyon',
    'PVC İşleme',
    'Alüminyum Doğrama',
    'Endüstriyel Üretim'
  ];

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-content">
          <div className="about-hero-text">
            <div className="about-breadcrumb">
              <Link to="/" className="about-breadcrumb-link">Ana Sayfa</Link>
              <ChevronRight size={16} />
              <span className="about-breadcrumb-current">Hakkımızda</span>
            </div>
            <h1 className="about-hero-title">
              40 Yılı Aşkın Tecrübe ile Mobilya Sektöründe
            </h1>
            <p className="about-hero-description">
              1980'den bu yana mobilya ve endüstriyel sektöre kaliteli makine satışı, 
              teknik destek ve çözüm ortaklığı sunuyoruz.
            </p>
          </div>
          <div className="about-hero-image-container">
            <img 
                src="/images/orhan-makine-bina.png" 
                alt="Orhan Makine Bileme İşyeri - Elazığ"
                className="about-hero-image"
                loading="eager"
                width="800"
                height="600"
            />
            <div className="about-hero-badge">
                <Clock size={20} />
                <span>1980'den Beri</span>
            </div>
            </div>
        </div>
      </section>

      {/* Quick Navigation */}
      <nav className="about-quick-nav" aria-label="Sayfa içi navigasyon">
        <div className="about-quick-nav-container">
          <button 
            className={`about-nav-button ${activeSection === 'about' ? 'about-nav-active' : ''}`}
            onClick={() => setActiveSection('about')}
            aria-label="Hakkımızda bölümüne git"
          >
            <Factory size={20} />
            <span>Hakkımızda</span>
          </button>
          <button 
            className={`about-nav-button ${activeSection === 'mission' ? 'about-nav-active' : ''}`}
            onClick={() => setActiveSection('mission')}
            aria-label="Misyon ve vizyon bölümüne git"
          >
            <Target size={20} />
            <span>Misyon & Vizyon</span>
          </button>
          <button 
            className={`about-nav-button ${activeSection === 'solutions' ? 'about-nav-active' : ''}`}
            onClick={() => setActiveSection('solutions')}
            aria-label="Çözümler bölümüne git"
          >
            <Wrench size={20} />
            <span>Çözümlerimiz</span>
          </button>
          <button 
            className={`about-nav-button ${activeSection === 'brands' ? 'about-nav-active' : ''}`}
            onClick={() => setActiveSection('brands')}
            aria-label="Markalar bölümüne git"
          >
            <Award size={20} />
            <span>Markalarımız</span>
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="about-main-content">
        
        {/* About Section */}
        <section 
          id="about" 
          className={`about-section ${activeSection === 'about' ? 'about-section-active' : ''}`}
          aria-labelledby="about-heading"
        >
          <div className="about-section-header">
            <Factory size={32} className="about-section-icon" />
            <h2 id="about-heading" className="about-section-title">Hakkımızda</h2>
            <p className="about-section-subtitle">40 Yıllık Güven ve Tecrübe</p>
          </div>
          
          <div className="about-section-content">
            <div className="about-story">
              <div className="about-story-text">
                <h3 className="about-story-title">Orhan Makine Bileme'nin Hikayesi</h3>
                <p className="about-story-paragraph">
                  1980 yılında Elazığ'da küçük bir atölye olarak başlayan yolculuğumuz, 
                  bugün mobilya ve endüstriyel sektörün önde gelen makine tedarikçilerinden 
                  biri olmamızı sağladı.
                </p>
                <p className="about-story-paragraph">
                  Kuruluşumuzdan bu yana, sektörün ihtiyaçlarını anlayarak Freud, Farabi, 
                  Mızrak gibi dünyaca ünlü markaların Türkiye distribütörlüğünü üstlendik. 
                  Sadece makine satışı değil, aynı zamanda teknik destek, bakım ve 
                  danışmanlık hizmetleriyle müşterilerimizin yanındayız.
                </p>
                <div className="about-stats">
                  <div className="about-stat">
                    <div className="about-stat-number">40+</div>
                    <div className="about-stat-label">Yıllık Tecrübe</div>
                  </div>
                  <div className="about-stat">
                    <div className="about-stat-number">5000+</div>
                    <div className="about-stat-label">Mutlu Müşteri</div>
                  </div>
                  <div className="about-stat">
                    <div className="about-stat-number">50+</div>
                    <div className="about-stat-label">Marka</div>
                  </div>
                  <div className="about-stat">
                    <div className="about-stat-number">24/7</div>
                    <div className="about-stat-label">Teknik Destek</div>
                  </div>
                </div>
              </div>
              
              <div className="about-story-image-container">
                <img 
                    src="/images/orhan-makine-bina.png" 
                    alt="Orhan Makine Bileme Fabrika ve İşyeri"
                    className="about-story-image"
                    loading="lazy"
                    width="600"
                    height="400"
                />
                <div className="about-story-overlay">
                    <HardHat size={24} />
                    <p>Profesyonel Ekip, Kaliteli Hizmet</p>
                </div>
             </div>
            </div>

            {/* Sektörler */}
            <div className="about-industries">
              <h3 className="about-industries-title">Hizmet Verdiğimiz Sektörler</h3>
              <div className="about-industries-list">
                {industries.map((industry, index) => (
                  <div key={index} className="about-industry-item">
                    <CheckCircle size={20} className="about-industry-icon" />
                    <span className="about-industry-name">{industry}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision Section */}
        <section 
          id="mission" 
          className={`about-section ${activeSection === 'mission' ? 'about-section-active' : ''}`}
          aria-labelledby="mission-heading"
        >
          <div className="about-section-header">
            <Target size={32} className="about-section-icon" />
            <h2 id="mission-heading" className="about-section-title">Misyon & Vizyon</h2>
            <p className="about-section-subtitle">Geleceğe Yön Veriyoruz</p>
          </div>

          <div className="about-mission-vision">
            <div className="about-mission">
              <div className="about-mission-icon">
                <Target size={48} />
              </div>
              <h3 className="about-mission-title">Misyonumuz</h3>
              <p className="about-mission-description">
                Mobilya ve endüstriyel sektöre en kaliteli makineleri, en uygun fiyatlarla 
                sunarak müşterilerimizin üretim verimliliğini artırmak. Teknik desteğimiz 
                ve danışmanlık hizmetlerimizle sektörün gelişimine katkı sağlamak.
              </p>
              <ul className="about-mission-list">
                <li><CheckCircle size={16} /> Kaliteli ürün temini</li>
                <li><CheckCircle size={16} /> Teknik eğitim ve destek</li>
                <li><CheckCircle size={16} /> Hızlı ve güvenilir servis</li>
                <li><CheckCircle size={16} /> Sürekli gelişim</li>
              </ul>
            </div>

            <div className="about-vision">
              <div className="about-vision-icon">
                <Eye size={48} />
              </div>
              <h3 className="about-vision-title">Vizyonumuz</h3>
              <p className="about-vision-description">
                Türkiye'nin önde gelen makine tedarikçisi ve çözüm ortağı olarak, 
                uluslararası arenada tanınan, sektörün geleceğine yön veren bir marka 
                olmak. Yenilikçi teknolojilerle müşterilerimizi buluşturarak 
                rekabet güçlerini artırmak.
              </p>
              <ul className="about-vision-list">
                <li><Star size={16} /> Sektör lideri olmak</li>
                <li><Star size={16} /> İnovasyon odaklı büyüme</li>
                <li><Star size={16} /> Uluslararası pazarlarda varlık</li>
                <li><Star size={16} /> Sürdürülebilir başarı</li>
              </ul>
            </div>
          </div>

          {/* Values */}
          <div className="about-values">
            <h3 className="about-values-title">Değerlerimiz</h3>
            <div className="about-values-grid">
              <div className="about-value-card">
                <div className="about-value-icon">
                  <Shield size={24} />
                </div>
                <h4 className="about-value-title">Güvenilirlik</h4>
                <p className="about-value-description">
                  40 yıllık tecrübemizle müşterilerimize güven veriyor, sözlerimizin 
                  arkasında duruyoruz.
                </p>
              </div>
              <div className="about-value-card">
                <div className="about-value-icon">
                  <Users size={24} />
                </div>
                <h4 className="about-value-title">Müşteri Odaklılık</h4>
                <p className="about-value-description">
                  Müşteri memnuniyetini her şeyin üzerinde tutuyor, özel çözümler 
                  üretiyoruz.
                </p>
              </div>
              <div className="about-value-card">
                <div className="about-value-icon">
                  <Award size={24} />
                </div>
                <h4 className="about-value-title">Kalite</h4>
                <p className="about-value-description">
                  Dünyanın en kaliteli markalarını temsil ediyor, ürünlerimizin 
                  kalitesinden ödün vermiyoruz.
                </p>
              </div>
              <div className="about-value-card">
                <div className="about-value-icon">
                  <Truck size={24} />
                </div>
                <h4 className="about-value-title">Hızlı Hizmet</h4>
                <p className="about-value-description">
                  Satış sonrası destek ve teknik serviste hızlı çözümler sunuyor, 
                  üretiminizin durmamasını sağlıyoruz.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Solutions Section */}
        <section 
          id="solutions" 
          className={`about-section ${activeSection === 'solutions' ? 'about-section-active' : ''}`}
          aria-labelledby="solutions-heading"
        >
          <div className="about-section-header">
            <Wrench size={32} className="about-section-icon" />
            <h2 id="solutions-heading" className="about-section-title">Çözümlerimiz</h2>
            <p className="about-section-subtitle">Endüstriyel Üretim için Kapsamlı Çözümler</p>
          </div>

          <div className="about-solutions">
            {solutions.map((solution, index) => (
              <div key={index} className="about-solution-card">
                <div className="about-solution-icon">
                  {solution.icon}
                </div>
                <h3 className="about-solution-title">{solution.title}</h3>
                <p className="about-solution-description">{solution.description}</p>
                <div className="about-solution-features">
                  <span className="about-solution-feature">
                    <CheckCircle size={14} /> Uzman Ekip
                  </span>
                  <span className="about-solution-feature">
                    <CheckCircle size={14} /> Orijinal Ürün
                  </span>
                  <span className="about-solution-feature">
                    <CheckCircle size={14} /> Teknik Destek
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Detailed Products */}
          <div className="about-products-detail">
            <h3 className="about-products-title">Ürün Gruplarımız</h3>
            <div className="about-products-grid">
              <div className="about-product-category">
                <h4 className="about-category-title">CNC Makineler</h4>
                <ul className="about-category-list">
                  <li>CNC Router Makineler</li>
                  <li>Panel İşleme Makineleri</li>
                  <li>Kesim ve Delik Makineleri</li>
                  <li>3 Eksenli CNC Sistemler</li>
                </ul>
              </div>
              <div className="about-product-category">
                <h4 className="about-category-title">Testere Sistemleri</h4>
                <ul className="about-category-list">
                  <li>Freud Testere Bıçakları</li>
                  <li>Farabi Endüstriyel Testereler</li>
                  <li>Panel Testere Makineleri</li>
                  <li>Daire Testere Sistemleri</li>
                </ul>
              </div>
              <div className="about-product-category">
                <h4 className="about-category-title">Toz Emme Sistemleri</h4>
                <ul className="about-category-list">
                  <li>Endüstriyel Toz Emiciler</li>
                  <li>Filtreleme Sistemleri</li>
                  <li>Santral Toz Emme</li>
                  <li>Mobil Toz Emme Üniteleri</li>
                </ul>
              </div>
              <div className="about-product-category">
                <h4 className="about-category-title">Yedek Parça & Aksesuar</h4>
                <ul className="about-category-list">
                  <li>Orijinal Yedek Parçalar</li>
                  <li>Kesici Takımlar</li>
                  <li>Bakım Kitleri</li>
                  <li>Endüstriyel Aksesuarlar</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Brands Section */}
        <section 
          id="brands" 
          className={`about-section ${activeSection === 'brands' ? 'about-section-active' : ''}`}
          aria-labelledby="brands-heading"
        >
          <div className="about-section-header">
            <Award size={32} className="about-section-icon" />
            <h2 id="brands-heading" className="about-section-title">Markalarımız</h2>
            <p className="about-section-subtitle">Dünyanın Önde Gelen Markalarını Temsil Ediyoruz</p>
          </div>

          <div className="about-brands-intro">
            <p className="about-brands-description">
              Mobilya ve endüstriyel sektörünün önde gelen markalarının resmi distribütörüyüz. 
              Her marka, kendi kategorisinde dünya standartlarında kalite sunmaktadır.
            </p>
          </div>

          <div className="about-brands-grid">
            {brands.map((brand, index) => (
              <div key={index} className="about-brand-card">
                <div className="about-brand-header">
                  <div className="about-brand-icon">
                    {brand.category === 'Testereler' && <Wrench size={24} />}
                    {brand.category === 'Makineler' && <Settings size={24} />}
                    {brand.category === 'CNC' && <Zap size={24} />}
                  </div>
                  <span className="about-brand-category">{brand.category}</span>
                </div>
                <h3 className="about-brand-name">{brand.name}</h3>
                <p className="about-brand-description">{brand.description}</p>
                <div className="about-brand-features">
                  <span className="about-brand-feature">
                    <CheckCircle size={14} /> Orijinal Ürün
                  </span>
                  <span className="about-brand-feature">
                    <CheckCircle size={14} /> Teknik Destek
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Brand Partnerships */}
          <div className="about-partnerships">
            <h3 className="about-partnerships-title">Resmi Distribütörlüklerimiz</h3>
            <div className="about-partnerships-content">
              <div className="about-partnership-info">
                <p>
                  <strong>Freud</strong> - İtalya'nın lider testere bıçağı üreticisi
                </p>
                <p>
                  <strong>Farabi</strong> - Türkiye'nin önde gelen testere üreticisi
                </p>
                <p>
                  <strong>Mızrak</strong> - Endüstriyel makine üretiminde Türkiye markası
                </p>
                <p>
                  <strong>Homag Group</strong> - Dünyanın önde gelen CNC makine üreticisi
                </p>
              </div>
              <div className="about-partnership-benefits">
                <h4 className="about-benefits-title">Distribütörlük Avantajları</h4>
                <ul className="about-benefits-list">
                  <li>Orijinal ürün garantisi</li>
                  <li>Doğrudan üretici fiyatları</li>
                  <li>Hızlı yedek parça temini</li>
                  <li>Teknik eğitim desteği</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* CTA Section */}
      <section className="about-cta">
        <div className="about-cta-content">
          <h2 className="about-cta-title">Sektörünüz İçin Doğru Makineyi Bulun</h2>
          <p className="about-cta-description">
            40 yıllık tecrübemizle ihtiyacınız olan çözümü sunalım.
            Ücretsiz danışmanlık ve teknik destek için bize ulaşın.
          </p>
          <div className="about-cta-buttons">
            <Link to="/contact" className="about-cta-button about-cta-primary">
              <Phone size={20} />
              <span>İletişime Geçin</span>
            </Link>
            <Link to="/products" className="about-cta-button about-cta-secondary">
              <Package size={20} />
              <span>Ürünlerimizi Görün</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="about-contact-info">
        <div className="about-contact-grid">
          <div className="about-contact-item">
            <div className="about-contact-icon">
              <Phone size={24} />
            </div>
            <div className="about-contact-content">
              <h3 className="about-contact-title">Telefon</h3>
              <p className="about-contact-detail">+90 (500) 123 45 67</p>
              <p className="about-contact-note">7/24 Teknik Destek</p>
            </div>
          </div>
          <div className="about-contact-item">
            <div className="about-contact-icon">
              <Mail size={24} />
            </div>
            <div className="about-contact-content">
              <h3 className="about-contact-title">E-posta</h3>
              <p className="about-contact-detail">info@orhanmakine.com</p>
              <p className="about-contact-note">24 saat içinde yanıt</p>
            </div>
          </div>
          <div className="about-contact-item">
            <div className="about-contact-icon">
              <MapPin size={24} />
            </div>
            <div className="about-contact-content">
              <h3 className="about-contact-title">Adres</h3>
              <p className="about-contact-detail">Merkez, Elazığ</p>
              <p className="about-contact-note">Showroom ve Servis</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;