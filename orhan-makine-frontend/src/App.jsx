import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

// GLOBAL CONTEXT
import { FavoritesProvider } from "./context/FavoritesContext";
import { CartProvider } from "./context/CartContext";
import { ProductsProvider } from "./context/ProductsContext";

// COMPONENTS
import Navbar from "./components/Navbar/Navbar.jsx";
import Footer from "./components/Footer/Footer.jsx";
import WhatsAppButton from "./components/WhatsAppButton/WhatsAppButton.jsx";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop.jsx";

// TOAST
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// PWA
import PWAPrompt from "./components/PWAPrompt/PWAPrompt.jsx";

// PAGES
import HomePage from "./pages/HomePage.jsx";
import ProductsPage from "./pages/ProductsPage.jsx";
import ProductDetailPage from "./pages/ProductDetailPage.jsx";
import CartPage from "./pages/CartPage.jsx";
import CheckoutPage from "./pages/CheckoutPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import ServicesPage from "./pages/ServicesPage.jsx";
import FavoritesPage from "./pages/FavoritesPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import GalleryPage from "./pages/GalleryPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

function App() {
  const [showPWAPrompt, setShowPWAPrompt] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  // ===========================
  // PWA INSTALL PROMPT
  // ===========================
  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);

      if (!window.matchMedia('(display-mode: standalone)').matches) {
        setTimeout(() => setShowPWAPrompt(true), 10000);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    window.addEventListener('appinstalled', () => {
      console.log('PWA installed');
      setShowPWAPrompt(false);
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallPWA = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then(() => {
        setDeferredPrompt(null);
        setShowPWAPrompt(false);
      });
    }
  };

  const handleDismissPWAPrompt = () => {
    setShowPWAPrompt(false);
    localStorage.setItem("pwaPromptDismissed", new Date().toISOString());
  };

  // ===========================
  // RENDER
  // ===========================
  return (
    <ProductsProvider>
      <CartProvider>
        <FavoritesProvider>
          <Router>
            <ScrollToTop />

            <div className="flex flex-col min-h-screen bg-white text-gray-900">

              {/* NAVBAR */}
              <Navbar />

              {/* Toast */}
              <ToastContainer
                position="bottom-right"
                autoClose={3000}
                pauseOnHover
                theme="light"
              />

              {/* MAIN CONTENT */}
              <main className="flex-grow">
                <Routes>

                  {/* HOME */}
                  <Route path="/" element={<HomePage />} />

                   {/* ÜRÜN DETAY – SEO FRIENDLY URL */}
                   <Route
                    path="/:categorySlug/:slug"
                    element={<ProductDetailPage />}
                  />
                  
                  {/* TÜM ÜRÜNLER */}
                  <Route path="/products" element={<ProductsPage />} />

                  {/* SEPET */}
                  <Route path="/cart" element={<CartPage />} />

                  {/* ÖDEME */}
                  <Route path="/checkout" element={<CheckoutPage />} />

                  {/* FAVORİLER */}
                  <Route path="/favorites" element={<FavoritesPage />} />

                  {/* HİZMETLER */}
                  <Route path="/services" element={<ServicesPage />} />

                  {/* HAKKIMIZDA */}
                  <Route path="/about" element={<AboutPage />} />

                  {/* GALERİ */}
                  <Route path="/gallery" element={<GalleryPage />} />

                  {/* İLETİŞİM */}
                  <Route path="/contact" element={<ContactPage />} />

                  {/* LOGIN */}
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<LoginPage isRegister />} />
                  <Route path="/reset-password" element={<LoginPage isResetPassword />} />

                  {/* 404 */}
                  <Route path="/404" element={<NotFoundPage />} />
                  <Route path="*" element={<NotFoundPage />} />

                </Routes>
              </main>

              {/* WHATSAPP BUTTON */}
              <WhatsAppButton phoneNumber="905395159925" />

              {/* FOOTER */}
              <Footer />

              {/* PWA PROMPT */}
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
    </ProductsProvider>
  );
}

export default App;