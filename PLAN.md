# Blog migration plan (living doc: update status as work proceeds)

Goal: make GitHub Pages (blog.darkshield.co.in) the primary blog. Posts are hand-crafted interactive HTML, no Hugo, no AI-slop tone.
After this exists, the workflow is: user says "I did X" -> I write a new post, commit, push.

## Status
- [x] P1 Inventory + copy sources into `source/`
- [x] P2 Ghost skipped by user. Still need: gh auth, LinkedIn URL
- [x] P3 Design: 3 themes (workshop/paper/terminal), categories in STYLE.md
- [x] P4 build.js + static/theme.css + static/site.js + site.json + .github/workflows/pages.yml (node build.js -> dist, deployed via Actions)
- [~] P5 (4 agents running: A=AI series 1,2,7,8; B=Homelab series; C=foundations+wireguard; D=local drafts 3-6 + About) Convert posts to interactive HTML (parallel, one agent per batch)
- [ ] P6 Repo: replace `alokchatterji5/hugo` content, rename to `blog`, Pages via Actions, keep CNAME
- [ ] P7 Verify live at blog.darkshield.co.in, redirect/canonical notes for Hashnode
- [ ] P8 Write `WORKFLOW.md` (how to add a post) + CLAUDE.md in repo

## Sources (all copied to `source/`)
| Source | Where | Result |
|---|---|---|
| Hashnode (read.darkshield.co.in) | `source/hashnode/` | 13 posts via RSS (GraphQL API is now paid). HTML bodies in `posts/`, meta in `index.json`, 21 images in `img/`, About + 2 series pages saved |
| Local drafts | `source/local/` (from C:\01workspaces\homelab-reboot\blog-posts) | 8 md (series parts 1-6, 07 = Crew, 08 = Stark lab), 4 LinkedIn posts, diagrams (svg/gif/drawio + python generators) |
| GitHub `hugo` | `source/github/hugo/` | Stock Hugo (Stack theme) demo content only, NO real posts. Deploys to gh-pages branch. Safe to replace |
| GitHub `drawio` | `source/github/drawio/` | README only |
| GitHub `hashnode` | 404 (private or doesn't exist) | need user input |
| Ghost | not provided yet | need endpoint |

## Post inventory
Hashnode (13), newest first:
1. i-built-a-little-workshop-to-watch-my-ai-agents-work (Oct 2026) = local 08
2. a-crew-of-ai-agents-runs-my-homelab (Oct 2026) = local 07
3. the-document-system-that-keeps-ai-grounded (Jul 2026) = local 02
4. the-conversation-before-the-build-aligning-with-ai-on-architecture (Jul 2026)
5. experimenting-with-autonomous-ai-agents-openclaw-and-moltbook (Feb 2026)
6. building-a-resilient-homelab-storage-solution-with-truenas (Dec 2025)
7. supercharge-your-terminal-with-opencode-cli-... (Nov 2025)
8. build-your-own-netflix-... (Nov 2025)
9. building-your-own-personal-photo-cloud-... (Nov 2025)
10. building-my-personal-ai-stack-in-a-homelab-... (Nov 2025)
11. how-to-implement-a-site-to-site-wireguard-tunnel-... (Nov 2025)
12. building-a-homelab (Nov 2025)
13. building-a-homelab-unlocking-technical-expertise-at-home (Sep 2025)

Local-only (unpublished): AI-Led Homelab series parts 1, 3, 4, 5, 6 + 4 LinkedIn posts (reuse as post teasers).

Series: `homelab`, `ai-led-homelab`.

## Proposed structure
- Categories: AI-Led Homelab (series) / Homelab Foundations / Storage & Backup / AI Tools / Experiments
- Pages: Home (featured + latest), Posts index with filter chips, Series pages, About (from Hashnode about-me), Links (LinkedIn, GitHub)
- Each post = standalone `posts/<slug>/index.html` (own inline CSS/JS/SVG), wrapped by shared header/footer. Interactive: tabs, expandable diagrams, animated SVG, copy buttons, TOC.
- Themes: 2-3 CSS variable themes (dark "workshop", light "paper", + one accent) with a toggle, saved in localStorage.

## GitHub Pages constraints to tell user
- Static only: no server code, no forms/comments backend (use Giscus or none), no server-side search (client-side JSON index is fine).
- 1 GB repo / 100 MB file limits, ~100 GB/month bandwidth soft limit.
- Custom domain needs CNAME file + DNS CNAME to alokchatterji5.github.io; HTTPS auto via Let's Encrypt.
- Inline JS fine; no external-embed restrictions except what the visitor's browser allows. GIFs large -> prefer animated SVG/CSS.
- Hashnode URLs change; set canonical on Hashnode posts or leave old site up; no server-side 301s on Pages (use meta refresh stubs).

## Blockers / open questions for user
1. `gh` CLI is not logged in -> user must run `gh auth login` (needed for push, rename repo, enable Pages).
2. Ghost endpoint (user said they'd supply it).
3. LinkedIn URL + preferred bio/photo for the About page.
4. Confirm: rename repo `hugo` -> `blog`? (Pages + verified domain stay with the account, repo rename keeps CNAME config.)
5. Is `alokchatterji5/hashnode` a private repo? If so, which content is in it?

## Resume notes
(append here after each work session)
- 2026-11-26: P1 done. Working folder `C:\01workspaces\darkshield-blog`. `extract.js` regenerates posts from `source/hashnode/rss.xml`.
- 2026-11-26 (later): shell built; authoring rules in STYLE.md; post format = content/posts/<slug>.html with <!--meta json-->. Next: review agent output, `node build.js`, preview, then P6 (needs gh auth + LinkedIn). Repo local at C:workspacesdarkshield-blog, git init on main, nothing committed yet.
