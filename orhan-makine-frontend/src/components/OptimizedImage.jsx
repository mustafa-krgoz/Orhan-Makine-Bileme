import React from "react";

const OptimizedImage = ({
  src,
  alt = "",
  className = "",
  width,
  height,
  style = {},
  loading = "lazy",
}) => {
  // Eğer src .png ise otomatik .webp versiyonunu üret
  const webpSrc = src.endsWith(".png") ? src.replace(".png", ".webp") : null;

  return (
    <picture>
      {webpSrc && (
        <source srcSet={webpSrc} type="image/webp" />
      )}

      <img
        src={src}  
        alt={alt}
        className={className}
        loading={loading}
        width={width}
        height={height}
        style={style}
      />
    </picture>
  );
};

export default OptimizedImage;