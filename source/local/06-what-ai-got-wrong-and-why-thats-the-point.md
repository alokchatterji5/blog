# What AI Got Wrong (And Why That's the Point)

*Part 6 of the AI-Led Homelab series*

If the first five posts made this sound like it always goes smoothly, that's on me, not the project. It doesn't. AI has gotten things wrong on this build more than once, and I've come to think that's not a flaw in the approach — it's a normal cost of the approach, and worth talking about honestly instead of editing out.

## The pattern behind most of the mistakes

Almost every real mistake traced back to the same root cause: something got decided in one conversation and didn't make it into a document, so a later session — sometimes weeks later, sometimes a different model entirely — didn't know it existed. AI proposed something technically sound that quietly broke a principle we'd already agreed on. Not because it reasoned badly. Because the reasoning had nothing to check itself against.

That's not really an AI problem. It's a documentation problem wearing an AI costume. It just shows up faster and more often when AI is doing a lot of the day-to-day work, because the volume of decisions being made goes up.

## The other kind of mistake

The second pattern is overconfidence — a plausible, well-explained, wrong answer, delivered with the same tone as a plausible, well-explained, right one. This is the one that actually requires me, specifically, in the loop. AI is good at sounding sure. It's not always right to be. The job on my side isn't catching every mistake — it's knowing which categories of claim deserve a second look before they turn into an action, especially anything crossing into the "irreversible" side of the delegation rule from post three.

## What I do differently now

Every real mistake goes into a log — not a fix-and-forget, an actual record of what happened and why. Not to keep score. Because the log is what breaks the pattern. A decision that got missed once because it wasn't written down gets written down after the first time it causes a problem, and it doesn't cause that same problem again.

I've also gotten more deliberate about which sessions get a "catch me up" moment before real work starts — a quick pass through what's changed and what's been decided recently — instead of assuming the docs alone will always be perfectly current. They're good. They're not infallible. Neither am I.

## Why I still think this is the right way to build

None of this is an argument against building this way. It's an argument for building this way *honestly*. A solo homelab builder was never going to have a perfect project regardless of tooling — time was always the constraint, and mistakes were always going to happen somewhere. What changed is that the mistakes now get caught earlier, logged instead of forgotten, and don't require me to personally remember every decision I've ever made about my own infrastructure.

The owner still has to hold command. That hasn't changed and I don't think it should. What's changed is what "holding command" actually costs, day to day — and for a one-person project competing with a full-time job for attention, that's the entire point.

---

*This closes the core arc of the AI-Led Homelab series. From here, EDITH Dispatch picks up as an ongoing set of field notes — as milestones happen, not on a schedule.*
