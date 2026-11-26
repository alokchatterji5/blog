// Generates 1200x630 preview images (LinkedIn/Twitter/OG) into static/og/ using headless Edge or Chrome.
// Usage: node og.js [--all]   (default: only posts that have no image yet)
const fs = require('fs'), path = require('path'), os = require('os'), { execFileSync } = require('child_process');
const browser = ['C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', 'C:/Program Files/Google/Chrome/Application/chrome.exe'].find(fs.existsSync);
if (!browser) throw new Error('need Edge or Chrome installed');
const site = JSON.parse(fs.readFileSync('site.json', 'utf8'));
fs.mkdirSync('static/og', { recursive: true });
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
const items = [{ slug: 'default', cat: 'blog', title: site.heroTitle || 'Homelabs, self-hosting and AI agents', sub: site.tagline }];
for (const f of fs.readdirSync('content/posts').filter(f => f.endsWith('.html'))) {
  const m = fs.readFileSync('content/posts/' + f, 'utf8').match(/<!--meta\s*([\s\S]*?)-->/);
  const j = JSON.parse(m[1]); items.push({ slug: f.replace('.html', ''), cat: j.category, title: j.title, sub: j.summary });
}
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'og-'));
for (const it of items) {
  const out = `static/og/${it.slug}.png`;
  if (fs.existsSync(out) && !process.argv.includes('--all')) continue;
  const size = it.title.length > 70 ? 54 : it.title.length > 45 ? 64 : 76;
  const html = `<!doctype html><meta charset=utf-8><style>*{box-sizing:border-box}body{margin:0;width:1200px;height:630px;background:#0a0c11;color:#e8ebf2;font-family:Segoe UI,Arial,sans-serif;position:relative;overflow:hidden;padding:64px}
.g{position:absolute;inset:0;background-image:linear-gradient(#222836 1px,transparent 1px),linear-gradient(90deg,#222836 1px,transparent 1px);background-size:48px 48px;opacity:.45}
.b{position:absolute;right:-120px;top:-160px;width:620px;height:620px;border-radius:50%;background:radial-gradient(#8ea2ff66,transparent 65%)}
.c{position:relative;font:600 24px Consolas,monospace;color:#67e8f9;letter-spacing:.08em;text-transform:uppercase}
h1{position:relative;font-size:${size}px;line-height:1.08;margin:22px 0 18px;font-weight:900;max-width:1020px}
p{position:relative;font-size:28px;color:#8b94a7;margin:0;max-width:980px;line-height:1.35}
.f{position:absolute;left:64px;right:64px;bottom:52px;display:flex;justify-content:space-between;font:600 26px Consolas,monospace;color:#e8ebf2}.f b{color:#8ea2ff}.f i{color:#8b94a7;font-style:normal}</style>
<div class=g></div><div class=b></div><div class=c>$ ${esc(it.cat)}</div><h1>${esc(it.title)}</h1><p>${esc(it.sub.length > 150 ? it.sub.slice(0, 147).replace(/ [^ ]*$/, '') + '...' : it.sub)}</p>
<div class=f><span>dark<b>shield</b>_</span><i>blog.darkshield.co.in</i></div>`;
  const hf = path.join(tmp, it.slug + '.html'); fs.writeFileSync(hf, html);
  execFileSync(browser, ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--force-device-scale-factor=1', '--window-size=1200,630', '--screenshot=' + path.resolve(out), 'file:///' + hf.replace(/\\/g, '/')], { stdio: 'ignore' });
  console.log('og', it.slug);
}
