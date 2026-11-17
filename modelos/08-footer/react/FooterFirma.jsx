import { useEffect, useRef } from 'react'
import { Box, Flex, Text, Link, Image } from '@chakra-ui/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { playerData } from '../../data/playerData'
import sportfolioWeb from '@assets/logo_sport.png'

gsap.registerPlugin(ScrollTrigger)

// Footer "Firma": escudo, posición y club actual, links, "Volver arriba" y el
// apellido gigante a todo el ancho. Abajo, derechos y crédito del desarrollador.

const EASE = 'cubic-bezier(0.23,1,0.32,1)'

function toTop() {
  if (window.__lenis) window.__lenis.scrollTo(0)
  else window.scrollTo({ top: 0, behavior: 'smooth' })
}

export default function Footer() {
  const ref = useRef(null)
  const word = playerData.fullName
  const cut = Math.max(word.length - 2, 1)

  const links = [
    ...playerData.socialMedia.map((s) => ({ label: s.label, url: s.url })),
    ...playerData.contact.map((c) => ({ label: c.label, url: c.url })),
  ]

  useEffect(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo(
        ref.current.querySelector('[data-word]'),
        { yPercent: 40, opacity: 0 },
        {
          yPercent: 0, opacity: 1, duration: 1.1, ease: 'expo.out',
          scrollTrigger: { trigger: ref.current, start: 'top 85%', once: true },
        }
      )
    })
    return () => mm.revert()
  }, [])

  return (
    <Box ref={ref} as="footer" bg="#080a06" px={{ base: 5, md: 12, lg: 20 }} pt={{ base: 11, md: 14 }} overflow="hidden" position="relative">
      <Flex justify="space-between" align={{ base: 'flex-start', md: 'center' }} direction={{ base: 'column', md: 'row' }} gap={6}>
        <Flex align="center" gap={{ base: 4, md: 5 }}>
          <Image src={playerData.logoCurrentClub} alt={`Escudo de ${playerData.currentClub}`} boxSize={{ base: '52px', md: '68px' }} objectFit="contain" />
          <Text fontFamily="heading" fontWeight="bold" fontSize={{ base: '22px', md: 'clamp(22px, 2.4vw, 34px)' }} lineHeight={1.05} textTransform="uppercase">
            {playerData.position}
            <Box as="span" display="block" color="brand.amber">{playerData.currentClub}</Box>
          </Text>
        </Flex>

        <Flex
          as="button"
          onClick={toTop}
          align="center"
          gap={3}
          fontSize="12px"
          fontWeight="bold"
          letterSpacing="0.18em"
          textTransform="uppercase"
          color="brand.amber"
          _focusVisible={{ outline: '2px solid', outlineColor: 'brand.dorado', outlineOffset: '3px' }}
          sx={{ '@media (hover: hover) and (pointer: fine)': { '&:hover .up-ico': { transform: 'translateY(-4px)', bg: 'brand.amber', color: '#0C0E0A' } } }}
        >
          Volver arriba
          <Box className="up-ico" as="span" boxSize="54px" borderRadius="full" border="1.5px solid" borderColor="brand.amber" display="grid" placeItems="center" fontSize="20px" transition={`transform .35s ${EASE}, background .35s ${EASE}, color .35s ${EASE}`}>
            ↑
          </Box>
        </Flex>
      </Flex>

      <Flex gap={{ base: 4, md: 6 }} mt={{ base: 7, md: 8 }} flexWrap="wrap">
        {links.map((l) => (
          <Link
            key={l.url}
            href={l.url}
            isExternal
            fontSize="12px"
            letterSpacing="0.18em"
            textTransform="uppercase"
            color="brand.bone"
            borderBottom="1px solid"
            borderColor="brand.amberLight"
            pb={1}
            transition={`color .25s ${EASE}`}
            _hover={{ color: 'brand.amber', textDecoration: 'none' }}
          >
            {l.label} ↗
          </Link>
        ))}
      </Flex>

      {/* Apellido gigante */}
      <Text
        data-word
        aria-hidden="true"
        mt={{ base: 8, md: 11 }}
        mx="-0.04em"
        fontFamily="heading"
        fontWeight="bold"
        fontSize="23.5vw"
        lineHeight={0.74}
        letterSpacing="-0.02em"
        color="brand.amber"
        textTransform="uppercase"
        whiteSpace="nowrap"
        userSelect="none"
        transform="translateY(8%)"
      >
        {word.slice(0, cut)}
        <Box as="span" color="transparent" sx={{ WebkitTextStroke: '2px #B4F32A' }}>{word.slice(cut)}</Box>
      </Text>

      <Flex
        position="relative"
        zIndex={1}
        bg="#080a06"
        borderTop="2px solid"
        borderColor="brand.amber"
        mx={{ base: -5, md: -12, lg: -20 }}
        px={{ base: 5, md: 12, lg: 20 }}
        pt={{ base: 4, md: 5 }}
        pb={{ base: 5, md: 6 }}
        justify="space-between"
        align={{ base: 'flex-start', md: 'center' }}
        direction={{ base: 'column', md: 'row' }}
        gap={3}
      >
        <Text fontFamily="heading" fontSize="12px" letterSpacing="0.12em" textTransform="uppercase" color="brand.gray">
          © 2026 {playerData.displayName} · Todos los derechos reservados
        </Text>

        {/* Crédito de desarrollo: logo de Sportfolio, como en todas las landings */}
        <Flex direction="column" fontSize="12px" color="rgba(255,255,255,0.3)" letterSpacing="0.05em" textTransform="uppercase" fontFamily="heading">
          Desarrollo Web
          <Link
            href="https://matiasgunsett.netlify.app/sportfolio"
            isExternal
            aria-label="Sportfolio Web"
            transition="opacity 0.3s"
            _hover={{ opacity: 0.6 }}
          >
            <Image src={sportfolioWeb} alt="Sportfolio Web" display="block" width="85px" height="auto" mx="2px" pt="4px" />
          </Link>
        </Flex>
      </Flex>
    </Box>
  )
}
