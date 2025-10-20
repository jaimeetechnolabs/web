
const CACHE = 'jaimee-cache-v1';
const FILES = [
  '/index.html',
  '/css/style.css',
  '/js/main.js',
  '/manifest.json',
  '/assets/favicon.png'
];
self.addEventListener('install', evt => {
  evt.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)));
  self.skipWaiting();
});
self.addEventListener('activate', evt => {
  evt.waitUntil(caches.keys().then(keys => Promise.all(keys.map(k => {
    if(k !== CACHE) return caches.delete(k);
  }))));
  self.clients.claim();
});
self.addEventListener('fetch', evt => {
  evt.respondWith(caches.match(evt.request).then(r => r || fetch(evt.request)));
});
