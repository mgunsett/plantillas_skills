import { useRef, useEffect } from 'react'
import { Box, Flex, Grid, Text, Image } from '@chakra-ui/react'
import { FaInstagram } from 'react-icons/fa'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { playerData } from '../../data/playerData'

gsap.registerPlugin(ScrollTrigger)

// Contacto "Tarjetas grandes": 2x2, toda la tarjeta es el link. Arriba las
// redes (Instagram y Transfermarkt), abajo el representante (en lima) y marketing.
// De fondo, el logo de cada una en gris y tenue.

const EASE = 'cubic-bezier(0.23,1,0.32,1)'
const BG = '#0C0E0A'

function buildCards() {
  const [ig, tm] = playerData.socialMedia
  const [rep, mkt] = playerData.contact
  return [
    ig && { role: 'Directo con Héctor', name: ig.label, sub: ig.handle, url: ig.url, icon: FaInstagram },
    tm && { role: 'Ficha profesional', name: 'Transfermarkt', sub: 'Trayectoria y valor de mercado', url: tm.url, img: tm.image },
    rep && { role: rep.title, name: rep.label, sub: `${rep.handle} · Clubes y transferencias`, url: rep.url, img: rep.image, highlight: true },
    mkt && { role: mkt.title, name: mkt.label, sub: `${mkt.handle} · Marcas y acciones comerciales`, url: mkt.url, img: mkt.image },
  ].filter(Boolean)
}

function Logo({ card, size }) {
  if (card.icon) return <Box as={card.icon} fontSize={size} />
  return <Image src={card.img} alt="" w="100%" h="100%" objectFit="contain" />
}

function ContactCard({ card }) {
  const hl = card.highlight
  return (
    <Box
      as="a"
      href={card.url}
      target="_blank"
      rel="noopener noreferrer"
      data-reveal
      position="relative"
      overflow="hidden"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      minH={{ base: '200px', md: '260px' }}
      p={{ base: '22px', md: '30px' }}
      bg={hl ? 'brand.amber' : '#141810'}
      color={hl ? BG : 'white'}
      transition={`background .35s ${EASE}`}
      _focusVisible={{ outline: '2px solid', outlineColor: 'brand.dorado', outlineOffset: '2px' }}
      sx={{
        '@media (hover: hover) and (pointer: fine)': {
          ...(hl ? {} : { '&:hover': { bg: '#1f2617' } }),
          '&:hover .c-arrow': { transform: 'rotate(45deg)' },
        },
      }}
    >
      {/* Logo de fondo, sin color */}
      <Box
        aria-hidden="true"
        position="absolute"
        right={{ base: '-24px', md: '-24px' }}
        bottom={{ base: '-28px', md: '-34px' }}
        boxSize={{ base: '140px', md: '190px' }}
        display="grid"
        placeItems="center"
        pointerEvents="none"
        opacity={hl ? 0.22 : 0.08}
        color={hl ? BG : 'white'}
        sx={{ img: { filter: hl ? 'grayscale(1) brightness(.4)' : 'grayscale(1) brightness(1.6)', mixBlendMode: hl ? 'multiply' : 'normal' } }}
      >
        <Logo card={card} size={{ base: '140px', md: '190px' }} />
      </Box>

      <Flex justify="space-between" align="flex-start" position="relative">
        <Box boxSize="64px" borderRadius="full" bg={BG} display="grid" placeItems="center" color="brand.amber" p={card.icon ? 0 : '7px'} overflow="hidden">
          <Logo card={card} size="28px" />
        </Box>
        <Box className="c-arrow" aria-hidden="true" boxSize="48px" borderRadius="full" border="1.5px solid currentColor" display="grid" placeItems="center" fontSize="18px" transition={`transform .35s ${EASE}`}>
          ↗
        </Box>
      </Flex>

      <Box position="relative" mt={6}>
        <Text fontSize="11px" fontWeight="bold" letterSpacing="0.22em" textTransform="uppercase" color={hl ? BG : 'brand.dorado'} opacity={hl ? 0.7 : 1}>
          {card.role}
        </Text>
        <Text as="h3" mt={2} fontFamily="heading" fontWeight="bold" fontSize={{ base: '26px', md: 'clamp(26px, 2.6vw, 40px)' }} lineHeight={1} textTransform="uppercase">
          {card.name}
        </Text>
        <Text mt={2} fontSize="14px" opacity={0.75}>{card.sub}</Text>
      </Box>
    </Box>
  )
}

export function ContactSection() {
  const sectionRef = useRef(null)
  const cards = buildCards()

  useEffect(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo(
        gsap.utils.toArray('[data-reveal]', sectionRef.current),
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.9, ease: 'expo.out', stagger: 0.07,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
        }
      )
    })
    return () => mm.revert()
  }, [])

  return (
    <Box as="section" id="contact" ref={sectionRef} position="relative" bg="brand.dark" px={{ base: 4, md: 12, lg: 20 }} py={{ base: 16, md: 28 }}>
      <Box maxW="1400px" mx="auto">
        <Box data-reveal mb={{ base: 7, md: 10 }}>
          <Text fontFamily="mono" fontSize="10px" color="brand.bone" textTransform="uppercase" letterSpacing="widest">
            Hablemos
          </Text>
          <Text as="h2" fontFamily="heading" fontWeight="bold" fontSize={{ base: '4xl', lg: '5xl' }} color="brand.amber" lineHeight={1}>
            Contacto
          </Text>
        </Box>

        <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={3}>
          {cards.map((c) => <ContactCard key={c.name} card={c} />)}
        </Grid>
      </Box>
    </Box>
  )
}

export default ContactSection
