// pages/ProductsPage.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  Search, 
  Filter, 
  Grid, 
  List, 
  ShoppingCart, 
  Star, 
  ChevronDown,
  Check,
  X,
  Battery,
  BatteryCharging,
  Zap
} from "lucide-react";
import "../styles/ProductsPage.css";

const ProductsPage = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "CORA Kompresör",
      category: "kompresor",
      subCategory: "elektrikli",
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
      rating: 4.5,
      reviewCount: 24
    },
    {
      id: 2,
      name: "Makita Sunta Kesme Makinesi",
      category: "kesme-makineleri",
      subCategory: "elektrikli",
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
      rating: 4.3,
      reviewCount: 18
    },
    {
      id: 3,
      name: "Makita Dekupaj Elektronik",
      category: "kesme-makineleri",
      subCategory: "elektrikli",
      price: 5300,
      originalPrice: 5800,
      image: "/images/MAKITA 4350CT DEKUPAJ ELEKTRONIK1.png",
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
      rating: 4.7,
      reviewCount: 32
    },
    {
      id: 4,
      name: "Makita Akülü Kırıcı Delici",
      category: "kirici-delici",
      subCategory: "akulu",
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
      rating: 4.8,
      reviewCount: 41
    },
    {
      id: 5,
      name: "Makita Isıtıcı",
      category: "isitici",
      subCategory: "elektrikli",
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
      rating: 4.2,
      reviewCount: 15
    },
    {
      id: 6,
      name: "Makita Tablalı Gönye Tezgah",
      category: "kesme-makineleri",
      subCategory: "elektrikli",
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
      rating: 4.6,
      reviewCount: 29
    },
    {
      id: 7,
      name: "Makita Akülü Darbeli Matkap",
      category: "matkap",
      subCategory: "akulu",
      price: 8200,
      originalPrice: 8900,
      image: "/images/makita-akulu-darbeli-matkap.png",
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
      rating: 4.4,
      reviewCount: 22
    },
    {
      id: 8,
      name: "Makita Aküsüz Darbeli Matkap",
      category: "matkap",
      subCategory: "elektrikli",
      price: 4500,
      originalPrice: 5200,
      image: "/images/makita-akusuz-darbeli-matkap.png",
      description: "Güçlü kablolu darbeli matkap",
      features: ["Sürekli güç", "Yüksek performans", "Dayanıklı tasarım", "Emniyet kilitli"],
      specifications: {
        guc: "600W",
        devir: "0-2800 rpm",
        maxDelme: "10 mm",
        agirlik: "1.8 kg"
      },
      inStock: true,
      isNew: false,
      rating: 4.1,
      reviewCount: 17
    }
  ]);

  const [filteredProducts, setFilteredProducts] = useState(products);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSubCategory, setSelectedSubCategory] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 20000]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [newProductsOnly, setNewProductsOnly] = useState(false);
  const [sortBy, setSortBy] = useState("name");
  const [viewMode, setViewMode] = useState("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [cart, setCart] = useState([]);

  // Kategorileri ve alt kategorileri al
  const categories = [
    { value: "all", label: "Tüm Kategoriler", count: products.length },
    { value: "kompresor", label: "Kompresörler", count: products.filter(p => p.category === "kompresor").length },
    { value: "kesme-makineleri", label: "Kesme Makineleri", count: products.filter(p => p.category === "kesme-makineleri").length },
    { value: "kirici-delici", label: "Kırıcı Deliciler", count: products.filter(p => p.category === "kirici-delici").length },
    { value: "matkap", label: "Matkaplar", count: products.filter(p => p.category === "matkap").length },
    { value: "isitici", label: "Isıtıcılar", count: products.filter(p => p.category === "isitici").length }
  ];

  const subCategories = [
    { value: "all", label: "Tüm Alt Kategoriler", icon: null },
    { value: "akulu", label: "Akülü Ürünler", icon: <BatteryCharging className="w-4 h-4" /> },
    { value: "elektrikli", label: "Elektrikli Ürünler", icon: <Zap className="w-4 h-4" /> }
  ];

  // Filtreleme ve sıralama
  useEffect(() => {
    let filtered = products;

    // Arama filtresi
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Kategori filtresi
    if (selectedCategory !== "all") {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Alt kategori filtresi
    if (selectedSubCategory !== "all") {
      filtered = filtered.filter(product => product.subCategory === selectedSubCategory);
    }

    // Fiyat filtresi
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Stok filtresi
    if (inStockOnly) {
      filtered = filtered.filter(product => product.inStock);
    }

    // Yeni ürün filtresi
    if (newProductsOnly) {
      filtered = filtered.filter(product => product.isNew);
    }

    // Sıralama
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "name":
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    setFilteredProducts(filtered);
  }, [products, searchTerm, selectedCategory, selectedSubCategory, priceRange, inStockOnly, newProductsOnly, sortBy]);

  // Sepete ekleme
  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // Filtreleri sıfırla
  const resetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setSelectedSubCategory("all");
    setPriceRange([0, 20000]);
    setInStockOnly(false);
    setNewProductsOnly(false);
    setSortBy("name");
  };

  // Format price
  const formatPrice = (price) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY'
    }).format(price);
  };

  // Render yıldızlar
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < Math.floor(rating) ? 'text-yellow-400 fill-current' :
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="products-page">
      {/* Header */}
      <div className="products-header">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/" className="breadcrumb-link">Anasayfa</Link>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-current">Ürünler</span>
          </div>
          <h1 className="page-title">Ürünler</h1>
          <p className="page-description">
            Geniş ürün yelpazemizde ihtiyacınıza uygun profesyonel ekipmanları keşfedin
          </p>
        </div>
      </div>

      <div className="container">
        <div className="products-layout">
          {/* Sidebar - Filtreler */}
          <aside className={`products-sidebar ${showFilters ? 'sidebar-open' : ''}`}>
            <div className="sidebar-header">
              <h3>Filtreler</h3>
              <button 
                className="close-filters"
                onClick={() => setShowFilters(false)}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="filter-group">
              <h4 className="filter-title">Kategori</h4>
              <div className="filter-options">
                {categories.map(category => (
                  <button
                    key={category.value}
                    className={`filter-option ${selectedCategory === category.value ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(category.value)}
                  >
                    <span className="filter-option-text">
                      {category.label}
                      <span className="filter-count">({category.count})</span>
                    </span>
                    {selectedCategory === category.value && <Check className="w-4 h-4" />}
                  </button>
                ))}
              </div>
            </div>

            <div className="filter-group">
              <h4 className="filter-title">Alt Kategori</h4>
              <div className="filter-options">
                {subCategories.map(subCategory => (
                  <button
                    key={subCategory.value}
                    className={`filter-option ${selectedSubCategory === subCategory.value ? 'active' : ''}`}
                    onClick={() => setSelectedSubCategory(subCategory.value)}
                  >
                    <span className="filter-option-text">
                      {subCategory.icon && <span className="filter-icon">{subCategory.icon}</span>}
                      {subCategory.label}
                    </span>
                    {selectedSubCategory === subCategory.value && <Check className="w-4 h-4" />}
                  </button>
                ))}
              </div>
            </div>

            <div className="filter-group">
              <h4 className="filter-title">Fiyat Aralığı</h4>
              <div className="price-filter">
                <div className="price-inputs">
                  <input
                    type="number"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                    className="price-input"
                    min="0"
                    max="20000"
                  />
                  <span>-</span>
                  <input
                    type="number"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                    className="price-input"
                    min="0"
                    max="20000"
                  />
                </div>
                <input
                  type="range"
                  min="0"
                  max="20000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                  className="price-range"
                />
              </div>
            </div>

            <div className="filter-group">
              <h4 className="filter-title">Diğer Filtreler</h4>
              <div className="filter-options">
                <label className="checkbox-option">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                  />
                  <span className="checkmark"></span>
                  Sadece Stoktaki Ürünler
                </label>
                <label className="checkbox-option">
                  <input
                    type="checkbox"
                    checked={newProductsOnly}
                    onChange={(e) => setNewProductsOnly(e.target.checked)}
                  />
                  <span className="checkmark"></span>
                  Sadece Yeni Ürünler
                </label>
              </div>
            </div>

            <button className="reset-filters" onClick={resetFilters}>
              Filtreleri Sıfırla
            </button>
          </aside>

          {/* Main Content */}
          <main className="products-main">
            {/* Toolbar */}
            <div className="products-toolbar">
              <div className="toolbar-left">
                <button 
                  className="filter-toggle"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className="w-4 h-4" />
                  Filtreler
                </button>
                <span className="results-count">
                  {filteredProducts.length} ürün bulundu
                </span>
              </div>

              <div className="toolbar-right">
                <div className="view-toggle">
                  <button
                    className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                    onClick={() => setViewMode('list')}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>

                <div className="sort-select">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="sort-dropdown"
                  >
                    <option value="name">İsme Göre (A-Z)</option>
                    <option value="price-low">Fiyat (Düşük-Yüksek)</option>
                    <option value="price-high">Fiyat (Yüksek-Düşük)</option>
                    <option value="rating">Değerlendirme</option>
                  </select>
                  <ChevronDown className="sort-arrow" />
                </div>
              </div>
            </div>

            {/* Search Bar */}
            <div className="search-bar">
              <Search className="search-icon" />
              <input
                type="text"
                placeholder="Ürün ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              {searchTerm && (
                <button 
                  className="clear-search"
                  onClick={() => setSearchTerm("")}
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Products Grid/List */}
            {filteredProducts.length === 0 ? (
              <div className="no-products">
                <div className="no-products-icon">🔍</div>
                <h3>Ürün bulunamadı</h3>
                <p>Arama kriterlerinize uygun ürün bulunamadı. Lütfen filtreleri değiştirin.</p>
                <button className="reset-search" onClick={resetFilters}>
                  Filtreleri Sıfırla
                </button>
              </div>
            ) : (
              <div className={`products-container ${viewMode}-view`}>
                {filteredProducts.map(product => (
                  <div key={product.id} className="product-item">
                    <div className="product-image">
                      <img src={product.image} alt={product.name} />
                      <div className="product-badges">
                        {product.isNew && <span className="badge new">Yeni</span>}
                        {!product.inStock && <span className="badge out-of-stock">Stokta Yok</span>}
                        {product.originalPrice > product.price && (
                          <span className="badge discount">
                            %{Math.round((1 - product.price / product.originalPrice) * 100)}
                          </span>
                        )}
                      </div>
                      <button 
                        className="quick-add-btn"
                        onClick={() => addToCart(product)}
                        disabled={!product.inStock}
                      >
                        <ShoppingCart className="w-4 h-4" />
                        Sepete Ekle
                      </button>
                    </div>

                    <div className="product-info">
                      <div className="product-category">
                        {subCategories.find(sc => sc.value === product.subCategory)?.icon}
                        {categories.find(c => c.value === product.category)?.label}
                      </div>

                      <h3 className="product-name">
                        <Link 
                          to={`/urunler/${product.name
                            .toLowerCase()
                            .replace(/ /g, "-")
                            .replace(/[ıİ]/g, "i")
                            .replace(/[öÖ]/g, "o")
                            .replace(/[üÜ]/g, "u")
                            .replace(/[şŞ]/g, "s")
                            .replace(/[çÇ]/g, "c")
                            .replace(/[ğĞ]/g, "g")
                          }`}
                        >
                          {product.name}
                        </Link>
                      </h3>

                      <p className="product-description">{product.description}</p>

                      <div className="product-rating">
                        <div className="stars">
                          {renderStars(product.rating)}
                        </div>
                        <span className="rating-text">({product.reviewCount})</span>
                      </div>

                      <div className="product-price">
                        {product.originalPrice > product.price && (
                          <span className="original-price">
                            {formatPrice(product.originalPrice)}
                          </span>
                        )}
                        <span className="current-price">
                          {formatPrice(product.price)}
                        </span>
                      </div>

                      <div className="product-features">
                        {product.features.slice(0, 3).map((feature, index) => (
                          <span key={index} className="feature-tag">
                            {feature}
                          </span>
                        ))}
                      </div>

                      <div className="product-actions">
                        <button 
                          className="add-to-cart-btn"
                          onClick={() => addToCart(product)}
                          disabled={!product.inStock}
                        >
                          <ShoppingCart className="w-4 h-4" />
                          {product.inStock ? 'Sepete Ekle' : 'Stokta Yok'}
                        </button>
                        <Link 
                          to={`/urunler/${product.name
                            .toLowerCase()
                            .replace(/ /g, "-")
                            .replace(/[ıİ]/g, "i")
                            .replace(/[öÖ]/g, "o")
                            .replace(/[üÜ]/g, "u")
                            .replace(/[şŞ]/g, "s")
                            .replace(/[çÇ]/g, "c")
                            .replace(/[ğĞ]/g, "g")
                          }`}
                          className="view-details-btn"
                        >
                          Detayları Gör
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Load More (isteğe bağlı) */}
            {filteredProducts.length > 0 && (
              <div className="load-more-section">
                <button className="load-more-btn">
                  Daha Fazla Ürün Yükle
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;