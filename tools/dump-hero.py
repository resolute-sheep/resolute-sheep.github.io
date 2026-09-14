# -*- coding: utf-8 -*-
"""dump-hero.py — 打印渲染结果里首屏的纯文本，用于人工核对。"""
import html
import re
import sys

sys.stdout.reconfigure(encoding="utf-8")

path = sys.argv[1] if len(sys.argv) > 1 else r"D:\yzy\files\tmp\render-zh.html"
src = open(path, encoding="utf-8").read()

start = src.index('<section class="hero"')
end = src.index("</section>", start) + len("</section>")
hero = src[start:end]

text = html.unescape(re.sub(r"<[^>]+>", "\n", hero))
print("=== 首屏纯文本 ===")
print("\n".join(l.strip() for l in text.split("\n") if l.strip()))

print("\n=== 检查 ===")
print("首屏 <img> 标签:", "有 ✗" if "<img" in hero else "无 ✓")
print("首屏 <aside class=\"idcard\">:", "有 ✓" if 'class="idcard"' in hero else "无 ✗")

whole = src
print("整页 <img> 标签数:", whole.count("<img"))
print("整页引用 .jpg/.webp:", len(re.findall(r"\.(?:jpe?g|webp)", whole)))
