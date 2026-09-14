/* =============================================================================
 * render-check.js — 在桩 DOM 里跑一遍 content.js + app.js
 *
 * 目的：不打开浏览器就能验证渲染管线（中英文两条路径）不报错、
 *       不产生 undefined / [object Object]，并导出 HTML 供结构检查。
 * 用法：node tools/render-check.js
 * ========================================================================== */
'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(ROOT, '..', 'tmp');
fs.mkdirSync(OUT, { recursive: true });

/* ------------------------------------------------------------------ 桩 DOM */
function makeEl(id) {
  const attrs = {};
  const props = {};
  const el = {
    id,
    innerHTML: '',
    textContent: '',
    children: [],
    dataset: {},
    style: {
      setProperty(k, v) { props[k] = String(v); },
      getPropertyValue(k) { return k in props ? props[k] : ''; },
      removeProperty(k) { delete props[k]; },
    },
    classList: { toggle() {}, add() {}, remove() {}, contains: () => false },
    addEventListener() {},
    removeEventListener() {},
    setAttribute(k, v) { attrs[k] = String(v); },
    getAttribute(k) { return k in attrs ? attrs[k] : null; },
    hasAttribute(k) { return k in attrs; },
    removeAttribute(k) { delete attrs[k]; },
    appendChild() {},
    closest: () => null,
    getBoundingClientRect: () => ({ top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0 }),
    querySelector: () => null,
    querySelectorAll: () => [],
  };
  return el;
}

function makeDocument() {
  const cache = {};
  const docEl = makeEl('html');
  return {
    readyState: 'complete',
    title: '',
    documentElement: docEl,
    body: makeEl('body'),
    getElementById(id) {
      if (!cache[id]) cache[id] = makeEl(id);
      return cache[id];
    },
    querySelector(sel) {
      if (sel === 'meta[name="description"]') return makeEl('meta');
      return null;
    },
    querySelectorAll: () => [],
    createElement: makeEl,
    addEventListener() {},
    _cache: cache,
  };
}

function run(lang) {
  const doc = makeDocument();
  const store = { 'yz.lang': lang };

  const sandbox = {
    document: doc,
    navigator: { language: lang === 'zh' ? 'zh-CN' : 'en-US' },
    localStorage: {
      getItem: (k) => (k in store ? store[k] : null),
      setItem: (k, v) => { store[k] = String(v); },
      removeItem: (k) => { delete store[k]; },
    },
    IntersectionObserver: undefined,
    // 桩掉样式查询：真实宽度/高度在无头环境里量不出来，返回空值即可
    getComputedStyle: () => ({ getPropertyValue: () => '', position: 'static' }),
    // 桩掉定时器：测试不需要动画回调真的执行
    setTimeout: () => 0,
    clearTimeout: () => {},
    requestAnimationFrame: () => 0,
    console,
  };
  sandbox.window = sandbox;
  sandbox.window.scrollY = 0;
  sandbox.window.scrollTo = () => {};
  sandbox.window.addEventListener = () => {};
  sandbox.window.innerHeight = 900;
  sandbox.window.localStorage = sandbox.localStorage;
  sandbox.globalThis = sandbox;

  const ctx = vm.createContext(sandbox);
  const load = (f) => vm.runInContext(fs.readFileSync(path.join(ROOT, f), 'utf8'), ctx, { filename: f });

  load('assets/js/content.js');
  load('assets/js/app.js');

  const html = doc.getElementById('app').innerHTML;
  return { html, title: doc.title, theme: doc.documentElement.dataset.theme, lang: doc.documentElement.lang };
}

/* -------------------------------------------------------------- 结构校验 */
const EXPECTED_IDS = ['about', 'education', 'research', 'projects', 'awards', 'skills', 'service', 'contact'];

/* 各主题下指标格容器的实际宽度（px），用于估算每格宽度 */
const THEME_WIDTHS = {
  academic:  788,   // 1080 - 40(padding) - 208(sidebar) - 44(gap)
  portfolio: 1088,  // 1180 - 40(padding) - 52(card padding)
  terminal:  988,   // 1080 - 40(padding) - 52(card padding)
};

/** 校验每个 facts / metrics 块的列数不会让最后一行只剩一个格子 */
function checkGrids(label, html) {
  const problems = [];
  const rows = [];
  const re = /<div class="(facts|metrics)(?: cols-(\d+))?">/g;
  const marks = [];
  let m;
  while ((m = re.exec(html))) marks.push({ cls: m[1], cols: Number(m[2] || 4), at: m.index, end: re.lastIndex });

  marks.forEach((mark, i) => {
    const stop = i + 1 < marks.length ? marks[i + 1].at : html.length;
    const slice = html.slice(mark.end, stop);
    const itemRe = /class="(?:fact|metric)(?:\s+is-bad)?"/g;
    const n = (slice.match(itemRe) || []).length;
    const cols = mark.cols;
    const remainder = n % cols;
    const px = Math.round((THEME_WIDTHS.academic - (cols - 1)) / cols);

    const flag = [];
    if (!cols) flag.push('没有 cols-N 类');
    if (n && remainder === 1) flag.push(`孤儿格：${n} 项排 ${cols} 列，第二行只剩 1 个`);
    if (n && cols > n) flag.push(`列数多于项数：${cols} > ${n}`);
    if (flag.length) problems.push(`#${i + 1} ${mark.cls}: ` + flag.join('；'));

    rows.push(`    ${mark.cls.padEnd(8)} cols=${String(cols).padStart(2)}  项数=${String(n).padStart(2)}  ` +
              `行数=${n ? Math.ceil(n / cols) : 0}  末行=${n ? (remainder || cols) : 0}  ` +
              `学术主题每格≈${px}px${flag.length ? '  ← ' + flag.join('；') : ''}`);
  });

  console.log(`\n  [${label}] 共 ${marks.length} 个网格块`);
  console.log(rows.join('\n'));
  return problems;
}

