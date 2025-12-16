import { 
  createContext, 
  useContext, 
  useState, 
  useEffect, 
  useCallback, 
  useMemo 
} from "react";
import { productsData } from "../data/productsData";

const FavoritesContext = createContext();

// Custom Hook
export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
}

export function FavoritesProvider({ children }) {
  const [favoriteIds, setFavoriteIds] = useState([]);

  /* -----------------------------------------------------
     📌 1) SAYFA YÜKLENİNCE FAVORİLERİ LOCALSTORAGE'DAN AL
  ------------------------------------------------------- */
  useEffect(() => {
    const saved = localStorage.getItem("favoriteProducts");
    if (saved) {
      setFavoriteIds(JSON.parse(saved));
    }
  }, []);

  /* -----------------------------------------------------
     📌 2) FAVORİLERİ LOCALSTORAGE'A YAZ — OPTİMİZE EDİLDİ
        Debounce → çok hızlı ardışık tıklamalarda spam yazmaz
  ------------------------------------------------------- */
  useEffect(() => {
    const timeout = setTimeout(() => {
      localStorage.setItem("favoriteProducts", JSON.stringify(favoriteIds));
    }, 150);
    return () => clearTimeout(timeout);
  }, [favoriteIds]);

  /* -----------------------------------------------------
     📌 3) FAVORİ EKLE/SİL — useCallback ile MEMOIZED
  ------------------------------------------------------- */
  const toggleFavorite = useCallback((productId) => {
    setFavoriteIds(prev => {
      return prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId];
    });
  }, []);

  /* -----------------------------------------------------
     📌 4) FAVORİ Mİ? → useCallback ile optimize edildi
  ------------------------------------------------------- */
  const isFavorite = useCallback((productId) => {
    return favoriteIds.includes(productId);
  }, [favoriteIds]);

  /* -----------------------------------------------------
     📌 5) FAVORİ ÜRÜNLERİ HESAPLA — useMemo ile optimize
        Her render’da productsData filtresi çalışmaz artık!
  ------------------------------------------------------- */
  const favoriteProducts = useMemo(() => {
    return productsData.filter(p => favoriteIds.includes(p.id));
  }, [favoriteIds]);

  /* -----------------------------------------------------
     📌 6) FAVORİ SAYISI
  ------------------------------------------------------- */
  const favoritesCount = favoriteIds.length;

  /* -----------------------------------------------------
     📌 7) PROVIDER VALUE → useMemo
        (Her render’da yeni object yaratılmasını engeller)
  ------------------------------------------------------- */
  const value = useMemo(() => ({
    favoriteIds,
    favorites: favoriteProducts,
    favoritesCount,
    toggleFavorite,
    isFavorite
  }), [favoriteIds, favoriteProducts, favoritesCount, toggleFavorite, isFavorite]);

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}