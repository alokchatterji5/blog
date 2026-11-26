import html

OUT = r"C:\01workspaces\homelab-reboot\blog-posts\diagrams"

AGENTS = [
    # key, emoji, name, role, quote, colour, dark fill
    ("friday", "📊", "FRIDAY", "Health sentinel · read-only", "“All systems green. Disk is at 61%.”", "#3FB950", "#10261A"),
    ("veronica", "🎬", "VERONICA", "Media pipeline operator", "“Library is quiet. Nothing stuck.”", "#BC8CFF", "#251838"),
    ("jarvis", "🛡️", "JARVIS", "Identity & access", "“Shall I create the account, sir?”", "#F0883E", "#2B1C0F"),
    ("dume", "🦾", "DUM-E", "The builder · enabled & working", "“Build done. *happy beep*”", "#FF7B72", "#2E1616"),
]


def esc(s):
    return html.escape(s, quote=True)


# ------------------------------------------------------------------ draw.io
cells = []


def cell(i, value, style, x, y, w, h, vertex=True):
    cells.append(
        f'<mxCell id="{i}" value="{esc(value)}" style="{style}" vertex="1" parent="1">'
        f'<mxGeometry x="{x}" y="{y}" width="{w}" height="{h}" as="geometry"/></mxCell>'
    )


def edge(i, src, dst, colour, width=3, label="", extra=""):
    cells.append(
        f'<mxCell id="{i}" value="{esc(label)}" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor={colour};'
        f'strokeWidth={width};flowAnimation=1;fontColor=#8B949E;fontSize=11;labelBackgroundColor=#0D1117;{extra}" edge="1" parent="1" '
        f'source="{src}" target="{dst}"><mxGeometry relative="1" as="geometry"/></mxCell>'
    )


cell("title", "<b><font style='font-size:24px' color='#E6EDF3'>Meet the crew</font></b><br><font style='font-size:13px' color='#8B949E'>one front door, four specialists, zero free-form shells</font>",
     "text;html=1;align=center;verticalAlign=middle;", 330, 10, 560, 60)

# me
cell("me", "<font style='font-size:40px'>📱</font>", "ellipse;whiteSpace=wrap;html=1;fillColor=#0D2238;strokeColor=#58A6FF;strokeWidth=4;shadow=1;", 40, 275, 100, 100)
cell("me_l", "<b>Me</b><br><font style='font-size:11px' color='#8B949E'>one chat, anywhere</font>", "text;html=1;align=center;verticalAlign=top;fontColor=#E6EDF3;", 20, 380, 140, 40)

# edith
cell("edith", "<font style='font-size:56px'>🕶️</font>", "ellipse;whiteSpace=wrap;html=1;fillColor=#2A2410;strokeColor=#F2CC60;strokeWidth=6;shadow=1;", 270, 250, 150, 150)
cell("edith_n", "<b>EDITH</b>", "rounded=1;arcSize=50;html=1;fillColor=#F2CC60;strokeColor=none;fontColor=#1A1400;fontSize=15;", 295, 408, 100, 30)
cell("edith_r", "<font style='font-size:11px' color='#8B949E'>The orchestrator · Claude<br>plans, delegates, decides</font>", "text;html=1;align=center;verticalAlign=top;", 245, 440, 200, 40)
cell("edith_q", "“On it. Asking FRIDAY.”", "shape=callout;whiteSpace=wrap;html=1;perimeter=calloutPerimeter;size=14;position=0.3;base=16;fillColor=#2A2410;strokeColor=#F2CC60;fontColor=#F2CC60;fontStyle=2;fontSize=11;", 235, 175, 150, 45)

ys = [70, 205, 340, 475]
for (k, emo, name, role, quote, col, dark), y in zip(AGENTS, ys):
    cell(k, f"<font style='font-size:40px'>{emo}</font>", f"ellipse;whiteSpace=wrap;html=1;fillColor={dark};strokeColor={col};strokeWidth=5;shadow=1;", 600, y, 100, 100)
    cell(k + "_n", f"<b>{name}</b>", f"rounded=1;arcSize=50;html=1;fillColor={col};strokeColor=none;fontColor=#0D1117;fontSize=14;", 720, y + 5, 130, 28)
    cell(k + "_r", f"<font style='font-size:11px' color='#C9D1D9'>{role}</font>", "text;html=1;align=left;verticalAlign=middle;", 720, y + 36, 200, 20)
    cell(k + "_q", f"<i><font style='font-size:11px' color='{col}'>{quote}</font></i>", "text;html=1;align=left;verticalAlign=middle;", 720, y + 58, 220, 30)

cell("tools", "<font style='font-size:26px'>🔒</font><br><b>Safe toolbox</b><br><font style='font-size:11px' color='#8B949E'>approved commands only<br>no free-form shell<br>secrets never shown</font>",
     "rounded=1;whiteSpace=wrap;html=1;fillColor=#0D1117;strokeColor=#30363D;strokeWidth=2;dashed=1;fontColor=#E6EDF3;arcSize=8;", 960, 215, 150, 190)
cell("lab", "<font style='font-size:40px'>🏠</font>", "ellipse;whiteSpace=wrap;html=1;fillColor=#161B22;strokeColor=#8B949E;strokeWidth=4;shadow=1;", 1150, 260, 100, 100)
cell("lab_l", "<b>The homelab</b><br><font style='font-size:11px' color='#8B949E'>containers · media<br>storage · backups</font>", "text;html=1;align=center;verticalAlign=top;fontColor=#E6EDF3;", 1130, 365, 140, 50)

