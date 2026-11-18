import { useState } from 'react'
import { Box, Flex, Grid, Text, Image } from '@chakra-ui/react'

// MatchBox del hero: último resultado y próximo partido.
// Diseñado para Polaco Fydriszewski (Junior). Los datos salen de useMatches()
// del starter (panel /admin con Firebase, o matchData.js si no está configurado):
//   const { matches } = useMatches()
//   <MatchTicker last={matches.last} next={matches.next} />
// Cada partido: { home: {name, shield}, away: {name, shield}, homeScore,
// awayScore, date, stadium, competition }. Sin escudo se muestra la sigla.
//
// Tres variantes:
//   'ticker'  → barra tipo marcador de TV pegada abajo del hero
//   'card'    → tarjeta con pestañas Último / Próximo sobre el panel rojo
//   'tickets' → dos tickets debajo de los botones (resultado + entrada)

const EASE = 'cubic-bezier(0.23,1,0.32,1)'

// Colores: cambiá estos valores por los del club (o por tokens del theme).
const C = {
  accent: '#E0281C',  // acento principal (resultado, pestaña "último")
  second: '#4A7BFF',  // segundo acento (próximo partido)
  bg: '#07122B',      // fondo del hero
  panel: '#0E1C3D',   // fondo de tarjetas
  line: '#E0281C40',  // líneas finas
  gray: '#9AA6C2',
  gray2: '#DCE3F2',
}
const hasScore = (m) => m?.homeScore !== null && m?.homeScore !== undefined && m?.awayScore !== null && m?.awayScore !== undefined

function Shield({ team, size = '32px' }) {
  if (team?.shield) return <Image src={team.shield} alt="" boxSize={size} objectFit="contain" flexShrink={0} />
  return (
    <Flex
      boxSize={size}
      flexShrink={0}
      align="center"
      justify="center"
      borderRadius="full"
      border="1px solid"
      borderColor="whiteAlpha.300"
      fontSize={`calc(${size} * 0.3)`}
      fontWeight="bold"
      color={C.gray2}
      letterSpacing="0.04em"
    >
      {team?.name?.slice(0, 3).toUpperCase()}
    </Flex>
  )
}

function Label({ children, color = C.second, ...rest }) {
  return (
    <Text fontSize="10px" fontWeight="bold" letterSpacing="0.24em" textTransform="uppercase" color={color} {...rest}>
      {children}
    </Text>
  )
}

/* ─────────────── 1 · Marcador TV ─────────────── */

function TickerRow({ m, label, accent }) {
  const score = hasScore(m)
  return (
    <Flex direction={{ base: 'column', lg: 'row' }} align={{ base: 'stretch', lg: 'center' }} gap={{ base: 2.5, lg: 4 }} minW={0} flex={1} py={{ base: 3, lg: 0 }}>
      <Flex flexShrink={0} justify="space-between" align="baseline">
        <Label color={accent}>{label}</Label>
        <Text display={{ base: 'block', lg: 'none' }} fontSize="10px" color={C.gray} letterSpacing="0.04em">{m.competition} · {m.date}</Text>
      </Flex>
      <Flex align="center" gap={{ base: 2, lg: 3 }} minW={0} flex={1} justify={{ base: 'space-between', lg: 'flex-start' }}>
        <Shield team={m.home} size="28px" />
        <Text fontSize={{ base: '12px', lg: '13px' }} fontWeight="bold" textTransform="uppercase" noOfLines={1} minW={0}>{m.home.name}</Text>
        <Flex
          flexShrink={0}
          align="center"
          justify="center"
          minW="64px"
          h="34px"
          px={2}
          bg={score ? C.accent : 'transparent'}
          border="1.5px solid"
          borderColor={score ? C.accent : C.second}
          color={score ? C.bg : C.second}
          fontFamily="heading"
          fontWeight="bold"
          fontSize={score ? '20px' : '13px'}
          letterSpacing={score ? '0.04em' : '0.2em'}
          className="tab"
        >
          {score ? `${m.homeScore} – ${m.awayScore}` : 'VS'}
        </Flex>
        <Text fontSize={{ base: '12px', lg: '13px' }} fontWeight="bold" textTransform="uppercase" noOfLines={1} minW={0}>{m.away.name}</Text>
        <Shield team={m.away} size="28px" />
      </Flex>
      <Box display={{ base: 'none', xl: 'block' }} flexShrink={0} textAlign="right">
        <Text fontSize="11px" color={C.gray2} letterSpacing="0.06em">{m.date}</Text>
        <Text fontSize="10px" color={C.gray} letterSpacing="0.06em">{[m.competition, m.stadium].filter(Boolean).join(' · ')}</Text>
      </Box>
    </Flex>
  )
}

