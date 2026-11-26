// Inserts one diagram per thin AI-Led post. Idempotent: blocks are wrapped in <!--dg-->...<!--/dg-->.
// Every label restates what the post itself says. Run: node tools/ai-led-diagrams.js
const fs = require('fs');
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
const lines = (t, x, y, lh = 16, cls = '') => (Array.isArray(t) ? t : [t]).map((s, i, a) => `<text class="${cls}" x="${x}" y="${y + (i - (a.length - 1) / 2) * lh}" text-anchor="middle">${esc(s)}</text>`).join('');
const node = (x, y, w, h, t, cls = '', extra = '') => `<g class="nd ${cls}" ${extra}><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10"/>${lines(t, x + w / 2, y + h / 2 + 4)}</g>`;
const arrow = (d, cls = 'flow') => `<path class="ln ${cls}" d="${d}" marker-end="url(#dga)"/>`;
const defs = `<defs><marker id="dga" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="var(--mute)"/></marker></defs>`;
const wrap = (label, vb, body, cap) => `<!--dg--><figure class="dgf"><svg class="dg" viewBox="${vb}" role="img" aria-label="${esc(label)}">${defs}${body}</svg><figcaption>${esc(cap)}</figcaption></figure><!--/dg-->`;

// Part 2: how a session stays grounded
const d2 = wrap('How every AI session starts from the docs, not from memory', '0 0 760 175', `
${node(10, 30, 140, 66, ['A new AI session', '(any model)'])}${node(160, 30, 140, 66, ['Reads AGENTS.md,', 'CLAUDE.md or', 'GEMINI.md first'], 'ac')}${node(310, 30, 140, 66, ['Works inside the', 'numbered folders'])}${node(460, 30, 140, 66, ['Decisions go in the log,', 'progress in the tracker'])}${node(610, 30, 140, 66, ['The next session', 'starts informed'], 'ac')}
${arrow('M150 63 H160')}${arrow('M300 63 H310')}${arrow('M450 63 H460')}${arrow('M600 63 H610')}
${arrow('M680 96 V140 H80 V98')}<text class="m" x="380" y="134" text-anchor="middle">and round again, so the project state lives in files, not in a chat window</text>`,
  'The loop that keeps a project from living in a chat window.');

// Part 3: the leash
const chips = (items, x, y, cls) => items.map((t, i) => `<g class="nd ${cls}"><rect x="${x}" y="${y + i * 48}" width="290" height="38" rx="9"/><text x="${x + 16}" y="${y + i * 48 + 24}">${esc(t)}</text></g>`).join('');
const d3 = wrap('Can this be undone? Undoable actions get a long leash, the rest are mine', '0 0 760 300', `
<text class="h good" x="20" y="34">UNDOABLE</text><text class="m" x="20" y="54">AI just goes</text>
<text class="h bad" x="740" y="34" text-anchor="end">NOT UNDOABLE</text><text class="m" x="740" y="54" text-anchor="end">mine, every time</text>
<line class="gate" x1="380" y1="14" x2="380" y2="262"/><rect class="gl" x="310" y="262" width="140" height="30" rx="15"/><text class="gt" x="380" y="282" text-anchor="middle">can this be undone?</text>
${chips(['Provision a new container', 'Draft a design doc', 'Run a check'], 20, 78, 'okc')}
${chips(['Delete something on the running lab', 'Overwrite a working config', 'Hold a credential between sessions', 'Change a settled decision'], 450, 78, 'nok')}
<path class="ln flow ok" d="M318 97 H346" marker-end="url(#dga)"/><path class="ln flow ok" d="M318 145 H346" marker-end="url(#dga)"/><path class="ln flow ok" d="M318 193 H346" marker-end="url(#dga)"/>`,
  'One question decides it. New and reversible: go. Anything that deletes, overwrites, holds credentials or reopens a settled call: me.');

// Part 4: two models, one git history
const d4 = wrap('Claude and Gemini each work on their own branch; reviews gate what reaches main', '0 0 760 300', `
<text class="m" x="20" y="22">Claude: architecture, review, the whole-project view</text>
<text class="m" x="20" y="288">Gemini: narrow, well-defined work</text>
<text class="m" x="20" y="132">main: nothing merges automatically</text>
<path class="lane" d="M20 150 H740"/><path class="lane c" d="M100 150 C120 150 130 55 160 55 H520 C550 55 560 150 590 150"/><path class="lane g" d="M100 150 C120 150 130 245 160 245 H520 C550 245 560 150 590 150"/>
${[200, 320, 440].map(x => `<circle class="cm c" cx="${x}" cy="55" r="7"/>`).join('')}${[240, 360, 480].map(x => `<circle class="cm g" cx="${x}" cy="245" r="7"/>`).join('')}${[100, 590, 660].map(x => `<circle class="cm" cx="${x}" cy="150" r="7"/>`).join('')}
<path class="ln flow" d="M380 70 V230" marker-end="url(#dga)"/><text class="m" x="392" y="196">reviews the other's work</text>
<g class="rv"><rect x="570" y="72" width="68" height="26" rx="13"/><text x="604" y="90" text-anchor="middle">review</text></g><g class="rv"><rect x="570" y="202" width="68" height="26" rx="13"/><text x="604" y="220" text-anchor="middle">review</text></g>
<g class="me"><circle cx="706" cy="113" r="7"/><path d="M693 135 c0-12 26-12 26 0z"/></g><text class="m" x="706" y="182" text-anchor="middle">I review the</text><text class="m" x="706" y="198" text-anchor="middle">merges that matter</text>
<circle r="5" class="dot c"><animateMotion dur="5s" repeatCount="indefinite" path="M100 150 C120 150 130 55 160 55 H520 C550 55 560 150 590 150 H740"/></circle><circle r="5" class="dot g"><animateMotion dur="5s" begin="1.6s" repeatCount="indefinite" path="M100 150 C120 150 130 245 160 245 H520 C550 245 560 150 590 150 H740"/></circle>`,
  'Ordinary version control, except some of the branches belong to an AI.');

