import React, { useState, useEffect } from "react";

const OptimizedImage = ({
  src,
  alt = "",
  className = "",
  width,
  height,
  style = {},
  loading = "lazy",
  fallback = "/images/default-product.png",
  fetchpriority = "auto", // "high" yapılınca LCP hızlanır
}) => {

  // Normal PNG/JPG kaynak
  const [imgSrc, setImgSrc] = useState(src);

  // WEBP versiyonunu üret
  const webpSrc = src.replace(/\.(png|jpg|jpeg)$/i, ".webp");

  // Tarayıcı webp destekliyor mu?
  const [supportsWebp, setSupportsWebp] = useState(true);

  useEffect(() => {
    const webpTest = new Image();
    webpTest.onload = () => setSupportsWebp(true);
    webpTest.onerror = () => setSupportsWebp(false);
    webpTest.src =
      "data:image/webp;base64,UklGRiIAAABXRUJQVlA4ICAAAADwAQCdASoCAAIALmk0mk0iIiIiIgBoSywA";
  }, []);

  return (
    <picture>

      {/* WEBP DESTEKLİYSE YÜKLE */}
      {supportsWebp && (
        <source
          srcSet={webpSrc}
          type="image/webp"
        />
      )}

      {/* JPEG fallback ekleyelim — SEO + ticari sitelerde önemlidir */}
      <source srcSet={src} type="image/jpeg" />

      {/* PNG/JPG IMG TAG */}
      <img
        src={imgSrc}
        alt={alt}
        className={className}
        loading={loading}
        width={width}
        height={height}
        decoding="async"
        fetchpriority={fetchpriority}
        style={{
          display: "block",
          width: width || "100%",
          height: height || "auto",
          ...style,
        }}
        onError={() => {
          if (imgSrc !== fallback) {
            console.warn("Resim yüklenemedi, fallback'e geçildi:", fallback);
            setImgSrc(fallback);
          }
        }}
      />
    </picture>
  );
};

export default OptimizedImage;