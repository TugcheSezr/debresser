// Haalt alle pagina's uit de sitemap van debresser.nl op naar ./live (plus /blog/2/, die niet in de sitemap staat).
// Bestandsnaam: pad met "/" vervangen door "__", home.html voor de homepage.
const fs = require('fs');
const path = require('path');
const UIT = path.join(__dirname, 'live');
const UA = { headers: { 'User-Agent': 'Mozilla/5.0' } };

(async () => {
  fs.mkdirSync(UIT, { recursive: true });
  const locs = (xml) => [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  const index = locs(await (await fetch('https://www.debresser.nl/sitemap_index.xml', UA)).text()).filter((u) => !/author/.test(u));
  const urls = [];
  for (const s of index) urls.push(...locs(await (await fetch(s, UA)).text()).filter((u) => !/wp-content/.test(u)));
  urls.push('https://www.debresser.nl/blog/2/');
  for (const u of [...new Set(urls)]) {
    const p = new URL(u).pathname.replace(/^\/|\/$/g, '');
    const naam = p ? p.replace(/\//g, '__') + '.html' : 'home.html';
    const res = await fetch(u, UA);
    if (!res.ok) { console.warn(res.status, u); continue; }
    fs.writeFileSync(path.join(UIT, naam), await res.text());
  }
  console.log('opgehaald:', fs.readdirSync(UIT).length);
})();
