// ============================================
// HAKKIMIZDA SAYFASI - ORHAN MAKİNE BİLEME
// Performance Optimized: Eager Loading, SEO, PWA
// Lighthouse Score: 95+ Target
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
import OptimizedImage from "../components/OptimizedImage";
import '../styles/AboutPage.css';

// ============================================
// ÖZEL İKONLAR
// ============================================
const TreePine = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M13 16L12 21M11 16L12 21M12 16V21M9 8L7 13M15 8L17 13M12 3L9 8H15L12 3Z" />
  </svg>
);

// ============================================
// İKON MAPPING FONKSİYONU
// ============================================
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
  // HASH NAVIGATION - Markalar bölümü için
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
  // BİNA GÖRSELLERİ - Performance Optimized
  // İlk görsel: eager loading (LCP için)
  // Diğer görseller: lazy loading
  // ============================================
  const buildingImages = [
    {
      src: '/images/joblocations/bina4.webp',
      alt: 'Orhan Makine Bileme Satış ve Servis Bölümü görseli',
      title: 'Satış ve Servis Bölümü',
      loading: 'eager', // İlk görsel eager
      fetchpriority: 'high' // LCP için yüksek öncelik
    },
    {
      src: '/images/joblocations/bina3.webp',
      alt: 'Orhan Makine Bileme satış bölümü ikinci görsel',
      title: 'Satış Bölümü',
      loading: 'lazy'
    },
    {
      src: '/images/joblocations/bina1.webp',
      alt: 'Orhan Makine ofis ve yönetim birimi',
      title: 'Ofis ve Yönetim',
      loading: 'lazy'
    },
    {
      src: '/images/joblocations/bina2.webp',
      alt: 'Orhan Makine yönetim ofisi ikinci görsel',
      title: 'Yönetim Ofisi',
      loading: 'lazy'
    },
    {
      src: '/images/joblocations/bina5.webp',
      alt: 'Orhan Makine ürün stok alanı',
      title: 'Ürün Stok Alanı',
      loading: 'lazy'
    },
    {
      src: '/images/joblocations/bina6.webp',
      alt: 'Orhan Makine makine sergi alanı',
      title: 'Makine Sergi Alanı',
      loading: 'lazy'
    },
    {
      src: '/images/joblocations/bina7.webp',
      alt: 'Orhan Makine teknik ekipman stok alanı',
      title: 'Teknik Ekipman Stoku',
      loading: 'lazy'
    },
    {
      src: '/images/joblocations/bina8.webp',
      alt: 'Orhan Makine ürün depoları',
      title: 'Ürün Depoları',
      loading: 'lazy'
    },
    {
      src: '/images/joblocations/bina9.webp',
      alt: 'Orhan Makine yedek parça stok alanı',
      title: 'Yedek Parça Stoku',
      loading: 'lazy'
    },
    {
      src: '/images/joblocations/bina10.webp',
      alt: 'Orhan Makine genel görünüm',
      title: 'Firma Genel Görünüm',
      loading: 'lazy'
    }
  ];

  // ============================================
  // GALERİ NAVİGASYON
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
  // Performance: useEffect cleanup ile memory leak önleme
  // ============================================
  useEffect(() => {
    // Sayfa başlığı
    document.title = 'Orhan Makine Hakkımızda | 40 Yıllık Makine Bileme Tecrübesi';
    
    // Meta açıklama
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 
        'Orhan Makine - 40 yılı aşkın tecrübemizle mobilya ve endüstriyel sektöre kaliteli makine satışı, bileme hizmeti ve teknik destek. Elazığ merkezli makine distribütörü.'
      );
    }
    
    // Viewport meta
    let viewportMeta = document.querySelector('meta[name="viewport"]');
    if (!viewportMeta) {
      viewportMeta = document.createElement('meta');
      viewportMeta.name = 'viewport';
      viewportMeta.content = 'width=device-width, initial-scale=1, maximum-scale=5';
      document.head.appendChild(viewportMeta);
    }
    
    // Canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      canonicalLink.href = window.location.href;
      document.head.appendChild(canonicalLink);
    }
    
    // Manifest link
    let manifestLink = document.querySelector('link[rel="manifest"]');
    if (!manifestLink) {
      manifestLink = document.createElement('link');
      manifestLink.rel = 'manifest';
      manifestLink.href = '/manifest.json';
      document.head.appendChild(manifestLink);
    }
    
    // JSON-LD Structured Data
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
        "logo": `${window.location.origin}/logo.webp`,
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

    // PERFORMANCE: Critical görselleri preload
    const criticalImages = [
      '/images/joblocations/orhan-makine-bina.webp', // Hero image
      buildingImages[0].src // İlk galeri görseli
    ];
    
    const preloadLinks = criticalImages.map(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      link.fetchpriority = 'high';
      document.head.appendChild(link);
      return link;
    });

    // Cleanup function
    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
      preloadLinks.forEach(link => {
        if (document.head.contains(link)) {
          document.head.removeChild(link);
        }
      });
    };
  }, [buildingImages]);

  // ============================================
  // EKİP ÜYELERİ - Performance: Eager loading için ilk 3
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
      image: '/images/team/mehmet-ozcan-orhan.webp',
      alt: 'Mehmet Özcan Orhan - Orhan Makine Kurucusu',
      loading: 'eager' // İlk görünen
    },
    {
      id: 2,
      name: 'Hasan Esen',
      title: 'Satış Uzmanı',
      role: 'Satış Müdürü',
      age: 50,
      experience: '20+ yıl',
      description: 'Satış ve müşteri ilişkileri konusunda uzman. Teknik ürün bilgisi ile müşterilere en uygun çözümleri sunar.',
      image: '/images/team/hasan-esen.webp',
      alt: 'Hasan Esen - Orhan Makine Satış Müdürü',
      loading: 'eager' // İlk görünen
    },
    {
      id: 3,
      name: 'Halit Mustafa Karagöz',
      title: 'Yazılım Mühendisi',
      role: 'Teknoloji Direktörü',
      age: 24,
      experience: '3+ yıl',
      description: 'Dijital dönüşüm ve yazılım çözümlerinden sorumlu. E-ticaret ve ERP sistemleri uzmanı.',
      image: '/images/team/halit-mustafa-karagoz.webp',
      alt: 'Halit Mustafa Karagöz - Orhan Makine Teknoloji Direktörü',
      loading: 'eager' // İlk görünen
    },
    {
      id: 4,
      name: 'Ercan Orhan',
      title: 'Makine Mühendisi',
      role: 'Teknik Servis Müdürü',
      age: 38,
      experience: '15+ yıl',
      description: 'Makine bakım, onarım ve teknik servis konularında uzman. CNC makinalarında uzmanlaşmıştır.',
      image: '/images/team/ercan-orhan.webp',
      alt: 'Ercan Orhan - Orhan Makine Teknik Servis Müdürü',
      loading: 'lazy'
    },
    {
      id: 5,
      name: 'Alparslan Ayyıldız',
      title: 'Makine Mühendisi',
      role: 'Ürün Uzmanı',
      age: 29,
      experience: '7+ yıl',
      description: 'Ürün geliştirme ve kalite kontrol sorumlusu. Yeni teknolojilerin takibi ve uygulanmasından sorumlu.',
      image: '/images/team/ugur.webp',
      alt: 'Alparslan Ayyıldız - Orhan Makine Ürün Uzmanı',
      loading: 'lazy'
    }
  ];

  // ============================================
  // NAVİGASYON BUTONLARI
  // ============================================
  const navButtons = [
    { id: 'about', label: 'Hakkımızda', icon: <Factory size={20} /> },
    { id: 'mission', label: 'Misyon & Vizyon', icon: <Target size={20} /> },
    { id: 'team', label: 'Ekibimiz', icon: <Users size={20} /> },
    { id: 'brands', label: 'Markalarımız', icon: <Award size={20} /> },
  ];

  // ============================================
  // RENDER
  // ============================================
  return (
    <div className="about-page" itemScope itemType="https://schema.org/AboutPage">
      {/* ============================================
          HERO SECTION
          ============================================ */}
      <section className="about-hero" role="banner" aria-label="Orhan Makine tanıtım bannerı">
        <div className="about-hero-content">
          <div className="about-hero-text">
            <nav className="about-breadcrumb" aria-label="breadcrumb">
              <Link to="/" className="about-breadcrumb-link" aria-label="Ana sayfaya git">
                Ana Sayfa
              </Link>
              <ChevronRight size={16} aria-hidden="true" />
              <span className="about-breadcrumb-current" aria-current="page">
                Hakkımızda
              </span>
            </nav>
            
            <h1 className="about-hero-title" itemProp="headline">
              40 Yılı Aşkın Tecrübe ile Mobilya Sektöründe
            </h1>
            
            <p className="about-hero-description" itemProp="description">
              1980'den bu yana mobilya ve endüstriyel sektöre kaliteli makine satışı, 
              teknik destek, makine bileme hizmeti ve çözüm ortaklığı sunuyoruz.
              Elazığ merkezli, Türkiye'nin güvenilir makine tedarikçisi.
            </p>
          </div>
          
          {/* HERO GÖRSELI - EAGER LOADING FOR LCP */}
          <div className="about-hero-image-container">
            <OptimizedImage
              src="/images/joblocations/orhan-makine-bina.webp"
              alt="Orhan Makine Bileme işyeri binası - Elazığ merkez"
              className="about-hero-image"
              width="800"
              height="600"
              loading="eager"
              fetchpriority="high"
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
          QUICK NAVIGATION
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
          MAIN CONTENT
          ============================================ */}
      <main className="about-main-content" id="main-content">
        
        {/* ============================================
            HAKKIMIZDA BÖLÜMÜ
            ============================================ */}
        <section 
          id="about" 
          className={`about-section ${activeSection === 'about' ? 'about-section-active' : ''}`}
          aria-labelledby="about-heading"
          itemScope
          itemType="https://schema.org/Organization"
        >
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
            <article className="about-story">
              <div className="about-story-text">
                <h3 className="about-story-title">
                  Orhan Makine'nin Hikayesi
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
                </div>
              </div>
              
              {/* BİNA GALERİSİ - PERFORMANCE OPTIMIZED */}
              <div className="about-building-gallery" role="region" aria-label="Firma görsel galerisi">
                <div className="about-gallery-main">
                  <figure>
                    <OptimizedImage
                      src={buildingImages[currentImageIndex].src}
                      alt={buildingImages[currentImageIndex].alt}
                      className="about-gallery-image"
                      width="600"
                      height="400"
                      loading={buildingImages[currentImageIndex].loading}
                      fetchpriority={buildingImages[currentImageIndex].fetchpriority}
                    />
                    <figcaption className="about-gallery-overlay" aria-hidden="true">
                      <ImageIcon size={20} />
                      <span>{buildingImages[currentImageIndex].title}</span>
                    </figcaption>
                  </figure>
                  
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
                
                {/* THUMBNAILS - LAZY LOADING */}
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
                      <OptimizedImage
                        src={img.src}
                        alt={img.alt}
                        width="80"
                        height="60"
                        loading="lazy"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </article>
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
            EKİP BÖLÜMÜ - PERFORMANCE OPTIMIZED
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
                    <OptimizedImage
                      src={member.image}
                      alt={member.alt}
                      className="about-team-image"
                      width="200"
                      height="200"
                      loading={member.loading}
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
          CTA SECTION
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