// src/pages/ContactPage.jsx
import { useState } from "react";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send,
  CheckCircle
} from "lucide-react";
import '../styles/ContactPage.css';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: <Phone className="info-icon" />,
      title: "Telefon",
      content: "+90 539 515 99 25",
      subtitle: "7/24 WhatsApp Hattı"
    },
    {
      icon: <Mail className="info-icon" />,
      title: "E-posta",
      content: "info@orhanmakine.com",
      subtitle: "Tüm e-posta taleplerine aynı gün dönüş"
    },
    {
      icon: <MapPin className="info-icon" />,
      title: "Adres",
      content: "Elazığ Organize Sanayi Bölgesi",
      subtitle: "Orhan Makina Bileme – Elazığ"
    },
    {
      icon: <Clock className="info-icon" />,
      title: "Çalışma Saatleri",
      content: "Hafta içi: 08:30 – 18:00",
      subtitle: "Cumartesi: 08:30 – 12:30 • Pazar: Kapalı"
    }
  ];

  return (
    <div className="contact-page">
      
      {/* Header */}
      <div className="contact-header">
        <div className="container">
          <h1>İletişim</h1>
          <p>Her türlü soru, talep ve siparişiniz için bize ulaşabilirsiniz.</p>
        </div>
      </div>

      
      <div className="container">
        <div className="contact-layout">

          {/* Contact Info */}
          <div className="contact-info">
            <h2>İletişime Geçin</h2>
            <p className="info-description">
              Ustalarımız ve teknik ekibimiz, ihtiyaçlarınıza en uygun çözümü sağlamak için hazırdır.
            </p>

            <div className="info-cards">
              {contactInfo.map((info, index) => (
                <div key={index} className="info-card">
                  <div className="info-icon">
                    {info.icon}
                  </div>
                  <div className="info-content">
                    <h3>{info.title}</h3>
                    <p className="info-main">{info.content}</p>
                    <p className="info-sub">{info.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Map Section */}
            <div className="map-section">
              <h3>Konumumuz</h3>

              <iframe  
                className="map-embed"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3074.082630843512!2d39.2259835!3d38.6768337!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4076c0bd8c52ff43%3A0x8fbacfea3884d13a!2sOrhan%20Makina%20Bileme!5e0!3m2!1str!2str!4v1701000000000"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>

              <a 
                href="https://maps.google.com/?q=Orhan+Makina+Bileme+Elazığ+Organize+Sanayi+Bölgesi"
                target="_blank"
                rel="noopener noreferrer"
                className="map-link"
              >
                Haritada Aç
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form-section">
            <h2>Mesaj Gönderin</h2>

            {isSubmitted ? (
              <div className="success-message">
                <CheckCircle className="success-icon" />
                <h3>Mesajınız alındı!</h3>
                <p>En kısa sürede sizlere geri dönüş sağlayacağız.</p>
                <button 
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({ name: "", email: "", phone: "", message: "" });
                  }}
                  className="new-message-btn"
                >
                  Yeni Mesaj Gönder
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                
                <div className="form-group">
                  <label>Ad Soyad *</label>
                  <input 
                    type="text"
                    name="name"
                    value={formData.name}
                    required
                    onChange={handleInputChange}
                    placeholder="Adınız ve soyadınız"
                  />
                </div>

                <div className="form-group">
                  <label>E-posta *</label>
                  <input 
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="ornek@mail.com"
                  />
                </div>

                <div className="form-group">
                  <label>Telefon</label>
                  <input 
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="5__ ___ __ __"
                  />
                </div>

                <div className="form-group">
                  <label>Mesaj *</label>
                  <textarea
                    name="message"
                    required
                    rows="5"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Mesajınızı buraya yazın..."
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className={`submit-btn ${isSubmitting ? 'loading' : ''}`}
                >
                  {isSubmitting ? <div className="spinner"></div> : <><Send /> Gönder</>}
                </button>

              </form>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;