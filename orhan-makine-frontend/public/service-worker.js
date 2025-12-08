// PWA Service Worker - Offline çalışma ve performans optimizasyonu için
const CACHE_NAME = 'orhan-makine-v2';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icons/icon-72x72.png',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  '/videos/makine-background.mp4',
  '/images/default-product.png'
];

// Kurulum olayı - Cache'leri yükle
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache açıldı');
        return cache.addAll(urlsToCache);
      })
  );
  self.skipWaiting();
});

// Fetch olayı - Cache'den veya network'ten getir
self.addEventListener('fetch', event => {
  // API isteklerini cache'leme
  if (event.request.url.includes('/api/')) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache'de bulunursa cache'den döndür
        if (response) {
          return response;
        }
        
        // Cache'de yoksa network'ten getir
        return fetch(event.request)
          .then(response => {
            // Geçerli bir response değilse direkt döndür
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            // Response'u klonla (stream sadece bir kez okunabilir)
            const responseToCache = response.clone();
            
            // Cache'e ekle
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });
            
            return response;
          })
          .catch(() => {
            // Offline durumda ve sayfa cache'de yoksa fallback göster
            if (event.request.mode === 'navigate') {
              return caches.match('/');
            }
          });
      })
  );
});

// Aktifleştirme olayı - Eski cache'leri temizle
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Push notification desteği
self.addEventListener('push', event => {
  const options = {
    body: event.data ? event.data.text() : 'Yeni bildirim',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/icon-72x72.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: '2'
    }
  };

  event.waitUntil(
    self.registration.showNotification('Orhan Makine', options)
  );
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('/')
  );
});