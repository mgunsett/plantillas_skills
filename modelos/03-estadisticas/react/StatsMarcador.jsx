import { useRef, useEffect } from 'react'
import { Box, Grid, Flex, Text } from '@chakra-ui/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { playerData } from '../../data/playerData'
import useSeasonStats from '../../hooks/useSeasonStats'

gsap.registerPlugin(ScrollTrigger)

// Estadísticas "Marcador": los goles en un bloque azul gigante, el resto de la
// temporada en un tablero, la ficha en una fila y, al pie, un radar chico con
// los 6 atributos junto a las barras segmentadas.

const isNum = (v) => typeof v === 'number' && Number.isFinite(v)
const fixed = (label) => playerData.seasonStats.find((s) => s.label === label)?.value

// Con datos de API-Football se usan esos; si falta alguno, el valor fijo de playerData
function seasonBoard(season) {
  const s = season || {}
  return {
    main: { label: 'Goles', value: s.goles ?? fixed('Goles') },
    tiles: [
      { label: 'Partidos', value: s.partidos ?? fixed('Partidos') },
      { label: 'Tiros al arco', value: s.tirosArco ?? fixed('Tiros al arco') },
      { label: 'Oportunidades', value: fixed('Oportunidades') },
      { label: 'Minutos', value: isNum(s.minutos) ? `${s.minutos.toLocaleString('es-AR')}'` : fixed('Min / Part.') },
      { label: 'Valoración', value: isNum(s.rating) ? s.rating.toFixed(1) : fixed('Valoración') },
    ].filter((t) => t.value !== undefined && t.value !== null && t.value !== ''),
  }
}

const PROFILE = [
  ['Posición', playerData.position],
  ['Pie hábil', playerData.foot],
  ['Edad', `${playerData.age} años`],
  ['Altura', playerData.height.replace('m', ' m')],
  ['Peso', playerData.weight.replace('kg', ' kg')],
  ['Origen', playerData.birthPlace],
]

// ── Radar: atributos 0-100 dibujados desde 50, el mejor en rojo y la media al centro
function Radar({ attrs }) {
  const N = attrs.length, R = 60, C = 100, MIN = 50
  const pt = (i, v) => {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / N
    const r = (R * Math.max(0, v - MIN)) / (100 - MIN)
    return [C + r * Math.cos(a), C + r * Math.sin(a)]
  }
  const poly = (fn) => attrs.map((_, i) => fn(i).map((n) => n.toFixed(1)).join(',')).join(' ')
  const best = attrs.reduce((b, a, i) => (a.value > attrs[b].value ? i : b), 0)
  const media = Math.round(attrs.reduce((a, s) => a + s.value, 0) / N)

  return (
    <Box
      as="svg"
      viewBox="-42 0 284 200"
      w="100%"
      h="auto"
      overflow="visible"
      role="img"
      aria-label={`Atributos: ${attrs.map((a) => `${a.label} ${a.value}`).join(', ')}`}
      sx={{
        text: { fontFamily: 'Nippo, system-ui, sans-serif', textTransform: 'uppercase' },
        '.rd-poly': { transformOrigin: 'center', transformBox: 'view-box' },
      }}
    >
      {[62.5, 75, 87.5, 100].map((v) => (
        <polygon key={v} points={poly((i) => pt(i, v))} fill="none" stroke={v === 100 ? '#17285a55' : '#17285a1f'} />
      ))}
      {attrs.map((_, i) => {
        const [x, y] = pt(i, 100)
        return <line key={i} x1={C} y1={C} x2={x} y2={y} stroke="#17285a1a" />
      })}
      <polygon
        className="rd-poly"
        points={poly((i) => pt(i, attrs[i].value))}
        fill="#17285A"
        fillOpacity=".14"
        stroke="#17285A"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      {attrs.map((a, i) => {
        const [x, y] = pt(i, a.value)
        const ang = -Math.PI / 2 + (i * 2 * Math.PI) / N
        const lx = C + (R + 16) * Math.cos(ang)
        const ly = C + (R + 16) * Math.sin(ang)
        const anchor = Math.abs(Math.cos(ang)) < 0.2 ? 'middle' : Math.cos(ang) > 0 ? 'start' : 'end'
        const isBest = i === best
        return (
          <g key={a.label}>
            <circle cx={x} cy={y} r={isBest ? 3.2 : 2} fill={isBest ? '#E23744' : '#17285A'} />
            <text x={lx} y={ly - 1} textAnchor={anchor} fontSize="8.4" letterSpacing="1" fill="#5C6A88">{a.label}</text>
            <text x={lx} y={ly + 8} textAnchor={anchor} fontSize="9.5" fontWeight="700" fill={isBest ? '#E23744' : '#17285A'}>{a.value}</text>
          </g>
        )
      })}
      <text x={C} y={C + 6} textAnchor="middle" fontSize="22" fontWeight="700" fill="#17285A">{media}</text>
      <text x={C} y={C + 15} textAnchor="middle" fontSize="5.6" letterSpacing="1" fill="#5C6A88">Media</text>
    </Box>
  )
}

