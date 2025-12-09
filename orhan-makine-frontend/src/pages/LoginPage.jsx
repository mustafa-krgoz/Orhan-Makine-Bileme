// ============================================
// ORHAN MAKİNE - LOGİN SAYFASI
// Güncellenmiş: Arka plan rengi #5ba3f7
// Responsive, SEO & PWA uyumlu
// ============================================

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Lock, Mail, Phone, User, Eye, EyeOff, 
  ArrowRight, Shield, Factory, Key, LogIn,
  Smartphone, MessageSquare, CheckCircle
} from 'lucide-react';
import '../styles/LoginPage.css';

const LoginPage = () => {
  const navigate = useNavigate();
  
  // State'ler
  const [activeTab, setActiveTab] = useState('email'); // 'email', 'phone', 'register'
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const [countdown, setCountdown] = useState(0);

  // Form State'leri
  const [emailForm, setEmailForm] = useState({
    email: '',
    password: ''
  });

  const [phoneForm, setPhoneForm] = useState({
    phone: ''
  });

  const [registerForm, setRegisterForm] = useState({
    name: '',
    surname: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // SEO için sayfa başlığı
  React.useEffect(() => {
    document.title = 'Giriş Yap | Orhan Makine Bileme - Elazığ';
    
    // Meta açıklama
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 
        'Orhan Makine giriş sayfası. E-posta, şifre veya telefon numarası ile güvenli giriş yapın. Yeni müşteri kaydı oluşturun.'
      );
    }
    
    // Canonical URL
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.href = window.location.href;
    }
    
    // PWA için viewport
    const viewportMeta = document.createElement('meta');
    viewportMeta.name = 'viewport';
    viewportMeta.content = 'width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover';
    document.head.appendChild(viewportMeta);
    
    return () => {
      // Cleanup
      if (document.head.contains(viewportMeta)) {
        document.head.removeChild(viewportMeta);
      }
    };
  }, []);

  // Doğrulama kodu input'larını yönetme
  const handleVerificationCodeChange = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newCode = [...verificationCode];
      newCode[index] = value;
      setVerificationCode(newCode);

      // Otomatik olarak bir sonraki input'a geç
      if (value && index < 5) {
        const nextInput = document.getElementById(`code-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  // Geri sayım başlatma
  const startCountdown = () => {
    setCountdown(60);
    const interval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // E-posta ile giriş
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simüle edilmiş API çağrısı
    setTimeout(() => {
      setIsLoading(false);
      navigate('/');
    }, 1500);
  };

  // Telefon doğrulama kodu gönderme
  const handleSendVerificationCode = async () => {
    const phoneRegex = /^(\+?90|0)?\s*(\(\d{3}\)[\s-]*\d{3}[\s-]*\d{2}[\s-]*\d{2}|\d{3}[\s-]*\d{3}[\s-]*\d{2}[\s-]*\d{2}|\d{10})$/;
    
    if (!phoneForm.phone || !phoneRegex.test(phoneForm.phone.replace(/\s/g, ''))) {
      alert('Lütfen geçerli bir telefon numarası giriniz.');
      return;
    }

    setIsLoading(true);
    
    // Simüle edilmiş SMS gönderme
    setTimeout(() => {
      setVerificationSent(true);
      setIsLoading(false);
      startCountdown();
    }, 1000);
  };

  // Telefon ile giriş
  const handlePhoneLogin = async (e) => {
    e.preventDefault();
    
    const code = verificationCode.join('');
    if (code.length !== 6) {
      alert('Lütfen 6 haneli doğrulama kodunu giriniz.');
      return;
    }

    setIsLoading(true);
    
    // Simüle edilmiş doğrulama
    setTimeout(() => {
      setIsLoading(false);
      navigate('/');
    }, 1500);
  };

  // Kayıt işlemi
  const handleRegister = async (e) => {
    e.preventDefault();
    
    // Form doğrulama
    if (registerForm.password !== registerForm.confirmPassword) {
      alert('Şifreler eşleşmiyor!');
      return;
    }

    if (registerForm.password.length < 6) {
      alert('Şifre en az 6 karakter olmalıdır.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(registerForm.email)) {
      alert('Lütfen geçerli bir e-posta adresi giriniz.');
      return;
    }

    setIsLoading(true);
    
    // Simüle edilmiş kayıt işlemi
    setTimeout(() => {
      setIsLoading(false);
      alert('Kaydınız başarıyla oluşturuldu. Giriş yapabilirsiniz.');
      setActiveTab('email');
      setRegisterForm({
        name: '',
        surname: '',
        phone: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
    }, 2000);
  };

  // Form değişikliklerini yönetme
  const handleEmailChange = (e) => {
    setEmailForm({
      ...emailForm,
      [e.target.name]: e.target.value
    });
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    setPhoneForm({
      ...phoneForm,
      [e.target.name]: value
    });
  };

  const handleRegisterChange = (e) => {
    setRegisterForm({
      ...registerForm,
      [e.target.name]: e.target.value
    });
  };

  // Input'larda Enter tuşuna basıldığında
  const handleKeyPress = (e, type) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      switch(type) {
        case 'email':
          handleEmailLogin(e);
          break;
        case 'phone':
          if (!verificationSent) {
            handleSendVerificationCode();
          } else {
            handlePhoneLogin(e);
          }
          break;
        case 'register':
          handleRegister(e);
          break;
      }
    }
  };

  return (
    <div className="login-page">
      {/* Login Container */}
      <div className="login-container">
        
        {/* Sol Panel - Marka ve Tanıtım */}
        <div className="login-left-panel">
          <div className="login-brand-section">
            <div className="login-brand-logo">
              <img 
                src="/images/logo.png"
                alt="Orhan Makine Logo" 
                className="login-brand-image"
                width="120"
                height="120"
                loading="eager"
              />
              <span className="login-brand-name">Orhan Makine</span>
            </div>
            <h1 className="login-brand-title">Profesyonel Çözüm Ortaklığı</h1>
            <p className="login-brand-description">
              40 yılı aşkın tecrübemizle mobilya ve endüstriyel sektöre 
              kaliteli hizmet sunmaya devam ediyoruz.
            </p>
          </div>

          <div className="login-features-list">
            <div className="login-feature-item">
              <CheckCircle size={20} />
              <span>Güvenli Giriş Sistemi</span>
            </div>
            <div className="login-feature-item">
              <CheckCircle size={20} />
              <span>Orijinal Ürün Garantisi</span>
            </div>
            <div className="login-feature-item">
              <CheckCircle size={20} />
              <span>Hızlı Sipariş Takibi</span>
            </div>
            <div className="login-feature-item">
              <CheckCircle size={20} />
              <span>Uzman Teknik Kadro</span>
            </div>
          </div>

          <div className="login-contact-info">
            <h3>İletişim</h3>
            <p>Merkez, Elazığ</p>
            <p>info@orhanmakine.com</p>
            <p>+90 (500) 123 45 67</p>
          </div>
        </div>

        {/* Sağ Panel - Login Formları */}
        <div className="login-right-panel">
          
          {/* Header */}
          <div className="login-header">
            <h1 className="login-title">Hesabınıza Giriş Yapın</h1>
            <p className="login-subtitle">Farklı giriş yöntemlerinden birini seçin</p>
          </div>

          {/* Tab'lar */}
          <nav className="login-tabs" aria-label="Giriş yöntemleri">
            <button 
              className={`login-tab ${activeTab === 'email' ? 'login-tab-active' : ''}`}
              onClick={() => setActiveTab('email')}
              aria-label="E-posta ile giriş"
              aria-current={activeTab === 'email' ? 'page' : undefined}
            >
              <Mail size={20} />
              <span>E-posta ile Giriş</span>
            </button>
            <button 
              className={`login-tab ${activeTab === 'phone' ? 'login-tab-active' : ''}`}
              onClick={() => setActiveTab('phone')}
              aria-label="Telefon ile giriş"
              aria-current={activeTab === 'phone' ? 'page' : undefined}
            >
              <Phone size={20} />
              <span>Telefon ile Giriş</span>
            </button>
            <button 
              className={`login-tab ${activeTab === 'register' ? 'login-tab-active' : ''}`}
              onClick={() => setActiveTab('register')}
              aria-label="Yeni kayıt oluştur"
              aria-current={activeTab === 'register' ? 'page' : undefined}
            >
              <User size={20} />
              <span>Yeni Kayıt</span>
            </button>
          </nav>

          {/* Tab İçerikleri */}
          <main className="login-content">
            
            {/* E-posta ile Giriş */}
            {activeTab === 'email' && (
              <form className="login-form" onSubmit={handleEmailLogin} noValidate>
                <div className="login-form-group">
                  <label htmlFor="login-email">
                    <Mail size={18} />
                    <span>E-posta Adresi</span>
                  </label>
                  <input
                    type="email"
                    id="login-email"
                    name="email"
                    value={emailForm.email}
                    onChange={handleEmailChange}
                    onKeyPress={(e) => handleKeyPress(e, 'email')}
                    placeholder="ornek@email.com"
                    required
                    aria-label="E-posta adresi"
                    aria-required="true"
                    autoComplete="email"
                  />
                </div>

                <div className="login-form-group">
                  <label htmlFor="login-password">
                    <Lock size={18} />
                    <span>Şifre</span>
                  </label>
                  <div className="login-password-input-wrapper">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="login-password"
                      name="password"
                      value={emailForm.password}
                      onChange={handleEmailChange}
                      onKeyPress={(e) => handleKeyPress(e, 'email')}
                      placeholder="••••••••"
                      required
                      aria-label="Şifre"
                      aria-required="true"
                      autoComplete="current-password"
                      minLength="6"
                    />
                    <button 
                      type="button"
                      className="login-password-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? "Şifreyi gizle" : "Şifreyi göster"}
                      aria-pressed={showPassword}
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  <div className="login-form-options">
                    <label className="login-remember-me">
                      <input type="checkbox" aria-label="Beni hatırla" />
                      <span>Beni hatırla</span>
                    </label>
                    <Link to="/forgot-password" className="login-forgot-password">
                      Şifremi Unuttum
                    </Link>
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="login-button"
                  disabled={isLoading}
                  aria-label={isLoading ? "Giriş yapılıyor..." : "Giriş yap"}
                >
                  {isLoading ? (
                    <div className="login-spinner"></div>
                  ) : (
                    <>
                      <LogIn size={20} />
                      <span>Giriş Yap</span>
                    </>
                  )}
                </button>

                <div className="login-divider">
                  <span>veya</span>
                </div>

                <button 
                  type="button"
                  className="login-alternative-login"
                  onClick={() => setActiveTab('phone')}
                  aria-label="Telefon ile giriş yap"
                >
                  <Smartphone size={20} />
                  <span>Telefon ile Giriş Yap</span>
                </button>
              </form>
            )}

            {/* Telefon ile Giriş */}
            {activeTab === 'phone' && (
              <form className="login-form" onSubmit={handlePhoneLogin} noValidate>
                {!verificationSent ? (
                  <>
                    <div className="login-form-group">
                      <label htmlFor="login-phone">
                        <Phone size={18} />
                        <span>Telefon Numarası</span>
                      </label>
                      <input
                        type="tel"
                        id="login-phone"
                        name="phone"
                        value={phoneForm.phone}
                        onChange={handlePhoneChange}
                        onKeyPress={(e) => handleKeyPress(e, 'phone')}
                        placeholder="(5__) ___ __ __"
                        required
                        aria-label="Telefon numarası"
                        aria-required="true"
                        autoComplete="tel"
                      />
                    </div>

                    <button 
                      type="button"
                      className="login-send-code-button"
                      onClick={handleSendVerificationCode}
                      disabled={isLoading || countdown > 0}
                      aria-label={countdown > 0 ? `${countdown} saniye sonra tekrar gönderilebilir` : "Doğrulama kodu gönder"}
                    >
                      {isLoading ? (
                        <div className="login-spinner"></div>
                      ) : countdown > 0 ? (
                        `${countdown} saniye`
                      ) : (
                        <>
                          <MessageSquare size={20} />
                          <span>Doğrulama Kodu Gönder</span>
                        </>
                      )}
                    </button>
                  </>
                ) : (
                  <>
                    <div className="login-verification-info">
                      <Shield size={24} />
                      <p>
                        Doğrulama kodu <strong>{phoneForm.phone}</strong> 
                        numarasına gönderildi.
                      </p>
                    </div>

                    <div className="login-form-group">
                      <label htmlFor="code-0">6 Haneli Doğrulama Kodu</label>
                      <div className="login-verification-code-inputs">
                        {verificationCode.map((digit, index) => (
                          <input
                            key={index}
                            id={`code-${index}`}
                            type="text"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            maxLength="1"
                            value={digit}
                            onChange={(e) => handleVerificationCodeChange(index, e.target.value)}
                            onKeyPress={(e) => handleKeyPress(e, 'phone')}
                            onKeyDown={(e) => {
                              if (e.key === 'Backspace' && !digit && index > 0) {
                                const prevInput = document.getElementById(`code-${index - 1}`);
                                if (prevInput) prevInput.focus();
                              }
                            }}
                            aria-label={`Doğrulama kodu ${index + 1}. hane`}
                            required
                          />
                        ))}
                      </div>
                    </div>

                    <div className="login-resend-code">
                      {countdown > 0 ? (
                        <p role="status">Yeni kod için {countdown} saniye bekleyin</p>
                      ) : (
                        <button 
                          type="button"
                          className="login-resend-button"
                          onClick={handleSendVerificationCode}
                          disabled={isLoading}
                          aria-label="Kodu yeniden gönder"
                        >
                          Kodu Yeniden Gönder
                        </button>
                      )}
                    </div>

                    <button 
                      type="submit" 
                      className="login-button"
                      disabled={isLoading}
                      aria-label={isLoading ? "Doğrulanıyor..." : "Doğrula ve giriş yap"}
                    >
                      {isLoading ? (
                        <div className="login-spinner"></div>
                      ) : (
                        <>
                          <Key size={20} />
                          <span>Doğrula ve Giriş Yap</span>
                        </>
                      )}
                    </button>

                    <button 
                      type="button"
                      className="login-back-button"
                      onClick={() => {
                        setVerificationSent(false);
                        setVerificationCode(['', '', '', '', '', '']);
                      }}
                      aria-label="Farklı telefon numarası kullan"
                    >
                      Farklı numara kullan
                    </button>
                  </>
                )}
              </form>
            )}

            {/* Yeni Kayıt */}
            {activeTab === 'register' && (
              <form className="login-register-form" onSubmit={handleRegister} noValidate>
                <div className="login-form-row">
                  <div className="login-form-group">
                    <label htmlFor="register-name">
                      <User size={18} />
                      <span>Ad</span>
                    </label>
                    <input
                      type="text"
                      id="register-name"
                      name="name"
                      value={registerForm.name}
                      onChange={handleRegisterChange}
                      onKeyPress={(e) => handleKeyPress(e, 'register')}
                      placeholder="Adınız"
                      required
                      aria-label="Ad"
                      aria-required="true"
                      autoComplete="given-name"
                    />
                  </div>

                  <div className="login-form-group">
                    <label htmlFor="register-surname">
                      <User size={18} />
                      <span>Soyad</span>
                    </label>
                    <input
                      type="text"
                      id="register-surname"
                      name="surname"
                      value={registerForm.surname}
                      onChange={handleRegisterChange}
                      onKeyPress={(e) => handleKeyPress(e, 'register')}
                      placeholder="Soyadınız"
                      required
                      aria-label="Soyad"
                      aria-required="true"
                      autoComplete="family-name"
                    />
                  </div>
                </div>

                <div className="login-form-group">
                  <label htmlFor="register-phone">
                    <Phone size={18} />
                    <span>Telefon Numarası</span>
                  </label>
                  <input
                    type="tel"
                    id="register-phone"
                    name="phone"
                    value={registerForm.phone}
                    onChange={handleRegisterChange}
                    onKeyPress={(e) => handleKeyPress(e, 'register')}
                    placeholder="(5__) ___ __ __"
                    required
                    aria-label="Telefon numarası"
                    aria-required="true"
                    autoComplete="tel"
                  />
                </div>

                <div className="login-form-group">
                  <label htmlFor="register-email">
                    <Mail size={18} />
                    <span>E-posta Adresi</span>
                  </label>
                  <input
                    type="email"
                    id="register-email"
                    name="email"
                    value={registerForm.email}
                    onChange={handleRegisterChange}
                    onKeyPress={(e) => handleKeyPress(e, 'register')}
                    placeholder="ornek@email.com"
                    required
                    aria-label="E-posta adresi"
                    aria-required="true"
                    autoComplete="email"
                  />
                </div>

                <div className="login-form-row">
                  <div className="login-form-group">
                    <label htmlFor="register-password">
                      <Lock size={18} />
                      <span>Şifre</span>
                    </label>
                    <div className="login-password-input-wrapper">
                      <input
                        type={showPassword ? "text" : "password"}
                        id="register-password"
                        name="password"
                        value={registerForm.password}
                        onChange={handleRegisterChange}
                        onKeyPress={(e) => handleKeyPress(e, 'register')}
                        placeholder="••••••••"
                        required
                        aria-label="Şifre"
                        aria-required="true"
                        autoComplete="new-password"
                        minLength="6"
                      />
                      <button 
                        type="button"
                        className="login-password-toggle"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? "Şifreyi gizle" : "Şifreyi göster"}
                        aria-pressed={showPassword}
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>

                  <div className="login-form-group">
                    <label htmlFor="register-confirm-password">
                      <Lock size={18} />
                      <span>Şifre Tekrar</span>
                    </label>
                    <input
                      type={showPassword ? "text" : "password"}
                      id="register-confirm-password"
                      name="confirmPassword"
                      value={registerForm.confirmPassword}
                      onChange={handleRegisterChange}
                      onKeyPress={(e) => handleKeyPress(e, 'register')}
                      placeholder="••••••••"
                      required
                      aria-label="Şifre tekrar"
                      aria-required="true"
                      autoComplete="new-password"
                      minLength="6"
                    />
                  </div>
                </div>

                <div className="login-form-agreement">
                  <label className="login-agreement-checkbox">
                    <input 
                      type="checkbox" 
                      required 
                      aria-label="Kullanım koşulları ve gizlilik politikasını kabul ediyorum" 
                    />
                    <span>
                      <Link to="/terms">Kullanım koşullarını</Link> ve{' '}
                      <Link to="/privacy">Gizlilik politikasını</Link> okudum ve kabul ediyorum.
                    </span>
                  </label>
                </div>

                <button 
                  type="submit" 
                  className="login-register-button"
                  disabled={isLoading}
                  aria-label={isLoading ? "Hesap oluşturuluyor..." : "Hesap oluştur"}
                >
                  {isLoading ? (
                    <div className="login-spinner"></div>
                  ) : (
                    <>
                      <User size={20} />
                      <span>Hesap Oluştur</span>
                    </>
                  )}
                </button>

                <p className="login-already-have-account">
                  Zaten hesabınız var mı?{' '}
                  <button 
                    type="button"
                    className="login-login-link"
                    onClick={() => setActiveTab('email')}
                    aria-label="Giriş yap sayfasına git"
                  >
                    Giriş yapın
                  </button>
                </p>
              </form>
            )}
          </main>

          {/* Footer Links */}
          <footer className="login-footer">
            <Link to="/" className="login-home-link">
              <ArrowRight size={16} />
              <span>Ana Sayfaya Dön</span>
            </Link>
            <div className="login-footer-links">
              <Link to="/help">Yardım</Link>
              <span>•</span>
              <Link to="/contact">İletişim</Link>
              <span>•</span>
              <Link to="/privacy">Gizlilik</Link>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;