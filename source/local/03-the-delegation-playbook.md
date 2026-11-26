# The Delegation Playbook

*Part 3 of the AI-Led Homelab series*

The question I get asked most about this project isn't "what did you build." It's "wait, you let AI do *what*?" Fair question. The honest answer is: a lot more than people expect, and a lot less than people fear, and the line between those two isn't drawn by task type. It's drawn by one question.

## The only rule that matters

Can this be undone?

If yes — provisioning something new, drafting a doc, proposing a design, running a check, spinning up a container that doesn't touch anything live — AI gets a long leash. It can just go.

If no — anything that touches the existing, working homelab, anything that deletes or overwrites, anything involving credentials, any call on architecture that's already been settled — that's mine. Not "AI drafts it and I rubber-stamp it." Mine, deliberately, every time.

That single distinction does more work than any list of allowed and disallowed tasks ever could, because it scales. New situations come up constantly in a project like this, and instead of needing a new rule for each one, I just ask the same question.

## What "long leash" looks like in practice

New infrastructure gets built without me hovering. A new container gets provisioned, configured, and brought up to the project's standards without me typing a single command. A first draft of how a new service should sit behind the reverse proxy and identity layer gets written before I've even thought about it. Docs and trackers get kept current as a side effect of doing the work, not a separate chore.

None of that touches anything that currently works. That's what makes the leash safe to extend.

## What "short leash" looks like in practice

Nothing gets deleted, disabled, or overwritten on the running homelab without me explicitly saying go. Credentials and tokens are never something AI holds between sessions — they're provided fresh, used, and gone. And when a proposal touches something we already settled — an architecture decision, an access policy — that's a conversation, not an execution.

## Access is a design decision, not an afterthought

This only works because access itself was scoped on purpose. AI in this project can reach the actual hypervisor — SSH in, provision containers, work inside them. That's real infrastructure access, not "helped me write a script I then ran myself." But real access made the reversible/irreversible rule non-negotiable. The more capable the access, the more that one rule has to actually hold.

## Why this beats either extreme

The two failure modes are obvious in hindsight. Give AI no real access and you've just built a slower version of copy-pasting from a chat window — all the thinking, none of the leverage. Give it unscoped access and you're one confidently-wrong suggestion away from a bad night.

The playbook is neither. It's wide open on anything that can be undone, and tight on anything that can't — which turns out to cover almost everything a homelab actually needs, most of the time, without me having to be in the loop for all of it.

---

*Next: what happens when more than one AI is working on the project at once, and how to keep that from turning into chaos — or into a token bill you regret.*
