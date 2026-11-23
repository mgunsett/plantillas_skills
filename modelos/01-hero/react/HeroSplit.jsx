import { useRef, useEffect } from 'react'
import { Box, Flex, Text, Image, Button } from '@chakra-ui/react'
import { gsap } from 'gsap'
import { playerData } from '../../data/playerData'
import useMatches from '../../hooks/useMatches'
import useSeasonStats from '../../hooks/useSeasonStats'

// ─── Hero "Split con ficha" (kit claro, opción 6) ────────────────────
// Columna de texto a la izquierda (píldora con dorsal y posición, nombre,
// club y selección, 4 números de la temporada y botones) y panel del
// acento en diagonal a la derecha con el dorsal en contorno y el recorte.
// Abajo a la derecha, la tarjeta con el último y el próximo partido.
// Mobile: panel arriba; el recorte crece y apoya los pies sobre la tarjeta
// de partidos, y la parte que queda detrás del texto se funde.

const EASE = 'cubic-bezier(0.23,1,0.32,1)'
const MATCH_H = '84px' // alto de la tarjeta de partidos en mobile

const isNum = (v) => typeof v === 'number' && Number.isFinite(v)

// Partidos, Goles, Tiros al arco y Valoración: de API-Football si está
// sincronizado, y si no de playerData.seasonStats (por rótulo).
function heroStats(season) {
  const fixed = (label) => playerData.seasonStats.find((s) => s.label === label)?.value
  if (season) {
    return [
      { label: 'Partidos', value: season.partidos ?? fixed('Partidos') },
      { label: 'Goles', value: season.goles ?? fixed('Goles'), hl: true },
      { label: 'Tiros al arco', value: season.tirosArco ?? fixed('Tiros al arco') },
      { label: 'Valoración', value: isNum(season.rating) ? season.rating.toFixed(1) : fixed('Valoración') },
    ]
  }
  return [
    { label: 'Partidos', value: fixed('Partidos') },
    { label: 'Goles', value: fixed('Goles'), hl: true },
    { label: 'Tiros al arco', value: fixed('Tiros al arco') },
    { label: 'Valoración', value: fixed('Valoración') },
  ]
}

const code = (name = '') => name.replace(/[^A-Za-zÀ-ÿ ]/g, '').trim().slice(0, 3).toUpperCase()

function scrollTo(href) {
  const target = document.querySelector(href)
  if (!target) return
  if (window.__lenis) window.__lenis.scrollTo(target, { offset: -20 })
  else target.scrollIntoView({ behavior: 'smooth' })
}

function MatchCell({ label, accent, title, meta }) {
  return (
    <Box px={{ base: 3, lg: '18px' }} py={{ base: '10px', lg: '14px' }} minW={0}>
      <Text fontSize="9px" fontWeight="700" letterSpacing="0.24em" textTransform="uppercase"
        color={accent ? 'brand.dorado' : 'brand.gray'} mb="6px">
        {label}
      </Text>
      <Text fontSize={{ base: '14px', lg: '18px' }} fontWeight="700" color="brand.amber"
        letterSpacing="0.06em" sx={{ fontVariantNumeric: 'tabular-nums' }} noOfLines={1}>
        {title}
      </Text>
      <Text mt="4px" fontSize="10px" color="brand.gray" letterSpacing="0.1em" textTransform="uppercase" noOfLines={2}>
        {meta}
      </Text>
    </Box>
  )
}

function MatchCard({ last, next }) {
  const played = last && last.homeScore !== null && last.awayScore !== null
  return (
    <Box
      className="hs-match"
      role="group"
      aria-label="Partidos"
      position="absolute"
      zIndex={6}
      left={{ base: '20px', lg: 'auto' }}
      right={{ base: '20px', lg: '40px' }}
      bottom={{ base: '20px', lg: '40px' }}
      h={{ base: MATCH_H, lg: 'auto' }}
      display="grid"
      gridTemplateColumns="1fr 1fr"
      bg="white"
      borderRadius="6px"
      overflow="hidden"
      boxShadow="0 20px 50px rgba(10,18,38,0.25)"
    >
      {last && (
        <MatchCell
          label="Último"
          title={played
            ? `${code(last.home.name)} ${last.homeScore}–${last.awayScore} ${code(last.away.name)}`
            : `${code(last.home.name)} vs ${code(last.away.name)}`}
          meta={last.date}
        />
      )}
      {next && (
        <Box borderLeft="1px solid" borderColor="brand.amberLight" minW={0}>
          <MatchCell
            label="Próximo"
            accent
            title={`${code(next.home.name)} vs ${code(next.away.name)}`}
            meta={[next.date, next.stadium].filter(Boolean).join(' · ')}
          />
        </Box>
      )}
    </Box>
  )
}

