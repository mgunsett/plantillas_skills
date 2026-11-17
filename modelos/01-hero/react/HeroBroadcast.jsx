import { useRef, useEffect } from 'react'
import { Box, Flex, Grid, Text, Image } from '@chakra-ui/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { playerData } from '../../data/playerData'
import useMatches from '../../hooks/useMatches'

gsap.registerPlugin(ScrollTrigger)

// Hero "Transmisión TV": foto a todo el ancho con gráficos de transmisión
// (marcador de partidos, zócalo con dorsal y nombre, cuadro de temporada).

const BG = '#0C0E0A'

const abbr = (name = '') => name.replace(/^(C\.?A\.?|Club)\s+/i, '').slice(0, 3).toUpperCase()

// Busca un dato de la temporada por su etiqueta
const season = (label) => playerData.seasonStats.find((s) => s.label.toLowerCase() === label.toLowerCase())?.value

const SEASON_BOX = [
  { label: 'Partidos', value: season('Partidos') },
  { label: 'Minutos', value: season('Minutos') },
  { label: 'Pases', value: season('Pases Completos') },
  { label: 'Valoración', value: season('Valoración'), accent: true },
].filter((s) => s.value !== undefined)

const SB_COLS = { base: '78px 40px 56px 40px 1fr', md: '100px 52px 74px 52px 1fr', lg: '100px 52px 74px 52px auto' }

// Escudo cargado desde el panel (Firebase). Si el partido no tiene escudo, la sigla.
function TeamMark({ team }) {
  if (team?.shield) {
    return <Image src={team.shield} alt={team.name} boxSize={{ base: '22px', lg: '28px' }} objectFit="contain" />
  }
  return abbr(team?.name)
}

function ScoreRow({ kind, match }) {
  if (!match) return null
  const isLast = kind === 'last'
  const hasScore = match.homeScore !== null && match.awayScore !== null
  if (isLast && !hasScore) return null
  const meta = [match.date, isLast ? 'Final' : match.stadium].filter(Boolean).join(' · ')

  return (
    <Grid templateColumns={SB_COLS} alignItems="stretch" bg="rgba(12,14,10,0.8)" backdropFilter="blur(6px)">
      <Flex
        align="center"
        gap="8px"
        px={{ base: 2, lg: 3 }}
        fontSize={{ base: '9px', lg: '11px' }}
        bg={isLast ? 'brand.amber' : 'brand.dorado'}
        color={isLast ? BG : 'white'}
        _before={isLast ? undefined : {
          content: '""', w: '6px', h: '6px', borderRadius: 'full', bg: 'white',
          animation: 'sbBlink 1.4s infinite',
        }}
      >
        {isLast ? 'Último' : 'Próximo'}
      </Flex>
      <Flex align="center" justify="center" py={{ base: 2, lg: '10px' }} fontSize={{ base: '12px', lg: '14px' }} title={match.home.name}>
        <TeamMark team={match.home} />
      </Flex>
      <Flex align="center" justify="center" gap="6px" fontSize={{ base: '16px', lg: '20px' }} sx={{ fontVariantNumeric: 'tabular-nums' }}>
        {isLast ? (
          <>
            <Text as="span" color={match.homeScore > match.awayScore ? 'brand.amber' : 'white'}>{match.homeScore}</Text>
            <Text as="span" color="brand.gray" fontSize="14px">–</Text>
            <Text as="span" color={match.awayScore > match.homeScore ? 'brand.amber' : 'white'}>{match.awayScore}</Text>
          </>
        ) : (
          <Text as="span" color="brand.amber" fontSize="12px" letterSpacing="0.14em">vs</Text>
        )}
      </Flex>
      <Flex align="center" justify="center" fontSize={{ base: '12px', lg: '14px' }} title={match.away.name}>
        <TeamMark team={match.away} />
      </Flex>
      <Flex
        align="center"
        px={{ base: 2, lg: '14px' }}
        fontSize={{ base: '8px', lg: '10px' }}
        letterSpacing={{ base: '0.08em', lg: '0.16em' }}
        color="brand.gray"
        borderLeft="1px solid rgba(255,255,255,0.08)"
        whiteSpace="nowrap"
        overflow="hidden"
      >
        {meta}
      </Flex>
    </Grid>
  )
}

