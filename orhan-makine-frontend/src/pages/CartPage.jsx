import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { FaTrash, FaPlus, FaMinus, FaShoppingBag, FaArrowLeft } from "react-icons/fa";

// SEO Component (Helmet yerine)
import Seo from "../components/Seo";

// WebP + Lazy Loading için optimize edilmiş Image Component
import OptimizedImage from "../components/OptimizedImage";

import "../styles/CartPage.css";

const CartPage = () => {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getItemCount,
  } = useCart();

  // ₺ fiyat biçimlendirme
  const formatPrice = (price) =>
    new Intl.NumberFormat("tr-TR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);

  // Ürün toplam
  const calculateItemTotal = (item) => item.price * item.quantity;

  // ----------------------------------------
  // SEPET BOŞSA
  // ----------------------------------------
  if (cartItems.length === 0) {
    return (
      <>
        {/* SEO HEAD */}
        <Seo
          title="Sepetiniz Boş | Orhan Makine"
          description="Sepetinizde ürün bulunmuyor. Makita, Cora, Kama ve diğer kaliteli ürünlere göz atarak alışverişe başlayabilirsiniz."
          canonical={window.location.href}
        />

        <div className="cart-page empty-cart">
          <div className="container">
            <div className="empty-cart-content">
              <div className="empty-cart-icon">
                <FaShoppingBag />
              </div>

              <h2>Sepetiniz Boş</h2>
              <p>Alışverişe başlamak için ürün ekleyin.</p>

              <Link to="/products" className="btn-start-shopping">
                <FaArrowLeft /> Alışverişe Devam Et
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  // ----------------------------------------
  // SEPET DOLUYSA
  // ----------------------------------------
  return (
    <>
      <Seo
        title="Alışveriş Sepetim | Orhan Makine"
        description="Sepetinizdeki ürünleri görüntüleyin, miktarları güncelleyin ve güvenle ödeme adımına ilerleyin. Makita, Kama, Cora ve diğer markalar uygun fiyatlarla."
        canonical={window.location.href}
      />

      <div className="cart-page">
        <div className="container">

          {/* SAYFA BAŞLIĞI */}
          <div className="cart-header">
            <h1>Alışveriş Sepetim</h1>
            <p className="cart-summary">
              <span className="item-count">{getItemCount()} ürün</span>
              <span className="total-price">{formatPrice(getTotalPrice())} TL</span>
            </p>
          </div>

          <div className="cart-layout">

            {/* ----------------------------------------
                ÜRÜN LİSTESİ
            ---------------------------------------- */}
            <section className="cart-items-section">
              <div className="cart-items-header">
                <h2>Sepetteki Ürünler</h2>

                <button
                  onClick={clearCart}
                  className="clear-cart-btn"
                  aria-label="Sepeti temizle"
                  type="button"
                >
                  <FaTrash /> Sepeti Temizle
                </button>
              </div>

              <div className="cart-items-list">
                {cartItems.map((item) => (
                  <article key={item.id} className="cart-item">

                    {/* WEBP + LAZY IMAGES */}
                    <div className="cart-item-image">
                      <OptimizedImage
                        src={item.image}
                        alt={item.name}
                        width="90"
                        height="90"
                        loading="lazy"
                      />
                    </div>

                    <div className="cart-item-info">

                      {/* Ürün Başlık + Silme */}
                      <header className="cart-item-header">
                        <h3 className="cart-item-title">{item.name}</h3>

                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          className="remove-item-btn"
                          aria-label={`${item.name} ürününü sepetten kaldır`}
                        >
                          <FaTrash />
                        </button>
                      </header>

                      {/* Marka / Stok */}
                      <div className="cart-item-details">
                        <span className="item-brand">{item.brand}</span>
                        <span className="item-stock">Stok Kodu: {item.stockCode}</span>
                      </div>

                      {/* Fiyat / Adet / Toplam */}
                      <div className="cart-item-pricing">

                        {/* Birim Fiyat */}
                        <div className="item-price">
                          {formatPrice(item.price)} TL
                          {item.originalPrice &&
                            item.originalPrice > item.price && (
                              <span className="original-price">
                                {formatPrice(item.originalPrice)} TL
                              </span>
                            )}
                        </div>

                        {/* Adet Kontrol */}
                        <div className="quantity-control">

                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            aria-label="Adeti azalt"
                            className="quantity-btn"
                          >
                            <FaMinus />
                          </button>

                          <span className="quantity-display">{item.quantity}</span>

                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            aria-label="Adeti artır"
                            className="quantity-btn"
                          >
                            <FaPlus />
                          </button>
                        </div>

                        {/* Toplam */}
                        <div className="item-total">
                          {formatPrice(calculateItemTotal(item))} TL
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            {/* ----------------------------------------
                SİPARİŞ ÖZETİ
            ---------------------------------------- */}
            <aside className="cart-summary-section">
              <div className="order-summary">
                <h3>Sipariş Özeti</h3>

                <div className="summary-row">
                  <span>Ürünler ({getItemCount()} adet)</span>
                  <span>{formatPrice(getTotalPrice())} TL</span>
                </div>

                <div className="summary-row">
                  <span>Kargo</span>
                  <span className="free-shipping">Ücretsiz</span>
                </div>

                {getTotalPrice() < 500 && (
                  <div className="shipping-info">
                    <p>
                      <strong>500 TL üzeri ücretsiz kargo!</strong>{" "}
                      {formatPrice(500 - getTotalPrice())} TL daha ekleyin.
                    </p>
                  </div>
                )}

                <hr className="summary-divider" />

                <div className="summary-total">
                  <span>Toplam Tutar</span>
                  <span className="total-amount">{formatPrice(getTotalPrice())} TL</span>
                </div>

                <button type="button" className="btn-checkout">
                  ÖDEME YAP
                </button>

                <Link to="/products" className="continue-shopping">
                  <FaArrowLeft /> Alışverişe Devam Et
                </Link>

                <div className="payment-methods">
                  <p>Güvenli Ödeme</p>
                  <div className="payment-icons">
                    <span>💳</span>
                    <span>🏦</span>
                    <span>📱</span>
                  </div>
                </div>
              </div>
            </aside>
          </div>

          {/* Lazy-load edilen öneri alanı */}
          <section className="recommended-products">
            <h3>Bu Ürünlerle İlgilenebilirsiniz</h3>
            <div className="recommended-grid">{/* daha sonra doldurulur */}</div>
          </section>
        </div>
      </div>
    </>
  );
};

export default CartPage;