# Carta digital · plantilla para tarjetas NFC

Web estática (HTML + CSS + JS, sin build ni dependencias) que muestra la carta de un restaurante
con diseño minimalista en pastel. Pensada para que **cada restaurante sea un repositorio**
y la tarjeta NFC apunte a su URL.

**Diseño mobile-first**: el cliente llega desde el móvil, sentado a la mesa. Por eso:
portada corta (la carta se ve casi de inmediato), barra inferior al alcance del pulgar
(Desayunos · Carta · Bebidas · Buscar), atajos con foto a cada categoría, buscador a pantalla
completa que salta directo al plato, y deslizar a izquierda/derecha para cambiar de pestaña.
En escritorio y tablet grande se adapta a una vista más amplia.

## Cómo se ve al tocar la tarjeta

1. **Inicio** (`index.html`): logo del restaurante y dos botones grandes — **Menú** (abre la carta) y
   **Deja tu reseña** (abre Google para escribirla).
2. **Carta** (`carta.html`): la carta digital completa. Al final tiene los enlaces «Deja tu reseña» y «Volver al inicio».

La tarjeta NFC lleva la dirección principal (`https://USUARIO.github.io/REPO/`) → abre el Inicio.

## Estructura

```
index.html        página de inicio (logo + botones)          css/inicio.css · js/inicio.js
carta.html        la carta digital                           css/style.css  · js/app.js
data/menu.js      ← TODO el contenido: nombre, categorías, platos, precios, fotos, enlace de reseña
assets/logo.webp  logo del restaurante
assets/dishes/    fotos recortadas (WebP con fondo transparente)
assets/fonts/     tipografías (autoalojadas)
```

## Publicar gratis con GitHub Pages

1. Crea un repositorio (por ejemplo `ecuamallorca-menu`) y sube todo el contenido de esta carpeta.
2. En GitHub: **Settings → Pages → Deploy from a branch → `main` / `(root)` → Save**.
3. En 1–2 minutos estará en `https://TU_USUARIO.github.io/ecuamallorca-menu/`.
4. Graba esa URL en la tarjeta con una app como *NFC Tools* (**Escribir → Añadir registro → URL**).
   Tarjetas NTAG213/215 funcionan perfecto en iPhone y Android.

## Enlace de reseña de Google

En `data/menu.js`, campo `links.review`:

```js
links: {"review": "https://search.google.com/local/writereview?placeid=TU_PLACE_ID"},
```

El `placeid` es el identificador del negocio en Google Maps. Si dejas `review` vacío (`""`), el botón no aparece.
(Alternativa: el enlace corto `g.page/r/…/review` que da el Perfil de Empresa de Google en «Pedir reseñas».)

## Enlaces directos (una tarjeta por zona)

- `…/carta.html#bebidas` abre directo la pestaña de bebidas (útil para la barra).
- `…/carta.html#carta` · `…/carta.html#desayunos`
- `…/carta.html#ceviches`, `…/carta.html#cervezas`, etc. (cualquier `id` de categoría de `menu.js`) bajan a esa categoría.
- Si alguien abre `…/#bebidas` (formato antiguo), el Inicio lo redirige solo a la carta.

## Qué se ve primero (en `data/menu.js`)

- `defaultTab`: pestaña con la que abre la tarjeta (`"carta"`, `"bebidas"`, `"desayunos"`).
- `featured`: «los clásicos» (carrusel con foto bajo la portada). Cada uno lleva `photo`, `tone`
  (`yellow | blue | red`) y `cat` (la categoría a la que baja al tocarlo).
- `searchHints`: sugerencias que aparecen al abrir el buscador.
- `tabs`: nombre e icono de cada pestaña de la barra inferior.

## Cambiar precios o platos

Edita `data/menu.js`. Los precios son números (`8.5` → «8,50 €»). Cada plato admite una nota opcional:
`{ "name": "Encebollado", "price": 13, "note": "Con yuca" }`.

## Hacer otro restaurante

1. Duplica el repositorio (botón **Use this template** o *fork*).
2. Cambia `data/menu.js` (nombre, categorías, platos, `links.review`), `assets/logo.webp` y las fotos de `assets/dishes/`.
3. Ajusta los colores en `data/menu.js → theme`, por ejemplo:
   `theme: { yellow: "#F6E4A6", blue: "#C4D6EC", red: "#F1BDB7" }`.
4. Rellena `restaurant.contact` (dirección, teléfono, WhatsApp, Instagram) y aparecerán en el pie.

## Añadir fotos reales a la galería

Copia la foto a `assets/gallery/` y añade en `gallery` de `menu.js`:
`{ kind: "photo", src: "assets/gallery/ceviche.jpg", label: "Ceviche", w: 1200, h: 800 }`
(mejor en JPG/WebP de unos 1200 px de ancho).

## Para ver en local

Abre `index.html` (inicio) o `carta.html` con doble clic. Funciona sin servidor.
Para probar la vista móvil: en Chrome, F12 → icono de móvil (Ctrl+Shift+M).

## Idiomas y alérgenos (v4)

- **Idiomas ES/EN**: se detecta por el navegador (es/ca/gl/eu → español, resto → inglés) y se puede cambiar con el botón ES|EN. Enlace forzado: `carta.html?lang=en`.
- Las traducciones están en `data/en.js` (clave = texto en español). Si falta una, se muestra el español. HTML marcado con `data-t` / `data-ta`.
- **Alérgenos**: `data/alergenos.js` (14 alérgenos UE + asignación por plato). Cada plato muestra "Contiene: …" y el botón *Alérgenos* filtra/resalta platos.
- ⚠️ La asignación es **estimada** (sin recetas). El restaurante debe revisarla con `revision-alergenos-ecuamallorca.md` antes de darla por buena. `null` = "consultar al personal".
