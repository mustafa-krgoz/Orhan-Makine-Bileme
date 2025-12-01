import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.jsx";
import Footer from "./components/Footer/Footer.jsx";
import HomePage from "./pages/HomePage.jsx";
import ProductsPage from "./pages/ProductsPage.jsx";
import ProductDetailPage from "./pages/ProductDetailPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import AdminRegisterPage from "./pages/AdminRegisterPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import ServicesPage from "./pages/ServicesPage.jsx";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-white text-gray-900">
        
        {/* NAVBAR - Tüm sayfalarda gösterilen üst menü */}
        <Navbar />

        {/* ANA İÇERİK ALANI - Route'lara göre değişen kısım */}
        <main className="flex-grow">
          <Routes>
            {/* 
              ANA SAYFA 
              Path: "/" - Ziyaretçi site.com'a girdiğinde görünen sayfa
            */}
            <Route path="/" element={<HomePage />} />

            {/* 
              ÜRÜNLER SAYFASI 
              Path: "/products" - Tüm ürünlerin listelendiği sayfa
              Kullanım: site.com/products
            */}
            <Route path="/products" element={<ProductsPage />} />

            // Ürün Detay Sayfası Route'u - ID ile çalışacak şekilde
            <Route path="/product/:id" element={<ProductDetailPage />} />
            
            {/* 
              İLETİŞİM SAYFASI 
              Path: "/contact" - İletişim formu ve bilgilerinin olduğu sayfa
              Kullanım: site.com/contact
            */}
            <Route path="/contact" element={<ContactPage />} />

            {/* 
              GİRİŞ SAYFASI 
              Path: "/login" - Kullanıcı girişi için sayfa
              Kullanım: site.com/login
            */}
            <Route path="/login" element={<LoginPage />} />

            {/* 
              YÖNETİCİ KAYIT SAYFASI 
              Path: "/kayit" - Admin kayıt sayfası
              Kullanım: site.com/kayit
            */}
            <Route path="/kayit" element={<AdminRegisterPage />} />

            {/* 
              HİZMETLER SAYFASI 
              Path: "/services" - Şirket hizmetlerinin anlatıldığı sayfa
              Kullanım: site.com/services
            */}
            <Route path="/services" element={<ServicesPage />} />

            {/* 
              404 SAYFASI - Fallback Route
              Path: "*" - Tanımlanmamış tüm URL'ler için
              Kullanım: site.com/olmayan-bir-sayfa (otomatik buraya yönlendirilir)
            */}
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

        {/* FOOTER - Tüm sayfalarda gösterilen alt menü */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;