// Part 5: the four layers (clickable, drives the existing buttons)
const lay = (i, y, t) => `<g class="nd lyr" data-i="${i}" tabindex="0" role="button" aria-label="${esc(t[0])}"><rect x="150" y="${y}" width="460" height="62" rx="12"/>${lines([t[0]], 380, y + 27, 16, 'tt')}<text class="m" x="380" y="${y + 47}" text-anchor="middle">${esc(t[1])}</text></g>`;
const d5 = wrap('Four layers: single entry point, shared identity, services, and observability around all of it', '0 0 760 360', `
<g class="nd lyr obs" data-i="3" tabindex="0" role="button" aria-label="Observability"><rect x="20" y="14" width="720" height="332" rx="18"/><text class="h" x="40" y="42">OBSERVABILITY</text><text class="m" x="40" y="60">sees everything, changes nothing</text></g>
${lay(0, 84, ['One front door', 'every request goes through here first'])}${lay(1, 168, ['One identity decision', 'who gets in is decided once, then inherited'])}${lay(2, 252, ['The services', 'the actual homelab: plug in, stay simple'])}
${arrow('M380 146 V168')}${arrow('M380 230 V252')}${arrow('M60 115 H150')}<text class="m" x="58" y="104">request</text>`,
  'The shape of the build, with no tools named. Click a layer.');

// Part 6: the pattern behind most mistakes
const P = [[0, 'A decision gets made', 'in a conversation'], [72, 'It never makes it', 'into a document'], [144, 'A later session', "doesn't know it exists"], [216, 'AI proposes something sound', 'that breaks it'], [288, 'The mistake goes in the log', 'and gets written down']];
const d6 = wrap('The loop behind most AI mistakes: a decision that never got written down', '0 0 760 340', `
<path class="ln flow orbit" d="M660 175 A280 105 0 1 1 100 175 A280 105 0 1 1 660 175"/>
<circle r="5" class="dot"><animateMotion dur="14s" repeatCount="indefinite" path="M380 70 A280 105 0 0 1 660 175 A280 105 0 0 1 380 280 A280 105 0 0 1 100 175 A280 105 0 0 1 380 70"/></circle>
${P.map(([a, l1, l2], i) => { const x = 380 + 280 * Math.sin(a * Math.PI / 180), y = 175 - 105 * Math.cos(a * Math.PI / 180); return node(Math.round(x - 100), Math.round(y - 28), 200, 56, [l1, l2], i === 4 ? 'ac' : i === 3 ? 'bad' : ''); }).join('')}
<text class="m" x="380" y="170" text-anchor="middle">That is a documentation problem</text><text class="m" x="380" y="188" text-anchor="middle">wearing an AI costume</text>`,
  'Written down once, it stops causing the same problem.');

const jobs = [
  ['the-document-system-that-keeps-ai-grounded', d2, /<h2>One big notes file/],
  ['the-delegation-playbook', d3, /<h2>The only rule that matters/],
  ['running-more-than-one-ai-without-losing-control', d4, /<h2>The coordination problem/],
  ['the-layers-how-the-pieces-actually-talk', d5, /<h2>One front door/],
  ['what-ai-got-wrong-and-why-thats-the-point', d6, /<h2>What I do differently now/],
];
for (const [slug, html, before] of jobs) {
  const f = 'content/posts/' + slug + '.html';
  let s = fs.readFileSync(f, 'utf8').replace(/<!--dg-->[\s\S]*?<!--\/dg-->\n?/, '');
  const m = s.match(before) || (() => { throw new Error('anchor missing in ' + slug); })();
  s = s.slice(0, m.index) + html + '\n' + s.slice(m.index);
  if (slug.startsWith('the-layers') && !s.includes('.dg .lyr')) s = s.replace('</script>', `document.querySelectorAll('.dg .lyr').forEach(g=>{const go=()=>{document.querySelectorAll('.dg .lyr').forEach(x=>x.classList.toggle('sel',x===g));document.querySelector('.ly-btns').children[g.dataset.i].click()};g.onclick=go;g.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();go()}}});\n</script>`);
  fs.writeFileSync(f, s);
  console.log('diagram ->', slug);
}
