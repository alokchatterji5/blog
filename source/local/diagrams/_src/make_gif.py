import os
import subprocess
import sys
import tempfile
from concurrent.futures import ThreadPoolExecutor
from PIL import Image

EDGE = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
if not os.path.exists(EDGE):
    EDGE = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
D = r"C:\01workspaces\homelab-reboot\blog-posts\diagrams"
FRAMES, PERIOD = 24, 2.4


def frame(args):
    src, w, h, i, tmp = args
    t = PERIOD * i / FRAMES
    css = (f"<style>*{{animation-play-state:paused!important;animation-delay:-{t:.3f}s!important}}"
           ".flow{animation-duration:1.2s!important}.flow.slow{animation-duration:2.4s!important}"
           ".pulse,.glow,.bob{animation-duration:2.4s!important}</style></svg>")
    svg = open(src, encoding="utf-8").read().replace("</svg>", css)
    f = os.path.join(tmp, f"f{i:02d}.svg")
    open(f, "w", encoding="utf-8").write(svg)
    png = os.path.join(tmp, f"f{i:02d}.png")
    subprocess.run([EDGE, "--headless", "--disable-gpu", "--hide-scrollbars", f"--window-size={w},{h}", f"--screenshot={png}",
                    "file:///" + f.replace("\\", "/")], capture_output=True, timeout=60)
    return png


def build(name, w, h, out_w):
    src = os.path.join(D, name + ".svg")
    with tempfile.TemporaryDirectory() as tmp:
        with ThreadPoolExecutor(6) as ex:
            pngs = list(ex.map(frame, [(src, w, h, i, tmp) for i in range(FRAMES)]))
        rgb = []
        for p in pngs:
            im = Image.open(p).convert("RGB")
            rgb.append(im.resize((out_w, round(h * out_w / w)), Image.LANCZOS))
        mosaic = Image.new("RGB", (rgb[0].width, rgb[0].height * 4))
        for k, j in enumerate((0, 6, 12, 18)):
            mosaic.paste(rgb[j], (0, k * rgb[0].height))
        pal = mosaic.quantize(colors=256, method=Image.Quantize.MEDIANCUT, dither=Image.Dither.NONE)
        imgs = [im.quantize(palette=pal, dither=Image.Dither.NONE) for im in rgb]
        out = os.path.join(D, name.replace("-animated", "") + ".gif")
        imgs[0].save(out, save_all=True, append_images=imgs[1:], duration=int(PERIOD * 1000 / FRAMES), loop=0, optimize=True, disposal=1)
        print(out, round(os.path.getsize(out) / 1e6, 2), "MB", len(imgs), "frames")


build("00-how-it-fits-together", 1300, 830, 1200)
build("01-meet-the-crew-animated", 1000, 620, 1000)
