import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaSearch, FaExclamationTriangle } from 'react-icons/fa';
import '../styles/NotFoundPage.css';

const NotFoundPage = () => {
  return (
    <div className="not-found-page">
      <div className="container">
        <div className="not-found-content">
          <div className="not-found-icon">
            <FaExclamationTriangle />
          </div>
          
          <h1>404</h1>
          <h2>Sayfa Bulunamadı</h2>
          
          <p className="not-found-description">
            Aradığınız sayfa mevcut değil veya taşınmış olabilir.
          </p>
          
          <div className="not-found-actions">
            <Link to="/" className="btn-home">
              <FaHome /> Ana Sayfaya Dön
            </Link>
            
            <Link to="/products" className="btn-products">
              <FaSearch /> Ürünlere Göz At
            </Link>
          </div>
          
          <div className="not-found-help">
            <p>Yardıma mı ihtiyacınız var?</p>
            <Link to="/contact">İletişime Geçin</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;