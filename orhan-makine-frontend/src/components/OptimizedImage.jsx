import React, { useState } from "react";

const OptimizedImage = ({
  src,
  alt = "",
  className = "",
  width,
  height,
  style = {},
  loading = "lazy",
  fallback = "/images/default-product.png",
}) => {
  const [imgSrc, setImgSrc] = useState(src);

  // Her format için webp oluştur
  const webpSrc =
    src.endsWith(".png") ||
    src.endsWith(".jpg") ||
    src.endsWith(".jpeg")
      ? src.replace(/\.(png|jpg|jpeg)$/i, ".webp")
      : null;

  return (
    <picture>
      {/* WebP desteği varsa kullan */}
      {webpSrc && <source srcSet={webpSrc} type="image/webp" />}

      {/* Orijinal fallback */}
      <img
        src={imgSrc}
        alt={alt}
        className={className}
        loading={loading}
        width={width}
        height={height}
        style={style}
        onError={() => {
          if (imgSrc !== fallback) {
            setImgSrc(fallback); // kırık görsel → fallback
          }
        }}
      />
    </picture>
  );
};

export default OptimizedImage;