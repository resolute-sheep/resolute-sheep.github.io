# -*- coding: utf-8 -*-
"""css-check.py — CSS 花括号配平 + CSS 变量定义/引用一致性检查。

变量分三类：
  1. 有定义、被引用            → 正常
  2. 没定义但 var() 带兜底值   → 正常（例如 var(--mx, 50%)），只是提示
  3. 没定义、var() 也没兜底值  → 报错
"""
import re
import sys

sys.stdout.reconfigure(encoding="utf-8")

FILES = ["assets/css/base.css", "assets/css/themes.css"]

# 由 JS 在运行时写入的自定义属性，允许「无定义但有兜底值」
RUNTIME_VARS = {"--mx", "--my"}

ok = True
defined = set()
allcss = ""

for f in FILES:
    src = open(f, encoding="utf-8").read()
    body = re.sub(r"/\*.*?\*/", "", src, flags=re.S)
    allcss += body

    opens, closes = body.count("{"), body.count("}")
    balanced = opens == closes
    ok &= balanced
    print(f"{f:24}  {{ {opens:3d}   }} {closes:3d}   {'OK' if balanced else 'MISMATCH'}")

    defined |= set(re.findall(r"(--[a-z0-9-]+)\s*:", body))

# 区分「带兜底值」和「不带兜底值」的引用
with_fallback = set()
bare = set()
for m in re.finditer(r"var\(\s*(--[a-z0-9-]+)\s*([,)])", allcss):
    name, nxt = m.group(1), m.group(2)
    (with_fallback if nxt == "," else bare).add(name)

missing_bare = sorted(bare - defined - RUNTIME_VARS)
missing_fallback = sorted(with_fallback - defined - RUNTIME_VARS)

if missing_bare:
    ok = False
    print(f"\n✗ 引用了但未定义、且没有兜底值: {missing_bare}")
else:
    print(f"\n✓ 所有 var() 引用都有定义或有兜底值"
          f"（共 {len(bare | with_fallback)} 个变量，{len(defined)} 个已定义）")

if missing_fallback:
    print(f"  ! 未定义但带兜底值（确认是 JS 运行时写入的就没问题）: {missing_fallback}")

# 主题内重复定义
for name, block in re.findall(r'\[data-theme="(\w+)"\]\s*\{(.*?)\n\}', allcss, flags=re.S):
    keys = re.findall(r"(--[a-z0-9-]+)\s*:", block)
    dupes = {k for k in keys if keys.count(k) > 1}
    if dupes:
        print(f"  ! 主题 {name} 内重复定义: {sorted(dupes)}")

# 锚点偏移量叠加检查：scroll-padding-top（滚动容器）与 scroll-margin-top（目标元素）
# 会相加。两处都设会把标题推到很远的位置，目录高亮的判定线也会跟着对不上。
allcss_nc = re.sub(r"/\*.*?\*/", "", open("assets/css/base.css", encoding="utf-8").read(), flags=re.S)
sp = re.search(r"scroll-padding-top\s*:\s*([^;}]+)", allcss_nc)
sm = re.search(r"scroll-margin-top\s*:\s*([^;}]+)", allcss_nc)
print()
if sp and sm:
    ok = False
    print(f"✗ scroll-padding-top({sp.group(1).strip()}) 与 scroll-margin-top({sm.group(1).strip()}) 同时存在，")
    print("  两者相加会让锚点跳转的落点偏移一倍，目录高亮判定线也会对不上。只保留一个。")
elif sp:
    print(f"✓ 锚点偏移只由 scroll-padding-top 控制（{sp.group(1).strip()}）")
elif sm:
    print(f"✓ 锚点偏移只由 scroll-margin-top 控制（{sm.group(1).strip()}）")
else:
    print("✓ 没有设置锚点偏移")

# flex 容器上挂 ::after 且带 display:block 的可疑写法
for f in FILES:
    src = open(f, encoding="utf-8").read()
    for m in re.finditer(r"([^{}]+)\{([^}]*)\}", src):
        sel, decl = m.group(1).strip(), m.group(2)
        if "::after" in sel and "display: block" in decl:
            base = sel.split("::after")[0].strip()
            if re.search(re.escape(base) + r"\s*\{[^}]*display:\s*flex", src):
                print(f"  ! {f}: {sel} 的基类可能是 flex，::after 不会换行")

sys.exit(0 if ok else 1)
