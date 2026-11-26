// Home page body. Right column: clickable rack + terminal. Outputs only describe roles (no invented numbers).
const UNITS = [
  { id: 'pfsense', name: 'pfSense', cmd: 'status pfsense', out: ['role: firewall and VLANs', 'every packet in and out passes here', 'the AI agents sit on their own segment'] },
  { id: 'proxmox', name: 'Proxmox', cmd: 'status proxmox', out: ['role: hypervisor', 'VMs and containers live here', 'the whole lab runs 24x7 on top of it'] },
  { id: 'truenas', name: 'TrueNAS', cmd: 'status truenas', out: ['role: ZFS storage', 'photos, media and backups', 'replicates to a second site over WireGuard'] },
  { id: 'ai', name: 'AI stack', cmd: 'status ai-stack', out: ['role: local models', 'Ollama + Open WebUI', 'private, offline, occasionally unstable'] },
  { id: 'crew', name: 'Agent crew', cmd: 'status crew', out: ['EDITH orchestrates', 'FRIDAY, VERONICA, JARVIS, DUM-E do the work', 'read-only by default, a human approves the risky bits'] },
];

const rack = () => {
  const h = 44, gap = 8, top = 14;
  const units = UNITS.map((u, i) => {
    const y = top + i * (h + gap), leds = [0, 1, 2].map(k => `<circle class="led l${(i + k) % 3}" cx="${44 + k * 14}" cy="${y + h / 2}" r="3.5"/>`).join('');
    const vents = [0, 1, 2, 3, 4, 5].map(k => `<line x1="${250 + k * 9}" y1="${y + 12}" x2="${250 + k * 9}" y2="${y + h - 12}"/>`).join('');
    const robot = u.id === 'crew' ? `<g class="bot" transform="translate(352 ${y + 8})"><line x1="14" y1="0" x2="14" y2="5"/><circle class="ant" cx="14" cy="-1" r="2.2"/><rect x="2" y="5" width="24" height="22" rx="6"/><circle cx="10" cy="15" r="2.6" class="eye"/><circle cx="19" cy="15" r="2.6" class="eye"/></g>` : '';
    return `<g class="unit${i === 0 ? ' on' : ''}" data-u="${u.id}" data-cmd="${u.cmd}" data-out="${u.out.join('|')}" tabindex="0" role="button" aria-label="${u.name}">
<rect class="body" x="20" y="${y}" width="380" height="${h}" rx="8"/>${leds}<text x="92" y="${y + h / 2 + 5}">${u.name}</text><g class="vents">${vents}</g>${robot}</g>`;
  }).join('');
  const H = top * 2 + UNITS.length * (h + gap) - gap;
  return `<svg class="rack" viewBox="0 0 420 ${H}" role="group" aria-label="Interactive homelab rack: click a unit"><line class="cable" x1="10" y1="0" x2="10" y2="${H}"/><circle r="3.5" class="pkt"><animateMotion dur="3.2s" repeatCount="indefinite" path="M10 0 V${H}"/></circle>${units}</svg>`;
};

module.exports = ({ site, posts, cats, words, avatar, esc, card }) => `<div class="wrap wide"><section class="hero2">
<div class="hl"><div class="prompt"><b>${site.handle}</b> <i>~</i> $ <span id="typed" data-text="cat welcome.txt">cat welcome.txt</span><span class="cursor"></span></div>
<h1 class="headline">A homelab run by <em>AI&nbsp;agents</em>, and everything that broke along the way.</h1>
<p class="lede">${site.tagline}</p>
<div class="btns"><a class="btn pri" href="#posts">ls posts/</a><a class="btn" href="./about/">cat about.txt</a></div>
<a class="who" href="${site.links.find(l => /linkedin/i.test(l.label)).url}" rel="me">${avatar.replace('ROOT', './')}<span>${site.author}<small>${site.role}</small></span></a>
<div class="stats"><div class="stat"><b>${posts.length}</b><small>posts</small></div><div class="stat"><b>${(words / 1000).toFixed(0)}k</b><small>words</small></div><div class="stat"><b>${Math.max(1, Math.round(words / posts.length / 220))}min</b><small>avg read</small></div><div class="stat"><b>${posts[posts.length - 1].date.slice(0, 4)}</b><small>since</small></div></div></div>
<div class="hr"><div class="rackbox">${rack()}<p class="hint">click a unit</p></div>
<div class="term"><div class="bar"><i></i><i></i><i></i><span>${site.handle}: ~/lab</span></div><div class="body" id="tbody" aria-live="polite">
<div class="l"><span class="p">$</span> <span id="tcmd">status pfsense</span></div><div id="tout"></div>
<div class="l d" style="margin-top:8px">latest: <a href="${posts[0].slug}/">${esc(posts[0].title)}</a></div></div></div></div>
</section>
<div class="chips" id="posts"><span class="chip on" data-f="all">all ${posts.length}</span>${cats.map(c => `<span class="chip" data-f="${esc(c)}">${esc(c)}</span>`).join('')}</div>
<div class="grid">${posts.map(p => card(p, './')).join('')}</div></div>`;
