import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// GLOBAL FAVORİ SİSTEMİ
// Bu context, favorileri tüm site genelinde kullanılabilir yapar
import { FavoritesProvider } from "./context/FavoritesContext";

import Navbar from "./components/Navbar/Navbar.jsx";
import Footer from "./components/Footer/Footer.jsx";
import HomePage from "./pages/HomePage.jsx";
import ProductsPage from "./pages/ProductsPage.jsx";
import ProductDetailPage from "./pages/ProductDetailPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import AdminRegisterPage from "./pages/AdminRegisterPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import ServicesPage from "./pages/ServicesPage.jsx";
import FavoritesPage from "./pages/FavoritesPage.jsx"; // ⭐ Favoriler sayfası

function App() {
  return (
    // ⭐ FAVORİLERİ GLOBAL KULLANMAK İÇİN BURAYA SARILIR
    <FavoritesProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-white text-gray-900">
          
          {/* ⭐ NAVBAR — her sayfada gösteriliyor */}
          <Navbar />

          {/* ⭐ ROUTE DEĞİŞEN ANA İÇERİK */}
          <main className="flex-grow">
            <Routes>

              {/* ANA SAYFA — site.com/ */}
              <Route path="/" element={<HomePage />} />

              {/* TÜM ÜRÜNLER SAYFASI — site.com/products */}
              <Route path="/products" element={<ProductsPage />} />

              {/* ÜRÜN DETAY SAYFASI — site.com/product/1, site.com/product/2 */}
              <Route path="/product/:id" element={<ProductDetailPage />} />

              {/* FAVORİLER SAYFASI ⭐ — site.com/favorites */}
              <Route path="/favorites" element={<FavoritesPage />} />

              {/* İLETİŞİM SAYFASI — site.com/contact */}
              <Route path="/contact" element={<ContactPage />} />

              {/* GİRİŞ SAYFASI — site.com/login */}
              <Route path="/login" element={<LoginPage />} />

              {/* ADMIN KAYIT SAYFASI — site.com/kayit */}
              <Route path="/kayit" element={<AdminRegisterPage />} />

              {/* HİZMETLER SAYFASI — site.com/services */}
              <Route path="/services" element={<ServicesPage />} />

              {/* 404 SAYFASI — tanımlanmamış tüm URL'ler için */}
              <Route
                path="*"
                element={
                  <div className="container mx-auto px-4 py-20 text-center">
                    <h1 className="text-5xl font-bold text-gray-800 mb-4">404</h1>
                    <p className="text-lg text-gray-600 mb-8">
                      Aradığınız sayfa bulunamadı.
                    </p>
                    <a
                      href="/"
                      className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition inline-block"
                    >
                      Ana Sayfaya Dön
                    </a>
                  </div>
                }
              />
            </Routes>
          </main>

          {/* ⭐ FOOTER — her sayfanın altında gösterilir */}
          <Footer />
        </div>
      </Router>
    </FavoritesProvider>
  );
}

export default App;