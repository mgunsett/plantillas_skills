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

  // Textos
  bio: 'Centrodelantero de Trujillo, internacional con la Selección Peruana. Pasó por Mannucci, Municipal, Cusco y América de Cali. Hoy es el 9 de Alianza Lima.',
  claim: 'El 9 que define',            // Hero 5 (Portada): frase grande de tapa
  instagram: { user: 'luisramos_09', h: '@luisramos_09', u: 'https://www.instagram.com/luisramos_09/' },
  year: '2026', seasonLabel: 'Temporada 2026', seasonShort: '2026',

  // Fotos (en img/)
  photos: {
    heroFront: 'img/recorte-frente.webp',  // recorte PNG/WebP de frente (Hero 2, 4)
    heroBall: 'img/recorte-pelota.webp',   // recorte con la pelota (Hero 1)
    heroWide: 'img/hero-ancho.webp',       // foto de cancha en alta (Hero 3, navbar)
    portrait: 'img/retrato.webp',          // retrato vertical de estudio (Hero 5)
    heroCelebrate: 'img/recorte-festejo.webp', // recorte festejando, brazos abiertos (Hero 6)
  },
  alts: {
    heroFront: 'Luis Ramos con la camiseta 9 de Alianza Lima',
    heroBall: 'Luis Ramos con la pelota y la camiseta de la Selección Peruana',
    heroWide: 'Luis Ramos levanta el trofeo con Alianza Lima',
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

  // Contacto (CTA del navbar y del hero)
  social: [
    { l: 'Instagram', h: '@luisramos_09', u: 'https://www.instagram.com/luisramos_09/' },
    { l: 'Transfermarkt', h: '/luis-ramos', u: 'https://www.transfermarkt.com.ar/luis-ramos/profil/spieler/687529' },
  ],
  reps: [
    { role: 'Representante deportivo', n: 'Moon Sports Group', h: '@moonsportsgroup_', u: 'https://www.instagram.com/moonsportsgroup_/' },
    { role: 'Contacto de marketing', n: 'LED Sports Marketing', h: '@_ledsports', u: 'https://www.instagram.com/_ledsports/' },
  ],

  // Links del menú
  nav: [['Inicio', '#hero'], ['Estadísticas', '#estadisticas'], ['Videos', '#videos'], ['Galería', '#galeria'], ['Prensa', '#press'], ['Contacto', '#contact']],
};

// Alias que usan los HTML (no editar)
(function (P) {
  P.s = Object.fromEntries(P.season.map(s => [s.k, s.v]));
  P.hl = P.season.find(s => s.hl) || P.season[0];
  window.NAVL = P.nav; window.SEASON = P.season; window.CONTACT = { social: P.social, reps: P.reps };
})(window.P);
