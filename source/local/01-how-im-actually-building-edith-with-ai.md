# How I'm Actually Building EDITH With AI

*Part 1 of the AI-Led Homelab series*

My homelab wasn't built. It accumulated — years of adding one service at a time, whatever solved the problem I had that month, using whatever I knew at the time. That's normal, and it's also how you end up with a system that works but that you'd never design on purpose if you started today.

This year I had two things I didn't have before: a much clearer sense of how I'd actually want it built, and an AI capable enough to be a real partner in doing it. So I started over — properly, from architecture down — and let AI run point on a lot of the actual build. I'm calling the project EDITH.

That's the story part. Here's the part that actually matters if you're thinking about doing this yourself.

## Where I actually spent time

Not writing configs. The first real chunk of time went into an architecture conversation with Claude — no code, just talking through what the homelab needed to do, what principles it had to follow, where I didn't want compromises (data ownership, single points of failure, consistent auth). That conversation became the spec. Everything after it had to justify itself against that spec.

Second chunk of time: documentation, before a single service existed. That felt backwards the first time I did it. It isn't. A homelab you're building with AI lives or dies on whether the AI can pick up exactly where it left off, and that only works if the state of the project lives somewhere outside the chat window.

## How the documents are organized

I split things into a few distinct documents instead of one giant wall of notes:

A master architecture/strategy doc — the "why," rarely changes.

Domain-specific design docs — networking and observability, identity and access policy — each owned by its topic, not mixed together.

A progress tracker — what's done, what's in flight, what's blocked, updated as we go.

A decision log — why we chose what we chose, so six months from now neither of us re-litigates a settled question.

This separation matters more than it sounds like it should. When I bring AI into a session, it doesn't need the whole history — it reads the docs relevant to the task at hand and it's instantly grounded. No re-explaining, no drift.

Structurally, it's just numbered folders — strategy, infrastructure, standards, networking, migration, implementation, automation — each one scoped to a single concern. Nothing fancy. The numbering just enforces an order of operations: you can't skip to implementation before strategy exists.

## Guardrails and access

AI has real access in this project — not just chat. It can SSH into my Proxmox hypervisor, spin up LXC containers, and provision them. That's a meaningfully different thing from "AI helped me write a script." It's closer to having infrastructure staff.

That access is scoped, not blanket. A few rules I hold firm on:

Anything destructive or irreversible on the *existing, working* homelab — I do that myself, or I approve it explicitly before it happens.

Credentials, tokens, and secrets are never something AI holds onto between sessions. They get provided fresh when needed and nowhere else.

Provisioning new infrastructure, drafting configs, writing docs, running checks — AI does that with a long leash. Touching anything already in production — short leash, human in the loop.

The rule of thumb: reversible and additive, let it run. Irreversible or subtractive, I'm the one who pulls the trigger.

## What actually gets automated

New LXC provisioning end to end. Drafting the reverse proxy and auth strategy for a new service before I've thought about it myself. Updating the trackers and docs as work happens, so I'm not the one maintaining project hygiene by hand at 11pm. Catching inconsistencies between what a design doc says and what's actually running.

What doesn't: the final call on architecture changes, anything touching my existing production lab, and access control decisions. Those stay mine.

## Why this beats doing it solo

A homelab is a one-person team with a day job. That's the real constraint — not skill, not curiosity, time. AI doesn't change what a homelab *is*, but it changes what a single person with two hours on a Tuesday night can actually get done. Documentation that would never get written otherwise, gets written. Consistency across forty services that would drift after service twelve, gets held. The stuff that used to get skipped because it's tedious and not fun — that's exactly the stuff AI is good at picking up.

The owner still has to hold command, though. AI will happily generate a confident, well-reasoned, wrong answer. The job shifts from "do everything yourself" to "review everything that matters and let go of everything that doesn't."

## Where it's a genuinely great way to learn

I understand my own architecture better now than any homelab I've built solo — because I had to explain it, defend it, and watch something push back on it in real time. Explaining a design to something that asks good questions is one of the fastest ways to actually learn the design.

## Where AI got it wrong

It's happened. A couple of times AI proposed a networking approach that technically worked but didn't match a principle we'd agreed on three weeks earlier — because that context lived in a doc it hadn't read for that session. A couple of times it was overconfident about something that needed a second opinion.

Every one of those goes into the decision log as a lesson, not just a fix. The point isn't a spotless project — it's a project that gets more grounded every time something goes wrong.

## Being deliberate about tokens

Running AI as a genuine collaborator on a real project uses real usage — and burning through it carelessly is its own failure mode. A couple of things that changed how I work:

I don't ask AI to redo work it's already grounded in — the docs exist so I don't have to re-explain, and it doesn't have to re-derive.

Not every task needs the most capable model running at full context. Some of the more repetitive or narrowly-scoped work gets offloaded to a second model — Gemini, in my setup — while Claude stays focused on architecture-level decisions and keeps an eye on the overall picture. It's less "one AI does everything" and more "the right amount of model for the task," with someone still watching the whole board.

## Git as the coordination layer

When more than one model is touching the project, git is what keeps it sane. Claude and Gemini work on separate branches. Nothing lands on the main line without review — Claude reviews Gemini's branch, I review the merges that matter. It's a normal engineering workflow, just with more than one contributor that happens to be an AI.

## It's not just code

This is the part that surprised me most. This isn't "AI helped me write a script." AI has SSH'd into my Proxmox host, spun up containers, and worked inside them. It operates at the infrastructure layer, not just the text-editor layer. That's a different category of collaborator than most people picture when they hear "AI homelab."

## How the layers fit together

Without getting into configs — the shape of it is a few distinct layers, each with a clear job, each built by walking through the same process above:

A network layer, where a single reverse proxy is the front door for everything, so there's one place that governs how traffic reaches any service.

An identity layer sitting in front of that — single sign-on, so "who has access to what" is one decision made in one place, not re-implemented per service.

A service layer — the actual applications, media, tools, whatever the lab is for — that all inherit the same entry point and the same identity rules instead of reinventing them.

An observability layer wrapping around all of it, watching without being in the critical path, so I know what's happening without it being able to break what's happening.

Each of those layers went through the same loop: architecture conversation, documentation, delegation, review. That loop is really the whole system. The layers are just where it gets applied.

---

*Next: the specific playbook for delegation — what I hand off completely, what I keep on a short leash, and how that boundary actually gets enforced day to day.*
