import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

// GLOBAL CONTEXT'LER
import { FavoritesProvider } from "./context/FavoritesContext";
import { CartProvider } from "./context/CartContext";

// COMPONENTS
import Navbar from "./components/Navbar/Navbar.jsx";
import Footer from "./components/Footer/Footer.jsx";
import WhatsAppButton from "./components/WhatsAppButton/WhatsAppButton.jsx"; // WhatsApp butonu eklendi

// PAGES
import HomePage from "./pages/HomePage.jsx";
import ProductsPage from "./pages/ProductsPage.jsx";
import ProductDetailPage from "./pages/ProductDetailPage.jsx";
import CartPage from "./pages/CartPage.jsx"; // ⭐ Sepet sayfası
import CheckoutPage from "./pages/CheckoutPage.jsx"; // ⭐ Ödeme sayfası
import LoginPage from "./pages/LoginPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import ServicesPage from "./pages/ServicesPage.jsx";
import FavoritesPage from "./pages/FavoritesPage.jsx"; // ⭐ Favoriler sayfası
import NotFoundPage from "./pages/NotFoundPage.jsx"; // ⭐ 404 sayfası
import AboutPage from "./pages/AboutPage.jsx";
import GalleryPage from "./pages/GalleryPage.jsx";

// TOAST CONTAINER
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// PWA Installation Prompt
import PWAPrompt from "./components/PWAPrompt/PWAPrompt.jsx";

// Scroll to top component
import ScrollToTop from "./components/ScrollToTop/ScrollToTop.jsx";

function App() {
  const [showPWAPrompt, setShowPWAPrompt] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  // PWA Installation Prompt
  useEffect(() => {
    // PWA installation event listener
    const handleBeforeInstallPrompt = (e) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later
      setDeferredPrompt(e);
      
      // Check if app is already installed
      if (!window.matchMedia('(display-mode: standalone)').matches) {
        // Show install prompt after 10 seconds
        setTimeout(() => {
          setShowPWAPrompt(true);
        }, 10000);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Check if already installed
    window.addEventListener('appinstalled', () => {
      console.log('PWA installed successfully');
      setShowPWAPrompt(false);
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallPWA = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
        } else {
          console.log('User dismissed the install prompt');
        }
        setDeferredPrompt(null);
        setShowPWAPrompt(false);
      });
    }
  };

  const handleDismissPWAPrompt = () => {
    setShowPWAPrompt(false);
    // Store in localStorage to not show again for 30 days
    localStorage.setItem('pwaPromptDismissed', new Date().toISOString());
  };

  return (
    // ⭐ GLOBAL CONTEXT'LER
    <CartProvider>
      <FavoritesProvider>
        <Router>
          <ScrollToTop />
          <div className="flex flex-col min-h-screen bg-white text-gray-900">
            
            {/* ⭐ NAVBAR — her sayfada gösteriliyor */}
            <Navbar />

            {/* ⭐ TOAST CONTAINER — bildirimler için */}
            <ToastContainer 
              position="bottom-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />

            {/* ⭐ ROUTE DEĞİŞEN ANA İÇERİK */}
            <main className="flex-grow">
              <Routes>

                {/* ANA SAYFA — site.com/ */}
                <Route path="/" element={<HomePage />} />

                {/* TÜM ÜRÜNLER SAYFASI — site.com/products */}
                <Route path="/products" element={<ProductsPage />} />

                {/* ÜRÜN DETAY SAYFASI — site.com/product/:id */}
                <Route path="/product/:id" element={<ProductDetailPage />} />

                {/* ⭐ SEPET SAYFASI — site.com/cart */}
                <Route path="/cart" element={<CartPage />} />

                {/* ⭐ ÖDEME SAYFASI — site.com/checkout */}
                <Route path="/checkout" element={<CheckoutPage />} />

                {/* ⭐ FAVORİLER SAYFASI — site.com/favorites */}
                <Route path="/favorites" element={<FavoritesPage />} />

                {/* HİZMETLER SAYFASI — site.com/services */}
                <Route path="/services" element={<ServicesPage />} />

                {/* HAKKIMIZDA SAYFASI — site.com/about */}
                <Route path="/about" element={<AboutPage />} />

                {/* GALERİ SAYFASI — site.com/gallery */}
                <Route path="/gallery" element={<GalleryPage />} />

                {/* İLETİŞİM SAYFASI — site.com/contact */}
                <Route path="/contact" element={<ContactPage />} />

                {/* GİRİŞ SAYFASI — site.com/login */}
                <Route path="/login" element={<LoginPage />} />

                {/* KAYIT SAYFASI — site.com/register */}
                <Route path="/register" element={<LoginPage isRegister />} />

                {/* SIFIRLAMA SAYFASI — site.com/reset-password */}
                <Route path="/reset-password" element={<LoginPage isResetPassword />} />

                {/* 404 SAYFASI — site.com/404 */}
                <Route path="/404" element={<NotFoundPage />} />

                {/* ⭐ 404 YÖNLENDİRME — tanımlanmamış tüm URL'ler için */}
                <Route path="*" element={<NotFoundPage />} />

              </Routes>
            </main>

            {/* ⭐ WHATSAPP BUTONU — tüm sayfalarda gösterilir */}
            <WhatsAppButton phoneNumber="905395159925" />

            {/* ⭐ FOOTER — her sayfanın altında gösterilir */}
            <Footer />

            {/* ⭐ PWA INSTALL PROMPT */}
            {showPWAPrompt && (
              <PWAPrompt 
                onInstall={handleInstallPWA}
                onDismiss={handleDismissPWAPrompt}
              />
            )}
            
          </div>
        </Router>
      </FavoritesProvider>
    </CartProvider>
  );
}

export default App;