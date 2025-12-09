// ============================================
// HAKKIMIZDA SAYFASI - ORHAN MAKİNE BİLEME
// Modern, Responsive ve SEO Uyumlu Tasarım
// ============================================
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { 
  Factory, Target, Eye, Award, Users, Clock,
  CheckCircle, Shield, Wrench, Package, Truck,
  Phone, Mail, MapPin, ChevronRight, Star,
  HardHat, Settings, Zap, ShieldCheck, Globe,
  User, Briefcase, Cpu, Image as ImageIcon,
  ChevronLeft, ChevronRight as ChevronRightIcon,
  Drill, Droplets, Thermometer, GitBranch, Compass,
  Scissors, Flame, Hammer
} from 'lucide-react';
import { brandsData, brandCategories } from '../data/brandsData';
import '../styles/AboutPage.css';

// TreePine özel ikonu
const TreePine = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M13 16L12 21M11 16L12 21M12 16V21M9 8L7 13M15 8L17 13M12 3L9 8H15L12 3Z" />
  </svg>
);

// İkon mapping fonksiyonu
const getIconComponent = (iconName, size = 24) => {
  const iconMap = {
    'Wrench': <Wrench size={size} />,
    'Factory': <Factory size={size} />,
    'Drill': <Drill size={size} />,
    'Package': <Package size={size} />,
    'Truck': <Truck size={size} />,
    'Droplets': <Droplets size={size} />,
    'Thermometer': <Thermometer size={size} />,
    'GitBranch': <GitBranch size={size} />,
    'Compass': <Compass size={size} />,
    'Scissors': <Scissors size={size} />,
    'Flame': <Flame size={size} />,
    'Zap': <Zap size={size} />,
    'Hammer': <Hammer size={size} />,
    'TreePine': <TreePine {...{ width: size, height: size }} />
  };
  
  return iconMap[iconName] || <Wrench size={size} />;
};

