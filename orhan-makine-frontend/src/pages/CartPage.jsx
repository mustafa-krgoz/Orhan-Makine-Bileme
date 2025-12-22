import React, { useMemo, useCallback, memo } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { FaTrash, FaPlus, FaMinus, FaShoppingBag, FaArrowLeft } from "react-icons/fa";

// SEO Component
import Seo from "../components/Seo";

// WebP + Lazy Loading için optimize edilmiş Image Component
import OptimizedImage from "../components/OptimizedImage";

import "../styles/CartPage.css";

// Constants
const FREE_SHIPPING_THRESHOLD = 500;
const CURRENCY = "TL";
const LOCALE = "tr-TR";

// Memoized Components
const CartEmptyView = memo(() => (
  <>
    <Seo
      title="Sepetiniz Boş | Orhan Makine"
      description="Sepetinizde ürün bulunmuyor. Makita, Cora, Kama ve diğer kaliteli ürünlere göz atarak alışverişe başlayabilirsiniz."
      canonical={window.location.href}
    />

    <div className="cart-page cart-empty">
      <div className="cart-container">
        <main className="cart-empty-content">
          <div className="cart-empty-icon" aria-hidden="true">
            <FaShoppingBag />
          </div>

          <h1 className="cart-empty-title">Sepetiniz Boş</h1>
          <p className="cart-empty-text">Alışverişe başlamak için ürün ekleyin.</p>

          <Link 
            to="/products" 
            className="cart-btn-start-shopping"
            aria-label="Ürünler sayfasına git ve alışverişe başla"
          >
            <FaArrowLeft aria-hidden="true" /> Alışverişe Devam Et
          </Link>
        </main>
      </div>
    </div>
  </>
));

CartEmptyView.displayName = "CartEmptyView";

// Cart Item Component
const CartItem = memo(({ item, onRemove, onUpdateQuantity, formatPrice }) => {
  const itemTotal = useMemo(
    () => item.price * item.quantity,
    [item.price, item.quantity]
  );

  const handleDecrease = useCallback(() => {
    onUpdateQuantity(item.id, item.quantity - 1);
  }, [item.id, item.quantity, onUpdateQuantity]);

  const handleIncrease = useCallback(() => {
    onUpdateQuantity(item.id, item.quantity + 1);
  }, [item.id, item.quantity, onUpdateQuantity]);

  const handleRemove = useCallback(() => {
    onRemove(item.id);
  }, [item.id, onRemove]);

  return (
    <article className="cart-item" itemScope itemType="https://schema.org/Product">
      {/* WEBP + LAZY IMAGES */}
      <div className="cart-item-image">
        <OptimizedImage
          src={item.image}
          alt={item.name}
          width="120"
          height="120"
          loading="lazy"
          itemProp="image"
        />
      </div>

      <div className="cart-item-info">
        {/* Ürün Başlık + Silme */}
        <header className="cart-item-header">
          <h3 className="cart-item-title" itemProp="name">{item.name}</h3>

          <button
            type="button"
            onClick={handleRemove}
            className="cart-remove-item-btn"
            aria-label={`${item.name} ürününü sepetten kaldır`}
          >
            <FaTrash aria-hidden="true" />
          </button>
        </header>

        {/* Marka / Stok */}
        <div className="cart-item-details">
          <span className="cart-item-brand" itemProp="brand">{item.brand}</span>
          <span className="cart-item-stock" itemProp="sku">Stok Kodu: {item.stockCode}</span>
        </div>

        {/* Fiyat / Adet / Toplam */}
        <div className="cart-item-pricing">
          {/* Adet Kontrol */}
          <div className="cart-quantity-control" role="group" aria-label="Ürün adedi kontrolü">
            <button
              type="button"
              onClick={handleDecrease}
              aria-label="Adeti azalt"
              className="cart-quantity-btn"
              disabled={item.quantity <= 1}
            >
              <FaMinus aria-hidden="true" />
            </button>

            <span className="cart-quantity-display" aria-live="polite" aria-atomic="true">
              {item.quantity}
            </span>

            <button
              type="button"
              onClick={handleIncrease}
              aria-label="Adeti artır"
              className="cart-quantity-btn"
            >
              <FaPlus aria-hidden="true" />
            </button>
          </div>

          {/* Birim Fiyat - SADECE YEŞİL FİYAT */}
          <div className="cart-item-price" itemProp="offers" itemScope itemType="https://schema.org/Offer">
            <span itemProp="price" content={item.price}>
              {formatPrice(item.price)} {CURRENCY}
            </span>
            <meta itemProp="priceCurrency" content="TRY" />
          </div>

          {/* Toplam - YEŞİL FİYAT */}
          <div className="cart-item-total" aria-label={`Ürün toplam fiyatı: ${formatPrice(itemTotal)} ${CURRENCY}`}>
            {formatPrice(itemTotal)} {CURRENCY}
          </div>
        </div>
      </div>
    </article>
  );
});

CartItem.displayName = "CartItem";

