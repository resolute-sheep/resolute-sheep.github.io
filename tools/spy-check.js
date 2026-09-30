/* =============================================================================
 * spy-check.js — 目录高亮逻辑的回归测试
 *
 * 在桩 DOM 里模拟真实的页面几何（版块高度、吸顶栏高度、视口高度），
 * 然后断言「视口里看到的版块」和「目录里高亮的项」始终一致。
 *
 * 覆盖场景：
 *   academic   侧栏在左列，只有顶栏吸顶          → 判定线 = 顶栏高度 + 24
 *
 * 用法：node tools/spy-check.js
 * ========================================================================== */
'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const VIEWPORT = 900;
const HERO = 620;
const FOOTER = 130;

const SECTION_DEFS = [
  { id: 'about',     h: 700 },
  { id: 'education', h: 900 },
  { id: 'research',  h: 600 },
  { id: 'projects',  h: 3200 },   // 很长的版块
  { id: 'awards',    h: 800 },
  { id: 'skills',    h: 500 },
  { id: 'service',   h: 700 },
  { id: 'contact',   h: 400 },    // 很短的版块，滚到底也越不过判定线
];

const SCENARIOS = [
  { name: 'academic', headerH: 48, sidebarW: '208px', stickyNav: null },
];

/* ------------------------------------------------------------------ 桩 DOM */
function makeClassList() {
  const set = new Set();
  return {
    add(...c) { c.forEach((x) => set.add(x)); },
    remove(...c) { c.forEach((x) => set.delete(x)); },
    contains: (c) => set.has(c),
    toggle(c, force) {
      const on = force === undefined ? !set.has(c) : !!force;
      if (on) set.add(c); else set.delete(c);
      return on;
    },
  };
}

function makeEl(id, box) {
  const attrs = {}, props = {};
  return {
    id,
    innerHTML: '', textContent: '', children: [], dataset: {},
    style: {
      setProperty(k, v) { props[k] = String(v); },
      getPropertyValue(k) { return k in props ? props[k] : ''; },
    },
    classList: makeClassList(),
    addEventListener() {},
    setAttribute(k, v) { attrs[k] = String(v); },
    getAttribute(k) { return k in attrs ? attrs[k] : null; },
    hasAttribute: (k) => k in attrs,
    removeAttribute(k) { delete attrs[k]; },
    appendChild() {},
    closest: () => null,
    getBoundingClientRect: box,
    querySelector: () => null,
    querySelectorAll: () => [],
  };
}

function simulate(cfg) {
  let cursor = HERO;
  const sections = SECTION_DEFS.map((d) => {
    const s = { ...d, top: cursor };
    s.bottom = cursor + s.h;
    cursor += s.h;
    return s;
  });
  const contentH = cursor + FOOTER;
  const maxScroll = Math.max(0, contentH - VIEWPORT);

  const state = { scrollY: 0, anchor: '' };
  const listeners = {};
  const zero = () => ({ top: 0, bottom: 0, height: 0 });

  const links = sections.map((s) => {
    const el = makeEl('link-' + s.id, zero);
    el.setAttribute('data-spy', s.id);
    return el;
  });
  const sectionEls = {};
  for (const s of sections) {
    sectionEls[s.id] = makeEl(s.id, () => ({
      top: s.top - state.scrollY, bottom: s.bottom - state.scrollY, height: s.h,
    }));
  }

  const topbarEl = makeEl('topbar', () => ({ top: 0, bottom: cfg.headerH, height: cfg.headerH }));
  const navEl = cfg.stickyNav
    ? makeEl('sidebar', () => ({
        top: cfg.stickyNav.top,
        bottom: cfg.stickyNav.top + cfg.stickyNav.height,
        height: cfg.stickyNav.height,
      }))
    : null;

  const docEl = makeEl('html', zero);
  // app.js 会把量出来的 --anchor-offset 写进 documentElement 的行内样式，再读回来。
  // 这里让该属性的读写都走同一个 state 字段。
  docEl.style.setProperty = (k, v) => { if (k === '--anchor-offset') state.anchor = String(v); };
  docEl.style.getPropertyValue = (k) => (k === '--anchor-offset' ? state.anchor : '');
  Object.defineProperty(docEl, 'scrollHeight', { get: () => contentH });

  const document = {
    readyState: 'complete',
    title: '',
    documentElement: docEl,
    body: makeEl('body', zero),
    getElementById: (id) => sectionEls[id] || makeEl(id, zero),
    querySelector(sel) {
      if (sel === '.topbar') return topbarEl;
      if (sel === '.sidebar') return navEl;
      if (sel === 'meta[name="description"]') return makeEl('meta', zero);
      return null;
    },
    querySelectorAll: (sel) => (sel === '[data-spy]' ? links : []),
    createElement: (id) => makeEl(id, zero),
    addEventListener() {},
  };

  const sandbox = {
    document,
    navigator: { language: 'zh-CN' },
    localStorage: { getItem: () => null, setItem: () => {}, removeItem: () => {} },
    getComputedStyle: (el) => ({
      position: el === navEl ? 'sticky' : 'static',
      // 真实浏览器的 getComputedStyle 会反映行内样式，所以 --anchor-offset 要回读
      getPropertyValue: (k) => {
        if (el !== docEl) return '';
        if (k === '--sidebar-w') return cfg.sidebarW;
        if (k === '--anchor-offset') return state.anchor;
        return '';
      },
    }),
    requestAnimationFrame: (fn) => { fn(); return 0; },   // 同步执行，滚动回调立即生效
    setTimeout: () => 0,
    clearTimeout: () => {},
    console,
    IntersectionObserver: undefined,
  };
  sandbox.window = sandbox;
  sandbox.globalThis = sandbox;
  Object.defineProperty(sandbox, 'scrollY', { get: () => state.scrollY, configurable: true });
  sandbox.scrollTo = () => {};
  sandbox.innerHeight = VIEWPORT;
  sandbox.addEventListener = (type, fn) => { listeners[type] = fn; };

  const ctx = vm.createContext(sandbox);
  const load = (f) => vm.runInContext(fs.readFileSync(path.join(ROOT, f), 'utf8'), ctx, { filename: f });
  load('assets/js/content.js');
  load('assets/js/app.js');

  const anchor = parseFloat(state.anchor) || NaN;

  return {
    sections,
    maxScroll,
    anchor,
    line: anchor + 16,
    secTop: (id) => sections.find((s) => s.id === id).top,
    scrollTo(y) {
      state.scrollY = Math.max(0, Math.min(maxScroll, y));
      if (listeners.scroll) listeners.scroll();
    },
    active() {
      const hit = links.filter((l) => l.classList.contains('is-active'));
      return hit.length === 1 ? hit[0].getAttribute('data-spy') : `<${hit.length} 个高亮>`;
    },
    countActive: () => links.filter((l) => l.classList.contains('is-active')).length,
  };
}

