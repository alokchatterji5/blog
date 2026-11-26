# Darkshield blog (blog.darkshield.co.in)
Static site, no deps. Read STYLE.md before writing any post. Posts: content/posts/<slug>.html with <!--meta json-->. `node build.js` -> dist/ (must report 0 broken links). Push to main = Actions deploys to Pages.
New post workflow: user says what they did -> write post per STYLE.md (human voice, no invented facts, ask if details missing) -> build -> preview (python -m http.server in dist) -> commit + push. Update PLAN.md "Resume notes".
Old Hashnode: read.darkshield.co.in (RSS source in source/, gitignored). Ghost skipped by user.
