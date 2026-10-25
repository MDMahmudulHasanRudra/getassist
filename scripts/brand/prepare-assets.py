"""Dev-only brand asset preparation from the owner's logo PNGs.

Run from the repo root:  python scripts/brand/prepare-assets.py ../logo
Uses only panel 1 (icon) and panel 2 (icon + "Get Assist").
Panel 3 ("logo with tag line.png") misspells the name and must never be used.
Outputs are temporary until the owner supplies final vector / 2048 px files.
"""
import sys
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
import numpy as np

src = Path(sys.argv[1] if len(sys.argv) > 1 else "../logo")
assets = Path("src/assets/brand")
public = Path("public")


def content_bbox(im, threshold=240):
    arr = np.asarray(im.convert("RGB")).astype(int)
    ys, xs = np.where(arr.min(axis=2) < threshold)
    return xs.min(), ys.min(), xs.max() + 1, ys.max() + 1


def pad_square(im, pad_ratio=0.08):
    x0, y0, x1, y1 = content_bbox(im)
    crop = im.crop((x0, y0, x1, y1))
    side = int(max(crop.size) * (1 + 2 * pad_ratio))
    canvas = Image.new("RGB", (side, side), "white")
    canvas.paste(crop, ((side - crop.width) // 2, (side - crop.height) // 2))
    return canvas


icon = Image.open(src / "logo icon .png").convert("RGB")
square = pad_square(icon)
square.save(assets / "icon.png")
for size, name in [(180, "apple-touch-icon.png"), (192, "icon-192.png"), (512, "icon-512.png")]:
    square.resize((size, size), Image.LANCZOS).save(public / name)
square.resize((48, 48), Image.LANCZOS).save(public / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])

lockup = Image.open(src / "logo with out tag line .png").convert("RGB")
x0, y0, x1, y1 = content_bbox(lockup)
pad = 12
lockup_crop = lockup.crop((x0 - pad, y0 - pad, x1 + pad, y1 + pad))
lockup_crop.save(assets / "lockup.png")

# Open Graph image: 1200x630 white canvas, lockup + hero line.
og = Image.new("RGB", (1200, 630), "white")
lw = 820
lh = int(lockup_crop.height * lw / lockup_crop.width)
og.paste(lockup_crop.resize((lw, lh), Image.LANCZOS), ((1200 - lw) // 2, 150))
draw = ImageDraw.Draw(og)
font = ImageFont.truetype("C:/Windows/Fonts/segoeuib.ttf", 46) if Path("C:/Windows/Fonts/segoeuib.ttf").exists() else ImageFont.load_default()
text = "Customer support, simplified with AI."
w = draw.textlength(text, font=font)
draw.text(((1200 - w) / 2, 150 + lh + 50), text, fill=(3, 26, 65), font=font)
og.save(public / "og-image.png", optimize=True)
print("square", square.size, "lockup", lockup_crop.size, "og", og.size)
