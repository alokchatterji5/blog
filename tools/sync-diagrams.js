// Pulls the current diagram renders from github.com/alokchatterji5/drawio (the source of truth) into static/img/.
// Runs in CI before the build, and locally with: node tools/sync-diagrams.js
const fs = require('fs');
const base = 'https://raw.githubusercontent.com/alokchatterji5/drawio/main/render/';
const map = {
  'darkshield-topologyv2.svg': 'homelab-topology.svg',
  'homelab-storage-solution.drawio.svg': 'homelab-storage-solution.svg',
  'photo-backup.svg': 'photo-backup.svg',
  'darkshieldtopologyv2-WireGuardTunnel.drawio.svg': 'wireguard-tunnel.svg',
};
(async () => {
  for (const [src, dst] of Object.entries(map)) {
    const r = await fetch(base + src);
    if (!r.ok) throw new Error(src + ': HTTP ' + r.status);
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.length < 1000) throw new Error(src + ': suspiciously small');
    fs.writeFileSync('static/img/' + dst, buf);
    console.log('synced', dst, buf.length);
  }
})().catch(e => { console.error(e.message); process.exit(1); });
