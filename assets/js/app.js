/* =============================================================================
 * app.js — 渲染、中英切换、滚动目录、动效
 * 内容全部来自 content.js，本文件不需要改。
 * ========================================================================== */
(function () {
  'use strict';

  var LS_LANG = 'yz.lang';

  /* ------------------------------------------------------------ 小工具 */
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function store(key, val) {
    try { window.localStorage.setItem(key, val); } catch (e) { /* 隐私模式忽略 */ }
  }
  function load(key) {
    try { return window.localStorage.getItem(key); } catch (e) { return null; }
  }

  /* ------------------------------------------------------------- 语言状态 */
  var lang = (function () {
    var saved = load(LS_LANG);
    if (saved === 'zh' || saved === 'en') return saved;
    return 'zh';
  })();

  /** 取双语文案 */
  function t(v) {
    if (v === null || v === undefined) return '';
    if (typeof v === 'object' && !Array.isArray(v)) {
      return v[lang] !== undefined ? v[lang] : (v.zh || v.en || '');
    }
    return v;
  }

  /* ------------------------------------------------------------ 渲染片段 */

  /**
   * 选择指标格的列数。
   *
   * 用 auto-fit 时，如果「指标个数 % 列数 == 1」，最后一行就只会剩一个格子，
   * 旁边留出大片容器底色——视觉上等于破版（AFE 有 6 个指标、正文正好排 5 列）。
   * 所以这里主动算列数：优先能整除的 4 / 3 / 2 列，其次退回「余数不为 1」的列数。
   */
  function balancedCols(n) {
    if (n <= 1) return 1;
    var exact = [4, 3, 2];
    for (var i = 0; i < exact.length; i++) {
      if (exact[i] <= n && n % exact[i] === 0) return exact[i];
    }
    for (var c = 4; c >= 2; c--) {
      if (c <= n && n % c !== 1) return c;
    }
    return Math.min(n, 4);
  }

  function sectionHead(title, note) {
    return '' +
      '<div class="section-head">' +
        '<h2 class="section-head__title">' + esc(t(title)) +
          '<span class="section-head__rule" aria-hidden="true"></span></h2>' +
        (note ? '<p class="section-head__note">' + esc(t(note)) + '</p>' : '') +
      '</div>';
  }

  function factGrid(items, cls) {
    var cols = balancedCols(items.length);
    return '<div class="' + cls + ' cols-' + cols + '">' + items.map(function (f) {
      return '<div class="' + (cls === 'metrics' ? 'metric' : 'fact') + (f.bad ? ' is-bad' : '') + '">' +
        '<div class="' + (cls === 'metrics' ? 'metric' : 'fact') + '__v">' + esc(t(f.v)) + '</div>' +
        '<div class="' + (cls === 'metrics' ? 'metric' : 'fact') + '__k">' + esc(t(f.k)) + '</div>' +
        (f.sub ? '<div class="fact__sub">' + esc(t(f.sub)) + '</div>' : '') +
      '</div>';
    }).join('') + '</div>';
  }

  /* --------------------------------------------------- 背景光效层 / 进度条 */
  function renderChrome() {
    return '' +
      '<div class="glow" aria-hidden="true"></div>' +
      '<div class="progress" id="progress" aria-hidden="true"></div>';
  }

  function renderTopbar() {
    var S = CONTENT.site, U = CONTENT.ui;
    return '' +
      '<header class="topbar">' +
        '<div class="brand">' +
          '<span class="brand__name">' + esc(t(S.name)) + '</span>' +
          '<span class="brand__sub">' + esc(t(S.title)) + '</span>' +
        '</div>' +
        '<div class="controls">' +
          '<button class="lang-btn" type="button" id="langBtn" title="' + esc(t(U.langTitle)) + '" ' +
            'aria-label="' + esc(t(U.langTitle)) + '">' + esc(t(U.langLabel)) + '</button>' +
        '</div>' +
      '</header>';
  }

  function renderSidebar() {
    var U = CONTENT.ui;
    return '' +
      '<aside class="sidebar">' +
        '<div class="sidebar__title">' + esc(t(U.menu)) + '</div>' +
        '<nav class="toc" aria-label="' + esc(t(U.menu)) + '">' +
          CONTENT.nav.map(function (n) {
            return '<a href="#' + n.id + '" data-spy="' + n.id + '">' + esc(t(n.label)) + '</a>';
          }).join('') +
        '</nav>' +
      '</aside>';
  }

  function renderHero() {
    var S = CONTENT.site, C = CONTENT.idcard;
    return '' +
      '<section class="hero" id="hero">' +
        '<div class="hero__body">' +
          '<h1 class="hero__name">' + esc(t(S.name)) +
            '<span class="romanised">' + esc(t(S.nameEn)) + '</span></h1>' +
          '<p class="hero__title">' + esc(t(S.title)) + '</p>' +
          '<p class="hero__tagline">' + esc(t(S.tagline)) + '</p>' +
          '<div class="hero__links">' +
            '<a class="btn btn--primary" href="mailto:' + esc(S.email) + '">' + esc(S.email) + '</a>' +
            '<a class="btn" href="#projects">' + esc(t({ zh: '查看项目', en: 'View projects' })) + '</a>' +
          '</div>' +
        '</div>' +
        '<aside class="idcard">' +
          '<div class="idcard__bar">' + esc(t(C.title)) + '</div>' +
          '<dl class="idcard__rows">' +
            C.rows.map(function (r) {
              return '<div class="idcard__row"><dt>' + esc(t(r.k)) + '</dt>' +
                     '<dd>' + esc(t(r.v)) + '</dd></div>';
            }).join('') +
          '</dl>' +
        '</aside>' +
      '</section>';
  }

  function renderAbout() {
    var A = CONTENT.about;
    return '<section id="about">' + sectionHead(A.title) +
      A.paragraphs.map(function (p) { return '<p>' + esc(t(p)) + '</p>'; }).join('') +
      '</section>';
  }

  function renderEducation() {
    var E = CONTENT.education;
    return '<section id="education">' + sectionHead(E.title) +
      E.entries.map(function (e) {
        return '<article class="card project">' +
          '<div class="project__top">' +
            '<h3 class="project__name">' + esc(t(e.school)) + '</h3>' +
            '<span class="project__period">' + esc(t(e.period)) + '</span>' +
          '</div>' +
          '<div class="project__meta"><span class="project__role">' + esc(t(e.degree)) + '</span></div>' +
          (e.focus ? '<p class="project__lead">' + esc(t(e.focus)) + '</p>' : '') +
        '</article>';
      }).join('') +
      '</section>';
  }

  function renderResearch() {
    var R = CONTENT.research;
    return '<section id="research">' + sectionHead(R.title) +
      '<div class="research-list">' +
        R.items.map(function (it) {
          return '<div class="research-item">' +
            '<div class="research-item__icon" aria-hidden="true">' + esc(it.icon) + '</div>' +
            '<div>' +
              '<div class="research-item__name">' + esc(t(it.name)) + '</div>' +
              '<p class="research-item__desc">' + esc(t(it.desc)) + '</p>' +
            '</div>' +
          '</div>';
        }).join('') +
      '</div>' +
      '</section>';
  }

  function renderProjects() {
    var P = CONTENT.projects, U = CONTENT.ui;
    return '<section id="projects">' + sectionHead(P.title) +
      P.items.map(function (p) {
        var detailId = 'detail-' + p.id;
        return '<article class="card project" data-project="' + esc(p.id) + '">' +
          '<div class="project__top">' +
            '<h3 class="project__name">' + esc(t(p.name)) + '</h3>' +
            '<span class="project__period">' + esc(t(p.period)) + '</span>' +
          '</div>' +
          '<div class="project__meta">' +
            '<span class="project__role">' + esc(t(p.role)) + '</span>' +
            '<span>' + esc(t(p.kind)) + '</span>' +
            // 展开按钮紧跟在标题右侧那一行
            '<button class="project__toggle" type="button" aria-expanded="false" ' +
              'aria-controls="' + detailId + '">' +
              '<span class="project__toggle-label">' + esc(t(U.detailMore)) + '</span>' +
              '<span class="project__chev" aria-hidden="true"></span>' +
            '</button>' +
          '</div>' +
          (p.award ? '<div class="project__award">★ ' + esc(t(p.award)) + '</div>' : '') +
          // 收起时只显示这一句，读者据此判断要不要展开
          '<p class="project__brief">' + esc(t(p.brief)) + '</p>' +
          '<div class="project__detail" id="' + detailId + '">' +
            '<div class="project__detail-inner">' +
              '<p class="project__lead">' + esc(t(p.summary)) + '</p>' +
              '<div class="tags">' + p.tags.map(function (x) {
                return '<span class="tag">' + esc(t(x)) + '</span>';
              }).join('') + '</div>' +
              '<div class="block-label">' + esc(t(U.metricLabel)) + '</div>' +
              factGrid(p.metrics, 'metrics') +
              '<div class="scope"><div class="block-label">' + esc(t(U.scopeLabel)) + '</div>' +
                '<p>' + esc(t(p.scope)) + '</p></div>' +
            '</div>' +
          '</div>' +
        '</article>';
      }).join('') +
      '</section>';
  }

  function renderAwards() {
    var A = CONTENT.awards, U = CONTENT.ui;
    var LIMIT = 6;
    var head = A.items.slice(0, LIMIT).map(awardRow).join('');
    var rest = A.items.slice(LIMIT);

    return '<section id="awards">' + sectionHead(A.title) +
      '<div class="card"><div class="entries" id="awardList">' + head +
        (rest.length
          ? '<div id="awardRest" hidden>' + rest.map(awardRow).join('') + '</div>'
          : '') +
      '</div>' +
      (rest.length
        ? '<button class="btn" type="button" id="awardToggle" style="margin-top:16px" ' +
          'aria-expanded="false" aria-controls="awardRest">' + esc(t(U.awardsMore)) +
          ' (' + rest.length + ')</button>'
        : '') +
      '</div></section>';

    function awardRow(a) {
      return '<div class="entry' + (a.star ? ' is-star' : '') + '">' +
        '<div class="entry__period">' + esc(a.year) + '</div>' +
        '<div><div class="entry__role">' + esc(t(a.name)) + '</div>' +
        '<div class="entry__desc">' + esc(t(a.org)) + '</div></div>' +
      '</div>';
    }
  }

  function renderSkills() {
    var S = CONTENT.skills;
    return '<section id="skills">' + sectionHead(S.title) +
      '<div class="card"><div class="skill-groups">' +
        S.groups.map(function (g) {
          return '<div class="skill-group">' +
            '<div class="skill-group__name">' + esc(t(g.name)) + '</div>' +
            '<div class="chips">' + g.items.map(function (i) {
              return '<span class="chip">' + esc(t(i)) + '</span>';
            }).join('') + '</div>' +
          '</div>';
        }).join('') +
      '</div></div></section>';
  }

  function renderService() {
    var S = CONTENT.service;
    return '<section id="service">' + sectionHead(S.title) +
      '<div class="card"><div class="entries">' +
        S.items.map(function (s) {
          return '<div class="entry entry--rich">' +
            '<div class="entry__period">' + esc(t(s.period)) + '</div>' +
            '<div><div class="entry__role">' + esc(t(s.role)) + '</div>' +
            '<div class="entry__desc">' + esc(t(s.desc)) + '</div>' +
            (s.points
              ? '<ul class="points points--service">' + s.points.map(function (p) {
                  return '<li>' + esc(t(p)) + '</li>';
                }).join('') + '</ul>'
              : '') +
            '</div>' +
          '</div>';
        }).join('') +
      '</div></div></section>';
  }

  function renderContact() {
    var C = CONTENT.contact;
    return '<section id="contact">' + sectionHead(C.title, C.intro) +
      '<div class="contact-grid">' +
        C.items.map(function (i) {
          var val = i.href
            ? '<a href="' + esc(i.href) + '">' + esc(t(i.value)) + '</a>'
            : esc(t(i.value));
          return '<div class="contact-row">' +
            '<span class="contact-row__k">' + esc(t(i.label)) + '</span>' +
            '<span class="contact-row__v">' + val + '</span></div>';
        }).join('') +
      '</div></section>';
  }

  function renderFooter() {
    var U = CONTENT.ui, S = CONTENT.site;
    var year = new Date().getFullYear();
    return '<footer class="footer">' +
      '<span>© ' + year + ' ' + esc(t(S.name)) + ' · ' + esc(t(S.nameEn)) + '</span>' +
      '<span>' + esc(t(U.footer)) + '</span>' +
      '</footer>' +
      '<button class="to-top" type="button" id="toTop" aria-label="Top">' +
        '<span class="to-top__ring" aria-hidden="true"></span>↑</button>';
  }

  /* ---------------------------------------------------------------- 挂载 */
  function mount() {
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';

    var S = CONTENT.site;
    document.title = t(S.name) + ' · ' + t(S.tagline);
    var desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', t(CONTENT.about.paragraphs[0]).slice(0, 150));

    document.getElementById('app').innerHTML =
      renderChrome() + renderTopbar() + '<div class="shell">' + renderSidebar() + '<main>' +
      renderHero() + renderAbout() + renderEducation() + renderResearch() +
      renderProjects() + renderAwards() + renderSkills() + renderService() +
      renderContact() + '</main></div>' + renderFooter();

    bind();
    syncAnchor();
    collectSections();
    markReveal();
    setupReveal();
    updateProgress();
    updateSpy();

    // 首屏入场动画只在第一次加载时播放，切换语言不重播
    if (document.documentElement.classList.contains('boot')) {
      window.setTimeout(function () {
        document.documentElement.classList.remove('boot');
      }, 1700);          // 略长于最晚一段动画的结束时间（.5s + .9s）
    }
  }

  /* ---------------------------------------------------------------- 事件 */
  function bind() {
    document.getElementById('langBtn').addEventListener('click', function () {
      var y = window.scrollY;
      lang = lang === 'zh' ? 'en' : 'zh';
      store(LS_LANG, lang);
      mount();
      window.scrollTo(0, y);
    });

    // 项目卡：默认收起，点按钮展开细节
    Array.prototype.forEach.call(document.querySelectorAll('.project__toggle'), function (btn) {
      btn.addEventListener('click', function () {
        var card = btn.closest('.project');
        if (!card) return;
        var open = !card.classList.contains('is-open');
        card.classList.toggle('is-open', open);
        btn.setAttribute('aria-expanded', String(open));
        var label = btn.querySelector('.project__toggle-label');
        if (label) label.textContent = t(open ? CONTENT.ui.detailLess : CONTENT.ui.detailMore);
      });
    });

    var toggle = document.getElementById('awardToggle');
    if (toggle) {
      toggle.addEventListener('click', function () {
        var rest = document.getElementById('awardRest');
        var open = rest.hasAttribute('hidden');
        if (open) { rest.removeAttribute('hidden'); }
        else { rest.setAttribute('hidden', ''); }
        toggle.setAttribute('aria-expanded', String(open));
        toggle.textContent = open
          ? t(CONTENT.ui.collapse)
          : t(CONTENT.ui.awardsMore) + ' (' + rest.children.length + ')';
      });
    }

    var toTop = document.getElementById('toTop');
    toTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ------------------------------------------------------------ 目录高亮 */
  /*
   * 判定线 = 吸顶栏底边再往下一点。取「最后一个顶部越过判定线的版块」，
   * 而不是「第一个与视口相交的版块」：后者在点击目录跳转后，上一节仍然
   * 与判定带相交，会一直高亮错的那一项。
   */
  var spySections = [];

  function anchorOffset() {
    var v = getComputedStyle(document.documentElement).getPropertyValue('--anchor-offset');
    var n = parseFloat(v);
    return isNaN(n) ? 90 : n;
  }

  /** 量出吸顶栏的实际高度，写回 --anchor-offset，供 scroll-padding-top 与判定线共用 */
  function measureAnchor() {
    var off = 0;
    var tb = document.querySelector('.topbar');
    if (tb) off = tb.getBoundingClientRect().height;

    var nav = document.querySelector('.sidebar');
    if (nav && getComputedStyle(nav).position === 'sticky') {
      var root = getComputedStyle(document.documentElement);
      var sidebarW = parseFloat(root.getPropertyValue('--sidebar-w')) || 0;
      // 只有「不占左列、且吸顶」的侧栏（作品集主题的胶囊导航）才压在内容上方；
      // 学术主题的侧栏在左边单独一列，不遮挡正文
      if (sidebarW === 0) {
        off = Math.max(off, nav.getBoundingClientRect().bottom);
      }
    }
    return Math.round(off + 24);
  }

  function syncAnchor() {
    document.documentElement.style.setProperty('--anchor-offset', measureAnchor() + 'px');
  }

  function collectSections() {
    var byId = {};
    Array.prototype.forEach.call(document.querySelectorAll('[data-spy]'), function (a) {
      byId[a.getAttribute('data-spy')] = a;
    });
    spySections = Object.keys(byId).map(function (id) {
      return { id: id, el: document.getElementById(id), link: byId[id] };
    }).filter(function (s) { return s.el; });
  }

  function updateSpy() {
    if (!spySections.length) return;

    var line = anchorOffset() + 16;
    var active = spySections[0];        // 首屏（hero）没有目录项，默认高亮第一条

    for (var i = 0; i < spySections.length; i++) {
      if (spySections[i].el.getBoundingClientRect().top <= line) active = spySections[i];
      else break;
    }

    // 滚到底时最后一节可能永远越不过判定线（版块比剩余可滚动距离还短）
    var doc = document.documentElement;
    if (window.innerHeight + window.scrollY >= doc.scrollHeight - 2) {
      active = spySections[spySections.length - 1];
    }

    spySections.forEach(function (s) {
      s.link.classList.toggle('is-active', s === active);
    });
  }

  /* ------------------------------------------------------- 滚动进入动画 */
  // 只给版块的「直接子元素」加动画，避免父子嵌套 transform 导致抖动
  function markReveal() {
    Array.prototype.forEach.call(
      document.querySelectorAll('main > section > *'),
      function (el) { el.classList.add('reveal'); }
    );
  }

  var revealObserver = null;
  function setupReveal() {
    // 只有 JS 可用时才隐藏，避免脚本挂掉后内容不可见
    document.documentElement.classList.add('js-reveal');
    if (revealObserver) revealObserver.disconnect();

    var els = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
    if (!els.length) return;

    function done(el) {
      el.classList.add('is-in');
      // 动画结束后摘掉类，把 transform/transition 还给 hover 效果
      window.setTimeout(function () {
        el.classList.remove('reveal', 'is-in');
      }, 900);
    }

    var vh = window.innerHeight || 800;
    var below = [];
    els.forEach(function (el) {
      var box = el.getBoundingClientRect();
      if (box.top < vh * 0.92) done(el);      // 已在视口内：直接显示，不重播
      else below.push(el);
    });

    if (!('IntersectionObserver' in window) || !below.length) {
      below.forEach(done);
      return;
    }
    revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          revealObserver.unobserve(e.target);
          done(e.target);
        }
      });
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.04 });
    below.forEach(function (el) { revealObserver.observe(el); });
  }

  /* -------------------------------------------------------- 滚动进度条 */
  function updateProgress() {
    var el = document.getElementById('progress');
    if (!el) return;
    var doc = document.documentElement;
    var total = doc.scrollHeight - window.innerHeight;
    var p = total > 0 ? Math.min(1, Math.max(0, window.scrollY / total)) : 0;
    el.style.width = (p * 100) + '%';
  }

  /* ------------------------------------------------------ 返回顶部的进度环 */
  function updateToTopRing() {
    var ring = document.querySelector('.to-top__ring');
    if (!ring) return;
    var doc = document.documentElement;
    var total = doc.scrollHeight - window.innerHeight;
    var p = total > 0 ? Math.min(1, Math.max(0, window.scrollY / total)) : 0;
    ring.style.setProperty('--p', p.toFixed(3));
  }

  /* -------------------------------------------------------------- 滚动状态 */
  function onScroll() {
    var btn = document.getElementById('toTop');
    if (btn) btn.classList.toggle('is-on', window.scrollY > 620);
    updateProgress();
    updateToTopRing();
    updateSpy();
  }

  var scrollQueued = false;
  function requestScrollUpdate() {
    if (scrollQueued) return;
    scrollQueued = true;
    var raf = window.requestAnimationFrame || function (fn) { return window.setTimeout(fn, 16); };
    raf(function () { scrollQueued = false; onScroll(); });
  }

  window.addEventListener('scroll', requestScrollUpdate, { passive: true });

  // 窗口尺寸变了，吸顶栏高度和版块位置都会变，重新量一次
  window.addEventListener('resize', function () {
    syncAnchor();
    updateSpy();
  }, { passive: true });

  /* ---------------------------------------------------------------- 启动 */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
