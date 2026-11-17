import { useRef, useEffect } from 'react'
import { Box, Grid, Text } from '@chakra-ui/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { playerData } from '../../data/playerData'

gsap.registerPlugin(ScrollTrigger)

// Estadísticas "Radar central": radar de atributos al centro con la media,
// números de la temporada a los costados y ficha del perfil al pie.

const C = 200      // centro del radar (viewBox 400x400)
const R = 140      // radio del anillo de 100
const MIN = 50     // la escala arranca en 50 para que se noten las diferencias

const LIME = '#B4F32A'

function point(i, n, v) {
  const a = -Math.PI / 2 + (i * 2 * Math.PI) / n
  const r = (R * (v - MIN)) / (100 - MIN)
  return [C + r * Math.cos(a), C + r * Math.sin(a)]
}

function Radar({ stats }) {
  const n = stats.length
  const poly = (fn) => stats.map((s, i) => fn(s, i).join(',')).join(' ')
  const label = stats.map((s) => `${s.label} ${s.value}`).join(', ')

  return (
    <Box as="svg" viewBox="-95 -10 590 420" w="100%" h="auto" display="block" overflow="visible" role="img" aria-label={`Radar de atributos: ${label}`}>
      {[60, 70, 80, 90, 100].map((v) => (
        <polygon
          key={v}
          points={poly((_, i) => point(i, n, v))}
          fill="none"
          stroke={v === 100 ? 'rgba(180,243,42,0.4)' : 'rgba(255,255,255,0.08)'}
        />
      ))}
      {stats.map((_, i) => {
        const [x, y] = point(i, n, 100)
        return <line key={i} x1={C} y1={C} x2={x} y2={y} stroke="rgba(255,255,255,0.08)" />
      })}
      <text x={C + 4} y={point(0, n, 100)[1] - 4} fontSize="9" fill="#98A388" fontFamily="Nippo, sans-serif">100</text>
      <polygon
        className="radar-shape"
        points={poly((s, i) => point(i, n, s.value))}
        fill={LIME}
        fillOpacity="0.9"
        stroke={LIME}
        strokeWidth="2"
        style={{ transformOrigin: `${C}px ${C}px` }}
      />
      {stats.map((s, i) => {
        const [x, y] = point(i, n, 118)
        const anchor = Math.abs(x - C) < 5 ? 'middle' : x > C ? 'start' : 'end'
        return (
          <g key={s.label} fontFamily="Nippo, sans-serif" fontWeight="700">
            <text className="radar-lbl" x={x} y={y} textAnchor={anchor} fill="#d6dccd" letterSpacing="1.3">
              {s.label.toUpperCase()}
            </text>
            <text className="radar-val" x={x} y={y + 17} textAnchor={anchor} fill={LIME}>
              {s.value}
            </text>
          </g>
        )
      })}
    </Box>
  )
}

function SeasonNumber({ stat, align = 'left', highlight }) {
  return (
    <Box data-reveal pb={5} borderBottom="1px solid" borderColor="brand.amberLight" textAlign={align} sx={{ '&:last-of-type': { border: 0, pb: 0 } }}>
      <Text
        fontFamily="heading"
        fontWeight="bold"
        fontSize={{ base: '40px', lg: 'clamp(48px, 5vw, 78px)' }}
        lineHeight={0.9}
        color={highlight ? 'brand.dorado' : 'brand.bone'}
        sx={{ fontVariantNumeric: 'tabular-nums' }}
      >
        {stat.value}
      </Text>
      <Text mt={2} fontSize="11px" letterSpacing="0.24em" color="brand.gray" textTransform="uppercase">
        {stat.label}
      </Text>
    </Box>
  )
}

