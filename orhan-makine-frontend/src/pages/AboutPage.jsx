// ============================================
// HAKKIMIZDA SAYFASI - ORHAN MAKİNE BİLEME
// Güncellenmiş Sürüm: Çözümler ve Sektörler kaldırıldı
// SEO, PWA, Responsive ve Performans Optimizasyonlu
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

// TreePine özel ikonu - marka kategorileri için
const TreePine = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M13 16L12 21M11 16L12 21M12 16V21M9 8L7 13M15 8L17 13M12 3L9 8H15L12 3Z" />
  </svg>
);

// İkon mapping fonksiyonu - markalar için uygun ikonlar
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
  // MARKALARIMIZ — yönlendirme (#brands) için hash kontrolü
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
  // BİNA GÖRSELLERİ - Firma görselleri galerisi
  // SEO: Her görsel için açıklayıcı alt text ve title
  // ============================================
  const buildingImages = [
    {
      src: '/images/joblocations/bina4.png',
      alt: 'Orhan Makine Bileme Satış ve Servis Bölümü görseli',
      title: 'Satış ve Servis Bölümü'
    },
    {
      src: '/images/joblocations/bina3.png',
      alt: 'Orhan Makine Bileme satış bölümü ikinci görsel',
      title: 'Satış Bölümü'
    },
    {
      src: '/images/joblocations/bina1.png',
      alt: 'Orhan Makine ofis ve yönetim birimi',
      title: 'Ofis ve Yönetim'
    },
    {
      src: '/images/joblocations/bina2.png',
      alt: 'Orhan Makine yönetim ofisi ikinci görsel',
      title: 'Yönetim Ofisi'
    },
    {
      src: '/images/joblocations/bina5.png',
      alt: 'Orhan Makine ürün stok alanı',
      title: 'Ürün Stok Alanı'
    },
    {
      src: '/images/joblocations/bina6.png',
      alt: 'Orhan Makine makine sergi alanı',
      title: 'Makine Sergi Alanı'
    },
    {
      src: '/images/joblocations/bina7.png',
      alt: 'Orhan Makine teknik ekipman stok alanı',
      title: 'Teknik Ekipman Stoku'
    },
    {
      src: '/images/joblocations/bina8.png',
      alt: 'Orhan Makine ürün depoları',
      title: 'Ürün Depoları'
    },
    {
      src: '/images/joblocations/bina9.png',
      alt: 'Orhan Makine yedek parça stok alanı',
      title: 'Yedek Parça Stoku'
    },
    {
      src: '/images/joblocations/bina10.png',
      alt: 'Orhan Makine genel görünüm',
      title: 'Firma Genel Görünüm'
    }
  ];

  // ============================================
  // GÖRSEL GALERİ FONKSİYONLARI
  // Accessibility: Klavye navigasyonu için button elementleri
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
  // Performance: useEffect ile dinamik title ve meta tag güncellemesi
  // SEO: JSON-LD structured data eklenmesi
  // ============================================
  React.useEffect(() => {
    // Sayfa başlığı - SEO için optimize edilmiş
    document.title = 'Orhan Makine Hakkımızda | 40 Yıllık Makine Bileme Tecrübesi';
    
    // Meta açıklama - SEO için optimize edilmiş
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 
        'Orhan Makine Bileme - 40 yılı aşkın tecrübemizle mobilya ve endüstriyel sektöre kaliteli makine satışı, bileme hizmeti ve teknik destek. Elazığ merkezli makine distribütörü.'
      );
    }
    
    // PWA: Viewport meta tag kontrolü
    let viewportMeta = document.querySelector('meta[name="viewport"]');
    if (!viewportMeta) {
      viewportMeta = document.createElement('meta');
      viewportMeta.name = 'viewport';
      viewportMeta.content = 'width=device-width, initial-scale=1, maximum-scale=5';
      document.head.appendChild(viewportMeta);
    }
    
    // SEO: Canonical link kontrolü
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      canonicalLink.href = window.location.href;
      document.head.appendChild(canonicalLink);
    }
    
    // PWA: Manifest link kontrolü
    let manifestLink = document.querySelector('link[rel="manifest"]');
    if (!manifestLink) {
      manifestLink = document.createElement('link');
      manifestLink.rel = 'manifest';
      manifestLink.href = '/manifest.json';
      document.head.appendChild(manifestLink);
    }
    
    // SEO: Structured Data (JSON-LD) - Schema.org markup
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "name": "Orhan Makine Hakkımızda",
      "description": "40 yıllık tecrübe ile mobilya ve endüstriyel sektöre makine satışı, bileme hizmeti ve teknik destek",
      "mainEntity": {
        "@type": "Organization",
        "name": "Orhan Makine Bileme",
        "alternateName": "Orhan Makine",
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
          "addressCountry": "TR",
          "streetAddress": "Merkez, Elazığ"
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+90-424-123-4567",
          "contactType": "Customer Service",
          "areaServed": "TR",
          "availableLanguage": ["Turkish"]
        },
        "sameAs": [
          "https://www.facebook.com/orhanmakine",
          "https://www.instagram.com/orhanmakine",
          "https://twitter.com/orhanmakine"
        ]
      }
    });
    document.head.appendChild(script);

    // Performance: Preload önemli görseller
    const preloadImages = [
      '/images/joblocations/orhan-makine-bina.png',
      buildingImages[0].src
    ];
    
    preloadImages.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
    });

    return () => {
      // Cleanup: Component unmount olduğunda script'i temizle
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  // ============================================
  // EKİP ÜYELERİ - Personel bilgileri
  // SEO: Her personel için açıklayıcı alt text
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
      image: '/images/team/mehmet-ozcan-orhan.png',
      alt: 'Mehmet Özcan Orhan - Orhan Makine Kurucusu'
    },
    {
      id: 2,
      name: 'Hasan Esen',
      title: 'Satış Uzmanı',
      role: 'Satış Müdürü',
      age: 50,
      experience: '20+ yıl',
      description: 'Satış ve müşteri ilişkileri konusunda uzman. Teknik ürün bilgisi ile müşterilere en uygun çözümleri sunar.',
      image: '/images/team/hasan-esen.png',
      alt: 'Hasan Esen - Orhan Makine Satış Müdürü'
    },
    {
      id: 3,
      name: 'Halit Mustafa Karagöz',
      title: 'Yazılım Mühendisi',
      role: 'Teknoloji Direktörü',
      age: 24,
      experience: '3+ yıl',
      description: 'Dijital dönüşüm ve yazılım çözümlerinden sorumlu. E-ticaret ve ERP sistemleri uzmanı.',
      image: '/images/team/halit-mustafa-karagoz.png',
      alt: 'Halit Mustafa Karagöz - Orhan Makine Teknoloji Direktörü'
    },
    {
      id: 4,
      name: 'Ercan Orhan',
      title: 'Makine Mühendisi',
      role: 'Teknik Servis Müdürü',
      age: 38,
      experience: '15+ yıl',
      description: 'Makine bakım, onarım ve teknik servis konularında uzman. CNC makinalarında uzmanlaşmıştır.',
      image: '/images/team/ercan-orhan.png',
      alt: 'Ercan Orhan - Orhan Makine Teknik Servis Müdürü'
    },
    {
      id: 5,
      name: 'Alparslan Ayyıldız',
      title: 'Makine Mühendisi',
      role: 'Ürün Uzmanı',
      age: 29,
      experience: '7+ yıl',
      description: 'Ürün geliştirme ve kalite kontrol sorumlusu. Yeni teknolojilerin takibi ve uygulanmasından sorumlu.',
      image: '/images/team/ugur.png',
      alt: 'Alparslan Ayyıldız - Orhan Makine Ürün Uzmanı'
    }
  ];

  // ============================================
  // NAVIGASYON BUTONLARI - Hızlı erişim menüsü
  // Accessibility: aria-label eklenmiş, klavye navigasyonu uyumlu
  // ============================================
  const navButtons = [
    { id: 'about', label: 'Hakkımızda', icon: <Factory size={20} /> },
    { id: 'mission', label: 'Misyon & Vizyon', icon: <Target size={20} /> },
    { id: 'team', label: 'Ekibimiz', icon: <Users size={20} /> },
    { id: 'brands', label: 'Markalarımız', icon: <Award size={20} /> },
  ];

  // ============================================
  // RENDER FONKSİYONU
  // Performance: React.memo kullanılabilir component'ler
  // ============================================
  return (
    <div className="about-page" itemScope itemType="https://schema.org/AboutPage">
      {/* ============================================
          HERO SECTION - Ana Banner
          SEO: H1 başlık, açıklayıcı alt text'ler
          Performance: Eager loading for LCP image
          ============================================ */}
      <section className="about-hero" role="banner" aria-label="Orhan Makine tanıtım bannerı">
        <div className="about-hero-content">
          <div className="about-hero-text">
            {/* Breadcrumb Navigasyonu - SEO için önemli */}
            <nav className="about-breadcrumb" aria-label="breadcrumb">
              <Link to="/" className="about-breadcrumb-link" aria-label="Ana sayfaya git">
                Ana Sayfa
              </Link>
              <ChevronRight size={16} aria-hidden="true" />
              <span className="about-breadcrumb-current" aria-current="page">
                Hakkımızda
              </span>
            </nav>
            
            {/* Ana Başlık - H1 tag SEO için kritik */}
            <h1 className="about-hero-title" itemProp="headline">
              40 Yılı Aşkın Tecrübe ile Mobilya Sektöründe
            </h1>
            
            {/* Açıklama - Ana sayfa açıklaması */}
            <p className="about-hero-description" itemProp="description">
              1980'den bu yana mobilya ve endüstriyel sektöre kaliteli makine satışı, 
              teknik destek, makine bileme hizmeti ve çözüm ortaklığı sunuyoruz.
              Elazığ merkezli, Türkiye'nin güvenilir makine tedarikçisi.
            </p>
          </div>
          
          {/* Hero Görseli - LCP için eager loading */}
          <div className="about-hero-image-container">
            <img 
              src="/images/joblocations/orhan-makine-bina.png" 
              alt="Orhan Makine Bileme işyeri binası - Elazığ merkez"
              className="about-hero-image"
              loading="eager"
              width="800"
              height="600"
              itemProp="image"
            />
            <div className="about-hero-badge" aria-label="1980'den beri hizmet veriyoruz">
              <Clock size={20} aria-hidden="true" />
              <span>1980'den Beri</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          QUICK NAVIGATION - Hızlı Erişim Menüsü
          Accessibility: ARIA labels, keyboard navigation
          ============================================ */}
      <nav className="about-quick-nav" aria-label="Sayfa içi navigasyon menüsü">
        <div className="about-quick-nav-container">
          {navButtons.map((button) => (
            <button 
              key={button.id}
              className={`about-nav-button ${activeSection === button.id ? 'about-nav-active' : ''}`}
              onClick={() => setActiveSection(button.id)}
              aria-label={`${button.label} bölümüne git`}
              aria-current={activeSection === button.id ? 'page' : undefined}
            >
              {button.icon}
              <span>{button.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* ============================================
          MAIN CONTENT - Ana İçerik
          Semantik HTML: main tag, section'lar
          ============================================ */}
      <main className="about-main-content" id="main-content">
        
        {/* ============================================
            HAKKIMIZDA BÖLÜMÜ
            SEO: H2 başlık, structured data uyumlu
            ============================================ */}
        <section 
          id="about" 
          className={`about-section ${activeSection === 'about' ? 'about-section-active' : ''}`}
          aria-labelledby="about-heading"
          itemScope
          itemType="https://schema.org/Organization"
        >
          {/* Bölüm Başlığı */}
          <header className="about-section-header">
            <Factory size={32} className="about-section-icon" aria-hidden="true" />
            <h2 id="about-heading" className="about-section-title" itemProp="name">
              Hakkımızda
            </h2>
            <p className="about-section-subtitle">
              40 Yıllık Güven ve Tecrübe
            </p>
          </header>
          
          <div className="about-section-content">
            {/* Hikaye ve İstatistikler */}
            <article className="about-story">
              <div className="about-story-text">
                <h3 className="about-story-title">
                  Orhan Makine Bileme'nin Hikayesi
                </h3>
                <p className="about-story-paragraph" itemProp="description">
                  1980 yılında Elazığ'da küçük bir atölye olarak başlayan yolculuğumuz, 
                  bugün mobilya ve endüstriyel sektörün önde gelen makine tedarikçilerinden 
                  biri olmamızı sağladı. Kuruluş amacımız, sektörün ihtiyaç duyduğu 
                  kaliteli makine ve ekipmanları uygun fiyatlarla sunmaktı.
                </p>
                <p className="about-story-paragraph">
                  Yıllar içinde Freud, Farabi, Makita, Mızrak gibi dünyaca ünlü markaların 
                  Doğu Anadolu Bölgesi distribütörlüğünü üstlendik. Uzmanlaştığımız makine 
                  bileme hizmeti ile yüzlerce işletmenin kesim kalitesini artırdık.
                </p>
                
                {/* İstatistikler - Görsel veri sunumu */}
                <div className="about-stats" role="region" aria-label="Firma istatistikleri">
                  <div className="about-stat">
                    <div className="about-stat-number" aria-label="40 yıldan fazla tecrübe">
                      40+
                    </div>
                    <div className="about-stat-label">
                      Yıllık Tecrübe
                    </div>
                  </div>
                  <div className="about-stat">
                    <div className="about-stat-number" aria-label="5000'den fazla mutlu müşteri">
                      5000+
                    </div>
                    <div className="about-stat-label">
                      Mutlu Müşteri
                    </div>
                  </div>
                  <div className="about-stat">
                    <div className="about-stat-number" aria-label="25'ten fazla marka">
                      25+
                    </div>
                    <div className="about-stat-label">
                      Marka
                    </div>
                  </div>
                  <div className="about-stat">
                    <div className="about-stat-number" aria-label="7/24 teknik destek">
                      7/24
                    </div>
                    <div className="about-stat-label">
                      Teknik Destek
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Bina Görselleri Galerisi */}
              <div className="about-building-gallery" role="region" aria-label="Firma görsel galerisi">
                <div className="about-gallery-main">
                  <figure>
                    <img 
                      src={buildingImages[currentImageIndex].src}
                      alt={buildingImages[currentImageIndex].alt}
                      className="about-gallery-image"
                      loading="lazy"
                      width="600"
                      height="400"
                    />
                    <figcaption className="about-gallery-overlay" aria-hidden="true">
                      <ImageIcon size={20} />
                      <span>{buildingImages[currentImageIndex].title}</span>
                    </figcaption>
                  </figure>
                  
                  {/* Galeri Kontrolleri - Accessibility uyumlu */}
                  <button 
                    className="about-gallery-btn about-gallery-prev"
                    onClick={handlePrevImage}
                    aria-label="Önceki görsel"
                  >
                    <ChevronLeft size={24} aria-hidden="true" />
                  </button>
                  <button 
                    className="about-gallery-btn about-gallery-next"
                    onClick={handleNextImage}
                    aria-label="Sonraki görsel"
                  >
                    <ChevronRightIcon size={24} aria-hidden="true" />
                  </button>
                </div>
                
                {/* Thumbnail'ler - Keyboard navigasyonu için button */}
                <div className="about-gallery-thumbnails" role="tablist" aria-label="Galeri thumbnail seçimi">
                  {buildingImages.map((img, index) => (
                    <button
                      key={index}
                      className={`about-gallery-thumb ${index === currentImageIndex ? 'active' : ''}`}
                      onClick={() => setCurrentImageIndex(index)}
                      aria-label={`${img.title} görselini göster`}
                      role="tab"
                      aria-selected={index === currentImageIndex}
                      aria-controls="gallery-image"
                    >
                      <img 
                        src={img.src} 
                        alt={img.alt} 
                        loading="lazy"
                        width="80"
                        height="60"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </article>

            {/* NOT: Hizmet Verdiğimiz Sektörler bölümü kaldırıldı */}
          </div>
        </section>

        {/* ============================================
            MİSYON & VİZYON BÖLÜMÜ
            SEO: H2 başlık, anlamlı içerik
            ============================================ */}
        <section 
          id="mission" 
          className={`about-section ${activeSection === 'mission' ? 'about-section-active' : ''}`}
          aria-labelledby="mission-heading"
        >
          <header className="about-section-header">
            <Target size={32} className="about-section-icon" aria-hidden="true" />
            <h2 id="mission-heading" className="about-section-title">
              Misyon & Vizyon
            </h2>
            <p className="about-section-subtitle">
              Geleceğe Yön Veriyoruz
            </p>
          </header>

          <div className="about-mission-vision">
            {/* Misyon */}
            <article className="about-mission">
              <div className="about-mission-icon" aria-hidden="true">
                <Target size={48} />
              </div>
              <h3 className="about-mission-title">
                Misyonumuz
              </h3>
              <p className="about-mission-description">
                Orhan Makine olarak, 40 yılı aşkın deneyimimizle mobilya ve endüstriyel 
                üretim sektörüne güvenilir, kaliteli ve sürdürülebilir çözümler sunmayı 
                misyon edindik. Müşterilerimizin üretim süreçlerini güçlendiren profesyonel 
                bileme hizmetleri, CNC makineler ve endüstriyel ekipmanlar ile sektörde 
                tam kapsamlı bir çözüm ortağı olmayı hedefliyoruz.
              </p>
              <ul className="about-mission-list" aria-label="Misyon maddeleri">
                <li>
                  <strong>Amacımız</strong>
                </li>
                <li>
                  <CheckCircle size={16} aria-hidden="true" />
                  Kesim kalitesini artıran hassas bileme işlemleri sunmak
                </li>
                <li>
                  <CheckCircle size={16} aria-hidden="true" />
                  Müşterilerimize uzun ömürlü, yüksek verimli makineler sağlamak
                </li>
                <li>
                  <Star size={16} aria-hidden="true" />
                  Kaliteli ürün temini
                </li>
                <li>
                  <Star size={16} aria-hidden="true" />
                  Hızlı ve güvenilir servis
                </li>
                <li>
                  <Star size={16} aria-hidden="true" />
                  Sürekli gelişim
                </li>
              </ul>
            </article>

            {/* Vizyon */}
            <article className="about-vision">
              <div className="about-vision-icon" aria-hidden="true">
                <Eye size={48} />
              </div>
              <h3 className="about-vision-title">
                Vizyonumuz
              </h3>
              <p className="about-vision-description">
                Mobilya ve endüstriyel üretim makineleri sektöründe, Türkiye'nin 
                en güvenilir ve en yenilikçi markalarından biri olmak. Teknolojiye 
                ve gelişime yatırım yaparak, hem müşteri memnuniyetinde hem de 
                ürün-hizmet çeşitliliğinde sektörün standartlarını yükseltmeyi hedefliyoruz.
              </p>
              <ul className="about-vision-list" aria-label="Vizyon maddeleri">
                <li>
                  <strong>Vizyonumuz</strong>
                </li>
                <li>
                  <CheckCircle size={16} aria-hidden="true" />
                  Mızrak, Makita, Freud gibi güçlü markalarla ürün portföyümüzü genişletmek
                </li>
                <li>
                  <CheckCircle size={16} aria-hidden="true" />
                  CNC makineler, toz emme sistemleri gibi profesyonel ekipmanlarda yenilikçi çözümler sunmak
                </li>
                <li>
                  <CheckCircle size={16} aria-hidden="true" />
                  Dijitalleşen ticarette modern web altyapısı ve e-ticaret gücüyle müşterilere ulaşımı kolaylaştırmak
                </li>
                <li>
                  <CheckCircle size={16} aria-hidden="true" />
                  Sektörde kalite, güven ve uzmanlık dendiğinde ilk akla gelen firma olmak
                </li>
              </ul>
            </article>
          </div>

          {/* Değerlerimiz */}
          <div className="about-values" role="region" aria-label="Firma değerleri">
            <h3 className="about-values-title">
              Değerlerimiz
            </h3>
            <div className="about-values-grid">
              <div className="about-value-card">
                <div className="about-value-icon" aria-hidden="true">
                  <Shield size={24} />
                </div>
                <h4 className="about-value-title">
                  Güvenilirlik
                </h4>
                <p className="about-value-description">
                  40 yıllık tecrübemizle müşterilerimize güven veriyor, 
                  sözlerimizin arkasında duruyoruz. Her işlemde şeffaflık ilkesiyle hareket ediyoruz.
                </p>
              </div>
              <div className="about-value-card">
                <div className="about-value-icon" aria-hidden="true">
                  <Users size={24} />
                </div>
                <h4 className="about-value-title">
                  Müşteri Odaklılık
                </h4>
                <p className="about-value-description">
                  Müşteri memnuniyetini her şeyin üzerinde tutuyor, 
                  özel çözümler üretiyoruz. Her müşterimizin ihtiyacını anlayarak çözüm sunuyoruz.
                </p>
              </div>
              <div className="about-value-card">
                <div className="about-value-icon" aria-hidden="true">
                  <Award size={24} />
                </div>
                <h4 className="about-value-title">
                  Kalite
                </h4>
                <p className="about-value-description">
                  Dünyanın en kaliteli markalarını temsil ediyor, 
                  ürünlerimizin kalitesinden ödün vermiyoruz. Tüm ürünlerimiz orijinal ve garantilidir.
                </p>
              </div>
              <div className="about-value-card">
                <div className="about-value-icon" aria-hidden="true">
                  <Truck size={24} />
                </div>
                <h4 className="about-value-title">
                  Hızlı Hizmet
                </h4>
                <p className="about-value-description">
                  Satış sonrası destek ve teknik serviste hızlı çözümler sunuyor, 
                  üretiminizin durmamasını sağlıyoruz. 7/24 teknik destek hattımızla yanınızdayız.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================
            EKİP BÖLÜMÜ
            SEO: Personel bilgileri, alt text'ler
            ============================================ */}
        <section 
          id="team" 
          className={`about-section ${activeSection === 'team' ? 'about-section-active' : ''}`}
          aria-labelledby="team-heading"
        >
          <header className="about-section-header">
            <Users size={32} className="about-section-icon" aria-hidden="true" />
            <h2 id="team-heading" className="about-section-title">
              Ekibimiz
            </h2>
            <p className="about-section-subtitle">
              Uzman Kadromuzla Yanınızdayız
            </p>
          </header>

          <div className="about-team-intro">
            <p className="about-team-description">
              40 yıllık tecrübemizin arkasında, her biri kendi alanında uzmanlaşmış 
              deneyimli bir ekip bulunuyor. Müşterilerimize en iyi hizmeti sunmak 
              için sürekli eğitim alıyor ve sektördeki gelişmeleri yakından takip ediyoruz.
            </p>
          </div>

          <div className="about-team-grid">
            {teamMembers.map((member) => (
              <article 
                key={member.id} 
                className="about-team-card"
                itemScope
                itemType="https://schema.org/Person"
              >
                <div className="about-team-image-container">
                  <div className="about-team-ellipse">
                    <img 
                      src={member.image} 
                      alt={member.alt}
                      className="about-team-image"
                      loading="lazy"
                      width="200"
                      height="200"
                      itemProp="image"
                    />
                  </div>
                  <div className="about-team-experience" aria-label={`${member.experience} tecrübe`}>
                    <Clock size={16} aria-hidden="true" />
                    <span>{member.experience}</span>
                  </div>
                </div>
                <div className="about-team-info">
                  <h3 className="about-team-name" itemProp="name">
                    {member.name}
                  </h3>
                  <div className="about-team-titles">
                    <span className="about-team-title" itemProp="jobTitle">
                      {member.title}
                    </span>
                    <span className="about-team-role">
                      {member.role}
                    </span>
                  </div>
                  <div className="about-team-details">
                    <div className="about-team-detail" aria-label={`${member.age} yaşında`}>
                      <User size={14} aria-hidden="true" />
                      <span>{member.age} yaş</span>
                    </div>
                    <div className="about-team-detail" aria-label={`${member.experience} tecrübe`}>
                      <Briefcase size={14} aria-hidden="true" />
                      <span>{member.experience} tecrübe</span>
                    </div>
                  </div>
                  <p className="about-team-description-text" itemProp="description">
                    {member.description}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div className="about-team-stats" role="region" aria-label="Ekip istatistikleri">
            <div className="about-team-stat">
              <div className="about-team-stat-number" aria-label="5 uzman personel">
                5
              </div>
              <div className="about-team-stat-label">
                Uzman Personel
              </div>
            </div>
            <div className="about-team-stat">
              <div className="about-team-stat-number" aria-label="110 yıldan fazla toplam tecrübe">
                110+
              </div>
              <div className="about-team-stat-label">
                Toplam Tecrübe (Yıl)
              </div>
            </div>
            <div className="about-team-stat">
              <div className="about-team-stat-number" aria-label="Yüzde yüz müşteri memnuniyeti">
                100%
              </div>
              <div className="about-team-stat-label">
                Müşteri Memnuniyeti
              </div>
            </div>
          </div>
        </section>

        {/* ============================================
            MARKALAR BÖLÜMÜ
            SEO: Marka bilgileri, alt text'ler
            NOT: Çözümlerimiz bölümü kaldırıldı
            ============================================ */}
        <section 
          id="brands" 
          className={`about-section ${activeSection === 'brands' ? 'about-section-active' : ''}`}
          aria-labelledby="brands-heading"
        >
          <header className="about-section-header">
            <Award size={32} className="about-section-icon" aria-hidden="true" />
            <h2 id="brands-heading" className="about-section-title">
              Markalarımız
            </h2>
            <p className="about-section-subtitle">
              25+ Kaliteli Markayı Temsil Ediyoruz
            </p>
          </header>

          <div className="about-brands-intro">
            <p className="about-brands-description">
              Mobilya ve endüstriyel sektörünün önde gelen markalarının resmi distribütörüyüz. 
              Her marka, kendi kategorisinde dünya standartlarında kalite ve performans sunmaktadır.
              Orjinal ürün garantisi ve teknik desteğimiz ile markalarımızı güvenle sunuyoruz.
            </p>
          </div>

          {/* Marka Kartları - brandsData'dan çekiliyor */}
          <div className="about-brands-grid">
            {brandsData.map((brand) => (
              <article key={brand.id} className="about-brand-card">
                <header className="about-brand-header">
                  <div className="about-brand-icon" aria-hidden="true">
                    {getIconComponent(brand.icon, 24)}
                  </div>
                  <span className="about-brand-category">
                    {brand.category}
                  </span>
                </header>
                <h3 className="about-brand-name">
                  {brand.name}
                </h3>
                <p className="about-brand-description">
                  {brand.shortDescription}
                </p>
                <div className="about-brand-features">
                  <span className="about-brand-feature">
                    <CheckCircle size={14} aria-hidden="true" /> Orijinal Ürün
                  </span>
                  <span className="about-brand-feature">
                    <CheckCircle size={14} aria-hidden="true" /> Teknik Destek
                  </span>
                  <span className="about-brand-feature">
                    <CheckCircle size={14} aria-hidden="true" /> Yedek Parça
                  </span>
                </div>
              </article>
            ))}
          </div>

          {/* Marka Kategorileri Özeti */}
          <div className="about-brand-categories" role="region" aria-label="Marka kategorileri">
            <h3 className="about-brand-categories-title">
              Marka Kategorilerimiz
            </h3>
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
          SEO: Call-to-action butonları
          Accessibility: Açıklayıcı button text'leri
          ============================================ */}
      <section className="about-cta" role="region" aria-label="İletişim çağrısı">
        <div className="about-cta-content">
          <h2 className="about-cta-title">
            Sektörünüz İçin Doğru Makine ve Bileme Hizmetini Bulun
          </h2>
          <p className="about-cta-description">
            40 yıllık tecrübemizle ihtiyacınız olan makine, yedek parça veya 
            bileme hizmetini sunalım. Ücretsiz danışmanlık ve teknik destek için 
            bize ulaşın. Elazığ merkezli olarak Türkiye geneli hizmet veriyoruz.
          </p>
          <div className="about-cta-buttons">
            <Link to="/contact" className="about-cta-button about-cta-primary">
              <Phone size={20} aria-hidden="true" />
              <span>İletişime Geçin</span>
            </Link>
            <Link to="/products" className="about-cta-button about-cta-secondary">
              <Package size={20} aria-hidden="true" />
              <span>Ürünlerimizi Görün</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;