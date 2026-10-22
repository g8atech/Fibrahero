// Invia a IndexNow (Bing, Yandex, Seznam, Naver… e chi usa i loro indici) tutti gli URL della sitemap.
// Uso: node scripts/indexnow.mjs [https://www.fibrahero.it]
import { readdirSync } from 'node:fs';
const site = (process.argv[2] || 'https://www.fibrahero.it').replace(/\/$/, '');
const host = new URL(site).host;
const keyFile = readdirSync(new URL('../public/', import.meta.url)).find((f) => /^[0-9a-f]{32}\.txt$/.test(f));
if (!keyFile) throw new Error('chiave IndexNow non trovata in public/');
const key = keyFile.replace('.txt', '');

const index = await (await fetch(`${site}/sitemap-index.xml`)).text();
const maps = [...index.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const urls = [];
for (const m of maps) urls.push(...[...(await (await fetch(m)).text()).matchAll(/<loc>([^<]+)<\/loc>/g)].map((x) => x[1]));
urls.push(`${site}/llms.txt`);

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host, key, keyLocation: `${site}/${key}.txt`, urlList: urls }),
});
console.log(`IndexNow: ${urls.length} URL inviati → HTTP ${res.status}`);
if (res.status >= 400) { console.log(await res.text()); process.exit(1); }
