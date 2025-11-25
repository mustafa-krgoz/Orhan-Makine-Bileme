import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar.jsx";
import Footer from "./components/Footer/Footer.jsx";

import HomePage from "./pages/HomePage.jsx";
import CategoryPage from "./pages/CategoryPage.jsx";
import ProductDetailPage from "./pages/ProductDetailPage.jsx";
import CartPage from "./pages/CartPage.jsx";
import CheckoutPage from "./pages/CheckoutPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-white text-gray-900">

        {/* Navbar */}
        <Navbar />

        {/* İçerik */}
        <main className="flex-grow pt-6 pb-10">
          <div className="container mx-auto px-4">
            <Routes>

              {/* Ana Sayfa */}
              <Route path="/" element={<HomePage />} />

              {/* Kategoriler */}
              <Route path="/category/:categoryId" element={<CategoryPage />} />
              <Route path="/products" element={<CategoryPage />} />
              <Route path="/services" element={<CategoryPage />} />

              {/* Ürün Detayı */}
              <Route path="/product/:productId" element={<ProductDetailPage />} />

              {/* Sepet */}
              <Route path="/cart" element={<CartPage />} />

              {/* Ödeme */}
              <Route path="/checkout" element={<CheckoutPage />} />

              {/* Auth */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              {/* Hakkımızda / İletişim - geçici */}
              <Route path="/about" element={<HomePage />} />
              <Route path="/contact" element={<HomePage />} />

              {/* 404 */}
              <Route
                path="*"
                element={
                  <div className="text-center py-20">
                    <h1 className="text-5xl font-bold text-gray-800 mb-4">404</h1>
                    <p className="text-lg text-gray-600 mb-8">
                      Aradığınız sayfa bulunamadı.
                    </p>
                    <a
                      href="/"
                      className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
                    >
                      Ana Sayfaya Dön
                    </a>
                  </div>
                }
              />
            </Routes>
          </div>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;