export default function HeroSplit() {
  const rootRef = useRef(null)
  const { matches } = useMatches()
  const season = useSeasonStats()
  const stats = heroStats(season)

  // Una sola entrada coordinada: panel, recorte, textos en cascada y tarjeta
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })
      tl.from('.hs-panel', { xPercent: 30, opacity: 0, duration: 1.2 })
        .from('.hs-player', { xPercent: 10, opacity: 0, duration: 1.4 }, 0.3)
        .from('.hs-rv', { y: 28, opacity: 0, duration: 1, stagger: 0.1 }, 0.2)
        .from('.hs-match', { y: 24, opacity: 0, duration: 1 }, 0.9)
    }, rootRef)
    return () => ctx.revert()
  }, [])

  const handleLink = (e, href) => { e.preventDefault(); scrollTo(href) }

  return (
    <Box
      as="section"
      id="hero"
      ref={rootRef}
      position="relative"
      overflow="hidden"
      bg="brand.brown"
      display="grid"
      gridTemplateColumns={{ base: '1fr', lg: '1.05fr 1fr' }}
      gridTemplateRows={{ base: '50% 50%', lg: '1fr' }}
      minH={{ base: '780px', lg: '640px' }}
      sx={{
        '--sv': '1vh',
        '@supports (height: 1svh)': { '--sv': '1svh' },
        height: 'calc(100 * var(--sv))',
      }}
    >
      {/* Columna de texto */}
      <Flex
        position="relative"
        zIndex={5}
        gridRow={{ base: 2, lg: 1 }}
        direction="column"
        justify={{ base: 'flex-start', lg: 'center' }}
        pt={{ base: 2, lg: '96px' }}
        pb={{ base: `calc(${MATCH_H} + 28px)`, lg: '60px' }}
        pl={{ base: 5, lg: '60px' }}
        pr={{ base: 5, lg: 0 }}
      >
        <Flex className="hs-rv" align="center" gap="10px" alignSelf="flex-start" py="8px" pl="8px" pr="14px"
          borderRadius="full" bg="brand.bgRef" color="brand.amber" fontSize={{ base: '10px', lg: '11px' }}
          fontWeight="700" letterSpacing="0.2em" textTransform="uppercase">
          <Flex as="span" boxSize="26px" borderRadius="full" bg="brand.dorado" color="white" align="center"
            justify="center" fontSize="12px" letterSpacing={0}>
            {playerData.number}
          </Flex>
          {playerData.position}
        </Flex>

        <Box as="h1" mt={{ base: '14px', lg: '22px' }} fontWeight="700" textTransform="uppercase" lineHeight={0.84}>
          <Text as="span" className="hs-rv" display="block" fontWeight="500" color="brand.gray" letterSpacing="0.08em"
            fontSize={{ base: '6.5vw', lg: 'clamp(30px, 3.6vw, 60px)' }}>
            {playerData.name}
          </Text>
          <Text as="span" className="hs-rv" display="block" color="brand.amber" ml="-0.05em" whiteSpace="nowrap"
            fontSize={{ base: '22vw', lg: 'clamp(84px, 11.5vw, 206px)' }}>
            {playerData.fullName}
          </Text>
        </Box>

        <Flex className="hs-rv" align="center" gap={{ base: '10px', lg: '18px' }} mt={{ base: '12px', lg: '20px' }}
          fontSize={{ base: '11px', lg: '13px' }} fontWeight="500" letterSpacing="0.1em" textTransform="uppercase" color="brand.bone">
          <Flex align="center" gap="8px">
            <Image src={playerData.logoCurrentClub} alt="" boxSize="24px" objectFit="contain" />
            {playerData.currentClub}
          </Flex>
          <Box w="1px" h="18px" bg="brand.amberLight" />
          <Flex align="center" gap="8px">
            <Image src={playerData.nationalityFlag} alt="" boxSize="24px" objectFit="contain" />
            {playerData.country}
          </Flex>
        </Flex>

        <Flex className="hs-rv" mt={{ base: '18px', lg: '34px' }} gap={{ base: 0, lg: '22px', xl: '34px' }}
          justify={{ base: 'space-between', lg: 'flex-start' }}>
          {stats.map((s) => (
            <Box key={s.label}>
              <Text fontSize={{ base: '30px', lg: '36px', xl: '44px' }} fontWeight="700" lineHeight={1}
                color={s.hl ? 'brand.dorado' : 'brand.amber'}>
                {s.value}
              </Text>
              <Text mt="4px" fontSize={{ base: '8px', lg: '10px' }} letterSpacing={{ base: '0.14em', lg: '0.22em' }}
                textTransform="uppercase" color="brand.gray">
                {s.label}
              </Text>
            </Box>
          ))}
        </Flex>

        <Flex className="hs-rv" display={{ base: 'none', lg: 'flex' }} gap="12px" mt="34px">
          <Button as="a" href="#videos" onClick={(e) => handleLink(e, '#videos')} h="auto" py="15px" px="24px"
            borderRadius="4px" bg="brand.dorado" color="white" fontSize="12px" fontWeight="700" letterSpacing="0.2em"
            textTransform="uppercase" border="1.5px solid" borderColor="brand.dorado"
            transition={`transform .25s ${EASE}`}
            sx={{ '@media (hover: hover) and (pointer: fine)': { '&:hover': { transform: 'translateY(-2px)', bg: 'brand.dorado' } } }}>
            Ver jugadas
          </Button>
          <Button as="a" href="#contact" onClick={(e) => handleLink(e, '#contact')} h="auto" py="15px" px="24px"
            borderRadius="4px" bg="transparent" color="brand.amber" fontSize="12px" fontWeight="700" letterSpacing="0.2em"
            textTransform="uppercase" border="1.5px solid" borderColor="brand.amber"
            transition={`transform .25s ${EASE}`}
            sx={{ '@media (hover: hover) and (pointer: fine)': { '&:hover': { transform: 'translateY(-2px)', bg: 'transparent' } } }}>
            Contacto
          </Button>
        </Flex>
      </Flex>

      {/* Panel del acento + recorte. En mobile la columna es estática para que
          el recorte se ubique respecto de todo el hero (pies sobre la tarjeta). */}
      <Box position={{ base: 'static', lg: 'relative' }} gridRow={1} gridColumn={{ base: 1, lg: 2 }}>
        <Box
          className="hs-panel"
          position="absolute"
          top={0}
          left={{ base: 0, lg: '-8%' }}
          right={0}
          bottom={{ base: '50%', lg: 0 }}
          bg="brand.amber"
          overflow="hidden"
          sx={{
            clipPath: { base: 'polygon(0 0,100% 0,100% 84%,0 100%)', lg: 'polygon(22% 0,100% 0,100% 100%,0 100%)' },
          }}
          _after={{ content: '""', display: { base: 'none', lg: 'block' }, position: 'absolute', left: 0, right: 0, bottom: 0, h: '10px', bg: 'brand.dorado' }}
        >
          <Text aria-hidden="true" position="absolute" right={{ base: '-6%', lg: '-2%' }} top="-8%" fontWeight="700"
            lineHeight={1} color="transparent" fontSize={{ base: '50vh', lg: '78vh' }}
            sx={{ WebkitTextStroke: '2px rgba(255,255,255,0.15)' }}>
            {playerData.number}
          </Text>
        </Box>
        <Image
          className="hs-player"
          src={playerData.heroCutout}
          alt={playerData.heroCutoutAlt}
          fetchpriority="high"
          draggable={false}
          position="absolute"
          zIndex={3}
          left="50%"
          transform="translateX(-50%)"
          bottom={{ base: `calc(${MATCH_H} + 20px)`, lg: 0 }}
          h={{ base: 'auto', lg: '90%' }}
          w={{ base: 'min(112vw, 560px)', lg: 'auto' }}
          maxW="none"
          maxH={{ base: `calc(100% - ${MATCH_H} - 90px)`, lg: 'none' }}
          objectFit="contain"
          objectPosition="bottom"
          filter="drop-shadow(-24px 20px 40px rgba(10,18,38,0.33))"
          sx={{
            // Mobile: la parte que queda detrás del texto se funde para que se lea
            '@media (max-width: 61.99em)': {
              WebkitMaskImage: 'linear-gradient(180deg,#000 0%,#000 48%,rgba(0,0,0,.18) 66%,rgba(0,0,0,.12) 100%)',
              maskImage: 'linear-gradient(180deg,#000 0%,#000 48%,rgba(0,0,0,.18) 66%,rgba(0,0,0,.12) 100%)',
            },
          }}
        />
      </Box>

      <MatchCard last={matches.last} next={matches.next} />
    </Box>
  )
}
