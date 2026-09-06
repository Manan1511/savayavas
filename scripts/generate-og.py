"""
Generates public/og/default.jpg, the fallback link-preview image every page's
<Seo> component references until a real, art-directed OG image exists per
route.

Not run as part of `npm run build` — this is a one-time (or occasional)
generation step, run with `python scripts/generate-og.py` whenever the brand
tokens change enough to warrant regenerating it. Requires Pillow.
"""

from PIL import Image, ImageDraw, ImageFont

W, H = 1200, 630

# Brand tokens (src/styles/tokens.css), duplicated here since this script has
# no access to the CSS build pipeline.
PAPER = "#FCFBF9"
INK = "#141414"
BRASS = "#A8845C"

FONT_DIR = "C:/Windows/Fonts"

img = Image.new("RGB", (W, H), PAPER)
draw = ImageDraw.Draw(img)

eyebrow_font = ImageFont.truetype(f"{FONT_DIR}/segoeui.ttf", 22)
wordmark_font = ImageFont.truetype(f"{FONT_DIR}/georgia.ttf", 76)
tagline_font = ImageFont.truetype(f"{FONT_DIR}/georgiai.ttf", 30)

margin = 100

# Eyebrow
eyebrow = "V A R I O U S   T Y P E S   O F   F A B R I C S"
draw.text((margin, 150), eyebrow, font=eyebrow_font, fill=BRASS)

# Wordmark
draw.text((margin, 210), "SAVAYAVAS & CO", font=wordmark_font, fill=INK)

# Rule
draw.line([(margin, 340), (margin + 90, 340)], fill=BRASS, width=3)

# Tagline
draw.text((margin, 370), "Crafted with purpose. Woven with trust.", font=tagline_font, fill=INK)

img.save("public/og/default.jpg", quality=90)
print("Wrote public/og/default.jpg")
