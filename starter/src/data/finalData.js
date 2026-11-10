import playerFinal from '@assets/final/player-final.webp'
import formacion from '@assets/final/formacion-maracana.webp'
import quite from '@assets/final/quite-maracana.webp'
import grito from '@assets/final/grito.webp'
import festejo from '@assets/final/festejo-maracana.webp'
import remate from '@assets/final/remate-maracana.webp'
import escudoEstudiantes from '@assets/escudos/escudo_estudiantes.webp'
import escudoPalmeiras from '@assets/escudos/escudo_palmeiras.webp'

// Modelo "Final continental": datos del torneo. Los textos de ejemplo son los de
// Keki Piovi (Estudiantes, Libertadores 2026). Reemplazá todo por el torneo del jugador.
export const torneo = {
  competition: 'Copa Libertadores',
  club: 'Estudiantes',
  edition: 2026,

  copy: {
    title: 'Rumbo a la ilusión',
    heroAlt: 'Keki Piovi con la camiseta de Estudiantes, mirando el parche de la Libertadores en la manga',
    pendingStarLabel: 'La quinta: se define el 28 de noviembre',
    pendingStarShort: '28/11',
  },

  final: {
    // 17:00 de Argentina (= Brasilia, UTC-3)
    kickoff: '2026-11-28T17:00:00-03:00',
    dateLabel: 'Sábado 28 de noviembre',
    timeLabel: '17:00 h',
    stadium: 'Estadio Centenario',
    city: 'Montevideo',
    rival: 'Palmeiras',
    shields: { home: escudoEstudiantes, rival: escudoPalmeiras },
    format: 'Partido único',
  },

  // Títulos de Estudiantes en la Libertadores: la final va por la quinta
  titles: [1968, 1969, 1970, 2009],

  // Dato histórico: la final de 1968 también fue ante Palmeiras
  history: 'La primera de las cuatro fue en 1968, ante el mismo rival.',

  // Camino a la final (orden cronológico)
  path: [
    {
      stage: 'Fase de grupos',
      rival: 'Grupo A',
      detail: 'Segundo detrás de Flamengo, con Medellín y Cusco',
      score: null,
    },
    {
      stage: 'Octavos',
      rival: 'Universidad Católica',
      score: '4-1',
      player: "180', 140 toques y 7 recuperaciones",
    },
    {
      stage: 'Cuartos',
      rival: 'Corinthians',
      score: '2-1',
      player: "176', 98 toques y 10 recuperaciones",
    },
    {
      stage: 'Semifinal',
      rival: 'Flamengo',
      score: 'Pen. 3-2',
      player: "180'; en la vuelta, 16 de 20 pases y 4 recuperaciones",
      highlight: true,
    },
  ],

  // La noche del Maracaná (22/10/2026)
  maracana: {
    title: 'La noche del Maracaná',

  },


  playerStats: [
    { value: '6/6', label: 'Partidos de eliminación jugados' },
    { value: "536'", label: 'Minutos en eliminación directa' },
    { value: '86%', label: 'Pases precisos en octavos y cuartos' },
  ],
  playerNote: 'Jugador con más toques y más pases precisos de la serie ante Universidad Católica.',

  images: {
    main: playerFinal,
    gallery: [
      { src: festejo, alt: 'Keki Piovi festeja en andas en el Maracaná tras la clasificación a la final' },
      { src: grito, alt: 'Keki Piovi grita con el puño apretado en el Maracaná' },
      { src: quite, alt: 'Keki Piovi barre la pelota ante De Arrascaeta en la semifinal' },
      { src: remate, alt: 'Keki Piovi remata con el número 21 en la espalda ante Flamengo' },
      { src: formacion, alt: 'Formación de Estudiantes antes de la semifinal en el Maracaná' },
    ],
  },
}
