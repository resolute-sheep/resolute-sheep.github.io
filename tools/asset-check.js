/* =============================================================================
 * asset-check.js — 检查 index.html / app.js / CSS 里引用到的本地资源是否存在
 * 用法：node tools/asset-check.js
 * ========================================================================== */
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const refs = new Map();     // 资源路径 -> 引用来源

function add(rel, from) {
  if (/^(https?:|mailto:|data:|#|\/\/)/.test(rel)) return;
  const clean = rel.split('?')[0].split('#')[0];
  if (!clean) return;
  if (!refs.has(clean)) refs.set(clean, []);
  refs.get(clean).push(from);
}

// index.html
const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
for (const m of html.matchAll(/(?:src|href)="([^"]+)"/g)) add(m[1], 'index.html');

// JS：assets/img/... 与 assets/css/... 之类的字符串
for (const f of ['assets/js/content.js', 'assets/js/app.js']) {
  const src = fs.readFileSync(path.join(ROOT, f), 'utf8');
  for (const m of src.matchAll(/["'`](assets\/[^"'`\s]+)["'`]/g)) add(m[1], f);
}

// CSS：url(...)
for (const f of ['assets/css/base.css', 'assets/css/themes.css']) {
  const src = fs.readFileSync(path.join(ROOT, f), 'utf8');
  for (const m of src.matchAll(/url\(\s*["']?([^"')]+)["']?\s*\)/g)) add(m[1], f);
}

let missing = 0;
const rows = [...refs.keys()].sort();
for (const rel of rows) {
  const abs = path.join(ROOT, rel);
  const exists = fs.existsSync(abs);
  if (!exists) missing++;
  const size = exists ? (fs.statSync(abs).size / 1024).toFixed(0) + ' KB' : '—';
  console.log(`${exists ? '✓' : '✗'}  ${rel.padEnd(38)} ${size.padStart(9)}   ${refs.get(rel).join(', ')}`);
}

// 反向检查：assets 下有没有没被引用的文件
const all = [];
(function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else all.push(path.relative(ROOT, p).replace(/\\/g, '/'));
  }
})(path.join(ROOT, 'assets'));

const orphans = all.filter((f) => !refs.has(f) && !/favicon\.svg$/.test(f));
console.log(`\n引用 ${rows.length} 个资源，缺失 ${missing} 个。`);
if (orphans.length) console.log('未被引用：' + orphans.join(', '));
process.exit(missing ? 1 : 0);
