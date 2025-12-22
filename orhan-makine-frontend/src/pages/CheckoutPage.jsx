import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import {
  FaCreditCard,
  FaTruck,
  FaCheckCircle,
  FaShieldAlt,
  FaLock,
} from "react-icons/fa";

import Seo from "../components/Seo";
import OptimizedImage from "../components/OptimizedImage";

import "../styles/CheckoutPage.css";

const CheckoutPage = () => {
  const { cartItems, getTotalPrice, clearCart } = useCart();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    district: "",
    paymentMethod: "creditCard",
  });

  const formatPrice = (price) =>
    new Intl.NumberFormat("tr-TR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Siparişiniz başarıyla alındı! Teşekkür ederiz.");
    clearCart();
    window.location.href = "/";
  };

  // -------------------------------------------------
  // SEPET BOŞSA
  // -------------------------------------------------
  if (cartItems.length === 0) {
    return (
      <>
        <Seo
          title="Sepet Boş - Ödeme Sayfası | Orhan Makine"
          description="Sepetiniz boş olduğu için ödeme adımına geçemezsiniz. Makita, Cora, Kama ve diğer kaliteli ürünleri inceleyerek alışverişe başlayabilirsiniz."
          canonical={window.location.href}
        />

        <div className="checkout-empty">
          <div className="container">
            <h2>Sepetiniz Boş</h2>
            <p>Ödeme yapmak için sepetinize ürün ekleyin.</p>

            <Link to="/products" className="btn-back-to-products">
              Ürünlere Dön
            </Link>
          </div>
        </div>
      </>
    );
  }

  // -------------------------------------------------
  // SEPET DOLUYKEN ÖDEME SAYFASI
  // -------------------------------------------------
  return (
    <>
      <Seo
        title="Ödeme Sayfası | Orhan Makine"
        description="Teslimat bilgilerinizi ve ödeme yöntemini seçerek siparişinizi güvenle tamamlayın. Makita, Cora, Kama ve diğer kaliteli ürünlerde güvenli ödeme."
        canonical={window.location.href}
      />

      <div className="checkout-page">
        <div className="container">
          {/* -------------------------------------------------
              SAYFA BAŞLIĞI
          ------------------------------------------------- */}
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
            {/* -------------------------------------------------
                SOL TARAF → FORM
            ------------------------------------------------- */}
            <div className="checkout-form-section">
              <form onSubmit={handleSubmit} className="checkout-form">
                <h2>Müşteri Bilgileri</h2>

                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="fullName">Ad Soyad *</label>
                    <input
                      id="fullName"
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">E-posta *</label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">Telefon *</label>
                    <input
                      id="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                    />
                  </div>

                  <div className="form-group full-width">
                    <label htmlFor="address">Adres *</label>
                    <textarea
                      id="address"
                      required
                      rows="3"
                      value={formData.address}
                      onChange={(e) =>
                        setFormData({ ...formData, address: e.target.value })
                      }
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="city">Şehir *</label>
                    <input
                      id="city"
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) =>
                        setFormData({ ...formData, city: e.target.value })
                      }
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="district">İlçe *</label>
                    <input
                      id="district"
                      type="text"
                      required
                      value={formData.district}
                      onChange={(e) =>
                        setFormData({ ...formData, district: e.target.value })
                      }
                    />
                  </div>
                </div>

                {/* -------------------------------------------------
                    ÖDEME YÖNTEMİ
                ------------------------------------------------- */}
                <h2>Ödeme Yöntemi</h2>

                <div className="payment-methods">
                  <label className="payment-method">
                    <input
                      type="radio"
                      name="payment"
                      value="creditCard"
                      checked={formData.paymentMethod === "creditCard"}
                      onChange={(e) =>
                        setFormData({ ...formData, paymentMethod: e.target.value })
                      }
                    />
                    <FaCreditCard />
                    <span>Kredi Kartı</span>
                  </label>

                  <label className="payment-method">
                    <input
                      type="radio"
                      name="payment"
                      value="bankTransfer"
                      checked={formData.paymentMethod === "bankTransfer"}
                      onChange={(e) =>
                        setFormData({ ...formData, paymentMethod: e.target.value })
                      }
                    />
                    <FaShieldAlt />
                    <span>Havale / EFT</span>
                  </label>
                </div>

                {/* -------------------------------------------------
                    SSL GÜVENLİK MESAJI
                ------------------------------------------------- */}
                <div className="form-security">
                  <FaLock /> <span>Güvenli ödeme - 256-bit SSL Sertifikası</span>
                </div>

                <button className="btn-complete-payment" type="submit">
                  SİPARİŞİ TAMAMLA
                </button>
              </form>
            </div>

            {/* -------------------------------------------------
                SAĞ TARAF → SİPARİŞ ÖZETİ
            ------------------------------------------------- */}
            <aside className="checkout-summary">
              <h2>Sipariş Özeti</h2>

              <div className="order-items">
                {cartItems.map((item) => (
                  <div key={item.id} className="order-item">
                    <OptimizedImage
                      src={item.image}
                      alt={item.name}
                      width="70"
                      height="70"
                      loading="lazy"
                    />

                    <div className="order-item-info">
                      <h4>{item.name}</h4>
                      <span>
                        {item.quantity} adet × {formatPrice(item.price)} TL
                      </span>
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
            </aside>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;