function AttrBar({ label, value }) {
  const on = Math.round(value / 10)
  return (
    <Box>
      <Flex justify="space-between" align="baseline" mb="10px">
        <Text fontSize="12px" letterSpacing="0.16em" textTransform="uppercase" color="#3D4A68">{label}</Text>
        <Text fontSize="22px" fontWeight="bold" color="brand.amber" sx={{ fontVariantNumeric: 'tabular-nums' }}>{value}</Text>
      </Flex>
      <Grid templateColumns="repeat(10, 1fr)" gap="3px" role="img" aria-label={`${label}: ${value} de 100`}>
        {Array.from({ length: 10 }, (_, i) => (
          <Box key={i} data-seg h="8px" bg={i < on ? 'brand.amber' : 'brand.bgRef'} transformOrigin="left" />
        ))}
      </Grid>
    </Box>
  )
}

export function StatsMarcador() {
  const season = useSeasonStats()
  const { main, tiles } = seasonBoard(season)
  const rootRef = useRef(null)
  const attrs = playerData.stats

  useEffect(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const st = (trigger) => ({ trigger, start: 'top 82%', once: true })
      gsap.from('[data-board] > *', { y: 30, opacity: 0, duration: 0.9, ease: 'expo.out', stagger: 0.08, scrollTrigger: st('[data-board]') })
      gsap.from('.rd-poly', { scale: 0, opacity: 0, duration: 1.2, ease: 'expo.out', scrollTrigger: st('[data-foot]') })
      gsap.from('[data-seg]', { scaleX: 0, duration: 0.6, ease: 'expo.out', stagger: 0.015, scrollTrigger: st('[data-foot]') })
    }, rootRef)
    return () => mm.revert()
  }, [])

  // Si quedan tiles impares, el último ocupa las dos columnas
  const odd = tiles.length % 2 === 1

  return (
    <Box ref={rootRef}>
      <Grid
        data-board
        templateColumns={{ base: '1fr', md: '1.1fr 1fr' }}
        gap="2px"
        bg="brand.amberLight"
        border="1px solid"
        borderColor="brand.amberLight"
      >
        <Flex
          bg="brand.amber"
          color="white"
          direction="column"
          justify="space-between"
          gap={{ base: 3, md: 0 }}
          px={{ base: 6, md: '38px' }}
          py={{ base: 6, md: '34px' }}
          minH={{ md: '340px' }}
        >
          <Text fontSize="12px" fontWeight="bold" letterSpacing="0.24em" textTransform="uppercase">{main.label}</Text>
          <Text fontWeight="bold" lineHeight={0.78} letterSpacing="-0.02em" fontSize={{ base: '44vw', md: 'clamp(150px, 24vw, 340px)' }} sx={{ fontVariantNumeric: 'tabular-nums' }}>
            {main.value}
          </Text>
          <Text fontSize="15px" fontWeight={500} maxW="30ch">
            La cifra que lo define: goles en la temporada con la camiseta de {playerData.currentClub}.
          </Text>
        </Flex>

        <Grid templateColumns="repeat(2, 1fr)" gap="2px">
          {tiles.map((t, i) => {
            const wide = odd && i === tiles.length - 1
            return (
              <Flex
                key={t.label}
                bg="brand.brown"
                px={{ base: '18px', md: '26px' }}
                py={{ base: '18px', md: '24px' }}
                gap="18px"
                gridColumn={wide ? 'span 2' : undefined}
                direction={wide ? 'row' : 'column'}
                align={wide ? 'flex-end' : 'stretch'}
                justify="space-between"
              >
                <Text fontSize="10px" fontWeight="bold" letterSpacing="0.24em" color="brand.gray" textTransform="uppercase">{t.label}</Text>
                <Text fontWeight="bold" lineHeight={0.9} color="brand.bone" fontSize={{ base: '34px', md: 'clamp(40px, 4vw, 62px)' }} sx={{ fontVariantNumeric: 'tabular-nums' }}>
                  {t.value}
                </Text>
              </Flex>
            )
          })}
        </Grid>
      </Grid>

      {/* Ficha en una fila */}
      <Grid
        templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(6, 1fr)' }}
        mt="34px"
        borderTop="1px solid"
        borderBottom="1px solid"
        borderColor="brand.amberLight"
      >
        {PROFILE.map(([k, v], i) => (
          <Box
            key={k}
            py={{ base: '12px', md: '16px' }}
            px={{ base: 0, md: '18px' }}
            pl={{ md: i === 0 ? 0 : '18px' }}
            borderLeft={{ md: i === 0 ? 0 : '1px solid' }}
            borderTop={{ base: i < 2 ? 0 : '1px solid', md: 0 }}
            borderColor={{ base: 'brand.amberLight', md: 'brand.amberLight' }}
          >
            <Text fontSize="10px" letterSpacing="0.22em" color="brand.gray" textTransform="uppercase" mb="6px">{k}</Text>
            <Text fontSize="16px" fontWeight={500} color="brand.bone">{v}</Text>
          </Box>
        ))}
      </Grid>

      {/* Pie: radar + barras */}
      <Grid
        data-foot
        templateColumns={{ base: '1fr', md: 'clamp(300px, 27vw, 390px) 1fr' }}
        gap={{ base: 7, md: 12 }}
        alignItems="center"
        mt="38px"
      >
        <Box maxW={{ base: '340px', md: 'none' }} mx={{ base: 'auto', md: 0 }} w="100%">
          <Radar attrs={attrs} />
        </Box>
        <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={{ base: 4, md: '22px 48px' }}>
          {attrs.map((a) => <AttrBar key={a.label} {...a} />)}
        </Grid>
      </Grid>
    </Box>
  )
}

export default StatsMarcador