export function MatchTicker({ last, next }) {
  return (
    <Flex
      direction={{ base: 'column', lg: 'row' }}
      align={{ base: 'stretch', lg: 'center' }}
      gap={{ base: 0, lg: 8 }}
      bg={{ base: C.panel, lg: `${C.bg}E6` }}
      backdropFilter={{ lg: 'blur(14px)' }}
      borderTop="2px solid"
      borderColor={C.accent}
      px={{ base: 4, lg: '60px' }}
      py={{ base: 1, lg: 4 }}
      sx={{ '& > * + *': { borderTop: { base: '1px solid', lg: 0 }, borderLeft: { base: 0, lg: '1px solid' }, borderColor: C.line, pl: { lg: 8 } } }}
    >
      <TickerRow m={last} label="Último" accent={C.accent} />
      <TickerRow m={next} label="Próximo" accent={C.second} />
    </Flex>
  )
}

/* ─────────────── 2 · Tarjeta con pestañas ─────────────── */

export function MatchCard({ last, next }) {
  const [tab, setTab] = useState(0)
  const tabs = [{ k: 'Último resultado', m: last }, { k: 'Próximo partido', m: next }]
  const m = tabs[tab].m
  const score = hasScore(m)
  return (
    <Box
      bg={C.bg}
      border="1px solid"
      borderColor={C.line}
      boxShadow="0 24px 50px rgba(0,0,0,.45)"
      w={{ base: '100%', lg: '330px' }}
    >
      <Grid templateColumns="1fr 1fr" role="tablist" aria-label="Partidos">
        {tabs.map((t, i) => (
          <Box
            key={t.k}
            as="button"
            type="button"
            role="tab"
            aria-selected={tab === i}
            onClick={() => setTab(i)}
            py="12px"
            fontSize="10px"
            fontWeight="bold"
            letterSpacing="0.2em"
            textTransform="uppercase"
            color={tab === i ? 'white' : C.gray}
            bg={tab === i ? (i === 0 ? C.accent : C.second) : C.panel}
            transition={`background .3s ${EASE}, color .3s ${EASE}`}
            _focusVisible={{ outline: '2px solid', outlineColor: 'white', outlineOffset: '-4px' }}
          >
            {t.k}
          </Box>
        ))}
      </Grid>
      <Box p={{ base: '18px', lg: '22px' }} role="tabpanel">
        <Text fontSize="10px" letterSpacing="0.2em" textTransform="uppercase" color={C.gray} textAlign="center">{m.competition}</Text>
        <Grid templateColumns="1fr auto 1fr" alignItems="center" gap={3} mt={4}>
          {[m.home, null, m.away].map((t, i) =>
            t ? (
              <Flex key={i} direction="column" align="center" gap={2} minW={0}>
                <Shield team={t} size="46px" />
                <Text fontSize="12px" fontWeight="bold" textTransform="uppercase" textAlign="center" noOfLines={1}>{t.name}</Text>
              </Flex>
            ) : (
              <Text key={i} fontFamily="heading" fontWeight="bold" fontSize={score ? '44px' : '22px'} lineHeight={1} color={score ? 'white' : C.second} letterSpacing={score ? '0' : '0.16em'} className="tab">
                {score ? `${m.homeScore}-${m.awayScore}` : 'VS'}
              </Text>
            )
          )}
        </Grid>
        <Flex mt={5} pt={3} borderTop="1px solid" borderColor="whiteAlpha.100" justify="space-between" gap={3} fontSize="11px" color={C.gray2} letterSpacing="0.04em">
          <Text>{m.date}</Text>
          <Text color={C.gray} textAlign="right" noOfLines={1}>{m.stadium}</Text>
        </Flex>
      </Box>
    </Box>
  )
}