edge("e_me", "me", "edith", "#58A6FF", 4)
for (k, *_rest), n in zip(AGENTS, range(4)):
    col = AGENTS[n][5]
    edge(f"e_{k}", "edith", k, col, 3)
    edge(f"t_{k}", k + "_r", "tools", col, 2, extra="exitX=1;exitY=0.5;entryX=0;entryY=0.5;")
edge("e_lab", "tools", "lab", "#8B949E", 3)

xml = (
    '<mxfile host="app.diagrams.net" version="24.0.0"><diagram id="crew" name="Meet the crew">'
    '<mxGraphModel dx="1300" dy="700" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" '
    'pageWidth="1300" pageHeight="640" background="#0D1117" math="0" shadow="0"><root><mxCell id="0"/><mxCell id="1" parent="0"/>'
    + "".join(cells)
    + "</root></mxGraphModel></diagram></mxfile>"
)
open(OUT + r"\01-meet-the-crew.drawio", "w", encoding="utf-8", newline="\n").write(xml)

# ------------------------------------------------------------------ animated SVG hero
W, H = 1000, 620
ex, ey = 330, 310
ax = 700
ays = [90, 230, 370, 510]
s = [f'<svg viewBox="0 0 {W} {H}" xmlns="http://www.w3.org/2000/svg" font-family="Segoe UI, Arial, sans-serif">']
s.append("""<style>
.flow{stroke-dasharray:8 10;animation:dash 1.2s linear infinite}
.flow.slow{animation-duration:2.4s}
@keyframes dash{to{stroke-dashoffset:-36}}
.pulse{transform-box:fill-box;transform-origin:center;animation:pulse 2.4s ease-in-out infinite}
@keyframes pulse{0%,100%{transform:scale(1);opacity:.55}50%{transform:scale(1.18);opacity:0}}
.bob{animation:bob 3s ease-in-out infinite}
.bob.b2{animation-delay:.5s}.bob.b3{animation-delay:1s}.bob.b4{animation-delay:1.5s}
@keyframes bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
.t{fill:#E6EDF3}.d{fill:#8B949E}
</style>""")
s.append(f'<rect width="{W}" height="{H}" fill="#0D1117"/>')
s.append('<text x="500" y="44" text-anchor="middle" font-size="26" font-weight="700" class="t">Meet the crew</text>')
s.append('<text x="500" y="68" text-anchor="middle" font-size="13" class="d">one front door, four specialists, zero free-form shells</text>')
# me
s.append(f'<line x1="130" y1="{ey}" x2="{ex-80}" y2="{ey}" stroke="#58A6FF" stroke-width="4" class="flow"/>')
s.append(f'<circle cx="80" cy="{ey}" r="50" fill="#0D2238" stroke="#58A6FF" stroke-width="4"/><text x="80" y="{ey+14}" text-anchor="middle" font-size="40">📱</text>')
s.append(f'<text x="80" y="{ey+78}" text-anchor="middle" font-size="14" font-weight="700" class="t">Me</text>')
# lines to agents
for (k, emo, name, role, quote, col, dark), y in zip(AGENTS, ays):
    s.append(f'<path d="M{ex+78} {ey} C{ex+200} {ey} {ax-200} {y} {ax-52} {y}" fill="none" stroke="{col}" stroke-width="3" class="flow"/>')
# edith
s.append(f'<circle cx="{ex}" cy="{ey}" r="78" fill="none" stroke="#F2CC60" stroke-width="3" class="pulse"/>')
s.append(f'<circle cx="{ex}" cy="{ey}" r="74" fill="#2A2410" stroke="#F2CC60" stroke-width="6"/><text x="{ex}" y="{ey+20}" text-anchor="middle" font-size="58">🕶️</text>')
s.append(f'<rect x="{ex-52}" y="{ey+92}" width="104" height="30" rx="15" fill="#F2CC60"/><text x="{ex}" y="{ey+112}" text-anchor="middle" font-size="15" font-weight="800" fill="#1A1400">EDITH</text>')
s.append(f'<text x="{ex}" y="{ey+142}" text-anchor="middle" font-size="12" class="d">orchestrator · plans &amp; delegates</text>')
# agents
for n, ((k, emo, name, role, quote, col, dark), y) in enumerate(zip(AGENTS, ays), 1):
    s.append(f'<g class="bob b{n}">')
    s.append(f'<circle cx="{ax}" cy="{y}" r="52" fill="none" stroke="{col}" stroke-width="3" class="pulse"/>')
    s.append(f'<circle cx="{ax}" cy="{y}" r="48" fill="{dark}" stroke="{col}" stroke-width="5"/><text x="{ax}" y="{y+14}" text-anchor="middle" font-size="40">{emo}</text>')
    s.append("</g>")
    s.append(f'<rect x="{ax+66}" y="{y-34}" width="{18+len(name)*11}" height="26" rx="13" fill="{col}"/><text x="{ax+75}" y="{y-16}" font-size="14" font-weight="800" fill="#0D1117">{name}</text>')
    s.append(f'<text x="{ax+66}" y="{y+8}" font-size="12" fill="#C9D1D9">{esc(role)}</text>')
    s.append(f'<text x="{ax+66}" y="{y+28}" font-size="12" font-style="italic" fill="{col}">{esc(quote)}</text>')
s.append("</svg>")
open(OUT + r"\01-meet-the-crew-animated.svg", "w", encoding="utf-8", newline="\n").write("\n".join(s))
print("ok")
