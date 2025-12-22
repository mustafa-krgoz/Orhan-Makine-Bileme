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
  const [isInitialized, setIsInitialized] = useState(false);

  /* -----------------------------------------------------
     📌 1) SAYFA YÜKLENİNCE FAVORİLERİ LOCALSTORAGE'DAN AL
  ------------------------------------------------------- */
  useEffect(() => {
    try {
      const saved = localStorage.getItem("orhanmakine-favorites");
      if (saved) {
        const parsed = JSON.parse(saved);
        // Sadece geçerli ID'leri filtrele (sayısal ID'ler)
        const validIds = parsed.filter(id => 
          typeof id === 'number' && !isNaN(id)
        );
        setFavoriteIds(validIds);
      }
    } catch (error) {
      console.error("Favori verisi okunamadı:", error);
      setFavoriteIds([]);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  /* -----------------------------------------------------
     📌 2) FAVORİLERİ LOCALSTORAGE'A YAZ — OPTİMİZE EDİLDİ
  ------------------------------------------------------- */
  useEffect(() => {
    if (!isInitialized) return; // İlk yükleme tamamlanmadan yazma
    
    const timeout = setTimeout(() => {
      try {
        localStorage.setItem("orhanmakine-favorites", JSON.stringify(favoriteIds));
      } catch (error) {
        console.error("Favori verisi kaydedilemedi:", error);
      }
    }, 150);
    
    return () => clearTimeout(timeout);
  }, [favoriteIds, isInitialized]);

  /* -----------------------------------------------------
     📌 3) FAVORİ EKLE/SİL — useCallback ile MEMOIZED
  ------------------------------------------------------- */
  const toggleFavorite = useCallback((productId) => {
    if (!productId || typeof productId !== 'number') {
      console.error("Geçersiz ürün ID:", productId);
      return;
    }

    setFavoriteIds(prev => {
      return prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId];
    });
  }, []);

  /* -----------------------------------------------------
     📌 4) TEK SEÇİMLİK FAVORİ EKLEME (Örneğin: "Beğen" butonu)
  ------------------------------------------------------- */
  const addToFavorites = useCallback((productId) => {
    if (!productId || typeof productId !== 'number') return;
    
    setFavoriteIds(prev => 
      prev.includes(productId) ? prev : [...prev, productId]
    );
  }, []);

  /* -----------------------------------------------------
     📌 5) FAVORİDEN KALDIRMA
  ------------------------------------------------------- */
  const removeFromFavorites = useCallback((productId) => {
    setFavoriteIds(prev => prev.filter(id => id !== productId));
  }, []);

  /* -----------------------------------------------------
     📌 6) TÜM FAVORİLERİ TEMİZLE
  ------------------------------------------------------- */
  const clearFavorites = useCallback(() => {
    setFavoriteIds([]);
  }, []);

  /* -----------------------------------------------------
     📌 7) FAVORİ Mİ? → useCallback ile optimize edildi
  ------------------------------------------------------- */
  const isFavorite = useCallback((productId) => {
    return favoriteIds.includes(productId);
  }, [favoriteIds]);

  /* -----------------------------------------------------
     📌 8) FAVORİ ÜRÜNLERİ HESAPLA — useMemo ile optimize
  ------------------------------------------------------- */
  const favoriteProducts = useMemo(() => {
    // ID'leri sıralı olarak getir (en yeni eklenenler önce)
    const sortedIds = [...favoriteIds].reverse();
    
    return sortedIds
      .map(id => productsData.find(p => p.id === id))
      .filter(Boolean); // undefined/null değerleri filtrele
  }, [favoriteIds]);

  /* -----------------------------------------------------
     📌 9) FAVORİ SAYISI
  ------------------------------------------------------- */
  const favoritesCount = favoriteIds.length;

  /* -----------------------------------------------------
     📌 10) FAVORİ İÇERİĞİ KONTROLÜ (sayfa boş mu?)
  ------------------------------------------------------- */
  const hasFavorites = favoritesCount > 0;

  /* -----------------------------------------------------
     📌 11) PRODUCTS DATA'DAN GÜNCEL ÜRÜN BİLGİSİ AL
  ------------------------------------------------------- */
  const getFavoriteProductDetails = useCallback((productId) => {
    return productsData.find(p => p.id === productId);
  }, []);

  /* -----------------------------------------------------
     📌 12) PROVIDER VALUE → useMemo
  ------------------------------------------------------- */
  const value = useMemo(() => ({
    // State
    favoriteIds,
    favorites: favoriteProducts,
    favoritesCount,
    hasFavorites,
    isInitialized,
    
    // Actions
    toggleFavorite,
    addToFavorites,
    removeFromFavorites,
    clearFavorites,
    
    // Queries
    isFavorite,
    getFavoriteProductDetails,
    
    // Convenience getters
    getFavoriteIds: () => favoriteIds,
    getFavoriteCount: () => favoritesCount
  }), [
    favoriteIds,
    favoriteProducts,
    favoritesCount,
    hasFavorites,
    isInitialized,
    toggleFavorite,
    addToFavorites,
    removeFromFavorites,
    clearFavorites,
    isFavorite,
    getFavoriteProductDetails
  ]);

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}