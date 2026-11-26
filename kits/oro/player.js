// ─────────────────────────────────────────────────────────────────────────────
// DATOS DEL JUGADOR · Kit oro
// Es el único archivo que hay que editar para adaptar las previews a otro
// jugador (más las fotos de img/). Los textos de los HTML usan {{campo}} y las
// listas se arman desde acá. El ejemplo cargado es el de Nicolás Silva.
// Junta los campos del kit neón y del kit claro: sirve para los diseños de ambos.
// ─────────────────────────────────────────────────────────────────────────────
window.P = {
  // Identidad
  first: 'Nicolás', last: 'Silva', full: 'Nicolás Silva', initials: 'NS',
  number: '26', number2: '26',
  position: 'Extremo derecho', positionShort: 'ED', positionDetail: 'extremo derecho',
  nationality: 'Argentina', natCode: 'ARG', flag: 'img/bandera.webp',
  birthPlace: 'Las Parejas', birthPlaceShort: 'Las Parejas, ARG', birthRegion: 'Santa Fe',
  foot: 'Derecho', age: '36', birthDate: '24/01/1990', height: '1.63', weight: '70',

  // Club actual
  club: 'Cusco FC', clubFull: 'Cusco Fútbol Club', clubCountry: 'Perú', clubCountryCode: 'PER',
  crest: 'img/escudo-actual.webp',
  loanFrom: '',                              // '' si no está a préstamo
  league: 'Liga 1 · Perú',

  // Textos
  bio: 'Extremo de Las Parejas, Santa Fe. Pasó por Colón, Huracán, Banfield, Argentinos y Aucas, donde fue campeón. Hoy juega en Cusco FC.',
  statsHook: 'La cifra que lo define: titular en la temporada en que Cusco FC fue subcampeón de la Liga 1.',
  zoneText: 'Juega de <b>extremo derecho</b>: abre la cancha, encara hacia adentro y llega al área para definir o asistir.',
  dossierLead: 'hoy es el 26 de',            // Estadísticas 4: "…hace 36 años y {dossierLead} <club>"
  claim: 'Velocidad por la banda',
  homeCity: 'Cusco', homeAltitude: '3.399',  // Hero 6 (Muro inca): ciudad del club y altura en m s. n. m.
  cardNo: '26',                              // Hero 7 (Cromo): número de figurita           // Hero (Portada): frase grande de tapa
  instagram: { user: '_silvanicolas', h: '@_silvanicolas', u: 'https://www.instagram.com/_silvanicolas/' },
  year: '2026', seasonLabel: '2025 / 2026', seasonShort: '2025/26',

  // Fotos (en img/)
  photos: {
    heroBack: 'img/recorte-espalda.webp',      // recorte de espaldas con el dorsal
    heroBall: 'img/recorte-pelota.webp',       // recorte en acción
    heroFront: 'img/recorte-frente.webp',      // recorte de frente
    heroCelebrate: 'img/recorte-festejo.webp', // recorte festejando o en acción
    heroWide: 'img/hero-ancho.webp',           // foto de cancha horizontal (relleno de los navbar)
    heroWideBlur: 'img/hero-ancho-blur.webp',
    portrait: 'img/retrato.webp',              // retrato vertical
    contact: 'img/g3.webp',                    // Contacto 2: foto de cierre
    press: 'img/g6.webp',                      // Prensa 3: fondo de la nota destacada
  },
  alts: {
    heroBack: 'Nicolás Silva de espaldas con la camiseta 26 de Cusco FC',
    heroBall: 'Nicolás Silva corre con la camiseta dorada de Cusco FC',
    heroFront: 'Nicolás Silva con la camiseta dorada de Cusco FC',
    heroCelebrate: 'Nicolás Silva corre con la camiseta dorada de Cusco FC',
    heroWide: 'Nicolás Silva remata con la camiseta de Cusco FC',
    portrait: 'Retrato de Nicolás Silva con la cinta de capitán de Cusco FC',
    contact: 'Nicolás Silva conduce la pelota con la camiseta de Cusco FC',
  },

  // Partidos de EJEMPLO para la preview. En React salen de useMatches / el panel /admin.
  lastMatch: { home: 'CUS', away: 'MEL', homeName: 'Cusco FC', awayName: 'Melgar', hs: '2', as: '1', date: '16 NOV', note: 'Final' },
  nextMatch: { home: 'ALI', away: 'CUS', homeName: 'Alianza Lima', awayName: 'Cusco FC', date: '30 NOV', venue: 'Matute' },

  // Temporada: k = clave, l = rótulo, v = valor. hl marca el número destacado.
  season: [
    { k: 'pj', l: 'Partidos', ll: 'Partidos jugados', v: '60', hl: true },
    { k: 'goles', l: 'Goles', v: '3' },
    { k: 'asis', l: 'Asistencias', v: '5' },
    { k: 'tiros', l: 'Tiros al arco', v: '19' },
    { k: 'min', l: 'Minutos', v: "2,589'" },
    { k: 'val', l: 'Valoración', ll: 'Valoración promedio', v: '7.1' },
  ],
  // Atributos 0-100: 6 para que el radar cierre en hexágono
  attrs: [['Velocidad', 94], ['Definición', 79], ['Regate', 89], ['Pases', 83], ['Presión alta', 80], ['Visión de juego', 77]],

  // Clubes, del más reciente al más antiguo. cur = actual, i = vínculo, t = títulos, y0 = año de llegada
  clubs: [
    { n: 'Cusco FC', c: 'Perú', y: '2024 — Act.', l: 'img/escudo-actual.webp', t: [], i: '', cur: true, y0: 2024 },
    { n: 'Chaco For Ever', c: 'Argentina', y: '2022 — 2023', l: 'img/esc_chaco.webp', t: [], i: '', y0: 2022 },
    { n: 'S.D. Aucas', c: 'Ecuador', y: '2022', l: 'img/esc_aucas.webp', t: ['Campeón Serie A 2022'], i: '', y0: 2022 },
    { n: 'Huracán', c: 'Argentina', y: '2021', l: 'img/esc_huracan.webp', t: [], i: 'Préstamo', y0: 2021 },
    { n: 'Argentinos Juniors', c: 'Argentina', y: '2019 — 2021', l: 'img/esc_argentinos.webp', t: [], i: '', y0: 2019 },
    { n: 'Banfield', c: 'Argentina', y: '2018 — 2019', l: 'img/esc_banfield.webp', t: [], i: '', y0: 2018 },
    { n: 'Huracán', c: 'Argentina', y: '2017 — 2018', l: 'img/esc_huracan.webp', t: [], i: '', y0: 2017 },
    { n: 'Colón', c: 'Argentina', y: '2016 — 2017', l: 'img/esc_colon.webp', t: [], i: '', y0: 2016 },
    { n: 'Boca Unidos', c: 'Argentina', y: '2014 — 2015', l: 'img/esc_bocaunidos.webp', t: [], i: '', y0: 2014 },
    { n: 'Chaco For Ever', c: 'Argentina', y: '2013 — 2014', l: 'img/esc_chaco.webp', t: [], i: '', y0: 2013 },
    { n: 'Sp. Las Parejas', c: 'Argentina', y: '2012 — 2013', l: 'img/esc_lasparejas.webp', t: [], i: 'Debut', y0: 2012 },
  ],

  // Videos (reels de Instagram: ig = código del reel)
  videos: [
    { t: 'Gol vs Sport Huancayo', f: 'Gol ante Sport Huancayo · 2025', club: 'Cusco FC', lg: 'Liga 1 · Perú', yr: '25', img: 'img/g7.webp', crest: 'img/escudo-actual.webp', ig: 'DRar5BiDxW_' },
    { t: 'Gol vs Alianza Lima', f: 'Gol ante Alianza Lima · 2025', club: 'Cusco FC', lg: 'Liga 1 · Perú', yr: '25', img: 'img/g5.webp', crest: 'img/escudo-actual.webp', ig: 'DMT6HFkM00D' },
    { t: 'Jugador del partido', f: 'Jugador del partido · 2025', club: 'Cusco FC', lg: 'Liga 1 · Perú', yr: '25', img: 'img/g2.webp', crest: 'img/escudo-actual.webp', ig: 'DIuSnoTxJGS' },
  ],

  // Galería. c: 'u' = club actual, 'e' = entrenamiento, 'c' = clubes anteriores. a = texto alternativo.
  galleryCats: [['all', 'Todas'], ['u', 'Cusco FC'], ['e', 'Entrenamiento']],
  gallery: [
    { s: 'img/g3.webp', c: 'u', a: 'Corre con la camiseta dorada de Cusco FC' },
    { s: 'img/g7.webp', c: 'u', a: 'Remata de zurda en el estadio de Cusco' },
    { s: 'img/g9.webp', c: 'u', a: 'Retrato con la cinta de capitán de Cusco FC' },
    { s: 'img/g10.webp', c: 'u', a: 'De espaldas con el 26, saluda a la tribuna' },
    { s: 'img/g1.webp', c: 'u', a: 'Conduce la pelota ante la marca de un rival' },
    { s: 'img/g2.webp', c: 'u', a: 'El equipo de Cusco FC en la Copa Libertadores' },
    { s: 'img/g4.webp', c: 'u', a: 'Posa con un trofeo de campeón' },
    { s: 'img/g5.webp', c: 'u', a: 'Prepara el remate con la camiseta de Cusco FC' },
    { s: 'img/g6.webp', c: 'u', a: 'Formación de Cusco FC antes del partido' },
    { s: 'img/g8.webp', c: 'u', a: 'Prepara un centro desde la banda' },
    { s: 'img/g13.webp', c: 'u', a: 'Avanza con la pelota junto a un compañero' },
    { s: 'img/g11.webp', c: 'e', a: 'Trabajo con pelota en el entrenamiento' },
    { s: 'img/g12.webp', c: 'e', a: 'Sonríe con el pulgar arriba en el entrenamiento' },
    { s: 'img/g14.webp', c: 'e', a: 'Salto en un entrenamiento en la montaña' },
    { s: 'img/g15.webp', c: 'e', a: 'Disputa la pelota en una práctica' },
  ],

  // Prensa: EJEMPLO. Reemplazar por medio, titular, fecha, bajada y link reales.
  press: [
    { logo: 'img/press_logo1.webp', medio: 'ESPN', t: 'Titular de ejemplo sobre su temporada en Cusco FC', d: 'Fecha', x: 'Bajada de ejemplo: acá va una línea que resume la nota.', u: '#' },
    { logo: 'img/press_logo2.webp', medio: 'Infobae', t: 'Titular de ejemplo sobre su carrera en el exterior', d: 'Fecha', x: 'Bajada de ejemplo: acá va una línea que resume la nota.', u: '#' },
    { logo: 'img/press_logo3.webp', medio: 'CONMEBOL Libertadores', t: 'Titular de ejemplo sobre Cusco FC en la Libertadores', d: 'Fecha', x: 'Bajada de ejemplo: acá va una línea que resume la nota.', u: '#' },
  ],

  // Contacto
  social: [
    { l: 'Instagram', h: '@_silvanicolas', u: 'https://www.instagram.com/_silvanicolas/' },
    { l: 'Transfermarkt', h: '/nicolas-silva', u: 'https://www.transfermarkt.com.ar/nicolas-silva/profil/spieler/422914' },
  ],
  reps: [
    { role: 'Representante deportivo', n: 'Moon Sports Group', h: '@moonsportsgroup_', u: 'https://www.instagram.com/moonsportsgroup_/', img: 'img/moon.webp', for: 'Clubes y transferencias' },
    { role: 'Contacto de marketing', n: 'LED Sports Marketing', h: '@_ledsports', u: 'https://www.instagram.com/_ledsports/', img: 'img/led.webp', for: 'Marcas y acciones comerciales' },
  ],

  // Links del menú
  nav: [['Inicio', '#hero'], ['Estadísticas', '#estadisticas'], ['Videos', '#videos'], ['Galería', '#galeria'], ['Prensa', '#press'], ['Contacto', '#contact']],
};

// Alias que usan los HTML (no editar)
(function (P) {
  P.s = Object.fromEntries(P.season.map(s => [s.k, s.v]));
  P.hl = P.season.find(s => s.hl) || P.season[0];
  P.mainStat = P.hl;
  P.clubCount = P.clubs.length;
  P.loanText = P.loanFrom ? ', a préstamo de ' + P.loanFrom : '';
  P.media = Math.round(P.attrs.reduce((a, [, v]) => a + v, 0) / P.attrs.length);
  window.NAVL = P.nav; window.SEASON = P.season; window.CONTACT = { social: P.social, reps: P.reps };
  window.CLUBS = P.clubs; window.VIDS = P.videos; window.GAL = P.gallery; window.CATS = P.galleryCats; window.PRESS = P.press;
  window.SEASON_ORDER = keys => { const a = keys.map(k => P.season.find(s => s.k === k)).filter(Boolean); return a.concat(P.season.filter(s => !a.includes(s))); };
  window.ATTRS = P.attrs; window.SEASON_BY = k => P.season.find(s => s.k === k) || { v: '', l: '' };
})(window.P);
