const C='sgb-132f7c0a';const F=['index.html','manifest.webmanifest','icon-192.png','icon-512.png','maskable-192.png','maskable-512.png','apple-touch-icon.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(F)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;const u=new URL(e.request.url);if(u.origin!==location.origin)return;
 if(u.pathname.endsWith('version.json'))return;
 const page=e.request.mode==='navigate'||u.pathname.endsWith('.html')||u.pathname.endsWith('/');
 const key=page?new URL('index.html',self.registration.scope).href:u.origin+u.pathname;
 const req=page?new Request(e.request,{cache:'no-cache'}):e.request;
 const fromCache=()=>caches.match(key).then(r=>r||caches.match(new URL('index.html',self.registration.scope).href));
 /* 서버가 멈추거나(중지 안내 페이지·오류) 인터넷이 없어도, 받아 둔 앱으로 열려요 */
 e.respondWith(fetch(req).then(r=>{if(r.ok&&r.type==='basic'){const cp=r.clone();caches.open(C).then(c=>c.put(key,cp));return r}
   return fromCache().then(c=>c||r)}).catch(()=>fromCache()))});