/* ─────────────── 3 · Dos tickets ─────────────── */

export function MatchTickets({ last, next }) {
  const lastScore = hasScore(last)
  const [day, ...rest] = (next.date || '').split(' ')
  return (
    <Grid templateColumns="1fr 1fr" gap={{ base: '10px', lg: '14px' }} maxW="640px">
      {/* Resultado */}
      <Box bg={C.panel} borderLeft="3px solid" borderColor={C.accent} p={{ base: '12px', lg: '16px 18px' }} minW={0}>
        <Label color={C.accent}>Último resultado</Label>
        <Flex align="center" justify="space-between" mt={{ base: 2.5, lg: 3 }} gap={2}>
          <Shield team={last.home} size="clamp(26px, 7vw, 36px)" />
          <Text fontFamily="heading" fontWeight="bold" fontSize={{ base: '26px', lg: '36px' }} lineHeight={1} className="tab">
            {lastScore ? `${last.homeScore}-${last.awayScore}` : '–'}
          </Text>
          <Shield team={last.away} size="clamp(26px, 7vw, 36px)" />
        </Flex>
        <Text mt={{ base: 2, lg: 3 }} fontSize={{ base: '10px', lg: '11px' }} color={C.gray} noOfLines={1}>
          {last.home.name} vs {last.away.name}
        </Text>
        <Text fontSize={{ base: '10px', lg: '11px' }} color={C.gray} noOfLines={1}>{last.competition} · {last.date}</Text>
      </Box>

      {/* Próximo: ticket con perforación */}
      <Box
        position="relative"
        border="1.5px dashed"
        borderColor={C.second}
        p={{ base: '12px', lg: '16px 18px' }}
        minW={0}
        _before={{ content: '""', position: 'absolute', left: '-9px', top: '50%', boxSize: '16px', mt: '-8px', borderRadius: 'full', bg: C.bg, borderRight: '1.5px dashed', borderColor: C.second }}
        _after={{ content: '""', position: 'absolute', right: '-9px', top: '50%', boxSize: '16px', mt: '-8px', borderRadius: 'full', bg: C.bg, borderLeft: '1.5px dashed', borderColor: C.second }}
      >
        <Label>Próximo partido</Label>
        <Flex align="center" justify="space-between" mt={{ base: 2.5, lg: 3 }} gap={2}>
          <Shield team={next.home} size="clamp(26px, 7vw, 36px)" />
          <Box textAlign="center" lineHeight={1}>
            <Text fontFamily="heading" fontWeight="bold" fontSize={{ base: '26px', lg: '36px' }} color={C.second} className="tab">{day}</Text>
            <Text fontSize="9px" fontWeight="bold" letterSpacing="0.16em" textTransform="uppercase" mt={1}>{rest.join(' ').replace(' · ', ' ')}</Text>
          </Box>
          <Shield team={next.away} size="clamp(26px, 7vw, 36px)" />
        </Flex>
        <Text mt={{ base: 2, lg: 3 }} fontSize={{ base: '10px', lg: '11px' }} color={C.gray} noOfLines={1}>
          {next.home.name} vs {next.away.name}
        </Text>
        <Text fontSize={{ base: '10px', lg: '11px' }} color={C.gray} noOfLines={1}>{next.stadium}</Text>
      </Box>
    </Grid>
  )
}
