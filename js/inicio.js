/* ==========================================================================
   Página de inicio · lógica mínima
   Lee window.MENU_DATA (data/menu.js): textos, colores, logo, platos y el
   enlace de reseña. Sin dependencias ni build.
   ========================================================================== */
(() => {
  'use strict';
  const D = window.MENU_DATA;
  if (!D) return;
  const R = D.restaurant || {};
  const $ = s => document.querySelector(s);

  /* Tema y textos */
  Object.entries(D.theme || {}).forEach(([k, v]) => document.documentElement.style.setProperty('--' + k, v));
  if (R.name) document.title = `${R.name} · ${R.kind || 'Carta digital'}`;
  document.querySelectorAll('[data-bind]').forEach(el => {
    const v = el.dataset.bind.split('.').reduce((o, k) => o?.[k], D);
    if (v != null) el.textContent = v;
  });
  const logo = $('#logo');
  if (logo && R.logo) { logo.src = R.logo; logo.alt = `${R.name} ${R.kind || ''}`.trim(); }
  const fav = $('link[rel=icon]'); if (fav && R.logo) fav.href = R.logo;

  /* Botón de reseña: solo aparece si hay enlace */
  const btn = $('#reviewBtn');
  const review = D.links && D.links.review;
  if (btn) {
    if (review) { btn.href = review; btn.hidden = false; }
    else btn.remove();
  }

  /* Platos flotantes (decoración): los mismos de la portada de la carta */
  const box = $('#dishes');
  const keys = (D.hero && D.hero.dishes) || [];
  if (box) keys.slice(0, 4).forEach(k => {
    const p = D.photos && D.photos[k];
    if (!p) return;
    const wrap = document.createElement('div'); wrap.className = 'dish';
    const im = document.createElement('img');
    im.src = p.src; im.alt = ''; im.width = p.w; im.height = p.h; im.decoding = 'async';
    wrap.append(im); box.append(wrap);
  });
})();
