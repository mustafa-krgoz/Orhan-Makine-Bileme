// pages/ProductDetailPage.jsx
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  ShoppingCart, 
  Heart, 
  Share2, 
  Star, 
  Check, 
  Truck, 
  Shield, 
  ArrowLeft,
  Plus,
  Minus
} from "lucide-react";
import "../styles/ProductDetailPage.css";

const ProductDetailPage = () => {
  const { productSlug } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [isInWishlist, setIsInWishlist] = useState(false);

  // Örnek ürün verileri
  const products = [
    {
      id: 1,
      slug: "cora-kompresor",
      name: "CORA Kompresör",
      category: "kompresor",
      price: 7900,
      originalPrice: 8500,
      images: [
        "/images/CORA-KOMPRESOR-2.5HP-100L.png",
        "/images/CORA-KOMPRESOR-2.5HP-100L-2.png",
        "/images/CORA-KOMPRESOR-2.5HP-100L-3.png"
      ],
      description: "Profesyonel kullanım için tasarlanmış güçlü ve sessiz çalışan kompresör. Yüksek basınç kapasitesi ve düşük enerji tüketimi ile öne çıkar.",
      features: [
        "Yüksek basınç kapasitesi",
        "Düşük enerji tüketimi",
        "Sessiz çalışma",
        "2 yıl garanti",
        "Paslanmaz çelik tank",
        "Otomatik basınç regülatörü"
      ],
      specifications: {
        "Güç": "2.5 HP",
        "Tank Kapasitesi": "100 Litre",
        "Maksimum Basınç": "8 Bar",
        "Ağırlık": "45 kg",
        "Ses Seviyesi": "65 dB",
        "Garanti": "2 Yıl"
      },
      inStock: true,
      isNew: true,
      rating: 4.5,
      reviewCount: 24,
      sku: "COR-250-100",
      brand: "CORA"
    },
    {
      id: 2,
      slug: "makita-sunta-kesme-makinesi",
      name: "Makita Sunta Kesme Makinesi",
      category: "kesme-makineleri",
      price: 5900,
      originalPrice: 6500,
      images: [
        "/images/HS7601-SUNTA-KESME.png"
      ],
      description: "Hassas kesim için ideal profesyonel sunta kesme makinesi. Ergonomik tasarımı ve güçlü motoru ile zorlu kesim işlerinde yüksek performans sunar.",
      features: [
        "Hassas kesim",
        "Ergonomik tasarım",
        "Güçlü motor",
        "Toz emme bağlantısı",
        "Lazer kılavuz",
        "Paralel stop"
      ],
      specifications: {
        "Disk Çapı": "190 mm",
        "Devir Hızı": "5000 rpm",
        "Güç": "1200W",
        "Ağırlık": "3.8 kg",
        "Kesme Kapasitesi": "60 mm",
        "Garanti": "2 Yıl"
      },
      inStock: true,
      isNew: false,
      rating: 4.3,
      reviewCount: 18,
      sku: "MAK-HS7601",
      brand: "Makita"
    }
    // Diğer ürünler buraya eklenebilir
  ];

  useEffect(() => {
    // URL'den gelen slug'a göre ürünü bul
    const foundProduct = products.find(p => 
      p.slug === productSlug.toLowerCase()
    );
    setProduct(foundProduct);
  }, [productSlug]);

  if (!product) {
    return (
      <div className="product-detail-page">
        <div className="container">
          <div className="product-not-found">
            <h2>Ürün bulunamadı</h2>
            <p>Aradığınız ürün mevcut değil.</p>
            <Link to="/urunler" className="back-to-products">
              <ArrowLeft className="w-4 h-4" />
              Ürünlere Dön
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);

  const addToCart = () => {
    // Sepete ekleme işlemi
    console.log("Sepete eklendi:", product, "Adet:", quantity);
  };

  const addToWishlist = () => {
    setIsInWishlist(!isInWishlist);
  };

  const shareProduct = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link kopyalandı!");
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-5 h-5 ${
          index < Math.floor(rating) ? 'text-yellow-400 fill-current' :
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="product-detail-page">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <Link to="/" className="breadcrumb-link">Anasayfa</Link>
          <span className="breadcrumb-separator">/</span>
          <Link to="/urunler" className="breadcrumb-link">Ürünler</Link>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">{product.name}</span>
        </nav>

        <div className="product-detail">
          {/* Product Images */}
          <div className="product-gallery">
            <div className="main-image">
              <img 
                src={product.images[selectedImage]} 
                alt={product.name}
                className="product-image"
              />
              {product.isNew && <span className="product-badge new">Yeni</span>}
              {!product.inStock && <span className="product-badge out-of-stock">Stokta Yok</span>}
            </div>
            
            {product.images.length > 1 && (
              <div className="image-thumbnails">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img src={image} alt={`${product.name} ${index + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="product-info">
            <div className="product-header">
              <h1 className="product-title">{product.name}</h1>
              <div className="product-actions">
                <button 
                  className={`wishlist-btn ${isInWishlist ? 'active' : ''}`}
                  onClick={addToWishlist}
                >
                  <Heart className="w-5 h-5" />
                </button>
                <button className="share-btn" onClick={shareProduct}>
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="product-meta">
              <span className="product-sku">SKU: {product.sku}</span>
              <span className="product-brand">Marka: {product.brand}</span>
            </div>

            <div className="product-rating">
              <div className="stars">{renderStars(product.rating)}</div>
              <span className="rating-value">{product.rating}</span>
              <span className="review-count">({product.reviewCount} değerlendirme)</span>
            </div>

            <div className="product-price">
              {product.originalPrice > product.price && (
                <span className="original-price">₺{product.originalPrice}</span>
              )}
              <span className="current-price">₺{product.price}</span>
              {product.originalPrice > product.price && (
                <span className="discount-badge">
                  %{Math.round((1 - product.price / product.originalPrice) * 100)}
                </span>
              )}
            </div>

            <p className="product-short-description">{product.description}</p>

            <div className="product-features">
              <h3>Öne Çıkan Özellikler</h3>
              <ul>
                {product.features.map((feature, index) => (
                  <li key={index}>
                    <Check className="w-4 h-4" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="purchase-section">
              <div className="quantity-selector">
                <span className="quantity-label">Adet:</span>
                <div className="quantity-controls">
                  <button onClick={decreaseQuantity} className="quantity-btn">
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="quantity-value">{quantity}</span>
                  <button onClick={increaseQuantity} className="quantity-btn">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="action-buttons">
                <button 
                  className={`add-to-cart-btn ${!product.inStock ? 'disabled' : ''}`}
                  onClick={addToCart}
                  disabled={!product.inStock}
                >
                  <ShoppingCart className="w-5 h-5" />
                  {product.inStock ? 'Sepete Ekle' : 'Stokta Yok'}
                </button>
                <button className="buy-now-btn">
                  Hemen Satın Al
                </button>
              </div>
            </div>

            {/* Delivery Info */}
            <div className="delivery-info">
              <div className="delivery-item">
                <Truck className="w-5 h-5" />
                <div>
                  <strong>Ücretsiz Kargo</strong>
                  <span>150₺ ve üzeri alışverişlerde</span>
                </div>
              </div>
              <div className="delivery-item">
                <Shield className="w-5 h-5" />
                <div>
                  <strong>2 Yıl Garanti</strong>
                  <span>Orjinal ürün garantisi</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Tabs */}
        <div className="product-tabs">
          <div className="tab-headers">
            <button 
              className={`tab-header ${activeTab === 'description' ? 'active' : ''}`}
              onClick={() => setActiveTab('description')}
            >
              Açıklama
            </button>
            <button 
              className={`tab-header ${activeTab === 'specifications' ? 'active' : ''}`}
              onClick={() => setActiveTab('specifications')}
            >
              Teknik Özellikler
            </button>
            <button 
              className={`tab-header ${activeTab === 'reviews' ? 'active' : ''}`}
              onClick={() => setActiveTab('reviews')}
            >
              Değerlendirmeler ({product.reviewCount})
            </button>
          </div>

          <div className="tab-content">
            {activeTab === 'description' && (
              <div className="tab-panel">
                <h3>Ürün Açıklaması</h3>
                <p>{product.description}</p>
                <div className="feature-list">
                  <h4>Ana Özellikler</h4>
                  <ul>
                    {product.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'specifications' && (
              <div className="tab-panel">
                <h3>Teknik Özellikler</h3>
                <div className="specs-table">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="spec-row">
                      <span className="spec-name">{key}</span>
                      <span className="spec-value">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="tab-panel">
                <h3>Müşteri Değerlendirmeleri</h3>
                <div className="reviews-summary">
                  <div className="overall-rating">
                    <div className="rating-score">{product.rating}</div>
                    <div className="rating-stars">{renderStars(product.rating)}</div>
                    <div className="rating-text">{product.reviewCount} değerlendirme</div>
                  </div>
                </div>
                <div className="reviews-list">
                  <p>Bu ürün için henüz değerlendirme yapılmamış.</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        <div className="related-products">
          <h2>Benzer Ürünler</h2>
          <div className="related-products-grid">
            {/* Buraya benzer ürünler eklenecek */}
            <p>Benzer ürünler burada listelenecek.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;