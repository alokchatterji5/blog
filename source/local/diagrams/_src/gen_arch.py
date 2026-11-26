import html
import math

OUT = r"C:\01workspaces\homelab-reboot\blog-posts\diagrams"
W, H = 1300, 830
DARK = {"#3FB950": "#10261A", "#BC8CFF": "#251838", "#F0883E": "#2B1C0F", "#FF7B72": "#2E1616",
        "#F2CC60": "#2A2410", "#58A6FF": "#0D2238", "#8B949E": "#161B22", "#39C5CF": "#0E2A2D"}
BLUE, GREEN, PURPLE, ORANGE, RED, YELLOW, GREY, TEAL = "#58A6FF", "#3FB950", "#BC8CFF", "#F0883E", "#FF7B72", "#F2CC60", "#8B949E", "#39C5CF"


def esc(s):
    return html.escape(s, quote=True)


shapes = []   # cards, circles, containers, texts
edges = []


def container(id, x, y, w, h, col, legend, lx, ly, anchor="middle"):
    shapes.append(dict(k="container", id=id, x=x, y=y, w=w, h=h, col=col, legend=legend, lx=lx, ly=ly, anchor=anchor))


def card(id, x, y, w, h, col, emoji, title, subs, tcol=None, dashed=False):
    shapes.append(dict(k="card", id=id, x=x, y=y, w=w, h=h, col=col, emoji=emoji, title=title, subs=subs, tcol=tcol or "#E6EDF3", dashed=dashed))


def circle(id, x, y, r, col, emoji, name, subs):
    shapes.append(dict(k="circle", id=id, x=x, y=y, r=r, col=col, emoji=emoji, name=name, subs=subs))


def text(x, y, t, size=13, fill="#8B949E", anchor="middle", italic=False, bold=False):
    shapes.append(dict(k="text", x=x, y=y, t=t, size=size, fill=fill, anchor=anchor, italic=italic, bold=bold))


def edge(pts, col, label="", lpos=None, flow=True, width=3, slow=False, back=False):
    edges.append(dict(pts=pts, col=col, label=label, lpos=lpos, flow=flow, width=width, slow=slow, back=back))


# ---------------------------------------------------------------- layout
text(650, 34, "How the crew fits together", 26, "#E6EDF3", bold=True)
text(650, 58, "components, models and the paths between them. Follow the moving dashes.", 13)

# model providers (top)
text(520, 82, "MODEL PROVIDERS  ·  if one is down, the next one takes over", 12, "#8B949E", bold=True)
prov = [("claude", "Claude", "Anthropic · Sonnet 5.5", YELLOW, 235), ("gemini", "Gemini", "Google · 3.7 Flash", BLUE, 393),
        ("orouter", "OpenRouter", "model marketplace", GREY, 551), ("litellm", "LiteLLM", "self-hosted gateway", GREY, 709)]
for id, t, s, c, x in prov:
    card(id, x, 92, 130, 58, c, "", t, [s], tcol=c)
for x in (365, 523, 681):
    edge([(x + 2, 121), (x + 26, 121)], "#8B949E", flow=True, width=2)

# gateway
container("gw", 230, 190, 500, 580, YELLOW, "ZeroClaw gateway · self-hosted, runs in Docker", 480, 760)
circle("edith", 318, 385, 48, YELLOW, "🕶️", "EDITH", ["orchestrator", "Claude Sonnet 5.5"])
ag = [("friday", "📊", "FRIDAY", ["Gemini 3.7 Flash", "health, stats, logs · read-only"], GREEN, 240),
      ("veronica", "🎬", "VERONICA", ["Gemini 3.7 Flash", "media library and requests"], PURPLE, 330),
      ("jarvis", "🛡️", "JARVIS", ["Gemini 3.7 Flash", "users, groups, access"], ORANGE, 420),
      ("dume", "🦾", "DUM-E", ["Gemini 3.7 Flash", "builds and deploys · enabled"], RED, 510)]
