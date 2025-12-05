// src/pages/ServicesPage.jsx
import React from 'react';
import { 
  Wrench, Cpu, Drill, Package,
  Settings
} from "lucide-react";
import '../styles/ServicesPage.css';

const ServicesPage = () => {

  // HİZMETLER LİSTESİ (VURGULU METİNLERLE AÇIK)
  // NOT: İkinci "bileme" nesnesi kaldırılmış ve alt başlıklar otomatik bold yapılacak şekilde düzenlenmiştir.
  const services = [
    {
      id: 'bileme',
      icon: <Wrench size={32} />,
      title: 'Endüstriyel Kesici Takım Bileme Hizmetleri',
      description: '**Mobilya** ve **endüstriyel üretime** yönelik hassas bileme çözümleri',
      details: [
        "CNC Router Bıçak Bileme: Mobilya sektöründe kullanılan CNC router bıçakları, zamanla keskinliğini kaybederek hem üretim hızını düşürür hem de malzeme yüzeyinde yanma, çapaklanma ve deformasyon oluşturur. Firmamız, CNC router uçlarını **özel bileme makinelerinde orijinal açılarına göre** yeniden biliyor, bıçağın kesme hassasiyetini ve **ömrünü maksimum seviyeye** çıkarıyor. **MDF, sunta, masif, alüminyum** ve kompozit malzemelerde **yüksek performans** sağlayan bileme işlemi ile üretim kalitesini artırıyoruz.",
        "Şerit Testere Bileme: Ahşap ve metal kesiminde kullanılan şerit testereler, düzenli bileme yapılmadığında diş yapısını kaybeder, kesim sırasında sapma yapmaya başlar ve makineye ekstra yük bindirir. Şerit testerenizi hem diş formuna hem de kesim türüne göre özel açılandırma ile biliyoruz. İnce ve kalın dişli seçeneklerde profesyonel bileme uygulayarak bıçağın düzgün kesim yapmasını sağlıyoruz.",
        "Freze Bıçakları: Kapı, mobilya ve özel profil üretiminde kullanılan freze bıçakları zamanla köreldiğinde profil bozulur ve işçilik hataları meydana gelir. Freze bıçaklarını orijinal profil açılarına sadık kalarak biliyor, kenar keskinliğini ilk günkü haline getiriyoruz. Pah kırma, oluk açma, profil çıkarma ve özel şekilli freze bıçakları için CNC kontrollü bileme yapmaktayız.",
        "Daire Testere Bileme: 200 mm’den 500 mm’ye kadar olan tüm daire testere çeşitlerini (karbür uçlu, HSS çelik, elmas kaplı) özel taşlama makinelerinde hassas olarak biliyoruz. Kesim sırasında yanma, çapaklanma, ses artışı veya zorlanma gibi sorunları gideriyor, bıçağın hem ömrünü hem de performansını artırıyoruz.",
        "Kalem Uçları Bileme: CNC router kalem uçları, özellikle yoğun üretim yapan firmalarda hızla körelir. Yüksek devirde bileme yapılarak ilk günkü keskinliğine kavuşmasını sağlıyoruz. Farklı çaplarda ve farklı boylarda tüm kalem uçlarını profesyonel ekipmanlarla biliyoruz.",
        "Özel Profil Bıçakları: Özel üretim, kişiye özel veya firma bazlı tasarlanmış profil bıçaklarının da bileyerek yeniden kullanılabilir hale getiriyoruz. Profil bozulmadan, orijinal form korunarak özel açılandırma ile bileme yapılır."
      ]
    },
    {
      id: 'cnc',
      icon: <Cpu size={32} />,
      title: 'Yüksek Hassasiyetli CNC Makine Satışı ve Kurulum',
      description: '**Endüstriyel CNC router** makineleri satış, kurulum ve **otomasyon desteği**',
      details: [
        "CNC Router Makineleri: Ahşap, MDF, sunta, kompozit ve alüminyum işleme için **yüksek hassasiyetli** CNC router modellerinin satışını yapıyoruz. Hem küçük işletmeler hem de **büyük üretim tesisleri** için uygun alternatifler sunulmaktadır.",
        "Kesim ve İşleme Merkezleri: **Otomatik yükleme ve boşaltma** özelliğine sahip, **yüksek hızda panel kesim** ve frezeleme yapılabilen makine modelleri kurulumu yapılmaktadır.",
        "Otomasyon Sistemleri: Üretim hatlarına özel otomatik konveyör, vakumlu yükleme, robot kol entegrasyonu gibi **ileri seviye otomasyon çözümleri** sunuyoruz.",
        "CAD/CAM Eğitim ve Kurulum: CNC makine kullanımına yeni başlayan işletmelere **CAD/CAM yazılım kurulumu**, takım yolu oluşturma eğitimi ve **üretim optimizasyonu desteği** veriyoruz.",
        "Teknik Servis ve Kalibrasyon: Makinenizin **uzun ömürlü** çalışabilmesi için **düzenli bakım, hassasiyet ayarı**, spindle değişimi, lineer ray kontrolü gibi hizmetler sunuyoruz.",
        "Yedek Parça Temini: Step motor, servo motor, spindle motor, sürücüler, kontrol kartları ve tüm CNC makine bileşenlerini **orijinal olarak** sağlıyoruz."
      ]
    },
    {
      id: 'testere',
      icon: <Settings size={32} />,
      title: 'Profesyonel Testere Makineleri Satış ve Destek',
      description: 'Panel, şerit ve daire testere makinelerinde **anahtar teslim** profesyonel çözümler',
      details: [
        "Panel Kesim Testereleri: Sunta, MDF, laminat ve kapak üretimi için kullanılan **yüksek hassasiyetli panel kesim** makinelerinin satışını yapıyoruz. **Dijital ve lazer destekli** ölçüm sistemleri sayesinde **kesim hatası minimuma** iner.",
        "Daire Testereler: **250 mm – 500 mm** çap aralığında **endüstriyel güçte** daire testere makineleri sunuyoruz. Alüminyum ve ahşap kesim için **ayrı motor ve soğutma seçenekleri** bulunmaktadır.",
        "Şerit Testereler: Hem metal hem de ahşap kesim için **güçlü şerit testere** makineleri satıyoruz. Kesim sırasında **sapma yapmayan, titreşim önleyici** yapıya sahip seçenekler mevcuttur.",
        "Alüminyum Profil Testereleri: **Soğutma sıvısı destekli** alüminyum kesim makineleri, **profesyonel işçilik** isteyen firmalar için uygundur. **Yüksek hızda kesim performansı** sağlar.",
        "CNC Kontrollü Testere Makineleri: **Programlanabilir kesim** makineleri ile **seri üretim** yapan firmalar için **verimlilik** sağlayan CNC destekli sistemler sunuyoruz.",
        "Yedek Parça ve Bıçak Çeşitleri: Testere makineleri için tüm motor, bıçak, taş, fren, kayış ve **elektronik yedek parçaları** tedarik ediyoruz."
      ]
    },
    {
      id: 'hirdavat',
      icon: <Package size={32} />,
      title: 'Geniş Kapsamlı Hırdavat ve Sarf Malzemeleri',
      description: 'Mobilya ve inşaat sektörlerinin tüm **sarf ve bağlantı** ihtiyaçları **tek adreste**',
      details: [
        "Matkap Uçları: Ahşap, metal, beton ve mermer için **profesyonel matkap uçları**. HSS, karbür uçlu, elmas kaplı ve **SDS sistem** matkap uçlarının satışını yapıyoruz.",
        "Vida Çeşitleri: Mobilya montajında kullanılan **sunta vidası, krom vida, alçıpan vidası**, trapez vida gibi tüm çeşitler **stoklarımızdadır**.",
        "Dübeller: Plastik dübel, çelik dübel, **ağır yük dübeli** ve sıva altı montaj dübelleri mevcuttur.",
        "Menteşe & Ray Sistemleri: Dolap, çekmece ve mutfak sistemleri için tüm bağlantı elemanları ve ray sistemleri satıyoruz. **Tam açılım ray, teleskopik ray, frenli ray** çeşitleri mevcuttur.",
        "Zımpara Ürünleri: **Makine uyumlu bant zımparalar**, el zımparaları ve su zımparaları. Tüm kum değerlerinde **geniş stok** bulunmaktadır.",
        "Kesici Takımlar: **Freze bıçakları, router uçları, karbür kesiciler**, HSS takımlar ve **profesyonel kesici diskler** çeşitli ölçülerde satılmaktadır."
      ]
    },
    {
      id: 'servis',
      icon: <Wrench size={32} />,
      title: 'Yetkili Teknik Servis, Kurulum ve Bakım',
      description: 'Makine **kurulum**, arıza tespiti, **kalibrasyon** ve **periyodik bakım** hizmetleri',
      details: [
        "Makine Kurulumu: Satın aldığınız CNC, testere veya elektrikli el aletlerinin kurulumunu **uzman ekibimiz** gerçekleştirir. Elektrik bağlantıları, **kalibrasyon** ve çalışma testleri yapılır.",
        "Periyodik Bakım: Makinelerin daha **uzun ömürlü ve verimli** çalışması için yağlama, temizleme, **hassasiyet kontrolü**, rulman ve kayış değişimi gibi **profesyonel bakım** hizmeti sunuyoruz.",
        "Arıza Onarımı: **Elektriksel arızalar, mekanik arızalar**, motor yanması, kart arızaları ve sensör sorunlarını **hızlıca tespit edip tamir** ediyoruz.",
        "Yedek Parça Temini: Tüm makine marka ve modelleri için **orijinal yedek parçaların** teminini sağlıyoruz.",
        "Operatör Eğitimi: Makineyi yeni kullanmaya başlayan personeliniz için **kullanım, güvenlik ve bakım eğitimleri** veriyoruz.",
        "Garanti ve Satış Sonrası Destek: Tüm makineler için **garanti süreçlerinin takibi** yapılır ve garanti kapsamındaki arızalar **ücretsiz** olarak giderilir."
      ]
    }
  ];
  
  // Metinleri işleyen ve alt başlıkları bold yapan yardımcı fonksiyon
  const renderDetailContent = (detail) => {
    // 1. Ana vurguları (**) bold yap (önceki istekten kalan)
    let processedDetail = detail.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // 2. İlk cümleyi (alt başlığı) bold yap. (İlk iki nokta üst üste işaretine kadar olan kısım)
    const parts = processedDetail.split(':');
    if (parts.length > 1) {
      // Başlık kısmını <strong> ile sar
      processedDetail = `<strong>${parts[0].trim()}:</strong> ${parts.slice(1).join(':').trim()}`;
    }
    
    return processedDetail;
  };


  return (
    <div className="srvc-page">

      {/* SEO için ana başlık ve açıklama bölümü */}
      <div className="srvc-header">
        <h1 className="srvc-main-title">Orhan Makine Bileme & Satış Hizmetleri</h1>
        <p className="srvc-main-desc">
          40 yıllık tecrübemizle mobilya ve endüstriyel üretime yönelik en güvenilir çözümlerimiz.
        </p>
      </div>

      {/* HİZMETLER LİSTESİ ANA KONTEYNERİ */}
      <div className="srvc-services-section">
        <div className="srvc-services-list">
          {/* Sadece benzersiz ID'ye sahip hizmetleri render et (Tekrar edenleri engeller) */}
          {[...new Map(services.map(item => [item.id, item])).values()].map((service) => (
            <div key={service.id} className="srvc-service-item">

              {/* Kart Üst Başlık ve İkon */}
              <div className="srvc-service-header">
                <div className="srvc-service-icon">{service.icon}</div>
                <div>
                  <h2 className="srvc-service-title">{service.title}</h2>
                  <p className="srvc-service-subtitle" 
                     dangerouslySetInnerHTML={{ __html: service.description.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}
                  />
                </div>
              </div>

              {/* Maddeli Detaylar Bölümü */}
              <div className="srvc-service-details">
                {service.details.map((detail, idx) => (
                  <div key={idx} className="srvc-detail-item">
                    {/* Detay içeriğini, alt başlıklar bold yapılacak şekilde render et */}
                    <div 
                      className="srvc-detail-content"
                      dangerouslySetInnerHTML={{ __html: renderDetailContent(detail) }}
                    />
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default ServicesPage;