/* ==========================================================================
   Carta digital · lógica (mobile first)
   Lee window.MENU_DATA (data/menu.js) y construye toda la página.
   Sin dependencias ni build: funciona abriendo carta.html o en GitHub Pages.
   ========================================================================== */
(() => {
  'use strict';
  const D = window.MENU_DATA;
  if (!D) return;

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const desktop = matchMedia('(min-width: 900px)');
  const TONES = ['yellow', 'blue', 'red'];
  const R = D.restaurant;
  const tr = (window.I18N && window.I18N.tr) || (s => s);
  const AL = window.ALERGENOS || { list: [], items: {} };
  const selected = new Set();
  const alName = id => { const a = AL.list.find(x => x.id === id); return a ? tr(a.es) : id; };
  const fmt = new Intl.NumberFormat(R.locale || 'es-ES', { style: 'currency', currency: R.currency || 'EUR', minimumFractionDigits: 2 });
  const norm = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  const smooth = () => (reduce ? 'auto' : 'smooth');

  const ICONS = {
    coffee: '<path d="M5 9h11v4.5A4.5 4.5 0 0 1 11.5 18h-2A4.5 4.5 0 0 1 5 13.5V9z"/><path d="M16 10.5h1.2a2.3 2.3 0 0 1 0 4.6H16"/><path d="M8.5 3.5v2.2M12 3.5v2.2"/><path d="M4 21h13"/>',
    plate: '<path d="M7 3v5a2.5 2.5 0 0 0 5 0V3M9.5 3v18"/><path d="M17.5 21V3c-2 1.4-3 4-3 7 0 1.8 1 3 3 3"/>',
    glass: '<path d="M7 3h10v5a5 5 0 0 1-10 0V3z"/><path d="M12 13v8M8.5 21h7"/><path d="M7 8h10"/>'
  };

  function h(tag, props = {}, ...kids) {
    const n = document.createElement(tag);
    for (const [k, v] of Object.entries(props)) {
      if (v == null || v === false) continue;
      if (k === 'class') n.className = v;
      else if (k === 'text') n.textContent = v;
      else if (k === 'style') n.style.cssText = v;
      else if (k.startsWith('on')) n.addEventListener(k.slice(2), v);
      else n.setAttribute(k, v === true ? '' : v);
    }
    kids.flat().forEach(c => c != null && n.append(c.nodeType ? c : document.createTextNode(c)));
    return n;
  }
  const img = (key, props = {}) => {
    const p = D.photos[key];
    return h('img', { src: p.src, alt: props.alt ?? p.alt, width: p.w, height: p.h, loading: props.eager ? 'eager' : 'lazy', decoding: 'async', ...props.attrs });
  };
  const svg = inner => { const s = h('span', { class: 'ico', 'aria-hidden': 'true' }); s.innerHTML = `<svg viewBox="0 0 24 24" focusable="false">${inner}</svg>`; return s.firstChild; };

  /* ---------- Tema y textos ---------- */
  Object.entries(D.theme || {}).forEach(([k, v]) => document.documentElement.style.setProperty('--' + k, v));
  document.title = `${R.name} · ${tr('Carta digital')}`;
  $$('[data-bind]').forEach(el => { el.textContent = tr(el.dataset.bind.split('.').reduce((o, k) => o?.[k], D) ?? ''); });
  ['heroLogo', 'barLogo', 'footLogo'].forEach(id => { const el = $('#' + id); el.src = R.logo; });
  $('#heroLogo').alt = `${R.name} ${tr(R.kind)}`;
  $('#footLogo').alt = R.name;
  const favicon = $('link[rel=icon]'); if (favicon) favicon.href = R.logo;

  /* ---------- Portada: platos flotantes (+ parallax solo con ratón) ---------- */
  const heroDishes = $('#heroDishes');
  D.hero.dishes.forEach(k => heroDishes.append(h('div', { class: 'hd' }, img(k, { eager: true, alt: '' }))));
  const hero = $('#inicio');
  if (!reduce && matchMedia('(hover:hover) and (pointer:fine)').matches) {
    let raf = 0;
    hero.addEventListener('pointermove', e => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = hero.getBoundingClientRect();
        heroDishes.style.setProperty('--mx', ((e.clientX - r.left) / r.width - .5) * 2);
        heroDishes.style.setProperty('--my', ((e.clientY - r.top) / r.height - .5) * 2);
      });
    });
    hero.addEventListener('pointerleave', () => { heroDishes.style.setProperty('--mx', 0); heroDishes.style.setProperty('--my', 0); });
  }

  /* ---------- Cinta ---------- */
  const words = D.marquee.map(w => h('span', { text: w }));
  $('#ribbon').append(...words, ...words.map(w => w.cloneNode(true)));

  /* ---------- Reveal ---------- */
  const io = new IntersectionObserver(es => es.forEach(en => {
    if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
  }), { rootMargin: '0px 0px -6% 0px', threshold: .06 });
  const watch = root => $$('[data-reveal]:not(.in)', root).forEach(el => io.observe(el));

  /* ---------- Categorías ---------- */
  const sectionsEl = $('#sections'), chipsEl = $('#chips'), picksEl = $('#picks'), bar = $('#bar'), menu = $('#menu');
  const dockTabs = $('#dockTabs'), tabsEl = $('#tabs');
  const catIndex = {};
  const stageSize = (main, sub) => {
    if (sub) return [176, 134];
    const p = D.photos[main], a = p.w / p.h;
    return a > 1.25 ? [158, 118] : a < .8 ? [92, 150] : [128, 128];
  };

  D.categories.forEach((c, n) => {
    const tone = TONES[n % 3];
    const items = h('ul', { class: 'items' });
    c.items.forEach((it, i) => {
      const label = h('span', { class: 'item__name' }, tr(it.name));
      if (it.note) label.append(h('small', { class: 'item__note', text: tr(it.note) }));
      const al = AL.items[it.name];
      if (al === null) label.append(h('small', { class: 'item__al item__al--ask', text: tr('Consulta los alérgenos al personal') }));
      else if (al && al.length) label.append(h('small', { class: 'item__al', text: tr('Contiene') + ': ' + al.map(alName).join(' · ') }));
      const li = h('li', { class: 'item', 'data-reveal': true, style: `--d:${Math.min(i, 10) * 45}ms` },
        label, h('span', { class: 'item__dots', 'aria-hidden': 'true' }), h('span', { class: 'item__price', text: fmt.format(it.price) }));
      li._label = label; li._al = al;
      items.append(li);
    });

    const [main, sub] = c.photos;
    const [sw, sh] = stageSize(main, sub);
    const stage = h('div', { class: 'cat__stage', 'data-reveal': true, 'aria-hidden': 'true' },
      h('div', { class: 'stage__disc' }), h('div', { class: 'stage__ring' }),
      h('div', { class: 'stage__main' }, img(main, { alt: '', attrs: { style: `width:${Math.round(D.photos[main].w * 1.6)}px` } })),
      sub ? h('div', { class: 'stage__sub' }, img(sub, { alt: '', attrs: { style: `width:${Math.round(D.photos[sub].w * 1.6)}px` } })) : null);

    const n1 = c.items.length;
    const sec = h('section', { class: 'cat', id: 'cat-' + c.id, 'data-tab': c.tab, 'data-tone': tone, hidden: true, 'aria-labelledby': 'h-' + c.id },
      h('div', { class: 'cat__in' + (sub ? ' is-duo' : ''), style: `--sw:${sw}px;--sh:${sh}px;--ar:${(sw / sh).toFixed(3)}` },
        h('header', { class: 'cat__head', 'data-reveal': true },
          h('span', { class: 'cat__num', 'aria-hidden': 'true', text: String(n + 1).padStart(2, '0') }),
          c.kicker ? h('p', { class: 'kicker', text: tr(c.kicker) }) : null,
          h('h2', { class: 'cat__title', id: 'h-' + c.id, text: tr(c.title) }),
          h('p', { class: 'cat__count', text: `${n1} ${tr(n1 === 1 ? 'opción' : 'opciones')}` }),
          h('i', { class: 'flag', 'aria-hidden': 'true' }, h('b'), h('b'), h('b'))),
        h('div', { class: 'cat__list' }, items),
        stage));
    sec._items = $$('.item', sec);
    sectionsEl.append(sec);
    catIndex[c.id] = { sec, cat: c, tone, n };
  });

  /* ---------- Pestañas (barra inferior en móvil, arriba en escritorio) ---------- */
  let activeTab = null;
  D.tabs.forEach(t => {
    dockTabs.append(h('button', { class: 'dock__tab', type: 'button', 'data-tab': t.id, 'aria-pressed': 'false' }, svg(ICONS[t.icon] || ICONS.plate), h('span', { text: tr(t.label) })));
    tabsEl.append(h('button', { class: 'tab', type: 'button', 'data-tab': t.id, 'aria-pressed': 'false', text: tr(t.label) }));
  });
  document.addEventListener('click', e => {
    const b = e.target.closest('.tab, .dock__tab');
    if (b) setTab(b.dataset.tab, { scroll: true, dir: Math.sign(D.tabs.findIndex(t => t.id === b.dataset.tab) - D.tabs.findIndex(t => t.id === activeTab)) });
  });

  const tabCats = () => D.categories.filter(c => c.tab === activeTab);

  function renderPicks() {
    picksEl.replaceChildren(...tabCats().map((c, i) =>
      h('button', { class: 'pick', type: 'button', 'data-cat': c.id, 'data-tone': catIndex[c.id].tone },
        h('span', { class: 'pick__disc' }, img(c.photos[0], { alt: '', eager: i < 4 })),
        h('span', { class: 'pick__name', text: tr(c.title) }))));
    picksEl.scrollLeft = 0;
  }
  function renderChips() {
    chipsEl.replaceChildren(
      h('button', { class: 'chip chip--al' + (selected.size ? ' is-on' : ''), type: 'button' }, svg('<path d="M12 3.5l9 16H3l9-16z"/><path d="M12 10v4.5M12 17.2v.1"/>'), tr('Alérgenos') + (selected.size ? ' · ' + selected.size : '')),
      ...tabCats().map(c =>
        h('button', { class: 'chip', type: 'button', 'data-cat': c.id, 'data-tone': catIndex[c.id].tone },
          h('span', { class: 'chip__ph' }, img(c.photos[0], { alt: '' })), tr(c.title))));
  }
  document.addEventListener('click', e => {
    const b = e.target.closest('.chip, .pick');
    if (b) scrollToCat(b.dataset.cat);
  });

  /* ---------- Clásicos (solo los de la pestaña activa) ---------- */
  const strip = $('#strip'), rail = $('#rail');
  function renderStrip() {
    const list = D.featured.filter(f => catIndex[f.cat]?.cat.tab === activeTab);
    strip.hidden = !list.length;
    rail.replaceChildren(...list.map((f, i) =>
      h('a', { class: 'card', href: '#' + f.cat, 'data-tone': f.tone || TONES[i % 3], 'data-go-cat': f.cat, draggable: 'false' },
        h('div', { class: 'card__arch' }, img(f.photo, { attrs: { draggable: 'false' } })),
        h('div', { class: 'card__body' },
          h('h3', { class: 'card__name', text: tr(f.name) }),
          h('p', { class: 'card__desc', text: tr(f.desc) }),
          h('span', { class: 'card__price' }, f.from ? h('small', { text: tr('desde') }) : null, fmt.format(f.price)),
          h('span', { class: 'card__go', text: tr('Ver en la carta') })))));
    rail.scrollLeft = 0;
  }

  /* ---------- Cambio de pestaña y navegación ---------- */
  const barH = () => bar.offsetHeight || 56;
  const menuTop = () => menu.getBoundingClientRect().top + scrollY;
  function scrollToMenu() {
    const top = desktop.matches ? menuTop() - 1 : menuTop() - barH() + 2;
    window.scrollTo({ top, behavior: smooth() });
  }
  function setTab(id, { scroll = false, hash = true, dir = 0 } = {}) {
    if (!D.tabs.some(t => t.id === id)) id = D.tabs[0].id;
    const changed = id !== activeTab;
    activeTab = id;
    dockTabs.style.setProperty('--i', D.tabs.findIndex(t => t.id === id));
    $$('.tab, .dock__tab').forEach(b => b.setAttribute('aria-pressed', b.dataset.tab === id));
    D.categories.forEach(c => { catIndex[c.id].sec.hidden = c.tab !== id; });
    renderPicks(); renderChips(); renderStrip(); observeSections();
    watch(strip); watch(sectionsEl);
    if (changed && dir && !reduce) {
      sectionsEl.classList.remove('swap-l', 'swap-r'); void sectionsEl.offsetWidth;
      sectionsEl.classList.add(dir > 0 ? 'swap-l' : 'swap-r');
    }
    if (hash) try { history.replaceState(null, '', '#' + id); } catch (_) {}
    if (scroll) requestAnimationFrame(scrollToMenu);
    updateBar();
  }
  function scrollToCat(id) {
    const x = catIndex[id]; if (!x) return;
    if (x.cat.tab !== activeTab) setTab(x.cat.tab, { hash: false });
    requestAnimationFrame(() => x.sec.scrollIntoView({ behavior: smooth(), block: 'start' }));
  }
  document.addEventListener('click', e => {
    const go = e.target.closest('[data-go]');
    if (go) { e.preventDefault(); setTab(go.dataset.go, { scroll: true }); return; }
    const card = e.target.closest('[data-go-cat]');
    if (card) { e.preventDefault(); scrollToCat(card.dataset.goCat); }
  });

  /* Barra de categorías: en móvil aparece al entrar en la carta */
  let ticking = false;
  function updateBar() {
    ticking = false;
    if (desktop.matches) { bar.classList.remove('is-on'); return; }
    const r = menu.getBoundingClientRect(), bh = barH();
    bar.classList.toggle('is-on', r.top <= bh + 4 && r.bottom > bh + 200);
  }
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(updateBar); } }, { passive: true });
  const syncBar = () => document.documentElement.style.setProperty('--bar-h', barH() + 'px');
  new ResizeObserver(syncBar).observe(bar); syncBar();
  desktop.addEventListener?.('change', () => { syncBar(); updateBar(); });

  /* Scrollspy de categorías */
  let spy;
  function observeSections() {
    spy?.disconnect();
    spy = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (!en.isIntersecting) return;
        const id = en.target.id.replace('cat-', '');
        $$('.chip', chipsEl).forEach(c => {
          const on = c.dataset.cat === id;
          if (on) { c.setAttribute('aria-current', 'true'); chipsEl.scrollTo({ left: c.offsetLeft - chipsEl.clientWidth / 2 + c.offsetWidth / 2, behavior: smooth() }); }
          else c.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-25% 0px -65% 0px' });
    $$('.cat', sectionsEl).filter(s => !s.hidden).forEach(s => spy.observe(s));
  }

  /* Deslizar a izquierda/derecha para cambiar de pestaña */
  let sx = 0, sy = 0, st = 0, swipeOK = false;
  menu.addEventListener('touchstart', e => {
    const t = e.touches[0]; sx = t.clientX; sy = t.clientY; st = Date.now();
    swipeOK = e.touches.length === 1 && sx > 28 && sx < innerWidth - 12 && !e.target.closest('.rail, .chips');
  }, { passive: true });
  menu.addEventListener('touchend', e => {
    if (!swipeOK) return; swipeOK = false;
    const t = e.changedTouches[0], dx = t.clientX - sx, dy = t.clientY - sy;
    if (Math.abs(dx) > 72 && Math.abs(dy) < 50 && Math.abs(dx) > Math.abs(dy) * 2.2 && Date.now() - st < 700) {
      const next = D.tabs[D.tabs.findIndex(x => x.id === activeTab) + (dx < 0 ? 1 : -1)];
      if (next) setTab(next.id, { scroll: true, dir: dx < 0 ? 1 : -1 });
    }
  }, { passive: true });

  /* ---------- Buscador (hoja a pantalla completa) ---------- */
  const sheet = $('#sheet'), q = $('#q'), body = $('#sheetBody'), clearBtn = $('#qClear'), app = $('#app');
  let opener = null;
  const hints = (D.searchHints || ['Ceviche', 'Encebollado', 'Bolón', 'Café', 'Cerveza', 'Gambas']).map(tr);

  function openSheet(from) {
    opener = from || document.activeElement;
    sheet.inert = false; app.inert = true;
    sheet.classList.add('is-open');
    renderResults();
    setTimeout(() => q.focus({ preventScroll: true }), reduce ? 0 : 120);
  }
  function closeSheet() {
    sheet.classList.remove('is-open'); sheet.inert = true; app.inert = false;
    q.blur(); q.value = ''; clearBtn.hidden = true;
    opener?.focus?.({ preventScroll: true });
  }
  ['dockSearch', 'barSearch'].forEach(id => $('#' + id).addEventListener('click', e => openSheet(e.currentTarget)));
  $('#sheetClose').addEventListener('click', closeSheet);
  clearBtn.addEventListener('click', () => { q.value = ''; clearBtn.hidden = true; renderResults(); q.focus(); });
  q.addEventListener('input', () => { clearBtn.hidden = !q.value; renderResults(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && sheet.classList.contains('is-open')) closeSheet(); });

  const hintChips = () => h('div', { class: 'hints' }, hints.map(t => h('button', { class: 'hint', type: 'button', text: t, onclick: () => { q.value = t; clearBtn.hidden = false; renderResults(); q.focus(); } })));
  const marked = (name, term) => {
    const f = document.createDocumentFragment(), i = norm(name).indexOf(term);
    if (i < 0) { f.append(name); return f; }
    f.append(name.slice(0, i), h('mark', { text: name.slice(i, i + term.length) }), name.slice(i + term.length));
    return f;
  };
  function renderResults() {
    const term = norm(q.value.trim());
    body.replaceChildren();
    if (!term) { body.append(h('p', { class: 'sheet__label', text: tr('Prueba con…') }), hintChips()); return; }
    let total = 0;
    D.categories.forEach(c => {
      const hits = c.items.map((it, i) => ({ it, i })).filter(({ it }) => norm(tr(it.name) + ' ' + it.name + ' ' + tr(it.note || '') + ' ' + (it.note || '')).includes(term));
      if (!hits.length) return;
      total += hits.length;
      body.append(h('section', { class: 'res-group' },
        h('h3', { text: tr(c.title) }),
        hits.map(({ it, i }) => h('button', { class: 'res', type: 'button', onclick: () => jumpToItem(c.id, i) },
          h('span', { class: 'res__name' }, marked(tr(it.name), term)), h('span', { class: 'res__price', text: fmt.format(it.price) })))));
    });
    if (!total) body.append(h('p', { class: 'sheet__empty', text: tr('No encontramos nada con ese nombre.') }), h('p', { class: 'sheet__label', text: tr('Prueba con…') }), hintChips());
  }
  function jumpToItem(catId, idx) {
    const x = catIndex[catId];
    closeSheet();
    if (x.cat.tab !== activeTab) setTab(x.cat.tab, { hash: false });
    requestAnimationFrame(() => requestAnimationFrame(() => {
      const li = x.sec._items[idx]; li.classList.add('in');
      li.scrollIntoView({ behavior: smooth(), block: 'center' });
      li.classList.remove('flash'); void li.offsetWidth; li.classList.add('flash');
      setTimeout(() => li.classList.remove('flash'), 2100);
    }));
  }

  /* ---------- Galería ---------- */
  const mosaic = $('#mosaic');
  D.gallery.forEach((g, i) => {
    const isPhoto = g.kind === 'photo';
    const im = isPhoto ? h('img', { src: g.src, alt: g.label || '', width: g.w, height: g.h, loading: 'lazy', decoding: 'async' }) : img(g.photo);
    mosaic.append(h('figure', { class: 'tile' + (isPhoto ? ' tile--photo' : ''), 'data-tone': g.tone || TONES[i % 3], 'data-reveal': true, style: `--d:${(i % 4) * 90}ms` },
      h('div', { class: 'tile__frame' }, im), g.label ? h('figcaption', { text: tr(g.label) }) : null));
  });

  /* ---------- Pie ---------- */
  const C = R.contact || {}, links = $('#footLinks');
  const add = (label, href) => links.append(h('li', {}, href ? h('a', { href, text: label, target: '_blank', rel: 'noopener' }) : h('span', { text: label })));
  if (C.address) add(C.address, C.mapsUrl);
  if (C.phone) add(C.phone, 'tel:' + C.phone.replace(/\s/g, ''));
  if (C.whatsapp) add('WhatsApp', 'https://wa.me/' + C.whatsapp.replace(/\D/g, ''));
  if (C.instagram) add('@' + C.instagram.replace('@', ''), 'https://instagram.com/' + C.instagram.replace('@', ''));
  if (D.links && D.links.review) add(tr('Deja tu reseña'), D.links.review);
  links.append(h('li', {}, h('a', { href: 'index.html', text: tr('Volver al inicio') })));
  if (window.I18N) links.append(h('li', {}, h('a', { href: '#', text: window.I18N.lang === 'es' ? 'English' : 'Español', onclick: e => { e.preventDefault(); window.I18N.toggle(); } })));
  $('#footNote').textContent = tr(R.note || '');

  /* ---------- Alérgenos: filtro «Tengo alergia a…» ---------- */
  const alSheet = $('#alSheet'), alBody = $('#alBody');
  let alOpener = null;
  try { JSON.parse(sessionStorage.getItem('alerg') || '[]').forEach(id => AL.list.some(a => a.id === id) && selected.add(id)); } catch (_) {}

  function applyFilter() {
    const on = selected.size > 0;
    $$('.item').forEach(li => {
      li.classList.toggle('is-risk', on && Array.isArray(li._al) && li._al.some(x => selected.has(x)));
      li.classList.toggle('is-unk', on && li._al === null);
    });
    $$('.albtn, .chip--al, #barAl').forEach(b => b.classList.toggle('is-on', on));
    const n = $('.albtn__n'); if (n) { n.hidden = !on; n.textContent = selected.size; }
    const chip = $('.chip--al'); if (chip) chip.lastChild.textContent = tr('Alérgenos') + (on ? ' · ' + selected.size : '');
    try { sessionStorage.setItem('alerg', JSON.stringify([...selected])); } catch (_) {}
  }
  function renderAl() {
    const chips = AL.list.map(a => h('button', {
      class: 'al__chip', type: 'button', 'aria-pressed': String(selected.has(a.id)), 'data-id': a.id, text: tr(a.es),
      onclick: e => { selected.has(a.id) ? selected.delete(a.id) : selected.add(a.id); e.currentTarget.setAttribute('aria-pressed', String(selected.has(a.id))); applyFilter(); }
    }));
    alBody.replaceChildren(
      h('p', { class: 'al__intro', text: tr('Marca los alérgenos que debes evitar y te mostraremos qué platos los contienen.') }),
      h('div', { class: 'al__grid' }, chips),
      h('div', { class: 'al__actions' },
        h('button', { class: 'btn btn--solid', type: 'button', text: tr('Ver la carta con el filtro'), onclick: closeAl }),
        h('button', { class: 'btn btn--ghost', type: 'button', text: tr('Borrar selección'), onclick: () => { selected.clear(); chips.forEach(c => c.setAttribute('aria-pressed', 'false')); applyFilter(); } })),
      h('p', { class: 'al__note', text: tr('Información orientativa. Si tienes alguna alergia o intolerancia, díselo siempre al personal antes de pedir.') }));
  }
  function openAl(from) {
    alOpener = from || document.activeElement;
    renderAl();
    alSheet.inert = false; app.inert = true; alSheet.classList.add('is-open');
    setTimeout(() => $('#alClose').focus({ preventScroll: true }), reduce ? 0 : 120);
  }
  function closeAl() {
    alSheet.classList.remove('is-open'); alSheet.inert = true; app.inert = false;
    alOpener?.focus?.({ preventScroll: true });
  }
  $('#alClose').addEventListener('click', closeAl);
  document.addEventListener('click', e => { const b = e.target.closest('#alOpen, #barAl, .chip--al'); if (b) openAl(b); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && alSheet.classList.contains('is-open')) closeAl(); });
  applyFilter();

  /* ---------- Arranque (admite #pestaña o #categoría en la URL) ---------- */
  watch(document);
  const hash = decodeURIComponent(location.hash.slice(1));
  if (D.tabs.some(t => t.id === hash)) setTab(hash, { scroll: true, hash: false });
  else if (catIndex[hash]) { setTab(catIndex[hash].cat.tab, { hash: false }); setTimeout(() => scrollToCat(hash), 350); }
  else setTab(D.defaultTab || D.tabs[0].id, { hash: false });
})();
