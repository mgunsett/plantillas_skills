// ─────────────────────────────────────────────────────────────────────────────
// DATOS DEL JUGADOR · Kit claro
// Es el único archivo que hay que editar para adaptar las previews a otro
// jugador (más las fotos de img/). Los textos de los HTML usan {{campo}} y las
// listas se arman desde acá. El ejemplo cargado es el de Luis Ramos.
// ─────────────────────────────────────────────────────────────────────────────
window.P = {
  // Identidad
  first: 'Luis', last: 'Ramos', full: 'Luis Ramos', initials: 'LR',
  number: '9', number2: '09',
  position: 'Delantero', positionShort: 'DC', positionDetail: 'centrodelantero',
  nationality: 'Perú', natCode: 'PER', flag: 'img/bandera.webp',
  birthPlace: 'Trujillo', birthPlaceShort: 'Trujillo, PER',
  foot: 'Derecho', age: '26', birthDate: '13/12/1999', height: '1.83', weight: '75',

  // Club actual
  club: 'Alianza Lima', clubFull: 'Club Alianza Lima', clubCountry: 'Perú', clubCountryCode: 'PER',
  crest: 'img/escudo-actual.webp',
  league: 'Liga 1 · Perú',
  loanFrom: '',                              // '' si no está a préstamo

  // Textos
  statsHook: 'La cifra que lo define: goles en la temporada con la camiseta de Alianza Lima.',
  zoneText: 'Juega de <b>centrodelantero</b>: fija a los centrales, pivotea de espaldas y ataca el área chica.',
  dossierLead: 'hoy es el 9 de',     // Estadísticas 4: "…hace 26 años y {dossierLead} <club>"
  bio: 'Centrodelantero de Trujillo, internacional con la Selección Peruana. Pasó por Mannucci, Municipal, Cusco y América de Cali. Hoy es el 9 de Alianza Lima.',
  claim: 'El 9 que define',            // Hero 5 (Portada): frase grande de tapa
  instagram: { user: 'luisramos_09', h: '@luisramos_09', u: 'https://www.instagram.com/luisramos_09/' },
  year: '2026', seasonLabel: '2026', seasonShort: '2026',

  // Fotos (en img/)
  photos: {
    heroFront: 'img/recorte-frente.webp',  // recorte PNG/WebP de frente (Hero 2, 4)
    heroBall: 'img/recorte-pelota.webp',   // recorte con la pelota (Hero 1)
    heroWide: 'img/hero-ancho.webp',       // foto de cancha en alta (Hero 3, navbar)
    contact: 'img/g11.webp',               // Contacto 2: foto de cierre
    portrait: 'img/retrato.webp',          // retrato vertical de estudio (Hero 5)
    heroCelebrate: 'img/recorte-festejo.webp', // recorte festejando, brazos abiertos (Hero 6)
  },
  alts: {
    heroFront: 'Luis Ramos con la camiseta 9 de Alianza Lima',
    heroBall: 'Luis Ramos con la pelota y la camiseta de la Selección Peruana',
    heroWide: 'Luis Ramos levanta el trofeo con Alianza Lima',
    contact: 'Luis Ramos levanta el trofeo de campeón con Alianza Lima',
    portrait: 'Retrato de Luis Ramos haciendo silencio con el dedo',
    heroCelebrate: 'Luis Ramos festeja con los brazos abiertos y la camiseta 9 de Alianza Lima',
  },

  // Partidos de EJEMPLO para la preview. En React salen de useMatches / el panel /admin.
  lastMatch: { home: 'ALI', away: 'CRI', homeName: 'Alianza Lima', awayName: 'Sporting Cristal', hs: '2', as: '1', date: '16 NOV', note: 'Final' },
  nextMatch: { home: 'MEL', away: 'ALI', homeName: 'Melgar', awayName: 'Alianza Lima', date: '30 NOV', venue: 'Monumental UNSA' },

  // Temporada: k = clave, l = rótulo, v = valor. hl marca el número destacado.
  season: [
    { k: 'pj', l: 'Partidos', v: '63' },
    { k: 'goles', l: 'Goles', v: '15', hl: true },
    { k: 'ocas', l: 'Oportunidades', v: '29' },
    { k: 'tiros', l: 'Tiros al arco', v: '37' },
    { k: 'min', l: 'Minutos', v: "2,858'" },
    { k: 'val', l: 'Valoración', v: '8.5' },
  ],


  // Atributos 0-100 (radar, barras y ranking): 6 para que el radar cierre en hexágono
  attrs: [['Velocidad', 84], ['Remate', 89], ['Regate', 83], ['Pases', 79], ['Presión alta', 87], ['Visión de juego', 89]],

  // Clubes, del más reciente al más antiguo. cur = actual, i = vínculo, t = títulos, y0 = año de llegada
  clubs: [
    { n: 'Alianza Lima', c: 'Perú', y: '2026 — Act.', l: 'img/escudo-actual.webp', t: ['Torneo Apertura 2026'], i: '', cur: true, y0: 2026 },
    { n: 'Selección Perú', c: 'Perú', y: '2024 — Act.', l: 'img/esc_peru.webp', t: [], i: 'Selección', y0: 2024 },
    { n: 'América de Cali', c: 'Colombia', y: '2025', l: 'img/esc_america.webp', t: [], i: 'Préstamo', y0: 2025 },
    { n: 'Cusco F.C.', c: 'Perú', y: '2024', l: 'img/esc_cusco.webp', t: [], i: '', y0: 2024 },
    { n: 'Los Chankas', c: 'Perú', y: '2023', l: 'img/esc_chankas.webp', t: [], i: '', y0: 2023 },
    { n: 'Dep. Municipal', c: 'Perú', y: '2022 — 2023', l: 'img/esc_depMunicipal.webp', t: [], i: '', y0: 2022 },
    { n: 'Dep. Llacuabamba', c: 'Perú', y: '2021 — 2022', l: 'img/esc_llacuabamba.webp', t: [], i: '', y0: 2021 },
    { n: 'C.A. Mannucci', c: 'Perú', y: '2019 — 2020', l: 'img/esc_mannucci.webp', t: [], i: 'Debut', y0: 2019 },
  ],

  // Videos (reels de Instagram: ig = código del reel)
  videos: [
    { t: "Alianza Lima '26", f: "Jugadas destacadas '26", club: 'Alianza Lima', lg: 'Liga 1 · Perú', yr: '26', img: 'img/g1.webp', crest: 'img/escudo-actual.webp', ig: 'DaEvRiyOIXL' },
    { t: "Gol América '25", f: "Gol con América de Cali '25", club: 'América de Cali', lg: 'Liga BetPlay', yr: '25', img: 'img/g15.webp', crest: 'img/esc_america.webp', ig: 'DPaIw9xjjds' },
    { t: 'Selección Perú', f: 'Jugadas destacadas con Perú', club: 'Selección Perú', lg: 'Eliminatorias', yr: '24', img: 'img/g5.webp', crest: 'img/esc_peru.webp', ig: 'DBXRQzgP80c' },
  ],

  // Galería. c: 'u' = club actual, 's' = selección, 'c' = clubes anteriores. a = texto alternativo.
  galleryCats: [['all', 'Todas'], ['u', 'Alianza Lima'], ['s', 'Selección'], ['c', 'Clubes anteriores']],
  gallery: [
    { s: 'img/g11.webp', c: 'u', a: 'Levanta el trofeo del Apertura entre fotógrafos' },
    { s: 'img/g13.webp', c: 'u', a: 'Festeja el título con el trofeo en alto' },
    { s: 'img/g8.webp', c: 's', a: 'Conduce la pelota con la camiseta de Perú' },
    { s: 'img/g1.webp', c: 'u', a: 'En el campo con la camiseta de Alianza Lima' },
    { s: 'img/g12.webp', c: 'u', a: 'El plantel de Alianza Lima campeón del Apertura' },
    { s: 'img/g14.webp', c: 'u', a: 'Con su familia y el trofeo de campeón' },
    { s: 'img/g3.webp', c: 's', a: 'Disputa la pelota ante Colombia' },
    { s: 'img/g4.webp', c: 's', a: 'En la cancha con la Selección Peruana' },
    { s: 'img/g5.webp', c: 's', a: 'Protege la pelota ante un rival de Colombia' },
    { s: 'img/g6.webp', c: 's', a: 'Remate en el área con la camiseta de Perú' },
    { s: 'img/g7.webp', c: 's', a: 'Controla la pelota en el aire con Perú' },
    { s: 'img/g2.webp', c: 's', a: 'Llegada con la delegación de la Selección' },
    { s: 'img/g9.webp', c: 's', a: 'Llegada al estadio con la ropa de la Selección' },
    { s: 'img/g10.webp', c: 's', a: 'Retrato con la camiseta de la Selección' },
    { s: 'img/g15.webp', c: 'c', a: 'Festeja un gol con América de Cali' },
    { s: 'img/g16.webp', c: 'c', a: 'Grita un gol con los brazos abiertos en América de Cali' },
  ],

  // Prensa
  press: [
    { logo: 'img/press_logo1.webp', medio: 'Win Sports', t: 'Con doblete de Luis Ramos, América venció 2-0 al DIM y quedó primero', d: 'Mayo 2025', x: '', u: 'https://www.instagram.com/reels/DKGMWJmJsNK/' },
    { logo: 'img/press_logo3.webp', medio: 'CONMEBOL Sudamericana', t: '¿Gol? ¡Golazo de Luis Ramos para América de Cali!', d: 'Abril 2025', x: '', u: 'https://www.instagram.com/reels/DINZEdxx7Ci/' },
    { logo: 'img/press_logo2.webp', medio: 'Cusco FC', t: 'Su gol con Cusco, nominado al Mejor Gol del Año 2024', d: 'Enero 2025', x: '', u: 'https://www.instagram.com/reels/DETBg0ehPo3/' },
  ],

  // Contacto
  social: [
    { l: 'Instagram', h: '@luisramos_09', u: 'https://www.instagram.com/luisramos_09/' },
    { l: 'Transfermarkt', h: '/luis-ramos', u: 'https://www.transfermarkt.com.ar/luis-ramos/profil/spieler/687529' },
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
