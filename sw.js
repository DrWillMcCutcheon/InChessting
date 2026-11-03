// offline support: app shell cached on install; same-origin requests served cache-first and refreshed in the background
const V='sb-4ddf3e30d8',SHELL=['./', 'index.html', 'chess.js', 'stockfish.js', 'manifest.webmanifest', 'icons/icon-192.png', 'icons/icon-512.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(V).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!=V).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{if(e.request.method!='GET')return;const u=new URL(e.request.url),own=u.origin==location.origin,font=/fonts\.(googleapis|gstatic)\.com$/.test(u.hostname);if(!own&&!font)return;
 e.respondWith(caches.open(V).then(c=>c.match(e.request,{ignoreSearch:own}).then(hit=>{const net=fetch(e.request).then(r=>{if(r.ok||r.type=='opaque')c.put(e.request,r.clone());return r}).catch(()=>hit);return hit||net})))});