export function RadarCenterStats() {
  const wrapRef = useRef(null)
  const { stats, seasonStats } = playerData

  const media = Math.round(stats.reduce((a, s) => a + s.value, 0) / stats.length)
  const half = Math.ceil(seasonStats.length / 2)
  const left = seasonStats.slice(0, half)
  const right = seasonStats.slice(half)

  const profile = [
    { label: 'Posición', value: playerData.position },
    { label: 'Pie', value: playerData.foot },
    { label: 'Edad', value: playerData.age ? `${playerData.age} años` : null },
    { label: 'Altura', value: playerData.height },
    { label: 'Peso', value: playerData.weight },
    { label: 'Origen', value: playerData.birthPlace },
  ].filter((p) => p.value)

  useEffect(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const q = gsap.utils.selector(wrapRef)
      const tl = gsap.timeline({
        scrollTrigger: { trigger: wrapRef.current, start: 'top 75%', once: true },
        defaults: { ease: 'expo.out' },
      })
      tl.fromTo(q('.radar-shape'), { scale: 0.3, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.2 })
        .fromTo(q('[data-reveal]'), { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, stagger: 0.06 }, 0.15)
    })
    return () => mm.revert()
  }, [])

  return (
    <Box ref={wrapRef}>
      <Grid
        templateColumns={{ base: '1fr 1fr', lg: '1fr minmax(320px, 520px) 1fr' }}
        gap={{ base: 5, lg: 10 }}
        alignItems="center"
      >
        <Box display="grid" gap={{ base: 5, lg: 6 }}>
          {left.map((s) => <SeasonNumber key={s.label} stat={s} />)}
        </Box>

        <Box
          position="relative"
          gridColumn={{ base: '1 / -1', lg: 'auto' }}
          gridRow={{ base: 1, lg: 'auto' }}
          maxW={{ base: '420px', lg: 'none' }}
          w="100%"
          mx="auto"
          mb={{ base: 2, lg: 0 }}
          sx={{
            '.radar-lbl': { fontSize: { base: '13px', lg: '11px' } },
            '.radar-val': { fontSize: { base: '18px', lg: '15px' } },
          }}
        >
          <Radar stats={stats} />
          <Box position="absolute" left="50%" top="50%" transform="translate(-50%,-50%)" textAlign="center" pointerEvents="none" color="#0C0E0A">
            <Text fontFamily="heading" fontWeight="bold" fontSize={{ base: '48px', lg: '64px' }} lineHeight={0.85}>{media}</Text>
            <Text fontSize="10px" fontWeight="bold" letterSpacing="0.24em">MEDIA</Text>
          </Box>
        </Box>

        <Box display="grid" gap={{ base: 5, lg: 6 }}>
          {right.map((s, i) => (
            <SeasonNumber key={s.label} stat={s} align={{ base: 'left', lg: 'right' }} highlight={i === right.length - 1} />
          ))}
        </Box>
      </Grid>

      {/* Ficha del perfil, al pie */}
      <Grid
        data-reveal
        mt={{ base: 9, lg: 14 }}
        templateColumns={{ base: 'repeat(2, 1fr)', lg: `repeat(${profile.length}, 1fr)` }}
        borderTop="2px solid"
        borderColor="brand.amber"
        bg="linear-gradient(180deg, #141810, transparent)"
      >
        {profile.map((p, i) => (
          <Box
            key={p.label}
            px={{ base: 4, lg: 5 }}
            py={{ base: '14px', lg: 5 }}
            borderLeft={{ base: i % 2 ? '1px solid' : 'none', lg: i ? '1px solid' : 'none' }}
            borderTop={{ base: i > 1 ? '1px solid' : 'none', lg: 'none' }}
            borderColor="brand.amberLight"
          >
            <Text fontSize="10px" fontWeight="bold" letterSpacing="0.24em" textTransform="uppercase" color="brand.gray">
              {p.label}
            </Text>
            <Text mt={2} fontFamily="heading" fontWeight="bold" fontSize={{ base: '18px', lg: '22px' }} color={i === 0 ? 'brand.amber' : 'brand.bone'}>
              {p.value}
            </Text>
          </Box>
        ))}
      </Grid>
    </Box>
  )
}

export default RadarCenterStats
