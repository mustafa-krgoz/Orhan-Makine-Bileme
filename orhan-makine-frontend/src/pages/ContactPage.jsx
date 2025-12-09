// src/pages/ContactPage.jsx
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock,
  MessageCircle
} from "lucide-react";
import '../styles/ContactPage.css';

/**
 * İletişim Sayfası Komponenti
 * - WhatsApp entegrasyonu ile direkt iletişim
 * - Güncellenmiş iletişim bilgileri
 * - Google Maps entegrasyonu
 * - Responsive ve SEO uyumlu
 */
const ContactPage = () => {
  
  // İletişim bilgileri array'i - Kolay güncelleme için merkezi yapı
  const contactInfo = [
    {
      icon: <Phone className="contact-info-icon" />,
      title: "Telefon",
      content: "0539 515 99 25",
      subtitle: "Hemen arayın",
      link: "tel:+905395159925",
      ariaLabel: "Telefon ile arayın"
    },
    {
      icon: <Mail className="contact-info-icon" />,
      title: "E-posta",
      content: "info@orhanmakine.com.tr",
      subtitle: "E-posta ile iletişim",
      link: "mailto:info@orhanmakine.com.tr",
      ariaLabel: "E-posta gönderin"
    },
    {
      icon: <MapPin className="contact-info-icon" />,
      title: "Orhan Makine Adres",
      content: "Sanayi Mahallesi Sanayi Sitesi 24. Sokak No:7",
      subtitle: "Elazığ/Merkez",
      link: "https://maps.google.com/?q=Orhan+Makina+Bileme+Elazığ",
      ariaLabel: "Adresimizi haritada görüntüleyin"
    },
    {
      icon: <Clock className="contact-info-icon" />,
      title: "Çalışma Saatleri",
      content: "Hafta içi: 08:00 – 18:00",
      subtitle: "Cumartesi: 08:00 – 12:30 • Pazar: Kapalı",
      ariaLabel: "Çalışma saatlerimiz"
    }
  ];

  /**
   * WhatsApp iletişim fonksiyonu
   * Kullanıcıyı WhatsApp'a yönlendirir
   */
  const handleWhatsAppClick = () => {
    window.open('https://wa.me/905395159925', '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="contact-page">
      
      {/* Sayfa Başlığı - SEO için semantic header */}
      <header className="contact-header">
        <div className="contact-container">
          <h1 className="contact-header-title">İletişim</h1>
          <p className="contact-header-subtitle">
            Her türlü soru, talep ve siparişiniz için bize ulaşabilirsiniz.
          </p>
        </div>
      </header>

      {/* Ana İçerik Bölümü */}
      <main className="contact-container">
        <div className="contact-main-content">

          {/* İletişim Bilgileri Bölümü */}
          <section className="contact-info-section" aria-labelledby="contact-info-heading">
            <h2 id="contact-info-heading" className="contact-section-title">
              İletişime Geçin
            </h2>
            <p className="contact-info-description">
              Ustalarımız ve teknik ekibimiz, ihtiyaçlarınıza en uygun çözümü sağlamak için hazırdır.
            </p>

            {/* WhatsApp Butonu - Ana CTA (Call To Action) */}
            <div className="contact-whatsapp-wrapper">
              <button 
                onClick={handleWhatsAppClick}
                className="contact-whatsapp-button"
                aria-label="WhatsApp ile iletişime geçin"
              >
                <MessageCircle className="contact-whatsapp-icon" />
                <span className="contact-whatsapp-text">
                  <strong>WhatsApp ile İletişime Geçin</strong>
                  <small>Hızlı ve kolay iletişim</small>
                </span>
              </button>
            </div>

            {/* İletişim Kartları Grid */}
            <div className="contact-info-cards" role="list">
              {contactInfo.map((info, index) => (
                <article 
                  key={index} 
                  className="contact-info-card"
                  role="listitem"
                >
                  {/* Eğer link varsa tıklanabilir yap */}
                  {info.link ? (
                    <a 
                      href={info.link}
                      className="contact-info-card-link"
                      aria-label={info.ariaLabel}
                      target={info.link.startsWith('http') ? '_blank' : '_self'}
                      rel={info.link.startsWith('http') ? 'noopener noreferrer' : ''}
                    >
                      <div className="contact-info-icon-wrapper">
                        {info.icon}
                      </div>
                      <div className="contact-info-content">
                        <h3 className="contact-info-title">{info.title}</h3>
                        <p className="contact-info-main">{info.content}</p>
                        <p className="contact-info-sub">{info.subtitle}</p>
                      </div>
                    </a>
                  ) : (
                    <>
                      <div className="contact-info-icon-wrapper">
                        {info.icon}
                      </div>
                      <div className="contact-info-content">
                        <h3 className="contact-info-title">{info.title}</h3>
                        <p className="contact-info-main">{info.content}</p>
                        <p className="contact-info-sub">{info.subtitle}</p>
                      </div>
                    </>
                  )}
                </article>
              ))}
            </div>

            {/* Google Maps Bölümü */}
            <section className="contact-map-section" aria-labelledby="map-heading">
              <h3 id="map-heading" className="contact-map-title">Konumumuz</h3>

              {/* Google Maps Embed - Responsive iframe - GÜNCELLENDİ: Yeni koordinatlar */}
              <iframe  
                className="contact-map-embed"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3073.635855464116!2d39.2458014!3d38.6716275!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4076bf785a5b754d%3A0x9be1f206af585c44!2sOrhan%20Makina%20Bileme!5e0!3m2!1str!2str!4v1701000000000"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Orhan Makina Bileme Harita Konumu"
                aria-label="Google Maps üzerinde işletme konumumuz"
              ></iframe>

              {/* Haritada Aç Butonu - GÜNCELLENDİ: Doğru Orhan Makine Bileme konumu */}
              <a 
                href="https://www.google.com/maps/place/Orhan+Makina+Bileme/@38.6716275,39.2458014,17z/data=!3m1!4b1!4m6!3m5!1s0x4076bf785a5b754d:0x9be1f206af585c44!8m2!3d38.6716233!4d39.2483763!16s%2Fg%2F113jydqyt?entry=ttu"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-map-link"
                aria-label="Orhan Makine Bileme'i Google Haritalar'da aç"
              >
                <MapPin size={18} />
                Haritada Aç
              </a>
            </section>
          </section>

        </div>
      </main>
    </div>
  );
};

export default ContactPage;