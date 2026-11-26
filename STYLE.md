# Post authoring guide (read before converting a post)

Output: `content/posts/<slug>.html`. Keep the ORIGINAL Hashnode slug for Hashnode posts. Build with `node build.js` (must print 0 broken links). Preview: open `dist/<slug>/index.html`.

## File format
```
<!--meta
{"title":"...","subtitle":"optional","date":"YYYY-MM-DD","summary":"one honest sentence, <160 chars","category":"AI-Led Homelab","series":"AI-Led Homelab","part":2,"tags":["homelab"],"cover":"img/xyz.png"}
-->
<div class="tldr"><h4>The short version</h4><p>2-3 sentences.</p></div>
<div class="toc"></div>   <!-- optional, auto-filled from h2, for long posts only -->
<h2>...</h2> ...
```
- Categories (use exactly): `AI-Led Homelab`, `Homelab Foundations`, `Storage & Backup`, `AI Tools`, `Experiments`.
- Series (only if it belongs): `AI-Led Homelab` (parts 1-6 + crew + stark workshop, order by `part`), `Homelab` (check `source/hashnode/series_homelab.html` for membership).
- Images live in `static/img/` (already copied; Hashnode images keep their hash filenames, see `source/hashnode/posts/<slug>.html` for which is used). Reference as `../img/<file>` inside the body, cover as `img/<file>` in meta. Add alt text.
- Dates: from `source/hashnode/index.json` (pubDate). Local-only posts: use 2026-11-20 minus 1 day per part so they sort in order (part 1 = 2026-11-14 ... part 6 = 2026-11-19), skipping parts already on Hashnode.

## Voice (important)
First person, plain, a bit dry-humoured, like the original. No AI-slop: no "In today's fast-paced world", "delve", "unlock", "game-changer", no emoji headers, no filler intros, no summary that restates the post, no em-dash chains. Not a tutorial: the point is to keep a reader interested. Cut padding, keep every real fact, number, command and the author's opinions. NEVER invent facts, results, hardware or numbers not in the source. If something is ambiguous, keep the original wording.

## Make it more than markdown (pick what fits, don't force it)
Prefer one-page density: a reader should get the idea in 60 seconds and be able to dig in.
- `<div class="tabs"><section data-title="Before">...</section><section data-title="After">...</section></div>` for comparisons, per-OS steps, option A/B.
- `<details><summary>..</summary>..</details>` for long commands/configs/side-notes.
- Inline SVG diagrams for architecture/flow, using CSS variables for colour (`var(--accent)`, `var(--card)`, `var(--line)`, `var(--fg)`, `var(--mute)`) so all 3 themes work. Animate with CSS `@keyframes` or SMIL (packets moving along paths, pulsing nodes). Wrap in `<figure>` with `<figcaption>`. Include `<style>` scoped by a unique class prefix inside the post when needed. Existing diagrams in `static/img/` (svg/gif) can be reused with `<img>`.
- Small vanilla JS widgets in a `<script>` at the end of the post body (e.g. click a node to see what it does, toggle layers, a tiny calculator). No external libraries, CDNs, fonts or trackers. Must work offline.
- `.callout`, `.callout.warn`, `.callout.tip` for asides; tables for specs.
- Convert existing GIFs to animated SVG/CSS only when quick; otherwise keep the GIF (GitHub Pages is fine with it, just avoid new large binaries).
- Accessibility: alt text, real headings, `prefers-reduced-motion` is already handled globally.

## Done when
`node build.js` passes; each post has TL;DR, correct meta, working images; you list in your final report: files written, any facts you were unsure about, anything dropped. Do not commit. Do not edit files other than your own posts (plus new files in `static/img/` with a unique name).

## Series membership (from Hashnode series pages)
- `Homelab`: openclaw-moltbook, truenas-storage, opencode-cli, build-your-own-netflix, personal-photo-cloud, building-my-personal-ai-stack. Order by date.
- `AI-Led Homelab`: the-conversation-before-the-build (part 1), the-document-system (part 2), then local drafts parts 3-6, then a-crew-of-ai-agents (part 7), i-built-a-little-workshop (part 8). Local draft 01 ("How I'm Actually Building EDITH") may overlap with "the-conversation-before-the-build": compare and, if it's the same post, skip it and say so.
- Standalone (no series): building-a-homelab, building-a-homelab-unlocking-technical-expertise-at-home, wireguard site-to-site.
