# Running More Than One AI Without Losing Control

*Part 4 of the AI-Led Homelab series*

At some point I noticed I was burning a lot of capacity on work that didn't need it. Writing a repetitive integration script, checking whether a config matched a standard, doing the tenth variation of a task I'd already done nine times — none of that needed the most capable model thinking hard about it. It just needed to get done.

That realization changed how I run this project more than any single technical decision did.

## Not every task deserves the expensive model

The instinct when you first start working with AI on something real is to throw everything at whichever model feels smartest. That's fine for a hobby chat. It's wasteful for a project running for months. Architecture decisions, anything ambiguous, anything where being wrong is costly — that deserves real reasoning and real attention. Repetitive, narrowly-scoped, well-specified work doesn't need the same thing twice.

So I split it. Claude stays on architecture, review, and keeping an eye on the whole project. A second model — Gemini, in my case — picks up narrower, well-defined work where the task is clear enough that it doesn't need deep judgment, just execution. It's not "one AI does everything." It's matching the size of the tool to the size of the task, on purpose, instead of by default.

## The coordination problem

The second you have more than one model touching a real project, you have a new problem: how do changes from two different sources not collide, and how do you know what actually landed versus what was just proposed.

The answer turned out to be one I already knew from years of working with human teams: version control. Each model works on its own line of work. Nothing merges into the main line automatically. One side reviews the other's work before it lands — and I review the merges that actually matter. It's a completely ordinary engineering workflow. The only twist is that some of the branches belong to an AI instead of a colleague.

## Staying the one watching the whole board

This is the part I'm most deliberate about. Splitting work across models makes it easy to end up with a project where nobody — including me — has the full picture. So Claude doesn't just do its own slice of work; it's the one that keeps context on the project as a whole, reviews what the other model produced, and flags when something doesn't fit the architecture we agreed on. I still make the calls that matter. But I'm reviewing a smaller, pre-filtered set of decisions instead of every line of everything.

## Why this matters more than it sounds like it should

Running AI as a real collaborator on a real project isn't free, and pretending otherwise is how projects like this get abandoned — not because the idea failed, but because the cost crept up and nobody was managing it. Being deliberate about which model does which kind of work, and using something as boring as branches and reviews to keep it coordinated, is what makes this sustainable past the first exciting week.

---

*Next: the actual shape of the system — how the network, identity, service, and observability layers fit together, without getting into a single config file.*
