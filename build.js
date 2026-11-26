// Zero-dependency static site builder. Usage: node build.js  -> dist/
// Posts: content/posts/<slug>.html, first thing in file is <!--meta {json} --> then an HTML body fragment.
// meta: title, subtitle?, date (YYYY-MM-DD), summary, category, series?, part?, tags[], cover? (path under static/, e.g. img/x.png), draft?
const fs = require('fs'), path = require('path');
const site = JSON.parse(fs.readFileSync('site.json', 'utf8'));
const D = 'dist';
fs.rmSync(D, { recursive: true, force: true });
const out = (p, s) => { p = path.join(D, p); fs.mkdirSync(path.dirname(p), { recursive: true }); fs.writeFileSync(p, s); };
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
const read = f => fs.readFileSync(f, 'utf8');
const parse = f => {
  const m = read(f).match(/^\s*<!--meta\s*([\s\S]*?)-->([\s\S]*)$/);
  if (!m) throw new Error(f + ': missing <!--meta ...--> header');
  const meta = JSON.parse(m[1]);
  for (const k of ['title', 'date', 'summary', 'category']) if (!meta[k]) throw new Error(f + ': meta.' + k + ' missing');
  return { ...meta, slug: path.basename(f, '.html'), body: m[2] };
};
const posts = fs.readdirSync('content/posts').filter(f => f.endsWith('.html')).map(f => parse('content/posts/' + f))
  .filter(p => !p.draft).sort((a, b) => b.date.localeCompare(a.date));
const fmt = d => new Date(d + 'T00:00:00Z').toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' });
const avatar = fs.existsSync('static/img/alok.jpg') ? '<img class="av" src="ROOTimg/alok.jpg" alt="">' : '<span class="av">AC</span>';
const ogFor = p => fs.existsSync('static/og/' + p + '.png') ? 'og/' + p + '.png' : (fs.existsSync('static/og/default.png') ? 'og/default.png' : '');
const ver = f => require('crypto').createHash('md5').update(fs.readFileSync('static/' + f)).digest('hex').slice(0, 8);
const V = { css: ver('theme.css'), js: ver('site.js') };
const base = site.baseUrl.replace(/\/$/, '');

const shell = ({ title, desc, body, path: p, root, cover, type = 'website', bar = false }) => `<!doctype html>
<html lang="en" data-theme="dark" class=""><meta name="color-scheme" content="dark light"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)}${title === site.title ? '' : ' | ' + site.title}</title><meta name="description" content="${esc(desc || site.tagline)}">
<link rel="canonical" href="${base}${p}"><link rel="alternate" type="application/rss+xml" href="${base}/feed.xml">
<meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(desc || site.tagline)}"><meta property="og:type" content="${type}">
${cover ? `<meta property="og:image" content="${base}/${cover}"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:image" content="${base}/${cover}">` : ''}<meta property="og:site_name" content="${esc(site.title)}">
<script>document.documentElement.classList.add('js');var t=localStorage.theme;document.documentElement.dataset.theme=t=='dark'||t=='light'?t:(matchMedia('(prefers-color-scheme: light)').matches?'light':'dark')</script>
<link rel="stylesheet" href="${root}theme.css?v=${V.css}"></head><body>
${bar ? '<div id="progress"></div>' : ''}
<header class="site"><div class="wrap wide"><a class="brand" href="${root}">${site.brand}</a>
<nav><a href="${root}#posts">Posts</a><a href="${root}series/">Series</a><a href="${root}about/">About</a></nav>
<button id="tt" type="button" aria-label="Switch theme">☀</button></div></header>
${body}
<footer class="site"><div class="wrap wide">${avatar.replace('ROOT', root)}<span>${site.author}</span> · ${site.links.map(l => `<a href="${l.url}" rel="me">${l.label}</a>`).join(' · ')} · <a href="${root}feed.xml">RSS</a></div></footer>
<script src="${root}site.js?v=${V.js}"></script></body></html>`;

const card = (p, root) => `<a class="card rv" data-cat="${esc(p.category)}" href="${root}${p.slug}/">${p.cover ? `<img loading="lazy" src="${root}${p.cover}" alt="">` : ''}<div><span class="meta"><span class="tag">${esc(p.category)}</span> · ${fmt(p.date)}</span><h3>${esc(p.title)}</h3><p>${esc(p.summary)}</p></div></a>`;

// home
const words = posts.reduce((n, p) => n + p.body.replace(/<(script|style)[\s\S]*?<\/\1>/g, ' ').replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length, 0);
const cats = [...new Set(posts.map(p => p.category))];
out('index.html', shell({
  title: site.title, desc: site.tagline, path: '/', root: './', cover: ogFor('default'),
  body: require('./templates/home.js')({ site, posts, cats, words, avatar, esc, card })
}));

// posts
posts.forEach((p, i) => {
  const sib = p.series ? posts.filter(x => x.series === p.series).sort((a, b) => (a.part || 0) - (b.part || 0) || a.date.localeCompare(b.date)) : [];
  const j = sib.indexOf(p), prev = sib[j - 1], next = sib[j + 1];
  const pn = sib.length > 1 ? `<div class="pn"><span>${prev ? `← <a href="../${prev.slug}/">${esc(prev.title)}</a>` : ''}</span><span>${next ? `<a href="../${next.slug}/">${esc(next.title)}</a> →` : ''}</span></div>` : '';
  out(p.slug + '/index.html', shell({
    title: p.title, desc: p.summary, path: `/${p.slug}/`, root: '../', cover: ogFor(p.slug) || p.cover, type: 'article', bar: true,
    body: `<div class="wrap"><article class="post"><span class="meta"><span class="tag">${esc(p.category)}</span> · ${fmt(p.date)}${p.series ? ` · <a href="../series/#${esc(p.series)}">${esc(p.series)}${p.part ? ' part ' + p.part : ''}</a>` : ''}</span>
