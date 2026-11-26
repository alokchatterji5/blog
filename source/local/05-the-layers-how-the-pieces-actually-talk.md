# The Layers: How the Pieces Actually Talk to Each Other

*Part 5 of the AI-Led Homelab series*

No configs in this one — just the shape of the thing. If you're building your own version, the shape is what transfers. The specific tools you pick won't be mine, and they shouldn't be.

## One front door

Every request into the homelab goes through a single point first. Not because it's the only technically valid way to do it, but because a single front door means there's exactly one place that governs how traffic reaches anything — one place to reason about, one place to secure, one place to change when something needs to change. Services don't get their own separate way in. If it's not through the front door, it doesn't happen.

This came directly out of the architecture conversation from post one: "no service should be its own special case" was a principle we agreed on early, and the network layer is where that principle actually gets enforced.

## One decision about who gets in

Sitting just behind that front door is identity. Who you are and what you're allowed to touch is decided once, in one place, and every service downstream inherits that decision instead of implementing its own login and its own rules. This is the layer that turns "forty services with forty different logins" into "one identity, consistently enforced."

It's also the layer where I was most deliberate about *not* automating my own judgment away. AI can draft how a new service should plug into this layer. It doesn't get to decide the policy itself.

## The actual homelab

Everything above this is scaffolding. The service layer is the actual point of the project — media, tools, personal apps, whatever the lab exists to do. The reason it gets to stay simple is that it doesn't have to solve networking or identity itself. It just shows up, plugs into the front door and the identity layer that already exist, and inherits both.

This is also the layer that grows the fastest and where AI does the most hands-on work — provisioning, standing things up, getting them wired in — because almost everything at this layer is additive and reversible. New service, new container. Nothing here threatens what's already running.

## A layer that watches without touching

Wrapping around all of it is observability — the layer that sees what's happening everywhere without being able to change anything anywhere. That asymmetry is deliberate. It should know everything and be able to break nothing. When something's off, this is how I find out before a person does, not after.

## Why this shape, and not a shopping list

None of this post named a tool, and that's on purpose. The point isn't "use these four categories of software." It's that a homelab built without this separation tends to grow sideways — every new service solving its own auth, its own routing, its own visibility, until nothing is consistent and everything is fragile. A homelab built with it stays legible even as it grows, because new things slot into an existing shape instead of inventing their own.

That shape is also what makes AI-assisted building actually work well. A clear separation of concerns is exactly the kind of structure that keeps AI from making a wrong call in one place ripple into everywhere else.

---

*Next: the honest version — what AI actually got wrong along the way, and why I stopped treating those moments as failures to hide.*
