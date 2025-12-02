import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FaTrash, FaPlus, FaMinus, FaShoppingBag, FaArrowLeft } from 'react-icons/fa';
import '../styles/CartPage.css';

const CartPage = () => {
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    getTotalPrice,
    getItemCount 
  } = useCart();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('tr-TR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(price);
  };

  const calculateItemTotal = (item) => {
    return item.price * item.quantity;
  };

  if (cartItems.length === 0) {
    return (
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
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <div className="cart-header">
          <h1>Alışveriş Sepetim</h1>
          <p className="cart-summary">
            <span className="item-count">{getItemCount()} ürün</span>
            <span className="total-price">{formatPrice(getTotalPrice())} TL</span>
          </p>
        </div>

        <div className="cart-layout">
          {/* ÜRÜN LİSTESİ */}
          <div className="cart-items-section">
            <div className="cart-items-header">
              <h2>Sepetteki Ürünler</h2>
              <button onClick={clearCart} className="clear-cart-btn">
                <FaTrash /> Sepeti Temizle
              </button>
            </div>

            <div className="cart-items-list">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <div className="cart-item-image">
                    <img src={item.image} alt={item.name} />
                  </div>

                  <div className="cart-item-info">
                    <div className="cart-item-header">
                      <h3 className="cart-item-title">{item.name}</h3>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="remove-item-btn"
                      >
                        <FaTrash />
                      </button>
                    </div>

                    <div className="cart-item-details">
                      <span className="item-brand">{item.brand}</span>
                      <span className="item-stock">Stok Kodu: {item.stockCode}</span>
                    </div>

                    <div className="cart-item-pricing">
                      <div className="item-price">
                        {formatPrice(item.price)} TL
                        {item.originalPrice && item.originalPrice > item.price && (
                          <span className="original-price">
                            {formatPrice(item.originalPrice)} TL
                          </span>
                        )}
                      </div>

                      <div className="quantity-control">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="quantity-btn"
                        >
                          <FaMinus />
                        </button>
                        <span className="quantity-display">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="quantity-btn"
                        >
                          <FaPlus />
                        </button>
                      </div>

                      <div className="item-total">
                        {formatPrice(calculateItemTotal(item))} TL
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SİPARİŞ ÖZETİ */}
          <div className="cart-summary-section">
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
                    <strong>500 TL üzeri ücretsiz kargo!</strong>
                    {formatPrice(500 - getTotalPrice())} TL daha ekleyin.
                  </p>
                </div>
              )}

              <div className="summary-divider"></div>

              <div className="summary-total">
                <span>Toplam Tutar</span>
                <span className="total-amount">{formatPrice(getTotalPrice())} TL</span>
              </div>

              <button className="btn-checkout">
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

            <div className="guarantee-banner">
              <h4>Orhan Makine Garantisi</h4>
              <ul>
                <li>✓ 14 Gün İade</li>
                <li>✓ 2 Yıl Garanti</li>
                <li>✓ Ücretsiz Kargo</li>
                <li>✓ 7/24 Destek</li>
              </ul>
            </div>
          </div>
        </div>

        {/* ÖNERİLEN ÜRÜNLER (opsiyonel) */}
        <div className="recommended-products">
          <h3>Bu Ürünlerle İlgilenebilirsiniz</h3>
          <div className="recommended-grid">
            {/* Buraya önerilen ürünleri ekleyebilirsiniz */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;