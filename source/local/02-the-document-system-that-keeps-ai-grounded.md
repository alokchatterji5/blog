# The Document System That Keeps AI Grounded

*Part 2 of the AI-Led Homelab series*

A couple of weeks into working with AI on this project, I ran into the same problem over and over. I'd explain something in one session — a decision, a reason, a constraint — and by the next session it was gone. Not because AI forgot on purpose. A chat window just isn't a place where project state lives. It's a conversation, and then it ends.

The fix wasn't a smarter prompt. It was documentation, treated as part of the project itself, not something I'd get to later.

## One big notes file didn't hold up

I started with a single running doc, everything in one place, added as I went. It broke down fast. A file mixing "why I chose this identity provider" with "what's currently broken" with "step three of a migration" isn't useful to me skimming it, and it isn't useful to AI trying to get oriented for one task. Everything's in there, so nothing's actually findable.

## Splitting by topic, not by date

I organized things into folders by concern instead of by when something was written. Each folder covers exactly one topic and doesn't need to know what's in any of the others to make sense. Roughly, it looks like this:

```
project/
|-- AGENTS.md
|-- CLAUDE.md
|-- GEMINI.md
|
|-- 01-strategy/
|   |-- strategy-master.md
|   |-- decision-log.md
|   |-- principles.md
|
|-- 02-infrastructure/
|   |-- infra-master.md
|   |-- capacity-notes.md
|   |-- host-inventory.md
|
|-- 03-standards/
|   |-- standards-master.md
|   |-- naming-conventions.md
|   |-- deployment-checklist.md
|
|-- 04-networking/
|   |-- networking-master.md
|   |-- identity-and-access.md
|   |-- observability-master.md
|
|-- 05-migration/
|   |-- migration-guide.md
|   |-- progress-tracker.md
|   |-- lessons-learned.md
|   |-- operations-gotchas-log.md
|
|-- 06-implementation/
|   |-- service-a/
|   |   |-- notes.md
|   |   |-- config-decisions.md
|   |-- service-b/
|   |   |-- notes.md
|   |-- service-c/
|       |-- notes.md
|
|-- 07-automation/
    |-- automation-guide.md
    |-- scripts/
    |   |-- (provisioning and integration scripts)
    |-- runbooks/
        |-- (step-by-step recovery/maintenance procedures)
```

**Legend**

`AGENTS.md`, `CLAUDE.md`, `GEMINI.md` — read first, every session, regardless of which model shows up.

`01-strategy` — the why, and the lines that don't move.

`02-infrastructure` — the physical/virtual shape of things.

`03-standards` — the conventions every new service has to follow, so nothing feels bolted on.

`04-networking` — how traffic, identity, and monitoring flow between everything.

`05-migration` — the bridge from old to new, plus a tracker and a running log of what broke and what was learned from it.

`06-implementation` — one folder per service, the actual build notes.

`07-automation` — what runs on its own, and the procedures for when something needs a human.

The numbers aren't decoration. They enforce order — you can't reasonably start on implementation before strategy exists, and having the folder sitting there at 06 is a constant reminder of that.

Within each folder, the same few document types tend to repeat:

A **master doc** — the settled reasoning for that topic. Changes rarely, and only with real justification.

A **tracker** — what's done, in progress, blocked. Updated constantly, more disposable in spirit even though I keep the history.

A **log** — not a tracker, a record of decisions and mistakes. Answers "why did we do it this way" and "what went wrong last time" without anyone needing to remember.

## The files every AI reads first

Sitting at the root are a few files that aren't about the homelab itself — they're about how to work on it. One is model-agnostic: rules of engagement, what's settled and shouldn't be re-litigated, what to ask before touching something. On top of that, each model has its own short file with quirks specific to it — how Claude should approach a session versus how Gemini should. Same underlying rules, small adjustments for how each one actually behaves.

Every session, regardless of which model shows up, reads these before anything else. It's the context I never have to repeat.

## What it actually gets me

Mostly speed. A new session doesn't start with me re-explaining history. It reads the relevant docs and it's oriented in minutes, not by relitigating decisions from memory — mine or its.

The bigger thing is consistency. Nobody remembers every decision correctly after enough time passes, including me. This way, the project's memory doesn't depend on my memory or on any one session getting it right. It depends on the docs staying current — and keeping them current is itself something AI now handles, since that's exactly the kind of upkeep that used to get skipped.

If you're setting up something similar, the folder names don't matter. The separation does — one topic per space, a clear order, and one file that tells whoever (or whatever) shows up how to operate before they touch anything.

---

*Next: what actually gets a long leash versus a short one, and how that line holds up in practice.*
