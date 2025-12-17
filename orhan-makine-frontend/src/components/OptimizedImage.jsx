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

  // PNG → WEBP Dönüşüm Mantığı
  const webpSrc = src.match(/\.(png|jpg|jpeg)$/i)
    ? src.replace(/\.(png|jpg|jpeg)$/i, ".webp")
    : null;

  return (
    <picture>
      {/* WebP varsa dener */}
      {webpSrc && (
        <source
          srcSet={webpSrc}
          type="image/webp"
          onError={() => console.log("WEBP yüklenemedi:", webpSrc)}
        />
      )}

      {/* PNG/JPG fallback */}
      <img
        src={imgSrc}
        alt={alt}
        className={className}
        loading={loading}
        width={width}
        height={height}
        style={style}
        onError={(e) => {
          console.warn("Görsel yüklenemedi → fallback’e düşüldü:", imgSrc);
          if (imgSrc !== fallback) {
            setImgSrc(fallback);
          }
        }}
      />
    </picture>
  );
};

export default OptimizedImage;