for id, e, n, s, c, y in ag:
    card(id, 470, y, 245, 72, c, e, n, s, tcol=c)
card("triage", 250, 605, 465, 52, TEAL, "🧹", "Alert triage", ["Gemini 3.1 Flash-Lite sorts alerts so only real ones reach you"], tcol=TEAL)
card("skills", 250, 672, 225, 70, GREY, "📖", "Playbooks", ["skills, runbooks, memory,", "weekly lessons"])
card("guard", 490, 672, 225, 70, RED, "🚦", "Guardrails", ["risk profiles, command allowlist,", "hourly action cap"], tcol=RED)

# left column
card("sched", 20, 205, 170, 70, GREY, "⏰", "Schedules", ["morning briefing,", "weekly review"])
card("you", 20, 340, 170, 90, BLUE, "📱", "You", ["Telegram chat:", "ask, answer,", "tap Approve or Deny"], tcol=BLUE)
card("ntfy", 20, 520, 170, 90, RED, "🔔", "Code by ntfy", ["extra check for the", "riskiest changes"], tcol=RED)

# toolbox
container("tb", 760, 215, 170, 385, GREEN, "", 0, 0)
text(845, 245, "🧰 Toolbox", 16, "#E6EDF3", bold=True)
text(845, 265, "purpose-built commands", 12, "#C9D1D9")
text(845, 285, "no free-form shell", 12, "#C9D1D9")
for i, line in enumerate(["stats and capacity", "backup status", "container logs", "media library", "media requests", "users and groups", "restart and verify", "docs search"]):
    text(780, 322 + i * 24, "▸ " + line, 13, "#E6EDF3", anchor="start")
text(845, 540, "T0 look · T1 bounded fix", 11.5, "#F2CC60")
text(845, 558, "T2 needs your code", 11.5, "#FF7B72")
text(845, 580, "audited, secrets hidden", 11.5, "#8B949E", italic=True)

# access paths
text(1045, 205, "ACCESS PATHS", 12, "#8B949E", bold=True)
card("pve", 980, 235, 150, 100, BLUE, "🖥️", "Proxmox API", ["read-only token:", "stats, backup jobs"], tcol=BLUE)
card("ssh", 980, 365, 150, 110, ORANGE, "🔐", "SSH gate", ["forced command,", "4 roles, runs only", "approved actions"], tcol=ORANGE)
card("apis", 980, 505, 150, 95, PURPLE, "🔌", "App APIs", ["Jellyfin, Jellyseerr,", "Authentik, Netdata"], tcol=PURPLE)

# homelab
container("lab", 1160, 215, 130, 385, GREY, "", 0, 0)
text(1225, 245, "🏠 Homelab", 16, "#E6EDF3", bold=True)
for i, line in enumerate(["Proxmox host", "app containers", "media stack", "identity (SSO)", "monitoring", "backup storage"]):
    text(1225, 285 + i * 38, line, 13, "#C9D1D9")

# ---------------------------------------------------------------- edges
edge([(190, 372), (270, 372)], BLUE, "ask", (230, 372))
edge([(270, 398), (190, 398)], YELLOW, "", None)
edge([(190, 240), (318, 240), (318, 335)], GREY, "", None, width=2)
# provider links
edge([(300, 150), (300, 190), (300, 340)], YELLOW, "plans", (300, 172))
edge([(500, 150), (500, 240)], BLUE, "specialist work", (500, 195))
# orchestrator -> specialists
for (id, e, n, s, c, y), dx in zip(ag, (404, 414, 424, 434)):
    edge([(366, 385), (dx, 385), (dx, y + 36), (470, y + 36)], c, width=3)
# specialists -> toolbox
for (id, e, n, s, c, y) in ag:
    edge([(715, y + 36), (760, y + 36)], c, width=3)
