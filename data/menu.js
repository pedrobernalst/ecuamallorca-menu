/* ====================================================================
 *  Datos de la carta. Para otro restaurante: cambia este archivo y las
 *  fotos de assets/dishes. Todo lo demás (diseño y lógica) se reutiliza.
 *  Precios en números (8.5 = 8,50 €). Los colores se pueden cambiar en "theme".
 * ==================================================================== */
window.MENU_DATA = {
  restaurant: {"name": "Ecuamallorca", "kind": "Bar · Restaurante", "tagline": "Sabores del Ecuador", "tagline2": "en Mallorca", "intro": "Cocina tradicional ecuatoriana. Mira la carta, elige y disfruta.", "logo": "assets/logo.webp", "logoW": 797, "logoH": 445, "currency": "EUR", "locale": "es-ES", "contact": {"address": "", "phone": "", "whatsapp": "", "instagram": "", "mapsUrl": ""}, "note": "Venta de bebidas alcohólicas prohibida a menores de 18 años."},
  /* Página de inicio (index.html): review = enlace de Google para dejar reseña. Vacío = el botón no aparece. */
  links: {"review": "https://search.google.com/local/writereview?placeid=ChIJK88xGYmTlxIRT3smmCBbbDI"},
  /* Colores: ejemplo  theme: { yellow: "#F6E4A6", blue: "#C4D6EC", red: "#F1BDB7" } */
  defaultTab: "carta",
  theme: {},
  hero: {"dishes": ["encebollado", "ceviche", "tigrillo", "bolones"]},
  marquee: ["Encebollado", "Ceviche", "Bolón", "Tigrillo", "Chaulafán", "Fritada", "Guatita", "Humita", "Corviche", "Patacones", "Chifles", "Menestra"],
  tabs: [{"id": "desayunos", "label": "Desayunos", "icon": "coffee"}, {"id": "carta", "label": "Carta", "icon": "plate"}, {"id": "bebidas", "label": "Bebidas", "icon": "glass"}],
  searchHints: ["Ceviche", "Encebollado", "Bolón", "Café", "Cerveza", "Gambas"],
  /* Platos destacados (tone: yellow | blue | red). "cat" = categoría a la que lleva. */
  featured: [
    {"name": "Encebollado", "price": 13, "desc": "Sopa de pescado con yuca y cebolla encurtida. El clásico ecuatoriano.", "photo": "encebollado", "tone": "yellow", "cat": "encebollados", "from": true},
    {"name": "Ceviche Mixto", "price": 17, "desc": "Pescado y camarones, fresco y con limón.", "photo": "ceviche", "tone": "blue", "cat": "ceviches"},
    {"name": "Chaulafán", "price": 15, "desc": "Arroz salteado al estilo ecuatoriano.", "photo": "chaulafan", "tone": "red", "cat": "especialidades"},
    {"name": "Bolón Especial Nelly's", "price": 15, "desc": "Bolones de verde, el especial de la casa.", "photo": "bolones", "tone": "yellow", "cat": "desayunos"},
    {"name": "Tigrillo + Bistec y Huevo", "price": 15, "desc": "Para empezar el día con fuerza.", "photo": "tigrillo", "tone": "blue", "cat": "desayunos"},
  ],
  /* Galería. Para añadir fotos reales: { src: "assets/gallery/foto.jpg", label: "Texto", w: 1200, h: 800, kind: "photo" } */
  gallery: [
    {"photo": "encebollado", "label": "Encebollado", "tone": "yellow"},
    {"photo": "ceviche", "label": "Ceviche", "tone": "blue"},
    {"photo": "bolones", "label": "Bolones", "tone": "red"},
    {"photo": "caldo", "label": "Caldo", "tone": "yellow"},
    {"photo": "tigrillo", "label": "Tigrillo", "tone": "blue"},
    {"photo": "chaulafan", "label": "Chaulafán", "tone": "red"},
    {"photo": "ensalada", "label": "Ensalada de aguacate", "tone": "yellow"},
    {"photo": "chifles", "label": "Chifles", "tone": "blue"},
  ],
  /* Fotos recortadas del PDF original (clave: archivo, tamaño y texto alternativo). */
  photos: {
    "bolones": {"src": "assets/dishes/bolones.webp", "w": 626, "h": 400, "alt": "Bolones de verde"},
    "tigrillo": {"src": "assets/dishes/tigrillo.webp", "w": 849, "h": 516, "alt": "Plato con arroz, huevo frito y carne guisada"},
    "cafe-solo": {"src": "assets/dishes/cafe-solo.webp", "w": 760, "h": 722, "alt": "Taza de café solo"},
    "cafe-latte": {"src": "assets/dishes/cafe-latte.webp", "w": 760, "h": 671, "alt": "Café con leche con arte latte"},
    "ensalada": {"src": "assets/dishes/ensalada.webp", "w": 596, "h": 583, "alt": "Ensalada con aguacate y tomate"},
    "chifles": {"src": "assets/dishes/chifles.webp", "w": 720, "h": 531, "alt": "Chifles de plátano verde"},
    "arroz": {"src": "assets/dishes/arroz.webp", "w": 760, "h": 362, "alt": "Porción de arroz blanco"},
    "encebollado": {"src": "assets/dishes/encebollado.webp", "w": 1000, "h": 588, "alt": "Encebollado ecuatoriano"},
    "ceviche": {"src": "assets/dishes/ceviche.webp", "w": 1000, "h": 732, "alt": "Ceviche mixto con camarones"},
    "caldo": {"src": "assets/dishes/caldo.webp", "w": 718, "h": 581, "alt": "Caldo ecuatoriano"},
    "chaulafan": {"src": "assets/dishes/chaulafan.webp", "w": 529, "h": 536, "alt": "Chaulafán con carne y camarones"},
    "menestra-pollo": {"src": "assets/dishes/menestra-pollo.webp", "w": 230, "h": 138, "alt": "Arroz con menestra y pollo"},
    "menestra-carne": {"src": "assets/dishes/menestra-carne.webp", "w": 254, "h": 123, "alt": "Arroz con menestra y carne"},
    "patacones-carne": {"src": "assets/dishes/patacones-carne.webp", "w": 213, "h": 212, "alt": "Patacones con carne"},
    "mariscos": {"src": "assets/dishes/mariscos.webp", "w": 280, "h": 169, "alt": "Mariscos fritos con cebolla encurtida"},
    "inca-kola": {"src": "assets/dishes/inca-kola.webp", "w": 412, "h": 610, "alt": "Botellas de Kola Inca"},
    "fanta": {"src": "assets/dishes/fanta.webp", "w": 181, "h": 202, "alt": "Refrescos Fanta"},
    "batidos": {"src": "assets/dishes/batidos.webp", "w": 864, "h": 428, "alt": "Zumos y batidos de frutas"},
    "agua": {"src": "assets/dishes/agua.webp", "w": 66, "h": 194, "alt": "Botella de agua"},
    "cubo-galicia": {"src": "assets/dishes/cubo-galicia.webp", "w": 151, "h": 185, "alt": "Cubo de cervezas Estrella Galicia"},
    "cubo-heineken": {"src": "assets/dishes/cubo-heineken.webp", "w": 446, "h": 642, "alt": "Cubo de cervezas Heineken"},
    "vino": {"src": "assets/dishes/vino.webp", "w": 585, "h": 538, "alt": "Copa y botella de vino tinto"},
    "cocteles": {"src": "assets/dishes/cocteles.webp", "w": 812, "h": 506, "alt": "Cócteles de la casa"},
    "trago": {"src": "assets/dishes/trago.webp", "w": 101, "h": 134, "alt": "Trago con rodaja de naranja"},
    "baileys": {"src": "assets/dishes/baileys.webp", "w": 366, "h": 776, "alt": "Baileys con café"},
    "chupitos": {"src": "assets/dishes/chupitos.webp", "w": 629, "h": 320, "alt": "Chupitos"},
    "aguardiente": {"src": "assets/dishes/aguardiente.webp", "w": 402, "h": 542, "alt": "Botella de aguardiente"},
  },
  /* Categorías y platos. tab = pestaña (desayunos | carta | bebidas). */
  categories: [
    {
      "id": "desayunos", "tab": "desayunos", "title": "Desayunos", "photos": ["bolones", "tigrillo"],
      items: [
        {"name": "Bolón de Queso", "price": 8},
        {"name": "Bolón de Chicharrón", "price": 8},
        {"name": "Bolón Mixto", "price": 9},
        {"name": "Bolón Especial Nelly's", "price": 15},
        {"name": "Tigrillo", "price": 9},
        {"name": "Tortilla de Verde con Queso", "price": 8.5},
        {"name": "Tortilla de Camarón", "price": 9},
        {"name": "Tigrillo + Bistec y Huevo", "price": 15},
        {"name": "Corviche", "price": 5},
        {"name": "Humita", "price": 5},
        {"name": "Tortilla", "price": 5},
        {"name": "Fritada", "price": 16},
        {"name": "Lomito Salteado", "price": 14},
      ]
    },
    {
      "id": "cafes", "tab": "desayunos", "title": "Cafés", "photos": ["cafe-solo", "cafe-latte"],
      items: [
        {"name": "Café Solo", "price": 1.2},
        {"name": "Cortado", "price": 1.5},
        {"name": "Café con Leche", "price": 1.5},
        {"name": "Infusión", "price": 1.5},
        {"name": "Carajillo Baileys", "price": 3.5},
        {"name": "Chocolate Caliente", "price": 2},
        {"name": "Leche Caliente", "price": 1},
        {"name": "Carajillo Terry", "price": 2},
        {"name": "Carajillo Ballantines", "price": 2},
        {"name": "Café Americano", "price": 1.5},
        {"name": "Café Rom", "price": 2},
      ]
    },
    {
      "id": "entradas", "tab": "carta", "title": "Entradas", "photos": ["chifles", "arroz"],
      items: [
        {"name": "Porción de Chifle", "price": 2.5},
        {"name": "Porción de Arroz", "price": 2.5},
        {"name": "Patacón con Queso", "price": 9},
        {"name": "Porción de Maduro", "price": 8},
        {"name": "Papipollo", "price": 11},
        {"name": "Patata", "price": 3},
        {"name": "Huevo", "price": 1},
        {"name": "Patacones Solo", "price": 5},
        {"name": "Maduro con Queso", "price": 9},
      ]
    },
    {
      "id": "ensaladas", "tab": "carta", "title": "Ensaladas", "photos": ["ensalada"],
      items: [
        {"name": "Ensalada con Aguacate", "price": 5},
      ]
    },
    {
      "id": "encebollados", "tab": "carta", "title": "Encebollados", "photos": ["encebollado"],
      items: [
        {"name": "Encebollado Pequeño", "price": 13},
        {"name": "Encebollado Grande", "price": 15},
        {"name": "Encebollado Mixto Pequeño", "price": 14},
        {"name": "Encebollado Mixto Grande", "price": 17},
      ]
    },
    {
      "id": "ceviches", "tab": "carta", "title": "Ceviches", "photos": ["ceviche"],
      items: [
        {"name": "Ceviche de Pescado", "price": 16},
        {"name": "Ceviche de Gambas", "price": 16},
        {"name": "Ceviche Mixto (Pescado y Camarones)", "price": 17},
        {"name": "Ceviche de Concha Mixto con Camarón", "price": 18},
      ]
    },
    {
      "id": "especialidades", "tab": "carta", "title": "Especialidades", "photos": ["chaulafan"],
      items: [
        {"name": "Chaulafán", "price": 15},
        {"name": "Bandeja Mar y Tierra", "price": 21},
        {"name": "Guatita Tradicional", "price": 16},
        {"name": "Lomito Salteado", "price": 15},
        {"name": "Churrasco Frito / Bistec", "price": 15},
        {"name": "Bistec de Ternera", "price": 15},
        {"name": "Fritada", "price": 16},
      ]
    },
    {
      "id": "arroces-menestra", "tab": "carta", "title": "Arroces con Menestra", "photos": ["menestra-pollo", "menestra-carne"],
      items: [
        {"name": "Arroz con Menestra y Carne", "price": 15},
        {"name": "Arroz con Menestra y Chuleta", "price": 15},
        {"name": "Arroz con Menestra y Pollo", "price": 15},
      ]
    },
    {
      "id": "delicias-del-mar", "tab": "carta", "title": "Delicias del Mar", "photos": ["mariscos"],
      items: [
        {"name": "Arroz con Gambas", "price": 15},
        {"name": "Dorada Frita", "price": 21},
        {"name": "Gambas Rebozadas", "price": 15},
        {"name": "Gambas Salteadas", "price": 16},
        {"name": "Chicharrón de Pescado", "price": 17},
      ]
    },
    {
      "id": "antojos", "tab": "carta", "title": "Para Compartir Antojos", "photos": ["patacones-carne"],
      items: [
        {"name": "Picada de la Casa", "price": 21},
        {"name": "Patacones con Carne", "price": 15},
        {"name": "Salchipapas", "price": 10},
        {"name": "Papipollo", "price": 11},
      ]
    },
    {
      "id": "refrescos", "tab": "bebidas", "title": "Refrescos", "photos": ["inca-kola", "fanta"],
      items: [
        {"name": "Coca-Cola", "price": 2.5},
        {"name": "Sprite", "price": 2.5},
        {"name": "Fanta Naranja", "price": 2.5},
        {"name": "Fanta Limón", "price": 2.5},
        {"name": "Nestea", "price": 2.5},
        {"name": "Aquarius", "price": 2.5},
        {"name": "Tónica", "price": 2.5},
        {"name": "Casera", "price": 2.5},
        {"name": "Pony Malta", "price": 3},
        {"name": "Tropical Pequeña", "price": 2.5},
        {"name": "Kola Inca Pequeña", "price": 2.5},
        {"name": "Manzana Pequeña", "price": 2.5},
        {"name": "Coca-Cola (2L)", "price": 5},
        {"name": "Tropical (2L)", "price": 7},
        {"name": "Kola Inca (2L)", "price": 7},
        {"name": "Manzana (2L)", "price": 7},
      ]
    },
    {
      "id": "zumos-batidos", "tab": "bebidas", "title": "Zumos y Batidos", "photos": ["batidos"],
      items: [
        {"name": "Batido de Frutas con Agua", "price": 6},
        {"name": "Batido de Frutas con Leche", "price": 6},
        {"name": "Zumo de Piña", "price": 2.5},
        {"name": "Zumo de Melocotón", "price": 2.5},
        {"name": "Laccao", "price": 2.5},
        {"name": "Quaker", "price": 2.5},
        {"name": "Quaker Grande", "price": 2.5},
        {"name": "Jarra de Quaker", "price": 6},
      ]
    },
    {
      "id": "aguas", "tab": "bebidas", "title": "Aguas y Energizantes", "photos": ["agua"],
      items: [
        {"name": "Agua Pequeña", "price": 2},
        {"name": "Agua Grande", "price": 2.5},
        {"name": "Agua con Gas", "price": 2.5},
        {"name": "Red Bull", "price": 2.5},
      ]
    },
    {
      "id": "cervezas", "tab": "bebidas", "title": "Cervezas", "photos": ["cubo-heineken", "cubo-galicia"],
      items: [
        {"name": "Caña Pequeña", "price": 2.5},
        {"name": "Caña Grande", "price": 3.5},
        {"name": "Shandy", "price": 2.5},
        {"name": "Pilsener", "price": 3},
        {"name": "Estrella Galicia", "price": 3},
        {"name": "Estrella Damm", "price": 3},
        {"name": "Mahón", "price": 2.5},
        {"name": "Corona", "price": 3},
        {"name": "Heineken", "price": 2.5},
        {"name": "Budweiser", "price": 3},
        {"name": "Jarra de Cerveza (1 Litro)", "price": 6},
        {"name": "Estrella Damm", "price": 10},
        {"name": "Budweiser", "price": 13},
        {"name": "Cubo Estrella Galicia (5 unidades)", "price": 15},
        {"name": "Cubo Heineken (6 unidades)", "price": 12},
        {"name": "Cubo Budweiser (6 unidades)", "price": 15},
      ]
    },
    {
      "id": "vinos", "tab": "bebidas", "title": "Vinos", "photos": ["vino"],
      items: [
        {"name": "Copa", "price": 5},
        {"name": "Botella", "price": 15},
      ]
    },
    {
      "id": "cocteles", "tab": "bebidas", "title": "Cócteles de la Casa", "photos": ["cocteles"],
      items: [
        {"name": "Gin Tonic", "price": 8},
        {"name": "Puerto de Indias", "price": 8},
        {"name": "Ron Cola", "price": 8},
        {"name": "Combinados", "price": 8},
        {"name": "Ballantine's Solo", "price": 3.5},
        {"name": "Hierbas en Copa", "price": 5},
        {"name": "Hierbas Mixtas", "price": 2},
        {"name": "Sombrero Mexicano", "price": 3},
      ]
    },
    {
      "id": "copas-tragos", "tab": "bebidas", "title": "Copas y Tragos", "photos": ["trago", "baileys"],
      items: [
        {"name": "Trago Johnnie Walker Negro", "price": 9},
        {"name": "Trago de Chivas Regal", "price": 7},
        {"name": "Copa de Ballantine's", "price": 8},
        {"name": "Copa / Trago de Baileys", "price": 4},
      ]
    },
    {
      "id": "para-compartir", "tab": "bebidas", "title": "Para Compartir", "kicker": "Botellas", "photos": ["aguardiente"],
      items: [
        {"name": "Botella Johnnie Walker Negro", "price": 70},
        {"name": "Botella de Chivas Regal", "price": 50},
        {"name": "Botella de Ballantine's", "price": 35},
        {"name": "Botella Ron Barceló", "price": 40},
        {"name": "Botella de Aguardiente pequeña", "price": 40},
        {"name": "Botella de Aguardiente grande", "price": 60},
      ]
    },
    {
      "id": "chupitos", "tab": "bebidas", "title": "Chupitos", "photos": ["chupitos"],
      items: [
        {"name": "Chupito de Tequila", "price": 3.5},
        {"name": "Chupito de Aguardiente", "price": 3},
        {"name": "Chupito de Chivas Regal", "price": 3.5},
        {"name": "Chupito de Ballantine's", "price": 4},
        {"name": "Chupito de Baileys", "price": 3},
      ]
    },
  ],
};
