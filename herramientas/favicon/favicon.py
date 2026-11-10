#!/usr/bin/env python3
"""Genera el set de favicons con el logo del navbar (barra inclinada + iniciales + guion bajo).

Uso:
  python3 favicon.py EP --font BebasNeue.woff --out ./public \
      --bar "#EF2D38" --text "#F3EEE3" --bg "#151212"

Salida en --out: favicon.svg, favicon.ico (16/32/48), apple-touch-icon.png (180),
icon-192.png, icon-512.png e icon-maskable-512.png.

Requisitos: fontTools (pip install fonttools brotli), rsvg-convert y ImageMagick (convert).
La fuente es Bebas Neue (la del heading): sirve el .woff de @fontsource/bebas-neue.
"""
import argparse, subprocess, tempfile, os
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.boundsPen import BoundsPen


def glyph_paths(font, text):
    gs = font.getGlyphSet()
    cmap = font.getBestCmap()
    out, x, minx, maxx = [], 0, None, None
    for ch in text:
        name = cmap[ord(ch)]
        pen = SVGPathPen(gs)
        gs[name].draw(pen)
        bp = BoundsPen(gs)
        gs[name].draw(bp)
        if bp.bounds:
            minx = x + bp.bounds[0] if minx is None else minx
            maxx = x + bp.bounds[2]
        out.append((x, pen.getCommands()))
        x += gs[name].width
    return out, x


def build_svg(initials, font_path, bar, text, bg, pad, rx=12):
    font = TTFont(font_path)
    upm = font['head'].unitsPerEm
    cap = font['OS/2'].sCapHeight or int(upm * 0.7)
    paths, adv = glyph_paths(font, initials)
    # Barra inclinada antes de las letras y guion bajo después (como BrandLogo.jsx)
    bar_w, gap = 0.3 * cap, 0.45 * cap
    skew = 0.3 * cap
    x0 = bar_w + gap + skew
    parts = [f'<path fill="{bar}" d="M{skew:.1f} {cap*1.15:.1f}L{skew+bar_w:.1f} {cap*1.15:.1f}L{bar_w:.1f} {-cap*0.15:.1f}L0 {-cap*0.15:.1f}Z"/>']
    for x, d in paths:
        parts.append(f'<path fill="{text}" transform="translate({x0 + x:.1f} 0)" d="{d}"/>')
    ux = x0 + adv + 0.05 * cap
    parts.append(f'<path fill="{bar}" transform="translate({ux:.1f} 0)" d="M0 -10H{0.43*cap:.0f}V-90H0Z"/>')
    total_w = ux + 0.43 * cap
    total_h = cap * 1.3
    box = 64 * (1 - 2 * pad)
    s = min(box / total_w, box / total_h)
    tx = (64 - total_w * s) / 2
    ty = 32 + (cap * s) / 2
    g = f'<g transform="translate({tx:.2f} {ty:.2f}) scale({s:.5f} -{s:.5f})">{"".join(parts)}</g>'
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="{rx}" fill="{bg}"/>{g}</svg>'


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('initials')
    ap.add_argument('--font', required=True)
    ap.add_argument('--out', default='.')
    ap.add_argument('--bar', default='#EF2D38')
    ap.add_argument('--text', default='#F3EEE3')
    ap.add_argument('--bg', default='#151212')
    a = ap.parse_args()
    os.makedirs(a.out, exist_ok=True)
    svg = build_svg(a.initials, a.font, a.bar, a.text, a.bg, pad=0.06)
    open(os.path.join(a.out, 'favicon.svg'), 'w').write(svg)
    # Maskable: más margen (zona segura) y sin esquinas redondeadas
    mask = build_svg(a.initials, a.font, a.bar, a.text, a.bg, pad=0.2, rx=0)
    with tempfile.TemporaryDirectory() as t:
        ms = os.path.join(t, 'm.svg'); open(ms, 'w').write(mask)
        fs = os.path.join(a.out, 'favicon.svg')
        def png(src, size, dst):
            subprocess.run(['rsvg-convert', '-w', str(size), '-h', str(size), src, '-o', dst], check=True)
        sizes = []
        for n in (16, 32, 48):
            p = os.path.join(t, f'{n}.png'); png(fs, n, p); sizes.append(p)
        subprocess.run(['convert', *sizes, os.path.join(a.out, 'favicon.ico')], check=True)
        png(fs, 180, os.path.join(a.out, 'apple-touch-icon.png'))
        png(fs, 192, os.path.join(a.out, 'icon-192.png'))
        png(fs, 512, os.path.join(a.out, 'icon-512.png'))
        png(ms, 512, os.path.join(a.out, 'icon-maskable-512.png'))
    print('Listo:', a.out)


if __name__ == '__main__':
    main()