export default function HeroBroadcast() {
  const outerRef = useRef(null)
  const stageRef = useRef(null)
  const photoRef = useRef(null)
  const vignetteRef = useRef(null)
  const { matches } = useMatches()

  const nat = playerData.nationality?.slice(0, 3).toUpperCase()

  useEffect(() => {
    const mm = gsap.matchMedia()
    mm.add(
      { motion: '(prefers-reduced-motion: no-preference)' },
      (ctx) => {
        if (!ctx.conditions.motion) return
        const q = gsap.utils.selector(stageRef)
        const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })
        tl.fromTo(photoRef.current, { scale: 1.08, opacity: 0 }, { scale: 1, opacity: 1, duration: 2.2 })
          .fromTo(q('[data-in="sb"]'), { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, 0.3)
          .fromTo(q('[data-in="lower"]'), { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 1, stagger: 0.12 }, 0.5)
          .fromTo(q('[data-in="box"]'), { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, 0.8)

        gsap.fromTo(vignetteRef.current, { opacity: 0 }, {
          opacity: 0.7,
          ease: 'none',
          scrollTrigger: { trigger: outerRef.current, start: 'top top', end: '+=80%', scrub: 1.2 },
        })
      }
    )
    return () => mm.revert()
  }, [])

  return (
    <Box ref={outerRef} id="hero" position="relative" zIndex={1} h="calc(200 * var(--sv))">
      <Box
        ref={stageRef}
        position="sticky"
        top={0}
        h="calc(100 * var(--sv))"
        minH="560px"
        overflow="hidden"
        bg="black"
        fontFamily="heading"
        fontWeight="bold"
        textTransform="uppercase"
        letterSpacing="0.1em"
        sx={{
          '@keyframes sbBlink': { '50%': { opacity: 0.2 } },
          // Celular en horizontal: entra todo en el alto disponible
          '@media (max-height: 500px) and (orientation: landscape)': {
            minHeight: 0,
            '[data-in="box"]': { display: 'none' },
            '[data-in="sb"]': { top: '64px', right: 'auto' },
            '.lower3': { bottom: '20px', right: 'auto', transform: 'scale(.55)', transformOrigin: 'left bottom' },
          },
        }}
      >
        {/* Foto a todo el ancho. En celular y tablet entra entera a lo alto.
            En escritorio la foto (vertical, 4:5) se recorta: el recorte arranca
            justo arriba de la cabeza para que se vea la mayor parte del cuerpo,
            sin dejar hueco abajo en pantallas muy anchas. */}
        <Image
          ref={photoRef}
          src={playerData.heroPhoto}
          alt={`${playerData.displayName} ${playerData.heroPhotoAlt}`}
          fetchpriority="high"
          draggable={false}
          position="absolute"
          inset={0}
          w="100%"
          h="100%"
          objectFit="cover"
          objectPosition={{
            base: '50% 30%',
            lg: '50% max(-5vw, calc(100 * var(--sv) - 125vw))',
          }}
          filter="saturate(.85) contrast(1.05) brightness(.85)"
        />

        {/* Velos para leer los gráficos */}
        <Box
          position="absolute"
          inset={0}
          pointerEvents="none"
          background={{
            base: `linear-gradient(0deg, ${BG} 0%, ${BG}cc 38%, transparent 70%), linear-gradient(180deg, ${BG}d9 0%, transparent 20%)`,
            lg: `linear-gradient(90deg, ${BG}ee 0%, ${BG}99 30%, transparent 50%), linear-gradient(0deg, ${BG} 0%, transparent 40%), linear-gradient(180deg, ${BG}d9 0%, transparent 20%)`,
          }}
        />

        {/* Marcador: último resultado y próximo partido */}
        <Box
          data-in="sb"
          position="absolute"
          zIndex={5}
          top={{ base: '72px', lg: '96px' }}
          left={{ base: '20px', lg: '60px' }}
          right={{ base: '20px', lg: 'auto' }}
          display="grid"
          gap="2px"
          color="white"
          role="group"
          aria-label="Partidos"
        >
          <ScoreRow kind="last" match={matches.last} />
          <ScoreRow kind="next" match={matches.next} />
        </Box>

        {/* Zócalo: dorsal + nombre */}
        <Box
          className="lower3"
          position="absolute"
          zIndex={5}
          left={{ base: '20px', lg: '60px' }}
          right={{ base: '20px', lg: 'auto' }}
          bottom={{ base: '150px', lg: '70px' }}
          maxW={{ lg: 'min(760px, 60vw)' }}
        >
          <Flex data-in="lower" align="stretch">
            <Flex
              align="center"
              bg="brand.amber"
              color={BG}
              fontSize={{ base: 'min(17vw, 110px)', lg: 'clamp(60px, 6vw, 96px)' }}
              lineHeight={1}
              letterSpacing={0}
              px={{ base: 3, lg: '18px' }}
              pt={{ base: 2, lg: '10px' }}
              pb={{ base: '2px', lg: 1 }}
            >
              {playerData.number}
            </Flex>
            <Flex
              as="h1"
              direction="column"
              justify="center"
              flex={{ base: 1, lg: 'none' }}
              bg="rgba(12,14,10,0.93)"
              px={{ base: '14px', lg: '26px' }}
              pt={{ base: '10px', lg: '14px' }}
              pb={{ base: '6px', lg: 2 }}
              lineHeight={0.88}
              letterSpacing={0}
            >
              <Text as="span" color="brand.gray" fontWeight="medium" letterSpacing="0.12em" fontSize={{ base: 'min(4.6vw, 28px)', lg: 'clamp(20px, 2vw, 32px)' }}>
                {playerData.name}
              </Text>
              <Text as="span" color="white" fontSize={{ base: 'min(14vw, 96px)', lg: 'clamp(54px, 6.4vw, 112px)' }}>
                {playerData.fullName}
              </Text>
            </Flex>
          </Flex>
          <Flex
            data-in="lower"
            display="inline-flex"
            align="center"
            gap={{ base: 2, lg: '14px' }}
            bg="brand.bone"
            color={BG}
            px={{ base: 3, lg: 5 }}
            py={{ base: 2, lg: '10px' }}
            fontSize={{ base: '10px', lg: '13px' }}
            letterSpacing="0.16em"
          >
            <Image src={playerData.logoCurrentClub} alt="" boxSize="22px" objectFit="contain" />
            {playerData.currentClub}
            <Box w="1px" h="16px" bg="rgba(12,14,10,0.35)" />
            {playerData.position}
            <Box w="1px" h="16px" bg="rgba(12,14,10,0.35)" />
            <Image src={playerData.nationalityFlag} alt="" boxSize="22px" objectFit="contain" />
            <span aria-label={playerData.nationality}>{nat}</span>
          </Flex>
        </Box>

        {/* Cuadro de la temporada */}
        <Box
          data-in="box"
          position="absolute"
          zIndex={5}
          right={{ base: '20px', lg: '60px' }}
          left={{ base: '20px', lg: 'auto' }}
          bottom={{ base: '24px', lg: '70px' }}
          w={{ base: 'auto', lg: '280px' }}
          bg="rgba(12,14,10,0.8)"
          backdropFilter="blur(8px)"
          borderTop="3px solid"
          borderColor="brand.amber"
          display={{ base: 'grid', lg: 'block' }}
          gridTemplateColumns={{ base: `repeat(${SEASON_BOX.length}, 1fr)` }}
        >
          <Flex display={{ base: 'none', lg: 'flex' }} justify="space-between" px={4} py={3} fontSize="10px" letterSpacing="0.24em" color="brand.gray">
            <span>Temporada</span>
            <Text as="span" color="brand.amber">{playerData.seasonShort}</Text>
          </Flex>
          {SEASON_BOX.map((s, i) => (
            <Flex
              key={s.label}
              direction={{ base: 'column-reverse', lg: 'row' }}
              justify="space-between"
              align={{ base: 'center', lg: 'baseline' }}
              px={{ base: 1, lg: 4 }}
              py={{ base: 3, lg: '10px' }}
              borderTop={{ lg: '1px solid rgba(255,255,255,0.08)' }}
              borderLeft={{ base: i ? '1px solid rgba(255,255,255,0.08)' : 'none', lg: 'none' }}
            >
              <Text fontSize={{ base: '9px', lg: '12px' }} color="#d6dccd" letterSpacing="0.06em" textTransform="none" fontWeight="normal">
                {s.label}
              </Text>
              <Text fontSize={{ base: '20px', lg: '24px' }} color={s.accent ? 'brand.amber' : 'white'} letterSpacing={0} sx={{ fontVariantNumeric: 'tabular-nums' }}>
                {s.value}
              </Text>
            </Flex>
          ))}
        </Box>

        {/* Viñeta que oscurece al hacer scroll */}
        <Box
          ref={vignetteRef}
          position="absolute"
          inset={0}
          zIndex={20}
          pointerEvents="none"
          background="radial-gradient(ellipse at center, transparent 25%, rgba(0,0,0,0.75) 100%)"
          style={{ opacity: 0 }}
        />
      </Box>
    </Box>
  )
}
