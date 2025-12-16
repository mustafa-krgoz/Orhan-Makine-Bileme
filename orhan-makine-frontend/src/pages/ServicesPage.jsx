// src/pages/ServicesPage.jsx
import React from "react";
import {
  Wrench,
  Package,
  Hammer,
  ClipboardList
} from "lucide-react";
import "../styles/ServicesPage.css";

const ServicesPage = () => {

  /* ============================================================
     HİZMET VERİLERİ – SEO UYUMLU, CLEAN CODE, GERÇEK İŞ MODELİNLE 
     %100 UYUMLU YENİLEME
  ============================================================ */

  const services = [
    /* ============================================================
       1) Endüstriyel Kesici Takım Bileme Hizmetleri
    ============================================================ */
    {
      id: "bileme",
      icon: <Wrench size={32} />,
      title: "Endüstriyel Kesici Takım Bileme Hizmetleri",
      description:
        "Mobilya ve endüstriyel üretim sektörlerine yönelik hassas bileme çözümleri.",
      details: [
        "Demir Testere Bileme: Demir kesim testere ve bıçaklarını hassas taşlama teknikleriyle biliyor; çapaklanma, yanma ve zorlanma sorunlarını gideriyoruz.",
        "Cam Testere Bileme: Cam kesimine uygun özel açılandırma ile mikron seviyesinde hassasiyet sağlayarak temiz ve risksiz kesim elde ediyoruz.",
        "Alüminyum Testere Bileme: Alüminyum kesiminde oluşan çapak ve yüzey bozukluklarını gidererek hızlı ve pürüzsüz kesim performansı sunuyoruz.",
        "Düz Testere Bileme: Ahşap, metal ve plastik kesiminde kullanılan düz testereleri profesyonel makinelerle hassas şekilde biliyoruz.",
        "Freze Bıçakları Bileme: Profil açıları korunarak CNC kontrollü bileme yapılır, keskinlik ve işleme kalitesi artırılır.",
        "Kalem Uçları Bileme: CNC router kalem uçlarını yüksek devirde ilk günkü keskinliğine kavuşturuyoruz.",
        "2’li, 3’lü, 4’lü Kalem Bıçağı Bileme: Çoklu bıçaklarda yüzey bozukluklarını ve tırtıklanmayı gidererek yüksek performans sağlıyoruz.",
        "CNC Kalem Bıçak Bileme: Orijinal form bozulmadan mikron seviyesinde yüzey yenileme yapılır.",
        "Jilet Bıçağı Bileme: Endüstriyel jilet bıçaklarının keskinliğini geri kazandırır, temiz ve hızlı kesim elde edilir.",
        "Planya Bıçağı Bileme: Pürüzsüz yüzey için doğru ağız açıları korunarak hassas taşlama yapılır.",
        "Buat Açacağı Bileme: Çapaksız ve düzgün delik açımı için özel açılandırma ile bileme yapılır.",
        "Matbaa Bıçağı Bileme: Kağıt yırtılmasını önleyen mikron hassasiyetinde taşlama.",
        "Kırma Bıçağı Bileme: Granül ve geri dönüşüm makineleri için enerji tüketimini azaltan yüksek keskinlik.",
        "Kanal Bıçağı Ayarı: Kanal ölçüsüne uygun profil ayarı ve hassas bileme yapılır.",
        "Diş Tamiri: Kırılmış veya aşınmış testere dişleri eşit açı ve boyda yenilenir.",
        "Kaynak: Kopmuş testerelerin kaynak ve yüzey tesviyeleri yapılır, güvenli kullanım sağlanır."
      ]
    },

    /* ============================================================
       2) Profesyonel Makine Satışı (Kurulum Yok, Doğru Model)
    ============================================================ */
    {
      id: "makine-satis",
      icon: <Hammer size={32} />,
      title: "Profesyonel Makine Satışı",
      description:
        "Mızrak, Freud, Farabi, Konig, Oscar ve diğer profesyonel markaların makine satış hizmetleri.",
      details: [
        "Yatar Daire Satışı: Standart ve çizicili yatar daire modelleri.",
        "Sunta Kesme Makineleri: Hassas kesim kabiliyetine sahip profesyonel makineler.",
        "Kenar Bantlama Makineleri: Mızrak uyumlu endüstriyel bantlama çözümleri.",
        "CNC Makine Satışı: Ahşap ve panel işleme için yüksek performanslı CNC makineleri.",
        "Kapı Kasa Çekme & Ebatlama Makineleri: Kapı üretiminde kullanılan özel amaçlı makineler.",
        "Köşe Yuvarlama Ünitesi: Kenar bantlama sonrası temiz köşe bitirme.",
        "Pres Makineleri: Panel pres ve laminasyon uygulamaları için güçlü modeller.",
        "Toz Emme Sistemleri: Atölye temizliği ve performansı artıran toz emme makineleri.",
        "Transpalet Satışı: Dayanıklı ve ağır yüklerde kullanım için transpalet çeşitleri."
      ]
    },

    /* ============================================================
       3) Elektrikli El Aletleri ve Hırdavat Satışı
    ============================================================ */
    {
      id: "el-aletleri",
      icon: <Package size={32} />,
      title: "Elektrikli El Aletleri ve Hırdavat Satışı",
      description:
        "Makita, Knipex, Euromax, HAIS, CORA ve diğer profesyonel markaların satış noktası.",
      details: [
        "Makita Elektrikli Aletler: Matkap, taşlama, dekupaj, kırıcı-delici ve profesyonel ürünler.",
        "Freud – Farabi – Konig – Oscar Testere Bıçakları: Ahşap, alüminyum ve metal kesimi için seçenekler.",
        "Knipex El Aletleri: Pense, keski, kargaburun ve profesyonel el aletleri.",
        "Matkap ve Freze Uçları: CNC ve manuel makineler için geniş ürün seçeneği.",
        "Vida & Bağlantı Sistemleri: Sunta vidası, alçıpan vidası ve mobilya bağlantı elemanları.",
        "Zımpara Ürünleri: Bant zımpara, disk zımpara ve su zımparaları.",
        "Toz Emme Hortum ve Adaptörleri: Makinelere uyumlu sarf malzemeleri."
      ]
    },

    /* ============================================================
       4) Teknik Danışmanlık & Ürün Bilgilendirme
    ============================================================ */
    {
      id: "danismanlik",
      icon: <ClipboardList size={32} />,
      title: "Teknik Danışmanlık ve Ürün Bilgilendirme",
      description:
        "Makine, testere bıçakları ve elektrikli el aletleri için profesyonel seçim desteği.",
      details: [
        "Makine Seçimi Danışmanlığı: Üretim türü, kapasite ve bütçeye göre doğru makine yönlendirme.",
        "Testere Bıçak Seçimi: Ahşap, MDF, suntalem, alüminyum ve metal için doğru bıçak önerileri.",
        "Elektrikli Alet Karşılaştırma: Makita modellerinin performans değerlendirmeleri.",
        "Arızaya Yönlendirme & Tespit: Sorunlu makine için gerekli yol gösterme.",
        "Atölye Ekipmanı Önerileri: Üretim süreçlerini hızlandıran ekipman tavsiyeleri.",
        "Yedek Parça Uyumluluk Bilgisi: Hangi parçanın hangi modele uyduğu hakkında destek."
      ]
    }
  ];

  /* ============================================================
     ALT BAŞLIKLARI OTO-BOLD YAPAN FONKSİYON
  ============================================================ */
  const renderDetail = (text) => {
    const parts = text.split(":");
    if (parts.length > 1) {
      return `<strong>${parts[0]}:</strong> ${parts.slice(1).join(":")}`;
    }
    return text;
  };

  return (
    <div className="srvc-page">

      {/* ======= SEO BAŞLIK ======= */}
      <header className="srvc-header">
        <h1 className="srvc-main-title">Orhan Makine – Hizmetlerimiz</h1>
        <p className="srvc-main-desc">
          40 yılı aşkın tecrübemizle bileme, makine satışı, elektrikli alet tedariki ve teknik danışmanlık hizmetleri sunuyoruz.
        </p>
      </header>

      {/* ======= HİZMET KARTLARI ======= */}
      <section className="srvc-services-section">
        <div className="srvc-services-list">

          {services.map((service) => (
            <article key={service.id} className="srvc-service-item">

              <div className="srvc-service-header">
                <div className="srvc-service-icon">{service.icon}</div>

                <div>
                  <h2 className="srvc-service-title">{service.title}</h2>
                  <p className="srvc-service-subtitle">
                    {service.description}
                  </p>
                </div>
              </div>

              <div className="srvc-service-details">
                {service.details.map((d, i) => (
                  <p
                    key={i}
                    className="srvc-detail-item"
                    dangerouslySetInnerHTML={{ __html: renderDetail(d) }}
                  />
                ))}
              </div>

            </article>
          ))}

        </div>
      </section>

    </div>
  );
};

export default ServicesPage;