function check(label, res) {
  const problems = [];
  const { html } = res;

  for (const id of EXPECTED_IDS) {
    if (!html.includes(`id="${id}"`)) problems.push(`缺少版块 #${id}`);
  }
  for (const bad of ['undefined', '[object Object]', 'NaN', 'null']) {
    // "null" 会出现在合理的词里，只在明显异常时报警
    if (bad === 'null') continue;
    if (html.includes(bad)) problems.push(`输出里出现了 "${bad}"`);
  }
  if (/\{\s*zh:/.test(html)) problems.push('有未翻译的 {zh: ...} 对象泄漏到输出');

  // 光效层 / 进度条 / 返回顶部
  for (const sel of ['class="aurora"', 'class="grid-backdrop"', 'id="progress"', 'id="toTop"', 'class="curtain"']) {
    if (!html.includes(sel)) problems.push(`缺少 ${sel}`);
  }

  // 目录项与版块必须一一对应，否则高亮永远对不上
  const spyTargets = [...html.matchAll(/data-spy="([^"]+)"/g)].map((m) => m[1]);
  const sectionIds = [...html.matchAll(/<section[^>]*\bid="([^"]+)"/g)].map((m) => m[1]);
  if (!spyTargets.length) problems.push('导航里没有任何 data-spy 目标');
  for (const id of spyTargets) {
    if (!sectionIds.includes(id)) problems.push(`目录项 #${id} 没有对应的 <section>`);
  }
  const orphanSections = sectionIds.filter((id) => !spyTargets.includes(id));

  // 标签配平
  const stack = [];
  const voidTags = new Set(['img', 'br', 'hr', 'meta', 'link', 'input', 'source', 'path', 'rect', 'g', 'circle', 'stop']);
  const re = /<(\/?)([a-zA-Z][a-zA-Z0-9]*)\b[^>]*?(\/?)>/g;
  let m;
  while ((m = re.exec(html))) {
    const [, close, tag, selfClose] = m;
    const name = tag.toLowerCase();
    if (voidTags.has(name) || selfClose) continue;
    if (close) {
      const top = stack.pop();
      if (top !== name) problems.push(`标签不匹配：</${name}> 对应 <${top}>`);
    } else {
      stack.push(name);
    }
  }
  if (stack.length) problems.push(`有未闭合标签：${stack.join(', ')}`);

  const sections = (html.match(/<section /g) || []).length;
  const cards = (html.match(/class="card/g) || []).length;

  console.log(`\n[${label}]  title="${res.title}"`);
  console.log(`  lang=${res.lang} theme=${res.theme}  html=${html.length} 字节  section=${sections}  card=${cards}`);
  console.log(`  目录项 ${spyTargets.length} 个 → ${spyTargets.join(', ')}`);
  if (orphanSections.length) {
    console.log(`  · 无目录项的版块（首屏等）：${orphanSections.join(', ')}`);
  }
  if (problems.length) {
    console.log('  ✗ ' + problems.join('\n  ✗ '));
  } else {
    console.log('  ✓ 版块齐全、标签配平、无未翻译内容');
  }

  const gridProblems = checkGrids(label, html);
  if (gridProblems.length) {
    console.log('  ✗ ' + gridProblems.join('\n  ✗ '));
  } else {
    console.log('  ✓ 所有指标格列数正常，没有孤儿格');
  }
  return problems.length === 0 && gridProblems.length === 0;
}

let ok = true;

// index.html 静态部分
const indexPath = path.join(ROOT, 'index.html');
const indexHtml = fs.readFileSync(indexPath, 'utf8');
const indexProblems = [];
if (!/class="boot"/.test(indexHtml)) indexProblems.push('index.html 缺少 class="boot"（首屏入场动画的开关）');
if (!/data-theme="academic"/.test(indexHtml)) indexProblems.push('index.html 缺少默认 data-theme');
if (!/yz\.theme/.test(indexHtml)) indexProblems.push('index.html 缺少防闪烁的主题预置脚本');
console.log(`\n[index.html]`);
console.log(indexProblems.length ? '  ✗ ' + indexProblems.join('\n  ✗ ') : '  ✓ boot 开关 / 默认主题 / 防闪烁脚本都在');
ok = indexProblems.length === 0 && ok;

const zh = run('zh');
ok = check('中文', zh) && ok;
fs.writeFileSync(path.join(OUT, 'render-zh.html'), zh.html, 'utf8');

const en = run('en');
ok = check('English', en) && ok;
fs.writeFileSync(path.join(OUT, 'render-en.html'), en.html, 'utf8');

console.log(`\nHTML 已导出到 tmp/render-zh.html 与 tmp/render-en.html`);
process.exit(ok ? 0 : 1);