/* -------------------------------------------------------------------- 断言 */
let failures = 0;
function expect(label, got, want) {
  const ok = String(got) === String(want);
  if (!ok) failures++;
  console.log(`  ${ok ? '✓' : '✗'} ${label}` + (ok ? '' : `\n      期望 ${want} / 实际 ${got}`));
}

for (const cfg of SCENARIOS) {
  const sim = simulate(cfg);
  const expectedAnchor = Math.max(cfg.headerH, cfg.stickyNav ? cfg.stickyNav.top + cfg.stickyNav.height : 0) + 24;

  console.log(`\n${'='.repeat(64)}`);
  console.log(`场景：${cfg.name}`);
  console.log(`  吸顶栏 ${cfg.headerH}px` +
              (cfg.stickyNav ? ` + 吸顶导航底边 ${cfg.stickyNav.top + cfg.stickyNav.height}px` : '') +
              `  →  --anchor-offset = ${sim.anchor}px，判定线 ${sim.line}px`);
  console.log(`  视口 ${VIEWPORT}px  文档 ${sim.maxScroll + VIEWPORT}px  最大滚动 ${sim.maxScroll}px`);
  console.log('='.repeat(64));

  expect('--anchor-offset 按实际吸顶结构量出来', sim.anchor, expectedAnchor);

  console.log('\n【首屏】hero 没有目录项，默认高亮第一项');
  sim.scrollTo(0);
  expect('停在页面顶部', sim.active(), 'about');

  console.log('\n【点击目录跳转】被点击的那一项必须是高亮的');
  for (const s of sim.sections) {
    sim.scrollTo(sim.secTop(s.id) - sim.anchor);
    expect(`点击「${s.id}」`, sim.active(), s.id);
  }

  console.log('\n【长版块】下一节越过判定线之前，保持本节高亮');
  sim.scrollTo(sim.secTop('projects') + 1500);
  expect('projects 中段', sim.active(), 'projects');
  sim.scrollTo(sim.secTop('awards') - 200);
  expect('awards 已进入视口但未越过判定线', sim.active(), 'projects');
  sim.scrollTo(sim.secTop('awards') - sim.line + 2);
  expect('awards 刚越过判定线', sim.active(), 'awards');

  console.log('\n【页面底部】最后一节很短，越不过判定线，必须强制高亮最后一项');
  expect('maxScroll 确实小于 contact 顶部（这是会踩到的场景）',
         sim.maxScroll < sim.secTop('contact'), true);
  sim.scrollTo(sim.maxScroll);
  expect('滚到底部', sim.active(), 'contact');

  console.log('\n【全程扫描】任何滚动位置都必须恰好高亮一项');
  let none = 0, multi = 0, steps = 0;
  for (let y = 0; y <= sim.maxScroll; y += 20) {
    sim.scrollTo(y);
    const n = sim.countActive();
    steps++;
    if (n === 0) none++;
    if (n > 1) multi++;
  }
  console.log(`  扫描 ${steps} 个位置：无高亮 ${none} 次，多重高亮 ${multi} 次`);
  if (none || multi) failures++;
}

console.log(`\n${failures ? '✗ 失败 ' + failures + ' 项' : '✓ 全部通过'}`);
process.exit(failures ? 1 : 0);
