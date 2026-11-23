import { useEffect, useLayoutEffect, useRef } from 'react'
import { Box, Flex, Text, Link, Image } from '@chakra-ui/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { playerData } from '../../data/playerData'
import sportfolioWeb from '@assets/logo_sport_dark.webp'

gsap.registerPlugin(ScrollTrigger)

// Footer "Firma" (kit claro): escudo, posición y club actual, links, "Volver arriba"
// y la firma gigante a todo el ancho, con la "O" de RAMOS cambiada por el dorsal.
// Abajo, derechos y crédito del desarrollador.

const EASE = 'cubic-bezier(0.23,1,0.32,1)'
const BAR_BG = '#E9EDF5'

function toTop() {
  if (window.__lenis) window.__lenis.scrollTo(0)
  else window.scrollTo({ top: 0, behavior: 'smooth' })
}

// Parte el apellido en [antes, dorsal, después]: la primera "O" pasa a ser el número.
// Si el apellido no tiene "O", el dorsal va al final.
function signature(word, number) {
  const i = word.toUpperCase().indexOf('O')
  return i === -1 ? [word, String(number), ''] : [word.slice(0, i), String(number), word.slice(i + 1)]
}

export default function FooterFirma() {
  const ref = useRef(null)
  const wordRef = useRef(null)
  const [before, num, after] = signature(playerData.fullName, playerData.number)

  const links = [
    ...playerData.socialMedia.map((s) => ({ label: s.label, url: s.url })),
    ...playerData.contact.map((c) => ({ label: c.label, url: c.url })),
  ]

  // Ajusta la firma al ancho disponible (mide el texto real con la tipografía cargada)
  useLayoutEffect(() => {
    const el = wordRef.current
    if (!el) return
    const fit = () => {
      el.style.fontSize = '100px'
      const range = document.createRange()
      range.selectNodeContents(el)
      const w = range.getBoundingClientRect().width
      if (w) el.style.fontSize = `${(100 * el.clientWidth / w) * 0.98}px`
    }
    fit()
    document.fonts?.ready.then(fit)
    window.addEventListener('resize', fit)
    return () => window.removeEventListener('resize', fit)
  }, [])

  useEffect(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo(
        wordRef.current,
        { yPercent: 40, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1.1, ease: 'expo.out', scrollTrigger: { trigger: ref.current, start: 'top 85%', once: true } }
      )
    })
    return () => mm.revert()
  }, [])

  return (
    <Box ref={ref} as="footer" bg={BAR_BG} px={{ base: 5, md: 12, lg: '60px' }} pt={{ base: 11, md: 14 }} overflow="hidden" position="relative">
      <Flex justify="space-between" align="flex-start" wrap="wrap" gap={6}>
        <Flex align="center" gap={{ base: 4, md: '18px' }}>
          <Image src={playerData.logoCurrentClub} alt={`Escudo de ${playerData.currentClub}`} boxSize={{ base: '52px', md: 'clamp(52px, 4.6vw, 68px)' }} objectFit="contain" />
          <Text fontFamily="heading" fontWeight="bold" fontSize={{ base: '22px', md: 'clamp(22px, 2.4vw, 34px)' }} lineHeight={1.05} textTransform="uppercase" color="brand.bone">
            {playerData.position}
            <Box as="span" display="block" color="brand.amber">{playerData.currentClub}</Box>
          </Text>
        </Flex>

        <Flex
          as="button"
          type="button"
          onClick={toTop}
          align="center"
          gap={3}
          fontSize="12px"
          fontWeight="bold"
          letterSpacing="0.18em"
          textTransform="uppercase"
          color="brand.amber"
          _focusVisible={{ outline: '2px solid', outlineColor: 'brand.dorado', outlineOffset: '3px' }}
          sx={{ '@media (hover: hover) and (pointer: fine)': { '&:hover .up-ico': { transform: 'translateY(-4px)', bg: 'brand.amber', color: 'white' } } }}
        >
          Volver arriba
          <Box className="up-ico" as="span" boxSize="54px" borderRadius="full" border="1.5px solid" borderColor="brand.amber" display="grid" placeItems="center" fontSize="20px" transition={`transform .35s ${EASE}, background .35s ${EASE}, color .35s ${EASE}`}>
            ↑
          </Box>
        </Flex>
      </Flex>

      <Flex gap={{ base: '18px', md: '26px' }} mt="30px" wrap="wrap">
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
            _hover={{ color: 'brand.dorado', textDecoration: 'none' }}
          >
            {l.label} ↗
          </Link>
        ))}
      </Flex>

      {/* Firma gigante: RAM9S */}
      <Text
        ref={wordRef}
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
        {before}
        <Box as="span" color="brand.dorado">{num}</Box>
        <Box as="span" color="transparent" sx={{ WebkitTextStroke: '2px var(--chakra-colors-brand-amber)' }}>{after}</Box>
      </Text>

      <Flex
        position="relative"
        zIndex={1}
        bg={BAR_BG}
        borderTop="2px solid"
        borderColor="brand.amber"
        mx={{ base: -5, md: -12, lg: '-60px' }}
        px={{ base: 5, md: 12, lg: '60px' }}
        pt={{ base: 4, md: '18px' }}
        pb={{ base: 5, md: '22px' }}
        justify="space-between"
        align={{ base: 'flex-start', md: 'center' }}
        direction={{ base: 'column', md: 'row' }}
        gap={4}
      >
        <Text fontFamily="heading" fontSize="12px" letterSpacing="0.12em" textTransform="uppercase" color="brand.gray">
          © {new Date().getFullYear()} {playerData.displayName} · Todos los derechos reservados
        </Text>

        {/* Crédito de desarrollo: logo de Sportfolio, como en todas las landings */}
        <Flex direction="column" fontSize="12px" color="rgba(13,23,48,0.45)" letterSpacing="0.05em" textTransform="uppercase" fontFamily="heading">
          Desarrollo Web
          <Link href="https://matiasgunsett.netlify.app/sportfolio" isExternal aria-label="Sportfolio Web" transition="opacity 0.3s" _hover={{ opacity: 0.7 }}>
            <Image src={sportfolioWeb} alt="Sportfolio Web" display="block" width="85px" height="auto" mx="2px" pt="4px" />
          </Link>
        </Flex>
      </Flex>
    </Box>
  )
}