# toolbox -> access
edge([(930, 285), (980, 285)], BLUE, width=3)
edge([(930, 420), (980, 420)], ORANGE, width=3)
edge([(930, 552), (980, 552)], PURPLE, width=3)
# access -> lab
edge([(1130, 285), (1160, 285)], BLUE, width=3)
edge([(1130, 420), (1160, 420)], ORANGE, width=3)
edge([(1130, 552), (1160, 552)], PURPLE, width=3)
# approvals loop
edge([(845, 600), (845, 800), (105, 800), (105, 610)], RED, "riskiest restarts: one-time code to your phone", (475, 800), slow=True)
edge([(105, 520), (105, 430)], RED, "", None)
# triage -> you
edge([(250, 631), (212, 631), (212, 418), (190, 418)], TEAL, "", None, slow=True)
text(650, 818, "", 1)


# ---------------------------------------------------------------- SVG
def arrow(pts, col):
    (x1, y1), (x2, y2) = pts[-2], pts[-1]
    a = math.degrees(math.atan2(y2 - y1, x2 - x1))
    return f'<polygon points="-12,-6 0,0 -12,6" fill="{col}" transform="translate({x2} {y2}) rotate({a:.0f})"/>'


def svg():
    s = [f'<svg viewBox="0 0 {W} {H}" xmlns="http://www.w3.org/2000/svg" font-family="Segoe UI, Arial, sans-serif">',
         """<style>
.flow{stroke-dasharray:8 10;animation:dash 1.2s linear infinite}
.flow.slow{animation-duration:2.6s}
@keyframes dash{to{stroke-dashoffset:-36}}
.pulse{transform-box:fill-box;transform-origin:center;animation:pulse 2.4s ease-in-out infinite}
@keyframes pulse{0%,100%{transform:scale(1);opacity:.55}50%{transform:scale(1.16);opacity:0}}
.glow{animation:glow 3s ease-in-out infinite}
@keyframes glow{0%,100%{stroke-opacity:.35}50%{stroke-opacity:.9}}
</style>""", f'<rect width="{W}" height="{H}" fill="#0D1117"/>']
    for sh in shapes:
        if sh["k"] == "container":
            s.append(f'<rect x="{sh["x"]}" y="{sh["y"]}" width="{sh["w"]}" height="{sh["h"]}" rx="20" fill="{sh["col"]}" fill-opacity="0.05" stroke="{sh["col"]}" stroke-width="2.5" stroke-dasharray="3 0" class="glow"/>')
            if sh["legend"]:
                s.append(f'<text x="{sh["lx"]}" y="{sh["ly"]}" text-anchor="{sh["anchor"]}" font-size="14" font-weight="700" fill="{sh["col"]}">{esc(sh["legend"])}</text>')
    for e in edges:
        pts = e["pts"]
        d = "M" + " L".join(f"{x} {y}" for x, y in pts)
        cls = ' class="flow slow"' if e["slow"] else ' class="flow"'
        s.append(f'<path d="{d}" fill="none" stroke="{e["col"]}" stroke-width="{e["width"]}" stroke-linejoin="round"{cls}/>')
        s.append(arrow(pts, e["col"]))
    for sh in shapes:
        k = sh["k"]
        if k == "card":
            x, y, w, h, c = sh["x"], sh["y"], sh["w"], sh["h"], sh["col"]
            s.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="14" fill="{DARK[c]}" stroke="{c}" stroke-width="2.5"/>')
            tx = x + 14
            if sh["emoji"]:
                s.append(f'<text x="{x + 14}" y="{y + h / 2 + 10}" font-size="28">{sh["emoji"]}</text>')
                tx = x + 56
            ty = y + 24 if len(sh["subs"]) >= 2 or h > 60 else y + 22
            if h <= 60 and not sh["emoji"]:
                ty = y + 24
            s.append(f'<text x="{tx}" y="{ty}" font-size="16" font-weight="800" fill="{sh["tcol"]}">{esc(sh["title"])}</text>')
            for i, line in enumerate(sh["subs"]):
                s.append(f'<text x="{tx}" y="{ty + 18 + i * 15}" font-size="12" fill="#C9D1D9">{esc(line)}</text>')
        elif k == "circle":
            x, y, r, c = sh["x"], sh["y"], sh["r"], sh["col"]
            s.append(f'<circle cx="{x}" cy="{y}" r="{r + 4}" fill="none" stroke="{c}" stroke-width="3" class="pulse"/>')
            s.append(f'<circle cx="{x}" cy="{y}" r="{r}" fill="{DARK[c]}" stroke="{c}" stroke-width="6"/>')
            s.append(f'<text x="{x}" y="{y + 18}" text-anchor="middle" font-size="46">{sh["emoji"]}</text>')
            s.append(f'<rect x="{x - 42}" y="{y + r + 10}" width="84" height="26" rx="13" fill="{c}"/>')
            s.append(f'<text x="{x}" y="{y + r + 28}" text-anchor="middle" font-size="14" font-weight="800" fill="#1A1400">{sh["name"]}</text>')
            for i, line in enumerate(sh["subs"]):
                s.append(f'<text x="{x}" y="{y + r + 54 + i * 15}" text-anchor="middle" font-size="12" fill="#C9D1D9">{esc(line)}</text>')
        elif k == "text":
            st = ' font-style="italic"' if sh["italic"] else ""
            wt = ' font-weight="700"' if sh["bold"] else ""
            s.append(f'<text x="{sh["x"]}" y="{sh["y"]}" text-anchor="{sh["anchor"]}" font-size="{sh["size"]}" fill="{sh["fill"]}"{st}{wt}>{esc(sh["t"])}</text>')
    for e in edges:
        if e["label"] and e["lpos"]:
            lx, ly = e["lpos"]
            w = 16 + len(e["label"]) * 6.4
            s.append(f'<rect x="{lx - w / 2:.0f}" y="{ly - 11}" width="{w:.0f}" height="22" rx="11" fill="#0D1117" stroke="{e["col"]}" stroke-width="1.5"/>')
            s.append(f'<text x="{lx}" y="{ly + 4}" text-anchor="middle" font-size="12" font-weight="600" fill="{e["col"]}">{esc(e["label"])}</text>')
    s.append("</svg>")
    open(OUT + r"\00-how-it-fits-together.svg", "w", encoding="utf-8", newline="\n").write("\n".join(s))


