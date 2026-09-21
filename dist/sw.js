const CACHE_NAME = 'jadwal-sholat-v1'
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.svg',
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE))
  )
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      )
    )
  )
  self.clients.claim()
})

self.addEventListener('fetch', (event) => {
  // Stale-while-revalidate for API requests, cache-first for static
  if (event.request.url.includes('api.aladhan.com')) {
    event.respondWith(
      caches.open(CACHE_NAME).then(async (cache) => {
        try {
          const response = await fetch(event.request)
          if (response.status === 200) {
            cache.put(event.request, response.clone())
          }
          return response
        } catch {
          const cachedResponse = await cache.match(event.request)
          if (cachedResponse) return cachedResponse
          throw new Error('Offline and no cache')
        }
      })
    )
  } else {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        return cachedResponse || fetch(event.request)
      })
    )
  }
})
