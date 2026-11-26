// DATOS DEL JUGADOR · Ronaldo Martínez (comparador de rediseño)
// Sale de src/data/playerData.js de la landing actual. Las fotos están en img/.
window.P = {
  // Identidad
  first: 'Ronaldo', last: 'Martínez', full: 'Ronaldo Martínez', initials: 'RM',
  number: '77', number2: '77',
  position: 'Delantero', positionShort: 'DEL', positionDetail: 'centrodelantero',
  nationality: 'Paraguay', natCode: 'PAR', flag: 'img/bandera.webp',
  birthPlace: 'Eusebio Ayala', birthPlaceShort: 'Eusebio Ayala, PAR', birthRegion: 'Cordillera',
  foot: 'Derecho', age: '30', birthDate: '25/04/1996', height: '1.78', weight: '68',

  // Club actual
  club: 'Vélez', clubFull: 'Vélez Sarsfield', clubCountry: 'Argentina', clubCountryCode: 'ARG',
  crest: 'img/escudo-actual.webp',
  loanFrom: '',
  league: 'Liga Profesional · Argentina',

  // Textos
  bio: 'Delantero paraguayo de Eusebio Ayala, internacional con la Albirroja. Debutó en Cerro Porteño, fue goleador del Clausura 2025 con Platense y pasó por Talleres. Hoy juega en Vélez Sarsfield.',
  statsHook: 'La cifra que lo define: goles en la temporada, el número de un 9 de área.',
  zoneText: 'Juega de <b>centrodelantero</b>: ataca el espacio a la espalda de los centrales, gana de arriba y define en el área.',
  dossierLead: 'hoy es el 9 de',
  claim: 'El goleador que llegó a Vélez',
  instagram: { user: 'ronaldoivan', h: '@ronaldoivan', u: 'https://www.instagram.com/ronaldoivan/' },
  year: '2026', seasonLabel: '2026', seasonShort: '2026',

  photos: {
    heroBack: 'img/recorte-espalda.webp',
    heroBall: 'img/recorte-pelota.webp',
    heroFront: 'img/recorte-frente.webp',
    heroCelebrate: 'img/recorte-festejo.webp',
    heroWide: 'img/hero-ancho.webp',
    heroWideBlur: 'img/hero-ancho-blur.webp',
    portrait: 'img/retrato.webp',
    menu: 'img/selfie.webp',
    contact: 'img/g6.webp',
    press: 'img/g16.webp',
  },
  alts: {
    heroBack: 'Ronaldo Martínez con la camiseta 77 de Vélez Sarsfield',
    heroBall: 'Ronaldo Martínez con la camiseta 77 de Vélez Sarsfield',
    heroFront: 'Ronaldo Martínez con la camiseta 77 de Vélez Sarsfield',
    heroCelebrate: 'Ronaldo Martínez festeja un gol con los brazos abiertos y la camiseta de Vélez',
    heroWide: 'Ronaldo Martínez festeja un gol con la camiseta de Vélez',
    portrait: 'Retrato de Ronaldo Martínez en el túnel del estadio',
    menu: 'Ronaldo Martínez se saca una selfie con la pelota y la camiseta de Vélez',
    contact: 'Ronaldo Martínez festeja con los brazos en alto con Vélez',
  },

  // Partidos de EJEMPLO. En React salen de useMatches / el panel /admin.
  lastMatch: { home: 'VEL', away: 'BOC', homeName: 'Vélez', awayName: 'Boca Juniors', hs: '2', as: '1', date: '16 NOV', note: 'Final' },
  nextMatch: { home: 'RIV', away: 'VEL', homeName: 'River Plate', awayName: 'Vélez', date: '30 NOV', venue: 'Monumental' },

  // Temporada (en React llega de API-Football). La primera es el número del Marcador.
  season: [
    { k: 'goles', l: 'Goles', v: '20', hl: true },
    { k: 'pj', l: 'Partidos', ll: 'Partidos jugados', v: '35' },
    { k: 'asis', l: 'Asistencias', v: '8' },
    { k: 'tiros', l: 'Tiros al arco', ls: 'Tiros', v: '56' },
    { k: 'min', l: 'Minutos', v: "4,429'" },
    { k: 'val', l: 'Valoración', ll: 'Valoración promedio', v: '8.9' },
  ],
  attrs: [['Velocidad', 91], ['Definición', 94], ['Regate', 84], ['Juego aéreo', 90], ['Presión alta', 82], ['Visión de juego', 79]],

  clubs: [
    { n: 'Vélez Sarsfield', c: 'Argentina', y: '2026 — Act.', l: 'img/escudo-actual.webp', t: [], i: '', cur: true, y0: 2026 },
    { n: 'Talleres', c: 'Argentina', y: '2025 — 2026', l: 'img/esc_talleres.webp', t: [], i: '', y0: 2025 },
    { n: 'Selección Paraguay', c: 'Paraguay', y: '2024 — Act.', l: 'img/esc_paraguay.webp', t: [], i: 'Selección', y0: 2024 },
    { n: 'Platense', c: 'Argentina', y: '2024 — 2025', l: 'img/esc_platense.webp', t: ['Torneo Apertura 2025'], i: '', y0: 2024 },
    { n: 'Resistencia SC', c: 'Paraguay', y: '2022', l: 'img/esc_resistencia.webp', t: [], i: '', y0: 2022 },
    { n: 'The Strongest', c: 'Bolivia', y: '2021', l: 'img/esc_strongest.webp', t: [], i: 'Préstamo', y0: 2021 },
    { n: 'Central Norte', c: 'Argentina', y: '2019', l: 'img/esc_central_norte.webp', t: ['Regional Federal 2019'], i: 'Préstamo', y0: 2019 },
    { n: 'Capiatá', c: 'Paraguay', y: '2018', l: 'img/esc_capiata.webp', t: [], i: 'Préstamo', y0: 2018 },
    { n: 'Cerro Porteño', c: 'Paraguay', y: '2015 — 2021', l: 'img/esc_cerro.webp', t: ['Apertura 2015', 'Clausura 2017', 'Apertura 2020'], i: 'Debut', y0: 2015 },
  ],

  // Videos: hoy hay un solo video (YouTube). Los otros dos son de ejemplo para ver el diseño con 3.
  videos: [
    { t: "Platense '25", f: 'Highlights Platense 2025', club: 'Platense', lg: 'Liga Argentina', yr: '25', img: 'img/v1.webp', crest: 'img/esc_platense.webp', ig: '', yt: 'HCs1s_BT7uk' },
    { t: "Vélez '26", f: 'Jugadas destacadas en Vélez (ejemplo)', club: 'Vélez Sarsfield', lg: 'Liga Profesional', yr: '26', img: 'img/v2.webp', crest: 'img/escudo-actual.webp', ig: '' },
    { t: "Talleres '25", f: 'Goles con Talleres (ejemplo)', club: 'Talleres', lg: 'Liga Profesional', yr: '25', img: 'img/v3.webp', crest: 'img/esc_talleres.webp', ig: '' },
  ],

  galleryCats: [['all', 'Todas'], ['u', 'Vélez'], ['s', 'Selección'], ['c', 'Clubes anteriores']],
  gallery: [
    { s: 'img/g1.webp', c: 'u', a: 'Ataca el área con la camiseta de Vélez' },
    { s: 'img/g4.webp', c: 'u', a: 'Festeja un gol con Vélez en el Amalfitani' },
    { s: 'img/g10.webp', c: 's', a: 'Conduce la pelota con la camiseta de Paraguay' },
    { s: 'img/g6.webp', c: 'u', a: 'Festeja con los brazos en alto con Vélez' },
    { s: 'img/g2.webp', c: 'u', a: 'Encara por la banda con Vélez' },
    { s: 'img/g5.webp', c: 'u', a: 'Remata al arco con la camiseta de Vélez' },
    { s: 'img/g7.webp', c: 'u', a: 'Llegada al estadio con Vélez' },
    { s: 'img/g8.webp', c: 'u', a: 'Previa del partido con el plantel de Vélez' },
    { s: 'img/g9.webp', c: 'u', a: 'El once titular de Vélez' },
    { s: 'img/g3.webp', c: 'u', a: 'Festeja junto a un compañero de Vélez' },
    { s: 'img/g11.webp', c: 's', a: 'Formación de la selección de Paraguay' },
    { s: 'img/g12.webp', c: 's', a: 'Llegada al estadio con la Selección' },
    { s: 'img/g13.webp', c: 's', a: 'En cancha con la Albirroja' },
    { s: 'img/g14.webp', c: 's', a: 'Domina la pelota con Paraguay' },
    { s: 'img/g15.webp', c: 's', a: 'Himno con la selección de Paraguay' },
    { s: 'img/g16.webp', c: 'c', a: 'Festeja con la camiseta de Talleres' },
    { s: 'img/g17.webp', c: 'c', a: 'Remata con la camiseta de Talleres' },
    { s: 'img/g18.webp', c: 'c', a: 'En acción con Talleres' },
    { s: 'img/g19.webp', c: 'c', a: 'Con la camiseta de Talleres' },
    { s: 'img/g20.webp', c: 'c', a: 'En acción con Platense' },
    { s: 'img/g21.webp', c: 'c', a: 'Con la camiseta de Platense' },
    { s: 'img/g22.webp', c: 'c', a: 'Festeja con Platense' },
  ],

  press: [
    { logo: 'img/press_logo1.webp', medio: 'El Gráfico', t: 'Se inmortalizó en los libros de récords como máximo goleador del Clausura 2025', d: 'Diciembre 2025', x: 'Platense volvió a tener al goleador del campeonato de Primera División.', u: 'https://www.elgrafico.com.ar/articulo/primera-division/95962/cuantas-veces-platense-tuvo-al-goleador-del-campeonato-de-primera-division' },
    { logo: 'img/press_logo2.webp', medio: 'La Voz', t: 'El delantero paraguayo puso el 1-0 y fue clave en la noche feliz de la “T” ante Newell’s', d: 'Enero 2026', x: 'Figura de Talleres: el gol, la lesión y el festejo a lo Cristiano.', u: 'https://www.lavoz.com.ar/deportes/futbol/ronaldo-martinez-figura-de-talleres-como-esta-de-la-lesion-y-por-que-festejo-a-lo-cristiano/' },
    { logo: 'img/press_logo3.webp', medio: 'Cba24N', t: 'Convocado por la selección de Paraguay para la próxima fecha FIFA', d: 'Marzo 2026', x: 'Vuelve a la Albirroja para la ventana internacional.', u: 'https://www.cba24n.com.ar/deportes/futbol/talleres/ronaldo-martinez--convocado-a-la-seleccion-de-paraguay-para-la-proxima-ventana-internacional_a69ac304f2128774661b1005d' },
  ],

  social: [
    { l: 'Instagram', h: '@ronaldoivan', u: 'https://www.instagram.com/ronaldoivan/' },
    { l: 'Transfermarkt', h: '/ronaldo-martinez', u: 'https://www.transfermarkt.com.ar/ronaldo-martinez/profil/spieler/567736' },
  ],
  reps: [
    { role: 'Representante deportivo', n: 'Universal Twenty Two', h: '@twentytwo_sm', u: 'https://www.instagram.com/twentytwo_sm/', img: 'img/u22.webp', for: 'Clubes y transferencias' },
    { role: 'Contacto de marketing', n: 'LED Sports Marketing', h: '@_ledsports', u: 'https://www.instagram.com/_ledsports/', img: 'img/led.webp', for: 'Marcas y acciones comerciales' },
  ],

  nav: [['Inicio', '#hero'], ['Estadísticas', '#estadisticas'], ['Videos', '#videos'], ['Galería', '#galeria'], ['Prensa', '#press'], ['Contacto', '#contact']],
};

