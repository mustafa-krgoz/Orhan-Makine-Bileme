import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/ProductsPage.css';
import { productsData } from "../data/productsData";
import { useFavorites } from "../context/FavoritesContext"; // ✅ Context import
import { useCart } from "../context/CartContext";

const ProductsPage = () => {
  const [products, setProducts] = useState(productsData);
  const [filteredProducts, setFilteredProducts] = useState(productsData);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [showOnlyInStock, setShowOnlyInStock] = useState(false);
  const [filters, setFilters] = useState({
    campaign: false,
    sponsored: false,
    new: false,
    discounted: false
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('recommended');
  const { addToCart } = useCart();

  // ✅ FAVORİLER CONTEXT'TEN GELİYOR - TÜM DEĞERLERİ AL
  const { isFavorite, toggleFavorite } = useFavorites();

  const [imageErrors, setImageErrors] = useState({});

  const categories = [...new Set(products.map(product => product.category))];
  const brands = [...new Set(products.map(product => product.brand))];

  useEffect(() => {
    let result = products;

    if (showOnlyInStock) {
      result = result.filter(product => product.inStock);
    }

    if (selectedCategories.length > 0) {
      result = result.filter(product => selectedCategories.includes(product.category));
    }

    if (selectedBrands.length > 0) {
      result = result.filter(product => selectedBrands.includes(product.brand));
    }

    if (filters.campaign) {
      result = result.filter(product => product.isCampaign);
    }
    if (filters.sponsored) {
      result = result.filter(product => product.isSponsored);
    }
    if (filters.new) {
      result = result.filter(product => product.isNew);
    }
    if (filters.discounted) {
      result = result.filter(product => product.price < product.originalPrice);
    }

    if (searchTerm) {
      result = result.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.productCode.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    switch (sortOption) {
      case 'price-low':
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case 'name':
        result = [...result].sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'rating':
        result = [...result].sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    setFilteredProducts(result);
  }, [selectedCategories, selectedBrands, showOnlyInStock, filters, searchTerm, sortOption, products]);

  const handleImageError = (productId) => {
    setImageErrors(prev => ({
      ...prev,
      [productId]: true
    }));
  };

  const getDefaultImage = () => "/images/default-product.png";

  const toggleCategory = (category) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const toggleBrand = (brand) => {
    setSelectedBrands(prev => 
      prev.includes(brand) 
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('tr-TR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(price);
  };

  const calculateDiscount = (original, current) => {
    return Math.round(((original - current) / original) * 100);
  };

  return (
    <div className="products-page">
      <div className="products-container">
        
        {/* SOL SİDEBAR */}
        <div className="products-sidebar">
          
          <div className="filter-group">
            <h3>Stok Durumu</h3>
            <div className="radio-options">
              <label className="radio-item">
                <input
                  type="radio"
                  name="stock"
                  checked={!showOnlyInStock}
                  onChange={() => setShowOnlyInStock(false)}
                />
                <span className="radio-mark"></span>
                Tüm Ürünler ({products.length})
              </label>

              <label className="radio-item">
                <input
                  type="radio"
                  name="stock"
                  checked={showOnlyInStock}
                  onChange={() => setShowOnlyInStock(true)}
                />
                <span className="radio-mark"></span>
                Stoktakiler ({products.filter(p => p.inStock).length})
              </label>
            </div>
          </div>

          <div className="filter-group">
            <h3>Ürün Grupları</h3>
            <div className="category-list">
              {categories.map(category => (
                <label key={category} className="checkbox-item">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category)}
                    onChange={() => toggleCategory(category)}
                  />
                  <span className="checkmark"></span>
                  {category}
                </label>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <h3>Marka</h3>
            <div className="brand-list">
              {brands.map(brand => (
                <label key={brand} className="checkbox-item">
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand)}
                    onChange={() => toggleBrand(brand)}
                  />
                  <span className="checkmark"></span>
                  {brand}
                </label>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <h3>Filtre Seçenekleri</h3>
            <div className="filter-options">
              <label className="checkbox-item">
                <input
                  type="checkbox"
                  checked={filters.campaign}
                  onChange={(e) => setFilters(prev => ({...prev, campaign: e.target.checked}))}
                />
                <span className="checkmark"></span>
                Kampanyalı Ürünler
              </label>

              <label className="checkbox-item">
                <input
                  type="checkbox"
                  checked={filters.sponsored}
                  onChange={(e) => setFilters(prev => ({...prev, sponsored: e.target.checked}))}
                />
                <span className="checkmark"></span>
                Sponsor Ürünler
              </label>

              <label className="checkbox-item">
                <input
                  type="checkbox"
                  checked={filters.new}
                  onChange={(e) => setFilters(prev => ({...prev, new: e.target.checked}))}
                />
                <span className="checkmark"></span>
                Yeni Ürünler
              </label>

              <label className="checkbox-item">
                <input
                  type="checkbox"
                  checked={filters.discounted}
                  onChange={(e) => setFilters(prev => ({...prev, discounted: e.target.checked}))}
                />
                <span className="checkmark"></span>
                İndirimli Ürünler
              </label>
            </div>
          </div>

          <div className="filter-group">
            <h3>Hızlı Arama</h3>
            <div className="search-box">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Ürün ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
          </div>
        </div>

        {/* SAĞ ÜRÜN LİSTE ALANI */}
        <div className="products-content">

          <div className="products-header">
            <span className="products-count">Toplam {filteredProducts.length} ürün</span>
            <div className="sort-options">
              <label>Sıralama:</label>
              <select 
                value={sortOption} 
                onChange={(e) => setSortOption(e.target.value)}
                className="sort-select"
              >
                <option value="recommended">Önerilen Sıralama</option>
                <option value="price-low">Fiyat (Düşük → Yüksek)</option>
                <option value="price-high">Fiyat (Yüksek → Düşük)</option>
                <option value="name">İsim (A → Z)</option>
                <option value="rating">Değerlendirme</option>
              </select>
            </div>
          </div>

          <div className="products-grid">
            {filteredProducts.map(product => (
              <div key={product.id} className="product-card">

                <div className="product-image">
                  <img 
                    src={imageErrors[product.id] ? getDefaultImage() : product.image}
                    alt={product.name}
                    onError={() => handleImageError(product.id)}
                    loading="lazy"
                  />

                  <div className="product-badges">
                    {product.price < product.originalPrice && (
                      <span className="badge discount">
                        %{calculateDiscount(product.originalPrice, product.price)}
                      </span>
                    )}
                    {product.isNew && <span className="badge new">YENİ</span>}
                    {product.isCampaign && <span className="badge campaign">KAMPANYA</span>}
                  </div>

                  {/* ✅ FAVORİ BUTONU - isFavorite fonksiyonunu kullanıyoruz */}
                  <button 
                    className={`favorite-btn ${isFavorite(product.id) ? 'active' : ''}`}
                    onClick={() => toggleFavorite(product.id)}
                    aria-label={isFavorite(product.id) ? "Favorilerden çıkar" : "Favorilere ekle"}
                  >
                    {isFavorite(product.id) ? '❤️' : '🤍'}
                  </button>
                </div>

                <div className="product-info">
                  <div className="product-brand">{product.brand}</div>
                  <h3 className="product-name">{product.name}</h3>
                  
                  {/* ✅ ÜRÜN KODU EKLENDİ */}
                  <div className="product-code">
                    <span className="product-code-label">Ürün Kodu:</span>
                    <span className="product-code-value">{product.productCode}</span>
                  </div>
                  
                  <div className="product-description">{product.description}</div>

                  <div className="product-pricing">
                    {product.price < product.originalPrice && (
                      <div className="original-price">{formatPrice(product.originalPrice)} TL</div>
                    )}
                    <div className="current-price">{formatPrice(product.price)} TL</div>
                  </div>

                  <div className="product-actions">
                    <button
                      className="add-to-cart-btn"
                      disabled={!product.inStock}
                      onClick={() => addToCart(product, 1)}   // ← sepete ekle
                    >
                      {product.inStock ? 'SEPETE EKLE' : 'STOKTA YOK'}
                    </button>

                    <Link to={`/product/${product.id}`} className="view-details-btn">
                      Detaylı İncele
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="no-products">
              <h3>Ürün bulunamadı</h3>
              <p>Lütfen filtrelerinizi değiştirip tekrar deneyin.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;