const AboutPage = () => {
  // ============================================
  // STATE YÖNETİMİ
  // ============================================
  const [activeSection, setActiveSection] = useState("about");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // ============================================
  // MARKALARIMIZ — yönlendirme (#brands)
  // ============================================
  useEffect(() => {
    if (window.location.hash === "#brands") {
      setActiveSection("brands");

      setTimeout(() => {
        const target = document.getElementById("brands");
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 300);
    }
  }, []);

  // ============================================
  // BİNA GÖRSELLERİ
  // ============================================
  const buildingImages = [
    {
      src: '/images/joblocations/bina4.png',
      alt: 'Orhan Makine Bileme - Satış ve Servis Bölümü',
      title: 'Satış ve Servis Bölümü'
    },
    {
      src: '/images/joblocations/bina3.png',
      alt: 'Orhan Makine Bileme - Satış ve Servis Bölümü-2',
      title: 'Satış ve Servis Bölümü-2'
    },
    {
      src: '/images/joblocations/bina1.png',
      alt: 'Orhan Makine- Ofis ve Yönetim-1',
      title: 'Ofis ve Yönetim-1'
    },
    {
      src: '/images/joblocations/bina2.png',
      alt: 'Orhan Makine Bileme - Ofis ve Yönetim-2',
      title: 'Ofis ve Yönetim-2'
    },
    {
      src: '/images/joblocations/bina5.png',
      alt: 'Orhan Makine Bileme - Ürünler',
      title: 'Ürünler'
    },
    {
      src: '/images/joblocations/bina6.png',
      alt: 'Orhan Makine Bileme - Ürünler-2',
      title: 'Ürünler-2'
    },
    {
      src: '/images/joblocations/bina7.png',
      alt: 'Orhan Makine Bileme - Ürünler-3',
      title: 'Ürünler-3'
    },
    {
      src: '/images/joblocations/bina8.png',
      alt: 'Orhan Makine Bileme - Ürünler-4',
      title: 'Ürünler-4'
    },
    {
      src: '/images/joblocations/bina9.png',
      alt: 'Orhan Makine Bileme - Ürünler-5',
      title: 'Ürünler-5'
    },
    {
      src: '/images/joblocations/bina10.png',
      alt: 'Orhan Makine Bileme - Ürünler-6',
      title: 'Ürünler-6'
    }
  ];

  // ============================================
  // GÖRSEL GALERİ FONKSİYONLARI
  // ============================================
  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? buildingImages.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === buildingImages.length - 1 ? 0 : prev + 1
    );
  };

  // ============================================
  // SEO VE META AYARLARI
  // ============================================
  React.useEffect(() => {
    // Sayfa başlığı
    document.title = 'Hakkımızda | Orhan Makine Bileme - 40 Yıllık Tecrübe';
    
    // Meta açıklama
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 
        'Orhan Makine Bileme - 40 yılı aşkın tecrübemizle mobilya ve endüstriyel sektöre kaliteli makine satışı ve teknik destek hizmetleri sunuyoruz.'
      );
    }
    
    // Structured Data (JSON-LD)
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
        },
        "employee": [
          {
            "@type": "Person",
            "name": "Mehmet Özcan Orhan",
            "jobTitle": "Sahip"
          },
          {
            "@type": "Person",
            "name": "Hasan Esen",
            "jobTitle": "Satış Uzmanı"
          },
          {
            "@type": "Person",
            "name": "Halit Mustafa Karagöz",
            "jobTitle": "Yazılım Mühendisi"
          },
          {
            "@type": "Person",
            "name": "Ercan Orhan",
            "jobTitle": "Makine Mühendisxi"
          },
          {
            "@type": "Person",
            "name": "Alparslan Ayyıldız",
            "jobTitle": "Makine Mühendisi"
          }
        ]
      }
    });
    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  // ============================================
  // ÇÖZÜMLER VERİLERİ
  // ============================================
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
      description: 'Uzman teknik destek ve bakım hizmetleri'
    },
    {
      icon: <Globe size={24} />,
      title: 'Danışmanlık',
      description: 'Sektörel danışmanlık ve çözüm önerileri'
    }
  ];

  // ============================================
  // SEKTÖRLER LİSTESİ
  // ============================================
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

  // ============================================
  // EKİP ÜYELERİ
  // ============================================
  const teamMembers = [
    {
      id: 1,
      name: 'Mehmet Özcan Orhan',
      title: 'Sahip & Kurucu',
      role: 'Genel Müdür',
      age: 49,
      experience: '32+ yıl',
      description: '40 yılı aşkın sektör tecrübesi ile firmanın kurucusu ve yöneticisi. Mobilya makinaları konusunda uzman.',
      image: '/images/team/mehmet-ozcan-orhan.png'
    },
    {
      id: 2,
      name: 'Hasan Esen',
      title: 'Satış Uzmanı',
      role: 'Satış Müdürü',
      age: 50,
      experience: '20+ yıl',
      description: 'Satış ve müşteri ilişkileri konusunda uzman. Teknik ürün bilgisi ile müşterilere en uygun çözümleri sunar.',
      image: '/images/team/hasan-esen.png'
    },
    {
      id: 3,
      name: 'Halit Mustafa Karagöz',
      title: 'Yazılım Mühendisi',
      role: 'Teknoloji Direktörü',
      age: 24,
      experience: '3+ yıl',
      description: 'Dijital dönüşüm ve yazılım çözümlerinden sorumlu. E-ticaret ve ERP sistemleri uzmanı.',
      image: '/images/team/halit-mustafa-karagoz.png'
    },
    {
      id: 4,
      name: 'Ercan Orhan',
      title: 'Makine Mühendisi',
      role: 'Teknik Servis Müdürü',
      age: 38,
      experience: '15+ yıl',
      description: 'Makine bakım, onarım ve teknik servis konularında uzman. CNC makinalarında uzmanlaşmıştır.',
      image: '/images/team/ercan-orhan.png'
    },
    {
      id: 5,
      name: 'Alparslan Ayyıldız',
      title: 'Makine Mühendisi',
      role: 'Ürün Uzmanı',
      age: 29,
      experience: '7+ yıl',
      description: 'Ürün geliştirme ve kalite kontrol sorumlusu. Yeni teknolojilerin takibi ve uygulanmasından sorumlu.',
      image: '/images/team/ugur.png'
    }
  ];

  // ============================================
  // RENDER
  // ============================================
  return (
    <div className="about-page">
      {/* ============================================
          HERO SECTION - Ana Banner
          ============================================ */}
      <section className="about-hero">
        <div className="about-hero-content">
          <div className="about-hero-text">
            {/* Breadcrumb Navigasyonu */}
            <div className="about-breadcrumb">
              <Link to="/" className="about-breadcrumb-link">Ana Sayfa</Link>
              <ChevronRight size={16} />
              <span className="about-breadcrumb-current">Hakkımızda</span>
            </div>
            
            {/* Ana Başlık */}
            <h1 className="about-hero-title">
              40 Yılı Aşkın Tecrübe ile Mobilya Sektöründe
            </h1>
            
            {/* Açıklama */}
            <p className="about-hero-description">
              1980'den bu yana mobilya ve endüstriyel sektöre kaliteli makine satışı, 
              teknik destek ve çözüm ortaklığı sunuyoruz.
            </p>
          </div>
          
          {/* Hero Görseli */}
          <div className="about-hero-image-container">
            <img 
              src="/images/joblocations/orhan-makine-bina.png" 
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

      {/* ============================================
          QUICK NAVIGATION - Hızlı Erişim Menüsü
          ============================================ */}
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
            className={`about-nav-button ${activeSection === 'team' ? 'about-nav-active' : ''}`}
            onClick={() => setActiveSection('team')}
            aria-label="Ekibimiz bölümüne git"
          >
            <Users size={20} />
            <span>Ekibimiz</span>
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
            aria-label="Markalarımız bölümüne git"
          >
            <Award size={20} />
            <span>Markalarımız</span>
          </button>
        </div>
      </nav>

      {/* ============================================
          MAIN CONTENT - Ana İçerik
          ============================================ */}
      <main className="about-main-content">
        
        {/* ============================================
            HAKKIMIZDA BÖLÜMÜ
            ============================================ */}
        <section 
          id="about" 
          className={`about-section ${activeSection === 'about' ? 'about-section-active' : ''}`}
          aria-labelledby="about-heading"
        >
          {/* Bölüm Başlığı */}
          <div className="about-section-header">
            <Factory size={32} className="about-section-icon" />
            <h2 id="about-heading" className="about-section-title">Hakkımızda</h2>
            <p className="about-section-subtitle">40 Yıllık Güven ve Tecrübe</p>
          </div>
          
          <div className="about-section-content">
            {/* Hikaye ve İstatistikler */}
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
                
                {/* İstatistikler */}
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
                    <div className="about-stat-number">25+</div>
                    <div className="about-stat-label">Marka</div>
                  </div>
                </div>
              </div>
              
              {/* Bina Görselleri Galerisi */}
              <div className="about-building-gallery">
                <div className="about-gallery-main">
                  <img 
                    src={buildingImages[currentImageIndex].src}
                    alt={buildingImages[currentImageIndex].alt}
                    className="about-gallery-image"
                    loading="lazy"
                    width="600"
                    height="400"
                  />
                  <div className="about-gallery-overlay">
                    <ImageIcon size={20} />
                    <span>{buildingImages[currentImageIndex].title}</span>
                  </div>
                  
                  {/* Galeri Kontrolleri */}
                  <button 
                    className="about-gallery-btn about-gallery-prev"
                    onClick={handlePrevImage}
                    aria-label="Önceki görsel"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button 
                    className="about-gallery-btn about-gallery-next"
                    onClick={handleNextImage}
                    aria-label="Sonraki görsel"
                  >
                    <ChevronRightIcon size={24} />
                  </button>
                </div>
                
                {/* Thumbnail'ler */}
                <div className="about-gallery-thumbnails">
                  {buildingImages.map((img, index) => (
                    <button
                      key={index}
                      className={`about-gallery-thumb ${index === currentImageIndex ? 'active' : ''}`}
                      onClick={() => setCurrentImageIndex(index)}
                      aria-label={`${img.title} görselini göster`}
                    >
                      <img src={img.src} alt={img.alt} />
                    </button>
                  ))}
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

        {/* ============================================
            MİSYON & VİZYON BÖLÜMÜ
            ============================================ */}
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
            {/* Misyon */}
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

            {/* Vizyon */}
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

          {/* Değerlerimiz */}
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

        {/* ============================================
            EKİP BÖLÜMÜ
            ============================================ */}
        <section 
          id="team" 
          className={`about-section ${activeSection === 'team' ? 'about-section-active' : ''}`}
          aria-labelledby="team-heading"
        >
          <div className="about-section-header">
            <Users size={32} className="about-section-icon" />
            <h2 id="team-heading" className="about-section-title">Ekibimiz</h2>
            <p className="about-section-subtitle">Uzman Kadromuzla Yanınızdayız</p>
          </div>

          <div className="about-team-intro">
            <p className="about-team-description">
              40 yıllık tecrübemizin arkasında, her biri kendi alanında uzmanlaşmış 
              deneyimli bir ekip bulunuyor. Müşterilerimize en iyi hizmeti sunmak 
              için sürekli çalışıyoruz.
            </p>
          </div>

          <div className="about-team-grid">
            {teamMembers.map((member) => (
              <div key={member.id} className="about-team-card">
                <div className="about-team-image-container">
                  <div className="about-team-ellipse">
                    <img 
                      src={member.image} 
                      alt={`${member.name} - ${member.title}`}
                      className="about-team-image"
                      loading="lazy"
                      width="200"
                      height="200"
                    />
                  </div>
                  <div className="about-team-experience">
                    <Clock size={16} />
                    <span>{member.experience}</span>
                  </div>
                </div>
                <div className="about-team-info">
                  <h3 className="about-team-name">{member.name}</h3>
                  <div className="about-team-titles">
                    <span className="about-team-title">{member.title}</span>
                    <span className="about-team-role">{member.role}</span>
                  </div>
                  <div className="about-team-details">
                    <div className="about-team-detail">
                      <User size={14} />
                      <span>{member.age} yaş</span>
                    </div>
                    <div className="about-team-detail">
                      <Briefcase size={14} />
                      <span>{member.experience} tecrübe</span>
                    </div>
                  </div>
                  <p className="about-team-description-text">{member.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="about-team-stats">
            <div className="about-team-stat">
              <div className="about-team-stat-number">5</div>
              <div className="about-team-stat-label">Uzman Personel</div>
            </div>
            <div className="about-team-stat">
              <div className="about-team-stat-number">110+</div>
              <div className="about-team-stat-label">Toplam Tecrübe (Yıl)</div>
            </div>
            <div className="about-team-stat">
              <div className="about-team-stat-number">100%</div>
              <div className="about-team-stat-label">Müşteri Memnuniyeti</div>
            </div>
          </div>
        </section>

        {/* ============================================
            ÇÖZÜMLER BÖLÜMÜ
            ============================================ */}
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

          {/* Detaylı Ürün Grupları */}
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

        {/* ============================================
            MARKALAR BÖLÜMÜ
            ============================================ */}
        <section 
          id="brands" 
          className={`about-section ${activeSection === 'brands' ? 'about-section-active' : ''}`}
          aria-labelledby="brands-heading"
        >
          <div className="about-section-header">
            <Award size={32} className="about-section-icon" />
            <h2 id="brands-heading" className="about-section-title">Markalarımız</h2>
            <p className="about-section-subtitle">25+ Kaliteli Markayı Temsil Ediyoruz</p>
          </div>

          <div className="about-brands-intro">
            <p className="about-brands-description">
              Mobilya ve endüstriyel sektörünün önde gelen markalarının resmi distribütörüyüz. 
              Her marka, kendi kategorisinde dünya standartlarında kalite sunmaktadır.
            </p>
          </div>

          {/* Marka Kartları - brandsData'dan çekiliyor */}
          <div className="about-brands-grid">
            {brandsData.map((brand) => (
              <div key={brand.id} className="about-brand-card">
                <div className="about-brand-header">
                  <div className="about-brand-icon">
                    {getIconComponent(brand.icon, 24)}
                  </div>
                  <span className="about-brand-category">{brand.category}</span>
                </div>
                <h3 className="about-brand-name">{brand.name}</h3>
                <p className="about-brand-description">{brand.shortDescription}</p>
                <div className="about-brand-features">
                  <span className="about-brand-feature">
                    <CheckCircle size={14} /> Orijinal Ürün
                  </span>
                  <span className="about-brand-feature">
                    <CheckCircle size={14} /> Teknik Destek
                  </span>
                  <span className="about-brand-feature">
                    <CheckCircle size={14} /> Yedek Parça
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Marka Kategorileri Özeti */}
          <div className="about-brand-categories">
            <h3 className="about-brand-categories-title">Marka Kategorilerimiz</h3>
            <div className="about-brand-categories-grid">
              {brandCategories.map((category) => (
                <div key={category.id} className="about-brand-category-item">
                  {getIconComponent(category.icon, 24)}
                  <h4>{category.name}</h4>
                  <p>{category.brands.join(', ')}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* ============================================
          CTA SECTION - Çağrı-Eylem Bölümü
          ============================================ */}
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
    </div>
  );
};

export default AboutPage;