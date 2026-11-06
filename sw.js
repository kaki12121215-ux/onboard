const C='onboard-v29',T='onboard-tiles-1',F=['./','index.html','voz.mp3','voz_clase.mp3','tex_day_4k.jpg','tex_relief_4k.jpg','ONboard.shortcut','ONboard_fin.shortcut','manifest.webmanifest','icon-180.png','icon-192.png','icon-512.png'];
const TILE=/server\.arcgisonline\.com|gibs\.earthdata\.nasa\.gov/;let puts=0;
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>Promise.all(F.map(f=>c.add(f).catch(()=>{})))).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C&&x!==T).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
async function trim(){const c=await caches.open(T),k=await c.keys();if(k.length>2500)for(const r of k.slice(0,k.length-2000))await c.delete(r)}
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;if(/script\.google(usercontent)?\.com|googleusercontent\.com/.test(r.url))return;
 if(TILE.test(r.url)){e.respondWith(caches.open(T).then(c=>c.match(r).then(m=>m||fetch(r).then(x=>{if(x.ok||x.type==='opaque'){c.put(r,x.clone());if(++puts%200===0)trim()}return x}))));return}
 e.respondWith(fetch(r).then(x=>{if(x.ok&&(r.url.startsWith(self.location.origin)||/fonts\.(googleapis|gstatic)/.test(r.url))){const y=x.clone();caches.open(C).then(c=>c.put(r,y))}return x}).catch(()=>caches.match(r).then(m=>m||caches.match('./'))))});
