import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar.jsx";
import Footer from "./components/Footer/Footer.jsx";

import HomePage from "./pages/HomePage.jsx";
import ProductsPage from "./pages/ProductsPage.jsx";
import ProductDetailPage from "./pages/ProductDetailPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import AdminRegisterPage from "./pages/AdminRegisterPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";


function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-white text-gray-900">

        {/* Navbar */}
        <Navbar />

        {/* İçerik */}
        <main className="flex-grow">
          <Routes>

            {/* Ana Sayfa */}
            <Route path="/" element={<HomePage />} />

            {/* Ürünler Sayfası */}
            <Route path="/products" element={<ProductsPage />} />

            {/* Ürün Detay Sayfası */}
            <Route path="/urunler/:productSlug" element={<ProductDetailPage />} />

            {/* İletişim Sayfası */}
            <Route path="/contact" element={<ContactPage />} />

            {/* Auth */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/kayit" element={<AdminRegisterPage />} />

            {/* Hakkımızda / İletişim */}
            <Route path="/hakkimizda" element={
              <div className="container mx-auto px-4 py-16">
                <h1 className="text-4xl font-bold text-center mb-8">Hakkımızda</h1>
                <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto">
                  Orhan Makine olarak 40 yılı aşkın süredir sektörde hizmet veriyoruz.
                </p>
              </div>
            } />
            
            <Route path="/contact" element={
              <div className="container mx-auto px-4 py-16">
                <h1 className="text-4xl font-bold text-center mb-8">İletişim</h1>
                <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto">
                  Bize ulaşmak için iletişim bilgilerimizi kullanabilirsiniz.
                </p>
              </div>
            } />

            {/* 404 Sayfası */}
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

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;