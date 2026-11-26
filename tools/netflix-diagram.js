// One-off generator: full request-to-playback diagram for the Netflix post, faithful to the original Mermaid graph.
// Run: node tools/netflix-diagram.js  (rewrites the figure + script block in content/posts/build-your-own-netflix-*.html)
const fs = require('fs'), path = require('path');
const N = {
  user: [40, 70, 120, 40, 'User'], admin: [40, 150, 120, 40, 'Admin'], ombi: [190, 110, 110, 40, 'Ombi'],
  arr: [370, 55, 230, 50, 'Radarr/Sonarr/Lidarr/Readarr'], idx: [370, 150, 200, 40, 'Prowlarr / Jackett'], qbt: [680, 105, 250, 50, 'qBittorrent + Surfshark VPN'],
  truenas: [540, 300, 150, 46, 'TrueNAS'], jelly: [800, 300, 150, 46, 'Jellyfin'],
  email: [170, 480, 150, 46, 'Email'], gotify: [350, 480, 150, 46, 'Gotify / Discord'], user2: [700, 480, 120, 46, 'User'],
  nzb: [60, 650, 150, 46, 'NZB 360 mobile app'],
};
const BOX = [['User interaction', 20, 20, 300, 200], ['Content management and acquisition', 350, 20, 610, 200], ['Storage and media serving', 520, 260, 440, 130], ['Notifications', 20, 430, 500, 150], ['User access', 560, 430, 400, 150], ['Admin tools', 20, 610, 500, 110]];
// [from, to, path, label, lx, ly]
const E = [
  ['user', 'ombi', 'M160 90 L190 118', 'Request media', 150, 76], ['admin', 'ombi', 'M160 170 L190 142', 'Check / approve', 128, 204],
  ['ombi', 'arr', 'M300 120 H322 V68 H370', 'Sends request', 306, 42], ['arr', 'idx', 'M430 105 V150', 'Search', 372, 132], ['idx', 'arr', 'M520 150 V105', 'Results', 526, 132],
  ['arr', 'qbt', 'M600 70 H655 V125 H680', 'Sends download command', 604, 60], ['qbt', 'truenas', 'M760 155 V250 H615 V300', 'Downloads to', 640, 262 - 14],
  ['truenas', 'jelly', 'M690 323 H800', 'Provides content', 696, 316], ['jelly', 'arr', 'M900 300 V236 H625 V90 H600', 'Content available', 720, 228],
  ['jelly', 'gotify', 'M830 346 V410 H425 V480', 'Triggers notifications', 540, 404], ['ombi', 'email', 'M245 150 V480', 'Content available notification', 251, 330],
  ['gotify', 'user2', 'M500 503 H700', 'Sends notification', 520, 496], ['email', 'user2', 'M245 526 V560 H760 V526', 'Sends notification', 400, 553],
  ['user2', 'jelly', 'M780 480 V455 H875 V346', 'View / stream content', 790, 449], ['admin', 'nzb', 'M40 170 H12 V673 H60', 'Direct control', 16, 665], ['nzb', 'arr', 'M210 673 H338 V92 H370', 'Interact with RRR stack', 214, 665],
];
const INFO = {
  user: 'You or a family member. You ask for a movie or show, and later you get told it is ready.',
  admin: 'The person running the system. Checks and approves requests, and can control everything from a phone.',
  ombi: 'The public-facing portal. You and your family log in and request a movie or a TV show.',
  arr: 'The brains. Intelligent download managers that search for, monitor and acquire movies, TV shows, music and books, and find the right version.',
  idx: 'The indexers for the *Arr apps. They connect to the sources and help the *Arr apps find what they are looking for.',
  qbt: 'A lightweight, powerful torrent client that does the actual downloading, here behind a Surfshark VPN.',
  truenas: 'The central nervous system of the storage. Every downloaded file is stored here: the single source of truth for the whole library.',
  jelly: 'Your personal streaming server, an open-source alternative to Plex, streaming to any device, anywhere.',
  email: 'Ombi can email you when the content you asked for is available.',
  gotify: 'The notification system. A friendly alert on your phone or computer as soon as the media is ready to watch.',
  user2: 'The same you, at the end of the loop: notified, then watching.',
  nzb: 'A mobile app for admins to check on the system, approve requests and troubleshoot, from the palm of your hand.',
};
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const svg = `<svg class="nf-svg" viewBox="0 0 980 735" role="group" aria-label="Full request-to-playback diagram. Click any box to see what it does.">
<defs><marker id="nf-ar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="var(--mute)"/></marker><marker id="nf-ar2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="var(--accent)"/></marker></defs>
${BOX.map(([t, x, y, w, h]) => `<rect class="bx" x="${x}" y="${y}" width="${w}" height="${h}" rx="12"/><text class="bt" x="${x + 14}" y="${y + 20}">${esc(t)}</text>`).join('')}
${E.map(([a, b, d, l, lx, ly]) => `<path class="ed" data-a="${a}" data-b="${b}" d="${d}" marker-end="url(#nf-ar)"/>`).join('')}
${E.map(([a, b, d, l, lx, ly]) => `<text class="el" data-a="${a}" data-b="${b}" x="${lx}" y="${ly}">${esc(l)}</text>`).join('')}
${Object.entries(N).map(([id, [x, y, w, h, t]]) => `<g class="nd" data-id="${id}" tabindex="0" role="button" aria-label="${esc(t)}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="9"/><text x="${x + w / 2}" y="${y + h / 2 + 5}" text-anchor="middle">${esc(t)}</text></g>`).join('')}
</svg>`;
const block = `<figure class="nf-fig">
<style>
.nf-fig{overflow-x:auto}.nf-svg{min-width:760px;display:block}
.nf-svg .bx{fill:none;stroke:var(--line);stroke-width:1.2;stroke-dasharray:3 4}.nf-svg .bt{fill:var(--mute);font:600 11px ui-monospace,Consolas,monospace;text-transform:uppercase;letter-spacing:.08em}
.nf-svg .ed{fill:none;stroke:var(--mute);stroke-width:1.5;stroke-dasharray:6 5;animation:nfd 1.4s linear infinite;opacity:.8;transition:opacity .2s}
@keyframes nfd{to{stroke-dashoffset:-22}}
.nf-svg .el{fill:var(--mute);font:11px ui-monospace,Consolas,monospace;paint-order:stroke;stroke:var(--bg);stroke-width:4px;stroke-linejoin:round}
.nf-svg .nd{cursor:pointer;outline:none}.nf-svg .nd rect{fill:var(--card);stroke:var(--line);stroke-width:1.3;transition:stroke .2s,fill .2s}.nf-svg .nd text{fill:var(--fg);font:600 13px ui-sans-serif,system-ui,sans-serif}
.nf-svg .nd:hover rect,.nf-svg .nd:focus-visible rect{stroke:var(--mute)}.nf-svg .nd.on rect{stroke:var(--accent);stroke-width:2;fill:color-mix(in srgb,var(--accent) 12%,var(--card))}
.nf-svg.sel .ed,.nf-svg.sel .el{opacity:.18}.nf-svg.sel .ed.on{opacity:1;stroke:var(--accent);stroke-width:2.2;marker-end:url(#nf-ar2)}.nf-svg.sel .el.on{opacity:1;fill:var(--fg)}
#nf-info{margin-top:10px;padding:12px 16px;background:var(--card);border:1px solid var(--line);border-left:4px solid var(--accent);border-radius:0 var(--r) var(--r) 0;min-height:3.2em}
</style>
${svg}
<div id="nf-info">Click any box to see what it does and light up its connections.</div>
<figcaption>The full flow, from request to playback. Scroll sideways on a phone.</figcaption>
</figure>
<script>
(()=>{const I=${JSON.stringify(INFO)};const s=document.querySelector('.nf-svg'),box=document.getElementById('nf-info');
const sel=id=>{s.classList.add('sel');s.querySelectorAll('.nd').forEach(n=>n.classList.toggle('on',n.dataset.id===id));s.querySelectorAll('.ed,.el').forEach(e=>e.classList.toggle('on',e.dataset.a===id||e.dataset.b===id));box.textContent=I[id]};
s.querySelectorAll('.nd').forEach(n=>{n.onclick=()=>sel(n.dataset.id);n.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();sel(n.dataset.id)}}})})();
</script>`;
const f = fs.readdirSync('content/posts').map(x => 'content/posts/' + x).find(x => /build-your-own-netflix/.test(x));
const L = fs.readFileSync(f, 'utf8').split('\n');
const a = L.findIndex(l => l.startsWith('<figure class="nf-fig">')), e = L.findIndex((l, i) => i > a && l.startsWith('</script>'));
if (a < 0 || e < 0) throw new Error('markers not found');
L.splice(a, e - a + 1, block);
fs.writeFileSync(f, L.join('\n'));
console.log('ok', f);
