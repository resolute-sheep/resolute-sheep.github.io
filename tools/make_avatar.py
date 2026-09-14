# -*- coding: utf-8 -*-
"""Process the ID photo into web-ready assets for the personal site.

Input : C:\\Users\\ASUS\\Downloads\\杨卓毅.jpg   (3456 x 5184 white-background ID photo)
Output: website/assets/img/
          portrait.jpg         white background, trimmed, 1200px tall  (light themes)
          avatar-cutout.webp   transparent background (dark themes)
          avatar-square.webp   head-and-shoulders square avatar 512px

Background removal is a border-connected flood fill over a near-white mask, so
white regions *inside* the subject (shirt, highlights) are preserved.

Re-run after editing the constants below; nothing else in the site depends on
this script.
"""
import os
import sys

import cv2
import numpy as np
from scipy import ndimage

sys.stdout.reconfigure(encoding="utf-8")

SRC = r"C:\Users\ASUS\Downloads\杨卓毅.jpg"
OUT = r"D:\yzy\files\website\assets\img"
os.makedirs(OUT, exist_ok=True)

MAX_H = 1100           # max height of the transparent cutout
WHITE_MIN = 205        # channel floor for "background-ish"
SEED_WHITE = 228       # a border component must average at least this white
FEATHER = 1.2          # alpha edge softness in px
HEAD_FRAME = 1.52      # square avatar side = HEAD_FRAME * head height


def imread_unicode(path, flags=cv2.IMREAD_COLOR):
    """cv2.imread cannot open non-ASCII paths on Windows; decode from bytes."""
    with open(path, "rb") as f:
        return cv2.imdecode(np.frombuffer(f.read(), np.uint8), flags)


def imwrite_unicode(path, img, params=None):
    ok, buf = cv2.imencode(os.path.splitext(path)[1], img, params or [])
    if ok:
        with open(path, "wb") as f:
            f.write(buf.tobytes())
    return ok


def trim_white(bgr, pad_frac=0.02):
    h, w = bgr.shape[:2]
    fg = (bgr.min(axis=2) < 240).astype(np.uint8)
    nz_c = np.where(fg.sum(axis=0) > h * 0.01)[0]
    nz_r = np.where(fg.sum(axis=1) > w * 0.01)[0]
    if len(nz_c) == 0 or len(nz_r) == 0:
        return bgr
    x0, x1 = int(nz_c[0]), int(nz_c[-1]) + 1
    y0, y1 = int(nz_r[0]), int(nz_r[-1]) + 1
    p = int(max(x1 - x0, y1 - y0) * pad_frac)
    return bgr[max(0, y0 - p):min(h, y1 + p), max(0, x0 - p):min(w, x1 + p)]


def resize_max_h(bgr, max_h):
    h, w = bgr.shape[:2]
    if h <= max_h:
        return bgr
    s = max_h / h
    return cv2.resize(bgr, (max(1, round(w * s)), max_h), interpolation=cv2.INTER_AREA)


def background_alpha(bgr):
    """Alpha = 0 on the border-connected near-white background."""
    h, w = bgr.shape[:2]
    near_white = (bgr.min(axis=2) >= WHITE_MIN).astype(np.uint8)
    labels, n = ndimage.label(near_white, structure=np.ones((3, 3), np.uint8))
    if n == 0:
        return np.full((h, w), 255, np.uint8)

    edge = np.concatenate([labels[0, :], labels[-1, :], labels[:, 0], labels[:, -1]])
    seeds = np.unique(edge)
    seeds = seeds[seeds > 0]

    bg = np.zeros((h, w), bool)
    for lb in seeds:                      # keep only components that are truly white
        comp = labels == lb
        if bgr[comp].mean() >= SEED_WHITE:
            bg |= comp

    alpha = np.where(bg, 0, 255).astype(np.uint8)
    alpha = cv2.morphologyEx(alpha, cv2.MORPH_CLOSE, np.ones((5, 5), np.uint8))
    k = int(FEATHER * 2) * 2 + 1
    return cv2.GaussianBlur(alpha, (k, k), FEATHER)


def head_square(rgba):
    """Crop a head-and-shoulders square, located from the alpha silhouette."""
    fg = (rgba[:, :, 3] > 128).astype(np.uint8)
    h, w = fg.shape
    rows = np.where(fg.sum(axis=1) > 0)[0]
    if not len(rows):
        side = min(h, w)
        return rgba[(h - side) // 2:(h - side) // 2 + side,
                    (w - side) // 2:(w - side) // 2 + side]

    top = int(rows[0])
    widths = fg.sum(axis=1)

    # neck = local minimum of the silhouette width in the middle band
    lo, hi = int(h * 0.36), int(h * 0.60)
    band = widths[lo:hi].astype(float)
    band[band == 0] = np.inf
    neck = lo + int(np.argmin(band))

    head_h = neck - top
    side = int(min(head_h * HEAD_FRAME, h, w))

    stripe = fg[max(top, neck - head_h // 3):neck]        # widest head rows
    xs = np.where(stripe.sum(axis=0) > 0)[0]
    cx = int((xs[0] + xs[-1]) / 2) if len(xs) else w // 2

    x0 = int(np.clip(cx - side // 2, 0, w - side))
    y0 = int(np.clip(top - side * 0.06, 0, h - side))
    return rgba[y0:y0 + side, x0:x0 + side]


def main():
    img = imread_unicode(SRC)
    if img is None:
        raise SystemExit(f"cannot read {SRC}")
    print("source ", img.shape, "(h, w, c)")

    trimmed = trim_white(img)
    print("trimmed", trimmed.shape)

    portrait = resize_max_h(trimmed, 1200)
    imwrite_unicode(os.path.join(OUT, "portrait.jpg"), portrait,
                    [int(cv2.IMWRITE_JPEG_QUALITY), 88])
    print("portrait.jpg       ", portrait.shape)

    small = resize_max_h(trimmed, MAX_H)
    alpha = background_alpha(small)
    b, g, r = cv2.split(small)
    rgba = cv2.merge([b, g, r, alpha])
    imwrite_unicode(os.path.join(OUT, "avatar-cutout.webp"), rgba,
                    [int(cv2.IMWRITE_WEBP_QUALITY), 88])
    print(f"avatar-cutout.webp  {rgba.shape} foreground={float((alpha > 128).mean()):.1%}")

    sq = head_square(rgba)
    sq = cv2.resize(sq, (512, 512), interpolation=cv2.INTER_AREA)
    imwrite_unicode(os.path.join(OUT, "avatar-square.webp"), sq,
                    [int(cv2.IMWRITE_WEBP_QUALITY), 90])
    print("avatar-square.webp ", sq.shape)


if __name__ == "__main__":
    main()