// Order Summary Component
const CartOrderSummary = memo(({ itemCount, totalPrice, formatPrice }) => {
  const remainingForFreeShipping = useMemo(
    () => Math.max(0, FREE_SHIPPING_THRESHOLD - totalPrice),
    [totalPrice]
  );

  const showShippingInfo = remainingForFreeShipping > 0;

  return (
    <aside className="cart-summary-section" role="complementary" aria-label="Sipariş özeti">
      <div className="cart-order-summary">
        <h3 className="cart-summary-title">Sipariş Özeti</h3>

        <div className="cart-summary-row">
          <span>Ürünler ({itemCount} adet)</span>
          <span className="cart-summary-price">{formatPrice(totalPrice)} {CURRENCY}</span>
        </div>

        <div className="cart-summary-row">
          <span>Kargo</span>
          <span className="cart-free-shipping cart-summary-price">Ücretsiz</span>
        </div>

        {showShippingInfo && (
          <div className="cart-shipping-info" role="status" aria-live="polite">
            <p className="cart-shipping-text">
              <strong>{FREE_SHIPPING_THRESHOLD} {CURRENCY} üzeri ücretsiz kargo!</strong>{" "}
              {formatPrice(remainingForFreeShipping)} {CURRENCY} daha ekleyin.
            </p>
          </div>
        )}

        <hr className="cart-summary-divider" />

        <div className="cart-summary-total">
          <span>Toplam Tutar</span>
          <span className="cart-total-amount">{formatPrice(totalPrice)} {CURRENCY}</span>
        </div>

        <Link 
          to="/checkout" 
          className="cart-btn-checkout"
          aria-label="Ödeme sayfasına git"
        >
          ÖDEME YAP
        </Link>

        <Link 
          to="/products" 
          className="cart-continue-shopping"
          aria-label="Ürünler sayfasına dön ve alışverişe devam et"
        >
          <FaArrowLeft aria-hidden="true" /> Alışverişe Devam Et
        </Link>

        <div className="cart-payment-methods">
          <p className="cart-payment-title">Güvenli Ödeme</p>
          <div className="cart-payment-icons" aria-label="Kabul edilen ödeme yöntemleri">
            <span role="img" aria-label="Kredi kartı">💳</span>
            <span role="img" aria-label="Banka havalesi">🏦</span>
            <span role="img" aria-label="Mobil ödeme">📱</span>
          </div>
        </div>
      </div>
    </aside>
  );
});

CartOrderSummary.displayName = "CartOrderSummary";

// Main Component
const CartPage = () => {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getItemCount,
  } = useCart();

  // ₺ fiyat biçimlendirme - Memoized
  const formatPrice = useCallback(
    (price) =>
      new Intl.NumberFormat(LOCALE, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(price),
    []
  );

  // Calculated values - Memoized
  const totalPrice = useMemo(() => getTotalPrice(), [getTotalPrice]);
  const itemCount = useMemo(() => getItemCount(), [getItemCount]);

  // Callbacks - Memoized
  const handleClearCart = useCallback(() => {
    if (window.confirm("Sepetteki tüm ürünleri silmek istediğinizden emin misiniz?")) {
      clearCart();
    }
  }, [clearCart]);

  // SEPET BOŞSA
  if (cartItems.length === 0) {
    return <CartEmptyView />;
  }

  // SEPET DOLUYSA
  return (
    <>
      <Seo
        title="Alışveriş Sepetim | Orhan Makine"
        description="Sepetinizdeki ürünleri görüntüleyin, miktarları güncelleyin ve güvenle ödeme adımına ilerleyin. Makita, Kama, Cora ve diğer markalar uygun fiyatlarla."
        canonical={window.location.href}
      />

      <div className="cart-page" itemScope itemType="https://schema.org/ShoppingCart">
        <div className="cart-container">
          {/* MOBİL İÇİN: ÖNCE ÜRÜN LİSTESİ (SADECE MOBİLDE GÖZÜKECEK) */}
          <section className="cart-items-section cart-mobile-only" aria-label="Sepetteki ürünler">
            <div className="cart-items-header">
              <h2 className="cart-items-title">Sepetteki Ürünler</h2>

              <button
                onClick={handleClearCart}
                className="cart-clear-btn"
                aria-label="Sepetteki tüm ürünleri temizle"
                type="button"
              >
                <FaTrash aria-hidden="true" /> Sepeti Temizle
              </button>
            </div>

            <div className="cart-items-list">
              {cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onRemove={removeFromCart}
                  onUpdateQuantity={updateQuantity}
                  formatPrice={formatPrice}
                />
              ))}
            </div>
          </section>

          {/* ORTA: ANA BAŞLIK */}
          <header className="cart-header">
            <h1 className="cart-title">Alışveriş Sepetim</h1>
            <p className="cart-summary">
              <span className="cart-item-count">{itemCount} ürün</span>
              <span className="cart-total-price">{formatPrice(totalPrice)} {CURRENCY}</span>
            </p>
          </header>

          <div className="cart-layout">
            {/* DESKTOP İÇİN: SOL TARAFTA ÜRÜN LİSTESİ */}
            <section className="cart-items-section cart-desktop-view" aria-label="Sepetteki ürünler">
              <div className="cart-items-header">
                <h2 className="cart-items-title">Sepetteki Ürünler</h2>

                <button
                  onClick={handleClearCart}
                  className="cart-clear-btn"
                  aria-label="Sepetteki tüm ürünleri temizle"
                  type="button"
                >
                  <FaTrash aria-hidden="true" /> Sepeti Temizle
                </button>
              </div>

              <div className="cart-items-list">
                {cartItems.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onRemove={removeFromCart}
                    onUpdateQuantity={updateQuantity}
                    formatPrice={formatPrice}
                  />
                ))}
              </div>
            </section>

            {/* SİPARİŞ ÖZETİ - MOBİL İÇİN ALTA, DESKTOP İÇİN SAĞDA */}
            <CartOrderSummary
              itemCount={itemCount}
              totalPrice={totalPrice}
              formatPrice={formatPrice}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(CartPage);