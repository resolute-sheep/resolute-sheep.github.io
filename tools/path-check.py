# -*- coding: utf-8 -*-
"""path-check.py — 检查站点里有没有绝对路径。

GitHub Pages 的项目站点部署在 https://<用户名>.github.io/<仓库名>/ 这种
**子目录**下。只要有一个 /assets/... 这样的绝对路径，部署后就会 404。
"""
import os
import re
import sys

sys.stdout.reconfigure(encoding="utf-8")

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FILES = [
    "index.html",
    "assets/js/app.js",
    "assets/js/content.js",
    "assets/css/base.css",
    "assets/css/themes.css",
]

REF = re.compile(r"""(?:src|href)\s*=\s*["']([^"']+)["']|["'](assets/[^"'\s]+)["']""")
EXTERNAL = re.compile(r"^(https?:|mailto:|tel:|#|data:|//)")

found = []
absolute = []

for rel in FILES:
    path = os.path.join(ROOT, rel)
    src = open(path, encoding="utf-8").read()
    for m in REF.finditer(src):
        val = m.group(1) or m.group(2)
        if not val or EXTERNAL.match(val):
            continue
        found.append((rel, val))
        if val.startswith("/"):
            absolute.append((rel, val))

for rel, val in found:
    mark = "✗ 绝对" if val.startswith("/") else "✓ 相对"
    print(f"  {mark}  {val:36}  ({rel})")

print()
if absolute:
    print(f"✗ 发现 {len(absolute)} 个绝对路径，部署到子目录后会 404：")
    for rel, val in absolute:
        print(f"    {rel}: {val}")
    sys.exit(1)

print(f"✓ {len(found)} 个引用全部是相对路径，可以安全部署在任意子目录下")
