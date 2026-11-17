// ─────────────────────────────────────────────────────────────────────────────
// DATOS DEL JUGADOR · Kit neón
// Es el único archivo que hay que editar para adaptar las 32 previews a otro
// jugador (más las fotos de img/). Los textos de los HTML usan {{campo}} y las
// listas se arman desde acá. El ejemplo cargado es el de Héctor Fertoli.
// ─────────────────────────────────────────────────────────────────────────────
window.P = {
  // Identidad
  first: 'Héctor', last: 'Fertoli', full: 'Héctor Fertoli', initials: 'HF',
  number: '8', number2: '08',
  position: 'Mediocampista', positionDetail: 'volante interno',
  nationality: 'Argentina', natCode: 'ARG', flag: 'img/bandera.webp',
  birthPlace: 'El Trébol', birthPlaceShort: 'El Trébol, ARG', birthRegion: 'Santa Fe',
  foot: 'Derecho', age: '31', birthDate: '03/12/1994', height: '1.74', weight: '67',

  // Club actual
  club: 'Universitario', clubFull: 'Universitario de Deportes', clubCountry: 'Perú', clubCountryCode: 'PER',
  crest: 'img/escudo-actual.webp',          // escudo grande (hero, footer)
  loanFrom: 'Racing Club',                   // '' si no está a préstamo
  league: 'Liga 1 · Perú',

  // Textos
  bio: "Volante de El Trébol, Santa Fe. Pasó por Newell's, San Lorenzo, Racing, Talleres, Huracán y Tigre. Hoy juega en Universitario de Lima.",
  statsHook: 'La cifra que lo define: titular fijo en el mediocampo de Universitario.',
  zoneText: 'Se mueve como <b>volante interno</b>, alrededor del círculo central, con llegada al área rival.',
  dossierLead: 'hoy es pieza fija de',     // Estadísticas 4: "…hace 31 años y {dossierLead} <club>"
  instagram: { user: 'rayofertoli', h: '@rayofertoli', u: 'https://www.instagram.com/rayofertoli/' },
  year: '2026', seasonLabel: '2025 / 2026', seasonShort: '2025/26',

  // Fotos (en img/)
  photos: {
    heroBack: 'img/recorte-espalda.webp',  // Hero 1: recorte PNG/WebP de espaldas con el dorsal
    heroBall: 'img/recorte-pelota.webp',   // Hero 2: recorte con la pelota
    heroFront: 'img/recorte-frente.webp',  // Hero 3: recorte de frente
    heroWide: 'img/hero-ancho.webp',       // Hero 4: foto de cancha a todo el ancho
    heroWideBlur: 'img/hero-ancho-blur.webp',
    contact: 'img/g16.webp',               // Contacto 2: foto de cierre
    press: 'img/g13.webp',                 // Prensa 3: fondo de la nota destacada
  },
  alts: {
    heroBack: 'Héctor Fertoli de espaldas con la camiseta 8 de Universitario',
    heroBall: 'Héctor Fertoli conduciendo la pelota con la camiseta de Universitario',
    heroFront: 'Héctor Fertoli con la camiseta de Universitario',
    heroWide: 'Héctor Fertoli conduce la pelota con la camiseta 8 de Universitario',
    contact: 'Héctor Fertoli con un trofeo de jugador del partido',
  },

  // Partidos (Hero 3 y 4). En React salen de useMatches / el panel /admin.
  lastMatch: { home: 'TAL', away: 'BOC', homeName: 'Talleres', awayName: 'Boca Juniors', hs: '2', as: '1', date: '08 JUN', note: 'Final' },
  nextMatch: { home: 'RIV', away: 'TAL', homeName: 'River Plate', awayName: 'Talleres', date: '22 JUN', venue: 'Monumental' },

  // Temporada: k = clave, l = rótulo, v = valor. hl marca el número destacado.
  season: [
    { k: 'pj', l: 'Partidos', ll: 'Partidos jugados', v: '49' },
    { k: 'goles', l: 'Goles', v: '2' },
    { k: 'pases', l: 'Pases completos', ls: 'Pases', v: '444' },
    { k: 'tiros', l: 'Tiros al arco', v: '11' },
    { k: 'min', l: 'Minutos', v: "1,480'" },
    { k: 'val', l: 'Valoración', ll: 'Valoración promedio', v: '8.5', hl: true },
  ],
  // Atributos 0-100 (radar, barras y ranking)
  attrs: [['Velocidad', 90], ['Remate', 84], ['Regate', 88], ['Pases', 91], ['Presión alta', 85], ['Visión de juego', 89]],

  // Clubes, del más reciente al más antiguo.
  // cur = club actual, own = dueño del pase, i = vínculo (Préstamo / Pase), t = títulos
  clubs: [
    { n: 'Universitario', c: 'Perú', y: '2026 — Act.', l: 'img/esc_univ.webp', t: [], i: 'Préstamo', cur: true, y0: 2026 },
    { n: 'C.A. Tigre', c: 'Argentina', y: '2025', l: 'img/esc_tigre.webp', t: [], i: 'Préstamo', y0: 2025 },
    { n: 'C.A. Huracán', c: 'Argentina', y: '2023 — 2024', l: 'img/esc_huracan.webp', t: [], i: 'Préstamo', y0: 2023 },
    { n: 'Talleres de Córdoba', c: 'Argentina', y: '2021 — 2022', l: 'img/esc_talleres.webp', t: [], i: 'Préstamo', y0: 2021 },
    { n: 'Racing Club', c: 'Argentina', y: '2020 — Act.', l: 'img/esc_racing.webp', t: ['Supercopa Internacional 2023'], i: '', own: true, y0: 2020 },
    { n: 'San Lorenzo', c: 'Argentina', y: '2019', l: 'img/esc_sanlorenzo.webp', t: [], i: '', y0: 2019 },
    { n: "Newell's Old Boys", c: 'Argentina', y: '2014', l: 'img/esc_newells.webp', t: [], i: '', y0: 2014 },
  ],

  // Videos (reels de Instagram: ig = código del reel)
  videos: [
    { t: "Highlight '26", f: "Jugadas destacadas '26", club: 'Universitario', lg: 'Liga 1 · Perú', yr: '26', img: 'img/v8.webp', crest: 'img/esc_univ.webp', ig: 'DYqG3t8xDzY' },
    { t: "Highlight Tigre '25", f: "Jugadas destacadas '25", club: 'C.A. Tigre', lg: 'Liga Argentina', yr: '25', img: 'img/v15.webp', crest: 'img/esc_tigre.webp', ig: 'DKQcYIht3oD' },
    { t: "Highlight Huracán '24", f: 'Asistencias y juego', club: 'C.A. Huracán', lg: 'Liga Argentina 2024', yr: '24', img: 'img/v21.webp', crest: 'img/esc_huracan.webp', ig: 'DEYUrsoy4L_' },
  ],

  // Galería. c: 'u' = club actual, 'c' = clubes anteriores. a = texto alternativo.
  galleryCats: [['all', 'Todas'], ['u', 'Universitario'], ['c', 'Clubes anteriores']],
  gallery: [
    { s: 'img/g1.webp', c: 'u', a: 'Conduce la pelota en el área con Universitario' },
    { s: 'img/g2.webp', c: 'u', a: 'Remate de media distancia con Universitario' },
    { s: 'img/g3.webp', c: 'u', a: 'Control orientado con la camiseta granate' },
    { s: 'img/g4.webp', c: 'u', a: 'Duelo en ataque con la camiseta blanca de Universitario' },
    { s: 'img/g5.webp', c: 'u', a: 'De espaldas con el 8 de Universitario' },
    { s: 'img/g6.webp', c: 'u', a: 'Avanza con la pelota junto a un compañero' },
    { s: 'img/g7.webp', c: 'u', a: 'Disputa la pelota con la camiseta negra' },
    { s: 'img/g8.webp', c: 'u', a: 'Encara a un rival con la camiseta negra' },
    { s: 'img/g9.webp', c: 'u', a: 'Pisa la pelota ante la marca' },
    { s: 'img/g10.webp', c: 'u', a: 'Gana la posición entre dos rivales' },
    { s: 'img/g11.webp', c: 'u', a: 'Conduce en velocidad con la camiseta blanca' },
    { s: 'img/g12.webp', c: 'u', a: 'Se escapa de la marca por la banda' },
    { s: 'img/g13.webp', c: 'u', a: 'Retrato con la campera de Universitario' },
    { s: 'img/g14.webp', c: 'u', a: 'De espaldas con el 8 en el campo' },
    { s: 'img/g15.webp', c: 'c', a: 'Conduce la pelota en un club anterior' },
    { s: 'img/g16.webp', c: 'c', a: 'Posa con un trofeo de jugador del partido' },
    { s: 'img/g17.webp', c: 'c', a: 'Festeja con un compañero' },
    { s: 'img/g18.webp', c: 'c', a: 'Celebra un gol con sus compañeros' },
    { s: 'img/g19.webp', c: 'u', a: 'Llegada al estadio con un niño en brazos' },
    { s: 'img/g20.webp', c: 'u', a: 'Llegada al estadio con el plantel de Universitario' },
    { s: 'img/g21.webp', c: 'c', a: 'Conduce la pelota con la camiseta de Huracán' },
    { s: 'img/g22.webp', c: 'c', a: 'Con la Supercopa Internacional de Racing' },
  ],

  // Prensa: textos de ejemplo. Reemplazar por medio, titular, fecha, bajada y link reales.
  press: [
    { logo: 'img/press_logo1.webp', medio: 'ESPN', t: 'Titular de la nota de ejemplo sobre su llegada al club', d: 'Fecha', x: 'Bajada de ejemplo: acá va una línea que resume la nota.', u: '#' },
    { logo: 'img/press_logo2.webp', medio: 'Infobae', t: 'Titular de ejemplo sobre su rendimiento en la temporada', d: 'Fecha', x: 'Bajada de ejemplo: acá va una línea que resume la nota.', u: '#' },
    { logo: 'img/press_logo3.webp', medio: 'CONMEBOL Libertadores', t: 'Titular de ejemplo sobre su paso por la copa', d: 'Fecha', x: 'Bajada de ejemplo: acá va una línea que resume la nota.', u: '#' },
  ],

  // Contacto
  social: [
    { l: 'Instagram', h: '@rayofertoli', u: 'https://www.instagram.com/rayofertoli/' },
    { l: 'Transfermarkt', h: '/hector-fertoli', u: 'https://www.transfermarkt.com.ar/hector-fertoli/profil/spieler/424024' },
  ],
  reps: [
    { role: 'Representante deportivo', n: 'Moon Sports Group', h: '@moonsportsgroup_', u: 'https://www.instagram.com/moonsportsgroup_/', img: 'img/moon.webp', for: 'Clubes y transferencias' },
    { role: 'Contacto de marketing', n: 'LED Sports Marketing', h: '@_ledsports', u: 'https://www.instagram.com/_ledsports/', img: 'img/led.webp', for: 'Marcas y acciones comerciales' },
  ],

  // Links del menú (Footer 2)
  nav: [['Home', '#hero'], ['Estadísticas', '#estadisticas'], ['Videos', '#videos'], ['Galería', '#galeria'], ['Prensa', '#press'], ['Contacto', '#contact']],
};

// Alias que usan los HTML (no editar)
(function (P) {
  const by = k => P.season.find(s => s.k === k) || { v: '', l: '' };
  P.s = Object.fromEntries(P.season.map(s => [s.k, s.v]));
  P.mainStat = P.season[0];
  P.clubCount = P.clubs.length;
  P.loanText = P.loanFrom ? ', a préstamo de ' + P.loanFrom : '';
  P.media = Math.round(P.attrs.reduce((a, [, v]) => a + v, 0) / P.attrs.length);
  window.CLUBS = P.clubs; window.VIDS = P.videos; window.GAL = P.gallery; window.CATS = P.galleryCats;
  window.PRESS = P.press; window.CONTACT = { social: P.social, reps: P.reps }; window.NAVL = P.nav;
  // Orden propio de una preview: SEASON_ORDER(['pj','pases',…]) (las claves que falten van al final)
  window.SEASON_ORDER = keys => { const a = keys.map(k => P.season.find(s => s.k === k)).filter(Boolean); return a.concat(P.season.filter(s => !a.includes(s))); };
  window.ATTRS = P.attrs; window.SEASON = P.season; window.SEASON_BY = by;
})(window.P);