// Alias que usan los HTML (no editar)
(function (P) {
  P.s = Object.fromEntries(P.season.map(s => [s.k, s.v]));
  P.hl = P.season.find(s => s.hl) || P.season[0];
  P.mainStat = P.season[0];
  P.clubCount = P.clubs.length;
  P.loanText = P.loanFrom ? ', a préstamo de ' + P.loanFrom : '';
  P.media = Math.round(P.attrs.reduce((a, [, v]) => a + v, 0) / P.attrs.length);
  window.CLUBS = P.clubs; window.VIDS = P.videos; window.GAL = P.gallery; window.CATS = P.galleryCats;
  window.PRESS = P.press; window.CONTACT = { social: P.social, reps: P.reps }; window.NAVL = P.nav;
  window.SEASON_ORDER = keys => { const a = keys.map(k => P.season.find(s => s.k === k)).filter(Boolean); return a.concat(P.season.filter(s => !a.includes(s))); };
  window.VURL = v => v.yt ? 'https://www.youtube.com/watch?v=' + v.yt : (v.ig ? 'https://www.instagram.com/reel/' + v.ig + '/' : P.instagram.u);
  window.ATTRS = P.attrs; window.SEASON = P.season; window.SEASON_BY = k => P.season.find(s => s.k === k) || { v: '', l: '' };
})(window.P);
