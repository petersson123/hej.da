const staticCacheName = "site-static-v1";
const assets = [
  "./",
  "./index.html",
  "./index.js",
  "./manifest.json",
  "./bilder/background.jpg",
  "./bilder/1.jpg",
  "./bilder/4.jpg",
  "./bilder/icon512_maskable.png",
  "./main.css",
  "./main.css.map",
  "./bootstrap.min.css",
  "./script.js",
  "./st.html",
  "./bilder/5.jpg",
];

self.addEventListener("install", (evt) => {
  console.log("service worker has been installed");
  evt.waitUntil(
    caches
      .open(staticCacheName)
      .then((cache) => {
        console.log("caching shell assets");
        return cache.addAll(assets);
      })
      .catch((error) => {
        console.error("Cache addAll failed:", error);
      })
  );
  self.skipWaiting();
});

self.addEventListener("activate", (evt) => {
  console.log("service worker has been activated");
  evt.waitUntil(
    Promise.all([
      self.clients.claim(),
      caches.keys().then((keys) => {
        return Promise.all(
          keys
            .filter((key) => key !== staticCacheName)
            .map((key) => caches.delete(key))
        );
      }),
    ])
  );
});

self.addEventListener("fetch", (evt) => {
  evt.respondWith(
    caches
      .match(evt.request)
      .then((cacheRes) => {
        return cacheRes || fetch(evt.request);
      })
      .catch(() => {
        return fetch(evt.request);
      })
  );
});
