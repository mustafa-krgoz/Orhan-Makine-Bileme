import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// GLOBAL CONTEXT'LER
import { FavoritesProvider } from "./context/FavoritesContext";
import { CartProvider } from "./context/CartContext";

// COMPONENTS
import Navbar from "./components/Navbar/Navbar.jsx";
import Footer from "./components/Footer/Footer.jsx";

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

// TOAST CONTAINER
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    // ⭐ GLOBAL CONTEXT'LER
    <CartProvider>
      <FavoritesProvider>
        <Router>
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

                {/* ÜRÜN DETAY SAYFASI — site.com/product/1, site.com/product/2 */}
                <Route path="/product/:id" element={<ProductDetailPage />} />

                {/* ⭐ SEPET SAYFASI — site.com/cart */}
                <Route path="/cart" element={<CartPage />} />

                {/* ⭐ ÖDEME SAYFASI — site.com/checkout */}
                <Route path="/checkout" element={<CheckoutPage />} />

                {/* ⭐ FAVORİLER SAYFASI — site.com/favorites */}
                <Route path="/favorites" element={<FavoritesPage />} />

                {/* HİZMETLER SAYFASI — site.com/services */}
                <Route path="/services" element={<ServicesPage />} />

                {/* İLETİŞİM SAYFASI — site.com/contact */}
                <Route path="/contact" element={<ContactPage />} />

                {/* GİRİŞ SAYFASI — site.com/login */}
                <Route path="/login" element={<LoginPage />} />

                {/* 404 SAYFASI — site.com/404 */}
                <Route path="/404" element={<NotFoundPage />} />

                {/* ⭐ 404 YÖNLENDİRME — tanımlanmamış tüm URL'ler için */}
                <Route path="*" element={<NotFoundPage />} />

              </Routes>
            </main>

            {/* ⭐ FOOTER — her sayfanın altında gösterilir */}
            <Footer />
            
          </div>
        </Router>
      </FavoritesProvider>
    </CartProvider>
  );
}

export default App;