# ---------------------------------------------------------------- drawio
def drawio():
    c = []
    n = 0

    def add(x):
        nonlocal n
        n += 1
        c.append(x)
        return n

    q = chr(39)
    for sh in shapes:
        k = sh["k"]
        if k == "container":
            add(f'<mxCell id="c{n}" value="" style="rounded=1;arcSize=4;html=1;fillColor={DARK[sh["col"]]};strokeColor={sh["col"]};strokeWidth=2.5;opacity=60;" vertex="1" parent="1"><mxGeometry x="{sh["x"]}" y="{sh["y"]}" width="{sh["w"]}" height="{sh["h"]}" as="geometry"/></mxCell>')
            if sh["legend"]:
                add(f'<mxCell id="c{n}" value="{esc("<b>" + sh["legend"] + "</b>")}" style="text;html=1;align=center;fontColor={sh["col"]};fontSize=14;" vertex="1" parent="1"><mxGeometry x="{sh["lx"] - 250}" y="{sh["ly"] - 12}" width="500" height="24" as="geometry"/></mxCell>')
        elif k == "card":
            val = (f"<font style={q}font-size:26px{q}>{sh['emoji']}</font>&nbsp;&nbsp;" if sh["emoji"] else "") + f"<b><font style={q}font-size:15px{q} color={q}{sh['tcol']}{q}>{sh['title']}</font></b><br><font style={q}font-size:11px{q} color={q}#C9D1D9{q}>" + "<br>".join(sh["subs"]) + "</font>"
            add(f'<mxCell id="c{n}" value="{esc(val)}" style="rounded=1;arcSize=12;html=1;whiteSpace=wrap;align=left;spacingLeft=12;fillColor={DARK[sh["col"]]};strokeColor={sh["col"]};strokeWidth=2.5;fontColor=#E6EDF3;" vertex="1" parent="1"><mxGeometry x="{sh["x"]}" y="{sh["y"]}" width="{sh["w"]}" height="{sh["h"]}" as="geometry"/></mxCell>')
        elif k == "circle":
            x, y, r, col = sh["x"], sh["y"], sh["r"], sh["col"]
            add(f'<mxCell id="c{n}" value="{esc("<font style=" + q + "font-size:46px" + q + ">" + sh["emoji"] + "</font>")}" style="ellipse;html=1;fillColor={DARK[col]};strokeColor={col};strokeWidth=6;shadow=1;" vertex="1" parent="1"><mxGeometry x="{x - r}" y="{y - r}" width="{2 * r}" height="{2 * r}" as="geometry"/></mxCell>')
            add(f'<mxCell id="c{n}" value="{esc("<b>" + sh["name"] + "</b>")}" style="rounded=1;arcSize=50;html=1;fillColor={col};strokeColor=none;fontColor=#1A1400;fontSize=14;" vertex="1" parent="1"><mxGeometry x="{x - 42}" y="{y + r + 10}" width="84" height="26" as="geometry"/></mxCell>')
            add(f'<mxCell id="c{n}" value="{esc("<font style=" + q + "font-size:11px" + q + " color=" + q + "#C9D1D9" + q + ">" + "<br>".join(sh["subs"]) + "</font>")}" style="text;html=1;align=center;verticalAlign=top;" vertex="1" parent="1"><mxGeometry x="{x - 90}" y="{y + r + 40}" width="180" height="40" as="geometry"/></mxCell>')
        elif k == "text":
            val = sh["t"]
            if sh["bold"]:
                val = "<b>" + val + "</b>"
            if sh["italic"]:
                val = "<i>" + val + "</i>"
            al = "left" if sh["anchor"] == "start" else "center"
            gx = sh["x"] if sh["anchor"] == "start" else sh["x"] - 150
            add(f'<mxCell id="c{n}" value="{esc(val)}" style="text;html=1;align={al};fontColor={sh["fill"]};fontSize={int(sh["size"])};" vertex="1" parent="1"><mxGeometry x="{gx}" y="{sh["y"] - 14}" width="300" height="20" as="geometry"/></mxCell>')
    for e in edges:
        pts = e["pts"]
        mid = "".join(f'<mxPoint x="{x}" y="{y}"/>' for x, y in pts[1:-1])
        arr = f'<Array as="points">{mid}</Array>' if mid else ""
        fl = "flowAnimation=1;" if e["flow"] else "dashed=1;"
        add(f'<mxCell id="c{n}" value="{esc(e["label"])}" style="edgeStyle=none;rounded=1;html=1;strokeColor={e["col"]};strokeWidth={e["width"]};{fl}fontColor={e["col"]};fontSize=11;fontStyle=1;labelBackgroundColor=#0D1117;" edge="1" parent="1">'
            f'<mxGeometry relative="1" as="geometry"><mxPoint x="{pts[0][0]}" y="{pts[0][1]}" as="sourcePoint"/><mxPoint x="{pts[-1][0]}" y="{pts[-1][1]}" as="targetPoint"/>{arr}</mxGeometry></mxCell>')
    xml = ('<mxfile host="app.diagrams.net" version="24.0.0"><diagram id="arch" name="How it fits together">'
           f'<mxGraphModel dx="1300" dy="830" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="{W}" pageHeight="{H}" background="#0D1117" math="0" shadow="0">'
           '<root><mxCell id="0"/><mxCell id="1" parent="0"/>' + "".join(c) + "</root></mxGraphModel></diagram></mxfile>")
    open(OUT + r"\00-how-it-fits-together.drawio", "w", encoding="utf-8", newline="\n").write(xml)


svg()
drawio()
print("ok")
