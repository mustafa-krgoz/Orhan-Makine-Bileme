import { createContext, useContext, useState, useEffect } from "react";
import { productsData } from "../data/productsData";

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favoriteIds, setFavoriteIds] = useState([]);

  // LocalStorage'dan favorileri yükle
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favoriteProducts');
    if (savedFavorites) {
      setFavoriteIds(JSON.parse(savedFavorites));
    }
  }, []);

  // LocalStorage'a favorileri kaydet
  useEffect(() => {
    localStorage.setItem('favoriteProducts', JSON.stringify(favoriteIds));
  }, [favoriteIds]);

  // Favorilere ürün ekle/çıkar
  const toggleFavorite = (productId) => {
    setFavoriteIds((prev) => {
      if (prev.includes(productId)) {
        // Eğer zaten favorilerse çıkar
        return prev.filter(id => id !== productId);
      } else {
        // Favorilere ekle
        return [...prev, productId];
      }
    });
  };

  // Favori ürünleri getir (tam ürün bilgileriyle)
  const getFavoriteProducts = () => {
    return productsData.filter(product => favoriteIds.includes(product.id));
  };

  // ID'ye göre favori mi kontrolü
  const isFavorite = (productId) => {
    return favoriteIds.includes(productId);
  };

  // Favori sayısı
  const favoritesCount = favoriteIds.length;

  return (
    <FavoritesContext.Provider value={{
      favoriteIds,
      favorites: getFavoriteProducts(),
      favoritesCount,
      toggleFavorite,
      isFavorite
    }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}