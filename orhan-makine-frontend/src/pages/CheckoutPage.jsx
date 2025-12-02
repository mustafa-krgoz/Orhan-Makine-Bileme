import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { 
  FaCreditCard, 
  FaTruck, 
  FaCheckCircle,
  FaShieldAlt,
  FaLock 
} from 'react-icons/fa';
import '../styles/CheckoutPage.css';

const CheckoutPage = () => {
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    district: '',
    paymentMethod: 'creditCard'
  });

  const formatPrice = (price) => {
    return new Intl.NumberFormat('tr-TR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(price);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ödeme işlemleri burada yapılacak
    alert('Siparişiniz alındı! Teşekkür ederiz.');
    clearCart();
    window.location.href = '/';
  };

  if (cartItems.length === 0) {
    return (
      <div className="checkout-empty">
        <div className="container">
          <h2>Sepetiniz Boş</h2>
          <p>Ödeme yapmak için sepete ürün ekleyin.</p>
          <Link to="/products" className="btn-back-to-products">
            Ürünlere Dön
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="container">
        <div className="checkout-header">
          <h1>ÖDEME</h1>
          <div className="checkout-steps">
            <div className="step active">
              <FaCheckCircle /> <span>Sepet</span>
            </div>
            <div className="step active">
              <FaCheckCircle /> <span>Ödeme Bilgileri</span>
            </div>
            <div className="step">
              <FaCheckCircle /> <span>Onay</span>
            </div>
          </div>
        </div>

        <div className="checkout-layout">
          {/* SOL: Müşteri Bilgileri */}
          <div className="checkout-form-section">
            <form onSubmit={handleSubmit} className="checkout-form">
              <h2>Müşteri Bilgileri</h2>
              
              <div className="form-grid">
                <div className="form-group">
                  <label>Ad Soyad *</label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                  />
                </div>

                <div className="form-group">
                  <label>E-posta *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>

                <div className="form-group">
                  <label>Telefon *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>

                <div className="form-group full-width">
                  <label>Adres *</label>
                  <textarea
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    rows="3"
                  />
                </div>

                <div className="form-group">
                  <label>Şehir *</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                  />
                </div>

                <div className="form-group">
                  <label>İlçe *</label>
                  <input
                    type="text"
                    required
                    value={formData.district}
                    onChange={(e) => setFormData({...formData, district: e.target.value})}
                  />
                </div>
              </div>

              <h2>Ödeme Yöntemi</h2>
              <div className="payment-methods">
                <label className="payment-method">
                  <input
                    type="radio"
                    name="payment"
                    value="creditCard"
                    checked={formData.paymentMethod === 'creditCard'}
                    onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})}
                  />
                  <FaCreditCard />
                  <span>Kredi Kartı</span>
                </label>

                <label className="payment-method">
                  <input
                    type="radio"
                    name="payment"
                    value="bankTransfer"
                    checked={formData.paymentMethod === 'bankTransfer'}
                    onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})}
                  />
                  <FaShieldAlt />
                  <span>Havale/EFT</span>
                </label>

                <label className="payment-method">
                  <input
                    type="radio"
                    name="payment"
                    value="cashOnDelivery"
                    checked={formData.paymentMethod === 'cashOnDelivery'}
                    onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})}
                  />
                  <FaTruck />
                  <span>Kapıda Ödeme</span>
                </label>
              </div>

              <div className="form-security">
                <FaLock /> <span>Güvenli ödeme - SSL Sertifikası</span>
              </div>

              <button type="submit" className="btn-complete-payment">
                SİPARİŞİ TAMAMLA
              </button>
            </form>
          </div>

          {/* SAĞ: Sipariş Özeti */}
          <div className="checkout-summary">
            <h2>Sipariş Özeti</h2>
            
            <div className="order-items">
              {cartItems.map(item => (
                <div key={item.id} className="order-item">
                  <img src={item.image} alt={item.name} />
                  <div>
                    <h4>{item.name}</h4>
                    <span>{item.quantity} adet × {formatPrice(item.price)} TL</span>
                  </div>
                  <span className="item-total">
                    {formatPrice(item.price * item.quantity)} TL
                  </span>
                </div>
              ))}
            </div>

            <div className="order-totals">
              <div className="total-row">
                <span>Ürünler</span>
                <span>{formatPrice(getTotalPrice())} TL</span>
              </div>
              <div className="total-row">
                <span>Kargo</span>
                <span className="free">ÜCRETSİZ</span>
              </div>
              <div className="total-row grand-total">
                <span>Toplam</span>
                <span>{formatPrice(getTotalPrice())} TL</span>
              </div>
            </div>

            <div className="order-guarantee">
              <FaCheckCircle />
              <div>
                <h4>Orhan Makine Garantisi</h4>
                <p>14 Gün İade • 2 Yıl Garanti • Ücretsiz Kargo</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;