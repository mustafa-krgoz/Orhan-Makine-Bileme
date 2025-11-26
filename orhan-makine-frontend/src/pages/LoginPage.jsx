// src/pages/LoginPage.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Phone, 
  ArrowRight,
  UserPlus,
  Shield,
  Truck,
  Star
} from "lucide-react";
import '../styles/LoginPage.css';

const LoginPage = () => {
  const [loginMethod, setLoginMethod] = useState("email"); // "email", "phone", "code"
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    password: "",
    code: "",
    rememberMe: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handlePhoneInput = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length <= 10) {
      if (value.length > 3 && value.length <= 6) {
        value = value.replace(/(\d{3})(\d{0,3})/, '$1 $2');
      } else if (value.length > 6) {
        value = value.replace(/(\d{3})(\d{3})(\d{0,4})/, '$1 $2 $3');
      }
      setFormData(prev => ({ ...prev, phone: value }));
    }
  };

  const handleSendCode = async () => {
    if (loginMethod === "phone" && formData.phone.replace(/\D/g, '').length !== 10) {
      alert("Lütfen geçerli bir telefon numarası girin");
      return;
    }
    
    if (loginMethod === "email" && !formData.email.includes('@')) {
      alert("Lütfen geçerli bir email adresi girin");
      return;
    }

    setIsLoading(true);
    // Simüle edilmiş kod gönderme
    setTimeout(() => {
      setVerificationSent(true);
      setIsLoading(false);
      alert(`Doğrulama kodu ${loginMethod === "phone" ? "telefonunuza" : "emailinize"} gönderildi!`);
    }, 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simüle edilmiş giriş işlemi
    setTimeout(() => {
      setIsLoading(false);
      if (loginMethod === "email" && formData.email && formData.password) {
        alert("Başarıyla giriş yapıldı!");
        // Burada gerçek giriş işlemi yapılacak
      } else if ((loginMethod === "phone" || loginMethod === "code") && formData.code === "123456") {
        alert("Başarıyla giriş yapıldı!");
        // Burada gerçek giriş işlemi yapılacak
      } else {
        alert("Giriş bilgileri hatalı! Test kodu: 123456");
      }
    }, 1500);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const resetForm = () => {
    setVerificationSent(false);
    setFormData({
      email: "",
      phone: "",
      password: "",
      code: "",
      rememberMe: false
    });
  };

  return (
    <div className="login-page">
      <div className="login-container">
        
        {/* Sol Panel - Brand Info */}
        <div className="login-brand-panel">
          <div className="brand-content">
            <Link to="/" className="brand-logo">
              <div className="logo-icon">
                <span>OM</span>
              </div>
              <div className="logo-text">
                <h1>ORHAN MAKİNE</h1>
                <p>Bileme & Kesici Takım</p>
              </div>
            </Link>

            <div className="brand-features">
              <div className="feature-item">
                <Shield className="feature-icon" />
                <div>
                  <h3>Güvenli Giriş</h3>
                  <p>Hesabınıza güvenli şekilde erişin</p>
                </div>
              </div>
              
              <div className="feature-item">
                <Truck className="feature-icon" />
                <div>
                  <h3>Hızlı Erişim</h3>
                  <p>Siparişlerinizi takip edin</p>
                </div>
              </div>
              
              <div className="feature-item">
                <Star className="feature-icon" />
                <div>
                  <h3>Özel Fırsatlar</h3>
                  <p>Üyelere özel kampanyalar</p>
                </div>
              </div>
            </div>

            <div className="brand-stats">
              <div className="stat">
                <span className="stat-number">2.000+</span>
                <span className="stat-label">Mutlu Müşteri</span>
              </div>
              <div className="stat">
                <span className="stat-number">40+</span>
                <span className="stat-label">Yıl Deneyim</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sağ Panel - Login Form */}
        <div className="login-form-panel">
          <div className="form-container">
            <div className="form-header">
              <h1>Hesabınıza Giriş Yapın</h1>
              <p>Devam etmek için hesabınıza giriş yapın</p>
            </div>

            {/* Login Method Tabs */}
            <div className="login-method-tabs">
              <button
                className={`tab-btn ${loginMethod === "email" ? "active" : ""}`}
                onClick={() => {
                  setLoginMethod("email");
                  resetForm();
                }}
              >
                <Mail className="tab-icon" />
                E-posta ile
              </button>
              
              <button
                className={`tab-btn ${loginMethod === "phone" ? "active" : ""}`}
                onClick={() => {
                  setLoginMethod("phone");
                  resetForm();
                }}
              >
                <Phone className="tab-icon" />
                Telefon ile
              </button>
            </div>

            <form onSubmit={handleSubmit} className="login-form">
              
              {/* Email Login */}
              {loginMethod === "email" && (
                <>
                  <div className="form-group">
                    <label htmlFor="email" className="form-label">
                      <Mail className="input-icon" />
                      E-posta Adresi
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="ornek@email.com"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="password" className="form-label">
                      <Lock className="input-icon" />
                      Şifre
                    </label>
                    <div className="password-input-container">
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="form-input"
                        placeholder="Şifrenizi girin"
                        required
                      />
                      <button
                        type="button"
                        className="password-toggle"
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="form-options">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        name="rememberMe"
                        checked={formData.rememberMe}
                        onChange={handleInputChange}
                        className="checkbox-input"
                      />
                      <span className="checkmark"></span>
                      Beni hatırla
                    </label>
                    
                    <Link to="/sifre-sifirla" className="forgot-password">
                      Şifremi unuttum?
                    </Link>
                  </div>
                </>
              )}

              {/* Phone Login */}
              {loginMethod === "phone" && !verificationSent && (
                <div className="form-group">
                  <label htmlFor="phone" className="form-label">
                    <Phone className="input-icon" />
                    Telefon Numarası
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handlePhoneInput}
                    className="form-input"
                    placeholder="5__ ___ __ __"
                    required
                  />
                  <p className="input-hint">
                    10 haneli telefon numaranızı girin (5** *** ** **)
                  </p>
                </div>
              )}

              {/* Code Verification */}
              {(loginMethod === "phone" && verificationSent) || loginMethod === "code" ? (
                <div className="form-group">
                  <label htmlFor="code" className="form-label">
                    Doğrulama Kodu
                  </label>
                  <input
                    type="text"
                    id="code"
                    name="code"
                    value={formData.code}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="6 haneli kodu girin"
                    maxLength={6}
                    required
                  />
                  <p className="input-hint">
                    {loginMethod === "phone" 
                      ? `Telefonunuza gönderilen 6 haneli kodu girin` 
                      : `E-posta adresinize gönderilen 6 haneli kodu girin`
                    }
                    <br />
                    <strong>Test kodu: 123456</strong>
                  </p>
                  
                  <div className="code-actions">
                    <button type="button" className="resend-code" onClick={handleSendCode}>
                      Kodu Tekrar Gönder
                    </button>
                    <button type="button" className="change-method" onClick={resetForm}>
                      {loginMethod === "phone" ? "Telefonu Değiştir" : "E-postayı Değiştir"}
                    </button>
                  </div>
                </div>
              ) : null}

              {/* Submit Button */}
              <button
                type={!verificationSent && loginMethod === "phone" ? "button" : "submit"}
                onClick={!verificationSent && loginMethod === "phone" ? handleSendCode : undefined}
                className={`login-btn ${isLoading ? "loading" : ""}`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="spinner"></div>
                ) : (
                  <>
                    {!verificationSent && loginMethod === "phone" ? (
                      "Kodu Gönder"
                    ) : (
                      <>
                        Giriş Yap
                        <ArrowRight className="btn-icon" />
                      </>
                    )}
                  </>
                )}
              </button>

              {/* Demo Credentials */}
              <div className="demo-credentials">
                <h4>Demo Giriş Bilgileri:</h4>
                <p><strong>E-posta:</strong> demo@orhanmakine.com</p>
                <p><strong>Şifre:</strong> herhangi bir şifre</p>
                <p><strong>Doğrulama Kodu:</strong> 123456</p>
              </div>
            </form>

            {/* Divider */}
            <div className="divider">
              <span>veya</span>
            </div>

            {/* Social Login - Gelecek için */}
            <div className="social-login">
              <button className="social-btn google-btn" disabled>
                Google ile Giriş Yap
              </button>
              {/* Diğer sosyal giriş butonları buraya eklenebilir */}
            </div>

            {/* Register Link */}
            <div className="register-section">
              <p>Hesabınız yok mu?</p>
              <Link to="/kayit" className="register-link">
                <UserPlus className="w-4 h-4" />
                Hemen Kayıt Olun
              </Link>
            </div>

            {/* Security Notice */}
            <div className="security-notice">
              <Shield className="security-icon" />
              <p>
                Giriş bilgileriniz güvenli şekilde şifrelenmektedir. 
                Hesabınızı korumak için şifrenizi kimseyle paylaşmayın.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;