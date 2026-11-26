---
title: "I Built a Little Workshop to Watch My AI Agents Work"
subtitle: "A free, read-only, vibe-coded view of who hands what to whom. It never calls a model and it only runs when you're looking."
tags: homelab, ai, selfhosted, automation, vibecoding
---

# I Built a Little Workshop to Watch My AI Agents Work

In the last post, [A Crew of AI Agents Runs My Homelab](https://read.darkshield.co.in/a-crew-of-ai-agents-runs-my-homelab), I introduced the crew that runs my homelab. Five agents, each with a job, all behind one chat. If you haven't read it, that's the best place to start, because this one picks up right where it left off.

There was one thing I couldn't get over once they were running. I had no idea what they were actually doing.

I'd send a message, wait a few seconds and get an answer. Somewhere in between, one agent had passed work to another, maybe a model had been swapped because the first choice was out of credit, and a few things had been checked. All of it was invisible. I was trusting a black box that happened to be well behaved.

So I built a window into it. It's a small animated page, set in a Tony Stark style workshop, where each agent is a character and you can watch the hand-offs happen.

![The workshop, with the agents at their stations](diagrams/02-stark-lab.gif)

It's not a serious monitoring tool. It's a toy that happens to answer a real question, and building it was some of the most fun I've had on this project.

## What you actually see

Each agent has its own pod in the workshop with a name tag and the model it's running right now. The model comes from the data, not from a label I typed in, so if an agent quietly falls back to a different one, the tag changes and a small chip shows up to say so.

When I send a request, the director picks it up and walks it over to a holographic table in the middle of the room. The specialist who owns the job steps up, does the work, and passes the result back. A glowing reactor in the corner pulses with the overall activity.

There's a list of events down the side. Click one and it replays what happened: who talked to whom, in what order, how long each step took.

## Making milliseconds visible

Here's the part I like most. A hand-off between two agents often takes a few milliseconds. On a real timeline that's a blink you'd never see.

So the page cheats, on purpose. When a hand-off is very fast, it stretches the moment so you can actually watch it, and it shows the real number next to it so it's honest about what happened. A 40 ms hand-off gets a couple of seconds on screen with "real time: 40 ms" in the corner.

It sounds like a small thing, but it's what turns a log into something you want to watch.

## Why it costs nothing to run

The picture is built from data the agents already leave behind: a log of what each model call cost, a list of conversations, and the history of scheduled jobs. The page reads those files, works out what happened and draws it.

That's it. There is no model in the loop.

- It never calls a language model, so there are no tokens to pay for.
- It never sees the text of your messages, only that a call happened, when, how long it took and which model served it.
- It's read-only. It can't change anything, and it can't send anything.
- It only does any work while somebody has the page open. Close the tab and it goes back to sleep, so it isn't using resources when nobody is watching.

If you're careful about what your agents are allowed to do, you'll appreciate that the thing watching them has even fewer permissions than they do.

## Where the idea came from

I didn't start from a blank page. Two open source projects got me thinking about this in the first place:

- **The Delegation** by arturitu ([github.com/arturitu/the-delegation](https://github.com/arturitu/the-delegation)), a lovely visual take on agents handing work to each other.
- **Claw3D** by iamlukethedev ([github.com/iamlukethedev/claw3d](https://github.com/iamlukethedev/claw3d)), which puts a fleet of agents in a 3D space.

Both are great, and the inspiration is theirs. If you want something richer than what I built, start there.

I decided to write my own for a few plain reasons. I didn't want something that needed its own model key, because the whole point was a view that costs nothing and can't run up a bill. I wanted a very small footprint: a single tiny container with no dependencies, instead of a larger stack to maintain. And since my agents already write down everything the page needs, there was nothing to wire in except reading those files.

## How it got built

I vibe coded it with Claude Code, in conversation, over a couple of sittings. I described the feel I wanted ("cartoon characters moving around, like a game, with Tony Stark's workshop"), looked at it, said what was wrong, and kept going.

The part I'm most glad I did properly was the boring part. Before it went anywhere near my real agents I had it write tests that prove the page can't write to anything, can't see message text and can't reach a model. It's the kind of thing that's easy to skip when you're having fun, and it's the reason I'm comfortable leaving it running.

It sits behind the same login as everything else in my lab, so it's not exposed to the internet.

## Build your own

You don't need my version. The recipe is simple and it works for almost any agent setup:

1. **Find the trail your agents already leave.** Most harnesses keep a cost log, a session list or a job history. That's your event feed.
2. **Turn calls into events.** A burst of calls from one agent, then another agent a moment later, is a hand-off. You don't need anything smarter than timestamps and agent names.
3. **Keep it read-only and free.** Read files, never call a model, never show message text. Only poll while someone is watching.
4. **Make it yours.** Mine is a workshop with armor pods and a holo table. Yours could be a train station, a kitchen, a spaceship, a tiny office with a coffee machine. The theme is the fun part, and a mood is far easier to enjoy than a table of numbers.

Tell your coding assistant what the scene should feel like, point it at the files, and iterate until it makes you smile.

## What I'd say after living with it

I expected a gimmick. What I got was a much better sense of how the crew behaves. I can see at a glance when one agent is carrying most of the work, when a fallback model has taken over, and when a request that I thought was simple turned out to need three hand-offs.

And it's just nice to look at. Watching a tiny armored character carry a task across a workshop floor beats reading a log, even if the log would have told me the same thing.

If you've built a view like this for your own agents, I'd love to see it.
