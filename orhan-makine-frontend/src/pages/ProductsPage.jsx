import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/ProductsPage.css';

const ProductsPage = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "CORA Kompresör",
      category: "kompresor",
      subCategory: "elektrikli",
      brand: "CORA",
      price: 7900,
      originalPrice: 8500,
      image: "/images/CORA-KOMPRESOR-2.5HP-100L.png",
      description: "Güçlü ve sessiz çalışan kompresör",
      features: ["Yüksek basınç kapasitesi", "Düşük enerji tüketimi", "Sessiz çalışma", "2 yıl garanti"],
      specifications: {
        guc: "2.5 HP",
        kapasite: "100 Litre",
        basinc: "8 Bar",
        agirlik: "45 kg"
      },
      inStock: true,
      isNew: true,
      isCampaign: true,
      isSponsored: false,
      rating: 4.5,
      reviewCount: 24
    },
    {
      id: 2,
      name: "Makita Sunta Kesme Makinesi",
      category: "kesme-makineleri",
      subCategory: "elektrikli",
      brand: "Makita",
      price: 5900,
      originalPrice: 6500,
      image: "/images/HS7601-SUNTA-KESME.png",
      description: "Hassas kesim için ideal makine",
      features: ["Hassas kesim", "Ergonomik tasarım", "Güçlü motor", "Toz emme bağlantısı"],
      specifications: {
        diskCap: "190 mm",
        devir: "5000 rpm",
        guc: "1200W",
        agirlik: "3.8 kg"
      },
      inStock: true,
      isNew: false,
      isCampaign: true,
      isSponsored: true,
      rating: 4.3,
      reviewCount: 18
    },
    {
      id: 3,
      name: "Makita Dekupaj Elektronik",
      category: "kesme-makineleri",
      subCategory: "elektrikli",
      brand: "Makita",
      price: 5300,
      originalPrice: 5800,
      image: "/images/MAKITA-4350CT-DEKUPAJ-ELEKTRONIK1.png",
      description: "Elektronik hız kontrolü ile dekupaj",
      features: ["Değişken hız", "Kolay bıçak değişimi", "Hassas kesim", "Pendulum ayarı"],
      specifications: {
        strok: "26 mm",
        devir: "500-3100 rpm",
        guc: "450W",
        agirlik: "2.1 kg"
      },
      inStock: true,
      isNew: true,
      isCampaign: false,
      isSponsored: true,
      rating: 4.7,
      reviewCount: 32
    },
    {
      id: 4,
      name: "Makita Akülü Kırıcı Delici",
      category: "kirici-delici",
      subCategory: "akulu",
      brand: "Makita",
      price: 14500,
      originalPrice: 15900,
      image: "/images/MAKITA-DHR241RMJ-AKULU-KIRICI-DELICI-HILTI1.png",
      description: "Güçlü akülü kırıcı delici hilti",
      features: ["Kablosuz özgürlük", "Yüksek darbe gücü", "Uzun pil ömrü", "3 modlu çalışma"],
      specifications: {
        darbeGucu: "2.7 J",
        batarya: "18V 5Ah",
        maxDelme: "13 mm",
        agirlik: "2.8 kg"
      },
      inStock: true,
      isNew: false,
      isCampaign: true,
      isSponsored: false,
      rating: 4.8,
      reviewCount: 41
    },
    {
      id: 5,
      name: "Makita Isıtıcı",
      category: "isitici",
      subCategory: "elektrikli",
      brand: "Makita",
      price: 2200,
      originalPrice: 2500,
      image: "/images/MAKITA-HG5030K-ISITICI1.png",
      description: "Portatif ısıtma çözümü",
      features: ["Hızlı ısınma", "Ayarlanabilir sıcaklık", "Güvenli kullanım", "Taşınabilir tasarım"],
      specifications: {
        guc: "2000W",
        alan: "20 m²",
        termostat: "Var",
        agirlik: "2.5 kg"
      },
      inStock: false,
      isNew: true,
      isCampaign: false,
      isSponsored: false,
      rating: 4.2,
      reviewCount: 15
    },
    {
      id: 6,
      name: "Makita Tablalı Gönye Tezgah",
      category: "kesme-makineleri",
      subCategory: "elektrikli",
      brand: "Makita",
      price: 18500,
      originalPrice: 19900,
      image: "/images/MAKITA-LH1040-TABLALI-GONYE-TEZGAH.png",
      description: "Profesyonel gönye kesim tezgahı",
      features: ["Hassas açı ayarı", "Geniş kesim kapasitesi", "Sağlam yapı", "Lazer kılavuz"],
      specifications: {
        diskCap: "255 mm",
        kesimDerinlik: "90 mm",
        acı: "0-45°",
        agirlik: "12.5 kg"
      },
      inStock: true,
      isNew: false,
      isCampaign: true,
      isSponsored: true,
      rating: 4.6,
      reviewCount: 29
    },
    {
      id: 7,
      name: "Makita Akülü Darbeli Matkap",
      category: "matkap",
      subCategory: "akulu",
      brand: "Makita",
      price: 8200,
      originalPrice: 8900,
      image: "/images/MAKITA-DHP484RTJ-AKULU-DARBELI-MATKAP1.png",
      description: "Profesyonel akülü darbeli matkap",
      features: ["Yüksek tork", "Uzun batarya ömrü", "Hızlı şarj", "LED aydınlatma"],
      specifications: {
        tork: "50 Nm",
        batarya: "18V 4Ah",
        maxDelme: "13 mm",
        agirlik: "1.5 kg"
      },
      inStock: true,
      isNew: true,
      isCampaign: false,
      isSponsored: false,
      rating: 4.4,
      reviewCount: 22
    },
    {
      id: 8,
      name: "Makita Aküsüz Darbeli Matkap",
      category: "matkap",
      subCategory: "elektrikli",
      brand: "Makita",
      price: 4500,
      originalPrice: 5200,
      image: "/images/akusuzdarbelimatkap1.png",
      description: "Güçlü kablolu darbeli matkap",
      features: ["Sürekli güç", "Yüksek performans", "Dayanıklı tasarım", "Emniyet kilitli"],
      specifications: {
        guc: "600W",
        devir: "0-2800 rpm",
        maxDelme: "10 mm",
        agirlik: "1.8 kg"
      },
      inStock: false,
      isNew: false,
      isCampaign: true,
      isSponsored: false,
      rating: 4.1,
      reviewCount: 17
    }
  ]);

  const [filteredProducts, setFilteredProducts] = useState(products);
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
  const [favorites, setFavorites] = useState([]);
  const [imageErrors, setImageErrors] = useState({}); // Resim hatalarını takip etmek için

  // Kategorileri ve markaları dinamik olarak al
  const categories = [...new Set(products.map(product => product.category))];
  const brands = [...new Set(products.map(product => product.brand))];

  // Filtreleme fonksiyonu
  useEffect(() => {
    let result = products;

    // Stok durumu filtresi (radio button)
    if (showOnlyInStock) {
      result = result.filter(product => product.inStock);
    }

    // Kategori filtreleme
    if (selectedCategories.length > 0) {
      result = result.filter(product => selectedCategories.includes(product.category));
    }

    // Marka filtreleme
    if (selectedBrands.length > 0) {
      result = result.filter(product => selectedBrands.includes(product.brand));
    }

    // Özel filtreler
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

    // Arama filtreleme
    if (searchTerm) {
      result = result.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sıralama
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

  // Resim yükleme hatası handler'ı
  const handleImageError = (productId) => {
    setImageErrors(prev => ({
      ...prev,
      [productId]: true
    }));
  };

  // Varsayılan resim URL'i
  const getDefaultImage = (productName) => {
    // Ürün tipine göre varsayılan resim belirleyebilirsin
    return "/images/default-product.png"; // public/images klasörüne bir default resim koy
  };

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

  const toggleFavorite = (productId) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
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
        {/* Sol Sidebar - Filtreler */}
        <div className="products-sidebar">
          
          {/* STOK DURUMU - RADIO BUTTON */}
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

          {/* Ürün Grupları */}
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
                  {category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')}
                </label>
              ))}
            </div>
          </div>

          {/* Marka Filtresi */}
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

          {/* Filtre Seçenekleri */}
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
                Kampanyalı Ürünler ({products.filter(p => p.isCampaign).length})
              </label>
              <label className="checkbox-item">
                <input
                  type="checkbox"
                  checked={filters.sponsored}
                  onChange={(e) => setFilters(prev => ({...prev, sponsored: e.target.checked}))}
                />
                <span className="checkmark"></span>
                Sponsor Ürünler ({products.filter(p => p.isSponsored).length})
              </label>
              <label className="checkbox-item">
                <input
                  type="checkbox"
                  checked={filters.new}
                  onChange={(e) => setFilters(prev => ({...prev, new: e.target.checked}))}
                />
                <span className="checkmark"></span>
                Yeni Ürünler ({products.filter(p => p.isNew).length})
              </label>
              <label className="checkbox-item">
                <input
                  type="checkbox"
                  checked={filters.discounted}
                  onChange={(e) => setFilters(prev => ({...prev, discounted: e.target.checked}))}
                />
                <span className="checkmark"></span>
                İndirimli Ürünler ({products.filter(p => p.price < p.originalPrice).length})
              </label>
            </div>
          </div>

          {/* Hızlı Arama */}
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

        {/* Sağ İçerik - Ürün Listesi */}
        <div className="products-content">
          {/* Üst Bilgi Bar */}
          <div className="products-header">
            <div className="products-info">
              <span className="products-count">Toplam {filteredProducts.length} ürün</span>
            </div>
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

          {/* Ürün Grid */}
          <div className="products-grid">
            {filteredProducts.map(product => (
              <div key={product.id} className="product-card">
                {/* Ürün Resmi ve Etiketler */}
                <div className="product-image">
                  <img 
                    src={imageErrors[product.id] ? getDefaultImage(product.name) : product.image}
                    alt={product.name}
                    onError={() => handleImageError(product.id)}
                    loading="lazy" // Performans için lazy loading
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
                  <button 
                    className={`favorite-btn ${favorites.includes(product.id) ? 'active' : ''}`}
                    onClick={() => toggleFavorite(product.id)}
                    aria-label="Favorilere ekle"
                  >
                    ❤
                  </button>
                </div>

                {/* Ürün Bilgileri */}
                <div className="product-info">
                  <div className="product-brand">{product.brand}</div>
                  <h3 className="product-name">{product.name}</h3>
                  <div className="product-description">{product.description}</div>

                  {/* Fiyat Bilgisi */}
                  <div className="product-pricing">
                    {product.price < product.originalPrice && (
                      <div className="original-price">{formatPrice(product.originalPrice)} TL</div>
                    )}
                    <div className="current-price">{formatPrice(product.price)} TL</div>
                  </div>

                  {/* Aksiyon Butonları */}
                  <div className="product-actions">
                    <button 
                      className="add-to-cart-btn" 
                      disabled={!product.inStock}
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

          {/* Ürün Bulunamadı */}
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