const C='fbp-v7',F=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png'];
addEventListener('install',e=>e.waitUntil(caches.open(C).then(c=>c.addAll(F)).then(()=>skipWaiting())));
addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=C).map(x=>caches.delete(x)))).then(()=>clients.claim())));
// Les fichiers audio et les requêtes "range" ne passent pas par le cache : c'est ce qui bloquait la lecture sur certains navigateurs.
addEventListener('fetch',e=>{const r=e.request,u=new URL(r.url);if(r.method!='GET'||u.origin!=location.origin||r.headers.has('range')||/\.(m4a|mp3|aac|ogg|wav|flac)$/i.test(u.pathname))return;
e.respondWith(caches.match(r).then(c=>c||fetch(r).then(n=>{const k=n.clone();caches.open(C).then(x=>x.put(r,k));return n})))});