<h1>${esc(p.title)}</h1>${p.subtitle ? `<p class="sub">${esc(p.subtitle)}</p>` : ''}${p.body}${pn}</article></div>`
  }));
});

// series index
const sers = {};
posts.forEach(p => p.series && (sers[p.series] ||= []).push(p));
out('series/index.html', shell({
  title: 'Series', path: '/series/', root: '../',
  body: `<div class="wrap wide"><section class="hero"><h1>Series</h1></section>${Object.entries(sers).map(([s, a]) =>
    `<h2 id="${esc(s)}">${esc(s)}</h2><div class="grid">${a.sort((x, y) => (x.part || 0) - (y.part || 0) || x.date.localeCompare(y.date)).map(p => card(p, '../')).join('')}</div>`).join('')}</div>`
}));

// about
if (fs.existsSync('content/about.html')) {
  const a = parse('content/about.html');
  out('about/index.html', shell({ title: 'About', desc: a.summary, path: '/about/', root: '../', body: `<div class="wrap"><article class="post"><h1>${esc(a.title)}</h1>${a.body}</article></div>` }));
}

// feed, sitemap, static, CNAME
const rssItem = p => `<item><title>${esc(p.title)}</title><link>${base}/${p.slug}/</link><guid>${base}/${p.slug}/</guid><pubDate>${new Date(p.date).toUTCString()}</pubDate><description>${esc(p.summary)}</description></item>`;
out('feed.xml', `<?xml version="1.0"?><rss version="2.0"><channel><title>${esc(site.title)}</title><link>${base}/</link><description>${esc(site.tagline)}</description>${posts.map(rssItem).join('')}</channel></rss>`);
out('sitemap.xml', `<?xml version="1.0"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${['/', '/series/', '/about/', ...posts.map(p => `/${p.slug}/`)].map(u => `<url><loc>${base}${u}</loc></url>`).join('')}</urlset>`);
out('robots.txt', `User-agent: *\nAllow: /\nSitemap: ${base}/sitemap.xml\n`);
out('CNAME', new URL(base).host + '\n');
out('.nojekyll', '');
fs.cpSync('static', D, { recursive: true });
// legacy Hashnode slugs -> stubs for old links (Pages cannot 301)
for (const [old, now] of Object.entries(site.redirects || {})) out(old + '/index.html', `<!doctype html><meta charset="utf-8"><link rel="canonical" href="${base}/${now}/"><meta http-equiv="refresh" content="0;url=../${now}/"><a href="../${now}/">Moved</a>`);

// self-check: every internal link target exists
let bad = 0;
const walk = d => fs.readdirSync(d, { withFileTypes: true }).flatMap(e => e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]);
for (const f of walk(D).filter(f => f.endsWith('.html'))) {
  for (const [, u] of read(f).matchAll(/(?:href|src)="([^"#:?]+)[^"]*"/g)) {
    if (/^(https?|mailto|\/\/)/.test(u)) continue;
    let t = path.join(path.dirname(f), u); if (u.endsWith('/') || !path.extname(u)) t = path.join(t, fs.existsSync(t) && fs.statSync(t).isFile() ? '' : 'index.html');
    if (!fs.existsSync(t)) { console.error('BROKEN', f, '->', u); bad++; }
  }
}
console.log(`built ${posts.length} posts, ${bad} broken links`);
if (bad) process.exit(1);
