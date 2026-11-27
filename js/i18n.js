/* ==========================================================================
   Idiomas (español / inglés)
   · El texto base de la carta está en español; data/en.js traduce al inglés
     usando el texto en español como clave. Lo que no esté traducido se ve en español.
   · Idioma inicial: ?lang=en|es en la URL → el guardado → el del móvil
     (español si es español/catalán/gallego/vasco; inglés para el resto, pensando en turistas).
   · El botón ES | EN guarda la elección y recarga la página.
   ========================================================================== */
(() => {
  'use strict';
  const KEY = 'lang';
  const store = {
    get() { try { return localStorage.getItem(KEY); } catch (_) { return null; } },
    set(v) { try { localStorage.setItem(KEY, v); } catch (_) {} }
  };
  const fromUrl = (new URLSearchParams(location.search).get('lang') || '').toLowerCase();
  const ok = v => v === 'es' || v === 'en';
  const nav = (navigator.languages && navigator.languages[0]) || navigator.language || 'es';
  let lang = ok(fromUrl) ? fromUrl : ok(store.get()) ? store.get() : /^(es|ca|gl|eu)/i.test(nav) ? 'es' : 'en';
  if (ok(fromUrl)) store.set(fromUrl);
  document.documentElement.lang = lang;

  const EN = window.EN || {};
  const tr = s => (lang === 'en' && s != null && EN[s] != null ? EN[s] : s);

  function toggle() { store.set(lang === 'es' ? 'en' : 'es'); location.reload(); }

  function apply(root = document) {
    root.querySelectorAll('[data-t]').forEach(el => { el.textContent = tr(el.textContent.trim()); });
    root.querySelectorAll('[data-ta]').forEach(el => el.dataset.ta.split(',').forEach(a => {
      const v = el.getAttribute(a.trim()); if (v) el.setAttribute(a.trim(), tr(v));
    }));
  }

  function mountSwitch() {
    const b = document.createElement('button');
    b.type = 'button'; b.className = 'lang';
    b.setAttribute('aria-label', lang === 'es' ? 'Switch to English' : 'Cambiar a español');
    b.innerHTML = `<span${lang === 'es' ? ' class="on"' : ''}>ES</span><span${lang === 'en' ? ' class="on"' : ''}>EN</span>`;
    b.addEventListener('click', toggle);
    document.body.prepend(b);
  }

  window.I18N = { lang, tr, toggle, apply };
  apply();
  mountSwitch();
})();
